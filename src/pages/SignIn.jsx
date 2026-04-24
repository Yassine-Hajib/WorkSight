import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="min-h-screen flex">
      
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg text-center max-w-md">
          Sign in to access your dashboard, manage tasks, monitor employees,
          and improve your remote team productivity with RemotePulse.
        </p>

        <img
          src="https://illustrations.popsy.co/white/work-from-home.svg"
          alt="Sign In"
          className="w-3/4 mt-10"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-950 px-6">
        <div className="w-full max-w-md bg-gray-800  shadow-lg rounded-2xl p-8  border-gray-700">
          
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
            Sign In
          </h2>

          <p className="text-gray-500 text-center mb-8">
            Login to your RemotePulse account
          </p>

          <form className="space-y-5">
            
            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="text-white w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 border border-gray-700"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="text-white w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 border border-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Role</label>
              <select
                className="text-white w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 border border-gray-700"
              >
                <option value="">Select your role</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="intern">Intern</option>
              </select>
            </div>

            {/* Remember / Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-gray-400">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;