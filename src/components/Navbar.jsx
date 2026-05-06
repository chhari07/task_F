import { useAuth } from "../context/AuthContext";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="w-full h-[80px] bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-8">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Team Task Manager
        </h1>
        <p className="text-sm text-slate-500">
          Manage your projects efficiently
        </p>
      </div>

      <div className="flex items-center gap-5">
        
        <button className="relative">
          <FaBell className="text-2xl text-slate-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
            3
          </span>
        </button>

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl">
          <FaUserCircle className="text-3xl text-slate-700" />

          <div>
            <h3 className="text-sm font-semibold text-slate-700">
              {user?.name || "User"}
            </h3>

            <button
              onClick={logout}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;