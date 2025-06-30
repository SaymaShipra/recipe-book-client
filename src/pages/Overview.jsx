import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Overview = () => {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalItems: 0,
    myItems: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const resTotal = await fetch("http://localhost:3200/items/count");
        const totalData = await resTotal.json();

        const resMy = await fetch(
          `http://localhost:3200/items/count?userEmail=${currentUser.email}`
        );
        const myData = await resMy.json();

        setStats({
          totalItems: totalData.count,
          myItems: myData.count,
        });
      } catch (err) {
        console.error(err);
      }
    }

    if (currentUser?.email) {
      fetchStats();
    }
  }, [currentUser]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">Total Products/Items</h2>
          <p className="text-2xl">{stats.totalItems}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold text-lg">My Items</h2>
          <p className="text-2xl">{stats.myItems}</p>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold"> User Info</h3>
        <p>Name: {currentUser?.displayName || "N/A"}</p>
        <p>Email: {currentUser?.email}</p>
      </div>
    </div>
  );
};

export default Overview;
