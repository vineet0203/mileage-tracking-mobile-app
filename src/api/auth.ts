import { BackendResponse, LoginResponse, User } from "../types/api";
import { apiClient } from "./apiClient";

// ─────────────────────────────────────────────────────────────
//  POST /auth/login
// ─────────────────────────────────────────────────────────────
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const { data } = await apiClient.post<BackendResponse<LoginResponse>>(
    "/auth/login",
    { email, password },
  );
  return data.data;
};

// ─────────────────────────────────────────────────────────────
//  GET /auth/me  (requires valid access token)
// ─────────────────────────────────────────────────────────────
export const getMe = async (): Promise<User> => {
  const { data } = await apiClient.get<BackendResponse<User>>("/auth/me");
  return data.data;
};

// ─────────────────────────────────────────────────────────────
//  POST /auth/forgot-password
// ─────────────────────────────────────────────────────────────
export const forgotPassword = async (email: string): Promise<string> => {
  const { data } =
    await apiClient.post<BackendResponse<null>>("/auth/forgot-password", {
      email,
    });
  return data.message;
};

// ─────────────────────────────────────────────────────────────
//  POST /auth/reset-password
// ─────────────────────────────────────────────────────────────
export const resetPassword = async (
  email: string,
  token: string,
  newPassword: string,
): Promise<string> => {
  const { data } = await apiClient.post<BackendResponse<null>>(
    "/auth/reset-password",
    { email, token, newPassword },
  );
  return data.message;
};

// ─────────────────────────────────────────────────────────────
//  POST /auth/logout  (protected)
// ─────────────────────────────────────────────────────────────
export const logoutApi = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

