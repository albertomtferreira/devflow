// src/lib/actions/features-projects.ts

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Snippet } from "../types";
import { db } from "../firebase";

// Add Code Vault - Snippets
export async function addSnippet(snippet: Snippet): Promise<string> {
  try {
    const projectSnippet = collection(db, "snippets");
    const docRef = await addDoc(projectSnippet, {
      ...snippet,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding snippet to Firestore:", error);
    throw new Error("Failed to create snippet.");
  }
}

// Edit Code Vault - Snippets

// Delete Code Vault - Snippets
