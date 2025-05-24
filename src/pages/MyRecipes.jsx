import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Heart } from "lucide-react";
import { NavLink } from "react-router";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LiaEditSolid } from "react-icons/lia";
import deleteAnimation from "../assets/animations/delete.json";
import Lottie from "lottie-react";
const MyRecipes = () => {
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState({});

  useEffect(() => {
    if (currentUser?.email) {
      fetch(`http://localhost:3200/myRecipes/${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
          const initialLikes = {};
          data.forEach((recipe) => {
            initialLikes[recipe._id] = recipe.likedUsers?.includes(
              currentUser.email
            );
          });
          setLikedRecipes(initialLikes);
        });
    }
  }, [currentUser]);

  const toggleLike = async (recipeId) => {
    const isLiked = likedRecipes[recipeId];
    const newLiked = !isLiked;

    // Optimistic UI update
    setLikedRecipes((prev) => ({ ...prev, [recipeId]: newLiked }));
    setRecipes((prev) =>
      prev.map((r) =>
        r._id === recipeId
          ? {
              ...r,
              likes: newLiked ? (r.likes || 0) + 1 : (r.likes || 1) - 1,
            }
          : r
      )
    );

    try {
      const res = await fetch(
        `http://localhost:3200/recipes/${recipeId}/likes`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            increment: newLiked,
            userEmail: currentUser.email,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update like");

      const data = await res.json();
      setRecipes((prev) =>
        prev.map((r) => (r._id === recipeId ? { ...r, likes: data.likes } : r))
      );
    } catch (error) {
      console.error("Like update failed:", error);
      // Rollback UI
      setLikedRecipes((prev) => ({ ...prev, [recipeId]: isLiked }));
      setRecipes((prev) =>
        prev.map((r) =>
          r._id === recipeId
            ? {
                ...r,
                likes: isLiked ? (r.likes || 0) + 1 : (r.likes || 1) - 1,
              }
            : r
        )
      );
    }
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3200/recipes/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your recipe has been deleted.", "success");
              const remainingRecipes = recipes.filter((r) => r._id !== _id);
              setRecipes(remainingRecipes);
            }
          });
      }
    });
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {recipes.map((recipe) => {
        const ingredientList = recipe.ingredients
          ?.split(/\n|(?=\d+\.\s)/)
          .filter(Boolean);

        return (
          <div key={recipe._id} className="border rounded-lg shadow">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold mb-2">{recipe.title}</h2>
                <button
                  onClick={() => toggleLike(recipe._id)}
                  aria-label={likedRecipes[recipe._id] ? "Unlike" : "Like"}
                  title={likedRecipes[recipe._id] ? "Unlike" : "Like"}
                  className="flex items-center gap-1 text-orange-500"
                >
                  <Heart
                    size={24}
                    color={likedRecipes[recipe._id] ? "orange" : "gray"}
                    fill={likedRecipes[recipe._id] ? "orange" : "none"}
                    strokeWidth={2}
                  />
                  <span className="font-semibold text-gray-800">
                    {recipe.likes || 0}
                  </span>
                </button>
              </div>
              <div className="flex gap-4">
                <p className="badge badge-ghost text-sm py-1 px-3 font-semibold text-gray-600">
                  {recipe.type}
                </p>
                <p className="text-gray-600"> {recipe.time} mins</p>
              </div>

              <div className="mt-3">
                <h3 className="text-xl font-semibold mb-1">Ingredients:</h3>
                <ul className="list-disc list-inside text-gray-700 text-lg ">
                  {ingredientList && ingredientList.length > 0 ? (
                    ingredientList.map((item, index) => (
                      <li key={index}>{item.trim()}</li>
                    ))
                  ) : (
                    <li>No ingredients listed.</li>
                  )}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-xl ">
                  categories: <br />
                  <span className="badge badge-ghost text-sm py-1 px-3">
                    {recipe.categories}
                  </span>
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <NavLink to={`/updateRecipe/${recipe._id}`} className="flex">
                  <button className="btn">
                    {" "}
                    <span>
                      <LiaEditSolid size="20" />
                    </span>
                    Update
                  </button>
                </NavLink>

                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="btn btn-error text-white flex items-center -gap-4 "
                >
                  <span className="-ml-8 -mr-2">
                    {" "}
                    <Lottie
                      animationData={deleteAnimation}
                      loop={true}
                      className="w-20 h-20 text-white"
                    />
                  </span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyRecipes;
