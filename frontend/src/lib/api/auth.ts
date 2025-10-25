import apiClient from "./client";
import { AuthResponse } from "../types/user";
import { setTokens, clearTokens } from "../utils/tokens";

/**
 * Authenticate user with Google OAuth token
 */
export const googleLogin = async (googleToken: string): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/google/", {
    token: googleToken,
  });

  const { access, refresh } = response.data;
  setTokens(access, refresh);

  return response.data;
};

/**
 * Logout user and blacklist refresh token
 */
export const logout = async (): Promise<void> => {
  const refresh = localStorage.getItem("refresh_token");

  if (refresh) {
    try {
      await apiClient.post("/auth/logout/", { refresh });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  clearTokens();
};

/**
 * Refresh access token
 */
export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await apiClient.post<{ access: string }>("/auth/refresh/", {
    refresh: refreshToken,
  });

  return response.data.access;
};
