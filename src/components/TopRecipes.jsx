import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // fixed import
import { Heart } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
const TopRecipes = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
    fetch("https://recipe-book-server-eight.vercel.app/recipes")
      .then((res) => res.json())
      .then((data) => {
        const cleanedData = data.map((recipe) => {
          const id =
            recipe._id && typeof recipe._id === "object" && "$oid" in recipe._id
              ? recipe._id.$oid
              : recipe._id;

          return { ...recipe, _id: id };
        });

        const sorted = cleanedData.sort(
          (a, b) => (b.likes || 0) - (a.likes || 0)
        );
        setTopRecipes(sorted.slice(0, 6));
      })
      .catch((err) => {
        console.error("Failed to fetch top recipes:", err);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto p-6">
      <div className="flex justify-between">
        {" "}
        <h2 className="text-3xl font-bold mb-4">Top Recipes</h2>
        <Link to="/AllRecipes">
          {" "}
          <button className="cursor-pointer flex items-center gap-2 text-amber-500 underline text-xl">
            <span>
              {" "}
              <FaArrowRightLong />{" "}
            </span>
            See All Recipes
          </button>
        </Link>
      </div>
      <p className="text-gray-400 text-lg pb-5">
        Most loved recipes by our community
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topRecipes.map((recipe) => {
          const { _id, title, image, type, time, likes } = recipe;

          return (
            <div
              key={_id}
              className="border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition bg-white overflow-hidden"
            >
              <img
                src={image}
                alt={title}
                className="h-56 w-full object-cover"
              />
              <div className="p-4 space-y-3 relative">
                <h3 className="text-3xl text-black font-bold">{title}</h3>

                <div className="flex justify-between items-center">
                  <div className="badge badge-outline font-bold">{type}</div>

                  <div className="p-1 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition">
                    <Heart
                      size={24}
                      color="orange"
                      fill="orange"
                      strokeWidth={2}
                    />
                    <span className="ml-1 font-semibold text-gray-800">
                      {likes || 0}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600">Prep time: {time} mins</p>

                <Link
                  to={`/recipe/${_id}`}
                  className="btn bg-amber-500 w-full text-white text-lg rounded-lg block text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRecipes;
