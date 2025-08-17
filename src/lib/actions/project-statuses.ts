// src/lib/actions/project-statuses.ts

import { doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ProjectStatus, StatusTemplate, STATUS_TEMPLATES } from "../types";

// Generate unique ID for statuses
function generateStatusId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Get status template by ID
export function getStatusTemplate(templateId: string): StatusTemplate | null {
  return (
    STATUS_TEMPLATES.find((template) => template.id === templateId) || null
  );
}

// Create statuses from template
export function createStatusesFromTemplate(
  templateId: string
): ProjectStatus[] {
  const template = getStatusTemplate(templateId);
  if (!template) {
    throw new Error(`Template with ID ${templateId} not found`);
  }

  return template.statuses.map((status) => ({
    ...status,
    id: generateStatusId(),
    createdAt: new Date().toISOString(),
  }));
}

// Get project's custom statuses
export async function getProjectStatuses(
  projectId: string,
  userId: string
): Promise<ProjectStatus[]> {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      throw new Error("Project not found");
    }

    const data = projectSnap.data();

    // Check if user owns this project
    if (data.userId !== userId) {
      throw new Error("Access denied");
    }

    return data.customStatuses || [];
  } catch (error) {
    console.error("Error getting project statuses:", error);
    throw new Error("Failed to get project statuses");
  }
}

// Update project's custom statuses
export async function updateProjectStatuses(
  projectId: string,
  userId: string,
  statuses: ProjectStatus[]
): Promise<void> {
  try {
    // Validate that we have at least one status
    if (statuses.length === 0) {
      throw new Error("Project must have at least one status");
    }

    // Validate that exactly one status is marked as default
    const defaultStatuses = statuses.filter((s) => s.isDefault);
    if (defaultStatuses.length !== 1) {
      throw new Error("Project must have exactly one default status");
    }

    // Ensure proper ordering
    const orderedStatuses = statuses
      .map((status, index) => ({ ...status, order: index }))
      .sort((a, b) => a.order - b.order);

    const projectRef = doc(db, "projects", projectId);

    // Verify user ownership before updating
    const projectSnap = await getDoc(projectRef);
    if (!projectSnap.exists()) {
      throw new Error("Project not found");
    }

    const data = projectSnap.data();
    if (data.userId !== userId) {
      throw new Error("Access denied");
    }

    await updateDoc(projectRef, {
      customStatuses: orderedStatuses,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating project statuses:", error);
    throw error;
  }
}

// Add new status to project
export async function addProjectStatus(
  projectId: string,
  userId: string,
  newStatus: Omit<ProjectStatus, "id" | "createdAt" | "order">
): Promise<ProjectStatus> {
  try {
    const currentStatuses = await getProjectStatuses(projectId, userId);

    const statusWithId: ProjectStatus = {
      ...newStatus,
      id: generateStatusId(),
      createdAt: new Date().toISOString(),
      order: currentStatuses.length,
    };

    const updatedStatuses = [...currentStatuses, statusWithId];
    await updateProjectStatuses(projectId, userId, updatedStatuses);

    return statusWithId;
  } catch (error) {
    console.error("Error adding project status:", error);
    throw error;
  }
}

// Update existing status
export async function updateProjectStatus(
  projectId: string,
  userId: string,
  statusId: string,
  updates: Partial<Omit<ProjectStatus, "id" | "createdAt">>
): Promise<void> {
  try {
    const currentStatuses = await getProjectStatuses(projectId, userId);
    const statusIndex = currentStatuses.findIndex((s) => s.id === statusId);

    if (statusIndex === -1) {
      throw new Error("Status not found");
    }

    const updatedStatuses = [...currentStatuses];
    updatedStatuses[statusIndex] = {
      ...updatedStatuses[statusIndex],
      ...updates,
    };

    await updateProjectStatuses(projectId, userId, updatedStatuses);
  } catch (error) {
    console.error("Error updating project status:", error);
    throw error;
  }
}

// Delete status (only if not in use)
export async function deleteProjectStatus(
  projectId: string,
  userId: string,
  statusId: string
): Promise<void> {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      throw new Error("Project not found");
    }

    const data = projectSnap.data();
    if (data.userId !== userId) {
      throw new Error("Access denied");
    }

    // Check if status is currently in use
    if (data.currentStatus === statusId) {
      throw new Error("Cannot delete status that is currently in use");
    }

    const currentStatuses = data.customStatuses || [];

    // Ensure we don't delete the last status
    if (currentStatuses.length <= 1) {
      throw new Error("Cannot delete the last status");
    }

    const updatedStatuses = currentStatuses
      .filter((s: ProjectStatus) => s.id !== statusId)
      .map((s: ProjectStatus, index: number) => ({ ...s, order: index }));

    await updateDoc(projectRef, {
      customStatuses: updatedStatuses,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error deleting project status:", error);
    throw error;
  }
}

// Update project's current status
export async function updateProjectCurrentStatus(
  projectId: string,
  userId: string,
  statusId: string
): Promise<void> {
  try {
    const currentStatuses = await getProjectStatuses(projectId, userId);

    // Verify the status exists
    const statusExists = currentStatuses.some((s) => s.id === statusId);
    if (!statusExists) {
      throw new Error("Invalid status ID");
    }

    const projectRef = doc(db, "projects", projectId);
    await updateDoc(projectRef, {
      currentStatus: statusId,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating project current status:", error);
    throw error;
  }
}

// Utility function to get status by ID
export function getStatusById(
  statuses: ProjectStatus[],
  statusId: string
): ProjectStatus | null {
  return statuses.find((s) => s.id === statusId) || null;
}

// Utility function to get default status
export function getDefaultStatus(
  statuses: ProjectStatus[]
): ProjectStatus | null {
  return statuses.find((s) => s.isDefault) || statuses[0] || null;
}
