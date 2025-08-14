// src/lib/actions/features-projects.ts

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { Snippet } from "../types";
import { db } from "../firebase";

// NEW STRUCTURE: projects/{projectId}/snippets/{snippetId}

// Add Code Vault - Snippets (now under project)
export async function addSnippet(
  projectId: string,
  snippet: Omit<Snippet, "id">
): Promise<string> {
  try {
    const projectSnippetsCollection = collection(
      db,
      "projects",
      projectId,
      "snippets"
    );
    const docRef = await addDoc(projectSnippetsCollection, {
      ...snippet,
      projectId, // Keep reference for easier querying if needed
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding snippet to Firestore:", error);
    throw new Error("Failed to create snippet.");
  }
}

// Update Code Vault - Snippets
export async function updateSnippet(
  projectId: string,
  snippetId: string,
  snippet: Partial<Omit<Snippet, "id">>
): Promise<void> {
  try {
    const snippetDoc = doc(db, "projects", projectId, "snippets", snippetId);
    await updateDoc(snippetDoc, {
      ...snippet,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating snippet in Firestore:", error);
    throw new Error("Failed to update snippet.");
  }
}

// Get all snippets for a specific project
export async function getProjectSnippets(
  projectId: string
): Promise<(Snippet & { id: string })[]> {
  try {
    const projectSnippetsCollection = collection(
      db,
      "projects",
      projectId,
      "snippets"
    );
    const q = query(projectSnippetsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const snippets: (Snippet & { id: string })[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Snippet;
      snippets.push({
        ...data,
        id: doc.id,
      });
    });

    return snippets;
  } catch (error) {
    console.error("Error getting project snippets from Firestore:", error);
    throw new Error("Failed to get project snippets.");
  }
}

// Get snippet by ID within a project
export async function getSnippetById(
  projectId: string,
  snippetId: string
): Promise<(Snippet & { id: string }) | null> {
  try {
    const snippetDoc = doc(db, "projects", projectId, "snippets", snippetId);
    const docSnap = await getDoc(snippetDoc);

    if (docSnap.exists()) {
      const data = docSnap.data() as Snippet;
      return {
        ...data,
        id: docSnap.id,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting snippet from Firestore:", error);
    throw new Error("Failed to get snippet.");
  }
}

// Delete Code Vault - Snippets
export async function deleteSnippet(
  projectId: string,
  snippetId: string
): Promise<void> {
  try {
    const snippetDoc = doc(db, "projects", projectId, "snippets", snippetId);
    await deleteDoc(snippetDoc);
  } catch (error) {
    console.error("Error deleting snippet from Firestore:", error);
    throw new Error("Failed to delete snippet.");
  }
}

// Get all snippets across all projects for a user (if needed)
export async function getAllUserSnippets(
  userId: string
): Promise<(Snippet & { id: string; projectId: string })[]> {
  try {
    // This would require querying all projects the user has access to
    // More complex but possible if you need cross-project snippet search
    const projectsCollection = collection(db, "projects");
    const userProjectsQuery = query(
      projectsCollection,
      where("userId", "==", userId)
    );
    const projectsSnapshot = await getDocs(userProjectsQuery);

    const allSnippets: (Snippet & { id: string; projectId: string })[] = [];

    for (const projectDoc of projectsSnapshot.docs) {
      const projectId = projectDoc.id;
      const snippetsCollection = collection(
        db,
        "projects",
        projectId,
        "snippets"
      );
      const snippetsQuery = query(
        snippetsCollection,
        orderBy("createdAt", "desc")
      );
      const snippetsSnapshot = await getDocs(snippetsQuery);

      snippetsSnapshot.forEach((snippetDoc) => {
        const data = snippetDoc.data() as Snippet;
        allSnippets.push({
          ...data,
          id: snippetDoc.id,
          projectId,
        });
      });
    }

    return allSnippets;
  } catch (error) {
    console.error("Error getting all user snippets:", error);
    throw new Error("Failed to get user snippets.");
  }
}

// Project management functions
export async function createProject(project: {
  name: string;
  description?: string;
  userId: string;
}): Promise<string> {
  try {
    const projectsCollection = collection(db, "projects");
    const docRef = await addDoc(projectsCollection, {
      ...project,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project.");
  }
}

export async function getUserProjects(userId: string) {
  try {
    const projectsCollection = collection(db, "projects");
    const q = query(
      projectsCollection,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const projects: any[] = [];
    querySnapshot.forEach((doc) => {
      projects.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return projects;
  } catch (error) {
    console.error("Error getting user projects:", error);
    throw new Error("Failed to get projects.");
  }
}
