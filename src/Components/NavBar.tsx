// src/components/NavBar.js
import { useState } from "react";
import { Menu, X } from "react-feather"; // For menu and close icons
import logo from "../../public/ABD tech company logo.png";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-[#F5F5F5] to-[#E0E0E0] p-3 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Restaurant Name */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Restaurant Logo" className="w-12 h-12" />
          <span className="text-xl font-bold">ABD Cafe</span>
        </div>

        {/* Menu Icon and Dropdown */}
        <div className="relative">
          <button
            className="text-black text-xl focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
              <a
                onClick={() => navigate("/breakfast")}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Breakfast
              </a>
              <a
                onClick={() => navigate("/lunch")}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Lunch
              </a>
              <a
                onClick={() => navigate("/dinner")}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Dinner
              </a>
              <a
                onClick={() => navigate("/drink")}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Drink
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
