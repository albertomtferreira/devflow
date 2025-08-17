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

// Project Status System
export interface ProjectStatus {
  id: string;
  label: string;
  color: string; // predefined color class from palette
  description?: string;
  order: number;
  isDefault?: boolean; // default status for new projects
  createdAt?: string;
}

// Predefined color palette for statuses
export const STATUS_COLORS = {
  blue: { name: "Blue", class: "bg-blue-500", textClass: "text-blue-700" },
  green: { name: "Green", class: "bg-green-500", textClass: "text-green-700" },
  yellow: {
    name: "Yellow",
    class: "bg-yellow-500",
    textClass: "text-yellow-700",
  },
  orange: {
    name: "Orange",
    class: "bg-orange-500",
    textClass: "text-orange-700",
  },
  red: { name: "Red", class: "bg-red-500", textClass: "text-red-700" },
  purple: {
    name: "Purple",
    class: "bg-purple-500",
    textClass: "text-purple-700",
  },
  gray: { name: "Gray", class: "bg-gray-500", textClass: "text-gray-700" },
  indigo: {
    name: "Indigo",
    class: "bg-indigo-500",
    textClass: "text-indigo-700",
  },
  pink: { name: "Pink", class: "bg-pink-500", textClass: "text-pink-700" },
  emerald: {
    name: "Emerald",
    class: "bg-emerald-500",
    textClass: "text-emerald-700",
  },
} as const;

export type StatusColorKey = keyof typeof STATUS_COLORS;

// Status Templates
export interface StatusTemplate {
  id: string;
  name: string;
  description: string;
  statuses: Omit<ProjectStatus, "id" | "createdAt">[];
}

// Predefined status templates
export const STATUS_TEMPLATES: StatusTemplate[] = [
  {
    id: "web-app",
    name: "Web Application",
    description: "Standard workflow for web development projects",
    statuses: [
      {
        label: "Planning",
        color: "blue",
        description: "Project planning and design phase",
        order: 0,
        isDefault: true,
      },
      {
        label: "In Progress",
        color: "yellow",
        description: "Active development",
        order: 1,
      },
      {
        label: "Code Review",
        color: "orange",
        description: "Under review",
        order: 2,
      },
      {
        label: "Testing",
        color: "purple",
        description: "Quality assurance testing",
        order: 3,
      },
      {
        label: "Deployed",
        color: "green",
        description: "Live and accessible",
        order: 4,
      },
      {
        label: "On Hold",
        color: "gray",
        description: "Temporarily paused",
        order: 5,
      },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile Application",
    description: "Workflow optimized for mobile app development",
    statuses: [
      {
        label: "Concept",
        color: "blue",
        description: "Initial idea and planning",
        order: 0,
        isDefault: true,
      },
      {
        label: "UI/UX Design",
        color: "pink",
        description: "Design and prototyping",
        order: 1,
      },
      {
        label: "Development",
        color: "yellow",
        description: "Active coding",
        order: 2,
      },
      {
        label: "Testing",
        color: "orange",
        description: "QA and device testing",
        order: 3,
      },
      {
        label: "App Store Review",
        color: "purple",
        description: "Pending store approval",
        order: 4,
      },
      {
        label: "Published",
        color: "green",
        description: "Available in app stores",
        order: 5,
      },
      {
        label: "Maintenance",
        color: "emerald",
        description: "Bug fixes and updates",
        order: 6,
      },
    ],
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Workflow for data analysis and ML projects",
    statuses: [
      {
        label: "Research",
        color: "blue",
        description: "Problem definition and research",
        order: 0,
        isDefault: true,
      },
      {
        label: "Data Collection",
        color: "indigo",
        description: "Gathering and sourcing data",
        order: 1,
      },
      {
        label: "Data Cleaning",
        color: "yellow",
        description: "Preprocessing and cleaning",
        order: 2,
      },
      {
        label: "Modeling",
        color: "orange",
        description: "Model development and training",
        order: 3,
      },
      {
        label: "Validation",
        color: "purple",
        description: "Model testing and validation",
        order: 4,
      },
      {
        label: "Production",
        color: "green",
        description: "Deployed and running",
        order: 5,
      },
      {
        label: "Monitoring",
        color: "emerald",
        description: "Performance monitoring",
        order: 6,
      },
    ],
  },
  {
    id: "simple",
    name: "Simple",
    description: "Basic workflow for smaller projects",
    statuses: [
      {
        label: "To Do",
        color: "gray",
        description: "Not started yet",
        order: 0,
        isDefault: true,
      },
      {
        label: "In Progress",
        color: "yellow",
        description: "Currently working on it",
        order: 1,
      },
      { label: "Done", color: "green", description: "Completed", order: 2 },
    ],
  },
  {
    id: "custom",
    name: "Custom",
    description: "Start with basic statuses and customize as needed",
    statuses: [
      {
        label: "Not Started",
        color: "gray",
        description: "Project not yet begun",
        order: 0,
        isDefault: true,
      },
      {
        label: "In Progress",
        color: "yellow",
        description: "Active development",
        order: 1,
      },
      {
        label: "Completed",
        color: "green",
        description: "Project finished",
        order: 2,
      },
    ],
  },
];

// Legacy status type for backwards compatibility
export type LegacyProjectStatus =
  | "online"
  | "offline"
  | "in-progress"
  | "crashed";

export const legacyStatusConfig = {
  online: { text: "Online", className: "bg-green-500" },
  offline: { text: "Offline", className: "bg-gray-500" },
  "in-progress": { text: "In Progress", className: "bg-yellow-500" },
  crashed: { text: "Crashed", className: "bg-red-500" },
} as const;

//Project Details Header
export interface ProjectsDetailsHeaderProps {
  projectId?: string;
  title: string;
  buttonText?: string;
  onAction?: () => void;
  onSnippetAdded?: (snippet: Snippet & { id: string }) => void;
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
  statusTemplate?: string; // Template ID for initial setup
  currentStatus?: string; // Current status ID
  customStatuses?: ProjectStatus[]; // Project-specific statuses
}

//Project
export interface Project {
  id: string;
  userId: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  currentStatus: string; // References a status ID
  customStatuses: ProjectStatus[]; // Project-specific statuses
  role: string;
  techStack?: string[];
  skills?: string[];
  liveUrl?: string;
  repoUrl?: string;
  tags?: string[];
  createdAt: string;
  // Legacy fields for backwards compatibility
  status?: LegacyProjectStatus;
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
