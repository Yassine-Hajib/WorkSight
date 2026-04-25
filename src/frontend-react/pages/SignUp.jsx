import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="min-h-screen flex bg-gray-900">
      
      {/* Left Section */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Join WorkSight!</h1>
        <p className="text-lg text-center max-w-md text-gray-200">
          Create your account to manage tasks, monitor productivity,
          and collaborate efficiently with your remote workforce.
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

          <form className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-300 mb-2">Role</label>
              <select
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your role</option>
                <option value="manager">Manager</option>
                <option value="employee">Employee</option>
                <option value="intern">Intern</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
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