// import React, { useState, useEffect, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Award,
//   BookOpen,
//   TrendingUp,
//   Target,
//   Star,
//   Clock,
//   Calendar,
//   FileText,
//   Brain,
//   PieChart,
//   Zap,
//   ChevronRight,
//   Plus,
//   AlertCircle,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Download,
//   BarChart3,
//   Activity,
//   Trophy,
//   Flame,
//   ArrowUp,
//   ArrowDown,
//   Medal,
//   Crown,
//   Rocket,
//   Sparkles,
//   Target as TargetIcon,
//   TrendingDown,
//   Users,
//   Bookmark,
//   Lightbulb,
//   Clock as ClockIcon,
//   BarChart as BarChartIcon,
//   LineChart,
//   Calendar as CalendarIcon,
// } from "lucide-react";
// import WritingTipsModal from "../modal/WritingTipsModal";
// import AnalyticsModal from "../modal/AnalyticsModal";
// import { useUser } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { dashboardService } from "../services/dashboardService";
// import essayService from "../services/essayServices";

// const LIMIT = 10;

// const StudentDashboard = () => {
//   const { user } = useUser();
//   const studentId = user?._id;
//   const navigate = useNavigate();
//   const [student, setStudent] = useState(null);
//   const [essays, setEssays] = useState([]);
//   const [progress, setProgress] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [achievements, setAchievements] = useState([
//   //   {
//   //     id: "first_essay",
//   //     icon: "🎯",
//   //     title: "First Steps",
//   //     description: "Submit your first essay",
//   //     unlocked: true,
//   //     progress: 1,
//   //     date: new Date().toISOString(),
//   //   },
//   //   {
//   //     id: "streak_5",
//   //     icon: "🔥",
//   //     title: "On Fire!",
//   //     description: "Submit essays 5 days in a row",
//   //     unlocked: false,
//   //     progress: 0.6,
//   //   },
//   //   {
//   //     id: "perfect_grammar",
//   //     icon: "✨",
//   //     title: "Grammar Master",
//   //     description: "Get an essay with no grammar errors",
//   //     unlocked: false,
//   //     progress: 0.8,
//   //   },
//   //   {
//   //     id: "high_score",
//   //     icon: "⭐",
//   //     title: "Excellence",
//   //     description: "Score 90+ on an essay",
//   //     unlocked: false,
//   //     progress: 0.75,
//   //   },
//   //   {
//   //     id: "word_count",
//   //     icon: "📝",
//   //     title: "Prolific Writer",
//   //     description: "Write over 1000 words in one essay",
//   //     unlocked: true,
//   //     progress: 1,
//   //     date: new Date().toISOString(),
//   //   },
//   //   {
//   //     id: "improvement",
//   //     icon: "📈",
//   //     title: "Rising Star",
//   //     description: "Improve your score by 10+ points",
//   //     unlocked: true,
//   //     progress: 1,
//   //     date: new Date().toISOString(),
//   //   },
//   //   {
//   //     id: "consistent",
//   //     icon: "🎪",
//   //     title: "Consistency Champion",
//   //     description: "Maintain 80%+ score for 5 essays",
//   //     unlocked: false,
//   //     progress: 0.4,
//   //   },
//   //   {
//   //     id: "vocabulary",
//   //     icon: "📚",
//   //     title: "Word Wizard",
//   //     description: "Use advanced vocabulary in essays",
//   //     unlocked: false,
//   //     progress: 0.5,
//   //   },
//   // ]);
//   const [showAnalytics, setShowAnalytics] = useState(false);
//   const [showWritingTips, setShowWritingTips] = useState(false);
//   const [achievements, setAchievements] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [user]);

//   const fetchDashboardData = async () => {
//     try {
//        setLoading(true);

//       const progressRes = await dashboardService.getStudentProgress();
//       const essaysRes = await essayService.getStudentEssays(studentId);
//       const achievementsRes = await dashboardService.fetchAchievements();

//       console.log("essaysRes", essaysRes);
//       console.log("progressRes", progressRes);
//       console.log("achievementsRes", achievementsRes.data)

//       setAchievements(achievementsRes.data || []);

//       // Calculate stats from essays
//       const essaysData = essaysRes.data.essays || [];
//       const totalEssays = essaysData.length;
//             const avgEssayLength = totalEssays > 0
//         ? Math.round(essaysData.reduce((sum, essay) =>
//             sum + (essay.originalText?.split(" ").length || 0), 0) / totalEssays
//           )
//         : 0;

//       // Calculate average scores from essays
//       const avgScore = totalEssays > 0
//         ? essaysData.reduce((sum, essay) =>
//             sum + (essay.grading?.finalScore || 0), 0) / totalEssays
//         : 0;

//       // Calculate quality scores average
//       const qualityAverages =
//         essaysData.length > 0
//           ? essaysData.reduce(
//               (acc, essay) => {
//                 const quality = essay.grading.qualityScores;
//                 return {
//                   grammar: acc.grammar + quality.grammar,
//                   content: acc.content + quality.content,
//                   organization: acc.organization + quality.organization,
//                   style: acc.style + quality.style,
//                   mechanics: acc.mechanics + quality.mechanics,
//                 };
//               },
//               {
//                 grammar: 0,
//                 content: 0,
//                 organization: 0,
//                 style: 0,
//                 mechanics: 0,
//               }
//             )
//           : { grammar: 0, content: 0, organization: 0, style: 0, mechanics: 0 };

//       Object.keys(qualityAverages).forEach((key) => {
//         qualityAverages[key] =
//           essaysData.length > 0
//             ? (qualityAverages[key] / essaysData.length) * 100
//             : 0;
//       });

//       // Calculate common issues from essays
//       const commonIssues = calculateCommonIssues(essaysData);

//             // Calculate improvement
//       const scores = essaysData.map(e => e.grading?.finalScore || 0);
//       const recentImprovement = scores.length >= 2 ? scores[scores.length - 1] - scores[scores.length - 2] : 0;

//       // Update student data
//       const updatedStudent = {
//         name: user?.student?.name || user?.name || "Student",
//         level: user?.student?.level || "beginner",
//         stats: {
//           totalEssays,
//           avgEssayLength,
//           essaysThisWeek: essaysData.filter(essay =>
//             new Date(essay.submittedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//           ).length,
//           totalWords: essaysData.reduce((sum, essay) =>
//             sum + (essay.originalText?.split(" ").length || 0), 0
//           ),
//         },
//         performanceMetrics: {
//           avgScore,
//           recentImprovement,
//           ...qualityAverages,
//           recentScores: essaysData.slice(0, 5).map(essay => essay.grading?.finalScore || 0),
//           bestScore: Math.max(...essaysData.map(essay => essay.grading?.finalScore || 0), 0),
//           consistency: calculateConsistency(essaysData),
//         },
//       };

//       setStudent(updatedStudent);
//       setEssays(essaysData);

//     } catch (error) {
//       console.error("Dashboard fetch error:", error);
//       setLoading(false);
//     }
//   }

//   // const fetchDashboardData = async () => {
//   //   try {
//   //     setLoading(true);

//   //     const essaysRes = await axios.get(`/api/essays/student/${studentId}`);
//   //     const progressRes = await axios.get(
//   //       `/api/students/${studentId}/progress`
//   //     );

//   //     // Calculate stats from essays
//   //     const essaysData = essaysRes.data.essays || [];
//   //     const totalEssays = essaysData.length;
//   //     const avgEssayLength =
//   //       essaysData.length > 0
//   //         ? Math.round(
//   //             essaysData.reduce(
//   //               (sum, essay) =>
//   //                 sum + (essay.originalText?.split(" ").length || 0),
//   //               0
//   //             ) / essaysData.length
//   //           )
//   //         : 0;

//   //     // Calculate average scores from essays
//   //     const avgScore =
//   //       essaysData.length > 0
//   //         ? essaysData.reduce(
//   //             (sum, essay) => sum + essay.grading.finalScore,
//   //             0
//   //           ) / essaysData.length
//   //         : 0;

//   //     // Calculate quality scores average
//   //     const qualityAverages =
//   //       essaysData.length > 0
//   //         ? essaysData.reduce(
//   //             (acc, essay) => {
//   //               const quality = essay.grading.qualityScores;
//   //               return {
//   //                 grammar: acc.grammar + quality.grammar,
//   //                 content: acc.content + quality.content,
//   //                 organization: acc.organization + quality.organization,
//   //                 style: acc.style + quality.style,
//   //                 mechanics: acc.mechanics + quality.mechanics,
//   //               };
//   //             },
//   //             {
//   //               grammar: 0,
//   //               content: 0,
//   //               organization: 0,
//   //               style: 0,
//   //               mechanics: 0,
//   //             }
//   //           )
//   //         : { grammar: 0, content: 0, organization: 0, style: 0, mechanics: 0 };

//   //     Object.keys(qualityAverages).forEach((key) => {
//   //       qualityAverages[key] =
//   //         essaysData.length > 0
//   //           ? (qualityAverages[key] / essaysData.length) * 100
//   //           : 0;
//   //     });

//   //     // Calculate improvement metrics
//   //     const scoreProgression =
//   //       progressRes.data?.progress?.scoreProgression || [];
//   //     const recentImprovement =
//   //       scoreProgression.length >= 2
//   //         ? scoreProgression[scoreProgression.length - 1].score -
//   //           scoreProgression[scoreProgression.length - 2].score
//   //         : 0;

//   //     // Calculate common issues from essays
//   //     const commonIssues = calculateCommonIssues(essaysData);

//   //     setAchievements((prev) =>
//   //       prev.map((ach) => {
//   //         switch (ach.id) {
//   //           case "first_essay":
//   //             return {
//   //               ...ach,
//   //               unlocked: totalEssays >= 1,
//   //               progress: Math.min(1, totalEssays),
//   //             };
//   //           case "high_score":
//   //             const highScore = Math.max(
//   //               ...essaysData.map((e) => e.grading.finalScore),
//   //               0
//   //             );
//   //             return {
//   //               ...ach,
//   //               unlocked: highScore >= 90,
//   //               progress: Math.min(1, highScore / 90),
//   //             };
//   //           case "word_count":
//   //             const maxWords = Math.max(
//   //               ...essaysData.map(
//   //                 (e) => e.originalText?.split(" ").length || 0
//   //               ),
//   //               0
//   //             );
//   //             return {
//   //               ...ach,
//   //               unlocked: maxWords >= 1000,
//   //               progress: Math.min(1, maxWords / 1000),
//   //             };
//   //           case "improvement":
//   //             return {
//   //               ...ach,
//   //               unlocked: recentImprovement >= 10,
//   //               progress: Math.min(1, Math.max(0, recentImprovement) / 10),
//   //             };
//   //           default:
//   //             return ach;
//   //         }
//   //       })
//   //     );

//   //     // Update student with calculated data
//   //     const updatedStudent = {
//   //       name: "John", // You can get this from your API
//   //       level: progressRes.data?.progress?.currentLevel || "beginner",
//   //       stats: {
//   //         totalEssays,
//   //         avgEssayLength,
//   //         essaysThisWeek: essaysData.filter(
//   //           (essay) =>
//   //             new Date(essay.submittedAt) >
//   //             new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
//   //         ).length,
//   //         totalWords: essaysData.reduce(
//   //           (sum, essay) => sum + (essay.originalText?.split(" ").length || 0),
//   //           0
//   //         ),
//   //       },
//   //       performanceMetrics: {
//   //         avgScore,
//   //         recentImprovement,
//   //         avgGrammarScore: qualityAverages.grammar,
//   //         avgContentScore: qualityAverages.content,
//   //         avgOrganizationScore: qualityAverages.organization,
//   //         avgStyleScore: qualityAverages.style,
//   //         avgMechanicsScore: qualityAverages.mechanics,
//   //         recentScores: essaysData
//   //           .slice(0, 5)
//   //           .map((essay) => essay.grading.finalScore),
//   //         bestScore: Math.max(
//   //           ...essaysData.map((essay) => essay.grading.finalScore)
//   //         ),
//   //         consistency: calculateConsistency(essaysData),
//   //       },
//   //       commonIssues,
//   //       warnings: commonIssues.slice(0, 3).map((issue) => ({
//   //         type: issue.type,
//   //         message: issue.description,
//   //         severity: issue.severity,
//   //       })),
//   //     };

//   //     setStudent(updatedStudent);
//   //     setEssays(essaysData);
//   //     setProgress(progressRes.data.progress);

//   //     setLoading(false);
//   //   } catch (error) {
//   //     console.error("Dashboard fetch error:", error);
//   //     setLoading(false);
//   //   }
//   // };

//   // Helper functions
//   const calculateCommonIssues = (essaysData) => {
//     const issues = {};

//     essaysData.forEach((essay) => {
//       essay.feedback?.grammarErrors?.forEach((error) => {
//         issues[error.type] = (issues[error.type] || 0) + 1;
//       });

//       essay.feedback?.spellingErrors?.forEach((error) => {
//         issues["spelling"] = (issues["spelling"] || 0) + 1;
//       });
//     });

//     return Object.entries(issues)
//       .map(([type, count]) => ({
//         type,
//         count,
//         frequency: count / essaysData.length,
//         severity:
//           count / essaysData.length > 0.7
//             ? "high"
//             : count / essaysData.length > 0.4
//             ? "medium"
//             : "low",
//       }))
//       .sort((a, b) => b.count - a.count)
//       .slice(0, 5)
//       .map((issue) => ({
//         ...issue,
//         description: getIssueDescription(issue.type),
//       }));
//   };

//   const getIssueDescription = (type) => {
//     const descriptions = {
//       subject_verb_agreement: "Subject-verb agreement errors",
//       pronoun_confusion: "Confusion between pronouns",
//       spelling: "Frequent spelling mistakes",
//       word_order: "Incorrect word order",
//       verb_form: "Incorrect verb forms",
//     };
//     return descriptions[type] || `${type.replace(/_/g, " ")} issues`;
//   };

//     const calculateConsistency = (essaysData) => {
//     if (essaysData.length < 2) return 100;
//     const scores = essaysData.map(essay => essay.grading?.finalScore || 0);
//     const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
//     const variance = scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
//     return Math.max(0, 100 - variance / 10);
//   };

//   const getLevelConfig = (level) => {
//     const configs = {
//       beginner: {
//         color: "from-blue-500 to-cyan-500",
//         bgColor: "bg-blue-500/10",
//         borderColor: "border-blue-500/30",
//         textColor: "text-blue-400",
//         icon: "🌱",
//         nextLevel: "intermediate",
//         progress: 65,
//       },
//       intermediate: {
//         color: "from-purple-500 to-pink-500",
//         bgColor: "bg-purple-500/10",
//         borderColor: "border-purple-500/30",
//         textColor: "text-purple-400",
//         icon: "🚀",
//         nextLevel: "advanced",
//         progress: 30,
//       },
//       advanced: {
//         color: "from-emerald-500 to-teal-500",
//         bgColor: "bg-emerald-500/10",
//         borderColor: "border-emerald-500/30",
//         textColor: "text-emerald-400",
//         icon: "⭐",
//         nextLevel: "expert",
//         progress: 85,
//       },
//     };
//     return configs[level] || configs.beginner;
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   // Chart components
//   const ScoreTrendChart = () => {
//     const scores = progress?.scoreProgression?.slice(-10) || [];

//     return (
//       <div className="space-y-3">
//         {scores.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center py-8 text-gray-500"
//           >
//             <LineChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
//             <p>No score data available yet</p>
//             <p className="text-sm mt-2">
//               Submit more essays to see your progress
//             </p>
//           </motion.div>
//         ) : (
//           scores.map((scoreData, idx) => {
//             const percentage = (scoreData.score / 100) * 100;
//             const isLatest = idx === scores.length - 1;
//             const prevScore = idx > 0 ? scores[idx - 1].score : scoreData.score;
//             const change = scoreData.score - prevScore;

//             return (
//               <motion.div
//                 key={idx}
//                 initial={{ scaleX: 0, opacity: 0 }}
//                 animate={{ scaleX: 1, opacity: 1 }}
//                 transition={{ delay: idx * 0.1, duration: 0.5 }}
//                 className="flex items-center gap-3 group"
//               >
//                 <div className="w-20 text-xs text-gray-400">
//                   {new Date(scoreData.date).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </div>
//                 <div className="flex-1 flex items-center gap-2">
//                   <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden relative">
//                     <motion.div
//                       initial={{ width: 0 }}
//                       animate={{ width: `${percentage}%` }}
//                       transition={{ duration: 1, delay: idx * 0.1 }}
//                       className={`h-full rounded-full relative ${
//                         scoreData.score >= 85
//                           ? "bg-gradient-to-r from-emerald-500 to-green-500"
//                           : scoreData.score >= 70
//                           ? "bg-gradient-to-r from-blue-500 to-cyan-500"
//                           : scoreData.score >= 60
//                           ? "bg-gradient-to-r from-amber-500 to-orange-500"
//                           : "bg-gradient-to-r from-red-500 to-pink-500"
//                       } ${
//                         isLatest
//                           ? "ring-2 ring-white ring-opacity-50 shadow-lg"
//                           : ""
//                       }`}
//                     >
//                       {isLatest && (
//                         <motion.div
//                           className="absolute inset-0 bg-white/20"
//                           animate={{ x: ["-100%", "100%"] }}
//                           transition={{ duration: 2, repeat: Infinity }}
//                         />
//                       )}
//                     </motion.div>
//                   </div>
//                   <span
//                     className={`text-sm font-bold w-10 text-right ${
//                       scoreData.score >= 85
//                         ? "text-emerald-400"
//                         : scoreData.score >= 70
//                         ? "text-blue-400"
//                         : scoreData.score >= 60
//                         ? "text-amber-400"
//                         : "text-red-400"
//                     }`}
//                   >
//                     {scoreData.score}
//                   </span>
//                   {idx > 0 && (
//                     <motion.span
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: idx * 0.1 + 0.3 }}
//                       className={`text-xs font-semibold flex items-center gap-0.5 ${
//                         change > 0
//                           ? "text-emerald-400"
//                           : change < 0
//                           ? "text-red-400"
//                           : "text-gray-400"
//                       }`}
//                     >
//                       {change > 0 && <ArrowUp className="w-3 h-3" />}
//                       {change < 0 && <ArrowDown className="w-3 h-3" />}
//                       {change !== 0 && Math.abs(change)}
//                     </motion.span>
//                   )}
//                 </div>
//               </motion.div>
//             );
//           })
//         )}
//       </div>
//     );
//   };

//   const QualityRadarChart = () => {
//     const qualities = [
//       {
//         name: "Grammar",
//         value: student?.performanceMetrics?.avgGrammarScore || 0,
//         max: 100,
//         icon: "✍️",
//       },
//       {
//         name: "Content",
//         value: student?.performanceMetrics?.avgContentScore || 0,
//         max: 100,
//         icon: "📝",
//       },
//       {
//         name: "Organization",
//         value: student?.performanceMetrics?.avgOrganizationScore || 0,
//         max: 100,
//         icon: "📋",
//       },
//       {
//         name: "Style",
//         value: student?.performanceMetrics?.avgStyleScore || 0,
//         max: 100,
//         icon: "🎨",
//       },
//       {
//         name: "Mechanics",
//         value: student?.performanceMetrics?.avgMechanicsScore || 0,
//         max: 100,
//         icon: "⚙️",
//       },
//     ];

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         {qualities.map((quality, idx) => (
//           <motion.div
//             key={idx}
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{
//               delay: idx * 0.1,
//               type: "spring",
//               stiffness: 260,
//               damping: 20,
//             }}
//             whileHover={{ scale: 1.1, rotate: 5 }}
//             className="text-center group cursor-pointer"
//           >
//             <div className="relative inline-flex items-center justify-center mb-3">
//               <svg className="w-20 h-20 transform -rotate-90">
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="currentColor"
//                   strokeWidth="6"
//                   fill="transparent"
//                   className="text-gray-700"
//                 />
//                 <motion.circle
//                   cx="40"
//                   cy="40"
//                   r="36"
//                   stroke="currentColor"
//                   strokeWidth="6"
//                   fill="transparent"
//                   strokeDasharray="226"
//                   className={
//                     quality.value >= 80
//                       ? "text-emerald-500"
//                       : quality.value >= 60
//                       ? "text-blue-500"
//                       : quality.value >= 40
//                       ? "text-amber-500"
//                       : "text-red-500"
//                   }
//                   initial={{ strokeDashoffset: 226 }}
//                   animate={{
//                     strokeDashoffset: 226 - (226 * quality.value) / 100,
//                   }}
//                   transition={{
//                     duration: 1.5,
//                     delay: idx * 0.1,
//                     ease: "easeOut",
//                   }}
//                 />
//               </svg>
//               <div className="absolute flex flex-col items-center">
//                 <span className="text-2xl mb-1">{quality.icon}</span>
//                 <span className="text-white font-bold text-sm">
//                   {Math.round(quality.value)}%
//                 </span>
//               </div>
//             </div>
//             <motion.div
//               className="text-xs text-gray-300 font-medium"
//               animate={{ opacity: [0.7, 1, 0.7] }}
//               transition={{ duration: 2, repeat: Infinity }}
//             >
//               {quality.name}
//             </motion.div>
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   const AchievementCard = ({ achievement }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -5, scale: 1.02 }}
//       className={`p-4 rounded-xl border-2 transition-all ${
//         achievement.unlocked
//           ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50 shadow-lg shadow-amber-500/20"
//           : "bg-gray-800/30 border-gray-600/30"
//       }`}
//     >
//       <div className="flex items-start gap-3">
//         <motion.div
//           animate={
//             achievement.unlocked
//               ? {
//                   scale: [1, 1.2, 1],
//                   rotate: [0, 10, -10, 0],
//                 }
//               : {}
//           }
//           transition={{
//             duration: 2,
//             repeat: achievement.unlocked ? Infinity : 0,
//             repeatDelay: 5,
//           }}
//           className={`text-3xl ${
//             achievement.unlocked
//               ? "filter drop-shadow-lg"
//               : "grayscale opacity-50"
//           }`}
//         >
//           {achievement.icon}
//         </motion.div>
//         <div className="flex-1">
//           <h4
//             className={`font-bold text-sm mb-1 ${
//               achievement.unlocked ? "text-amber-300" : "text-gray-400"
//             }`}
//           >
//             {achievement.title}
//           </h4>
//           <p className="text-xs text-gray-400 mb-2">
//             {achievement.description}
//           </p>
//           {achievement.unlocked ? (
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="flex items-center gap-2"
//             >
//               <CheckCircle className="w-4 h-4 text-emerald-400" />
//               <span className="text-xs text-emerald-400 font-semibold">
//                 Unlocked!
//               </span>
//               {achievement.date && (
//                 <span className="text-xs text-gray-500">
//                   {new Date(achievement.date).toLocaleDateString()}
//                 </span>
//               )}
//             </motion.div>
//           ) : (
//             <div className="mt-2">
//               <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: `${(achievement.progress || 0) * 100}%` }}
//                   transition={{ duration: 1 }}
//                   className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
//                 />
//               </div>
//               <span className="text-xs text-gray-400 mt-1 block">
//                 {Math.round((achievement.progress || 0) * 100)}% complete
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//           className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   const levelConfig = getLevelConfig(student?.level);
//   const recentEssays = essays
//   const unlockedAchievements = achievements.filter((a) => a.unlocked);
//   // const lockedAchievements = achievements.filter((a) => !a.unlocked);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <motion.div
//           // variants={containerVariants}
//           // initial="hidden"
//           // animate="visible"
//           className="space-y-6"
//         >
//           {/* Header Section */}
//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
//           >
//             <div>
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
//                 Welcome back, {student?.name}!
//               </h1>
//               <p className="text-gray-400">
//                 Track your writing journey and achievements
//               </p>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
//               onClick={() => navigate("/upload")}
//             >
//               <Plus className="w-5 h-5" />
//               Submit New Essay
//             </motion.button>
//           </motion.div>

//           {/* Stats Grid */}
//           <motion.div
//             variants={itemVariants}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {/* Overall Score */}
//             <motion.div
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <motion.div
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                   className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg"
//                 >
//                   <Award className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <div className="flex items-center gap-1">
//                   {student?.performanceMetrics?.recentImprovement >= 0 ? (
//                     <TrendingUp className="w-4 h-4 text-emerald-400" />
//                   ) : (
//                     <TrendingDown className="w-4 h-4 text-red-400" />
//                   )}
//                   <span
//                     className={`text-sm font-semibold ${
//                       student?.performanceMetrics?.recentImprovement >= 0
//                         ? "text-emerald-400"
//                         : "text-red-400"
//                     }`}
//                   >
//                     {student?.performanceMetrics?.recentImprovement >= 0
//                       ? "+"
//                       : ""}
//                     {student?.performanceMetrics?.recentImprovement?.toFixed(
//                       1
//                     ) || 0}
//                   </span>
//                 </div>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1">
//                 {student?.performanceMetrics?.avgScore?.toFixed(1) || 0}
//               </h3>
//               <p className="text-gray-400 text-sm">Average Score</p>
//               <div className="mt-2 text-xs text-gray-500">
//                 Best: {student?.performanceMetrics?.bestScore || 0}
//               </div>
//             </motion.div>

//             {/* Level Card */}
//             <motion.div
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <motion.div
//                   animate={{
//                     scale: [1, 1.2, 1],
//                     rotate: [0, 10, -10, 0],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                     repeatDelay: 3,
//                   }}
//                   className={`bg-gradient-to-r ${levelConfig.color} p-3 rounded-xl shadow-lg`}
//                 >
//                   <Trophy className="w-6 h-6 text-white" />
//                 </motion.div>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1 capitalize">
//                 {levelConfig.icon} {student?.level}
//               </h3>
//               <p className="text-gray-400 text-sm">Current Level</p>
//               <div className="mt-3">
//                 <div className="flex justify-between text-xs text-gray-400 mb-1">
//                   <span>{student?.level}</span>
//                   <span>{levelConfig.nextLevel}</span>
//                 </div>
//                 <motion.div
//                   initial={{ width: 0 }}
//                   animate={{ width: "100%" }}
//                   transition={{ duration: 1, delay: 0.5 }}
//                   className="h-2 bg-gray-700 rounded-full overflow-hidden"
//                 >
//                   <div
//                     className={`h-full bg-gradient-to-r ${levelConfig.color}`}
//                     style={{ width: `${levelConfig.progress}%` }}
//                   />
//                 </motion.div>
//               </div>
//             </motion.div>

//             {/* Essays Submitted */}
//             <motion.div
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <motion.div
//                   whileHover={{ rotate: 360 }}
//                   transition={{ duration: 0.6 }}
//                   className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg"
//                 >
//                   <BookOpen className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <div className="flex items-center gap-1">
//                   <Flame className="w-4 h-4 text-orange-400" />
//                   <span className="text-orange-400 text-sm font-semibold">
//                     {student?.stats?.essaysThisWeek || 0} this week
//                   </span>
//                 </div>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1">
//                 {student?.stats?.totalEssays || 0}
//               </h3>
//               <p className="text-gray-400 text-sm">Essays Submitted</p>
//               <div className="mt-2 text-xs text-gray-500">
//                 {student?.stats?.totalWords || 0} total words
//               </div>
//             </motion.div>

//             {/* Consistency */}
//             <motion.div
//               whileHover={{ y: -5, scale: 1.02 }}
//               className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <motion.div
//                   whileHover={{ scale: 1.2 }}
//                   className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg"
//                 >
//                   <Activity className="w-6 h-6 text-white" />
//                 </motion.div>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-1">
//                 {Math.round(student?.performanceMetrics?.consistency || 0)}%
//               </h3>
//               <p className="text-gray-400 text-sm">Consistency</p>
//               <div className="mt-2 text-xs text-gray-500">
//                 Score stability across essays
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Main Content Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Left Column - Charts and Progress */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Quality Metrics */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-white">
//                     Writing Quality Analysis
//                   </h2>
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-gray-700/50 px-4 py-2 rounded-lg"
//                   >
//                     <span className="text-gray-300 text-sm">
//                       Performance Overview
//                     </span>
//                   </motion.div>
//                 </div>
//                 <QualityRadarChart />
//               </motion.div>

//               {/* Score Trend */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex items-center gap-2 mb-6">
//                   <motion.div
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 3, repeat: Infinity }}
//                     className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg"
//                   >
//                     <LineChart className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <h3 className="text-xl font-bold text-white">Score Trend</h3>
//                 </div>
//                 <ScoreTrendChart />
//               </motion.div>

//               {/* Recent Essays */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-2xl font-bold text-white">
//                     Recent Essays
//                   </h2>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1"
//                   >
//                     View All
//                     <ChevronRight className="w-4 h-4" />
//                   </motion.button>
//                 </div>

//                 <div className="space-y-3">
//                   <AnimatePresence>
//                     {recentEssays.map((essay, idx) => (
//                       <motion.div
//                         key={essay._id}
//                         initial={{ x: -50, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         exit={{ x: 50, opacity: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         whileHover={{ x: 5, scale: 1.02 }}
//                         className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30 group cursor-pointer"
//                         onClick={() =>
//                           (window.location.href = `/essay/${essay._id}`)
//                         }
//                       >
//                         <div className="flex items-start justify-between mb-2">
//                           <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
//                             {essay.title || "Untitled Essay"}
//                           </h4>
//                           <motion.div
//                             whileHover={{ scale: 1.1 }}
//                             className={`px-3 py-1 rounded-full text-sm font-bold ${
//                               essay.grading.finalScore >= 85
//                                 ? "bg-emerald-500/20 text-emerald-400"
//                                 : essay.grading.finalScore >= 70
//                                 ? "bg-blue-500/20 text-blue-400"
//                                 : "bg-amber-500/20 text-amber-400"
//                             }`}
//                           >
//                             {essay.grading.finalScore}
//                           </motion.div>
//                         </div>

//                         <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
//                           <span className="flex items-center gap-1">
//                             <Calendar className="w-3 h-3" />
//                             {new Date(essay.submittedAt).toLocaleDateString()}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <FileText className="w-3 h-3" />
//                             {essay.originalText?.split(" ").length || 0} words
//                           </span>
//                           <span
//                             className={`px-2 py-0.5 rounded-full text-xs ${levelConfig.bgColor} ${levelConfig.textColor}`}
//                           >
//                             {essay.grading.grade}
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-2">
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               window.location.href = `/essay/${essay._id}`;
//                             }}
//                           >
//                             <Eye className="w-4 h-4" />
//                             View
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="text-gray-400 hover:text-gray-300 text-sm font-medium flex items-center gap-1"
//                           >
//                             <Download className="w-4 h-4" />
//                             Report
//                           </motion.button>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </AnimatePresence>

//                   {recentEssays.length === 0 && (
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className="text-center py-8 text-gray-500"
//                     >
//                       <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
//                       <p>No essays submitted yet</p>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
//                         onClick={() => navigate("/upload")}
//                       >
//                         Submit Your First Essay
//                       </motion.button>
//                     </motion.div>
//                   )}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Right Column - Achievements and Insights */}
//             <div className="space-y-6">
//               {/* Achievements */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg"
//                   >
//                     <Medal className="w-5 h-5 text-white" />
//                   </motion.div>
//                   <h3 className="text-xl font-bold text-white">Achievements</h3>
//                   <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-bold">
//                     {unlockedAchievements.length}/{achievements.length}
//                   </span>
//                 </div>

//                 <div className="space-y-3 max-h-96 overflow-y-auto">
//                      {achievements.map((achievement, idx) => (
//                     <AchievementCard key={idx} achievement={achievement} />
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Common Issues */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
//               >
//                 <div className="flex items-center gap-2 mb-4">
//                   <TargetIcon className="w-5 h-5 text-amber-400" />
//                   <h3 className="text-xl font-bold text-white">Focus Areas</h3>
//                 </div>

//                 <div className="space-y-3">
//                   {student?.commonIssues?.map((issue, idx) => (
//                     <motion.div
//                       key={idx}
//                       initial={{ x: 50, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: idx * 0.1 }}
//                       className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                             issue.severity === "high"
//                               ? "bg-red-500/20 text-red-400"
//                               : issue.severity === "medium"
//                               ? "bg-amber-500/20 text-amber-400"
//                               : "bg-blue-500/20 text-blue-400"
//                           }`}
//                         >
//                           <AlertCircle className="w-4 h-4" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-white text-sm">
//                             {issue.description}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             {Math.round(issue.frequency * 100)}% of essays
//                           </p>
//                         </div>
//                       </div>
//                       <span
//                         className={`text-sm font-bold ${
//                           issue.severity === "high"
//                             ? "text-red-400"
//                             : issue.severity === "medium"
//                             ? "text-amber-400"
//                             : "text-blue-400"
//                         }`}
//                       >
//                         {issue.count}x
//                       </span>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Quick Actions */}
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl"
//               >
//                 <h3 className="text-xl font-bold text-white mb-4">
//                   Quick Actions
//                 </h3>
//                 <div className="space-y-2">
//                   {[
//                     {
//                       icon: Plus,
//                       text: "Submit Essay",
//                       desc: "Get instant feedback",
//                       action: () => (window.location.href = "/submit-essay"),
//                     },
//                     {
//                       icon: BarChart3,
//                       text: "View Analytics",
//                       desc: "Detailed insights",
//                       action: () => setShowAnalytics(true),
//                     },
//                     {
//                       icon: Target,
//                       text: "Set Goals",
//                       desc: "Track progress",
//                       action: "/goals",
//                     },
//                     {
//                       icon: BookOpen,
//                       text: "Writing Tips",
//                       desc: "Improve skills",
//                       action: () => setShowWritingTips(true),
//                     },
//                   ].map((action, idx) => (
//                     <motion.button
//                       key={idx}
//                       whileHover={{ x: 5 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-3 text-left transition-all flex items-center gap-3"
//                       onClick={
//                         typeof action.action === "function"
//                           ? action.action
//                           : () => (window.location.href = action.action)
//                       }
//                     >
//                       <action.icon className="w-5 h-5 text-white" />
//                       <div>
//                         <p className="font-semibold text-white text-sm">
//                           {action.text}
//                         </p>
//                         <p className="text-xs text-blue-100">{action.desc}</p>
//                       </div>
//                     </motion.button>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       <AnalyticsModal
//         isOpen={showAnalytics}
//         onClose={() => setShowAnalytics(false)}
//         studentId={student?.studentId || studentId}
//       />

//       <WritingTipsModal
//         isOpen={showWritingTips}
//         onClose={() => setShowWritingTips(false)}
//         studentId={student?.studentId || studentId}
//       />
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  BookOpen,
  TrendingUp,
  Target,
  Star,
  Calendar,
  FileText,
  ChevronRight,
  Plus,
  CheckCircle,
  Eye,
  BarChart3,
  Activity,
  Trophy,
  Flame,
  ArrowUp,
  ArrowDown,
  Medal,
  LineChart,
  Lock,
  Zap,
  Sparkles,
  Crown,
  Download,
} from "lucide-react";
import WritingTipsModal from "../modal/WritingTipsModal";
import AnalyticsModal from "../modal/AnalyticsModal";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboardService";
import essayService from "../services/essayServices";
import EssaysModal from "../modal/EssaysModal.jsx";

const StudentDashboard = () => {
  const { user } = useUser();
  const studentId = user?._id;
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [essays, setEssays] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState({
    totalPoints: 0,
    totalUnlocked: 0,
    totalBadges: 0,
    unlockedBadges: [],
    lockedBadges: [],
    progressTracking: {},
  });
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showWritingTips, setShowWritingTips] = useState(false);
  const [achievementView, setAchievementView] = useState("all"); // "all", "unlocked", "locked"
  const [showEssaysModal, setShowEssaysModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const progressRes = await dashboardService.getStudentProgress();
      const essaysRes = await essayService.getStudentEssays(studentId);
      const achievementsRes = await dashboardService.fetchAchievements();

      console.log("Achievements Response:", achievementsRes.data);
      console.log("Essays Response:", essaysRes.essays);
      console.log("Progress Response:", progressRes.progress);

      // Set achievements data with proper structure
      if (achievementsRes.data) {
        setAchievements(achievementsRes.data);
      }

      // Calculate stats from essays
      const essaysData = essaysRes?.essays || [];
      const totalEssays = essaysData?.length || 0;

      const avgEssayLength =
        totalEssays > 0
          ? Math.round(
              essaysData.reduce(
                (sum, essay) =>
                  sum + (essay.originalText?.split(" ").length || 0),
                0
              ) / totalEssays
            )
          : 0;

      const avgScore =
        totalEssays > 0
          ? essaysData.reduce(
              (sum, essay) => sum + (essay.grading?.finalScore || 0),
              0
            ) / totalEssays
          : 0;

      // Calculate quality scores average
      const qualityAverages = {
        grammar: 0,
        content: 0,
        organization: 0,
        style: 0,
        mechanics: 0,
      };
      if (totalEssays > 0) {
        essaysData.forEach((essay) => {
          const quality = essay.grading?.qualityScores || {};
          Object.keys(qualityAverages).forEach((key) => {
            qualityAverages[key] += quality[key] || 0;
          });
        });
        Object.keys(qualityAverages).forEach((key) => {
          qualityAverages[key] = (qualityAverages[key] / totalEssays) * 100;
        });
      }

      // Calculate improvement
      const scores = essaysData.map((e) => e.grading?.finalScore || 0);
      const recentImprovement =
        scores.length >= 2
          ? scores[scores.length - 1] - scores[scores.length - 2]
          : 0;

      // Update student data
      const updatedStudent = {
        name: user?.student?.name || user?.name || "Student",
        level: progressRes.progress?.currentLevel || "beginner",
        stats: {
          totalEssays,
          avgEssayLength,
          essaysThisWeek: essaysData.filter(
            (essay) =>
              new Date(essay.submittedAt) >
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          ).length,
          totalWords: essaysData.reduce(
            (sum, essay) => sum + (essay.originalText?.split(" ").length || 0),
            0
          ),
        },
        performanceMetrics: {
          avgScore,
          recentImprovement,
          ...qualityAverages,
          recentScores: essaysData
            .slice(0, 5)
            .map((essay) => essay.grading?.finalScore || 0),
          bestScore: Math.max(
            ...essaysData.map((essay) => essay.grading?.finalScore || 0),
            0
          ),
          consistency: calculateConsistency(essaysData),
        },
      };

      setStudent(updatedStudent);
      setEssays(essaysData);
      setProgress(progressRes?.progress);

      setLoading(false);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setLoading(false);
    }
  };

  const calculateConsistency = (essaysData) => {
    if (essaysData.length < 2) return 100;
    const scores = essaysData.map((essay) => essay.grading?.finalScore || 0);
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance =
      scores.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / scores.length;
    return Math.max(0, 100 - variance / 10);
  };

  const getLevelConfig = (level) => {
    const configs = {
      beginner: {
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-500/10",
        borderColor: "border-blue-500/30",
        textColor: "text-blue-400",
        icon: "🌱",
        nextLevel: "intermediate",
        progress: 65,
      },
      intermediate: {
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-500/10",
        borderColor: "border-purple-500/30",
        textColor: "text-purple-400",
        icon: "🚀",
        nextLevel: "advanced",
        progress: 30,
      },
      advanced: {
        color: "from-emerald-500 to-teal-500",
        bgColor: "bg-emerald-500/10",
        borderColor: "border-emerald-500/30",
        textColor: "text-emerald-400",
        icon: "⭐",
        nextLevel: "expert",
        progress: 85,
      },
    };
    return configs[level] || configs.beginner;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "from-green-500 to-emerald-500",
      Intermediate: "from-blue-500 to-cyan-500",
      Advanced: "from-purple-500 to-pink-500",
      Expert: "from-orange-500 to-red-500",
    };
    return colors[difficulty] || colors.Beginner;
  };

  const getDifficultyIcon = (difficulty) => {
    const icons = {
      Beginner: "🌱",
      Intermediate: "🚀",
      Advanced: "⭐",
      Expert: "👑",
    };
    return icons[difficulty] || icons.Beginner;
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

  const QualityRadarChart = () => {
    const qualities = [
      {
        name: "Grammar",
        value: student?.performanceMetrics?.grammar || 0,
        max: 100,
        icon: "✍️",
      },
      {
        name: "Content",
        value: student?.performanceMetrics?.content || 0,
        max: 100,
        icon: "📝",
      },
      {
        name: "Organization",
        value: student?.performanceMetrics?.organization || 0,
        max: 100,
        icon: "📋",
      },
      {
        name: "Style",
        value: student?.performanceMetrics?.style || 0,
        max: 100,
        icon: "🎨",
      },
      {
        name: "Mechanics",
        value: student?.performanceMetrics?.mechanics || 0,
        max: 100,
        icon: "⚙️",
      },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {qualities.map((quality, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: idx * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-center group cursor-pointer"
          >
            <div className="relative inline-flex items-center justify-center mb-3">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-gray-700"
                />
                <motion.circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226"
                  className={
                    quality.value >= 80
                      ? "text-emerald-500"
                      : quality.value >= 60
                      ? "text-blue-500"
                      : quality.value >= 40
                      ? "text-amber-500"
                      : "text-red-500"
                  }
                  initial={{ strokeDashoffset: 226 }}
                  animate={{
                    strokeDashoffset: 226 - (226 * quality.value) / 100,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: idx * 0.1,
                    ease: "easeOut",
                  }}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl mb-1">{quality.icon}</span>
                <span className="text-white font-bold text-sm">
                  {Math.round(quality.value)}%
                </span>
              </div>
            </div>
            <motion.div
              className="text-xs text-gray-300 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {quality.name}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Enhanced Achievement Card Component
  const AchievementCard = ({ achievement, isUnlocked = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-4 rounded-xl border-2 transition-all ${
        isUnlocked
          ? "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50 shadow-lg shadow-amber-500/20"
          : "bg-gray-800/30 border-gray-600/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={
            isUnlocked
              ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: isUnlocked ? Infinity : 0,
            repeatDelay: 5,
          }}
          className={`text-3xl relative ${
            isUnlocked ? "filter drop-shadow-lg" : "grayscale opacity-50"
          }`}
        >
          {achievement.icon}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </motion.div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4
                className={`font-bold text-sm mb-1 ${
                  isUnlocked ? "text-amber-300" : "text-gray-400"
                }`}
              >
                {achievement.title}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(
                    achievement.difficulty
                  )} text-white font-semibold`}
                >
                  {getDifficultyIcon(achievement.difficulty)}{" "}
                  {achievement.difficulty}
                </span>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full font-bold">
                  {achievement.points} pts
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 mb-2">
            {achievement.description}
          </p>

          <div className="text-xs text-gray-500 mb-3">
            <strong>Criteria:</strong> {achievement.criteria}
          </div>

          {isUnlocked ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-semibold">
                Unlocked!
              </span>
              {achievement.unlockedAt && (
                <span className="text-xs text-gray-500">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </motion.div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Lock className="w-3 h-3" />
              <span>Locked - Complete criteria to unlock</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  // Achievement Progress Summary
  const AchievementProgress = () => (
    <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 mb-4 border border-purple-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white">Achievement Progress</h4>
            <p className="text-sm text-purple-300">
              {achievements.totalUnlocked} of {achievements.totalBadges}{" "}
              unlocked
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {achievements.totalPoints}
          </div>
          <div className="text-xs text-purple-300">Total Points</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>
            {Math.round(
              (achievements.totalUnlocked / achievements.totalBadges) * 100
            )}
            %
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
            style={{
              width: `${
                (achievements.totalUnlocked / achievements.totalBadges) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );

  // Filter achievements based on view
  const getFilteredAchievements = () => {
    switch (achievementView) {
      case "unlocked":
        return achievements.unlockedBadges;
      case "locked":
        return achievements.lockedBadges;
      default:
        return [...achievements.unlockedBadges, ...achievements.lockedBadges];
    }
  };

  const ScoreTrendChart = () => {
    const scores = progress?.scoreProgression?.slice(-10) || [];

    return (
      <div className="space-y-3">
        {scores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <LineChart className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No score data available yet</p>
          </div>
        ) : (
          scores.map((scoreData, idx) => {
            const percentage = scoreData.score;
            const isLatest = idx === scores.length - 1;
            const prevScore = idx > 0 ? scores[idx - 1].score : scoreData.score;
            const change = scoreData.score - prevScore;

            return (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-20 text-xs text-gray-400">
                  {new Date(scoreData.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        scoreData.score >= 85
                          ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                          : scoreData.score >= 70
                          ? "bg-gradient-to-br from-purple-400 to-blue-600"
                          : scoreData.score >= 60
                          ? "bg-gradient-to-br from-amber-400 to-amber-600"
                          : "bg-gradient-to-br from-red-400 to-red-600"
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-bold w-10 text-right ${
                      scoreData.score >= 85
                        ? "text-emerald-400"
                        : scoreData.score >= 70
                        ? "text-blue-400"
                        : scoreData.score >= 60
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}               
                  >
                    {scoreData.score}
                  </span>
                  {idx > 0 && (
                    <span
                      className={`text-xs font-semibold flex items-center gap-0.5 ${
                        change > 0
                          ? "text-emerald-400"
                          : change < 0
                          ? "text-red-400"
                          : "text-gray-400"
                      }`}
                    >
                      {change > 0 && <ArrowUp className="w-3 h-3" />}
                      {change < 0 && <ArrowDown className="w-3 h-3" />}
                      {change !== 0 && Math.abs(change)}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const levelConfig = getLevelConfig(student?.level);
  const recentEssays = essays.slice(0, 5);
  const filteredAchievements = getFilteredAchievements();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, {student?.name}!
              </h1>
              <p className="text-gray-400">
                Track your writing journey and achievements
              </p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
              onClick={() => navigate("/upload")}
            >
              <Plus className="w-5 h-5" />
              Submit New Essay
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Overall Score */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {student?.performanceMetrics?.recentImprovement >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      student?.performanceMetrics?.recentImprovement >= 0
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {student?.performanceMetrics?.recentImprovement >= 0
                      ? "+"
                      : ""}
                    {student?.performanceMetrics?.recentImprovement?.toFixed(
                      1
                    ) || 0}
                  </span>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {student?.performanceMetrics?.avgScore?.toFixed(1) || 0}
              </h3>
              <p className="text-gray-400 text-sm">Average Score</p>
            </div>

            {/* Level Card */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <div
                className={`bg-gradient-to-r ${levelConfig.color} p-3 rounded-xl mb-4`}
              >
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1 capitalize">
                {student?.level}
              </h3>
              <p className="text-gray-400 text-sm">Current Level</p>
            </div>

            {/* Essays Submitted */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 rounded-xl mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {student?.stats?.totalEssays || 0}
              </h3>
              <p className="text-gray-400 text-sm">Essays Submitted</p>
            </div>

            {/* Achievements Count */}
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl mb-4">
                <Medal className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {achievements.totalUnlocked || 0}
              </h3>
              <p className="text-gray-400 text-sm">Achievements</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Quality Metrics */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Writing Quality Analysis
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-700/50 px-4 py-2 rounded-lg"
                  >
                    <span className="text-gray-300 text-sm">
                      Performance Overview
                    </span>
                  </motion.div>
                </div>
                <QualityRadarChart />
              </motion.div>

              {/* Score Trend */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">
                  Score Trend
                </h3>
                <ScoreTrendChart />
              </div>

              {/* Recent Essays */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Recent Essays
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowEssaysModal(true)}
                    className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center gap-1 transition-colors"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {recentEssays.map((essay, idx) => (
                      <motion.div
                        key={essay._id}
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                        className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/30 group cursor-pointer"
                        onClick={() => navigate(`/essay/${essay._id}`)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                            {essay.title || "Untitled Essay"}
                          </h4>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              essay.grading.finalScore >= 85
                                ? "bg-emerald-500/20 text-emerald-400"
                                : essay.grading.finalScore >= 70
                                ? "bg-blue-500/20 text-blue-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {essay.grading.finalScore}
                          </motion.div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(essay.submittedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {essay.originalText?.split(" ").length || 0} words
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${levelConfig.bgColor} ${levelConfig.textColor}`}
                          >
                            {essay.grading.grade}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `/essay/${essay._id}`;
                            }}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </motion.button>
                          {/* <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-400 hover:text-gray-300 text-sm font-medium flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                            Report
                          </motion.button> */}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {recentEssays.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-gray-500"
                    >
                      <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No essays submitted yet</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                        onClick={() => navigate("/upload")}
                      >
                        Submit Your First Essay
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Medal className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Achievements</h3>
                </div>

                <AchievementProgress />

                {/* Achievement Filters */}
                <div className="flex gap-2 mb-4">
                  {[
                    {
                      key: "all",
                      label: "All",
                      count: achievements.totalBadges,
                    },
                    {
                      key: "unlocked",
                      label: "Unlocked",
                      count: achievements.totalUnlocked,
                    },
                    {
                      key: "locked",
                      label: "Locked",
                      count:
                        achievements.totalBadges - achievements.totalUnlocked,
                    },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setAchievementView(filter.key)}
                      className={`flex-1 text-xs px-3 py-2 rounded-lg transition-colors ${
                        achievementView === filter.key
                          ? "bg-blue-500 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredAchievements.map((achievement, idx) => (
                    <AchievementCard
                      key={achievement._id || idx}
                      achievement={achievement}
                      isUnlocked={achievements.unlockedBadges.some(
                        (ub) => ub._id === achievement._id
                      )}
                    />
                  ))}

                  {filteredAchievements.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No achievements found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  {[
                    {
                      icon: Plus,
                      text: "Submit Essay",
                      desc: "Get instant feedback",
                      action: () => (window.location.href = "/upload"),
                    },
                    {
                      icon: BarChart3,
                      text: "View Analytics",
                      desc: "Detailed insights",
                      action: () => setShowAnalytics(true),
                    },
                    {
                      icon: BookOpen,
                      text: "Writing Tips",
                      desc: "Improve skills",
                      action: () => setShowWritingTips(true),
                    },
                  ].map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-3 text-left transition-all flex items-center gap-3"
                      onClick={
                        typeof action.action === "function"
                          ? action.action
                          : () => (window.location.href = action.action)
                      }
                    >
                      <action.icon className="w-5 h-5 text-white" />
                      <div>
                        <p className="font-semibold text-white text-sm">
                          {action.text}
                        </p>
                        <p className="text-xs text-blue-100">{action.desc}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EssaysModal
        isOpen={showEssaysModal}
        onClose={() => setShowEssaysModal(false)}
        essays={essays}
      />

      <WritingTipsModal
        isOpen={showWritingTips}
        onClose={() => setShowWritingTips(false)}
        studentId={studentId}
      />

      <AnalyticsModal
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
        studentId={student?.studentId || studentId}
      />
    </div>
  );
};

export default StudentDashboard;
