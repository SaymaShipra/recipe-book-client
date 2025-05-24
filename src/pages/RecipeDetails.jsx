import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Heart } from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Fetch recipe data and like count from backend
  useEffect(() => {
    fetch(`https://recipe-book-server-eight.vercel.app/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLikeCount(data.likes || 0);
      })
      .catch((error) => console.error("Error fetching recipe:", error));
  }, [id]);

  // Load liked state from localStorage
  useEffect(() => {
    const savedLiked = localStorage.getItem(`recipe-liked-${id}`) === "true";
    setLiked(savedLiked);
  }, [id]);

  // Toggle like with backend update
  const toggleLike = async () => {
    const newLiked = !liked;

    try {
      const res = await fetch(
        `https://recipe-book-server-eight.vercel.app/recipes/${id}/likes`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ increment: newLiked }),
        }
      );
      const data = await res.json();
      setLikeCount(data.likes);
      setLiked(newLiked);
      localStorage.setItem(`recipe-liked-${id}`, newLiked);
    } catch (error) {
      console.error("Failed to update like count", error);
    }
  };

  if (!recipe) {
    return <p className="text-center pt-20 text-lg">Loading...</p>;
  }

  const {
    title,
    image,
    time,
    type,
    ingredients,
    instructions,
    categories = [],
  } = recipe;

  const ingredientList = ingredients?.split(/\n|(?=\d+\.\s)/).filter(Boolean);
  const instructionList = instructions?.split(/\n|(?=\d+\.\s)/).filter(Boolean);

  return (
    <div className="max-w-4xl  p-6 pt-20  mx-auto">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-4">
        {likeCount} people interested in this recipe
      </p>

      <div className="relative mb-6">
        <img
          className="w-full h-96 object-cover rounded-lg shadow-lg"
          src={image}
          alt={title}
        />
        <button
          onClick={toggleLike}
          aria-label={liked ? "Unlike" : "Like"}
          title={liked ? "Unlike" : "Like"}
          className="absolute top-3 left-3 px-2 py-1 flex items-center rounded-lg gap-2 bg-white/80 hover:bg-white cursor-pointer justify-center transition"
        >
          <Heart
            size={24}
            color={liked ? "red" : "gray"}
            fill={liked ? "red" : "none"}
            strokeWidth={2}
          />
          {liked ? "Liked" : "Like"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
        <div className="badge badge-outline text-lg font-bold">{type}</div>
        <p className="text-gray-500 text-lg">Prep time: {time} mins</p>
        <p className="text-lg font-semibold text-gray-500">
          Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Categories:</h2>
        <div className="flex gap-2 flex-wrap ">
          {categories.length > 0 ? (
            categories.map((cat, idx) => (
              <span key={idx} className="badge badge-warning text-sm py-1 px-3">
                {cat}
              </span>
            ))
          ) : (
            <p className="text-gray-600">No categories listed.</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700 text-xl">
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
          <h2 className="text-2xl font-bold mb-2">Instructions</h2>
          <ul className="list-decimal list-inside text-gray-700 text-xl ">
            {instructionList && instructionList.length > 0 ? (
              instructionList.map((step, index) => (
                <li key={index}>{step.trim()}</li>
              ))
            ) : (
              <li>No instructions provided.</li>
            )}
          </ul>
        </div>
      </div>

      <Link to="/allRecipes">
        <button className="btn bg-amber-500 text-white px-6 py-2 rounded-lg">
          Back to all Recipes
        </button>
      </Link>
    </div>
  );
};

export default RecipeDetails;
