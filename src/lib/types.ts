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


// Project-specific
export type ProjectStatus = "online" | "offline" | "in-progress" | "crashed";

export const projectStatusConfig = {
  online: {
    text: 'Online',
    className: 'bg-green-500'
  },
  offline: {
    text: 'Offline',
    className: 'bg-gray-500'
  },
  'in-progress': {
    text: 'In Progress',
    className: 'bg-yellow-500'
  },
  'crashed': {
    text: 'Crashed',
    className: 'bg-red-500'
  }
} as const satisfies Record<ProjectStatus, { text: string; className: string }>;

//Project Details Header
export interface ProjectsDetailsHeaderProps {
  title: string;
  buttonText?: string;
  onAction?: () => void;
}


//Overview
export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  role: string;
  techStack?: string[];
  skills?: string[];
  liveUrl?: string;
  repoUrl?: string;
  tags?: string[];
}

// Code Vault
export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
}
