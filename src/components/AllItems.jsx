import { useEffect, useState } from "react";

const AllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3200/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Items</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Owner</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.userEmail}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllItems;
