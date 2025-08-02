// src/components/projects/global/projects-header.tsx
"use client";
import { Button } from "@/components/ui/button";
import { getProject } from "@/lib/actions/projects";
import { Project } from "@/lib/types";
import { Settings, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ProjectSettingsDialog } from "../project-settings-dialog";

export default function ProjectsHeader() {
  const params = useParams();
  const projectId = params.id as string;
  const { user, loading: authLoading } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    // Only fetch if auth is complete and we have a user and an id.
    if (!authLoading && user && projectId) {
      setLoading(true);
      getProject(projectId, user.uid)
        .then(setProject)
        .finally(() => setLoading(false));
    } else if (!authLoading && !user) {
      // If auth is done and there's no user, stop loading.
      setLoading(false);
    }
  }, [projectId, user, authLoading]);

  // Combined loading state
  if (authLoading || loading) {
    return (
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <div className="h-9 w-48 bg-muted rounded animate-pulse mb-2" />
          <div className="h-6 w-72 bg-muted rounded animate-pulse" />
        </div>
        <div>
          <Button disabled>
            <Loader2 className="animate-spin" />
          </Button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-3xl font-bold tracking-tight">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mt-1">
            Please select a project from the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const handleProjectSaved = (updatedProject: Project) => {
    // Update the local state immediately
    setProject(updatedProject);
    // Emit custom event to notify other components (with proper typing)
    window.dispatchEvent(
      new CustomEvent("projectUpdated", {
        detail: updatedProject,
      }) as CustomEvent<Project>
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground mt-1">
            {project.shortDescription}
          </p>
        </div>
        <div>
          <Button onClick={() => setIsEditDialogOpen(true)}>
            <Settings />
          </Button>
        </div>
      </div>

      <ProjectSettingsDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        projectId={projectId}
        onProjectSaved={handleProjectSaved}
      />
    </>
  );
}
