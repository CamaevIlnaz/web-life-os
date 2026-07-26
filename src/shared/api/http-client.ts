/** Empty = same-origin (Vite proxy in dev). Override via VITE_API_URL. */
const DEFAULT_API_URL = '';

const AUTH_NO_RETRY_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/auth/logout',
] as const;

let apiBaseUrl = DEFAULT_API_URL;
let accessToken: string | null = null;
let onUnauthorized: (() => void) | null = null;
let refreshPromise: Promise<string> | null = null;

export const setApiBaseUrl = (url: string): void => {
  apiBaseUrl = url.replace(/\/$/, '');
};

export const getApiBaseUrl = (): string => apiBaseUrl;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

export const getAccessToken = (): string | null => accessToken;

export const setOnUnauthorized = (handler: (() => void) | null): void => {
  onUnauthorized = handler;
};

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `API error ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

const buildUrl = (url: string): string => {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  const path = url.startsWith('/') ? url : `/${url}`;

  if (!apiBaseUrl) {
    return path;
  }

  return `${apiBaseUrl}${path}`;
};

const getPathname = (url: string): string => {
  if (/^https?:\/\//.test(url)) {
    return new URL(url).pathname;
  }

  return url.startsWith('/') ? url : `/${url}`;
};

const shouldSkipAuthRetry = (url: string): boolean => {
  const pathname = getPathname(url);
  return AUTH_NO_RETRY_PATHS.some((path) => pathname === path);
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  if ([204, 205, 304].includes(response.status) || !response.body) {
    return undefined;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text.length > 0 ? text : undefined;
};

const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const response = await fetch(buildUrl('/api/auth/refresh'), {
      method: 'POST',
      credentials: 'include',
    });

    const body = await parseResponseBody(response);

    if (!response.ok) {
      throw new ApiError(response.status, body);
    }

    const data = body as { accessToken?: unknown };

    if (typeof data?.accessToken !== 'string' || data.accessToken.length === 0) {
      throw new ApiError(response.status, body, 'Refresh response missing accessToken');
    }

    setAccessToken(data.accessToken);
    return data.accessToken;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
};

const buildRequestHeaders = (
  options: RequestInit,
  forceFreshToken = false,
): Headers => {
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (forceFreshToken) {
    headers.delete('Authorization');
  }

  const token = getAccessToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const requestOnce = async (
  url: string,
  options: RequestInit,
  forceFreshToken = false,
): Promise<{ ok: true; body: unknown } | { ok: false; status: number; body: unknown }> => {
  const response = await fetch(buildUrl(url), {
    ...options,
    headers: buildRequestHeaders(options, forceFreshToken),
    credentials: 'include',
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    return { ok: false, status: response.status, body };
  }

  return { ok: true, body };
};

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const first = await requestOnce(url, options);

  if (first.ok) {
    return first.body as T;
  }

  if (first.status !== 401 || shouldSkipAuthRetry(url)) {
    throw new ApiError(first.status, first.body);
  }

  try {
    await refreshAccessToken();
  } catch (error) {
    setAccessToken(null);
    onUnauthorized?.();

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, first.body);
  }

  const retry = await requestOnce(url, options, true);

  if (!retry.ok) {
    throw new ApiError(retry.status, retry.body);
  }

  return retry.body as T;
};
