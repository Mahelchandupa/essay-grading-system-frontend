import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Target,
  Star,
  FileText,
  Clock,
  ChevronRight,
  GraduationCap,
  Users,
  Zap,
  Brain,
  PieChart,
  Download,
  Eye,
  Plus,
  Filter
} from 'lucide-react';

const StudentDashboard = ({ studentId }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [activeView, setActiveView] = useState('overview');
  const [stats, setStats] = useState(null);
  const [recentEssays, setRecentEssays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStats({
          overallScore: 76.5,
          essaysSubmitted: 12,
          avgEssayLength: 450,
          improvementRate: 12.3,
          currentStreak: 5,
          level: 'intermediate',
          nextLevelProgress: 65
        });

        setRecentEssays([
          {
            id: 1,
            title: 'The Impact of Climate Change',
            score: 82,
            submittedAt: '2024-01-15',
            wordCount: 520,
            feedback: 'Strong arguments with good evidence',
            level: 'intermediate'
          },
          {
            id: 2,
            title: 'Digital Revolution Analysis',
            score: 74,
            submittedAt: '2024-01-10',
            wordCount: 480,
            feedback: 'Good structure, needs more examples',
            level: 'intermediate'
          },
          {
            id: 3,
            title: 'Social Media Effects',
            score: 68,
            submittedAt: '2024-01-05',
            wordCount: 420,
            feedback: 'Improve thesis statement clarity',
            level: 'beginner'
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, [studentId]);

  // Progress towards next level
  const getNextLevel = (currentLevel) => {
    const levels = {
      beginner: { next: 'intermediate', minScore: 70 },
      intermediate: { next: 'advanced', minScore: 85 },
      advanced: { next: null, minScore: null }
    };
    return levels[currentLevel] || levels.beginner;
  };

  const nextLevelInfo = getNextLevel(stats?.level || 'beginner');

  // Quality metrics data
  const qualityMetrics = [
    { name: 'Grammar', score: 78, trend: 5, icon: <FileText className="w-4 h-4" /> },
    { name: 'Content', score: 82, trend: 8, icon: <Brain className="w-4 h-4" /> },
    { name: 'Organization', score: 71, trend: 12, icon: <PieChart className="w-4 h-4" /> },
    { name: 'Style', score: 69, trend: 3, icon: <Zap className="w-4 h-4" /> }
  ];

  // Weekly activity data
  const weeklyActivity = [
    { day: 'Mon', essays: 2, score: 74 },
    { day: 'Tue', essays: 1, score: 68 },
    { day: 'Wed', essays: 0, score: 0 },
    { day: 'Thu', essays: 3, score: 79 },
    { day: 'Fri', essays: 2, score: 82 },
    { day: 'Sat', essays: 1, score: 71 },
    { day: 'Sun', essays: 0, score: 0 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-2xl p-6 h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Academic Dashboard</h1>
            <p className="text-lg text-gray-600">Track your writing progress and achievements</p>
          </div>
          <div className="flex gap-3 mt-4 lg:mt-0">
            <button className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-lg">
              <Plus className="w-4 h-4" />
              New Essay
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Overall Score */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Overall</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.overallScore}</h3>
            <p className="text-gray-600 text-sm">Average Score</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-600 font-medium">+{stats.improvementRate}% this month</span>
            </div>
          </div>

          {/* Essays Submitted */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.essaysSubmitted}</h3>
            <p className="text-gray-600 text-sm">Essays Submitted</p>
            <div className="flex items-center gap-1 mt-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-600 font-medium">{stats.currentStreak} day streak</span>
            </div>
          </div>

          {/* Current Level */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <GraduationCap className="w-6 h-6 text-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Level</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{stats.level}</h3>
            <p className="text-gray-600 text-sm">Current Proficiency</p>
            {nextLevelInfo.next && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress to {nextLevelInfo.next}</span>
                  <span>{stats.nextLevelProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.nextLevelProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Writing Metrics */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-100 p-3 rounded-xl">
                <Target className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-sm font-medium text-gray-500">Average</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stats.avgEssayLength}</h3>
            <p className="text-gray-600 text-sm">Words per Essay</p>
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-600 font-medium">Consistent length</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quality Metrics */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Writing Quality Metrics</h2>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="bg-white p-2 rounded-lg">
                          {metric.icon}
                        </div>
                        <span className="font-semibold text-gray-900">{metric.name}</span>
                      </div>
                      <div className={`flex items-center gap-1 ${metric.trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{metric.trend}%</span>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">{metric.score}</span>
                      <span className="text-gray-500 text-sm">/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${metric.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Weekly Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-end justify-between h-32">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="text-xs text-gray-500 mb-2">{day.day}</div>
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg w-3/4 transition-all duration-500 hover:opacity-80"
                      style={{ height: day.essays > 0 ? `${(day.score / 100) * 80}px` : '4px' }}
                      title={`${day.essays} essays, Avg: ${day.score}`}
                    ></div>
                    <div className="text-xs text-gray-600 mt-1">{day.essays}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Essays */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Recent Essays</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentEssays.map(essay => (
                  <div key={essay.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors group">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {essay.title}
                      </h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        essay.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                        essay.score >= 70 ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {essay.score}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{essay.wordCount} words</span>
                      <span>{new Date(essay.submittedAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">{essay.feedback}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm font-medium flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recent Achievements</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Star className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-900">Grammar Master</p>
                    <p className="text-xs text-amber-700">5 essays with 90%+ grammar score</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Rising Star</p>
                    <p className="text-xs text-blue-700">10% improvement this month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-purple-900">Consistent Writer</p>
                    <p className="text-xs text-purple-700">5-day writing streak</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl p-4 text-left transition-colors flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Submit New Essay</p>
                    <p className="text-blue-100 text-sm">Get instant feedback</p>
                  </div>
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl p-4 text-left transition-colors flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">View Progress Report</p>
                    <p className="text-blue-100 text-sm">Detailed analytics</p>
                  </div>
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 rounded-xl p-4 text-left transition-colors flex items-center gap-3">
                  <Target className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Set Learning Goals</p>
                    <p className="text-blue-100 text-sm">Track your objectives</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="mt-8 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personalized Writing Tips</h2>
              <p className="text-gray-600">Based on your recent performance</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Improve Thesis Statements</h4>
              <p className="text-blue-800 text-sm">Make your main argument more specific and debatable in your introductions.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">Expand Vocabulary</h4>
              <p className="text-emerald-800 text-sm">Try using more academic vocabulary in your body paragraphs.</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Better Transitions</h4>
              <p className="text-purple-800 text-sm">Use stronger transition words between paragraphs for better flow.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;