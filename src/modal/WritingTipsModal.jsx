import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, BookOpen, Lightbulb, Target, CheckCircle,
  AlertCircle, Star, ChevronRight, ExternalLink
} from 'lucide-react';
import axios from 'axios';
import { dashboardService } from '../services/dashboardService';

const WritingTipsModal = ({ isOpen, onClose, studentId }) => {
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (isOpen) {
      fetchWritingTips();
    }
  }, [isOpen, studentId]);

  const fetchWritingTips = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.fetchWritingTips();
      setTips(response.writingTips);
    } catch (error) {
      console.error('Failed to fetch writing tips:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const categories = tips ? [...new Set(tips.tips.map(tip => tip.category))] : [];
  const filteredTips = activeCategory === 'all' 
    ? tips?.tips 
    : tips?.tips.filter(tip => tip.category === activeCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'from-blue-500 to-cyan-500';
      case 'intermediate': return 'from-purple-500 to-pink-500';
      case 'advanced': return 'from-emerald-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="bg-white/20 p-3 rounded-xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BookOpen className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">Writing Tips & Resources</h2>
                <p className="text-emerald-100">Personalized guidance for improvement</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full"
                />
              </div>
            ) : tips ? (
              <div className="space-y-6">
                {/* Level Info Banner */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className={`bg-gradient-to-r ${getDifficultyColor(tips.studentLevel)} rounded-xl p-6 text-white`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{tips.levelInfo.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{tips.levelInfo.title}</h3>
                      <p className="text-white/90 capitalize">Your Level: {tips.studentLevel}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Common Issues */}
                {tips.commonIssues && tips.commonIssues.length > 0 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Focus on These Areas
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {tips.commonIssues.map((issue, idx) => (
                        <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white text-sm">
                              {issue.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded text-xs font-bold">
                              {issue.frequency}x
                            </span>
                          </div>
                          {issue.tip && (
                            <p className="text-xs text-gray-400">{issue.tip.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Category Filter */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <motion.button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      activeCategory === 'all'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    All Tips
                  </motion.button>
                  {categories.map(category => (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                        activeCategory === category
                          ? 'bg-emerald-500 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>

                {/* Tips Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredTips?.map((tip, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-emerald-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                            {tip.category}
                          </span>
                        </div>
                        {tip.priority === 'high' && (
                          <Star className="w-5 h-5 text-amber-400 fill-current" />
                        )}
                      </div>
                      
                      <h4 className="text-lg font-bold text-white mb-2">{tip.title}</h4>
                      <p className="text-gray-400 text-sm mb-4">{tip.description}</p>

                      {tip.examples && (
                        <div className="bg-gray-900/50 rounded-lg p-3 space-y-2">
                          {tip.examples.map((example, exIdx) => (
                            <div key={exIdx} className="flex items-start gap-2 text-sm">
                              {example.startsWith('✓') ? (
                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              ) : example.startsWith('✗') ? (
                                <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              )}
                              <span className="text-gray-300">{example.replace(/^[✓✗]\s*/, '')}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {tip.practice && (
                        <div className="mt-3 text-xs text-emerald-400 italic">
                          💡 {tip.practice}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Daily Practice */}
                {tips.dailyPractice && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {tips.dailyPractice.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{tips.dailyPractice.exercise}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>⏱️ {tips.dailyPractice.timeEstimate}</span>
                      <span>•</span>
                      <span>🎯 {tips.dailyPractice.goal}</span>
                    </div>
                  </motion.div>
                )}

                {/* Resources */}
                {tips.resources && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4">Recommended Resources</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {tips.resources.map((resource, idx) => (
                        <motion.a
                          key={idx}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-all group"
                          whileHover={{ y: -5 }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                              {resource.category}
                            </span>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                          </div>
                          <h4 className="font-semibold text-white mb-1">{resource.title}</h4>
                          <p className="text-xs text-gray-400">{resource.description}</p>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No writing tips available</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WritingTipsModal;