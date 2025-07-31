// src/lib/actions/projects.ts
'use server';

import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Project } from '../types';

interface NewProjectData {
  title: string;
  description: string;
  userId: string;
}

export async function addProject(data: NewProjectData): Promise<string> {
  try {
    const projectsCol = collection(db, 'projects');
    const docRef = await addDoc(projectsCol, {
      ...data,
      status: 'in-progress', // Default status
      role: 'Owner',         // Default role
      techStack: [],
      skills: [],
      liveUrl: '',
      repoUrl: '',
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;

  } catch (error) {
    console.error("Error adding project to Firestore:", error);
    // In a real app, you might want to throw a more specific error
    // to be handled by the calling function.
    throw new Error('Failed to create project.');
  }
}

export async function getProject(projectId: string): Promise<Project | null> {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      console.warn(`Project with ID ${projectId} does not exist.`);
      return null;
    }

    const data = projectSnap.data();
    return {
      id: projectSnap.id,
      ...data,
      // Ensure createdAt is a serializable string
      createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    } as Project;

  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw new Error('Failed to fetch project.');
  }
}
