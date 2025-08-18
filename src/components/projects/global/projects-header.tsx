// src/components/projects/global/projects-header.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Settings, Loader2, Trash, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { getProject } from "@/lib/actions/projects";
import { Project, NewProjectData } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { ProjectSettingsDialog } from "../project-settings-dialog";
import { useProjects } from "@/contexts/projects-context";
import { QuickStatusSelector } from "../quick-status-selector";

export default function ProjectsHeader() {
  const params = useParams();
  const projectId = params.id as string;
  const { user, loading: authLoading } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && user && projectId) {
      setLoading(true);
      getProject(projectId, user.uid)
        .then(setProject)
        .finally(() => setLoading(false));
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [projectId, user, authLoading]);

  const handleStatusChanged = (newStatusId: string) => {
    if (project) {
      setProject({ ...project, currentStatus: newStatusId });
    }
  };

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

  // Fix the type issue by handling both possible types
  const handleProjectSaved = (
    updatedProject: Project | Omit<NewProjectData, "userId">
  ) => {
    // Check if the updatedProject has an 'id' property (making it a Project)
    if ("id" in updatedProject) {
      setProject(updatedProject as Project);
    } else {
      // If it's NewProjectData without userId, merge it with existing project data
      setProject((prev) =>
        prev
          ? {
              ...prev,
              ...updatedProject,
              userId: prev.userId, // Preserve the existing userId
              id: prev.id, // Preserve the existing id
            }
          : null
      );
    }

    window.dispatchEvent(
      new CustomEvent("projectUpdated", {
        detail: updatedProject,
      }) as CustomEvent<Project | Omit<NewProjectData, "userId">>
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <div className="flex gap-2 items-center justify-between mb-2">
            <h1 className="text-3xl font-bold tracking-tight w-auto">
              {project.title}
            </h1>

            {project.customStatuses && project.currentStatus && (
              <QuickStatusSelector
                projectId={projectId}
                userId={user!.uid}
                currentStatus={project.currentStatus}
                statuses={project.customStatuses}
                onStatusChanged={handleStatusChanged}
              />
            )}
          </div>

          <p className="text-muted-foreground mt-1">
            {project.shortDescription}
          </p>
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
