import { AuthCredentials, AuthResponse, User } from '@/types/auth';
import { apiClient } from './api-client';
import { tokenUtils } from './auth-tokens';

export const authService = {
  async signIn(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signin', credentials);
    tokenUtils.setToken(response.access_token);
    return response;
  },

  async signUp(credentials: AuthCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', credentials);
    tokenUtils.setToken(response.access_token);
    return response;
  },

  signOut(): void {
    tokenUtils.removeToken();
  },

  getCurrentUser(): User | null {
    const token = tokenUtils.getToken();
    if (!token || tokenUtils.isTokenExpired(token)) {
      return null;
    }
    return tokenUtils.getUserFromToken(token);
  },

  isAuthenticated(): boolean {
    const token = tokenUtils.getToken();
    return token !== null && !tokenUtils.isTokenExpired(token);
  },
};
