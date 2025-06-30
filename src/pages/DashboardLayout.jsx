import { Outlet, NavLink } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex w-10/12 mx-auto min-h-screen">
      {/* Sidebar */}
      <nav className="w-64 bg-amber-500 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li>
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                isActive ? "font-bold underline" : undefined
              }
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="allItems"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : undefined
              }
            >
              All Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to="addItem"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : undefined
              }
            >
              Add Item
            </NavLink>
          </li>
          <li>
            <NavLink
              to="myItems"
              className={({ isActive }) =>
                isActive ? "font-bold underline" : undefined
              }
            >
              My Items
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
