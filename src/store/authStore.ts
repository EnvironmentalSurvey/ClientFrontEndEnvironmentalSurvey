import { create } from 'zustand';
import axios from 'utils/axios';
import { callMsGraph } from '../auth/graph';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from '../auth/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

interface AuthState {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: any | null;
  loginWithMicrosoft: () => void;
  logout: (instance: any) => void;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => {
  const activeAccount = msalInstance.getActiveAccount();

  return {
    isLoggedIn: !!activeAccount,
    isInitialized: false,
    user: null,

    loginWithMicrosoft: async () => {
      try {
        const user = await callMsGraph();
        set({ user, isLoggedIn: true });
      } catch (error: any) {
        console.error('Error fetching user data', error);
        set({ isLoggedIn: false });
      }
    },

    logout: (instance: any) => {
      delete axios.defaults.headers.common.Authorization;
      set({ isLoggedIn: false, user: null });
      instance.logoutPopup({
        account: instance.getActiveAccount()
      });
    },

    register: async (email: string, password: string, firstName: string, lastName: string) => {
      try {
        console.log('Registering user:', email, firstName, lastName);
        set({ isLoggedIn: true, user: { email, firstName, lastName } });
      } catch (error: any) {
        console.error('Error registering user', error);
        throw error;
      }
    },

    login: async (email: string, password: string) => {
      try {
        console.log('Logging in user:', email);
        set({ isLoggedIn: true, user: { email } });
      } catch (error: any) {
        console.error('Error logging in user', error);
        throw error;
      }
    },

    resetPassword: async (email: string) => {
      try {
        console.log('Resetting password for user:', email);
      } catch (error: any) {
        console.error('Error resetting password', error);
        throw error;
      }
    }
  };
});
