"use client";
import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "./authContext";
import { requestPermissionAndGetToken } from "../firebase/firebaseMessaging";


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveTokenToDB = async (currentUser) => {
    try {
      const token = await requestPermissionAndGetToken();
      console.log("FCM token:", token); // must show a valid string
      if (!token) return;

      const idToken = await currentUser.getIdToken();

      await fetch("/api/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          email: currentUser.email,
          fcmToken: token,
        }),
      });

      console.log("FCM token saved to DB:", token);
    } catch (err) {
      console.error("Error saving FCM token:", err);
    }
  };

  const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);
  const signInUser = (email, password) => signInWithEmailAndPassword(auth, email, password);
  const googleSignIn = () => signInWithPopup(auth, googleProvider);
  const githubSignIn = () => signInWithPopup(auth, githubProvider);
  const passwordReset = (email) => sendPasswordResetEmail(auth, email);
  const signOutUser = () => signOut(auth);
  const updateUser = (name) => updateProfile(auth.currentUser, { displayName: name });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await saveTokenToDB(currentUser);
      }
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    loading,
    setUser,
    createUser,
    signInUser,
    googleSignIn,
    githubSignIn,
    passwordReset,
    signOutUser,
    updateUser,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
