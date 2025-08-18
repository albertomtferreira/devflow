// src/components/projects/global/projects-header.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Settings,
  Loader2,
  Trash,
  Copy,
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  Star,
  Share2,
  Edit3,
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getProject } from "@/lib/actions/projects";
import { Project, NewProjectData, STATUS_COLORS } from "@/lib/types";
import { useAuth } from "@/hooks/use-auth";
import { ProjectSettingsDialog } from "../project-settings-dialog";
import { useProjects } from "@/contexts/projects-context";
import { QuickStatusSelector } from "../quick-status-selector";
import { getStatusById } from "@/lib/actions/project-statuses";
import { cn } from "@/lib/utils";
import { ProjectDeleteDropdown } from "../project-delete-dropdown";

export default function ProjectsHeader() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { user, loading: authLoading } = useAuth();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Not set";

    // Handle different timestamp formats
    let date: Date;
    if (timestamp && typeof timestamp === "object" && timestamp.seconds) {
      // Firestore timestamp
      date = new Date(timestamp.seconds * 1000);
    } else if (typeof timestamp === "string") {
      // ISO string
      date = new Date(timestamp);
    } else {
      // Fallback
      date = new Date(timestamp);
    }

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getCurrentStatusInfo = () => {
    if (!project?.customStatuses || !project.currentStatus) {
      return { label: "No Status", colorClass: "bg-gray-500" };
    }

    const status = getStatusById(project.customStatuses, project.currentStatus);
    if (!status) {
      return { label: "Unknown", colorClass: "bg-gray-500" };
    }

    const colorInfo = STATUS_COLORS[status.color as keyof typeof STATUS_COLORS];
    return {
      label: status.label,
      colorClass: colorInfo?.class || "bg-gray-500",
    };
  };

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

  if (authLoading || loading) {
    return (
      <div className="border-b bg-gradient-to-r from-white to-gray-50/50 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
              </div>
              <div className="h-5 w-72 bg-muted rounded animate-pulse mb-4" />
              <div className="flex gap-6">
                <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                <div className="h-4 w-28 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-9 w-9 bg-muted rounded animate-pulse" />
              <div className="h-9 w-9 bg-muted rounded animate-pulse" />
              <div className="h-9 w-9 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="border-b bg-gradient-to-r from-white to-gray-50/50 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Project Not Found
            </h1>
            <p className="text-muted-foreground">
              Please select a project from the dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getCurrentStatusInfo();

  return (
    <>
      <div className="border-b bg-gradient-to-r from-white via-blue-50/30 to-white px-6 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start">
            {/* Left side - Project info */}
            <div className="flex-1 min-w-0">
              {/* Title row */}
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {project.title}
                </h1>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                >
                  <Star
                    className={`h-4 w-4 ${
                      isFavorite ? "fill-yellow-500 text-yellow-500" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-2xl">
                {project.shortDescription}
              </p>

              {/* Project metadata */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Created {formatDate(project.createdAt)}</span>
                </div>

                {project.updatedAt && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Updated {formatDate(project.updatedAt)}</span>
                  </div>
                )}

                {/* Role display */}
                <div className="flex items-center gap-2">
                  <span>Role: {project.role}</span>
                </div>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 ml-6">
              {project.customStatuses && project.currentStatus && (
                <QuickStatusSelector
                  projectId={projectId}
                  userId={user!.uid}
                  currentStatus={project.currentStatus}
                  statuses={project.customStatuses}
                  onStatusChanged={handleStatusChanged}
                />
              )}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share project</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                    className="shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit project</TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="shadow-sm hover:shadow-md transition-shadow"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate project
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      router.push(`/dashboard/projects/${projectId}/settings`)
                    }
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Project settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ProjectDeleteDropdown project={project} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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
