import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("");
  const [error,    setError]    = useState("");
  const [success,  setSuccess]  = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!userName || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    setLoading(true);
    try {
      const data = await registerUser(userName, password, role);
      if (data.success) {
        setSuccess("Account created! Redirecting to login...");
        setTimeout(() => navigate("/signin"), 1500);
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
      <div className="min-h-screen flex bg-gray-900">

        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-bold mb-4">Join WorkSight!</h1>
          <p className="text-lg text-center max-w-md text-gray-200">
            Create your account to manage tasks and collaborate.
          </p>
          <img
              src="https://illustrations.popsy.co/white/work-from-home.svg"
              alt="Sign Up"
              className="w-3/4 mt-10"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center px-6 bg-gray-950">
          <div className="w-full max-w-md bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-700">

            <h2 className="text-3xl font-bold text-white text-center mb-2">
              Sign Up
            </h2>
            <p className="text-gray-400 text-center mb-8">
              Create your WorkSight account
            </p>

            {error && (
                <div className="mb-4 px-4 py-3 bg-red-900 border border-red-600 text-red-200 rounded-lg text-sm">
                  {error}
                </div>
            )}
            {success && (
                <div className="mb-4 px-4 py-3 bg-green-900 border border-green-600 text-green-200 rounded-lg text-sm">
                  {success}
                </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label className="block text-gray-300 mb-2">Username</label>
                <input
                    type="text"
                    placeholder="Choose a username"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Password</label>
                <input
                    type="password"
                    placeholder="Choose a password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Role</label>
                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-gray-400 mt-6">
              Already have an account?{" "}
              <Link to="/signin" className="text-blue-400 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
}

export default SignUp;