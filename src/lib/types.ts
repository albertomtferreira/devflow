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
export type ProjectStatus = "online" | "offline" | "in-progress";

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
