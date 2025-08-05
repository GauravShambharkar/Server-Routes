import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              {/* <label htmlFor="email" className=" text-black px-3">
                Email address :
              </label> */}
              <input
                className="w-full h-8 px-3 text-black"
                type="email"
                placeholder="Email..."
              />
            </div>
            <div>
              {/* <label htmlFor="password" className="text-black px-3">
                Password :
              </label> */}
              <input
                className="w-full h-8 px-3 text-black"
                type="password"
                placeholder="password..."
              />
            </div>
          </div>

          <div className="text-red-600 text-sm text-center">{err}</div>
          <div className="text-red-600 text-sm text-center">{msg}</div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
