import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const slides = [
  {
    image: "https://i.ibb.co/39CnNStB/photo-1504674900247-0877df9cc836.jpg",
    title: "Discover Delicious Recipes",
    description: "Explore thousands of meal ideas for any occasion",
  },
  {
    image:
      "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=2070&auto=format&fit=crop",
    title: "Share Your Culinary Creations",
    description: "Upload and share your favorite recipes with the community",
  },
  {
    image:
      "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=2126&auto=format&fit=crop",
    title: "Save Recipes for Later",
    description: "Create your personal collection of must-try dishes",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative md:h-[500px] lg:h-[700px]  overflow-hidden ">
      {/* Background Layers */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 md:px-8 text-white">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl mb-6">{slides[currentSlide].description}</p>
          <div className="flex gap-4">
            <Link to="/allRecipes">
              {" "}
              <button className="btn bg-amber-500 text-white hover:bg-gray-200 text-lg">
                Browse Recipes
              </button>
            </Link>
            <Link to="/addRecipe">
              {" "}
              <button className="btn bg-transparent border border-white text-white text-lg hover:bg-white hover:text-black">
                Share Recipe
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
