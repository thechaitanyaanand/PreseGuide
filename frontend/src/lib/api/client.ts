import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getTokens, setTokens, clearTokens, isTokenExpired } from "../utils/tokens";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

/**
 * Main Axios instance for API calls
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request interceptor to add JWT token to headers
 */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const { access } = getTokens();

    if (access && !isTokenExpired(access)) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle token refresh
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refresh } = getTokens();

        if (refresh && !isTokenExpired(refresh)) {
          // Attempt to refresh token
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh,
          });

          const { access } = response.data;
          setTokens(access, refresh);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
