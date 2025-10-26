import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  AlertCircle,
  CheckCircle,
  GraduationCap,
  BookOpen,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import authService from "../services/authServices";
import { showErrorToast, showSuccessToast } from "../utils/toast";

const Register = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { register } = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};

    if (formData.studentId.length < 3) {
      errors.studentId = "Student ID must be at least 3 characters";
    }

    if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid academic email address";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authService.studentRegister({
        studentId: formData.studentId,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Call context login to update global state
      register(response);

      showSuccessToast("Welcome back! Register successful.");

      navigate("/"); // Use navigate inside component
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Registration failed. Please try again.";
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
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 2, repeat: Infinity },
              scale: { duration: 2, repeat: Infinity },
            }}
          >
            <UserPlus className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3"
            variants={itemVariants}
          >
            Create Academic Account
          </motion.h1>
          <motion.p className="text-lg text-gray-400" variants={itemVariants}>
            Join thousands of students improving their writing skills
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 p-8"
          variants={cardVariants}
          whileHover="hover"
        >
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="bg-red-500/10 border-2 border-red-500/20 rounded-2xl p-4 mb-6 flex items-start gap-3 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                </motion.div>
                <p className="text-sm text-red-200">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            {/* Student ID */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Student ID
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400 ${
                    validationErrors.studentId
                      ? "border-red-500/50"
                      : "border-gray-600/50"
                  }`}
                  placeholder="STU001"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              {validationErrors.studentId && (
                <motion.p
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.studentId}
                </motion.p>
              )}
            </motion.div>

            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400 ${
                    validationErrors.name
                      ? "border-red-500/50"
                      : "border-gray-600/50"
                  }`}
                  placeholder="John Doe"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              {validationErrors.name && (
                <motion.p
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.name}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400 ${
                    validationErrors.email
                      ? "border-red-500/50"
                      : "border-gray-600/50"
                  }`}
                  placeholder="student@university.edu"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              {validationErrors.email && (
                <motion.p
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400 ${
                    validationErrors.password
                      ? "border-red-500/50"
                      : "border-gray-600/50"
                  }`}
                  placeholder="Minimum 6 characters"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              {validationErrors.password && (
                <motion.p
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <motion.input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-white placeholder-gray-400 ${
                    validationErrors.confirmPassword
                      ? "border-red-500/50"
                      : "border-gray-600/50"
                  }`}
                  placeholder="Re-enter your password"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              {validationErrors.confirmPassword && (
                <motion.p
                  className="text-xs text-red-400 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <AlertCircle className="w-3 h-3" />
                  {validationErrors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div className="md:col-span-2" variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3 relative overflow-hidden group"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Create Academic Account
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            className="mt-8 pt-6 border-t border-gray-700/50"
            variants={itemVariants}
          >
            <p className="text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          variants={containerVariants}
        >
          {[
            {
              icon: <BookOpen className="w-6 h-6 text-blue-400" />,
              text: "AI Essay Grading",
              color: "from-blue-500/20 to-blue-600/20",
            },
            {
              icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
              text: "Personalized Feedback",
              color: "from-purple-500/20 to-purple-600/20",
            },
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              text: "Progress Tracking",
              color: "from-amber-500/20 to-amber-600/20",
            },
            {
              icon: <Shield className="w-6 h-6 text-emerald-400" />,
              text: "Academic Standards",
              color: "from-emerald-500/20 to-emerald-600/20",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${benefit.color} rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm`}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-10 h-10 bg-gray-800/50 rounded-xl mb-2 border border-gray-700/50"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {benefit.icon}
              </motion.div>
              <p className="text-xs font-medium text-gray-300">
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;
