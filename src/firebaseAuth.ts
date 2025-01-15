/* eslint-disable no-useless-catch */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { app, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const auth = getAuth(app);

// Save user info to Firestore
const saveUserInfo = async (
  userId: string,
  displayName: string,
  email: string
) => {
  try {
    await setDoc(doc(db, "users", userId), {
      displayName,
      email,
      createdAt: new Date(),
    });
    console.log("User info saved!");
  } catch (error) {
    console.error("Error saving user info:", error);
  }
};

// Function to handle user signup
export const signUp = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Call saveUserInfo to save user details in Firestore
    await saveUserInfo(user.uid, displayName, user.email as string);

    return user;
  } catch (error) {
    throw error;
  }
};

// Function to handle user login
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Function to handle user logout
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};
