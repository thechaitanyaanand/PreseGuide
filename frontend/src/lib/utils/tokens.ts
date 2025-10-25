import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  user_id: string;
  exp: number;
  iat: number;
}

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

/**
 * Get token expiration time in milliseconds
 */
export const getTokenExpiration = (token: string): number | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000;
  } catch {
    return null;
  }
};

/**
 * Store tokens in localStorage
 */
export const setTokens = (access: string, refresh: string): void => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

/**
 * Retrieve tokens from localStorage
 */
export const getTokens = (): { access: string | null; refresh: string | null } => {
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
  };
};

/**
 * Clear tokens from localStorage
 */
export const clearTokens = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
