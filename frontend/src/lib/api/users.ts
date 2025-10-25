import apiClient from "./client";
import { User, UserStats, UserUpdateData } from "../types/user";

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>("/auth/me/");
  return response.data;
};

/**
 * Update current user profile
 */
export const updateUser = async (data: UserUpdateData): Promise<User> => {
  const response = await apiClient.patch<User>("/auth/me/", data);
  return response.data;
};

/**
 * Get user by ID
 */
export const getUserById = async (userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${userId}/`);
  return response.data;
};

/**
 * Get current user statistics
 */
export const getUserStats = async (): Promise<UserStats> => {
  const response = await apiClient.get<UserStats>("/auth/stats/");
  return response.data;
};

/**
 * TEST: Add XP to current user (development only)
 */
export const addXP = async (amount: number): Promise<any> => {
  const response = await apiClient.post("/auth/test-xp/", { amount });
  return response.data;
};
