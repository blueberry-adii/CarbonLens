import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

export default function AuthPage() {
  const navigate = useNavigate();
  const [activeForm, setActiveForm] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateLogin = () => {
    const newErrors = {};
    if (!loginForm.email.trim()) newErrors.email = "Email is required";
    if (!loginForm.password.trim()) newErrors.password = "Password is required";
    if (loginForm.email && !/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = "Please enter a valid email";
    }
    return newErrors;
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!signupForm.name.trim()) newErrors.name = "Name is required";
    if (!signupForm.email.trim()) newErrors.email = "Email is required";
    if (!signupForm.password.trim())
      newErrors.password = "Password is required";
    if (!signupForm.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm password";

    if (signupForm.email && !/\S+@\S+\.\S+/.test(signupForm.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (signupForm.password && signupForm.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email: loginForm.email,
        password: loginForm.password,
      });

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/app");
      }, 1000);
    } catch (error) {
      setErrors({
        general:
          error.response.data.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name: signupForm.name,
          email: signupForm.email,
          password: signupForm.password,
        }
      );
      setSuccess("Account created successfully! Welcome to CarbonLens!");
      setTimeout(() => {
        setActiveForm("login");
        setSuccess("");
      }, 2000);
    } catch (error) {
      setErrors({
        general:
          error.response.data.message || "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const switchForm = (formType) => {
    setActiveForm(formType);
    setErrors({});
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-emerald-200 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-teal-200 rounded-full opacity-25 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              CarbonLens
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Track your carbon footprint with AI
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-xl flex items-center gap-3 text-green-700">
            <CheckCircle size={20} />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-xl flex items-center gap-3 text-red-700">
            <AlertCircle size={20} />
            <span className="font-medium">{errors.general}</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex">
            <button
              onClick={() => switchForm("login")}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                activeForm === "login"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchForm("signup")}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 ${
                activeForm === "signup"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="relative overflow-hidden">
            <div
              className={`transition-all duration-500 ease-in-out ${
                activeForm === "login"
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <div className="p-8 space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Welcome Back!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Continue your sustainability journey
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.email
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.password
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 ${
                    !loading ? "cursor-pointer" : ""
                  }`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Login
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 text-sm font-medium cursor-pointer"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${
                activeForm === "signup"
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 absolute inset-0"
              }`}
            >
              <div className="p-8 space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Join CarbonLens
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Start your sustainable lifestyle today
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        value={signupForm.name}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.name
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.email
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={signupForm.password}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.password
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                    {signupForm.password && (
                      <div className="mt-2">
                        <div
                          className={`text-xs ${
                            signupForm.password.length >= 6
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {signupForm.password.length >= 6 ? "✓" : "✗"} At least
                          6 characters
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={signupForm.confirmPassword}
                        onChange={(e) =>
                          setSignupForm((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                          errors.confirmPassword
                            ? "border-red-400 bg-red-50"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                    {signupForm.confirmPassword && (
                      <div className="mt-2">
                        <div
                          className={`text-xs ${
                            signupForm.password === signupForm.confirmPassword
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {signupForm.password === signupForm.confirmPassword
                            ? "✓"
                            : "✗"}{" "}
                          Passwords match
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 max-[400px]:gap-2">
                  <input
                    type="checkbox"
                    className="shrink-0"
                    id="terms"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
                    >
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-700 font-medium cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleSignup}
                  disabled={loading}
                  className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 ${
                    !loading ? "cursor-pointer" : ""
                  }`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-y-4">
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-2">
                <Leaf size={20} className="text-green-600" />
              </div>
              <p className="text-xs text-gray-600">AI-Powered Analysis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle size={20} className="text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Track Progress</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center mx-auto mb-2">
                <ArrowRight size={20} className="text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">Make Impact</p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Join thousands of users reducing their carbon footprint daily
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm font-medium text-blue-800 mb-2">
            Demo Credentials:
          </p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>
              <strong>Email:</strong> demo@carbonlens.com
            </p>
            <p>
              <strong>Password:</strong> demo123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
