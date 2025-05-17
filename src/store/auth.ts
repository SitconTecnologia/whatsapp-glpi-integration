import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// In a real app, this would be fetched from an API
const mockUsers: User[] = [
  {
    id: '1',
    name: 'TI Admin',
    email: 'ti@hmf.com.br',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?u=admin',
  },
  {
    id: '2',
    name: 'Support Agent',
    email: 'agent@example.com',
    role: 'agent',
    avatar: 'https://i.pravatar.cc/150?u=agent',
  },
];

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

const loginAttempts = new Map<string, { count: number; timestamp: number }>();

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Check login attempts
      const attempts = loginAttempts.get(email) || { count: 0, timestamp: Date.now() };
      
      // Reset attempts if lockout time has passed
      if (Date.now() - attempts.timestamp > LOCKOUT_TIME) {
        loginAttempts.delete(email);
      } else if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
        set({
          error: 'Account temporarily locked. Please try again later.',
          isLoading: false,
        });
        return;
      }
      
      // Mock login - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email);
      
      if (user && (password === 'admin' || password === 'password')) {
        // Reset login attempts on successful login
        loginAttempts.delete(email);
        
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Increment failed login attempts
        loginAttempts.set(email, {
          count: (attempts.count || 0) + 1,
          timestamp: Date.now(),
        });
        
        set({
          error: 'Invalid email or password',
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: 'An error occurred during login',
        isLoading: false,
      });
    }
  },
  
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));