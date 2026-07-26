export interface SessionUser {
  id: number;
  login: string;
}

export type SessionStatus = 'pending' | 'authenticated' | 'anonymous';

export interface LoginCredentials {
  login: string;
  password: string;
}
