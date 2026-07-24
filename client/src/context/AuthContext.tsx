import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMeApi, loginApi } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'Owner' | 'Agent' | 'Builder';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: 'demo-user-123',
    name: 'Sriram Owner',
    email: 'sriram@magicbricks-ai.com',
    phone: '+91 98765 43210',
    userType: 'Owner',
  });
  const [token, setToken] = useState<string | null>(localStorage.getItem('magic_token') || 'demo_token');
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password?: string) => {
    try {
      const res = await loginApi(email, password);
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('magic_token', res.data.token);
      }
    } catch (e) {
      console.error('Login error', e);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('magic_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
