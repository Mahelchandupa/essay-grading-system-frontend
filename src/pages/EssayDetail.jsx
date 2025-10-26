import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Share2,
  BookOpen,
  Edit3,
  Type,
  ArrowRight,
  Sparkles,
  Layout,
  Target,
  Star,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  FileText,
  Brain,
  PieChart,
  Zap,
  Eye,
  BarChart3,
  Award,
  TrendingUp,
  GraduationCap,
  Copy,
  ThumbsUp,
  MessageSquare,
  RotateCcw,
  Bookmark,
  Settings,
  Shield,
} from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PdfPreviewModal from "../modal/PdfPreviewModal";
import { exportEssayFeedbackPDF } from "../utils/pdfExport";
import { usePdfExport } from "../hooks/usePdfExport";
import { snakeToTitleCase } from "../utils/formatter";
import ExplanationRenderer from "../components/ExplanationRenderer";
import essayService from "../services/essayServices";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { useUser } from "../context/UserContext";
import AchievementsTab from "../components/AchievementsTab";
import PlagiarismTab from "../components/PlagiarismTab";

const EssayDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedbackData } = location.state || {};
  const { id: essayId } = useParams();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedText, setCopiedText] = useState("");
  const [essay, setEssay] = useState(feedbackData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isExporting, exportProgress, exportFeedbackPDF } = usePdfExport();
  const [showPreview, setShowPreview] = useState(false);

  const student = user?.student;

  useEffect(() => {
    const fetchEssayDetails = async () => {
      try {
        if (!feedbackData) {
          setLoading(true);
          const response = await essayService.getEssayDetails(essayId);
          console.log("response", response);
          if (response && response.essay) {
            showSuccessToast("Fetch Essay Details successful.");
            const { essay, achievements } = response; 
            setEssay({
              ...essay, achievements
            });
          } else {
            showErrorToast("Failed to fetch essay details.");
            setError("Failed to load essay details");
          }
        } else {
          setEssay(feedbackData);
        }
      } catch (err) {
        console.error("Error fetching essay:", err);
        setError(err.message || "Failed to load essay");
      } finally {
        setLoading(false);
      }
    };

    fetchEssayDetails();
  }, [essayId]);

  // Safe data access functions
  const getGrammarErrors = () => essay?.feedback?.grammarErrors || [];
  const getSpellingErrors = () => essay?.feedback?.spellingErrors || [];
  const getStyleIssues = () => essay?.feedback?.styleSuggestions || [];
  const getVocabularyEnhancements = () =>
    essay?.feedback?.vocabularyEnhancements || [];
  const getBeforeAfterExamples = () =>
    essay?.feedback?.beforeAfterExamples || [];

  // Safe personalized insights with fallbacks
  const getPersonalizedInsights = () => ({
    progressComparison: {
      currentScore: essay?.grading?.finalScore || 0,
      averageScore: essay?.grading?.finalScore || 0,
      improvement: 0,
      trend: "stable",
    },
    improvementAreas: [],
    persistentChallenges: [],
    milestones: [],
    motivationalContext: {
      overallComment:
        essay?.feedback?.summary?.overallComment || "Great effort!",
      motivationalMessage:
        essay?.feedback?.summary?.motivationalMessage || "Keep practicing!",
      personalNote: "Focus on the feedback to improve your writing skills.",
    },
  });

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

  const getScoreColor = (score) => {
    if (score >= 90) return "from-emerald-500 to-green-500";
    if (score >= 80) return "from-blue-500 to-cyan-500";
    if (score >= 70) return "from-amber-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: "bg-red-500/20 text-red-300 border-red-500/30",
      moderate: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      minor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      severe: "bg-red-500/20 text-red-300 border-red-500/30",
    };
    return colors[severity] || colors.minor;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleDirectExport = async () => {
    if (!essay) return;

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

  const QualityMeter = ({ score, label, color }) => (
    <div className="flex items-center justify-between py-3">
      <span className="text-gray-300 font-medium">{label}</span>
      <div className="flex items-center gap-3">
        <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${score * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        <span className="text-white font-bold w-10 text-right">
          {(score * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );

  const OverviewTab = () => {
    if (!essay) return null;

    return (
      <div className="space-y-6">
        {/* Score Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Overall Assessment
              </h2>
              <p className="text-gray-400">Comprehensive writing analysis</p>
            </div>
            <motion.div
              className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getScoreColor(
                essay.grading.finalScore
              )} text-white font-bold text-lg`}
              whileHover={{ scale: 1.05 }}
            >
              {essay.grading.finalScore} / 100
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <QualityMeter
                score={essay.grading.qualityScores.grammar}
                label="Grammar"
                color="from-blue-500 to-cyan-500"
              />
              <QualityMeter
                score={essay.grading.qualityScores.content}
                label="Content"
                color="from-purple-500 to-pink-500"
              />
              <QualityMeter
                score={essay.grading.qualityScores.organization}
                label="Organization"
                color="from-emerald-500 to-teal-500"
              />
            </div>
            <div className="space-y-2">
              <QualityMeter
                score={essay.grading.qualityScores.style}
                label="Style"
                color="from-amber-500 to-orange-500"
              />
              <QualityMeter
                score={essay.grading.qualityScores.mechanics}
                label="Mechanics"
                color="from-rose-500 to-red-500"
              />
              <div className="flex items-center justify-between py-3">
                <span className="text-gray-300 font-medium">Confidence</span>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-white font-bold">
                    {(essay.grading.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl p-6 border border-teal-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Layout className="w-6 h-6 text-teal-400" />
            <h3 className="text-xl font-bold text-teal-300">Essay Structure</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
              <p className="text-teal-300 text-sm mb-2">Sections</p>
              <p className="text-2xl font-bold text-white">
                {essay.feedback.structureInfo?.sectionCount || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <p className="text-cyan-300 text-sm mb-2">Paragraphs</p>
              <p className="text-2xl font-bold text-white">
                {essay.feedback.structureInfo?.paragraphCount || 0}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <p className="text-blue-300 text-sm mb-2">Vocabulary Diversity</p>
              <p className="text-2xl font-bold text-white">
                {essay.feedback.analysisMetadata?.vocabularyDiversity || 0}%
              </p>
            </div>
          </div>

          {essay.feedback.structureInfo?.sections && (
            <div className="space-y-2">
              <h4 className="font-semibold text-teal-300 text-sm">
                Essay Sections:
              </h4>
              <div className="flex flex-wrap gap-2">
                {essay.feedback.structureInfo.sections.map((section, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm border border-teal-500/30"
                  >
                    {section}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-amber-400" />
            <h3 className="text-xl font-bold text-amber-300">Error Summary</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-300">Grammar Errors</span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-bold">
                  {essay.grading.validatedErrors?.grammar || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-300">Spelling Errors</span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-bold">
                  {essay.grading.validatedErrors?.spelling || 0}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-300">Words Analyzed</span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-bold">
                  {essay.feedback.analysisMetadata?.wordsAnalyzed || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-amber-300">Sentences</span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-bold">
                  {essay.feedback.analysisMetadata?.sentencesAnalyzed || 0}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/30 backdrop-blur-md"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Award className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Assessment Summary
              </h3>
              <p className="text-blue-300">Key insights and next steps</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
              <p className="text-lg text-blue-300 font-semibold mb-3">
                {essay.feedback.summary.overallComment}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {essay.feedback.summary.motivationalMessage}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/30 rounded-xl p-6 border border-emerald-500/20">
                <h4 className="font-bold text-emerald-400 text-lg mb-4 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {(essay.feedback.contentFeedback?.strengths || []).map(
                    (item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    )
                  )}
                  {(essay.feedback.organizationFeedback?.positives || []).map(
                    (item, idx) => (
                      <motion.li
                        key={`positive-${idx}`}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay:
                            (idx +
                              (essay.feedback.contentFeedback?.strengths
                                ?.length || 0)) *
                            0.1,
                        }}
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-6 border border-amber-500/20">
                <h4 className="font-bold text-amber-400 text-lg mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Next Steps
                </h4>
                <ul className="space-y-2">
                  {(essay.feedback.summary?.nextSteps || []).map(
                    (item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-gray-300"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="bg-amber-500/20 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span>{item}</span>
                      </motion.li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {essay.feedback.nextStepRecommendations &&
          essay.feedback.nextStepRecommendations.length > 0 && (
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-400" />
                <h3 className="text-xl font-bold text-purple-300">
                  Recommended Next Steps
                </h3>
              </div>

              <div className="space-y-4">
                {essay.feedback.nextStepRecommendations.map((rec, idx) => (
                  <motion.div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      rec.priority === "high"
                        ? "bg-red-500/10 border-red-500/20"
                        : "bg-purple-500/10 border-purple-500/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          rec.priority === "high"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`font-semibold ${
                              rec.priority === "high"
                                ? "text-red-300"
                                : "text-purple-300"
                            }`}
                          >
                            {rec.recommendation}
                          </span>
                          {rec.priority === "high" && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-bold">
                              High Priority
                            </span>
                          )}
                        </div>
                        {rec.resources && rec.resources.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {rec.resources.map((resource, resIdx) => (
                              <span
                                key={resIdx}
                                className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs"
                              >
                                {resource}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
      </div>
    );
  };

  const GrammarTab = () => {
    const grammarErrors = getGrammarErrors();

    return (
      <div className="space-y-6">
        {grammarErrors.length === 0 ? (
          <motion.div
            variants={cardVariants}
            className="flex items-center gap-4 p-6 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30"
          >
            <motion.div
              className="bg-emerald-500/20 p-3 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div>
              <p className="text-emerald-300 font-bold text-lg">
                Excellent Grammar!
              </p>
              <p className="text-emerald-400 text-sm">
                No grammatical errors detected.
              </p>
            </div>

            {essay?.feedback?.grammarFeedbackMessage && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-200 text-sm">
                  {essay.feedback.grammarFeedbackMessage}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          grammarErrors.map((error, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                    error.severity
                  )}`}
                >
                  {error.severity}
                </span>
                <span className="text-gray-400 text-sm">
                  Sentence #{error.sentenceNumber}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 border-orange-500/20 text-xs font-bold border text-orange-400">
                  Type: {snakeToTitleCase(error?.type || "grammar")}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Original
                    </span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <p className="text-gray-200 italic">
                      "{error?.sentence || error?.original}"
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Correction
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-300 font-medium">
                      "{error.correction}"
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <ExplanationRenderer explanation={error.explanation} />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  const SpellingTab = () => {
    const spellingErrors = getSpellingErrors();
    const ocrSpellingCorrections = essay?.ocrCorrections?.spelling || [];
    const hasSpellingErrors = spellingErrors.length > 0;
    const hasOcrCorrections = ocrSpellingCorrections.length > 0;

    return (
      <div className="space-y-6">
        {/* Main Spelling Errors Section */}
        {!hasSpellingErrors && !hasOcrCorrections ? (
          <motion.div
            // variants={cardVariants}
            className="flex items-center gap-4 p-6 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30"
          >
            <motion.div
              className="bg-emerald-500/20 p-3 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div>
              <p className="text-emerald-300 font-bold text-lg">
                Perfect Spelling!
              </p>
              <p className="text-emerald-400 text-sm">
                No spelling errors detected in your writing.
              </p>
            </div>

            {essay?.feedback?.spellingFeedbackMessage && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-200 text-sm">
                  {essay.feedback.spellingFeedbackMessage}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {/* AI-Detected Spelling Errors */}
            {hasSpellingErrors && (
              <div>
                <motion.div
                  // variants={itemVariants}
                  className="flex items-center gap-3 mb-6"
                >
                  <Type className="w-6 h-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-blue-300">
                    AI-Detected Spelling Errors
                  </h3>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-500/30">
                    {spellingErrors.length} found
                  </span>
                </motion.div>

                <div className="space-y-6">
                  {spellingErrors.map((error, idx) => (
                    <motion.div
                      key={`spelling-${idx}`}
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                            error.severity || "moderate"
                          )}`}
                        >
                          {error.severity || "moderate"}
                        </span>
                        {error.position && (
                          <span className="text-gray-400 text-sm">
                            Position: {error.position.start}-
                            {error.position.end}
                          </span>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="text-sm font-semibold text-gray-300">
                              Misspelled Word
                            </span>
                          </div>
                          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <p className="text-gray-200">
                              <span className="text-red-400 font-bold">
                                {error.word || error.original}
                              </span>
                              {error.context && (
                                <>
                                  {" in context: "}
                                  <span className="italic">
                                    "{error.context}"
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-semibold text-gray-300">
                              Correction
                            </span>
                          </div>
                          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                            <p className="text-emerald-300 font-medium">
                              Should be: <strong>{error.correction}</strong>
                            </p>
                            {error.suggestions &&
                              error.suggestions.length > 0 && (
                                <p className="text-emerald-200 text-sm mt-1">
                                  Suggestions: {error.suggestions.join(", ")}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* OCR Spelling Corrections Section */}
            {hasOcrCorrections && (
              <motion.div variants={itemVariants} className="mt-8">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-purple-300">
                    OCR Spelling Corrections
                  </h3>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-bold border border-purple-500/30">
                    {ocrSpellingCorrections.length} corrections
                  </span>
                </div>

                <motion.div
                  variants={cardVariants}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30 mb-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Lightbulb className="w-5 h-5 text-purple-400" />
                    <div>
                      <h4 className="font-semibold text-purple-300 text-lg">
                        About OCR Corrections
                      </h4>
                      <p className="text-purple-200 text-sm">
                        These corrections were made during text recognition from
                        your handwritten essay. The system automatically fixed
                        spelling issues found during the scanning process.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  {ocrSpellingCorrections.map((correction, idx) => (
                    <motion.div
                      key={`ocr-${idx}`}
                      variants={cardVariants}
                      whileHover="hover"
                      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-purple-500/20 border-purple-500/20 text-xs font-bold border text-purple-400">
                            OCR Correction
                          </span>
                          {correction.position && (
                            <span className="text-gray-400 text-sm">
                              Position: {correction.position.start}-
                              {correction.position.end}
                            </span>
                          )}
                          {correction.confidence && (
                            <span className="px-2 py-1 rounded-full bg-blue-500/20 border-blue-500/20 text-xs font-bold border text-blue-400">
                              Confidence:{" "}
                              {(correction.confidence * 100).toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Original Word */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span className="text-sm font-semibold text-gray-300">
                                Original (OCR)
                              </span>
                            </div>
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                              <p className="text-gray-200">
                                <span className="text-red-400 font-bold">
                                  {correction.original}
                                </span>
                                {correction.context && (
                                  <>
                                    {" in context: "}
                                    <span className="italic">
                                      "{correction.context}"
                                    </span>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Corrected Word */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span className="text-sm font-semibold text-gray-300">
                                Corrected
                              </span>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                              <p className="text-emerald-300 font-medium">
                                <strong>{correction.correction}</strong>
                              </p>
                              {correction.suggestions &&
                                correction.suggestions.length > 0 && (
                                  <p className="text-emerald-200 text-sm mt-1">
                                    Suggestions:{" "}
                                    {correction.suggestions.join(", ")}
                                  </p>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* Confidence Indicator */}
                        {correction.confidence && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">
                                Confidence Level
                              </span>
                              <span className="text-blue-400 font-medium">
                                {(correction.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                className={`h-full rounded-full ${
                                  correction.confidence > 0.8
                                    ? "bg-emerald-500"
                                    : correction.confidence > 0.6
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${correction.confidence * 100}%`,
                                }}
                                transition={{ duration: 1, delay: 0.2 }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* OCR Summary */}
                {essay?.ocrCorrections?.totalCorrectionsMade && (
                  <motion.div
                    variants={cardVariants}
                    className="mt-6 bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">
                        Total OCR corrections made during text processing:
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-bold">
                        {essay.ocrCorrections.totalCorrectionsMade}
                      </span>
                    </div>
                    {essay.ocrConfidence && (
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-gray-300 text-sm">
                          Overall OCR Confidence:
                        </span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold">
                          {essay.ocrConfidence.toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* Spelling Feedback Message */}
        {essay?.feedback?.spellingFeedbackMessage && (
          <motion.div
            variants={cardVariants}
            className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-blue-400" />
              <p className="text-blue-200 text-sm">
                {essay.feedback.spellingFeedbackMessage}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const StyleTab = () => {
    const styleIssues = getStyleIssues();

    return (
      <div className="space-y-6">
        {styleIssues.length === 0 ? (
          <motion.div
            variants={cardVariants}
            className="flex items-center gap-4 p-6 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30"
          >
            <motion.div
              className="bg-emerald-500/20 p-3 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </motion.div>
            <div>
              <p className="text-emerald-300 font-bold text-lg">
                Great Writing Style!
              </p>
              <p className="text-emerald-400 text-sm">
                No style issues detected.
              </p>
            </div>
          </motion.div>
        ) : (
          styleIssues.map((issue, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-semibold text-purple-300">
                  {issue.type || "Style Issue"}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Issue Found
                    </span>
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-gray-200">
                      <span className="text-amber-400 font-bold">
                        "{issue.text}"
                      </span>
                      {issue.context && (
                        <>
                          {" in context: "}
                          <span className="italic">"{issue.context}"</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Suggestion
                    </span>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-blue-300 font-medium">
                      {issue.suggestion}
                    </p>
                    {issue.explanation && (
                      <p className="text-blue-200 text-sm mt-1">
                        {issue.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  const EssayTextTab = () => {
    if (!essay) return null;

    return (
      <motion.div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your Essay</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(essay.originalText)}
              className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copiedText === essay.originalText ? "Copied!" : "Copy Text"}
            </motion.button>
          </div>
        </div>

        <div className="p-6">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {essay.originalText}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-600/50 flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{essay.originalText.split(/\s+/).length} words</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {Math.ceil(essay.originalText.split(/\s+/).length / 200)} min
                read
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(essay.submittedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const VocabularyTab = () => {
    const vocabularyEnhancements = getVocabularyEnhancements();

    return (
      <div className="space-y-6">
        {vocabularyEnhancements.length === 0 ? (
          <motion.div className="flex items-center gap-4 p-6 bg-blue-500/10 rounded-2xl border-2 border-blue-500/30">
            <motion.div
              className="bg-blue-500/20 p-3 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </motion.div>
            <div>
              <p className="text-blue-300 font-bold text-lg">
                Excellent Vocabulary!
              </p>
              <p className="text-blue-400 text-sm">
                No vocabulary enhancements needed.
              </p>
            </div>
          </motion.div>
        ) : (
          vocabularyEnhancements.map((vocab, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span className="text-lg font-semibold text-indigo-300">
                  Vocabulary Enhancement
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Word to Improve
                    </span>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
                    <p className="text-orange-300 font-bold text-lg">
                      {vocab.original}
                    </p>
                    <p className="text-orange-200 text-sm mt-1">
                      {vocab.reason}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-gray-300">
                      Better Alternatives
                    </span>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    <div className="flex flex-wrap gap-2">
                      {(vocab.alternatives || []).map((alt, altIdx) => (
                        <motion.span
                          key={altIdx}
                          className="px-3 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 font-medium"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {alt}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  const StructureTab = () => {
    if (!essay) return null;

    return (
      <div className="space-y-6">
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <Layout className="w-6 h-6 text-teal-400" />
            <h3 className="text-xl font-bold text-teal-300">
              Sentence Structure Analysis
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-teal-500/10 rounded-xl border border-teal-500/20">
              <p className="text-teal-300 text-sm mb-2">Avg Sentence Length</p>
              <p className="text-2xl font-bold text-white">
                {essay.feedback.sentenceStructure?.metrics?.avgSentenceLength ||
                  "N/A"}{" "}
                words
              </p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <p className="text-purple-300 text-sm mb-2">Sentence Variety</p>
              <p className="text-2xl font-bold text-white">
                {essay.feedback.sentenceStructure?.metrics?.sentenceVariety ||
                  "Good"}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <p className="text-blue-300 text-sm mb-2">Avg Paragraph Length</p>
              <p className="text-2xl font-bold text-white">
                {essay.feedback.sentenceStructure?.metrics
                  ?.avgParagraphLength || "N/A"}{" "}
                words
              </p>
            </div>
          </div>

          {(essay.feedback.sentenceStructure?.suggestions || []).length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Structure Suggestions
              </h4>
              <div className="space-y-2">
                {essay.feedback.sentenceStructure.suggestions.map(
                  (suggestion, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="bg-amber-500/20 text-amber-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-amber-200 text-sm">
                        {suggestion}
                      </span>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Organization Feedback */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-purple-300">
              Organization Feedback
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-white">
                {essay.feedback.organizationFeedback?.structure ||
                  "Good overall structure"}
              </span>
              {essay.feedback.organizationFeedback?.organizationScore && (
                <div className="flex items-center gap-2">
                  <div className="w-24 h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${essay.feedback.organizationFeedback.organizationScore}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-purple-400 font-bold">
                    {essay.feedback.organizationFeedback.organizationScore}%
                  </span>
                </div>
              )}
            </div>

            {(essay.feedback.organizationFeedback?.positives || []).length >
              0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-300 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Strengths
                </h4>
                <ul className="space-y-1">
                  {essay.feedback.organizationFeedback.positives.map(
                    (positive, idx) => (
                      <li
                        key={idx}
                        className="text-emerald-200 text-sm flex items-start gap-2"
                      >
                        <span className="text-emerald-400">✓</span>
                        <span>{positive}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {(essay.feedback.organizationFeedback?.suggestions || []).length >
              0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Improvement Suggestions
                </h4>
                <ul className="space-y-2">
                  {essay.feedback.organizationFeedback.suggestions.map(
                    (suggestion, idx) => (
                      <li
                        key={idx}
                        className="text-amber-200 text-sm flex items-start gap-2"
                      >
                        <span className="text-amber-400">→</span>
                        <span>{suggestion}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </motion.div>

        {/* Content Feedback */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-bold text-blue-300">
              Content Feedback
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-emerald-300 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                What You Did Well
              </h4>
              {(essay.feedback.contentFeedback?.strengths || []).length > 0 ? (
                <ul className="space-y-2">
                  {essay.feedback.contentFeedback.strengths.map(
                    (strength, idx) => (
                      <li
                        key={idx}
                        className="text-emerald-200 text-sm flex items-start gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No specific strengths identified
                </p>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-amber-300 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Areas to Improve
              </h4>
              {(essay.feedback.contentFeedback?.improvements || []).length >
              0 ? (
                <ul className="space-y-2">
                  {essay.feedback.contentFeedback.improvements.map(
                    (improvement, idx) => (
                      <li
                        key={idx}
                        className="text-amber-200 text-sm flex items-start gap-2"
                      >
                        <div className="bg-amber-500/20 text-amber-400 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <span>{improvement}</span>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No specific improvements needed
                </p>
              )}
            </div>
          </div>

          {/* Content Examples */}
          {(essay.feedback.contentFeedback?.examples || []).length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-blue-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Examples & Tips
              </h4>
              <div className="space-y-3">
                {essay.feedback.contentFeedback.examples.map((example, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <p className="text-blue-300 font-semibold text-sm mb-2">
                      {example.type?.replace(/_/g, " ").toUpperCase() ||
                        "EXAMPLE"}
                    </p>
                    <p className="text-blue-200 text-sm mb-2">{example.text}</p>
                    <p className="text-blue-300 text-xs">
                      {example.explanation}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    );
  };

  const ExamplesTab = () => {
    const beforeAfterExamples = getBeforeAfterExamples();

    return (
      <div className="space-y-6">
        {beforeAfterExamples.length === 0 ? (
          <motion.div
            variants={cardVariants}
            className="flex items-center gap-4 p-6 bg-gray-700/50 rounded-2xl border-2 border-gray-600/50"
          >
            <motion.div
              className="bg-gray-600/50 p-3 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FileText className="w-6 h-6 text-gray-400" />
            </motion.div>
            <div>
              <p className="text-gray-300 font-bold text-lg">
                No Examples Available
              </p>
              <p className="text-gray-400 text-sm">
                Before/after examples will be shown here when available.
              </p>
            </div>
          </motion.div>
        ) : (
          beforeAfterExamples.map((example, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${getSeverityColor(
                    example.severity
                  )}`}
                >
                  {example.type?.toUpperCase() || "EXAMPLE"}
                </span>
                <span className="text-gray-400 text-sm capitalize">
                  {example.severity} priority
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-semibold text-gray-300">
                        Before
                      </span>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                      <p className="text-gray-200 italic leading-relaxed">
                        "{example.before}"
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-gray-300">
                        After
                      </span>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                      <p className="text-emerald-300 font-medium leading-relaxed">
                        "{example.after}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* {example.word_changed && (
                  <div className="flex items-center justify-center gap-4 p-4 bg-gray-700/50 rounded-lg">
                    <span className="text-red-400 line-through font-bold">
                      {example.word_changed.from}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <span className="text-emerald-400 font-bold">
                      {example.word_changed.to}
                    </span>
                  </div>
                )} */}

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-blue-300 mb-1">
                        Explanation
                      </p>
                      {/* <p className="text-blue-200 text-sm">
                        {example.explanation}
                      </p>
                      {example.example && (
                        <p className="text-blue-300 text-xs mt-2 italic">
                          Example: {example.example}
                        </p>
                      )} */}
                      <ExplanationRenderer explanation={example.explanation} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  const InsightsTab = () => {
    const insights = getPersonalizedInsights();

    return (
      <div className="space-y-6">
        {/* Progress Comparison */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-purple-300">
              Progress Tracking
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <p className="text-purple-300 text-sm mb-2">Current Score</p>
              <p className="text-2xl font-bold text-white">
                {insights.progressComparison.currentScore}
              </p>
            </div>
            <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <p className="text-blue-300 text-sm mb-2">Average Score</p>
              <p className="text-2xl font-bold text-white">
                {insights.progressComparison.averageScore}
              </p>
            </div>
            <div className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
              <p className="text-amber-300 text-sm mb-2">Improvement</p>
              <p className="text-2xl font-bold text-white">
                {insights.progressComparison.improvement > 0 ? "+" : ""}
                {insights.progressComparison.improvement}%
              </p>
            </div>
            <div className="text-center p-4 bg-gray-700/50 rounded-xl border border-gray-600">
              <p className="text-gray-300 text-sm mb-2">Trend</p>
              <p className="text-2xl font-bold text-white capitalize">
                {insights.progressComparison.trend}
              </p>
            </div>
          </div>

          {insights.progressComparison.trend && (
            <motion.div
              className={`mt-4 p-4 rounded-xl border ${
                insights.progressComparison.trend === "improving"
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : insights.progressComparison.trend === "declining"
                  ? "bg-red-500/10 border-red-500/20"
                  : "bg-amber-500/10 border-amber-500/20"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p
                className={`font-semibold flex items-center gap-2 ${
                  insights.progressComparison.trend === "improving"
                    ? "text-emerald-300"
                    : insights.progressComparison.trend === "declining"
                    ? "text-red-300"
                    : "text-amber-300"
                }`}
              >
                {insights.progressComparison.trend === "improving" &&
                  "📈 Trending Up!"}
                {insights.progressComparison.trend === "declining" &&
                  "📉 Needs Attention"}
                {insights.progressComparison.trend === "stable" &&
                  "📊 Steady Progress"}
              </p>
              <p className="text-gray-300 text-sm mt-1">
                {insights.progressComparison.trend === "improving" &&
                  "Great work! Your scores are improving."}
                {insights.progressComparison.trend === "declining" &&
                  "Focus on the feedback to improve your next essay."}
                {insights.progressComparison.trend === "stable" &&
                  "Consistent performance - keep it up!"}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Persistent Challenges */}
        {insights.persistentChallenges.length > 0 && (
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-amber-300">Focus Areas</h3>
            </div>

            <div className="space-y-4">
              {insights.persistentChallenges.map((challenge, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
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
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-300">
              Personalized Feedback
            </h3>
          </div>

          <div className="space-y-4">
            <p className="text-emerald-300 text-lg font-semibold">
              {insights.motivationalContext.overallComment}
            </p>
            <p className="text-gray-300 leading-relaxed">
              {insights.motivationalContext.motivationalMessage}
            </p>
            {insights.motivationalContext.personalNote && (
              <motion.div
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-emerald-200 text-sm italic">
                  {insights.motivationalContext.personalNote}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    );
  };

  const CorrectedEssayTab = () => {
    if (!essay?.fullyCorrectedText) return null;

    return (
      <motion.div className="space-y-6">
        {/* Header Card */}
        <motion.div
          // variants={cardVariants}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/30"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-emerald-300">
                Fully Corrected Essay
              </h3>
              <p className="text-emerald-400">
                Your essay with all grammar, spelling, and style corrections
                applied
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-emerald-300">
              <Edit3 className="w-4 h-4" />
              <span>Grammar corrections applied</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <Type className="w-4 h-4" />
              <span>Spelling errors fixed</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-300">
              <Sparkles className="w-4 h-4" />
              <span>Style improvements included</span>
            </div>
          </div>
        </motion.div>

        {/* Corrected Essay Text */}
        <motion.div
          // variants={cardVariants}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden"
        >
          <div className="bg-gray-700/50 px-6 py-4 border-b border-gray-600/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Corrected Version
                </h3>
                <p className="text-gray-400 text-sm">
                  Compare with your original essay to see all improvements
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(essay.fullyCorrectedText)}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg text-sm hover:bg-emerald-500/30 transition-colors border border-emerald-500/30"
              >
                <Copy className="w-4 h-4" />
                {copiedText === essay.fullyCorrectedText
                  ? "Copied!"
                  : "Copy Corrected Text"}
              </motion.button>
            </div>
          </div>

          <div className="p-6">
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-200 leading-relaxed whitespace-pre-wrap bg-gray-900/30 rounded-xl p-6 border border-gray-600/30">
                {essay.fullyCorrectedText}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-600/50 flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>
                  {essay.fullyCorrectedText.split(/\s+/).length} words
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {Math.ceil(
                    essay.fullyCorrectedText.split(/\s+/).length / 200
                  )}{" "}
                  min read
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>All corrections applied</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comparison Notes */}
        <motion.div
          // variants={cardVariants}
          className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-semibold text-blue-300">
              How to Use This Corrected Version
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-blue-200">
                  <strong>Compare side by side</strong> with your original essay
                  to understand the changes
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-blue-200">
                  <strong>Learn from corrections</strong> by studying the
                  grammar and style improvements
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-blue-200">
                  <strong>Practice writing</strong> by rewriting your essay
                  incorporating these corrections
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-500/20 text-blue-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-blue-200">
                  <strong>Use as reference</strong> for future essays to avoid
                  similar mistakes
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Improvements Summary */}
        {essay.feedback && (
          <motion.div
            // variants={cardVariants}
            className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-semibold text-amber-300">
                Key Improvements Made
              </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Grammar Improvements */}
              {getGrammarErrors().length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold">
                      Grammar Fixes
                    </span>
                  </div>
                  <p className="text-amber-200 text-sm">
                    {getGrammarErrors().length} grammatical errors corrected,
                    including subject-verb agreement, article usage, and
                    sentence structure improvements.
                  </p>
                </div>
              )}

              {/* Spelling Improvements */}
              {(getSpellingErrors().length > 0 ||
                essay?.ocrCorrections?.spelling?.length > 0) && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Type className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold">
                      Spelling Corrections
                    </span>
                  </div>
                  <p className="text-amber-200 text-sm">
                    {getSpellingErrors().length +
                      (essay?.ocrCorrections?.spelling?.length || 0)}
                    spelling errors fixed through AI detection and OCR
                    correction.
                  </p>
                </div>
              )}

              {/* Style Improvements */}
              {getStyleIssues().length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold">
                      Style Enhancements
                    </span>
                  </div>
                  <p className="text-amber-200 text-sm">
                    {getStyleIssues().length} style improvements including
                    better word choice, sentence variety, and formal academic
                    tone.
                  </p>
                </div>
              )}

              {/* Structure Improvements */}
              {essay.feedback.organizationFeedback?.suggestions?.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-300 font-semibold">
                      Structure Improvements
                    </span>
                  </div>
                  <p className="text-amber-200 text-sm">
                    Enhanced essay structure with better paragraph organization
                    and improved flow between ideas.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };
  console.log("essay.achievements", essay?.achievements)

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "essay",
      label: "Essay Text",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "corrected",
      label: "Corrected Essay",
      icon: <CheckCircle className="w-4 h-4" />,
    },
    ...(essay?.plagiarism
      ? [
          {
            id: "plagiarism",
            label: "Originality",
            icon: <Shield className="w-4 h-4" />,
            count: essay?.plagiarism?.overallSimilarity > 0 ? 1 : 0,
          },
        ]
      : []),
    // Conditionally include achievements
    ...(essay?.achievementsUnlocked
      ? [
          {
            id: "achievements",
            label: "Achievements",
            icon: <Award className="w-4 h-4" />,
            count: essay.achievementsUnlocked?.length || 0,
          },
        ]
      : []),
    {
      id: "grammar",
      label: "Grammar",
      icon: <Edit3 className="w-4 h-4" />,
      count: getGrammarErrors().length,
    },
    {
      id: "spelling",
      label: "Spelling",
      icon: <Type className="w-4 h-4" />,
      count:
        getSpellingErrors().length || essay?.ocrCorrections?.spelling?.length,
    },
    {
      id: "style",
      label: "Style",
      icon: <Sparkles className="w-4 h-4" />,
      count: getStyleIssues().length,
    },
    {
      id: "vocabulary",
      label: "Vocabulary",
      icon: <BookOpen className="w-4 h-4" />,
      count: getVocabularyEnhancements().length,
    },
    {
      id: "structure",
      label: "Structure",
      icon: <Layout className="w-4 h-4" />,
    },
    {
      id: "examples",
      label: "Examples",
      icon: <ArrowRight className="w-4 h-4" />,
      count: getBeforeAfterExamples().length,
    },
    {
      id: "insights",
      label: "Insights",
      icon: <Brain className="w-4 h-4" />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading essay details...</p>
        </div>
      </div>
    );
  }

  if (error || !essay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Essay Not Found</h2>
          <p className="text-gray-400 mb-4">
            {error || "The essay you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div>
        {/* Header */}
        <motion.header
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => navigate(-1)}
                  whileHover={{ scale: 1.05, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </motion.button>

                <div className="flex items-center gap-3">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <FileText className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-xl font-bold text-white line-clamp-1">
                      {essay.title || "Untitled Essay"}
                    </h1>
                    <p className="text-gray-400 text-sm">
                      Essay Analysis Report
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Direct Export Button */}
                <motion.button
                  onClick={handleDirectExport}
                  disabled={isExporting}
                  className="relative flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Exporting... {exportProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Export PDF
                    </>
                  )}

                  {/* Progress bar */}
                  {isExporting && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-blue-300"
                      initial={{ width: "0%" }}
                      animate={{ width: `${exportProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>

                {/* Options Button */}
                <motion.button
                  onClick={handleOptionsModal}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors border border-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4" />
                  Options
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Quick Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                {
                  icon: Star,
                  label: "Score",
                  value: essay?.grading?.finalScore,
                  color: "from-amber-500 to-orange-500",
                },
                {
                  icon: GraduationCap,
                  label: "Grade",
                  value: essay?.grading?.grade,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: FileText,
                  label: "Words",
                  value: essay?.originalText?.split(/\s+/).length,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: TrendingUp,
                  label: "Level",
                  value: essay?.feedback?.studentLevel,
                  color: "from-emerald-500 to-teal-500",
                },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white shadow-lg`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-sm font-medium opacity-90">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Tabs Navigation */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-4 sticky top-6">
                  <nav className="space-y-1">
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : "text-gray-400 hover:text-gray-300 hover:bg-gray-700/50"
                        }`}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tab.icon}
                        <span className="flex-1 text-left">{tab.label}</span>
                        {tab.count > 0 && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              activeTab === tab.id
                                ? "bg-blue-500 text-white"
                                : "bg-gray-700 text-gray-300"
                            }`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </motion.div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="lg:col-span-3"
              >
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "essay" && <EssayTextTab />}
                {activeTab === "corrected" && <CorrectedEssayTab />}
                {activeTab === "plagiarism" && (
                  <PlagiarismTab plagiarism={essay?.plagiarism} />
                )}
                {activeTab === "achievements" && (
                  <AchievementsTab
                    achievementsUnlocked={essay?.achievementsUnlocked}
                    achievements={essay?.achievements}
                    studentLevel={essay?.feedback?.studentLevel || "beginner"}
                  />
                )}
                {activeTab === "grammar" && <GrammarTab />}
                {activeTab === "spelling" && <SpellingTab />}
                {activeTab === "style" && <StyleTab />}
                {activeTab === "vocabulary" && <VocabularyTab />}
                {activeTab === "structure" && <StructureTab />}
                {activeTab === "examples" && <ExamplesTab />}
                {activeTab === "insights" && <InsightsTab />}

                {activeTab !== "overview" &&
                  activeTab !== "essay" &&
                  activeTab !== "corrected" &&
                  activeTab !== "grammar" &&
                  activeTab !== "spelling" &&
                  activeTab !== "style" && (
                    <motion.div
                      variants={cardVariants}
                      className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-center"
                    >
                      <div className="text-gray-400 mb-4">
                        <FileText className="w-16 h-16 mx-auto opacity-50" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        Section Under Development
                      </h3>
                      <p className="text-gray-400">
                        The {tabs.find((t) => t.id === activeTab)?.label}{" "}
                        section is being enhanced with more detailed analysis.
                      </p>
                    </motion.div>
                  )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-4 mt-6 p-6 bg-gray-800/50 rounded-2xl border border-gray-700/50">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              Export Feedback
            </h3>
            <p className="text-gray-400 text-sm">
              Download a comprehensive PDF report of your essay feedback
            </p>
          </div>
          <div className="flex gap-3">
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
          </div>
        </div>
      </div>

      <PdfPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        essayData={essay}
        studentData={student}
      />
    </div>
  );
};

export default EssayDetail;
