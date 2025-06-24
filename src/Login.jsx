import React, { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGoogle, resetPassword } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      const lastSignInTime = result.user?.metadata?.lastSignInTime;

      const signInInfo = {
        email,
        lastSignInTime,
      };

      const res = await fetch(
        "https://recipe-book-server-eight.vercel.app/users",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInInfo),
        }
      );

      if (!res.ok) throw new Error("Failed to update last sign-in time");

      const data = await res.json();

      if (data.modifiedCount || data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Could not update last sign-in time.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const lastSignInTime = result.user?.metadata?.lastSignInTime;

      const signInInfo = {
        email: result.user?.email,
        lastSignInTime,
      };

      const res = await fetch(
        "https://recipe-book-server-eight.vercel.app/users",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signInInfo),
        }
      );

      if (!res.ok) throw new Error("Failed to update last sign-in time");

      await res.json();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Google Sign-In Successful.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Swal.fire({
      title: "Enter your email",
      input: "email",
      inputPlaceholder: "Your email address",
      showCancelButton: true,
      confirmButtonText: "Reset Password",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        resetPassword(result.value)
          .then(() => {
            Swal.fire("Success!", "Password reset email sent.", "success");
          })
          .catch((error) => {
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Welcome back</h1>
          <p className="text-center text-gray-500 text-lg">
            Login to your account to continue
          </p>
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input text-gray-500 w-full"
              placeholder="Email"
              required
            />
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input text-gray-500 w-full"
              placeholder="Password"
              required
            />
            <div>
              <a
                onClick={handleForgotPassword}
                className="link link-hover cursor-pointer text-gray-500"
              >
                Forgot password?
              </a>
            </div>
            <button
              className="btn text-white bg-amber-500 mt-4 w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-amber-500  border-amber-500"
            disabled={loading}
          >
            <FcGoogle />
            {loading ? "Please wait..." : "Sign In with Google"}
          </button>

          <p className="text-center mt-4 text-base">
            Don't have an account?{" "}
            <Link to="/signin" className="text-amber-500 underline font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
