import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { getCurrentUser } from "../api/users";
import { getTokens } from "../utils/tokens";

/**
 * Hook to manage authentication state
 * Automatically fetches user on mount if token exists
 */
export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const { access } = getTokens();

      if (!access) {
        setLoading(false);
        return;
      }

      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        logout();
      }
    };

    if (isLoading) {
      initAuth();
    }
  }, [isLoading, setUser, setLoading, logout]);

  const handleLogout = async () => {
    try {
      const { logout: apiLogout } = await import("../api/auth");
      await apiLogout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logout();
      router.push("/login");
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    logout: handleLogout,
  };
};
