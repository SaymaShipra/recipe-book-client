import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyItems = () => {
  const { currentUser } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!currentUser?.email) return;

    fetch(`http://localhost:3200/items?userEmail=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(console.error);
  }, [currentUser]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Items</h1>
      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyItems;
