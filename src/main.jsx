import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import Home from "./pages/Home.jsx";
import AddRecipe from "./pages/AddRecipe.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import AllRecipes from "./pages/AllRecipes.jsx";
import MyRecipes from "./pages/MyRecipes.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "addRecipe",
        Component: AddRecipe,
      },
      {
        path: "allRecipes",
        Component: AllRecipes,
      },
      {
        path: "myRecipes",
        Component: MyRecipes,
      },
      {
        path: "recipeDetails",
        Component: RecipeDetails,
      },
      {
        path: "notFound",
        Component: NotFound,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
