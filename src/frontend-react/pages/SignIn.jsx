import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function SignIn() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!userName || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const data = await loginUser(userName, password, role);
      if (data.success) {
        sessionStorage.setItem("user", JSON.stringify({
          userId:   data.userId,
          userName: data.userName,
          role:     data.role,
        }));
        if (data.role === "MANAGER")       navigate("/dashboard/manager");
        else if (data.role === "EMPLOYEE") navigate("/dashboard/employee");
        else                               navigate("/dashboard/intern");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Cannot connect to server. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg text-center max-w-md">
            Sign in to manage your team with WorkSight.
          </p>
          <img
              src="https://illustrations.popsy.co/white/work-from-home.svg"
              alt="Sign In"
              className="w-3/4 mt-10"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-950 px-6">
          <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-700">

            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Sign In
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Login to your WorkSight account
            </p>

            {error && (
                <div className="mb-4 px-4 py-3 bg-red-900 border border-red-600 text-red-200 rounded-lg text-sm">
                  {error}
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="text-white w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="text-white w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Role</label>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="text-white w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your role</option>
                  <option value="MANAGER">Manager</option>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="INTERN">Intern</option>
                </select>
              </div>

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}
export default SignIn;