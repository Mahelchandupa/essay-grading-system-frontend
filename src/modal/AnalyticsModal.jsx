import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, TrendingUp, BarChart3, PieChart, Target,
  Award, Calendar, Book, Zap, Activity,
  AlertTriangle, ArrowUp, ArrowDown
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer, Treemap, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area
} from 'recharts';
import { dashboardService } from '../services/dashboardService';

const AnalyticsModal = ({ isOpen, onClose, studentId }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('score-distribution');

  useEffect(() => {
    if (isOpen) {
      fetchAnalytics();
    }
  }, [isOpen, studentId]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.fetchAnalytics();
      setAnalytics(response.analytics);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#f97316', '#ef4444'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const tabs = [
    {
      id: 'score-distribution',
      label: 'Score Distribution',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'quality-trends',
      label: 'Quality Trends',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'error-types',
      label: 'Common Error Types',
      icon: AlertTriangle,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'improvement-areas',
      label: 'Improvement Areas',
      icon: Target,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const renderTabContent = () => {
    if (!analytics) return null;

    switch (activeTab) {
      case 'score-distribution':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Essays', value: analytics.summary.totalEssays, icon: Book, color: 'from-blue-500 to-cyan-500' },
                { label: 'Average Score', value: analytics.summary.averageScore, icon: Award, color: 'from-purple-500 to-pink-500' },
                { label: 'Best Score', value: analytics.summary.bestScore, icon: Zap, color: 'from-emerald-500 to-teal-500' },
                { label: 'Improvement', value: `${analytics?.summary?.improvementRate || 0}%`, icon: TrendingUp, color: 'from-amber-500 to-orange-500' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white`}
                >
                  <stat.icon className="w-6 h-6 mb-2 opacity-80" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Score Distribution Bar Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Score Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="label" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {analytics.scoreDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Additional Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
              >
                <h4 className="text-lg font-bold text-white mb-4">Writing Statistics</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total Words</span>
                    <span className="text-white font-bold">{analytics.summary.totalWords}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average Words per Essay</span>
                    <span className="text-white font-bold">{analytics.summary.averageWords}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Essays This Month</span>
                    <span className="text-white font-bold">{analytics.timeAnalysis[0]?.essaysSubmitted || 0}</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
              >
                <h4 className="text-lg font-bold text-white mb-4">Performance Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Consistency</span>
                    <span className="text-emerald-400 font-bold">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Progress Trend</span>
                    <div className="flex items-center gap-1">
                      {analytics.summary.improvementRate > 0 ? (
                        <>
                          <ArrowUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Improving</span>
                        </>
                      ) : analytics.summary.improvementRate < 0 ? (
                        <>
                          <ArrowDown className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-bold">Declining</span>
                        </>
                      ) : (
                        <span className="text-gray-400 font-bold">Stable</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );

      case 'quality-trends':
        return (
          <div className="space-y-6">
            {/* Quality Trends Line Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Quality Trends Over Time
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={analytics.qualityTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="essayNumber" 
                    stroke="#9ca3af"
                    label={{ value: 'Essay Number', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', offset: 10, fill: '#9ca3af' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="grammar" 
                    name="Grammar" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="content" 
                    name="Content" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="organization" 
                    name="Organization" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="style" 
                    name="Style" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mechanics" 
                    name="Mechanics" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Overall Score Trend */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Overall Score Progression</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={analytics.qualityTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="essayNumber" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="overallScore" 
                    stroke="#8b5cf6" 
                    fill="url(#colorOverall)" 
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        );

      case 'error-types':
        return (
          <div className="space-y-6">
            {/* Error Categories */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Common Error Types
              </h3>
              <div className="space-y-4">
                {analytics.errorCategories.map((error, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{error.name}</span>
                        <span className="text-sm text-gray-400">{error.percentage}% of errors</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(error.percentage, 100)}%` }}
                          transition={{ duration: 1, delay: idx * 0.2 }}
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-400">{error.value}</div>
                      <div className="text-xs text-gray-400">occurrences</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Error Distribution Chart */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Error Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.errorCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {analytics.errorCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        );

      case 'improvement-areas':
        return (
          <div className="space-y-6">
            {/* Improvement Areas Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                Focus Areas for Improvement
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {analytics.improvementAreas.map((area, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-xl border-2 ${
                      area.trend === 'improving' 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : area.trend === 'declining'
                        ? 'bg-red-500/10 border-red-500/30'
                        : 'bg-gray-700/30 border-gray-600/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-white text-lg">{area.category}</h4>
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                        area.trend === 'improving'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : area.trend === 'declining'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {area.trend === 'improving' && <ArrowUp className="w-3 h-3" />}
                        {area.trend === 'declining' && <ArrowDown className="w-3 h-3" />}
                        {area.trend}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Current Score</span>
                        <span className="text-2xl font-bold text-white">{area.currentScore}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Average Score</span>
                        <span className="text-xl font-semibold text-gray-300">{area.averageScore}</span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="pt-2">
                        <div className="flex justify-between text-sm text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{area.currentScore - area.averageScore > 0 ? '+' : ''}{area.currentScore - area.averageScore}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              area.trend === 'improving' 
                                ? 'bg-emerald-500' 
                                : area.trend === 'declining'
                                ? 'bg-red-500'
                                : 'bg-gray-500'
                            }`}
                            style={{ 
                              width: `${Math.min(Math.abs(area.currentScore - area.averageScore) * 2, 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
              <div className="space-y-3">
                {analytics.improvementAreas
                  .filter(area => area.trend !== 'improving')
                  .map((area, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <Target className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-white">Focus on {area.category}</p>
                        <p className="text-sm text-gray-400">
                          Your {area.category.toLowerCase()} score is {area.trend}. 
                          Try practicing with targeted exercises to improve this area.
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        );

      default:
        return null;
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
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="bg-white/20 p-3 rounded-xl"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <BarChart3 className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
                <p className="text-blue-100">Detailed performance insights</p>
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

          {/* Tabs */}
          <div className="border-b border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-4 font-semibold transition-all relative min-w-0 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                      layoutId="activeTab"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              </div>
            ) : analytics ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            ) : (
              <div className="text-center py-20 text-gray-400">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No analytics data available</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnalyticsModal;