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
} from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthContext } from "./authContext";
import { requestPermissionAndGetToken } from "../firebase/firebaseMessaging";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ------------------ SAVE FCM TOKEN ------------------
  const saveTokenToDB = async (currentUser) => {
    try {
      const token = await requestPermissionAndGetToken();
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

  // ------------------ SAVE USER TO DB ------------------
  const saveUserToDB = async (userInfo, role = "user") => {
    if (!userInfo?.email) return;

    try {
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userInfo.displayName || userInfo.name || "No Name",
          email: userInfo.email,
          role,
        }),
      });
    } catch (error) {
      console.error("Error saving user to DB:", error);
    }
  };

  // ------------------ AUTH FUNCTIONS ------------------
  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signInUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  const updateUser = (name) => updateProfile(auth.currentUser, { displayName: name });

  // ------------------ SOCIAL LOGIN ------------------
  const googleSignInAndSave = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const loggedInUser = result.user;

    // Save user in MongoDB
    await saveUserToDB(loggedInUser);

    setUser(loggedInUser);
  };

  const githubSignInAndSave = async () => {
    const result = await signInWithPopup(auth, githubProvider);
    const loggedInUser = result.user;

    // Save user in MongoDB
    await saveUserToDB(loggedInUser);

    setUser(loggedInUser);
  };

  // ------------------ LISTEN TO AUTH CHANGES ------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        await saveTokenToDB(currentUser); // Save FCM token
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
    googleSignIn: googleSignInAndSave,
    githubSignIn: githubSignInAndSave,
    signOutUser,
    updateUser,
    saveUserToDB, // optional export
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
