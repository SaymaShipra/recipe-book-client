import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AddItem = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      ...formData,
      userEmail: currentUser.email,
    };

    try {
      const res = await fetch("http://localhost:3200/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        alert("Item added successfully!");
        setFormData({ name: "", category: "" });
      } else {
        alert("Failed to add item");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Item</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
