import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants/app";
import { AuthTokens, User } from "../types/api";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  /** true while the app is bootstrapping (token check + /me call) */
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  /**
   * Persist tokens to SecureStore AND update Zustand state in one call.
   * Use this after a successful login / token refresh.
   */
  persistTokens: (tokens: AuthTokens) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isLoading: false }),

  setTokens: (tokens) => set({ tokens }),

  persistTokens: async (tokens: AuthTokens) => {
    await Promise.all([
      SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken),
      SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    ]);
    set({ tokens });
  },

  logout: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    ]);
    set({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
  },
}));

