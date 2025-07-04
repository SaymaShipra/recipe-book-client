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
import SignIn from "./SignIn/SignIn.jsx";
import Login from "./Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import UpdateRecipe from "./components/UpdateRecipe.jsx";
import PrivateRoute from "./router/PrivateRoute.jsx";
import Contact from "./pages/Contact.jsx";
import Overview from "./pages/Overview.jsx";
import AllItems from "./components/AllItems.jsx";
import AddItem from "./components/AddItem.jsx";
import MyItems from "./components/MyItems.jsx";
import DashboardLayout from "./pages/DashboardLayout.jsx";
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
        Component: () => (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "allRecipes",
        loader: () =>
          fetch("https://recipe-book-server-eight.vercel.app/recipes"),
        Component: AllRecipes,
      },
      {
        path: "myRecipes",
        Component: () => (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "recipe/:id",
        Component: RecipeDetails,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "*",
        Component: NotFound,
      },
      // ======= Dashboard Routes =======
      {
        path: "dashboard",
        Component: () => (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true, // default dashboard overview
            Component: Overview,
          },
          {
            path: "allItems",
            Component: AllItems,
          },
          {
            path: "addItem",
            Component: AddItem,
          },
          {
            path: "myItems",
            Component: MyItems,
          },
        ],
      },
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "updateRecipe/:id",
        loader: ({ params }) =>
          fetch(
            `https://recipe-book-server-eight.vercel.app/recipes/${params.id}`
          ),
        Component: ({ params }) => (
          <PrivateRoute>
            <UpdateRecipe params={params} />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
