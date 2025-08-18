// src/hooks/use-project-delete.ts
"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useProjects } from "@/contexts/projects-context";
import { Project } from "@/lib/types";

export function useProjectDelete() {
  const [deleting, setDeleting] = useState(false);
  const { user } = useAuth();
  const { deleteProject } = useProjects();

  const handleDeleteProject = async (project: Project) => {
    if (!user || !project) {
      console.error("Delete aborted: user or project missing");
      return false;
    }

    setDeleting(true);
    try {
      await deleteProject(project.id, user.uid, project.title);
      return true; // Success
    } catch (error) {
      console.error("Delete failed:", error);
      return false; // Failure
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteProjectWithConfirmation = async (
    project: Project,
    confirmationName: string
  ) => {
    // Exact, trimmed, case-sensitive match
    const nameMatches = confirmationName.trim() === project.title.trim();

    if (!nameMatches) {
      console.warn("Delete aborted: name verification failed");
      return false;
    }

    return await handleDeleteProject(project);
  };

  return {
    deleting,
    handleDeleteProject,
    handleDeleteProjectWithConfirmation,
  };
}
