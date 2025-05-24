import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

const Login = () => {
  const { signInUser, signInWithGoogle, resetPassword } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await signInUser(email, password);
      Swal.fire("Success!", "Logged in successfully!", "success");
      navigate(from, { replace: true });
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // ✅ Save user to MongoDB
      await axios.post("https://recipe-book-server-eight.vercel.app/users", {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Logged in with Google successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!emailForReset) {
      Swal.fire("Error", "Please enter your email to reset password", "error");
      return;
    }
    try {
      setLoading(true);
      await resetPassword(emailForReset);
      setEmailForReset("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">
            Login to your account
          </h1>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <form onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              required
              onChange={(e) => setEmailForReset(e.target.value)}
              value={emailForReset}
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              required
            />
            <button
              type="submit"
              className="btn bg-amber-500 text-white mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full border-amber-400 text-amber-500 mt-4"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <FcGoogle size={20} className="mr-2" />
                Sign in with Google
              </>
            )}
          </button>

          <button
            onClick={handleForgotPassword}
            className="btn btn-link text-amber-500 mt-4 underline"
            disabled={loading}
          >
            Forgot Password?
          </button>

          <p className="text-center mt-4 text-base">
            Don't have an account?{" "}
            <Link to="/signin" className="text-amber-500 underline font-bold">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
