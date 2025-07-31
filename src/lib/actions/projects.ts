// src/lib/actions/projects.ts

import { collection, addDoc, serverTimestamp, getDoc, doc, query, where, getDocs } from 'firebase/firestore';
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
      status: 'in-progress',
      role: 'Owner',
      techStack: [],
      skills: [],
      liveUrl: '',
      repoUrl: '',
      createdAt: serverTimestamp(),
    });
    
    return docRef.id;
  } catch (error) {
    console.error("Error adding project to Firestore:", error);
    throw new Error('Failed to create project.');
  }
}

export async function getProject(projectId: string, userId: string): Promise<Project | null> {
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
      console.warn(`User ${userId} does not have access to project ${projectId}`);
      return null;
    }

    return {
      id: projectSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
    } as Project;
  } catch (error) {
    console.error(`Error fetching project with ID ${projectId}:`, error);
    throw new Error('Failed to fetch project.');
  }
}

export async function getUserProjects(userId: string): Promise<Project[]> {
  try {
    const projectsQuery = query(
      collection(db, 'projects'), 
      where('userId', '==', userId)
    );
    
    const querySnapshot = await getDocs(projectsQuery);
    const projects: Project[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
      } as Project);
    });
    
    return projects;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw new Error('Failed to fetch projects.');
  }
}