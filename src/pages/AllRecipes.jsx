// import React from "react";
// import { useLoaderData } from "react-router";
// import RecipesCard from "../components/RecipesCard";

// const AllRecipes = () => {
//   const recipes = useLoaderData();
//   console.log(recipes);
//   return (
//     <div className="pt-20">
//       <div className="space-y-4">
//         <h1 className="text-4xl font-bold">All Recipes</h1>
//         <p className="text-gray-500 text-xl">
//           Explore our collection of delicious recipes
//         </p>
//       </div>
//       <div className="mt-8 mb-8 flex justify-between">
//         <div className="w-xs">
//           {" "}
//           <input
//             type="search"
//             className="grow input text-lg "
//             placeholder="Search Recipes..."
//           />
//         </div>
//         <select
//           defaultValue="Select cuisine type"
//           className="select"
//           name="type"
//         >
//           <option disabled={true}>All Cuisines</option>
//           <option>Italian</option>
//           <option>Mexican</option>
//           <option>Bangladeshi</option>
//           <option>Indian</option>
//           <option>Chinese</option>
//           <option>Others</option>
//         </select>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
//         {recipes.map((recipe) => (
//           <RecipesCard key={recipe._id} recipe={recipe}></RecipesCard>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllRecipes;

import React, { useState } from "react";
import { useLoaderData } from "react-router";
import RecipesCard from "../components/RecipesCard";

const AllRecipes = () => {
  const recipes = useLoaderData();

  const [searchText, setSearchText] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisines");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesTitle = recipe.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCuisine =
      selectedCuisine === "All Cuisines" ||
      selectedCuisine === "Select cuisine type"
        ? true
        : recipe.type.toLowerCase() === selectedCuisine.toLowerCase();

    return matchesTitle && matchesCuisine;
  });

  return (
    <div className="pt-20 px-4">
      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-bold">All Recipes</h1>
        <p className="text-gray-500 text-xl">
          Explore our collection of delicious recipes
        </p>
      </div>

      <div className="mt-8 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-1/3">
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full text-lg"
            placeholder="Search Recipes..."
          />
        </div>

        <select
          value={selectedCuisine}
          onChange={(e) => setSelectedCuisine(e.target.value)}
          className="select select-bordered w-full md:w-1/4 text-lg"
          name="type"
        >
          <option disabled>Select cuisine type</option>
          <option>All Cuisines</option>
          <option>Italian</option>
          <option>Mexican</option>
          <option>Bangladeshi</option>
          <option>Indian</option>
          <option>Chinese</option>
          <option>Others</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipesCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p className="text-gray-500 text-xl col-span-full text-center">
            No recipes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
