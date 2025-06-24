import React, { useState, useEffect, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create user with email & password
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

      Swal.fire("Success", "User registered successfully!", "success");
      return user;
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email & password
  const signInUser = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      setCurrentUser(user);
      setError(null);

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
      Swal.fire("Login Failed", err.message, "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await user.reload();
      setCurrentUser({ ...auth.currentUser });
      setError(null);

      Swal.fire({
        icon: "success",
        title: "Signed in with Google",
        text: `Welcome, ${user.displayName || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      return user;
    } catch (err) {
      setError(err.message);
      Swal.fire("Google Sign-in Failed", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserData(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Update user profile
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
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire("Success", "Password reset email sent!", "success");
      setError(null);
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Observe auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        setCurrentUser({ ...auth.currentUser });
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
      resetPassword,
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
