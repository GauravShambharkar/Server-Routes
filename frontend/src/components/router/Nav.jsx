import { Link } from "react-router-dom";
import Routers from "./Routers";
import { useEffect } from "react";
import { useState } from "react";

const Nav = () => {
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  useEffect(() => {
    const validToken = localStorage.getItem("token");
    if (validToken) {
      setIsAuthenticate(true);
    } else setIsAuthenticate(false);
  }, []);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Client Routes</Link>
        </div>
        {isAuthenticate ? (
          <Link
            to="/dashboard"
            className="hover:text-gray-300 transition-colors"
          >
            Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-gray-300 transition-colors"
            >
              Register
            </Link>
          </div>
        )}
      </div>
      <Routers />
    </nav>
  );
};

export default Nav;
