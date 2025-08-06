import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      if (user.password.length >= 8) {
        const response = await axios.post(
          "http://localhost:3000/testuser/login",
          {
            email: user.email,
            password: user.password,
          }
        );
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("name", response.data.name);
          setMsg("logged in succesfully");
          setTimeout(() => {
            navigate("/dashboard");
            window.location.reload();
          }, 1000);
        }
      } else {
        setErr("wrong password credential");
        // alert("Password must be at least 8 characters");
      }
    } catch (error) {
      const user = error.response;
      if (!user) setErr("wrong email credential");
      else {
        setErr("user not found");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm flex flex-col gap-6 -space-y-px ">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="text-[#cf0000] text-sm text-center">{err}</div>
          <div className="text-[#11cf00] text-sm text-center">{msg}</div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
