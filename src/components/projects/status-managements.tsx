// src/components/projects/status-management.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Loader2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectStatus, STATUS_COLORS, StatusColorKey } from "@/lib/types";
import {
  getProjectStatuses,
  updateProjectStatuses,
  addProjectStatus,
  updateProjectStatus,
  deleteProjectStatus,
} from "@/lib/actions/project-statuses";
import { cn } from "@/lib/utils";

interface StatusManagementProps {
  projectId: string;
  userId: string;
  currentStatus: string;
  onStatusesUpdated?: (statuses: ProjectStatus[]) => void;
}

interface StatusFormData {
  label: string;
  color: StatusColorKey;
  description: string;
  isDefault: boolean;
}

export function StatusManagement({
  projectId,
  userId,
  currentStatus,
  onStatusesUpdated,
}: StatusManagementProps) {
  const [statuses, setStatuses] = useState<ProjectStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStatus, setEditingStatus] = useState<ProjectStatus | null>(
    null
  );
  const [formData, setFormData] = useState<StatusFormData>({
    label: "",
    color: "blue",
    description: "",
    isDefault: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Load statuses
  useEffect(() => {
    loadStatuses();
  }, [projectId, userId]);

  const loadStatuses = async () => {
    try {
      setLoading(true);
      const projectStatuses = await getProjectStatuses(projectId, userId);
      setStatuses(projectStatuses);
      onStatusesUpdated?.(projectStatuses);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load project statuses.",
      });
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingStatus(null);
    setFormData({
      label: "",
      color: "blue",
      description: "",
      isDefault: false,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (status: ProjectStatus) => {
    setEditingStatus(status);
    setFormData({
      label: status.label,
      color: status.color as StatusColorKey,
      description: status.description || "",
      isDefault: status.isDefault || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.label.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Status label is required.",
      });
      return;
    }

    setSubmitting(true);
    try {
      if (editingStatus) {
        // Update existing status
        await updateProjectStatus(projectId, userId, editingStatus.id, {
          label: formData.label.trim(),
          color: formData.color,
          description: formData.description.trim(),
          isDefault: formData.isDefault,
        });
        toast({
          title: "Status Updated",
          description: `"${formData.label}" has been updated.`,
        });
      } else {
        // Create new status
        await addProjectStatus(projectId, userId, {
          label: formData.label.trim(),
          color: formData.color,
          description: formData.description.trim(),
          isDefault: formData.isDefault,
        });
        toast({
          title: "Status Created",
          description: `"${formData.label}" has been added.`,
        });
      }

      setIsDialogOpen(false);
      loadStatuses();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${editingStatus ? "update" : "create"} status.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (status: ProjectStatus) => {
    if (status.id === currentStatus) {
      toast({
        variant: "destructive",
        title: "Cannot Delete",
        description: "Cannot delete the currently active status.",
      });
      return;
    }

    try {
      await deleteProjectStatus(projectId, userId, status.id);
      toast({
        title: "Status Deleted",
        description: `"${status.label}" has been deleted.`,
      });
      loadStatuses();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete status.",
      });
    }
  };

  const moveStatus = async (index: number, direction: "up" | "down") => {
    const newStatuses = [...statuses];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= statuses.length) return;

    // Swap the statuses
    [newStatuses[index], newStatuses[targetIndex]] = [
      newStatuses[targetIndex],
      newStatuses[index],
    ];

    // Update order values
    const reorderedStatuses = newStatuses.map((status, idx) => ({
      ...status,
      order: idx,
    }));

    setStatuses(reorderedStatuses);

    try {
      await updateProjectStatuses(projectId, userId, reorderedStatuses);
      onStatusesUpdated?.(reorderedStatuses);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reorder statuses.",
      });
      loadStatuses(); // Revert on error
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading statuses...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Project Statuses</CardTitle>
              <CardDescription>
                Manage the available statuses for this project. Use the arrows
                to reorder.
              </CardDescription>
            </div>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Status
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {statuses.map((status, index) => (
              <div
                key={status.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border bg-card",
                  status.id === currentStatus && "ring-2 ring-primary"
                )}
              >
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => moveStatus(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => moveStatus(index, "down")}
                    disabled={index === statuses.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>

                <span
                  className={cn(
                    "h-3 w-3 rounded-full flex-shrink-0",
                    STATUS_COLORS[status.color as keyof typeof STATUS_COLORS]
                      ?.class
                  )}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{status.label}</span>
                    {status.isDefault && (
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    )}
                    {status.id === currentStatus && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  {status.description && (
                    <p className="text-sm text-muted-foreground truncate">
                      {status.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(status)}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(status)}
                    disabled={
                      status.id === currentStatus || statuses.length <= 1
                    }
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStatus ? "Edit Status" : "Create New Status"}
            </DialogTitle>
            <DialogDescription>
              {editingStatus
                ? "Update the status details."
                : "Add a new status option for this project."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label *</Label>
              <Input
                id="label"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                placeholder="e.g., In Progress, Review, Done"
              />
            </div>

            <div>
              <Label htmlFor="color">Color</Label>
              <Select
                value={formData.color}
                onValueChange={(value: StatusColorKey) =>
                  setFormData({ ...formData, color: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_COLORS).map(([key, colorInfo]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "h-3 w-3 rounded-full",
                            colorInfo.class
                          )}
                        />
                        {colorInfo.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional description of what this status means"
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="rounded"
              />
              <Label htmlFor="isDefault">Set as default for new projects</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              {editingStatus ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
