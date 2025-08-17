// src/components/projects/quick-status-selector.tsx
"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProjectStatus, STATUS_COLORS } from "@/lib/types";
import { updateProjectCurrentStatus } from "@/lib/actions/project-statuses";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useProjects } from "@/contexts/projects-context";

interface QuickStatusSelectorProps {
  projectId: string;
  userId: string;
  currentStatus: string;
  statuses: ProjectStatus[];
  onStatusChanged?: (newStatusId: string) => void;
}

export function QuickStatusSelector({
  projectId,
  userId,
  currentStatus,
  statuses,
  onStatusChanged,
}: QuickStatusSelectorProps) {
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();
  const { refreshCurrentProject, refreshProjects } = useProjects();

  const handleStatusChange = async (newStatusId: string) => {
    if (newStatusId === currentStatus) return;

    setUpdating(true);
    try {
      await updateProjectCurrentStatus(projectId, userId, newStatusId);

      const newStatus = statuses.find((s) => s.id === newStatusId);
      toast({
        title: "Status Updated",
        description: `Project status changed to "${newStatus?.label}"`,
      });

      onStatusChanged?.(newStatusId);

      // NEW: Update the context to sync sidebar and other components
      await refreshCurrentProject(projectId);
      await refreshProjects(); // This updates the projects array for sidebar
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project status.",
      });
    } finally {
      setUpdating(false);
    }
  };

  const currentStatusObj = statuses.find((s) => s.id === currentStatus);

  return (
    <Select
      value={currentStatus}
      onValueChange={handleStatusChange}
      disabled={updating}
    >
      <SelectTrigger
        className={cn(
          "h-auto p-0 border-0 bg-transparent hover:bg-transparent focus:ring-0 focus:ring-offset-0",
          updating && "opacity-50"
        )}
      >
        <Badge
          variant="outline"
          className={cn(
            "cursor-pointer hover:bg-accent transition-colors",
            "bg-primary-foreground border-primary/20"
          )}
        >
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                currentStatusObj
                  ? STATUS_COLORS[
                      currentStatusObj.color as keyof typeof STATUS_COLORS
                    ]?.class
                  : "bg-gray-500"
              )}
            />
            <span>{currentStatusObj?.label || "Unknown"}</span>
          </div>
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {statuses.map((status) => (
          <SelectItem key={status.id} value={status.id}>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  STATUS_COLORS[status.color as keyof typeof STATUS_COLORS]
                    ?.class || "bg-gray-500"
                )}
              />
              <span>{status.label}</span>
              {status.id === currentStatus && (
                <span className="text-xs text-muted-foreground ml-1">
                  (current)
                </span>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
