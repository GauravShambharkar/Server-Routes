import { Link } from "react-router-dom";
import Routers from "./Routers";

const Nav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Client Routes</Link>
        </div>
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
          <Link
            to="/dashboard"
            className="hover:text-gray-300 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
      <Routers/>
    </nav>
  );
};

export default Nav;
