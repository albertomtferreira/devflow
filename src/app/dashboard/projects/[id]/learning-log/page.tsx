// src/app/dashboard/projects/[id]/learning-log/page.tsx

import ProjectsDetailsHeader from "@/components/projects/global/projects-details-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function LearningLogPage() {
  // In a real app, you would check if there are any log entries.
  const isEmpty = true;

  return (
    <>
      <Card>
        <CardHeader>
          <ProjectsDetailsHeader title={"Learning Log"} buttonText={"Add New Note"} />
          <CardDescription>
            A place to document insights, store AI prompts, and keep track of
            what you've learned.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEmpty ? (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-muted-foreground">
                  Your learning log for this project is empty.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* This is where the list of learning log entries would be rendered */}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
