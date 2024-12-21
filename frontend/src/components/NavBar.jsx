import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    // Perform any logout logic here, e.g., clearing tokens or session data
    localStorage.removeItem("token");
    navigate("/login"); // Navigate to the login page
  };

  return (
    <nav className="bg-slate-600 text-white">
      <div className="mycontainer flex justify-between items-center px-4 h-15 py-5">
        <div className="flex gap-5">
          <div className="logo font-bold sm:text-lg lg:text-2xl text-sm">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
          </div>
        </div>
        <ul>
          <li className="flex gap-4 sm:text-lg lg:text-2xl text-sm">
            <button
              className="hover:font-bold"
              onClick={handleLogOut}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
