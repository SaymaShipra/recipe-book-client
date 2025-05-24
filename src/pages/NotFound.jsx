import React from "react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
        alt="Sad chef with empty plate"
        className="w-48 h-48 mb-8"
      />
      <h1 className="text-9xl font-extrabold text-orange-400 mb-6">404</h1>
      <p className="text-2xl font-semibold mb-4 text-gray-700">
        Oops! This recipe is cooking somewhere else.
      </p>
      <p className="mb-8 text-gray-600 max-w-md">
        We couldn't find the page you were looking for. Maybe try searching for
        a delicious recipe instead?
      </p>

      <Link
        to="/"
        className="inline-block bg-orange-400 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded shadow"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
