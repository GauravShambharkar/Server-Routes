import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("userEmail");

    if (!token || !userEmail) {
      navigate("/login");
      return;
    }

    // Verify token and get user data
    const verifyToken = async () => {
      try {
        // First verify the token
        await axios.post(
          "http://localhost:3000/testuser/login/token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Get all users to find the current user
        const response = await axios.get("http://localhost:3000/testuser/");
        const users = response.data.data;
        const currentUser = users.find((user) => user.email === userEmail);

        if (currentUser) {
          setUserData(currentUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Welcome to your Dashboard
                </h3>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {userData && (
                <div className="bg-gray-50 px-4 py-5 sm:p-6 rounded-md">
                  <h4 className="text-md font-medium text-gray-900 mb-4">
                    User Information
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">
                        Name:
                      </span>
                      <span className="text-sm text-gray-900">
                        {userData.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">
                        Email:
                      </span>
                      <span className="text-sm text-gray-900">
                        {userData.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-20">
                        User ID:
                      </span>
                      <span className="text-sm text-gray-900">
                        {userData._id}
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
