import React, { useState, useEffect, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "",
      });

      await user.reload();
      setCurrentUser({ ...auth.currentUser });
      setError(null);
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      return user;
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
      throw new Error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, GoogleAuthProvider);
      const user = result.user;

      await user.reload();

      setCurrentUser({ ...auth.currentUser });
      Swal.fire({
        icon: "success",
        title: "Signed in with Google",
        text: `Welcome, ${user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Google Sign-in Failed",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      await auth.currentUser.reload();
      setCurrentUser({ ...auth.currentUser });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        setCurrentUser({ ...auth.currentUser });
        console.log(
          "Auth state changed: user photoURL:",
          auth.currentUser.photoURL
        );
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const authContextValue = useMemo(
    () => ({
      currentUser,
      userData,
      setUserData,
      error,
      loading,
      createUser,
      signInUser,
      logout,
      updateUserProfile,
      signInWithGoogle,
    }),
    [currentUser, userData, error, loading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
