import {create} from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: null | {
    id: string;
    email: string;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isLoading: true,
  user: null,

  initialize: async () => {
    try {
      // Here you would typically:
      // 1. Check for stored auth token
      // 2. Validate token with your backend
      // 3. Fetch user data if token is valid
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({isLoading: false});
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({isLoading: false});
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({isLoading: true});

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, we'll use hardcoded credentials
      if (email === 'test@example.com' && password === 'password123') {
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            email: 'test@example.com',
          },
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      set({isLoading: false});
    }
  },

  logout: async () => {
    try {
      set({isLoading: true});

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      set({
        isAuthenticated: false,
        user: null,
      });
    } finally {
      set({isLoading: false});
    }
  },
}));
