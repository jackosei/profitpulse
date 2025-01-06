/* eslint-disable no-useless-catch */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import app from "./firebaseConfig";

const auth = getAuth(app);

// Function to handle user login
export const signUp = async (firstName: string, lastName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      firstName,
      lastName
    );
    return userCredential.user;
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
