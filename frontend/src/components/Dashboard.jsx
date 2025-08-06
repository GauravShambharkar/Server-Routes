import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
  });
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [msg, setmsg] = useState();

  useEffect(() => {
    const tokenValid = localStorage.getItem("token");
    if (tokenValid) {
      setIsLoggedIn(tokenValid);
      setUser({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        token: localStorage.getItem("token"),
      });
    }
    else{
      navigate("/login")
    }
  }, []);

  const handlelogOut = () => {
    setmsg("login out...");
    setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      navigate("/login"); 
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-fit px-3 bg-black rounded-lg h-8 flex items-center shadow-2xl fixed bottom-30 right-114 border-gray-400 border text-white font-medium">
        {msg}
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome to your Dashboard
                </h3>
                <button
                  onClick={handlelogOut}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>

              {!isLoggedIn && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <p className="text-red-600 text-sm">
                    "userNot authenticated"
                  </p>
                </div>
              )}

              {isLoggedIn && (
                <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-md">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    User Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">
                        Name:
                      </span>
                      <span className="text-sm text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">
                        Email:
                      </span>
                      <span className="text-sm text-gray-900">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">
                        User ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        {user.token}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                <h4 className="text-md font-medium text-blue-900 mb-2">
                  Account Status
                </h4>
                <p className="text-sm text-blue-700">
                  Your account is active and you are successfully logged in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
