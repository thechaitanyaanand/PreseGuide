"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { googleLogin } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/store/authStore";
import toast from "react-hot-toast";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleLoginButton() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (response: any) => {
    setIsLoading(true);

    try {
      const { user, access, refresh } = await googleLogin(response.credential);
      setUser(user);
      toast.success(`Welcome back, ${user.first_name}!`);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeGoogleSignIn = () => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          width: 350,
          text: "continue_with",
          shape: "rectangular",
        }
      );
    }
  };

  // Load Google Sign-In script
  if (typeof window !== "undefined") {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;

    if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      document.head.appendChild(script);
    } else {
      initializeGoogleSignIn();
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="google-signin-button" />
      {isLoading && (
        <p className="text-sm text-gray-600 animate-pulse">Signing you in...</p>
      )}
    </div>
  );
}
