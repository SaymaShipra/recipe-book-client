import React, { useState, useEffect } from "react";
import { Zoom } from "react-awesome-reveal";
import { Link } from "react-router";
import { Heart } from "lucide-react";

const RecipesCard = ({ recipe }) => {
  const { _id, title, image, time, type, instructions, likes = 0 } = recipe;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const savedLiked = localStorage.getItem(`recipe-liked-${_id}`) === "true";
    setLiked(savedLiked);
  }, [_id]);

  const toggleLike = async () => {
    const increment = !liked;

    try {
      const res = await fetch(
        `https://recipe-book-server-eight.vercel.app/recipes/${_id}/likes`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ increment }),
        }
      );
      const data = await res.json();
      setLikeCount(data.likes);
      setLiked(increment);
      localStorage.setItem(`recipe-liked-${_id}`, increment);
    } catch (error) {
      console.error("Failed to update like count", error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-sm relative">
      <figure className="overflow-hidden relative h-48">
        <Zoom triggerOnce>
          <img
            className="transition-transform duration-300 hover:scale-105 hover:shadow-xl overflow-hidden object-cover w-full h-full"
            src={image}
            alt={title}
          />
        </Zoom>
      </figure>

      <div className="p-5">
        <h2 className="text-3xl text-white font-bold relative -top-20">
          {title}
        </h2>
        <div className="flex justify-between -mt-5">
          <div className="badge badge-outline font-bold">{type}</div>

          <button
            onClick={toggleLike}
            aria-label={liked ? "Unlike" : "Like"}
            title={liked ? "Unlike" : "Like"}
            className="p-1 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition"
          >
            <Heart
              size={24}
              color={liked ? "red" : "gray"}
              fill={liked ? "red" : "none"}
              strokeWidth={2}
            />
            <span className="ml-1 font-semibold text-gray-800">
              {likeCount}
            </span>
          </button>
        </div>

        <p className="text-gray-700 pt-4">
          <span className="font-semibold">Instructions:</span>
          <br />
          {showFull || instructions.length <= 100
            ? instructions
            : `${instructions.slice(0, 100)}...`}
          {instructions.length > 100 && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="ml-2 text-amber-500 underline font-medium"
            >
              {showFull ? "See less" : "See more"}
            </button>
          )}
        </p>

        <p className="text-gray-500 pt-4 pb-4">Prep time: {time} mins</p>
        <div>
          <Link to={`/recipe/${_id}`}>
            <button className="btn bg-amber-500 text-lg text-white w-full rounded-lg">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipesCard;
