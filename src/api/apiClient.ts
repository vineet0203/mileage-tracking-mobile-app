import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import * as SecureStore from "expo-secure-store";
import { ACCESS_TOKEN_KEY, API_BASE_URL, REFRESH_TOKEN_KEY } from "../constants/app";

//  Axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // Prevent Android OkHttp from caching responses.
    // Without this, GET /auth/me returns 304 (empty body) on repeat calls,
    // Axios throws (304 is not 2xx), catch block calls logout() → login loop.
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
  },
  timeout: 10_000,
});

//  Request interceptor — attach access token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

//  Response interceptor — silent token refresh on 401
let isRefreshing = false;
// Queue of { resolve, reject } waiting while a refresh is in-flight
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  refreshQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(token!),
  );
  refreshQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthRoute = originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh-token');

    // Only attempt refresh on 401, only once per request, and not for auth routes
    if (error.response?.status !== 401 || originalRequest._retry || isAuthRoute) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue subsequent 401s while a refresh is already running
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const storedRefresh = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
      if (!storedRefresh) throw new Error("No refresh token");

      // Call refresh endpoint directly (without interceptor to avoid loop)
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken: storedRefresh,
      });

      const { accessToken, refreshToken: newRefresh } = data.data as {
        accessToken: string;
        refreshToken: string;
      };

      // Persist new tokens
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefresh);

      // Update in-memory store without importing the store directly (avoids circular deps)
      // The store reads from SecureStore on mount, so next launch is consistent
      apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      // Clear tokens — _layout.tsx will redirect to login via auth state
      await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
      await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

      // Signal logout to the Zustand store lazily to avoid circular imports
      const { useAuthStore } = await import("../store/authStore");
      useAuthStore.getState().logout();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
