import { createEffect, createEvent, createStore, sample } from 'effector';

import {
  ApiError,
  authControllerLogin,
  authControllerLogout,
  authControllerRefresh,
  setAccessToken,
  setOnUnauthorized,
  type AuthUserDto,
  type LoginDto,
  type LoginResponseDto,
  type RefreshResponseDto,
} from '@/shared/api';

import type { LoginCredentials, SessionStatus, SessionUser } from '../types';

const mapUser = (user: AuthUserDto): SessionUser => ({
  id: user.id,
  login: user.login,
});

const getLoginErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError && error.status === 401) {
    return 'Неверный логин или пароль';
  }

  return 'Не удалось войти. Попробуйте ещё раз';
};

export const sessionCheckRequested = createEvent();
export const loginSubmitted = createEvent<LoginCredentials>();
export const logoutRequested = createEvent();
export const sessionReset = createEvent();

export const refreshFx = createEffect<void, RefreshResponseDto, ApiError>(
  async () => authControllerRefresh(),
);

export const loginFx = createEffect<LoginDto, LoginResponseDto, ApiError>(
  async (credentials) => authControllerLogin(credentials),
);

export const logoutFx = createEffect<void, void, ApiError>(async () => {
  await authControllerLogout();
});

export const $user = createStore<SessionUser | null>(null)
  .on(refreshFx.doneData, (_, response) => mapUser(response.user))
  .on(loginFx.doneData, (_, response) => mapUser(response.user))
  .reset(sessionReset);

export const $sessionStatus = createStore<SessionStatus>('pending')
  .on(refreshFx.done, () => 'authenticated')
  .on(refreshFx.fail, () => 'anonymous')
  .on(loginFx.done, () => 'authenticated')
  .on(sessionReset, () => 'anonymous');

export const $loginError = createStore<string | null>(null)
  .on(loginSubmitted, () => null)
  .on(loginFx.fail, (_, { error }) => getLoginErrorMessage(error))
  .reset(loginFx.done);

export const $isLoginPending = loginFx.pending;

const $sessionBootstrapDone = createStore(false).on(
  refreshFx.finally,
  () => true,
);

sample({
  clock: sessionCheckRequested,
  source: {
    done: $sessionBootstrapDone,
    pending: refreshFx.pending,
  },
  filter: ({ done, pending }) => !done && !pending,
  target: refreshFx,
});

sample({
  clock: loginSubmitted,
  target: loginFx,
});

sample({
  clock: logoutRequested,
  target: logoutFx,
});

sample({
  clock: logoutFx.finally,
  target: sessionReset,
});

refreshFx.doneData.watch(({ accessToken }) => {
  setAccessToken(accessToken);
});

loginFx.doneData.watch(({ accessToken }) => {
  setAccessToken(accessToken);
});

sessionReset.watch(() => {
  setAccessToken(null);
});

setOnUnauthorized(() => {
  sessionReset();
});
