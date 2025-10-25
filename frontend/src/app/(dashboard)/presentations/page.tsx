"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function PresentationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Presentations</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Presentation
        </Button>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-600 mb-4">No presentations yet</p>
          <p className="text-sm text-gray-500">
            Create your first presentation to get started with AI coaching
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
