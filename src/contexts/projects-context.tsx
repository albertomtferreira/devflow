// src/contexts/projects-context.tsx
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Project, NewProjectData } from "@/lib/types";
import {
  addProject as addProjectToDb,
  getProject as getProjectFromDb,
  updateProject as updateProjectToDb,
  getUserProjects as getUserProjectsFromDb,
  deleteProject as deleteProjectFromDb,
} from "@/lib/actions/projects";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface ProjectsContextType {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;

  // Actions
  createProject: (data: Omit<NewProjectData, "userId">) => Promise<Project>;
  deleteProject: (
    projectId: string,
    userId: string,
    projectTitle: string
  ) => Promise<void>;
  updateProject: (
    projectId: string,
    data: Partial<NewProjectData>
  ) => Promise<void>;
  refreshProjects: () => Promise<void>;
  refreshCurrentProject: (projectId: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;

  // NEW: Add this method for immediate status updates
  updateProjectStatus: (projectId: string, newStatusId: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Fetch all user projects
  const fetchProjects = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const userProjects = await getUserProjectsFromDb(user.uid);
      setProjects(userProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your projects. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Initial load
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // NEW: Add this method for immediate status updates
  const updateProjectStatus = useCallback(
    (projectId: string, newStatusId: string) => {
      // Update the projects array
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, currentStatus: newStatusId } : p
        )
      );

      // Update current project if it's the one being updated
      if (currentProject?.id === projectId) {
        setCurrentProject((prev) =>
          prev ? { ...prev, currentStatus: newStatusId } : null
        );
      }
    },
    [currentProject]
  );

  //Delete Project
  const deleteProject = useCallback(
    async (projectId: string, userId: string, projectTitle: string) => {
      try {
        await deleteProjectFromDb(projectId, userId, projectTitle);

        setProjects((prev) => prev.filter((p) => p.id !== projectId));
        if (currentProject?.id === projectId) {
          setCurrentProject(null);
        }

        toast({
          title: "Project deleted",
          description: `Your project ${projectTitle} has been deleted.`,
        });

        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to delete project:", error);
        toast({
          variant: "destructive",
          title: "Failed to delete project",
          description: `The deletion of the project failed. ${String(error)}`,
        });
        throw error;
      }
    },
    [user, currentProject, router, toast, fetchProjects]
  );

  // Create a new project
  const createProject = useCallback(
    async (data: Omit<NewProjectData, "userId">): Promise<Project> => {
      if (!user) throw new Error("User not authenticated");

      try {
        // Create project in database
        const projectData: NewProjectData = {
          ...data,
          userId: user.uid,
        };

        const projectId = await addProjectToDb(projectData);

        // Fetch the created project to get full data
        const newProject = await getProjectFromDb(projectId, user.uid);

        if (!newProject) {
          throw new Error("Failed to retrieve created project");
        }

        // Update local state immediately
        setProjects((prev) => {
          const updated = [newProject, ...prev];
          return updated;
        });

        // Set as current project
        setCurrentProject(newProject);

        toast({
          title: "Project created!",
          description: `"${newProject.title}" has been created successfully.`,
        });

        // Small delay to ensure state updates are processed
        setTimeout(() => {
          router.push(`/dashboard/projects/${projectId}/overview`);
        }, 100);

        return newProject;
      } catch (err) {
        console.error("Error creating project:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create project. Please try again.",
        });
        throw err;
      }
    },
    [user, router, toast]
  );

  // Update an existing project
  const updateProject = useCallback(
    async (projectId: string, data: Partial<NewProjectData>): Promise<void> => {
      if (!user) throw new Error("User not authenticated");

      try {
        // Update in database
        await updateProjectToDb(projectId, user.uid, data);

        // Fetch updated project
        const updatedProject = await getProjectFromDb(projectId, user.uid);

        if (!updatedProject) {
          throw new Error("Failed to retrieve updated project");
        }

        // Update local state
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? updatedProject : p))
        );

        // Update current project if it's the one being updated
        if (currentProject?.id === projectId) {
          setCurrentProject(updatedProject);
        }

        toast({
          title: "Project updated!",
          description: `"${updatedProject.title}" has been updated successfully.`,
        });
      } catch (err) {
        console.error("Error updating project:", err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update project. Please try again.",
        });
        throw err;
      }
    },
    [user, currentProject, toast]
  );

  // Refresh all projects
  const refreshProjects = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  // Refresh current project
  const refreshCurrentProject = useCallback(
    async (projectId: string) => {
      if (!user) return;

      try {
        const project = await getProjectFromDb(projectId, user.uid);
        if (project) {
          setCurrentProject(project);
          // Also update in projects list
          setProjects((prev) =>
            prev.map((p) => (p.id === projectId ? project : p))
          );
        }
      } catch (err) {
        console.error("Error refreshing current project:", err);
      }
    },
    [user]
  );

  const value: ProjectsContextType = {
    projects,
    currentProject,
    loading,
    error,
    deleteProject,
    createProject,
    updateProject,
    refreshProjects,
    refreshCurrentProject,
    setCurrentProject,
    updateProjectStatus, // NEW: Add this to the context value
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

// Custom hook to use the Projects context
export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
