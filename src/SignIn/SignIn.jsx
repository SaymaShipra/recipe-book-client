import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ FIXED
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // ✅ safer default

  const validatePassword = (password) => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const minLength = 6;

    if (!upperCaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowerCaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const photoURL = form.url.value;

    setRegisterError("");

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    } else {
      setPasswordError("");
    }

    try {
      setLoading(true);
      await createUser(email, password, name, photoURL);
      Swal.fire("Success!", "Account created successfully!", "success");
      navigate("/login");
    } catch (err) {
      setRegisterError(err.message);
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Signed in with Google successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setRegisterError(error.message);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Create an account</h1>
          {registerError && <p className="text-red-500">{registerError}</p>}
          <form onSubmit={handleRegister}>
            <label className="label">Full Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              required
            />

            <label className="label">Photo URL (optional)</label>
            <input
              type="text"
              name="url"
              className="input input-bordered w-full"
              placeholder="https://example.com/photo.jpg"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              required
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}

            <label className="label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="input input-bordered w-full"
              required
            />

            <button
              type="submit"
              className="btn bg-amber-500 text-white mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="divider text-gray-500">OR CONTINUE WITH</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full border-amber-400 text-amber-500"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <FcGoogle size={20} className="mr-2" />
                Google
              </>
            )}
          </button>

          <p className="text-center mt-4 text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 underline font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
