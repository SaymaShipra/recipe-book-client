import React from "react";
import { ChefHat } from "lucide-react";
import { Link } from "react-router";

const chefs = [
  {
    id: 1,
    name: "Maria Rodriguez",
    specialty: "Mediterranean Cuisine",
    image: "https://i.ibb.co/r2QJRTj3/matheen-faiz-v0rc-Iy-GZn6-M-unsplash.jpg",
    bio: "With 15 years of experience in Mediterranean cuisine, Maria brings authentic flavors from across the region.",
  },
  {
    id: 2,
    name: "James Chen",
    specialty: "Asian Fusion",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1974&auto=format&fit=crop",
    bio: "James specializes in combining traditional Asian techniques with modern culinary innovations.",
  },
  {
    id: 3,
    name: "Sophia Williams",
    specialty: "Pastry & Desserts",
    image:
      "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?q=80&w=1974&auto=format&fit=crop",
    bio: "Award-winning pastry chef known for creating stunning desserts that taste as good as they look.",
  },
  {
    id: 4,
    name: "Luca Moretti",
    specialty: "Italian Classics",
    image: "https://i.ibb.co/RkJ9SMJ3/hemant-latawa-RKdk-ETvc-Yn4-unsplash.jpg",
    bio: "Born and raised in Naples, Luca crafts traditional Italian dishes with a modern twist, honoring his grandmother's recipes.",
  },
  {
    id: 5,
    name: "Ayesha Khan",
    specialty: "Middle Eastern Delights",
    image: "https://i.ibb.co/dsMX80Gd/fotos-2-QRk56-RJJN8-unsplash.jpg",
    bio: "Ayesha brings the warmth of Middle Eastern hospitality and spices to the table, with a focus on healthy and vibrant dishes.",
  },
];

const ChefSection = () => {
  return (
    <div className="py-16 px-4 bg-base-200">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
            <ChefHat className="h-6 w-6 text-amber-500" />
            <span className="text-sm font-semibold text-amber-500 uppercase">
              Our Professionals
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Expert Chefs
          </h2>
          <p className="text-base-content/70 max-w-xl mx-auto">
            Our talented chefs bring years of culinary expertise and passion to
            create the delicious recipes you love.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chefs.map((chef) => (
            <div
              key={chef.id}
              className="card bg-base-100 shadow-md border hover:shadow-lg transition-shadow"
            >
              <figure className="h-64 overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </figure>
              <div className="card-body flex flex-col">
                <h3 className="card-title text-xl">{chef.name}</h3>
                <p className="text-amber-500 font-medium">{chef.specialty}</p>
                <p className="text-base-content/70 flex-grow">{chef.bio}</p>
                <div className="mt-4">
                  <Link to="/AllRecipes">
                    {" "}
                    <button className="btn bg-amber-500 text-white w-full">
                      View Recipes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChefSection;
