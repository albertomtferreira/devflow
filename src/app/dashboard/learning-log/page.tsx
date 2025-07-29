import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function LearningLogPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Learning Log</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Track Your Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-4"/>
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              The Learning Logger will be your personal space to document insights, save useful AI prompts, and track your development journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
