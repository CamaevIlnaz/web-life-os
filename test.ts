import { coreConfig } from "../config/base";
import { REFRESH_TOKEN_API, REFRESH_DELAY } from "../constants";

let refreshPromise: Promise<boolean> | null = null;

const WWW_AUTHENTICATE_HEADER = "www-authenticate";
const REDIRECT_LOCATION_PREFIX = 'redirect location="';

/**
 * Проверяет наличие redirect location в www-authenticate
 * и выполняет редирект.
 */
const redirectByWwwAuthenticate = (response: Response): boolean => {
  if (response.status !== 401) {
    return false;
  }

  const wwwAuthenticate = response.headers.get(
    WWW_AUTHENTICATE_HEADER,
  );

  if (
    !wwwAuthenticate ||
    !wwwAuthenticate.startsWith(REDIRECT_LOCATION_PREFIX)
  ) {
    return false;
  }

  const redirectUrl = wwwAuthenticate.substring(
    REDIRECT_LOCATION_PREFIX.length,
    wwwAuthenticate.length - 1,
  );

  window.location.href = decodeURIComponent(redirectUrl);

  return true;
};

/**
 * Обновление токена.
 *
 * Если несколько запросов одновременно получили 401,
 * будет выполнен только один refresh-запрос.
 *
 * Остальные запросы будут ожидать тот же refreshPromise.
 */
export const refreshToken = (): Promise<boolean> => {
  // Refresh уже выполняется.
  // Не запускаем новый, а возвращаем текущий Promise.
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = new Promise<boolean>((resolve) => {
    setTimeout(async () => {
      try {
        const response = await fetch(
          coreConfig.baseUri + REFRESH_TOKEN_API,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          },
        );

        /**
         * Например:
         *
         * 401
         * www-authenticate: redirect location="..."
         *
         * В этом случае сразу отправляем пользователя
         * на нужную страницу.
         */
        if (redirectByWwwAuthenticate(response)) {
          resolve(false);
          return;
        }

        resolve(response.ok);
      } catch {
        resolve(false);
      }
    }, REFRESH_DELAY);
  });

  return refreshPromise.finally(() => {
    refreshPromise = null;
  });
};
