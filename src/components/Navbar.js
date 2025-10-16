import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Watch token changes dynamically
  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="top-0 z-50 bg-[#000000] shadow-sm flex justify-between items-center px-8 py-4 relative">
      {/* Left section: Logo */}
      <div className="flex items-center">
        <Link to="/" className="focus:outline-none flex items-center">
          <span className="text-2xl font-bold tracking-tight bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:from-gray-400 hover:to-orange transition-all duration-500">
            🔗
          </span>
          <span className="ml-2 text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:from-gray-400 hover:to-orange transition-all duration-500">
            LinkSaver
          </span>
        </Link>
      </div>

      {/* Right section */}
      <div className="flex gap-6 items-center">
        <Link
          to={isLoggedIn ? "/dashboard"  : "/"}
          className={`text-orange text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:text-white-900 transition font-medium ${
            location.pathname === "/" ? "underline" : ""
          }`}
        >
          {isLoggedIn ? "Dashboard"  : "Home"}
        </Link>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-orange text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:from-gray-400 hover:to-orange transition font-medium"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`text-orange text-transparent bg-clip-text bg-gradient-to-r from-orange to-gray-200 hover:text-white-900 transition font-medium ${
              location.pathname === "/login" ? "underline" : ""
            }`}
          >
            Login / Register
          </Link>
        )}
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#ff8800] to-gray-800"></div>
    </nav>
  );
}

export default Navbar;
