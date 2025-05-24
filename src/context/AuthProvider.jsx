import React, { useState, useEffect, useMemo } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail, // added here
} from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
      Swal.fire("Success", "User Registered Successfully", "success");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
      throw err;
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
      setCurrentUser(userCredential.user);
      Swal.fire("Success", "Logged In Successfully", "success");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);

      // 🔥 Save to MongoDB
      await axios.post("https://recipe-book-server-eight.vercel.app/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      Swal.fire("Success", "Logged In with Google", "success");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  // NEW forgot password function
  const resetPassword = async (email) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire("Success", "Password reset email sent!", "success");
    } catch (err) {
      setError(err.message);
      Swal.fire("Error", err.message, "error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const authContextValue = useMemo(
    () => ({
      currentUser,
      loading,
      error,
      createUser,
      signInUser,
      signInWithGoogle,
      logout,
      resetPassword, // included here
    }),
    [currentUser, loading, error]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
