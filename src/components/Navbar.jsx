import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { PiNotebookFill } from "react-icons/pi";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-6 md:px-16 lg:px-64 border-b border-gray-200">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52  p-8 shadow text-lg"
          >
            <li className="text-lg ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-gray-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="text-lg ">
              <NavLink
                to="/allRecipes"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-gray-500"
                }
              >
                All Recipes
              </NavLink>
            </li>
            <li className="text-lg">
              <NavLink
                to="/addRecipe"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-gray-500"
                }
              >
                Add Recipe
              </NavLink>
            </li>
            <li className="text-lg">
              <NavLink
                to="/myRecipes"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-gray-500"
                }
              >
                My Recipes
              </NavLink>
            </li>
            <li className="text-lg">
              <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-gray-500"
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li className="text-lg">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "text-amber-500" : "text-gray-500"
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
        <h1 className=" text-2xl lg:text-3xl font-medium text-amber-500 flex gap-2 items-center">
          <PiNotebookFill />
          <span className="font-extrabold ">Recipe </span>Book
        </h1>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className=" gap-6 menu-horizontal px-1">
          <li className="text-lg">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-gray-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              to="/allRecipes"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-gray-500"
              }
            >
              All Recipes
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              to="/addRecipe"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-gray-500"
              }
            >
              Add Recipe
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              to="/myRecipes"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-gray-500"
              }
            >
              My Recipes
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-gray-500"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="text-lg">
            <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive ? "text-amber-500" : "text-gray-500"
              }
            >
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle> </ThemeToggle>
        {currentUser ? (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost flex items-center gap-2"
            >
              <div className="text-right hidden sm:block"></div>
              <img
                src={
                  currentUser.photoURL ||
                  +encodeURIComponent(currentUser?.displayName || "User")
                }
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-green-600"
              />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60"
            >
              <div className="border-b-1 border-gray-200 pb-4 pt-4">
                <h1 className="text-lg font-bold text-gray-700">
                  {currentUser.displayName || "User"}
                </h1>
                <p>{currentUser.email || "User"}</p>
              </div>

              <li>
                <NavLink to="/allRecipes" className="text-base">
                  All Recipes
                </NavLink>
              </li>
              <li>
                <NavLink to="/myRecipes" className="text-base">
                  My Recipes
                </NavLink>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-base text-red-500 border-t-1 border-gray-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="btn btn-outline "
            >
              SignIn
            </button>
            <button
              onClick={() => navigate("/login")}
              className="btn bg-amber-500 text-white"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
