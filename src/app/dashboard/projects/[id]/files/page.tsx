

import ProjectsDetailsHeader from "@/components/projects/global/projects-details-header";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default async function FilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isEmpty = true;

  return (
    <Card>
      <CardHeader>
        <ProjectsDetailsHeader title={"Files and Assets"} buttonText={"Upload File"} />
        <CardDescription>
          Manage project-related files like screenshots, diagrams, and other assets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-muted-foreground">
                No files have been uploaded for this project yet.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* This is where the list of files would be rendered */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
