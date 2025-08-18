// src/components/projects/delete-projects-button.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
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
import { useAuth } from "@/hooks/use-auth";
import { Project } from "@/lib/types";
import { useProjectDelete } from "@/hooks/use-project-delete";

export function DeleteProjectsButton() {
  const params = useParams();
  const projectId = params.id as string;
  const { user, loading: authLoading } = useAuth();
  const { deleting, handleDeleteProjectWithConfirmation } = useProjectDelete();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [project, setProject] = useState<Project | null>(null);
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
    if (!project) {
      console.error("Delete aborted: project not found");
      return;
    }

    const success = await handleDeleteProjectWithConfirmation(
      project,
      confirmText
    );
    if (success) {
      setIsDeleteDialogOpen(false);
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
