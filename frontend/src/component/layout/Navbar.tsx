"use client";

import Link from "next/link";
import { useAuth } from "@/lib/hooks/useAuth";
import Button from "../ui/Button";
import LevelDisplay from "../gamification/LevelDisplay";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg" />
              <span className="text-xl font-bold text-gray-900">PreseGuide</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <LevelDisplay user={user} />
                <Link href="/profile">
                  <img
                    src={user.profile_picture || "/default-avatar.png"}
                    alt={user.first_name}
                    className="w-10 h-10 rounded-full border-2 border-blue-500"
                  />
                </Link>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
