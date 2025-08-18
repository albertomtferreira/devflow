// src/components/projects/project-delete-dropdown.tsx
"use client";

import { useState, useEffect } from "react";
import { Trash, Copy, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Project } from "@/lib/types";
import { useProjectDelete } from "@/hooks/use-project-delete";

interface ProjectDeleteDropdownProps {
  project: Project;
}

export function ProjectDeleteDropdown({ project }: ProjectDeleteDropdownProps) {
  const { deleting, handleDeleteProjectWithConfirmation } = useProjectDelete();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  // Reset confirmation text when dialog closes
  useEffect(() => {
    if (!isDeleteDialogOpen) setConfirmText("");
  }, [isDeleteDialogOpen]);

  const expectedName = project.title;
  const nameMatches = confirmText.trim() === expectedName.trim();

  const handleConfirmDelete = async () => {
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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  return (
    <>
      <DropdownMenuItem
        className="text-red-600 focus:text-red-600"
        onClick={handleDeleteClick}
        onSelect={(e) => {
          e.preventDefault();
        }}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete project
      </DropdownMenuItem>

      {/* Delete Confirmation Dialog */}
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
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Project Name</TooltipContent>
              </Tooltip>
            </div>

            <Input
              autoFocus
              placeholder="Type project name to confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              aria-invalid={confirmText.length > 0 && !nameMatches}
            />

            {!nameMatches && confirmText.length > 0 && (
              <p className="text-sm text-destructive">Name does not match.</p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={!nameMatches || deleting}
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
