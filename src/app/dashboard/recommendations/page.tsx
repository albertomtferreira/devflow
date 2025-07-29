import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Project Recommendations</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Discover Your Next Project</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center py-12">
            <Lightbulb className="h-16 w-16 text-muted-foreground mb-4"/>
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Our Project Recommendation Engine will suggest personalized project ideas based on your skills, interests, and past projects to help you grow as a developer.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
