"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome to PreseGuide</CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Sign in with Google to start improving your presentations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <GoogleLoginButton />
        </CardContent>
      </Card>
    </div>
  );
}
