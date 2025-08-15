// src/lib/types.ts
import { LucideIcon } from "lucide-react";

// General
export interface NavItem {
  id: string;
  title: string;
  icon: LucideIcon;
  href?: string;
  items?: NavItem[];
}

export interface NavLinks {
  name: string;
  href: string;
  disabled?: boolean;
}

//User

export interface NewUser {
  uid: string;
  email: string;
  name: string;
}

// Project-specific

//Project Status
export type ProjectStatus = "online" | "offline" | "in-progress" | "crashed";

export const projectStatusConfig = {
  online: {
    text: "Online",
    className: "bg-green-500",
  },
  offline: {
    text: "Offline",
    className: "bg-gray-500",
  },
  "in-progress": {
    text: "In Progress",
    className: "bg-yellow-500",
  },
  crashed: {
    text: "Crashed",
    className: "bg-red-500",
  },
} as const satisfies Record<ProjectStatus, { text: string; className: string }>;

//Project Details Header
export interface ProjectsDetailsHeaderProps {
  projectId?: string;
  title: string;
  buttonText?: string;
  onAction?: () => void;
  onSnippetAdded?: (snippet: Snippet & { id: string }) => void; // New optional prop
}

export interface ProjectSettingsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: string;
  onProjectSaved?: (project: Project | Omit<NewProjectData, "userId">) => void;
  mode?: "create" | "edit";
}

//New Project
export interface NewProjectData {
  title: string;
  shortDescription: string;
  longDescription: string;
  userId: string;
  techStack?: string[];
  skills?: string[];
  liveUrl?: string;
  repoUrl?: string;
  tags?: string[];
  status?: ProjectStatus; // Now included in create/update operations
}

//Overview
export interface Project {
  id: string;
  userId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  status: ProjectStatus;
  role: string;
  techStack?: string[];
  skills?: string[];
  liveUrl?: string;
  repoUrl?: string;
  tags?: string[];
  createdAt: string; // Storing as ISO string for serializability
}

// Code Vault
export interface Snippet {
  id: string;
  userId: string;
  title: string;
  description: string;
  code: string;
  tags: string[];
}
