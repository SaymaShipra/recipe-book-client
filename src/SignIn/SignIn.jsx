import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router"; // Fixed import from react-router-dom

const SignIn = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLengthValid = password.length >= 6;

    if (!hasUppercase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowercase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!isLengthValid) {
      return "Password must be at least 6 characters long.";
    }

    return ""; // No error
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { email, password, name, photo, ...restFormData } =
      Object.fromEntries(formData.entries());

    const errorMsg = validatePassword(password);
    if (errorMsg) {
      setPasswordError(errorMsg);
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password, name, photo)
      .then((result) => {
        const userProfile = {
          email,
          name,
          photo,
          ...restFormData,
          creationTime: result.metadata?.creationTime,
          lastSignInTime: result.metadata?.lastSignInTime,
        };

        fetch("https://recipe-book-server-eight.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your account is created.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/login");
            }
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Sign Up failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        const userProfile = {
          email: result.user?.email,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
        };

        fetch("https://recipe-book-server-eight.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Google Sign-In Successful.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Create an account</h1>
          <form onSubmit={handleSignUp} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input text-gray-500 w-full"
              placeholder="Name"
              required
            />

            <label className="label">Photo</label>
            <input
              type="text"
              name="photo"
              className="input text-gray-500 w-full"
              placeholder="Photo URL"
            />

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
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}

            <div>
              <a className="link link-hover cursor-pointer text-gray-500">
                Forgot password?
              </a>
            </div>

            <button className="btn text-white bg-amber-500 mt-4 w-full">
              Register
            </button>
          </form>

          <div className="divider">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2 text-amber-500 border-amber-500"
          >
            <FcGoogle />
            Sign In with Google
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
