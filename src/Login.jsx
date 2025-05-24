import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ FIXED
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import { auth } from "./firebase/firebase.init";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    try {
      await signInUser(email, password);
      Swal.fire("Success!", "Logged in successfully!", "success");
      form.reset();

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Logged in with Google successfully!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire("Error", "Please enter your email address.", "error");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent",
        text: "Please check your inbox to reset your password.",
      });
      setIsForgotPassword(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Welcome back</h1>
          <p className="text-center text-base text-gray-500">
            Login to your account to continue
          </p>

          {!isForgotPassword ? (
            <form onSubmit={handleLogin}>
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Email"
                required
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div>
                <a
                  onClick={() => setIsForgotPassword(true)}
                  className="link link-hover text-sm cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="btn bg-amber-500 text-white mt-4 w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <label className="label">Enter your email</label>
              <input
                type="email"
                className="input input-bordered w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn bg-amber-500 text-white mt-4 w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}

          <div className="divider text-gray-500">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full border-amber-400 text-amber-500"
            disabled={loading}
          >
            {loading ? "Signing in..." : <FcGoogle size={20} />} Google
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
