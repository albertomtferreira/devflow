// src/lib/actions/projects.ts

import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  NewProjectData,
  Project,
  ProjectStatus,
  LegacyProjectStatus,
  legacyStatusConfig,
} from "../types";
import {
  createStatusesFromTemplate,
  getDefaultStatus,
} from "./project-statuses";

// Helper function to migrate legacy status to new system
function migrateLegacyStatus(
  legacyStatus: LegacyProjectStatus
): ProjectStatus[] {
  const legacyMapping: Record<
    LegacyProjectStatus,
    { label: string; color: string }
  > = {
    "in-progress": { label: "In Progress", color: "yellow" },
    online: { label: "Online", color: "green" },
    offline: { label: "Offline", color: "gray" },
    crashed: { label: "Crashed", color: "red" },
  };

  const mapped = legacyMapping[legacyStatus];
  return [
    {
      id: `legacy-${legacyStatus}`,
      label: mapped.label,
      color: mapped.color,
      description: `Migrated from legacy status: ${legacyStatus}`,
      order: 0,
      isDefault: true,
      createdAt: new Date().toISOString(),
    },
  ];
}

//Create new project to firebase db
export async function addProject(data: NewProjectData): Promise<string> {
  try {
    let customStatuses: ProjectStatus[];
    let currentStatus: string;

    // Create statuses from template or use default
    if (data.statusTemplate) {
      customStatuses = createStatusesFromTemplate(data.statusTemplate);
    } else {
      // Default to 'simple' template if no template specified
      customStatuses = createStatusesFromTemplate("simple");
    }

    // Set current status to default or provided status
    if (data.currentStatus) {
      // Verify the provided status exists in the template
      const statusExists = customStatuses.some(
        (s) => s.id === data.currentStatus
      );
      currentStatus = statusExists
        ? data.currentStatus
        : getDefaultStatus(customStatuses)!.id;
    } else {
      currentStatus = getDefaultStatus(customStatuses)!.id;
    }

    const projectsCol = collection(db, "projects");
    const docRef = await addDoc(projectsCol, {
      title: data.title,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      userId: data.userId,
      role: "Owner",
      techStack: data.techStack || [],
      skills: data.skills || [],
      liveUrl: data.liveUrl || "",
      repoUrl: data.repoUrl || "",
      tags: data.tags || [],
      customStatuses,
      currentStatus,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding project to Firestore:", error);
    throw new Error("Failed to create project.");
  }
}

//Delete Project from Firebase db
export async function deleteProject(
  projectId: string,
  userId: string,
  projectTitle: string
): Promise<void> {
  if (!projectId) {
    throw new Error("deleteProject: projectId is required");
  }

  try {
    const projectRef = doc(db, "projects", projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

//Get project from firebase db
export async function getProject(
  projectId: string,
  userId: string
): Promise<Project | null> {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      console.warn(`Project with ID ${projectId} does not exist.`);
      return null;
    }

    const data = projectSnap.data();

    // Check if the user owns this project
    if (data.userId !== userId) {
      console.warn(
        `User ${userId} does not have access to project ${projectId}`
      );
      return null;
    }

    // Handle legacy projects that might not have custom statuses
    let customStatuses = data.customStatuses;
    let currentStatus = data.currentStatus;

    if (!customStatuses && data.status) {
      // Migrate legacy status
      customStatuses = migrateLegacyStatus(data.status as LegacyProjectStatus);
      currentStatus = customStatuses[0].id;

      // Update the project with migrated data
      await updateDoc(projectRef, {
        customStatuses,
        currentStatus,
        updatedAt: serverTimestamp(),
      });
    } else if (!customStatuses) {
      // No status data at all, create default
      customStatuses = createStatusesFromTemplate("simple");
      currentStatus = getDefaultStatus(customStatuses)!.id;

      await updateDoc(projectRef, {
        customStatuses,
        currentStatus,
        updatedAt: serverTimestamp(),
      });
    }

    return {
      id: projectSnap.id,
      ...data,
      customStatuses,
      currentStatus,
      createdAt:
        data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    } as Project;
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw new Error("Failed to fetch project.");
  }
}

//Update project on firebase db
export async function updateProject(
  projectId: string,
  userId: string,
  data: Partial<NewProjectData>
): Promise<void> {
  try {
    // First verify the user owns this project
    const existingProject = await getProject(projectId, userId);
    if (!existingProject) {
      throw new Error("Project not found or access denied");
    }

    const projectRef = doc(db, "projects", projectId);

    // Clean the data - remove undefined values and ensure proper types
    const cleanData: any = {};

    if (data.title !== undefined) cleanData.title = data.title;
    if (data.shortDescription !== undefined)
      cleanData.shortDescription = data.shortDescription;
    if (data.longDescription !== undefined)
      cleanData.longDescription = data.longDescription;
    if (data.liveUrl !== undefined) cleanData.liveUrl = data.liveUrl;
    if (data.repoUrl !== undefined) cleanData.repoUrl = data.repoUrl;
    if (data.techStack !== undefined)
      cleanData.techStack = data.techStack || [];
    if (data.skills !== undefined) cleanData.skills = data.skills || [];
    if (data.tags !== undefined) cleanData.tags = data.tags || [];

    // Handle status updates
    if (data.currentStatus !== undefined) {
      // Verify the status exists in the project's custom statuses
      const statusExists = existingProject.customStatuses.some(
        (s) => s.id === data.currentStatus
      );
      if (statusExists) {
        cleanData.currentStatus = data.currentStatus;
      }
    }

    // Always add updatedAt timestamp
    cleanData.updatedAt = serverTimestamp();

    await updateDoc(projectRef, cleanData);
  } catch (error) {
    console.error("Error updating project in Firestore:", error);
    throw new Error(
      `Failed to update project: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(db, "projects"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(projectsQuery);
    const projects: Project[] = [];

    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();

      // Handle legacy projects during listing
      let customStatuses = data.customStatuses;
      let currentStatus = data.currentStatus;

      if (!customStatuses && data.status) {
        // Migrate legacy status
        customStatuses = migrateLegacyStatus(
          data.status as LegacyProjectStatus
        );
        currentStatus = customStatuses[0].id;
      } else if (!customStatuses) {
        // No status data at all, create default
        customStatuses = createStatusesFromTemplate("simple");
        currentStatus = getDefaultStatus(customStatuses)!.id;
      }

      projects.push({
        id: docSnapshot.id,
        ...data,
        customStatuses,
        currentStatus,
        createdAt:
          data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      } as Project);
    }

    return projects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}
