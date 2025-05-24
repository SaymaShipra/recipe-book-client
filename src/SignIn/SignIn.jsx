import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const SignIn = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await createUser(email, password, name, photoURL);

      // ✅ Save user to MongoDB
      await axios.post("https://recipe-book-server-eight.vercel.app/users", {
        name,
        email,
        photoURL,
      });

      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/login");
    } catch (error) {
      setRegisterError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setRegisterError("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // ✅ Save Google user to MongoDB
      await axios.post("https://recipe-book-server-eight.vercel.app/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      Swal.fire("Success!", "Signed in with Google successfully!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      setRegisterError(error.message);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow-md rounded-xl bg-white mb-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {registerError && (
          <p className="text-red-500 text-sm mb-3">{registerError}</p>
        )}

        <Link to="/login">
          {" "}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-500"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </Link>
      </form>

      <p className="text-center text-sm my-4">
        Already have an account?{" "}
        <Link to="/login" className="text-amber-500 hover:underline">
          Login
        </Link>
      </p>

      <div className="text-center mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
