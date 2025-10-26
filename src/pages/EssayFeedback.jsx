import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  Target,
  Lightbulb,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Star,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Edit3,
  Layout,
  Type,
  Zap,
  AlertCircle,
  GraduationCap,
  Clock,
  BarChart3,
  ArrowRight,
  BookMarked,
  PenTool,
  Sparkles,
  Eye,
  Info,
  BookText,
  Crown,
  Rocket,
  Medal,
  Brain,
  BadgeInfo,
  MessageCircleHeart,
  Settings,
  LucideMessageCircleHeart,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PdfPreviewModal from "../modal/PdfPreviewModal";
import { usePdfExport } from "../hooks/usePdfExport";
import ExplanationRenderer from "../components/ExplanationRenderer";

const EssayFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { feedbackData } = location.state || {};

  // Safe data extraction with fallbacks
  const essay = feedbackData?.essay || {};
  const feedback = feedbackData?.feedback || essay?.feedback || {};
  const studentLevel =
    feedbackData?.studentLevel || feedback?.studentLevel || "intermediate";
  const levelUpdate = feedbackData?.levelUpdate || { action: "none" };
  const ocrCorrections = essay?.ocrCorrections || null;

  // Enhanced quality breakdown with fallbacks
  const qualityBreakdown = essay?.grading?.qualityScores ||
    essay?.qualityBreakdown || {
      grammar: 0.7,
      content: 0.8,
      organization: 0.75,
      style: 0.7,
      mechanics: 0.8,
    };

  // Enhanced achievements with safe data access
  const [achievements, setAchievements] = useState([
    {
      id: "first_essay",
      icon: "🎯",
      title: "First Steps",
      description: "Submit your first essay",
      unlocked: true, // Always show first achievement
      progress: 1,
    },
    {
      id: "streak_5",
      icon: "🔥",
      title: "On Fire!",
      description: "Submit essays 5 days in a row",
      unlocked: false,
      progress: 0.6,
    },
    {
      id: "perfect_grammar",
      icon: "✨",
      title: "Grammar Master",
      description: "Get an essay with no grammar errors",
      unlocked: (feedback?.grammarErrors?.length || 0) === 0,
      progress: (feedback?.grammarErrors?.length || 0) === 0 ? 1 : 0,
    },
    {
      id: "high_score",
      icon: "⭐",
      title: "Excellence",
      description: "Score 90+ on an essay",
      unlocked: (essay?.grading?.finalScore || 0) >= 90,
      progress: Math.min(1, (essay?.grading?.finalScore || 0) / 90),
    },
    {
      id: "word_count",
      icon: "📝",
      title: "Prolific Writer",
      description: "Write over 1000 words in one essay",
      unlocked: (essay?.originalText?.split(" ").length || 0) >= 1000,
      progress: Math.min(
        1,
        (essay?.originalText?.split(" ").length || 0) / 1000
      ),
    },
    {
      id: "improvement",
      icon: "📈",
      title: "Rising Star",
      description: "Improve your score by 10+ points",
      unlocked:
        (feedback?.personalizedInsights?.progressComparison
          ?.improvementVsLast || 0) >= 10,
      progress: Math.min(
        1,
        (feedback?.personalizedInsights?.progressComparison
          ?.improvementVsLast || 0) / 10
      ),
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({
    grammar: false,
    spelling: false,
    style: false,
    vocabulary: false,
    examples: false,
    positive: false,
    insights: false,
    correctedText: false,
  });

  const [student, setStudent] = useState(
    localStorage.getItem("studentData")
      ? JSON.parse(localStorage.getItem("studentData"))
      : { name: "Student", id: "unknown" }
  );

  const [showOriginalText, setShowOriginalText] = useState(false);
  const [readProgress, setReadProgress] = useState({
    grammar: false,
    spelling: false,
    style: false,
    correctedText: false,
    progression: false,
    overview: false,
    structure: false,
    insights: false,
    examples: false,
    vocabulary: false,
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const { isExporting, exportProgress, exportFeedbackPDF } = usePdfExport();
  const [showPreview, setShowPreview] = useState(false);

  // Animation variants
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

  // Track reading progress
  const markSectionAsRead = (section) => {
    if (!readProgress[section]) {
      setReadProgress((prev) => {
        const newProgress = { ...prev, [section]: true };
        const completed = Object.values(newProgress).filter(Boolean).length;
        const total = Object.keys(newProgress).length;
        setCompletionPercentage(Math.round((completed / total) * 100));
        return newProgress;
      });
    }
  };

  const handleDirectExport = async () => {
    try {
      const result = await exportFeedbackPDF(essay, student, {
        includeEssayText: true,
        includeDetailedFeedback: true,
        includeGrammar: true,
        includeSpelling: true,
        includeStyle: true,
        includeVocabulary: true,
        includeStructure: true,
        includeExamples: true,
        includeInsights: true,
      });

      if (result.success) {
        console.log("✅ PDF exported successfully:", result.fileName);
      } else {
        console.error("❌ Export failed:", result.error);
      }
    } catch (error) {
      console.error("❌ Export error:", error);
    }
  };

  const handleOptionsModal = () => {
    setShowPreview(true);
  };

  // Mark current tab as read after viewing for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      markSectionAsRead(activeTab);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Safe grade access
  const getLetterGrade = (grade) => {
    const gradeChar = (
      essay?.grading?.grade?.charAt(0) ||
      essay?.grade?.charAt(0) ||
      "B"
    ).toUpperCase();

    const grades = {
      A: {
        grade: "A",
        color: "text-emerald-400",
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/30",
        gradient: "from-emerald-500 to-green-500",
      },
      B: {
        grade: "B",
        color: "text-blue-400",
        bg: "bg-blue-500/20",
        border: "border-blue-500/30",
        gradient: "from-blue-500 to-cyan-500",
      },
      C: {
        grade: "C",
        color: "text-amber-400",
        bg: "bg-amber-500/20",
        border: "border-amber-500/30",
        gradient: "from-amber-500 to-orange-500",
      },
      D: {
        grade: "D",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
        border: "border-orange-500/30",
        gradient: "from-orange-500 to-red-500",
      },
      E: {
        grade: "E",
        color: "text-red-400",
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        gradient: "from-red-500 to-pink-500",
      },
      F: {
        grade: "F",
        color: "text-red-400",
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        gradient: "from-red-500 to-pink-500",
      },
    };
    return grades[gradeChar] || grades["B"];
  };

  const letterGrade = getLetterGrade();

  const getLevelBadge = () => {
    const styles = {
      beginner: {
        bg: "bg-blue-500/20",
        text: "text-blue-300",
        border: "border-blue-500/30",
        icon: <GraduationCap className="w-5 h-5" />,
        gradient: "from-blue-500 to-cyan-500",
      },
      intermediate: {
        bg: "bg-purple-500/20",
        text: "text-purple-300",
        border: "border-purple-500/30",
        icon: <Brain className="w-5 h-5" />,
        gradient: "from-purple-500 to-pink-500",
      },
      advanced: {
        bg: "bg-emerald-500/20",
        text: "text-emerald-300",
        border: "border-emerald-500/30",
        icon: <Zap className="w-5 h-5" />,
        gradient: "from-emerald-500 to-teal-500",
      },
      elite: {
        bg: "bg-amber-500/20",
        text: "text-amber-300",
        border: "border-amber-500/30",
        icon: <Crown className="w-5 h-5" />,
        gradient: "from-amber-500 to-yellow-500",
      },
    };
    const style = styles[studentLevel] || styles.intermediate;

    return (
      <motion.div
        className={`${style.bg} ${style.text} ${style.border} px-6 py-3 rounded-2xl border-2 flex items-center gap-3 backdrop-blur-sm`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        >
          {style.icon}
        </motion.div>
        <span className="font-bold capitalize text-sm">
          {studentLevel} Writer
        </span>
      </motion.div>
    );
  };

  const QualityChart = () => {
    const qualities = [
      {
        name: "Grammar",
        value: qualityBreakdown?.grammar || 0,
        color: "from-blue-500 to-cyan-500",
      },
      {
        name: "Content",
        value: qualityBreakdown?.content || 0,
        color: "from-emerald-500 to-teal-500",
      },
      {
        name: "Organization",
        value: qualityBreakdown?.organization || 0,
        color: "from-purple-500 to-pink-500",
      },
      {
        name: "Style",
        value: qualityBreakdown?.style || 0,
        color: "from-amber-500 to-orange-500",
      },
      {
        name: "Mechanics",
        value: qualityBreakdown?.mechanics || 0,
        color: "from-indigo-500 to-violet-500",
      },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {qualities.map((q, index) => (
          <motion.div
            key={q.name}
            className="text-center"
            variants={itemVariants}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${q.color} text-white mb-4`}
            >
              {q.name[0]}
            </div>
            <div className="text-sm font-bold text-white mb-3">{q.name}</div>
            <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${q.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${(q.value || 0) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
            <motion.div className="text-lg font-black text-white mt-3">
              {Math.round((q.value || 0) * 100)}%
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  const LevelUpdateBanner = () => {
    if (!levelUpdate || levelUpdate.action === "none") return null;

    const styles = {
      promote: {
        bg: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
        border: "border-emerald-500/30",
        icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
        title: "🎉 Level Up! Academic Achievement Unlocked!",
        gradient: "from-emerald-500 to-green-500",
      },
      warn: {
        bg: "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
        border: "border-amber-500/30",
        icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
        title: "⚠️ Attention Required",
        gradient: "from-amber-500 to-orange-500",
      },
    };

    const style = styles[levelUpdate.action];
    if (!style) return null;

    return (
      <motion.div
        className={`${style.bg} border-2 ${style.border} rounded-2xl p-8 mb-8 backdrop-blur-sm`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <div className="flex items-start gap-6">
          <motion.div
            className="bg-gray-800 p-4 rounded-2xl shadow-lg"
            animate={{
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {style.icon}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
              {levelUpdate.title || style.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {levelUpdate.message}
            </p>
            {levelUpdate.previousLevel && levelUpdate.newLevel && (
              <motion.div
                className="flex items-center gap-4 mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-gray-400 text-sm">Progress:</span>
                <span className="text-gray-300 font-semibold capitalize">
                  {levelUpdate.previousLevel}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
                <span className="font-bold text-white capitalize">
                  {levelUpdate.newLevel}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const AchievementsSection = () => {
    const unlockedAchievements = achievements.filter((a) => a.unlocked);
    if (unlockedAchievements.length === 0) return null;

    return (
      <motion.div
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-8 mb-8 backdrop-blur-sm"
        variants={itemVariants}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="bg-purple-500/20 p-3 rounded-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Medal className="w-8 h-8 text-purple-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              🏆 Achievements Unlocked!
            </h3>
            <p className="text-purple-300">Your hard work is paying off!</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {unlockedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <p className="font-bold text-white">{achievement.title}</p>
                <p className="text-sm text-purple-300">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const ProgressTracker = () => {
    const sectionsRead = Object.values(readProgress).filter(Boolean).length;
    const totalSections = Object.keys(readProgress).length;

    return (
      <motion.div
        className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border-2 border-purple-500/30 backdrop-blur-sm mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="bg-purple-500/20 p-3 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Target className="w-6 h-6 text-purple-400" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-white">Review Progress</h3>
              <p className="text-sm text-purple-300">
                {sectionsRead} of {totalSections} sections reviewed
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-purple-400">
              {completionPercentage}%
            </div>
            <div className="text-xs text-purple-300">Complete</div>
          </div>
        </div>

        <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {completionPercentage === 100 && (
          <motion.div
            className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-6 h-6 text-emerald-400" />
            <p className="text-emerald-300 font-semibold">
              🎉 Great job! You've reviewed all feedback sections!
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const OriginalTextSection = () => {
    if (!essay?.originalText) return null;

    return (
      <motion.div
        className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-gray-700/50 shadow-2xl mb-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Your Original Essay
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                {essay.fileType === "handwritten"
                  ? "📝 Handwritten Submission"
                  : "💻 Digital Submission"}{" "}
                • {essay.originalText.split(" ").length || 0} words
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => setShowOriginalText(!showOriginalText)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-xl border border-indigo-500/30 font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye className="w-5 h-5" />
            {showOriginalText ? "Hide Text" : "Show Text"}
          </motion.button>
        </div>

        <AnimatePresence>
          {showOriginalText && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-900/50 rounded-2xl p-8 border-2 border-indigo-500/20">
                {essay.fileType === "handwritten" && essay.ocrConfidence && (
                  <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-200">
                      <p className="font-semibold mb-1">
                        Handwritten Text Recognition
                      </p>
                      <p>
                        Confidence: {essay.ocrConfidence}% - Some spelling
                        errors may be due to handwriting recognition.
                      </p>
                    </div>
                  </div>
                )}
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
                    {essay.originalText}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <span>
                      📊 {feedback.summary?.wordsAnalyzed || 0} words analyzed
                    </span>
                    <span>•</span>
                    <span>
                      📝 {feedback.summary?.sentencesAnalyzed || 0} sentences
                    </span>
                  </div>
                  {essay.fileType === "handwritten" && (
                    <div className="flex items-center gap-2 text-amber-400">
                      <PenTool className="w-4 h-4" />
                      <span>Handwritten</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const ScoreDisplay = () => {
    const grading = essay?.grading || {};

    return (
      <motion.div
        className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-gray-700/50 shadow-2xl mb-8"
        variants={cardVariants}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Essay Assessment
                </h2>
                <p className="text-gray-400">Academic Performance</p>
              </div>
            </div>

            <div className="flex items-baseline gap-6 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-6xl font-black text-white">
                  {grading.finalScore || 0}
                </span>
                <span className="text-2xl text-gray-400">/ 100</span>
                {grading.uncertaintyRange && (
                  <span className="text-lg text-gray-500">
                    ± {grading.uncertaintyRange}
                  </span>
                )}
              </div>
              <div
                className={`${letterGrade.bg} ${letterGrade.color} ${letterGrade.border} px-6 py-3 rounded-2xl border-2 font-black text-xl`}
              >
                Grade: {grading.grade || "B+"}
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs mb-1">Raw Score</p>
                <p className="text-xl font-bold text-white">
                  {grading.rawScore || 0}
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs mb-1">Normalized</p>
                <p className="text-xl font-bold text-white">
                  {grading.normalizedScore || 0}
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-xl p-4 text-center">
                <p className="text-gray-400 text-xs mb-1">Final Score</p>
                <p className="text-xl font-bold text-white">
                  {grading.finalScore || 0}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>
                📊 Confidence: {Math.round((grading.confidence || 0) * 100)}%
              </span>
              <span>•</span>
              <span>
                🕒 {new Date(essay.gradedAt || Date.now()).toLocaleDateString()}
              </span>
              {grading.calibrationVersion && (
                <>
                  <span>•</span>
                  <span>Model: {grading.calibrationVersion}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Validated Errors */}
        {grading.validatedErrors && (
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-300 mb-3">
              Validated Errors
            </h4>
            <div className="flex gap-6">
              <div>
                <span className="text-gray-400">Grammar: </span>
                <span className="text-white font-bold">
                  {grading.validatedErrors.grammar || 0}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Spelling: </span>
                <span className="text-white font-bold">
                  {grading.validatedErrors.spelling || 0}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Detected Issues */}
        {feedbackData.detectedIssues &&
          feedbackData.detectedIssues.length > 0 && (
            <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <h4 className="text-sm font-semibold text-orange-300 mb-3">
                Detected Issues
              </h4>
              {feedbackData.detectedIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between mb-2"
                >
                  <span className="text-orange-200 text-sm capitalize">
                    {issue.type?.replace(/_/g, " ") || "Unknown"}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: `${(issue.severity || 0) * 100}%` }}
                      />
                    </div>
                    <span className="text-orange-300 text-xs font-bold">
                      {Math.round((issue.severity || 0) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* Text Extraction */}
        {feedbackData.textExtraction && (
          <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
            <h4 className="text-sm font-semibold text-indigo-300 mb-3">
              Document Processing
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-gray-400">Method: </span>
                <span className="text-white">
                  {feedbackData.textExtraction.method || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Engine: </span>
                <span className="text-white">
                  {feedbackData.textExtraction.engine || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-400">Confidence: </span>
                <span className="text-white">
                  {feedbackData.textExtraction.confidence || 0}%
                </span>
              </div>
              <div>
                <span className="text-gray-400">Words: </span>
                <span className="text-white">
                  {feedbackData.textExtraction.wordCount || 0}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-700 pt-8">
          <h3 className="text-xl font-bold text-white mb-6">Quality Metrics</h3>
          <QualityChart />
        </div>
      </motion.div>
    );
  };

  const GrammarSection = () => {
    const grammarErrors = feedback.grammarErrors || [];

    if (grammarErrors.length === 0) {
      return (
        <motion.div
          className="flex items-center gap-4 p-8 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm"
          variants={cardVariants}
        >
          <motion.div
            className="bg-emerald-500/20 p-4 rounded-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </motion.div>
          <div>
            <p className="text-emerald-300 font-bold text-lg">
              Excellent Grammatical Accuracy
            </p>
            <p className="text-emerald-400 text-sm">
              No grammatical errors detected.
            </p>
          </div>

          {feedback.grammarFeedbackMessage && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
              <p className="text-emerald-200 text-sm">
                {feedback.grammarFeedbackMessage}
              </p>
            </div>
          )}
        </motion.div>
      );
    }

    return (
      <motion.div className="space-y-6" variants={containerVariants}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              className="bg-blue-500/20 p-4 rounded-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Edit3 className="w-8 h-8 text-blue-400" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Grammar & Syntax Analysis
              </h3>
              <p className="text-gray-400 text-lg">
                {grammarErrors.length} issues identified
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {grammarErrors
            .slice(0, expandedSections.grammar ? undefined : 3)
            .map((error, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className={`text-xs font-bold px-4 py-2 rounded-full border ${
                        error.severity === "severe"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : error.severity === "moderate"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }`}
                    >
                      {(error.severity || "moderate").charAt(0).toUpperCase() +
                        (error.severity || "moderate").slice(1)}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-lg">
                      Sentence #{error.sentenceNumber || 1}
                    </span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-lg capitalize">
                      {(error.type || "grammar").replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-red-400" />
                      <p className="text-sm font-bold text-gray-300">
                        Original
                      </p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <p className="text-gray-200 italic leading-relaxed">
                        "
                        {error.sentence ||
                          error.original ||
                          "Sentence not available"}
                        "
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <p className="text-sm font-bold text-gray-300">
                        Correction
                      </p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                      <p className="text-emerald-300 font-medium leading-relaxed">
                        {error.correction || "Correction not available"}
                      </p>
                      <p className="text-emerald-400 text-sm mt-3">
                        {error.reason ||
                          error.error ||
                          "Grammar improvement needed"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <ExplanationRenderer explanation={error.explanation} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {grammarErrors.length > 3 && (
          <motion.button
            onClick={() =>
              setExpandedSections((prev) => ({
                ...prev,
                grammar: !prev.grammar,
              }))
            }
            className="w-full py-5 bg-gray-700/50 hover:bg-gray-700 rounded-2xl font-bold text-gray-300 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-blue-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expandedSections.grammar ? (
              <>
                <ChevronUp className="w-5 h-5" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" /> View All{" "}
                {grammarErrors.length} Issues
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    );
  };

  const StyleSection = () => {
    if (!feedback.styleIssues || feedback.styleIssues.length === 0) {
      return (
        <motion.div
          className="flex items-center gap-4 p-8 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm"
          // variants={cardVariants}
        >
          <motion.div
            className="bg-emerald-500/20 p-4 rounded-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </motion.div>
          <div>
            <p className="text-emerald-300 font-bold text-lg">
              Excellent Writing Style!
            </p>
            <p className="text-emerald-400 text-sm">
              No major style issues detected.
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div className="space-y-6" variants={containerVariants}>
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="bg-purple-500/20 p-4 rounded-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Writing Style Improvements
            </h3>
            <p className="text-gray-400 text-lg">
              {feedback.styleIssues.length} suggestions
            </p>
          </div>
        </div>

        {feedback.styleIssues
          .slice(0, expandedSections.style ? undefined : 5)
          .map((issue, idx) => (
            <motion.div
              key={idx}
              className="bg-purple-500/10 border-2 border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              custom={idx}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 capitalize">
                  {issue.type}
                </span>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Info className="w-4 h-4 text-purple-400" />
                </motion.div>
              </div>

              <div className="space-y-4">
                <motion.div
                  className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-sm text-gray-300">
                    <strong className="text-purple-300">Found: </strong>
                    <span className="font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded ml-2">
                      "{issue.text}"
                    </span>
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 + 0.2 }}
                >
                  <p className="text-sm text-purple-200 flex items-start gap-3">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💡
                    </motion.span>
                    <span>
                      <strong className="text-purple-300">Suggestion: </strong>
                      {issue.suggestion}
                    </span>
                  </p>
                </motion.div>

                {issue.context && (
                  <motion.p
                    className="text-xs text-gray-400 italic pt-3 border-t border-gray-600/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                  >
                    Context: {issue.context}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}

        {feedback.styleIssues.length > 5 && (
          <motion.button
            onClick={() =>
              setExpandedSections((prev) => ({ ...prev, style: !prev.style }))
            }
            className="w-full py-5 bg-gray-700/50 hover:bg-gray-700 rounded-2xl font-bold text-gray-300 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-purple-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expandedSections.style ? (
              <>
                <ChevronUp className="w-5 h-5" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" /> Show{" "}
                {feedback.styleIssues.length - 5} More Style Suggestions
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    );
  };

  const VocabularySection = () => {
    if (
      !feedback.vocabularyEnhancements ||
      feedback.vocabularyEnhancements.length === 0
    ) {
      return (
        <motion.div
          className="flex items-center gap-4 p-8 bg-blue-500/10 rounded-2xl border-2 border-blue-500/30 backdrop-blur-sm"
          // variants={cardVariants}
        >
          <motion.div
            className="bg-blue-500/20 p-4 rounded-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Info className="w-8 h-8 text-blue-400" />
          </motion.div>
          <div>
            <p className="text-blue-300 font-bold text-lg">
              Excellent Vocabulary Usage
            </p>
            <p className="text-blue-400 text-sm">No overused words detected.</p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div className="space-y-6" variants={containerVariants}>
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="bg-indigo-500/20 p-4 rounded-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <BookText className="w-8 h-8 text-indigo-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Vocabulary Enhancement
            </h3>
            <p className="text-gray-400 text-lg">
              Suggestions to vary your word choice
            </p>
          </div>
        </div>

        {feedback.vocabularyEnhancements.map((vocab, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-800/50 border-2 border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm group"
            variants={cardVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            custom={idx}
          >
            <div className="space-y-6">
              <motion.div
                className="flex items-center gap-4 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20"
                whileHover={{ x: 5 }}
              >
                <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-400">
                    <strong className="text-orange-400">Overused Word:</strong>
                  </p>
                  <p className="font-mono text-orange-300 text-xl font-bold mt-1">
                    {vocab.original}
                  </p>
                  <p className="text-sm text-orange-400/80 mt-2">
                    {vocab.reason}
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                <p className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />✨ Try these alternatives:
                </p>
                <div className="flex flex-wrap gap-3">
                  {vocab.alternatives.map((alt, i) => (
                    <motion.span
                      key={i}
                      className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-4 py-3 rounded-xl border border-indigo-500/30 font-semibold text-sm hover:from-indigo-500/30 hover:to-purple-500/30 hover:text-white transition-all duration-300 cursor-pointer group/alt relative overflow-hidden"
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 + i * 0.1 }}
                    >
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover/alt:translate-x-[100%] transition-transform duration-700" />
                      {alt}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {vocab.context && (
                <motion.div
                  className="pt-4 border-t border-gray-600/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.4 }}
                >
                  <p className="text-sm text-gray-400 italic flex items-start gap-2">
                    <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Example from your essay:{" "}
                      <span className="text-gray-300">{vocab.context}</span>
                    </span>
                  </p>
                </motion.div>
              )}

              {vocab.usageTip && (
                <motion.div
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                >
                  <p className="text-sm font-medium text-emerald-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Usage Tip
                  </p>
                  <p className="text-emerald-200 text-sm">{vocab.usageTip}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  const SpellingSection = () => {
    const hasSpellingErrors =
      feedback.spellingErrors && feedback.spellingErrors.length > 0;
    const hasOcrCorrections =
      ocrCorrections &&
      ocrCorrections?.spelling &&
      ocrCorrections?.spelling?.length > 0;
    const totalCorrections =
      (hasSpellingErrors ? feedback.spellingErrors.length : 0) +
      (hasOcrCorrections ? ocrCorrections?.spelling?.length : 0);

      console.log("ocrCorrections", ocrCorrections)

    // If no spelling errors or OCR corrections
    if (!hasSpellingErrors && !hasOcrCorrections) {
      return (
        <motion.div
          className="flex items-center gap-4 p-8 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm"
          variants={cardVariants}
        >
          <motion.div
            className="bg-emerald-500/20 p-4 rounded-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </motion.div>
          <div>
            <p className="text-emerald-300 font-bold text-lg">
              Perfect Spelling
            </p>
            <p className="text-emerald-400 text-sm">
              No spelling errors detected.
            </p>
          </div>

          {feedback.spellingFeedbackMessage && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
              <p className="text-emerald-200 text-sm">
                {feedback.spellingFeedbackMessage}
              </p>
            </div>
          )}
        </motion.div>
      );
    }

    // Smart correction suggestions based on context
    const getSmartCorrection = (error) => {
      const contextCorrections = {
        pesple: "people",
        leaming: "learning",
        leam: "learn",
        busble: "trouble",
        ysur: "your",
        frionds: "friends",
        intemet: "internet",
        nour: "now",
        ysun: "you",
        computor: "computer",
      };

      return (
        contextCorrections[error.word?.toLowerCase()] ||
        contextCorrections[error.original?.toLowerCase()] ||
        error.correction ||
        (error.suggestions && error.suggestions[0])
      );
    };

    // Combine both spelling errors and OCR corrections for display
    const getAllCorrections = () => {
      const corrections = [];

      // Add spelling errors with type
      if (hasSpellingErrors) {
        corrections.push(
          ...feedback.spellingErrors.map((error) => ({
            ...error,
            type: "spelling",
            displayWord: error.word,
            displayCorrection: getSmartCorrection(error),
            displayContext: error.context,
            confidence: null,
          }))
        );
      }

      // Add OCR corrections with type
      if (hasOcrCorrections) {
        corrections.push(
          ...feedback.ocrCorrections.spelling.map((error) => ({
            ...error,
            type: "ocr",
            displayWord: error.original,
            displayCorrection: error.correction,
            displayContext: error.context,
            confidence: error.confidence,
          }))
        );
      }

      return corrections;
    };

    const allCorrections = getAllCorrections();

    return (
      <motion.div className="space-y-6" variants={containerVariants}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              className="bg-amber-500/20 p-4 rounded-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Type className="w-8 h-8 text-amber-400" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Spelling Corrections
              </h3>
              <p className="text-gray-400 text-lg">
                {totalCorrections} words need attention
                {hasOcrCorrections && hasSpellingErrors && (
                  <span className="text-sm text-amber-400 ml-2">
                    ({feedback.spellingErrors.length} spelling +{" "}
                    {feedback.ocrCorrections.spelling.length} OCR)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Enhanced OCR warning */}
          {(essay?.fileType === "handwritten" || hasOcrCorrections) && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">
                {hasOcrCorrections
                  ? "Includes OCR corrections"
                  : "Some may be OCR errors"}
              </span>
            </div>
          )}
        </div>

        {/* Correction type indicators */}
        {hasOcrCorrections && hasSpellingErrors && (
          <motion.div
            className="flex items-center gap-4 text-xs text-gray-400 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500/50 rounded-full"></div>
              <span>Spelling Errors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500/50 rounded-full"></div>
              <span>OCR Corrections</span>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {allCorrections
            .slice(0, expandedSections.spelling ? undefined : 6)
            .map((error, idx) => {
              const isOcrCorrection = error.type === "ocr";
              const smartCorrection = getSmartCorrection(error);

              return (
                <motion.div
                  key={`${error.type}-${idx}`}
                  className={`bg-gray-800/50 border-2 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm group ${
                    isOcrCorrection
                      ? "border-purple-500/30 bg-purple-500/5"
                      : "border-gray-700"
                  }`}
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${
                          isOcrCorrection
                            ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                            : error.severity === "severe" ||
                              error.severity === "high"
                            ? "bg-red-500/20 text-red-300 border-red-500/30"
                            : error.severity === "moderate"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                        }`}
                      >
                        {isOcrCorrection ? "OCR" : error.severity || "spelling"}
                      </span>

                      {/* Confidence indicator for OCR */}
                      {isOcrCorrection && error.confidence && (
                        <span className="text-xs text-gray-500">
                          {Math.round(error.confidence * 100)}% confidence
                        </span>
                      )}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Eye className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition-colors" />
                    </motion.div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center gap-4 justify-center p-4 bg-gray-700/50 rounded-xl"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-red-400 line-through font-bold text-xl">
                        {error.displayWord}
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                      <span className="text-emerald-400 font-black text-xl">
                        {error.displayCorrection}
                      </span>
                    </motion.div>

                    {error.displayContext && (
                      <motion.p
                        className="text-sm text-gray-400 italic pt-3 border-t border-gray-600/50 flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">
                          {error.displayContext}
                        </span>
                      </motion.p>
                    )}

                    {/* Additional suggestions for OCR corrections */}
                    {isOcrCorrection &&
                      error.suggestions &&
                      error.suggestions.length > 1 && (
                        <motion.div
                          className="mt-3 pt-3 border-t border-gray-600/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                        >
                          <p className="text-xs text-gray-500 mb-2">
                            Other suggestions:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {error.suggestions
                              .slice(1, 4)
                              .map((suggestion, suggestionIdx) => (
                                <span
                                  key={suggestionIdx}
                                  className="text-xs bg-gray-700/50 text-gray-400 px-2 py-1 rounded"
                                >
                                  {suggestion}
                                </span>
                              ))}
                          </div>
                        </motion.div>
                      )}
                  </div>

                  {(error.rule || isOcrCorrection) && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-gray-600/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.4 }}
                    >
                      <p className="text-xs text-gray-500 font-mono">
                        {isOcrCorrection
                          ? "OCR detected handwritten text"
                          : `Rule: ${error.rule?.replace(/_/g, " ")}`}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
        </div>

        {allCorrections.length > 6 && (
          <motion.button
            onClick={() =>
              setExpandedSections((prev) => ({
                ...prev,
                spelling: !prev.spelling,
              }))
            }
            className="w-full py-5 bg-gray-700/50 hover:bg-gray-700 rounded-2xl font-bold text-gray-300 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-amber-500/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {expandedSections.spelling ? (
              <>
                <ChevronUp className="w-5 h-5" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" /> Show{" "}
                {allCorrections.length - 6} More Corrections
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    );
  };

  const PositiveFeedbackSection = () => {
    if (!feedback.positiveFeedback || feedback.positiveFeedback.length === 0) {
      return null;
    }

    return (
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl p-6 border-2 border-emerald-500/30 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-emerald-500/20 p-3 rounded-xl"
          >
            <Star className="w-6 h-6 text-emerald-400 fill-current" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-emerald-300">
              Excellent Work!
            </h3>
            <p className="text-emerald-400 text-sm">
              We noticed these great sentences
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {feedback.positiveFeedback.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold text-sm">
                  {item.praise}
                </span>
              </div>
              <p className="text-gray-300 text-sm italic">"{item.sentence}"</p>
              <p className="text-xs text-gray-500 mt-1">
                Sentence #{item.position}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const StructureSection = () => {
    if (!feedback.sentenceStructure) {
      return (
        <motion.div
          className="flex items-center gap-4 p-8 bg-teal-500/10 rounded-2xl border-2 border-teal-500/30 backdrop-blur-sm"
          // variants={cardVariants}
        >
          <motion.div
            className="bg-teal-500/20 p-4 rounded-xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Layout className="w-8 h-8 text-teal-400" />
          </motion.div>
          <div>
            <p className="text-teal-300 font-bold text-lg">
              Structure Analysis Complete
            </p>
            <p className="text-teal-400 text-sm">
              No structural issues detected.
            </p>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div className="space-y-8" variants={containerVariants}>
        <div className="flex items-center gap-4">
          <motion.div
            className="bg-teal-500/20 p-4 rounded-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Layout className="w-8 h-8 text-teal-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Sentence & Paragraph Structure
            </h3>
            <p className="text-gray-400 text-lg">
              Analysis of your writing organization
            </p>
          </div>
        </div>

        {/* Metrics */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {[
            {
              label: "Avg Sentence Length",
              value: `${feedback.sentenceStructure.metrics.avgSentenceLength} words`,
              icon: <Type className="w-6 h-6" />,
              color: "from-blue-500 to-cyan-500",
            },
            {
              label: "Sentence Variety",
              value: feedback.sentenceStructure.metrics.sentenceVariety,
              icon: <BarChart3 className="w-6 h-6" />,
              color: "from-purple-500 to-pink-500",
            },
            {
              label: "Avg Paragraph Length",
              value: `${feedback.sentenceStructure.metrics.avgParagraphLength} words`,
              icon: <FileText className="w-6 h-6" />,
              color: "from-emerald-500 to-teal-500",
            },
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 text-center group hover:border-gray-600 transition-all duration-300 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
              }}
              custom={idx}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl mb-4 text-white`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {metric.icon}
              </motion.div>
              <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
              <p className="text-2xl font-black text-white">{metric.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Issues */}
        {feedback.sentenceStructure.issues &&
          feedback.sentenceStructure.issues.length > 0 && (
            <motion.div
              className="bg-orange-500/10 border-2 border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm"
              variants={itemVariants}
            >
              <motion.h4
                className="font-bold text-orange-300 text-xl mb-6 flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertCircle className="w-6 h-6" />
                </motion.div>
                Structural Issues Detected
              </motion.h4>
              <ul className="space-y-3">
                {feedback.sentenceStructure.issues.map((issue, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-orange-200 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className="text-orange-400 mt-1 flex-shrink-0"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 2,
                      }}
                    >
                      •
                    </motion.span>
                    <span className="leading-relaxed">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

        {/* Suggestions */}
        {feedback.sentenceStructure.suggestions &&
          feedback.sentenceStructure.suggestions.length > 0 && (
            <motion.div
              className="bg-teal-500/10 border-2 border-teal-500/30 rounded-2xl p-8 backdrop-blur-sm"
              variants={itemVariants}
            >
              <motion.h4
                className="font-bold text-teal-300 text-xl mb-6 flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Lightbulb className="w-6 h-6" />
                </motion.div>
                Improvement Suggestions
              </motion.h4>
              <ul className="space-y-4">
                {feedback.sentenceStructure.suggestions.map(
                  (suggestion, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-4 bg-teal-500/10 p-5 rounded-xl border border-teal-500/20 group hover:bg-teal-500/20 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {idx + 1}
                      </motion.div>
                      <span className="text-teal-100 leading-relaxed group-hover:text-white transition-colors">
                        {suggestion}
                      </span>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          )}
      </motion.div>
    );
  };

  const SummaryCard = () => (
    <motion.div
      className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border-2 border-blue-500/30 backdrop-blur-sm"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="flex items-center gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Award className="w-10 h-10 text-white" />
        </motion.div>
        <div>
          <h3 className="text-3xl font-bold text-white">Assessment Summary</h3>
          <p className="text-gray-400 text-lg">
            Overall feedback and next steps
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <motion.div
          className="bg-gray-800/50 rounded-2xl p-8 border-2 border-blue-500/20 shadow-lg"
          variants={itemVariants}
        >
          <div className="flex items-start gap-4">
            <BookMarked className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-blue-300 font-bold text-xl mb-4">
                {feedback.summary.overallComment}
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                {feedback.summary.motivationalMessage}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700 flex items-center gap-6 text-gray-400">
            <span>📊 {feedback.summary.wordsAnalyzed} words analyzed</span>
            <span>•</span>
            <span>📝 {feedback.summary.sentencesAnalyzed} sentences</span>
          </div>
        </motion.div>

        {/* Organization Feedback */}
        {feedback.organizationFeedback && (
          <motion.div
            className="bg-gray-800/50 rounded-2xl p-8 border-2 border-purple-500/20"
            variants={itemVariants}
          >
            <h4 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
              <Layout className="w-6 h-6 text-purple-400" />
              Essay Organization
            </h4>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-lg">
                  {feedback.organizationFeedback.structure}
                </span>
                {feedback.organizationFeedback.organizationScore && (
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${feedback.organizationFeedback.organizationScore}%`,
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-purple-400 font-bold">
                      {feedback.organizationFeedback.organizationScore}%
                    </span>
                  </div>
                )}
              </div>

              {feedback.organizationFeedback.positives &&
                feedback.organizationFeedback.positives.length > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <p className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Strengths:
                    </p>
                    <ul className="space-y-2">
                      {feedback.organizationFeedback.positives.map(
                        (positive, idx) => (
                          <motion.li
                            key={idx}
                            className="text-emerald-200 flex items-start gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-emerald-400">✓</span>
                            <span>{positive}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {feedback.organizationFeedback.suggestions &&
                feedback.organizationFeedback.suggestions.length > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Suggestions for Improvement:
                    </p>
                    <ul className="space-y-2">
                      {feedback.organizationFeedback.suggestions.map(
                        (suggestion, idx) => (
                          <motion.li
                            key={idx}
                            className="text-amber-200 flex items-start gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-amber-400">→</span>
                            <span>{suggestion}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </motion.div>
        )}

        {/* Content Strengths and Improvements */}
        {feedback.contentFeedback && (
          <motion.div
            className="bg-gray-800/50 rounded-2xl p-8 border-2 border-blue-500/20"
            variants={itemVariants}
          >
            <h4 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              Content Analysis
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {feedback.contentFeedback.strengths &&
                feedback.contentFeedback.strengths.length > 0 && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                    <p className="text-emerald-300 font-bold text-lg mb-4 flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5" />
                      What You Did Well
                    </p>
                    <ul className="space-y-3">
                      {feedback.contentFeedback.strengths.map(
                        (strength, idx) => (
                          <motion.li
                            key={idx}
                            className="text-emerald-200 flex items-start gap-3 text-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-emerald-400 mt-0.5">✓</span>
                            <span>{strength}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}

              {feedback.contentFeedback.improvements &&
                feedback.contentFeedback.improvements.length > 0 && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                    <p className="text-amber-300 font-bold text-lg mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Areas to Improve
                    </p>
                    <ul className="space-y-3">
                      {feedback.contentFeedback.improvements.map(
                        (improvement, idx) => (
                          <motion.li
                            key={idx}
                            className="text-amber-200 flex items-start gap-3 text-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="text-amber-400 mt-0.5">→</span>
                            <span>{improvement}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>
                )}
            </div>

            {/* Content Examples */}
            {feedback.contentFeedback.examples &&
              feedback.contentFeedback.examples.length > 0 && (
                <div className="mt-6 space-y-4">
                  {feedback.contentFeedback.examples.map((example, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                        <div className="space-y-3">
                          <p className="text-blue-300 font-semibold">
                            {example.type?.replace(/_/g, " ").toUpperCase()}
                          </p>
                          {example.before && example.after && (
                            <div className="space-y-3">
                              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <p className="text-xs text-red-400 font-semibold mb-1">
                                  Before:
                                </p>
                                <p className="text-red-200 text-sm italic">
                                  "{example.before}"
                                </p>
                              </div>
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                                <p className="text-xs text-emerald-400 font-semibold mb-1">
                                  After:
                                </p>
                                <p className="text-emerald-200 text-sm italic">
                                  "{example.after}"
                                </p>
                              </div>
                            </div>
                          )}
                          {example.text && (
                            <p className="text-blue-200 text-sm italic">
                              "{example.text}"
                            </p>
                          )}
                          <p className="text-blue-100 text-sm">
                            {example.explanation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
          </motion.div>
        )}

        {feedback.summary.keyTakeaways &&
          feedback.summary.keyTakeaways.length > 0 && (
            <motion.div
              className="bg-gray-800/50 rounded-2xl p-8 border-2 border-emerald-500/20"
              variants={itemVariants}
            >
              <h4 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
                <ThumbsUp className="w-6 h-6 text-emerald-400" />
                Key Insights
              </h4>
              <ul className="space-y-4">
                {feedback.summary.keyTakeaways.map((takeaway, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-4 text-gray-300 bg-gray-700/50 p-4 rounded-xl border border-gray-600"
                    whileHover={{ x: 5 }}
                  >
                    <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-lg">{takeaway}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

        {feedback.summary.nextSteps &&
          feedback.summary.nextSteps.length > 0 && (
            <motion.div
              className="bg-gray-800/50 rounded-2xl p-8 border-2 border-purple-500/20"
              variants={itemVariants}
            >
              <h4 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
                <Rocket className="w-6 h-6 text-purple-400" />
                Action Steps
              </h4>
              <div className="space-y-4">
                {feedback.summary.nextSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-6 bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 group hover:bg-purple-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 mt-0.5 shadow-lg">
                      {idx + 1}
                    </div>
                    <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
      </div>
    </motion.div>
  );

  const BeforeAfterExamples = () => {
    if (
      !feedback.beforeAfterExamples ||
      feedback.beforeAfterExamples.length === 0
    ) {
      return null;
    }

    return (
      <motion.div
        className="space-y-8"
        // variants={containerVariants}
      >
        <div className="flex items-center gap-4 mb-8">
          <motion.div
            className="bg-green-500/20 p-4 rounded-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowRight className="w-8 h-8 text-green-400" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Before & After Examples
            </h3>
            <p className="text-gray-400 text-lg">
              See your writing improvements in action
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {feedback?.beforeAfterExamples.map((example, idx) => (
            <motion.div
              key={idx}
              className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              custom={idx}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className={`text-xs font-bold px-4 py-2 rounded-full border ${
                    example.severity === "severe"
                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                      : example.severity === "moderate"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                  }`}
                >
                  {example.type.charAt(0).toUpperCase() + example.type.slice(1)}
                </span>
                <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-lg capitalize">
                  {example.severity} priority
                </span>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <p className="text-sm font-bold text-gray-300">Before</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <p className="text-gray-200 leading-relaxed italic">
                      "{example.before}"
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-sm font-bold text-gray-300">After</p>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <p className="text-green-300 font-medium leading-relaxed">
                      "{example.after}"
                    </p>
                  </div>
                </div>
              </div>

              {example.word_changed && (
                <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-gray-700/50 rounded-xl">
                  <span className="text-red-400 line-through font-bold text-lg">
                    {example.word_changed.from}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <span className="text-green-400 font-bold text-lg">
                    {example.word_changed.to}
                  </span>
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  {/* <div>
                    <p className="text-sm font-bold text-blue-300 mb-2">
                      Explanation
                    </p>
                    <p className="text-blue-200 leading-relaxed">
                      {example.explanation}
                    </p>
                    {example.example && (
                      <p className="text-blue-300 text-sm mt-3 italic">
                        Example: {example.example}
                      </p>
                    )}
                  </div> */}
                  <ExplanationRenderer explanation={example.explanation} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  const PersonalizedInsights = () => {
    if (!feedback.personalizedInsights) return null;

    const {
      progressComparison,
      persistentChallenges,
      motivationalContext,
      milestones,
    } = feedback.personalizedInsights;

    return (
      <motion.div
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border-2 border-purple-500/30 backdrop-blur-sm mb-8"
        variants={cardVariants}
      >
        <div className="flex items-center gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 rounded-2xl shadow-2xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          <div>
            <h3 className="text-3xl font-bold text-white">
              Personalized Insights
            </h3>
            <p className="text-gray-400 text-lg">
              Your unique learning journey
            </p>
          </div>
        </div>

        {/* Progress Comparison */}
        {progressComparison && (
          <motion.div
            className="bg-gray-800/50 rounded-2xl p-6 border-2 border-blue-500/20 mb-6"
            variants={itemVariants}
          >
            <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              Progress Tracking
            </h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-blue-300 text-sm mb-2">Current Score</p>
                <p className="text-2xl font-black text-white">
                  {progressComparison.currentScore}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <p className="text-purple-300 text-sm mb-2">Average Score</p>
                <p className="text-2xl font-black text-white">
                  {progressComparison.averageScore}
                </p>
              </div>
              <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <p className="text-amber-300 text-sm mb-2">Last Score</p>
                <p className="text-2xl font-black text-white">
                  {progressComparison.lastScore}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-700/50 rounded-xl border border-gray-600">
                <p className="text-gray-300 text-sm mb-2">Essays Written</p>
                <p className="text-2xl font-black text-white">
                  {progressComparison.essayCount}
                </p>
              </div>
            </div>

            {progressComparison.trend && (
              <motion.div
                className={`mt-4 p-4 rounded-xl border ${
                  progressComparison.trend === "improving"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : progressComparison.trend === "declining"
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-amber-500/10 border-amber-500/20"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p
                  className={`font-semibold flex items-center gap-2 ${
                    progressComparison.trend === "improving"
                      ? "text-emerald-300"
                      : progressComparison.trend === "declining"
                      ? "text-red-300"
                      : "text-amber-300"
                  }`}
                >
                  {progressComparison.trend === "improving" &&
                    "📈 Trending Up!"}
                  {progressComparison.trend === "declining" &&
                    "📉 Needs Attention"}
                  {progressComparison.trend === "stable" &&
                    "📊 Steady Progress"}
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  {progressComparison.trend === "improving" &&
                    "Great work! Your scores are improving."}
                  {progressComparison.trend === "declining" &&
                    "Focus on the feedback to improve your next essay."}
                  {progressComparison.trend === "stable" &&
                    "Consistent performance - keep it up!"}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Persistent Challenges */}
        {persistentChallenges && persistentChallenges.length > 0 && (
          <motion.div
            className="bg-gray-800/50 rounded-2xl p-6 border-2 border-amber-500/20 mb-6"
            variants={itemVariants}
          >
            <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Focus Areas
            </h4>
            <div className="space-y-4">
              {persistentChallenges.map((challenge, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Target className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-300 font-semibold">
                      {challenge.area}
                    </p>
                    <p className="text-amber-200 text-sm mt-1">
                      {challenge.message}
                    </p>
                    {challenge.actionable && (
                      <p className="text-amber-400 text-xs mt-2">
                        💡 {challenge.actionable}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Motivational Context */}
        {motivationalContext && (
          <motion.div
            className="bg-gray-800/50 rounded-2xl p-6 border-2 border-emerald-500/20"
            variants={itemVariants}
          >
            <h4 className="font-bold text-white text-xl mb-4 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-emerald-400" />
              Personalized Feedback
            </h4>
            <div className="space-y-4">
              <p className="text-emerald-300 text-lg font-semibold">
                {motivationalContext.overallComment}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {motivationalContext.motivationalMessage}
              </p>
              {motivationalContext.personalNote && (
                <motion.div
                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-emerald-200 text-sm italic">
                    {motivationalContext.personalNote}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  const PlagiarismSection = () => {
    const plagiarism = feedbackData.plagiarism;

    if (!plagiarism) return null;

    return (
      <motion.div
        className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-gray-700/50 shadow-2xl mb-8"
        variants={cardVariants}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`p-4 rounded-2xl ${
              plagiarism.isPlagiarized ? "bg-red-500/20" : "bg-emerald-500/20"
            }`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <BadgeInfo
              className={`w-8 h-8 ${
                plagiarism.isPlagiarized ? "text-red-400" : "text-emerald-400"
              }`}
            />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">Originality Check</h3>
            <p className="text-gray-400">
              {plagiarism.isPlagiarized
                ? "Some similarities detected"
                : "Your work appears original"}
            </p>
          </div>
        </div>

        {/* Similarity Score */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700/30 rounded-xl p-6 text-center">
            <div
              className={`text-4xl font-black mb-2 ${
                plagiarism.overallSimilarity > 75
                  ? "text-red-400"
                  : plagiarism.overallSimilarity > 50
                  ? "text-amber-400"
                  : "text-emerald-400"
              }`}
            >
              {plagiarism.overallSimilarity}%
            </div>
            <p className="text-gray-400 text-sm">Overall Similarity</p>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-blue-400 mb-2">
              {plagiarism.details.properCitations || 0}
            </div>
            <p className="text-gray-400 text-sm">Proper Citations</p>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-black text-purple-400 mb-2">
              {Math.round(plagiarism.confidence * 100)}%
            </div>
            <p className="text-gray-400 text-sm">Check Confidence</p>
          </div>
        </div>

        {/* Citations */}
        {plagiarism.citations && plagiarism.citations.length > 0 && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-emerald-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Properly Cited Sources
            </h4>
            <div className="space-y-3">
              {plagiarism.citations.map((citation, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-emerald-200 text-sm mb-2">
                    "{citation.quote}"
                  </p>
                  <p className="text-gray-400 text-xs">
                    Source: {citation.source}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h4 className="font-bold text-blue-300 mb-4">Text Analysis</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-1">Total Words</p>
              <p className="text-white font-bold">
                {plagiarism.details.statistics.totalWords}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Unique Words</p>
              <p className="text-white font-bold">
                {plagiarism.details.statistics.uniqueWords}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Reading Level</p>
              <p className="text-white font-bold">
                {plagiarism.details.statistics.readingLevel?.level}
              </p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Lexical Diversity</p>
              <p className="text-white font-bold">
                {plagiarism.details.statistics.lexicalDiversity}%
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const FullyCorrectedTextSection = () => {
    if (!essay.fullyCorrectedText) return null;

    return (
      <motion.div className="bg-gray-800/50 rounded-3xl p-8 border-2 border-gray-700/50 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 rounded-2xl">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-emerald-400">
                ✨ Fully Corrected Version
              </h2>
              <p className="text-gray-400 text-sm">All improvements applied</p>
            </div>
          </div>
          <button
            onClick={() =>
              setExpandedSections((prev) => ({
                ...prev,
                correctedText: !prev.correctedText,
              }))
            }
            className="px-6 py-3 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-500/30"
          >
            {expandedSections.correctedText ? "Hide" : "Show"}
          </button>
        </div>

        {expandedSections.correctedText && (
          <div className="bg-emerald-500/10 rounded-2xl p-8 border-2 border-emerald-500/20">
            <p className="text-gray-200 leading-relaxed"     style={{ whiteSpace: 'pre-line' }}
>
              {essay.fullyCorrectedText}
            </p>
            <div className="mt-6 pt-6 border-t border-emerald-500/20 flex justify-between">
              <span className="text-emerald-300 text-sm">
                ✅ All corrections applied
              </span>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    essay.fullyCorrectedText
                  )
                }
                className="px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm"
              >
                Copy Text
              </button>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  const ProgressionExamplesSection = () => {
    if (!feedback.progressionExamples) return null;

    return (
      <motion.div className="bg-gray-800/50 rounded-3xl p-8 border-2 border-gray-700/50 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                Step-by-Step Improvements
              </h2>
              <p className="text-gray-400">See transformation</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {feedback.progressionExamples.map((prog, idx) => (
            <div
              key={idx}
              className="bg-gray-900/50 rounded-2xl p-6 border-2 border-cyan-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-lg font-bold">
                  Step {prog.step}
                </div>
                <p className="text-gray-400 text-sm">{prog.explanation}</p>
              </div>

              <div className="space-y-4">
                {/* Original */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <p className="text-xs font-semibold text-red-400 mb-2">
                    ORIGINAL
                  </p>
                  <p className="text-red-200 italic">
                    {prog.progression.original}
                  </p>
                </div>

                {/* After Spelling */}
                {prog.changes.spelling && (
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-amber-400 mb-2">
                      AFTER SPELLING
                    </p>
                    <p className="text-amber-200">
                      {prog.progression.after_spelling}
                    </p>
                  </div>
                )}

                {/* After Grammar */}
                {prog.changes.grammar && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-emerald-400 mb-2">
                      AFTER GRAMMAR
                    </p>
                    <p className="text-emerald-200 font-medium">
                      {prog.progression.after_grammar}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Continue with other sections (Style, Vocabulary, Spelling, etc.) following the same pattern...

  // For brevity, I'll show the corrected tab configuration and main return:

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-5 h-5" />,
      badge: readProgress.overview ? "✓" : null,
    },
    {
      id: "corrected",
      label: "Corrected",
      icon: <CheckCircle className="w-5 h-5" />,
      badge: feedbackData.fullyCorrectedEssay ? "✨" : null,
    },
    {
      id: "progression",
      label: "Progression",
      icon: <TrendingUp className="w-5 h-5" />,
      count: feedback.progressionExamples?.length || 0,
      badge: (feedback.progressionExamples?.length || 0) > 0 ? "📊" : null,
    },
    {
      id: "grammar",
      label: "Grammar",
      icon: <Edit3 className="w-5 h-5" />,
      count: feedback.grammarErrors?.length || 0,
      badge: readProgress.grammar ? "✓" : null,
    },
    {
      id: "spelling",
      label: "Spelling",
      icon: <Type className="w-5 h-5" />,
      count: feedback.spellingErrors?.length || 0,
      badge: readProgress.spelling ? "✓" : null,
    },
    {
      id: "style",
      label: "Style",
      icon: <Sparkles className="w-5 h-5" />,
      count:
        (feedback.styleIssues?.length || 0) +
        (feedback.styleSuggestions?.length || 0),
      badge: readProgress.style ? "✓" : null,
    },
    {
      id: "vocabulary",
      label: "Vocabulary",
      icon: <BookText className="w-5 h-5" />,
      count: feedback.vocabularyEnhancements?.length || 0,
      badge: readProgress.vocabulary ? "✓" : null,
    },
    {
      id: "structure",
      label: "Structure",
      icon: <Layout className="w-5 h-5" />,
      badge: readProgress.structure ? "✓" : null,
    },
    {
      id: "plagiarism",
      label: "Originality",
      icon: <BadgeInfo className="w-5 h-5" />,
      badge: feedbackData.plagiarism?.overallSimilarity === 0 ? "✓" : null,
    },
    {
      id: "examples",
      label: "Examples",
      icon: <ArrowRight className="w-5 h-5" />,
      count: feedback.beforeAfterExamples?.length || 0,
      badge: readProgress.examples ? "✓" : null,
    },
    {
      id: "positive",
      label: "Positive",
      icon: <LucideMessageCircleHeart className="w-5 h-5" />,
      count: feedback.positiveFeedback?.length || 0,
      badge: (feedback.positiveFeedback?.length || 0) > 0 ? "✓" : null,
    },
    {
      id: "insights",
      label: "Insights",
      icon: <Brain className="w-5 h-5" />,
      badge: readProgress.insights ? "✓" : null,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <SummaryCard />;
      case "grammar":
        return <GrammarSection />;
      case "spelling":
        return <SpellingSection />;
      case "style":
        return <StyleSection />;
      case "vocabulary":
        return <VocabularySection />;
      case "structure":
        return <StructureSection />;
      case "plagiarism":
        return <PlagiarismSection />;
      case "examples":
        return <BeforeAfterExamples />;
      case "positive":
        return <PositiveFeedbackSection />;
      case "insights":
        return <PersonalizedInsights />;
      case "corrected":
        return <FullyCorrectedTextSection />;
      case "progression":
        return <ProgressionExamplesSection />;
      default:
        return <SummaryCard />;
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {essay?.title || "Essay Analysis"}
            </h1>
          </div>
          <p className="text-gray-400 text-xl">
            Comprehensive analysis with actionable improvements
          </p>
        </motion.div>

        <AnimatePresence>
          {levelUpdate && <LevelUpdateBanner />}
          <AchievementsSection />
        </AnimatePresence>

        <ProgressTracker />
        <OriginalTextSection />
        <ScoreDisplay />
        <PersonalizedInsights />

        <motion.div
          className="bg-gray-800/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 mb-8 overflow-hidden"
          variants={itemVariants}
        >
          {/* Enhanced Tabs */}
          <div className="border-b border-gray-700/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-5 font-bold capitalize transition-all duration-300 whitespace-nowrap relative group ${
                    activeTab === tab.id
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-400"
                      : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{
                      rotate: activeTab === tab.id ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {tab.icon}
                  </motion.div>
                  {tab.label}
                  {tab.count > 0 && (
                    <motion.span
                      className={`ml-2 px-3 py-1 rounded-full text-xs font-black ${
                        activeTab === tab.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {tab.count}
                    </motion.span>
                  )}
                  {tab.badge && (
                    <motion.span
                      className="ml-1 text-emerald-400 text-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {tab.badge}
                    </motion.span>
                  )}

                  {/* Active indicator */}
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.div
            className="p-8"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={containerVariants}
        >
          <motion.button
            onClick={() => navigate("/upload")}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-4 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <MessageSquare className="w-6 h-6" />
            Submit New Essay
          </motion.button>

          <motion.button
            onClick={handleDirectExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export PDF
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleOptionsModal}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4" />
            Options
          </motion.button>
        </motion.div>
      </div>

      <PdfPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        essayData={essay}
        studentData={student}
      />
    </motion.div>
  );
};

export default EssayFeedback;
