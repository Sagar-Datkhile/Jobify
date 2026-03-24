import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Login = ({ onSwitchToSignup, setLogin }) => {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});

  const makeLoginRequest = async ({ email, password }) => {
    try {
      const response = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("jobify_access_token", data.access_token);
        toast.success("User Login Successfull");
        setLogin(true);
        console.log("Access", localStorage.getItem("jobify_access_token"));
        navigator("/");
        return;
      } else {
        switch (data.code) {
          case 61:
            toast.error("Invalid Login Request");
            break;
          case 62:
            toast.error("Email not registered, please SignUp");
            navigator("/signup");
            break;
          case 63:
            toast.error("Internal Database Error");
            break;
          case 65:
            toast.error("Invalid Login Credentials");
            break;
          default:
            toast.error("Internal Server error");
            break;
        }
        setFormData({ email: "", password: "", rememberMe: false });
        setShowPassword(false);
      }
    } catch (error) {
      toast.error("Backend Server Error");
      console.error("Login Request failed", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login submitted:", formData);
      makeLoginRequest(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-8">
      {/* Width increased to 600px to feel spacious like Register */}
      <div className="w-full max-w-[600px]">
        {/* Header - Positioned lower to match Signup layout */}
        <div className="text-center mb-8 mt-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Login Card - Wide (px-12) but squeezed vertically (py-8) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 px-12 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-semibold ml-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 h-11 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-600 ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 font-medium ml-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-semibold ml-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-11 h-11 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-600 hide-password-toggle ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 font-medium ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-bold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-100 mt-2"
            >
              Sign In
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px]">
                <span className="bg-white px-4 text-gray-400 font-bold uppercase tracking-widest">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center h-10 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-4 h-4 mr-2"
                  alt="Google"
                />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center h-10 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
              >
                <img
                  src="https://www.svgrepo.com/show/512317/github-142.svg"
                  className="w-4 h-4 mr-2"
                  alt="GitHub"
                />
                GitHub
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-4 border-t border-gray-50">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToSignup}
                className="text-blue-600 hover:text-blue-700 font-bold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
