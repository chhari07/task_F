import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTasks,
  FaProjectDiagram,
  FaUsers,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();

  const { user } = useAuth();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
  ];

  if (user?.role === "Admin") {
    menus.push(
      {
        name: "Projects",
        path: "/projects",
        icon: <FaProjectDiagram />,
      },

      {
        name: "Team",
        path: "/team",
        icon: <FaUsers />,
      }
    );
  }

  return (
    <div className="w-[260px] min-h-screen bg-slate-900 text-white p-6">
      
      <h1 className="text-3xl font-bold mb-10">
        TaskFlow
      </h1>

      <div className="flex flex-col gap-3">

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition
            ${
              location.pathname === menu.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {menu.icon}

            <span>{menu.name}</span>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;