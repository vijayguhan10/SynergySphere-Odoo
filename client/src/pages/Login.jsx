import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? `${import.meta.env.VITE_BASE_URL}/auth/register`
        : `${import.meta.env.VITE_BASE_URL}/auth/login`;
      const payload = isSignup
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }
        : {
            email: formData.email,
            password: formData.password,
          };
      const res = await axios.post(url, payload);
      const { token } = res.data;
      localStorage.setItem("jwt_token", token);
      toast.success(
        isSignup ? "Registration successful!" : "Login successful!"
      );
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          (isSignup
            ? "Registration failed."
            : "Login failed. Please try again.")
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <img
              src="https://acs-liard.vercel.app/assets/ACS-OQj0FHDk.jpg"
              alt="Lead Management Logo"
              className="h-16 mx-auto"
            />
            <h1 className="text-3xl mt-3 text-center text-gray-800 font-bold">
              Welcome to Lead Management
            </h1>
            <p className="text-center text-gray-500 mt-2">
              Manage your leads, telecallers, and admins efficiently.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4 text-center">
              <h2 className="text-2xl font-semibold text-blue-700">
                {isSignup ? "Sign Up" : "Login"}
              </h2>
            </div>

            {isSignup && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 font-poppins rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 font-poppins rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 font-poppins rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            {isSignup && (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 font-poppins rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.confirmPassword}
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
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow"
            >
              {isSignup ? "Sign Up" : "LogIn"}
            </button>

            <div className="flex gap-4 mt-4">
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

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isSignup
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>

        {/* Right Side - Image & Text */}
        <div className="hidden lg:block  rounded-r-2xl relative">
          <div className="h-full flex flex-col justify-between">
            <iframe
              src="https://lottie.host/embed/00deded2-4e0f-44cf-b92f-770f252b0540/aOwoc6SXTI.lottie"
              className="w-[85%] h-full rounded-r-2xl"
              style={{ minHeight: "300px", border: "none" }}
              allowFullScreen
              title="Lead Management Animation"
            />{" "}
            <div className="absolute bottom-2 left-10  bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-blue-700">
                Your leads, your rules
              </h3>
              <p className="text-sm text-gray-600">
                Your lead data belongs to you, and our encryption ensures that.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
