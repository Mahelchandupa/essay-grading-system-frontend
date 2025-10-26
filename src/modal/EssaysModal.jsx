import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Award,
  Clock,
} from "lucide-react";

const EssaysModal = ({ isOpen, onClose, essays = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState("all"); // "all", "week", "month", "year"
  const [searchTerm, setSearchTerm] = useState("");

  // Filter and sort essays
  const filteredEssays = useMemo(() => {
    let filtered = [...essays];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(essay =>
        essay.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        essay.originalText?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    const now = new Date();
    switch (dateFilter) {
      case "week":
        filtered = filtered.filter(essay => 
          new Date(essay.submittedAt) > new Date(now - 7 * 24 * 60 * 60 * 1000)
        );
        break;
      case "month":
        filtered = filtered.filter(essay => 
          new Date(essay.submittedAt) > new Date(now - 30 * 24 * 60 * 60 * 1000)
        );
        break;
      case "year":
        filtered = filtered.filter(essay => 
          new Date(essay.submittedAt) > new Date(now - 365 * 24 * 60 * 60 * 1000)
        );
        break;
      default:
        // "all" - no date filter
        break;
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }, [essays, searchTerm, dateFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredEssays.length / itemsPerPage);
  const currentEssays = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEssays.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEssays, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateFilter]);

  const getGradeColor = (score) => {
    if (score >= 85) return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
    if (score >= 70) return "text-blue-400 bg-blue-500/20 border-blue-500/30";
    if (score >= 60) return "text-amber-400 bg-amber-500/20 border-amber-500/30";
    return "text-red-400 bg-red-500/20 border-red-500/30";
  };

  const getGradeIcon = (score) => {
    if (score >= 85) return "🏆";
    if (score >= 70) return "⭐";
    if (score >= 60) return "📝";
    return "📚";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWordCount = (text) => {
    return text?.split(/\s+/).filter(word => word.length > 0).length || 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 "
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gray-800/90 backdrop-blur-md border border-gray-700/50 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border-t-2 border-t-amber-400"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">All Essays</h2>
                  <p className="text-gray-400">
                    {filteredEssays.length} essay{filteredEssays.length !== 1 ? 's' : ''} found
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </motion.button>
            </div>

            {/* Filters and Search */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search essays by title or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                {/* Date Filter */}
                <div className="flex gap-2">
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                  >
                    <option value="all">All Time</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Essays List */}
            <div className="flex-1 overflow-y-auto max-h-[calc(90vh-200px)]">
              {currentEssays.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <FileText className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg mb-2">No essays found</p>
                  <p className="text-sm">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {currentEssays.map((essay, index) => (
                    <motion.div
                      key={essay._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                      onClick={() => {
                        // Navigate to essay detail page
                        window.location.href = `/essay/${essay._id}`;
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors truncate">
                            {essay.title || "Untitled Essay"}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(essay.submittedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {getWordCount(essay.originalText)} words
                            </span>
                            {essay.fileType === "handwritten" && (
                              <span className="flex items-center gap-1 text-amber-400">
                                <Award className="w-4 h-4" />
                                Handwritten
                              </span>
                            )}
                          </div>

                          {/* Preview */}
                          <p className="text-gray-300 text-sm line-clamp-2">
                            {essay.originalText?.substring(0, 200)}...
                          </p>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                          {/* Score Badge */}
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-bold ${getGradeColor(essay.grading?.finalScore || 0)}`}>
                            <span className="text-lg">{getGradeIcon(essay.grading?.finalScore || 0)}</span>
                            <span>{essay.grading?.finalScore || 0}</span>
                          </div>

                          {/* Grade */}
                          <div className="text-center">
                            <div className="text-xs text-gray-400 mb-1">Grade</div>
                            <div className="font-bold text-white">
                              {essay.grading?.grade || "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quality Scores */}
                      {essay.grading?.qualityScores && (
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-600/50">
                          {Object.entries(essay.grading.qualityScores).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-xs text-gray-400 mb-1 capitalize">
                                {key}
                              </div>
                              <div className="text-sm font-semibold text-white">
                                {Math.round(value * 100)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="p-6 border-t border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEssays.length)} of {filteredEssays.length} essays
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl bg-gray-700/50 border border-gray-600/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-600/50 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </motion.button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <motion.button
                            key={pageNum}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-xl font-semibold transition-colors ${
                              currentPage === pageNum
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                            }`}
                          >
                            {pageNum}
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl bg-gray-700/50 border border-gray-600/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-600/50 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EssaysModal;