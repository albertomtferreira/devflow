// src/app/dashboard/projects/[id]/roadmap/page.tsx

import FeaturesHeader from "@/components/features/dashboard/features-header";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // In a real app, you would check if there are any log entries.
  const isEmpty = true;
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <FeaturesHeader title={"Roadmap"} buttonText={"Save Roadmap"} />
        <CardDescription>Track your project's progress with a markdown-style task list and changelog.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-muted-foreground">
                Your Roadmap here
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            {/* This is where the list of learning log entries would be rendered */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}