import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
  UserCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = ({ onSwitchToLogin }) => {
  const navigator = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState("seeker");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const makeSignUpRequest = async ({
    email,
    fullName,
    confirmPassword,
    companyName,
  }) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: confirmPassword,
          fullName: fullName,
          companyName: companyName,
          type: userType,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("User SignUp successful");
        navigator("/login");
      } else {
        switch (data.code) {
          case 61:
            toast.error("Invalid Signup Request");
            break;
          case 62:
            toast.error("Email already registered, please SignIn");
            navigator("/login");
            break;
          case 63:
            toast.error("Internal Database Error");
            break;
          default:
            toast.error("Internal Server error");
            break;
        }
        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          companyName: "",
          agreeToTerms: false,
        });
        setShowPassword(false);
        setShowConfirmPassword(false);
      }
    } catch (error) {
      toast.error("Unable to Signup");
      console.log(error);
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (userType === "employer" && !formData.companyName)
      newErrors.companyName = "Company name is required";
    if (formData.password.length < 8) newErrors.password = "Min 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Agreement required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    // Changed py-12 to py-24 and flex-col to handle vertical height overflow
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-24">
      <div className="w-full max-w-[700px]">
        {/* Compact Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-sm">
            Join Jobify to discover your next big opportunity
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* User Type Selection - Made more compact */}
          <div className="mb-6">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 text-center">
              I want to sign up as a
            </label>
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              <button
                type="button"
                onClick={() => setUserType("seeker")}
                className={`flex items-center justify-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  userType === "seeker"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-100"
                }`}
              >
                <UserCircle
                  className={`w-5 h-5 ${
                    userType === "seeker" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-bold ${
                    userType === "seeker" ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  Job Seeker
                </span>
              </button>
              <button
                type="button"
                onClick={() => setUserType("employer")}
                className={`flex items-center justify-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  userType === "employer"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-100"
                }`}
              >
                <Building2
                  className={`w-5 h-5 ${
                    userType === "employer" ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-bold ${
                    userType === "employer" ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  Employer
                </span>
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (validateForm()) {
                makeSignUpRequest(formData);
              }
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-10 h-11 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 h-11 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>

            {userType === "employer" && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="companyName"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-10 h-11 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-50"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 h-11 bg-gray-50 border border-gray-200 rounded-xl hide-password-toggle outline-none focus:ring-2 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 h-11 bg-gray-50 border border-gray-200 rounded-xl hide-password-toggle outline-none focus:ring-2 focus:ring-blue-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-[13px] text-gray-600">
                  I agree to the{" "}
                  <span className="text-blue-600 font-bold underline">
                    Terms
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 font-bold underline">
                    Privacy Policy
                  </span>
                  .
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 font-bold hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
