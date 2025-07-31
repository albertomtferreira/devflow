import ProjectsDetailsHeader from "@/components/projects/global/projects-details-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { GitBranch } from "lucide-react";

export default async function VersionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isEmpty = true;

  return (
    <Card>
      <CardHeader>
        <ProjectsDetailsHeader
          title={"Version History"}
          buttonText={"Log New Version"}
        />
        <CardDescription>
          Track project versions, milestones, and release history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[400px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-muted-foreground">
                No versions have been tracked for this project yet.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* This is where the list of bookmarks would be rendered */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
