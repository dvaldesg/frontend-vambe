"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState } from '@/types/auth';
import { tokenUtils } from '@/lib/auth-tokens';
import { authService } from '@/lib/auth';

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const initAuth = () => {
      const token = tokenUtils.getToken();
      const user = authService.getCurrentUser();
      const isAuthenticated = authService.isAuthenticated();

      setState({
        user,
        token,
        isLoading: false,
        isAuthenticated,
      });
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await authService.signIn({ email, password });
      const user = tokenUtils.getUserFromToken(response.access_token);
      
      setState({
        user,
        token: response.access_token,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        user: null,
        token: null,
        isAuthenticated: false,
      }));
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await authService.signUp({ email, password });
      const user = tokenUtils.getUserFromToken(response.access_token);
      
      setState({
        user,
        token: response.access_token,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        user: null,
        token: null,
        isAuthenticated: false,
      }));
      throw error;
    }
  };

  const signOut = () => {
    authService.signOut();
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
