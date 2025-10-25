"use client";

import { User } from "@/lib/types/user";
import Badge from "../ui/Badge";

interface LevelDisplayProps {
  user: User;
  showDetails?: boolean;
}

export default function LevelDisplay({ user, showDetails = false }: LevelDisplayProps) {
  const levelColors: Record<number, string> = {
    1: "text-gray-600",
    2: "text-green-600",
    3: "text-blue-600",
    4: "text-purple-600",
    5: "text-yellow-600",
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`text-3xl font-bold ${levelColors[user.level]}`}>
        Lvl {user.level}
      </div>
      {showDetails && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-700">{user.level_name}</span>
          <span className="text-xs text-gray-500">{user.total_xp} XP</span>
        </div>
      )}
    </div>
  );
}
