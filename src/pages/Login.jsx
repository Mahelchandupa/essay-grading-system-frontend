import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  GraduationCap,
  BookOpen,
  User,
  IdCard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext, useUser } from "../context/UserContext";
import { showSuccessToast, showErrorToast } from "../utils/toast";
import authService from "../services/authServices";

const Login = () => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.studentLogin(formData);

      // Call context login to update global state
      login(response);

      showSuccessToast("Welcome back! Login successful.");

      navigate("/");
    } catch (err) {
      console.log("login error", err);
      // Use the error message from the APIError instance
      const errorMessage =
        err.message || "Authentication failed. Please check your credentials.";
      setError(errorMessage);
      showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        variants={pulseVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        variants={pulseVariants}
        animate="animate"
        style={{ animationDelay: "1.5s" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full relative z-10"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { type: "spring", stiffness: 300 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3"
            whileHover={{ scale: 1.02 }}
          >
            Welcome Back
          </motion.h1>
          <motion.p className="text-lg text-gray-400">
            Sign in to continue your academic journey
          </motion.p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 p-8"
          whileHover={{
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="bg-red-500/20 border-2 border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Student ID or Email
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
                  placeholder="Enter Student ID or Email"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                You can use either your Student ID or registered email
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400"
                  placeholder="Enter your password"
                />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              variants={itemVariants}
              whileHover={{
                scale: loading ? 1 : 1.02,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              {loading ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In to Account
                </>
              )}
            </motion.button>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-700/50"
          >
            <p className="text-center text-gray-400">
              Don't have an academic account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
              >
                Create account
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { icon: BookOpen, text: "AI Assessment", color: "blue" },
            { icon: GraduationCap, text: "Academic Feedback", color: "purple" },
            { icon: Lock, text: "Secure", color: "green" },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300"
              whileHover={{
                y: -5,
                scale: 1.05,
                backgroundColor: "rgba(55, 65, 81, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <feature.icon
                className={`w-6 h-6 text-${feature.color}-400 mx-auto mb-2`}
              />
              <p className="text-xs text-gray-400">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
