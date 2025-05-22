import React from "react";
import { Link } from "react-router"; // Correct import here

const categories = [
  {
    id: "breakfast",
    name: "Breakfast",
    image: "https://i.ibb.co/vvQfMCqr/photo-1533089860892-a7c6f0a88666.jpg",
  },
  {
    id: "lunch",
    name: "Lunch",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "dinner",
    name: "Dinner",
    image:
      "https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "dessert",
    name: "Dessert",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=400&auto=format&fit=crop",
  },
];

const Category = () => {
  return (
    <div className="py-16 mt-20 px-4 bg-gray-100">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
          <p className="text-gray-600">
            Explore recipes by meal type to find your next favorite dish
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              // to={`/recipes?category=${category.id}`}
              to="/allRecipes"
              className="group"
            >
              <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://via.placeholder.com/400?text=No+Image")
                    }
                  />
                </div>
                <div className="text-center py-3 bg-white">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
