import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center h-full">
          <div className="mb-8">
            <h1 className="text-3xl mt-3 text-center text-gray-800 font-bold">
              SynergeSphere
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Manage your projects and tasks efficiently.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-semibold text-blue-700">Login</h2>
            </div>

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 text-sm sm:text-base rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow"
            >
              LogIn
            </button>

            <div className="flex items-center justify-between mt-4">
              <div className="flex gap-4">
                <a
                  href="/privacy-policy"
                  className="text-sm text-gray-500 hover:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms-and-conditions"
                  className="text-sm text-gray-500 hover:underline"
                >
                  Terms and Conditions
                </a>
              </div>

              <div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup
              </Link>
            </div>
          </form>
        </div>

        {/* Right Side - Image & Text */}
        <div className="hidden lg:flex rounded-r-2xl relative bg-gradient-to-br from-blue-600 to-indigo-600 text-white items-center justify-center p-8">
          <div className="text-center max-w-xs">
            <h3 className="text-2xl font-semibold mb-2">Welcome back</h3>
            <p className="text-sm text-blue-100">
              Manage your projects and collaborate with your team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
