import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateUser, getUserStats } from "../api/users";
import { UserUpdateData } from "../types/user";
import toast from "react-hot-toast";

/**
 * Hook for user data queries and mutations
 */
export const useUser = () => {
  const queryClient = useQueryClient();

  // Query current user
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Mutation to update user
  const updateUserMutation = useMutation({
    mutationFn: (data: UserUpdateData) => updateUser(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
      toast.success("Profile updated successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile");
    },
  });

  return {
    user,
    isLoading,
    error,
    updateUser: updateUserMutation.mutate,
    isUpdating: updateUserMutation.isPending,
  };
};

/**
 * Hook for user statistics
 */
export const useUserStats = () => {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: getUserStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
