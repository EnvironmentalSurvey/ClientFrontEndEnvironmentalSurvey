// hooks/useAuth.ts
import { useAuthStore } from 'store/authStore';
import { useMsal } from '@azure/msal-react';

// ==============================|| HOOKS - AUTH ||============================== //

export default function useAuth() {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const isLoggedIn = !!activeAccount;

  const authState = useAuthStore();

  return { ...authState, isLoggedIn };
}
