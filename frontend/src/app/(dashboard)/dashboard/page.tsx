"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useUserStats } from "@/lib/hooks/useUser";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import LevelDisplay from "@/components/gamification/LevelDisplay";
import XPProgressBar from "@/components/gamification/XPProgressBar";
import Badge from "@/components/ui/Badge";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading } = useUserStats();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.first_name}! 👋
        </h1>
        <p className="text-gray-600 mt-2">Track your presentation improvement journey</p>
      </div>

      {/* Level & XP Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <LevelDisplay user={user} showDetails />
          <XPProgressBar user={user} />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Presentations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">
              {stats?.presentations_count || 0}
            </div>
            <p className="text-sm text-gray-600 mt-2">Total created</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recordings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">
              {stats?.recordings_count || 0}
            </div>
            <p className="text-sm text-gray-600 mt-2">Analyzed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-600">
              {stats?.improvement_rate.toFixed(1) || 0}%
            </div>
            <p className="text-sm text-gray-600 mt-2">Overall growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle>Badges Earned</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {user.badges.length > 0 ? (
              user.badges.map((badge) => (
                <Badge key={badge} variant="success">
                  {badge}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500">No badges yet. Start practicing to earn some!</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
