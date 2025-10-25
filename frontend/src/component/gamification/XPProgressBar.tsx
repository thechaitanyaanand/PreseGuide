"use client";

import { User } from "@/lib/types/user";

interface XPProgressBarProps {
  user: User;
}

export default function XPProgressBar({ user }: XPProgressBarProps) {
  const levelThresholds: Record<number, number> = {
    1: 50,
    2: 150,
    3: 300,
    4: 500,
    5: Infinity,
  };

  const currentThreshold = levelThresholds[user.level - 1] || 0;
  const nextThreshold = levelThresholds[user.level] || user.total_xp;
  const xpInLevel = user.total_xp - currentThreshold;
  const xpNeededForLevel = nextThreshold - currentThreshold;
  const progressPercentage = Math.min((xpInLevel / xpNeededForLevel) * 100, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{user.total_xp} XP</span>
        {user.level < 5 && <span>{user.xp_for_next_level} XP to next level</span>}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {user.level === 5 && (
        <p className="text-xs text-center text-purple-600 mt-1 font-medium">
          🎉 Max Level Reached!
        </p>
      )}
    </div>
  );
}
