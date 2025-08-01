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
    console.log("Add New User Data Received", newUser);
    return docRef.id;
  } catch (error) {
    console.log("Error receiving user data:", error);
    throw new Error("Failed receiving user data");
  }
}
// export async function addNewUser(data: NewUser): Promise<string> {
//   try {
//     const newUser = data;

//     console.log("Add New User Data Received", newUser);
//     return newUser.email;
//   } catch (error) {
//     console.log("Error receiving user data:", error);
//     throw new Error("Failed receiving user data");
//   }
// }
