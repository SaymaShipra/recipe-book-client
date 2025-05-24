import React from "react";
import { Link, NavLink } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-gray-400 mt-auto pt-10">
      <div className=" px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 w-11/12 mx-auto">
          <div>
            <Link to="/" className="flex items-center">
              {/* <img
                src="/recipe-logo.svg"
                alt="Recipe Book Logo"
                className="h-8 w-8"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/32";
                }}
              /> */}
              <span className="ml-2 text-3xl font-semibold text-amber-500">
                Recipe Book
              </span>
            </Link>
            <p className="mt-4 text-base  text-gray-500 max-w-xs">
              Your personal collection of delicious recipes. Discover, save, and
              share your favorite dishes.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-medium">Links</h3>
            <ul className="mt-4 space-y-2">
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
            </ul>
          </div>

          <div className="">
            <h3 className="text-xl font-medium">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="mailto:contact@recipebook.com"
                  className="text-base text-gray-500 hover:text-amber-500 transition-colors"
                >
                  contact@recipebook.com
                </a>
              </li>
              <li className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-amber-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-amber-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-amber-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-400 pt-6">
          <p className="text-lg text-gray-500 text-center">
            &copy; {currentYear} Recipe Book. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
