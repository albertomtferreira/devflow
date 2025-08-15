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
import { NewProjectData, Project, ProjectStatus } from "../types";

//Create new project to firebase db
export async function addProject(data: NewProjectData): Promise<string> {
  try {
    const projectsCol = collection(db, "projects");
    const docRef = await addDoc(projectsCol, {
      ...data,
      status: data.status || ("in-progress" as ProjectStatus), // Use provided status or fallback to in-progress
      role: "Owner",
      techStack: data.techStack || [],
      skills: data.skills || [],
      liveUrl: data.liveUrl || "",
      repoUrl: data.repoUrl || "",
      tags: data.tags || [],
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

    return {
      id: projectSnap.id,
      ...data,
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
  userId: string, // Add userId for security
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
    if (data.status !== undefined) cleanData.status = data.status;

    // Always add updatedAt timestamp (even though it's not in your interface, it's useful for tracking)
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

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      } as Project);
    });

    return projects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw new Error("Failed to fetch projects.");
  }
}
