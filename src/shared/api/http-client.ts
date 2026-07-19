const DEFAULT_API_URL = 'http://127.0.0.1:3000';

let apiBaseUrl = DEFAULT_API_URL;
let accessToken: string | null = null;

export const setApiBaseUrl = (url: string): void => {
  apiBaseUrl = url.replace(/\/$/, '') || DEFAULT_API_URL;
};

export const getApiBaseUrl = (): string => apiBaseUrl;

export const setAccessToken = (token: string | null): void => {
  accessToken = token;
};

export const getAccessToken = (): string | null => accessToken;

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

  return `${apiBaseUrl}${url.startsWith('/') ? url : `/${url}`}`;
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

export const customFetch = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const headers = new Headers(options.headers);

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAccessToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(buildUrl(url), {
    ...options,
    headers,
    credentials: 'include',
  });

  const body = await parseResponseBody(response);

  if (!response.ok) {
    throw new ApiError(response.status, body);
  }

  return body as T;
};
