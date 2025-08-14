// src/components/projects/global/projects-header.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Settings, Loader2, Trash, ClipboardCopy, Copy } from "lucide-react";

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
import { Project, projectStatusConfig } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { ProjectSettingsDialog } from "../project-settings-dialog";
import { useToast } from "@/hooks/use-toast";
import { useProjects } from "@/contexts/projects-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ProjectsHeader() {
  const params = useParams();
  const projectId = params.id as string;
  const { deleteProject } = useProjects();
  const { user, loading: authLoading } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  // Confirm-by-name state
  const [confirmText, setConfirmText] = useState("");

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

  // Reset confirmation text whenever dialog opens/closes or project changes
  useEffect(() => {
    if (!isDeleteDialogOpen) setConfirmText("");
  }, [isDeleteDialogOpen, project?.title]);

  const expectedName = project?.title ?? "";
  // Exact, trimmed, case-sensitive match. Change to `.toLowerCase()` on both sides if you want case-insensitive.
  const nameMatches = useMemo(
    () => confirmText.trim() === expectedName.trim(),
    [confirmText, expectedName]
  );

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
    setProject(updatedProject);
    window.dispatchEvent(
      new CustomEvent("projectUpdated", {
        detail: updatedProject,
      }) as CustomEvent<Project>
    );
  };

  const openDeleteDialog = () => setIsDeleteDialogOpen(true);

  const handleConfirmDelete = async () => {
    if (!projectId) {
      console.error("Delete aborted: projectId is missing.");
      return;
    }
    if (!nameMatches) {
      console.warn("Delete aborted: name verification failed.");
      return;
    }
    const userId = user?.uid;
    if (!userId) {
      console.error("Delete aborted: userId is missing.");
      return;
    }
    const projectTitle = project.title;
    if (!projectTitle) {
      console.error("Delete aborted: projectTitle is missing.");
      return;
    }

    setDeleting(true);

    try {
      await deleteProject(projectId, userId, projectTitle);
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCopyName = async () => {
    try {
      await navigator.clipboard.writeText(expectedName);
    } catch {
      // no-op; clipboard might be blocked
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="mb-6 flex-shrink-0">
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {project.title}
            </h1>

            <Badge variant="outline" className="bg-primary-foreground">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    projectStatusConfig[project.status]?.className ??
                      "bg-gray-400"
                  )}
                />
                <span>
                  {projectStatusConfig[project.status]?.text ?? "Unknown"}
                </span>
              </div>
            </Badge>
          </div>

          <p className="text-muted-foreground mt-1">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" onClick={openDeleteDialog}>
                <Trash />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="tooltip-destructive">
              Delete Project
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => setIsEditDialogOpen(true)}>
                <Settings />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Project</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Delete Dialog with name confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This action can’t be undone. To confirm, please type the project
              name exactly:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground break-all">
                {expectedName}
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={handleCopyName}
                    aria-label="Copy project name"
                    title="Copy project name"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="tooltip-accent">
                  Copy Project Name
                </TooltipContent>
              </Tooltip>
            </div>

            <Input
              autoFocus
              placeholder="Type project name to confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              aria-invalid={confirmText.length > 0 && !nameMatches}
            />

            {!nameMatches && confirmText.length > 0 ? (
              <p className="text-sm text-destructive">Name does not match.</p>
            ) : null}
          </div>

          <DialogFooter>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-accent">
                {" "}
                Return
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="destructive"
                  onClick={handleConfirmDelete}
                  disabled={!nameMatches || deleting}
                >
                  {deleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Delete
                </Button>
              </TooltipTrigger>
              <TooltipContent className="tooltip-destructive">
                Delete Project
              </TooltipContent>
            </Tooltip>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
