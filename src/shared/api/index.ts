import { setApiBaseUrl } from './http-client';

const envApiUrl = import.meta.env.VITE_API_URL;
if (typeof envApiUrl === 'string' && envApiUrl.length > 0) {
  setApiBaseUrl(envApiUrl);
}

export {
  ApiError,
  customFetch,
  getAccessToken,
  getApiBaseUrl,
  setAccessToken,
  setApiBaseUrl,
} from './http-client';

export * from './generated/auth/auth';
export * from './generated/habits/habits';
export * from './generated/habit-categories/habit-categories';
export * from './generated/users/users';
export type * from './generated/model';
