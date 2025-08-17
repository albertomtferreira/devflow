"use client";

import { useProjects } from "@/contexts/projects-context";
import { useAuth } from "@/hooks/use-auth";
import { Project } from "@/lib/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { Copy, Loader2, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { getProject } from "@/lib/actions/projects";

export function DeleteProjectsButton() {
  const params = useParams();
  const projectId = params.id as string;
  const { deleteProject } = useProjects();
  const { user, loading: authLoading } = useAuth();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [project, setProject] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

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
  // Exact, trimmed, case-sensitive match
  const nameMatches = useMemo(
    () => confirmText.trim() === expectedName.trim(),
    [confirmText, expectedName]
  );

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

    if (!project) {
      console.error("Delete aborted: project.title not found");
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
      </div>
      {/* Delete Dialog with name confirmation */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete project</DialogTitle>
            <DialogDescription>
              This action can't be undone. To confirm, please type the project
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
              <TooltipContent className="tooltip-accent">Return</TooltipContent>
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
    </>
  );
}
