import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const AddRecipe = () => {
  const { currentUser } = useContext(AuthContext);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const categories = formData.getAll("categories");
    const newRecipe = Object.fromEntries(formData.entries());

    newRecipe.categories = categories;
    newRecipe.likes = 0;

    // Add logged-in user's email to the recipe object
    newRecipe.userEmail = currentUser?.email || "anonymous@example.com";

    fetch("http://localhost:3200/recipes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Recipe added successfully!",
            icon: "success",
            draggable: true,
          });
          form.reset();
        }
      });
  };

  return (
    <div className="p-4 w-11/12 mx-auto">
      <div className=" space-y-2 pt-10">
        <h1 className="text-4xl font-bold ">Add Recipe</h1>
        <p className="text-gray-600">
          Share your culinary creations with the world
        </p>
      </div>
      <form onSubmit={handleAddRecipe} className="pt-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 text-lg">
            <label className="label">Recipe Title</label>
            <input
              type="text"
              name="title"
              className="input w-full "
              placeholder="Recipe Name"
            />
          </fieldset>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 text-lg ">
            <label className="label">Image URL</label>
            <input
              type="text"
              name="image"
              className="input w-full"
              placeholder="https://example.com/image.jpg"
            />
          </fieldset>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 text-lg">
            <label className="label">Cuisine Type</label>

            <select
              defaultValue="Select cuisine type"
              className="select"
              name="type"
            >
              <option disabled={true}>Select cuisine type</option>
              <option>Italian</option>
              <option>Mexican</option>
              <option>Bangladeshi</option>
              <option>Indian</option>
              <option>Chinese</option>
              <option>Others</option>
            </select>
          </fieldset>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 text-lg">
            <label className="label">Preparation Time (minutes)</label>
            <input
              type="number"
              name="time"
              className="input w-full"
              placeholder=" Time"
            />
          </fieldset>
        </div>

        <div className="space-y-6 mt-6">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 text-lg">
            <label className="label">Ingredients</label>

            <textarea
              placeholder="200g flour&#10;2 eggs&#10;100ml milk"
              name="ingredients"
              className="textarea textarea-lg w-full h-28 text-base"
            ></textarea>

            <p className="text-gray-500 text-base">
              Put each ingredient on a new line
            </p>
            <p className="text-red-400 text-base">
              Ingredients must be at least 10 characters
            </p>
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4 text-lg">
            <label className="label">Instructions </label>
            <textarea
              placeholder="1. Preheat oven to 180°C.&#10;2. Mix all ingredients in a bowl."
              name="instructions"
              className="textarea textarea-lg w-full"
            ></textarea>
            <p className="text-red-400 text-base">
              Instructions must be at least 10 characters
            </p>
          </fieldset>

          <div>
            <label className="label text-black text-lg mb-2">Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                "Breakfast",
                "Lunch",
                "Dessert",
                "Dinner",
                "salad",
                "Spicy",
                "Vegan",
                "Quick",
                "Healthy",
                "Pasta",
              ].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="categories"
                    value={cat}
                    className="checkbox checkbox-warning"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="btn mt-8 w-full text-white bg-amber-500 text-lg"
          id=""
          value="Add Recipe"
        />
      </form>
    </div>
  );
};

export default AddRecipe;
