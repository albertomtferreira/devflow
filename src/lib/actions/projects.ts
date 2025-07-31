// src/lib/actions/projects.ts
'use server';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { revalidatePath } from 'next/cache';

interface NewProjectData {
  title: string;
  description: string;
  userId: string;
}

export async function addProject(data: NewProjectData) {
  try {
    const projectsCol = collection(db, 'projects');
    await addDoc(projectsCol, {
      ...data,
      status: 'in-progress', // Default status
      role: 'Owner',         // Default role
      createdAt: serverTimestamp(),
    });
    
    // Revalidate the dashboard page to show the new project
    revalidatePath('/dashboard');

  } catch (error) {
    console.error("Error adding project to Firestore:", error);
    // In a real app, you might want to throw a more specific error
    // to be handled by the calling function.
    throw new Error('Failed to create project.');
  }
}
