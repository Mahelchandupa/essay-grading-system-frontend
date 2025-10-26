import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  BarChart3,
  LogOut,
  User,
  GraduationCap,
  ChevronDown,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ student, onLogout, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getLevelColor = (level) => {
    const colors = {
      beginner: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      intermediate: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      advanced: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      elite: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    };
    return colors[level] || colors.beginner;
  };

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.7)",
                  "0 0 0 10px rgba(59, 130, 246, 0)",
                  "0 0 0 0 rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2,
                  repeatDelay: 5,
                },
              }}
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <div onClick={() => navigate("/")}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AcademicWrite
              </h1>
              <p className="text-xs text-gray-400">
                AI-Powered Essay Assessment
              </p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          {student && (
            <div className="hidden md:flex items-center gap-6">
              <motion.button
                onClick={() => navigate("/upload")}
                className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-all duration-200 group relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                Submit Essay
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"
                  initial={false}
                />
              </motion.button>
              <motion.button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-all duration-200 group relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                </div>
                Dashboard
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"
                  initial={false}
                />
              </motion.button>
            </div>
          )}

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-400" />
              )}
            </motion.button>

            {/* User Menu */}
            {student && (
              <motion.div className="relative" layout>
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-xl px-3 py-2 transition-all duration-200 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <User className="w-4 h-4 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ rotate: showUserMenu ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute right-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 py-3 z-50 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <p className="text-sm font-semibold text-white truncate">
                          {student.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {student.email}
                        </p>
                        <div
                          className={`mt-2 px-3 py-1 rounded-full border text-xs font-medium ${getLevelColor(
                            student.level
                          )}`}
                        >
                          {student.level.charAt(0).toUpperCase() +
                            student.level.slice(1)}{" "}
                          Writer
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <motion.a
                          href="/"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200 group"
                          whileHover={{ x: 4 }}
                        >
                          <div className="p-1.5 bg-gray-700 rounded-lg group-hover:bg-purple-500/20">
                            <BarChart3 className="w-4 h-4" />
                          </div>
                          Academic Dashboard
                        </motion.a>

                        <motion.button
                          onClick={onLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 group"
                          whileHover={{ x: 4 }}
                        >
                          <div className="p-1.5 bg-gray-700 rounded-lg group-hover:bg-red-500/20">
                            <LogOut className="w-4 h-4" />
                          </div>
                          Sign Out
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {student && (
          <motion.div
            className="md:hidden border-t border-gray-700/50 pt-4 pb-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex gap-6 justify-center">
              <motion.a
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors text-sm group"
                whileHover={{ scale: 1.05 }}
              >
                <FileText className="w-4 h-4" />
                Submit Essay
              </motion.a>
              <motion.a
                href="/dashboard"
                className="flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors text-sm group"
                whileHover={{ scale: 1.05 }}
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Header;
