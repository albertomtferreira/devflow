// src/lib/actions/users.ts

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NewUser } from "../types";
import { db } from "../firebase";

export async function addNewUser(data: NewUser): Promise<string> {
  try {
    const newUser = collection(db, "users");
    const docRef = await addDoc(newUser, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error("Failed receiving user data");
  }
}
