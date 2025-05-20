import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import AllRecipes from "../pages/AllRecipes.jsx";
import MyRecipes from "../pages/MyRecipes.jsx";
import UpdateRecipe from "../pages/UpdateRecipe.jsx";

export const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allRecipes",
        Component: AllRecipes,
      },
      {
        path: "MyRecipes",
        Component: MyRecipes,
      },
      {
        path: "updateRecipe",
        Component: UpdateRecipe,
      },
    ],
  },
]);

export default Router;
