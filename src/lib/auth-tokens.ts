import { JWTPayload, User } from '@/types/auth';

export const tokenUtils = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth-token');
  },

  setToken: (token: string): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('auth-token', token);
    
    const payload = tokenUtils.decodeToken(token);
    if (payload) {
      const expires = new Date(payload.exp * 1000);
      document.cookie = `auth-token=${token}; path=/; expires=${expires.toUTCString()}; secure; samesite=strict`;
    }
  },

  removeToken: (): void => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('auth-token');
    
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },

  decodeToken: (token: string): JWTPayload | null => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload) as JWTPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  },

  isTokenExpired: (token: string): boolean => {
    const payload = tokenUtils.decodeToken(token);
    if (!payload) return true;
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  },

  getUserFromToken: (token: string): User | null => {
    const payload = tokenUtils.decodeToken(token);
    if (!payload) return null;
    
    return {
      id: payload.sub,
      email: payload.email,
    };
  },
};
