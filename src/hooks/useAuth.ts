import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  forgotPassword,
  getMe,
  logoutApi,
  resetPassword,
  login,
} from "../api/auth";
import { useAuthStore } from "../store/authStore";

// ─────────────────────────────────────────────────────────────
//  Query Keys
// ─────────────────────────────────────────────────────────────
export const AUTH_KEYS = {
  me: ["auth", "me"] as const,
} as const;

// ─────────────────────────────────────────────────────────────
//  Helper: extract a human-readable message from AxiosError
// ─────────────────────────────────────────────────────────────
export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof AxiosError) {
    return (
      (error.response?.data as { message?: string })?.message ?? fallback
    );
  }
  return fallback;
}

// ─────────────────────────────────────────────────────────────
//  useCurrentUser — GET /auth/me (only runs when authenticated)
// ─────────────────────────────────────────────────────────────
export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1_000, // 5 min
    retry: false,
  });
}

// ─────────────────────────────────────────────────────────────
//  useLoginMutation — POST /auth/login
// ─────────────────────────────────────────────────────────────
export function useLoginMutation() {
  const queryClient = useQueryClient();
  const { setUser, persistTokens } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onSuccess: async (data) => {
      // 1. Persist tokens to SecureStore + Zustand
      await persistTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      // 2. Hydrate user state (triggers navigation guard in _layout)
      setUser(data.user);

      // 3. Warm the /me cache immediately
      queryClient.setQueryData(AUTH_KEYS.me, data.user);
    },
  });
}

// ─────────────────────────────────────────────────────────────
//  useLogoutMutation — POST /auth/logout
// ─────────────────────────────────────────────────────────────
export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: logoutApi,
    onSettled: async () => {
      // Always clear local state even if the API call fails
      await logout();
      queryClient.clear();
    },
  });
}

// ─────────────────────────────────────────────────────────────
//  useForgotPasswordMutation — POST /auth/forgot-password
// ─────────────────────────────────────────────────────────────
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}

// ─────────────────────────────────────────────────────────────
//  useResetPasswordMutation — POST /auth/reset-password
// ─────────────────────────────────────────────────────────────
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: ({
      email,
      token,
      newPassword,
    }: {
      email: string;
      token: string;
      newPassword: string;
    }) => resetPassword(email, token, newPassword),
  });
}

// ─────────────────────────────────────────────────────────────
//  Convenience re-export for components that only need store state
// ─────────────────────────────────────────────────────────────
export function useAuth() {
  return useAuthStore();
}

