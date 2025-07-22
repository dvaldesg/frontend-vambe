export interface User {
  id: number;
  email: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface JWTPayload {
  sub: number;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
