// import React, { useState } from 'react';
// import {
//   Award, BookOpen, Target, Lightbulb, Download, Share2,
//   ChevronDown, ChevronUp, Star, ThumbsUp, MessageSquare,
//   CheckCircle, XCircle, AlertTriangle, TrendingUp,
//   FileText, Edit3, Layout, Type, Zap, AlertCircle,
//   GraduationCap, Brain, Clock, BarChart3,
//   ArrowRight, BookMarked, PenTool, Sparkles, Eye,
//   TrendingDown, Info, BookText
// } from 'lucide-react';

// const EssayFeedback = ({ feedbackData }) => {

//   // Sample data structure matching enhanced backend
//   // const feedbackData = {
//   //   essay: {
//   //     score: 8.5,
//   //     maxScore: 12,
//   //     confidence: 0.87,
//   //     qualityBreakdown: {
//   //       grammar: 0.75,
//   //       content: 0.82,
//   //       organization: 0.78,
//   //       style: 0.71,
//   //       mechanics: 0.80
//   //     }
//   //   },
//   //   feedback: {
//   //     studentLevel: 'intermediate',
//   //     grammarErrors: [
//   //       {
//   //         sentence: "He don't like writing essays.",
//   //         error: 'Use "doesn\'t" with he/she/it',
//   //         original: "don't",
//   //         correction: "doesn't",
//   //         explanation: "Ensure subject-verb agreement: singular subjects take singular verbs.",
//   //         type: 'subject_verb_agreement',
//   //         severity: 'moderate',
//   //         sentenceNumber: 3
//   //       },
//   //       {
//   //         sentence: "Students needs more feedback to improve.",
//   //         error: 'Third person plural doesn\'t need -s',
//   //         original: "needs",
//   //         correction: "need",
//   //         explanation: "Plural subjects don't add -s to verbs.",
//   //         type: 'subject_verb_agreement',
//   //         severity: 'moderate',
//   //         sentenceNumber: 7
//   //       }
//   //     ],
//   //     spellingErrors: [
//   //       {
//   //         word: 'importent',
//   //         correction: 'important',
//   //         suggestions: ['important', 'importer', 'impotent'],
//   //         context: '...writing is very importent for students...',
//   //         severity: 'moderate'
//   //       },
//   //       {
//   //         word: 'becouse',
//   //         correction: 'because',
//   //         suggestions: ['because', 'beclouse'],
//   //         context: '...becouse it helps them...',
//   //         severity: 'minor'
//   //       }
//   //     ],
//   //     styleIssues: [
//   //       {
//   //         type: 'passive voice',
//   //         text: 'was written by the student',
//   //         context: '...The essay was written by the student...',
//   //         suggestion: 'Active voice makes writing more direct and engaging.'
//   //       },
//   //       {
//   //         type: 'weasel words',
//   //         text: 'very important',
//   //         context: '...is very important for...',
//   //         suggestion: 'Replace weak qualifiers with concrete descriptions.'
//   //       }
//   //     ],
//   //     vocabularyEnhancements: [
//   //       {
//   //         original: 'important',
//   //         alternatives: ['crucial', 'significant', 'vital'],
//   //         reason: '"important" appears 5 times. Consider varying your vocabulary.',
//   //         context: '...is important for students'
//   //       },
//   //       {
//   //         original: 'good',
//   //         alternatives: ['effective', 'beneficial', 'valuable'],
//   //         reason: '"good" appears 4 times. Consider varying your vocabulary.',
//   //         context: '...provides good feedback'
//   //       }
//   //     ],
//   //     sentenceStructure: {
//   //       issues: ['Many very short sentences'],
//   //       suggestions: [
//   //         'Combine related ideas into longer, more complex sentences',
//   //         'Vary your sentence structure with short, medium, and long sentences'
//   //       ],
//   //       metrics: {
//   //         avgSentenceLength: '11.3',
//   //         sentenceVariety: 'Needs improvement',
//   //         avgParagraphLength: '85'
//   //       }
//   //     },
//   //     contentFeedback: {
//   //       strengths: [
//   //         'Clear thesis statement present',
//   //         'Good vocabulary variety (58% unique words)',
//   //         'Effective use of transitions (5 found)'
//   //       ],
//   //       improvements: [
//   //         'Develop arguments more fully with specific examples',
//   //         'Add more supporting evidence for claims'
//   //       ],
//   //       examples: [
//   //         {
//   //           type: 'sentence_development',
//   //           before: 'Technology is important. It helps students.',
//   //           after: 'Technology is important in education because it helps students access information quickly and learn at their own pace.',
//   //           explanation: 'Combine related ideas and add supporting details'
//   //         }
//   //       ]
//   //     },
//   //     organizationFeedback: {
//   //       structure: '✅ Well-structured with introduction, body paragraphs, and conclusion',
//   //       suggestions: [],
//   //       positives: ['Clear introduction present', 'Conclusion summarizes main points', 'Good paragraph structure'],
//   //       organizationScore: 78
//   //     },
//   //     summary: {
//   //       overallComment: '👍 Good effort! Solid foundation with clear room for growth.',
//   //       motivationalMessage: 'You\'re on the right track! Focus on the specific areas highlighted below.',
//   //       keyTakeaways: [
//   //         'Grammar needs attention - review subject-verb agreement',
//   //         'Expand vocabulary to avoid repetition'
//   //       ],
//   //       nextSteps: [
//   //         'Review and correct all highlighted spelling and grammar errors',
//   //         'Read your essay aloud to catch awkward phrasing',
//   //         'Add transition words between paragraphs',
//   //         'Have someone else read your essay for feedback'
//   //       ],
//   //       wordsAnalyzed: 342,
//   //       sentencesAnalyzed: 18
//   //     }
//   //   },
//   //   studentLevel: 'intermediate',
//   //   levelUpdate: {
//   //     action: 'none',
//   //     message: 'You\'re maintaining consistent performance. Keep focusing on improvement!'
//   //   }
//   // };

//   const { essay, feedback, studentLevel, levelUpdate } = feedbackData;
//   const { qualityBreakdown } = essay;

//   const [activeTab, setActiveTab] = useState('overview');
//   const [expandedSections, setExpandedSections] = useState({
//     grammar: false,
//     spelling: false,
//     style: false,
//     vocabulary: false
//   });

//   const getLetterGrade = (grade) => {
//     if (grade === 'A') return { grade: 'A', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
//     if (grade === 'B') return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
//     if (grade === 'C') return { grade: 'C', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
//     if (grade === 'D') return { grade: 'D', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
//     return { grade: 'F', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
//   }

//   const letterGrade = getLetterGrade(essay.grade);

//   const getLevelBadge = () => {
//     const styles = {
//       beginner: {
//         bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200',
//         icon: <GraduationCap className="w-4 h-4" />
//       },
//       intermediate: {
//         bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200',
//         icon: <Brain className="w-4 h-4" />
//       },
//       advanced: {
//         bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200',
//         icon: <Zap className="w-4 h-4" />
//       }
//     };
//     const style = styles[studentLevel];
//     return (
//       <div className={`${style.bg} ${style.text} ${style.border} px-4 py-2 rounded-lg border flex items-center gap-2`}>
//         {style.icon}
//         <span className="font-semibold capitalize text-sm">{studentLevel}</span>
//       </div>
//     );
//   };

//   const QualityChart = () => {
//     const qualities = [
//       { name: 'Grammar', value: qualityBreakdown?.grammar, icon: <Edit3 className="w-5 h-5" />, color: 'bg-blue-500' },
//       { name: 'Content', value: qualityBreakdown?.content, icon: <FileText className="w-5 h-5" />, color: 'bg-emerald-500' },
//       { name: 'Organization', value: qualityBreakdown?.organization, icon: <Layout className="w-5 h-5" />, color: 'bg-purple-500' },
//       { name: 'Style', value: qualityBreakdown?.style, icon: <PenTool className="w-5 h-5" />, color: 'bg-amber-500' },
//       { name: 'Mechanics', value: qualityBreakdown?.mechanics, icon: <Type className="w-5 h-5" />, color: 'bg-indigo-500' }
//     ];

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
//         {qualities.map((q) => (
//           <div key={q.name} className="text-center group">
//             <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${q.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
//               {q.icon}
//             </div>
//             <div className="text-sm font-semibold text-gray-700 mb-2">{q.name}</div>
//             <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className={`absolute top-0 left-0 h-full ${q.color} transition-all duration-1000 ease-out`}
//                 style={{ width: `${q.value * 100}%` }}
//               />
//             </div>
//             <div className="text-xs font-bold text-gray-600 mt-2">
//               {Math.round(q.value * 100)}%
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const LevelUpdateBanner = () => {
//     if (levelUpdate.action === 'none') return null;

//     const styles = {
//       promote: {
//         bg: 'bg-gradient-to-r from-emerald-50 to-green-50',
//         border: 'border-emerald-200',
//         icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
//         title: 'Academic Achievement Unlocked!'
//       },
//       warn: {
//         bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
//         border: 'border-amber-200',
//         icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
//         title: 'Attention Required'
//       }
//     };

//     const style = styles[levelUpdate.action];
//     if (!style) return null;

//     return (
//       <div className={`${style.bg} border-2 ${style.border} rounded-xl p-6 mb-6`}>
//         <div className="flex items-start gap-4">
//           <div className="bg-white p-3 rounded-xl shadow-sm">
//             {style.icon}
//           </div>
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-gray-900 mb-2">{style.title}</h3>
//             <p className="text-gray-700 leading-relaxed">{levelUpdate.message}</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ScoreDisplay = () => (
//     <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm mb-6">
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
//         <div className="flex-1">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="bg-blue-100 p-3 rounded-xl">
//               <BarChart3 className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <p className="text-gray-600 text-sm font-medium">Academic Performance</p>
//               <h2 className="text-2xl font-bold text-gray-900">Essay Assessment</h2>
//             </div>
//           </div>

//           <div className="flex items-baseline gap-4 mb-4">
//             <div className="flex items-baseline gap-2">
//               <span className="text-5xl font-bold text-gray-900">{essay.score.toFixed(1)}</span>
//               <span className="text-2xl text-gray-500">/ {essay.maxScore}</span>
//             </div>
//             <div className={`${letterGrade.bg} ${letterGrade.color} ${letterGrade.border} px-4 py-2 rounded-lg border font-bold text-lg`}>
//               Grade: {letterGrade.grade}
//             </div>
//             <span>{essay?.gradeDescription}</span>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2 text-amber-600">
//               <Star className="w-5 h-5 fill-current" />
//               <span className="font-semibold">{Math.round(essay.confidence * 100)}% Confidence</span>
//             </div>
//             <div className="w-px h-6 bg-gray-300"></div>
//             <div className="flex items-center gap-2 text-gray-600">
//               <Clock className="w-4 h-4" />
//               <span className="text-sm">Just now</span>
//             </div>
//           </div>
//         </div>

//         <div className="mt-4 lg:mt-0">
//           {getLevelBadge()}
//         </div>
//       </div>

//       <div className="border-t border-gray-200 pt-6">
//         <div className="flex items-center gap-2 mb-6">
//           <Target className="w-5 h-5 text-gray-600" />
//           <h3 className="text-lg font-semibold text-gray-900">Quality Metrics</h3>
//         </div>
//         <QualityChart />
//       </div>
//     </div>
//   );

//   const GrammarSection = () => {
//     if (!feedback.grammarErrors || feedback.grammarErrors.length === 0) {
//       return (
//         <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-xl border-2 border-emerald-200">
//           <div className="bg-emerald-100 p-3 rounded-lg">
//             <CheckCircle className="w-6 h-6 text-emerald-600" />
//           </div>
//           <div>
//             <p className="text-emerald-800 font-semibold">Excellent Grammatical Accuracy</p>
//             <p className="text-emerald-700 text-sm">No grammatical errors detected.</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-4">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="bg-blue-100 p-3 rounded-xl">
//               <Edit3 className="w-6 h-6 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold text-gray-900">Grammar & Syntax Analysis</h3>
//               <p className="text-gray-600 text-sm">{feedback.grammarErrors.length} issues identified</p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           {feedback.grammarErrors.slice(0, expandedSections.grammar ? undefined : 3).map((error, idx) => (
//             <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-3">
//                   <span className={`text-xs font-bold px-3 py-1 rounded-full ${
//                     error.severity === 'severe' ? 'bg-red-100 text-red-800 border border-red-200' :
//                     error.severity === 'moderate' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
//                     'bg-blue-100 text-blue-800 border border-blue-200'
//                   }`}>
//                     {error.severity.charAt(0).toUpperCase() + error.severity.slice(1)}
//                   </span>
//                   <span className="text-xs text-gray-500">Sentence #{error.sentenceNumber}</span>
//                   <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">{error.type.replace(/_/g, ' ')}</span>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <XCircle className="w-4 h-4 text-red-500" />
//                     <p className="text-sm font-semibold text-gray-700">Original</p>
//                   </div>
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                     <p className="text-gray-900 italic leading-relaxed">"{error.sentence}"</p>
//                     <p className="text-red-600 font-semibold mt-2 text-sm">
//                       Issue: <span className="underline">{error.original}</span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2">
//                     <CheckCircle className="w-4 h-4 text-emerald-500" />
//                     <p className="text-sm font-semibold text-gray-700">Correction</p>
//                   </div>
//                   <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
//                     <p className="text-emerald-800 font-medium leading-relaxed">
//                       {error.correction}
//                     </p>
//                     <p className="text-emerald-700 text-sm mt-2">{error.error}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="text-sm font-semibold text-blue-900 mb-1">Why This Matters</p>
//                     <p className="text-sm text-blue-800 leading-relaxed">{error.explanation}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {feedback.grammarErrors.length > 3 && (
//           <button
//             onClick={() => setExpandedSections(prev => ({ ...prev, grammar: !prev.grammar }))}
//             className="w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-xl font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-gray-300"
//           >
//             {expandedSections.grammar ? (
//               <><ChevronUp className="w-5 h-5" /> Show Less</>
//             ) : (
//               <><ChevronDown className="w-5 h-5" /> View All {feedback.grammarErrors.length} Issues</>
//             )}
//           </button>
//         )}
//       </div>
//     );
//   };

//   const SpellingSection = () => {
//     if (!feedback.spellingErrors || feedback.spellingErrors.length === 0) {
//       return (
//         <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-xl border-2 border-emerald-200">
//           <div className="bg-emerald-100 p-3 rounded-lg">
//             <CheckCircle className="w-6 h-6 text-emerald-600" />
//           </div>
//           <div>
//             <p className="text-emerald-800 font-semibold">Perfect Spelling</p>
//             <p className="text-emerald-700 text-sm">No spelling errors detected.</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-3">
//           <div className="bg-amber-100 p-3 rounded-xl">
//             <Type className="w-6 h-6 text-amber-600" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">Spelling Corrections</h3>
//             <p className="text-gray-600 text-sm">{feedback.spellingErrors.length} words need attention</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {feedback.spellingErrors.slice(0, expandedSections.spelling ? undefined : 6).map((error, idx) => (
//             <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-5 hover:border-amber-300 transition-colors">
//               <div className="flex items-center justify-between mb-3">
//                 <span className={`text-xs font-bold px-3 py-1 rounded-full ${
//                   error.severity === 'severe' ? 'bg-red-100 text-red-800' :
//                   error.severity === 'moderate' ? 'bg-amber-100 text-amber-800' :
//                   'bg-blue-100 text-blue-800'
//                 }`}>
//                   {error.severity}
//                 </span>
//                 <Eye className="w-4 h-4 text-gray-400" />
//               </div>

//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <span className="text-red-600 line-through font-medium text-lg">{error.word}</span>
//                   <ArrowRight className="w-4 h-4 text-gray-400" />
//                   <span className="text-emerald-600 font-bold text-lg">{error.correction}</span>
//                 </div>

//                 {error.suggestions && error.suggestions.length > 1 && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
//                     <p className="text-xs font-medium text-blue-800 mb-1">Other suggestions:</p>
//                     <p className="text-sm text-blue-700">
//                       {error.suggestions.slice(1).join(', ')}
//                     </p>
//                   </div>
//                 )}

//                 {error.context && (
//                   <p className="text-xs text-gray-600 italic pt-2 border-t border-gray-200">
//                     Context: {error.context}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {feedback.spellingErrors.length > 6 && (
//           <button
//             onClick={() => setExpandedSections(prev => ({ ...prev, spelling: !prev.spelling }))}
//             className="w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-xl font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-gray-300"
//           >
//             {expandedSections.spelling ? 'Show Less' : `Show ${feedback.spellingErrors.length - 6} More`}
//           </button>
//         )}
//       </div>
//     );
//   };

//   const StyleSection = () => {
//     if (!feedback.styleIssues || feedback.styleIssues.length === 0) {
//       return (
//         <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-xl border-2 border-emerald-200">
//           <div className="bg-emerald-100 p-3 rounded-lg">
//             <CheckCircle className="w-6 h-6 text-emerald-600" />
//           </div>
//           <div>
//             <p className="text-emerald-800 font-semibold">Excellent Writing Style!</p>
//             <p className="text-emerald-700 text-sm">No major style issues detected.</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-4">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="bg-purple-100 p-3 rounded-xl">
//             <Sparkles className="w-6 h-6 text-purple-600" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">Writing Style Improvements</h3>
//             <p className="text-gray-600 text-sm">{feedback.styleIssues.length} suggestions</p>
//           </div>
//         </div>

//         {feedback.styleIssues.slice(0, expandedSections.style ? undefined : 5).map((issue, idx) => (
//           <div key={idx} className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5 hover:border-purple-300 transition-colors">
//             <div className="flex items-center gap-2 mb-3">
//               <span className="text-xs font-bold bg-purple-200 text-purple-800 px-3 py-1 rounded-full capitalize">
//                 {issue.type}
//               </span>
//               <Info className="w-4 h-4 text-purple-600" />
//             </div>

//             <div className="space-y-3">
//               <div className="bg-white border border-purple-200 rounded-lg p-3">
//                 <p className="text-sm text-gray-700">
//                   <strong className="text-purple-900">Found:</strong> <span className="font-mono text-red-600">"{issue.text}"</span>
//                 </p>
//               </div>

//               <div className="bg-white border border-purple-200 rounded-lg p-3">
//                 <p className="text-sm text-purple-800">
//                   <strong className="text-purple-900">💡 Tip:</strong> {issue.suggestion}
//                 </p>
//               </div>

//               {issue.context && (
//                 <p className="text-xs text-gray-600 italic">Context: {issue.context}</p>
//               )}
//             </div>
//           </div>
//         ))}

//         {feedback.styleIssues.length > 5 && (
//           <button
//             onClick={() => setExpandedSections(prev => ({ ...prev, style: !prev.style }))}
//             className="w-full py-4 bg-gray-50 hover:bg-gray-100 rounded-xl font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2 border-2 border-dashed border-gray-300"
//           >
//             {expandedSections.style ? 'Show Less' : `Show ${feedback.styleIssues.length - 5} More`}
//           </button>
//         )}
//       </div>
//     );
//   };

//   const VocabularySection = () => {
//     if (!feedback.vocabularyEnhancements || feedback.vocabularyEnhancements.length === 0) {
//       return (
//         <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
//           <div className="bg-blue-100 p-3 rounded-lg">
//             <Info className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <p className="text-blue-800 font-semibold">Good Vocabulary Usage</p>
//             <p className="text-blue-700 text-sm">No overused words detected.</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="space-y-4">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="bg-indigo-100 p-3 rounded-xl">
//             <BookText className="w-6 h-6 text-indigo-600" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">Vocabulary Enhancement</h3>
//             <p className="text-gray-600 text-sm">Suggestions to vary your word choice</p>
//           </div>
//         </div>

//         {feedback.vocabularyEnhancements.map((vocab, idx) => (
//           <div key={idx} className="bg-white border-2 border-indigo-200 rounded-xl p-6 hover:border-indigo-300 transition-colors">
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <AlertCircle className="w-5 h-5 text-orange-600" />
//                 <div>
//                   <p className="text-sm text-gray-600">
//                     <strong className="text-orange-600">Overused:</strong> <span className="font-mono text-lg">{vocab.original}</span>
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">{vocab.reason}</p>
//                 </div>
//               </div>

//               <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
//                 <p className="text-sm font-semibold text-indigo-900 mb-2">✨ Try these alternatives:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {vocab.alternatives.map((alt, i) => (
//                     <span key={i} className="bg-white text-indigo-700 px-3 py-1.5 rounded-lg border border-indigo-300 font-medium text-sm hover:bg-indigo-100 transition-colors cursor-pointer">
//                       {alt}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {vocab.context && (
//                 <p className="text-xs text-gray-600 italic pt-2 border-t border-gray-200">
//                   Example from your essay: {vocab.context}
//                 </p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const StructureSection = () => {
//     if (!feedback.sentenceStructure) return null;

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center gap-3">
//           <div className="bg-teal-100 p-3 rounded-xl">
//             <Layout className="w-6 h-6 text-teal-600" />
//           </div>
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">Sentence & Paragraph Structure</h3>
//             <p className="text-gray-600 text-sm">Analysis of your writing organization</p>
//           </div>
//         </div>

//         {/* Metrics */}
//         <div className="grid md:grid-cols-3 gap-4">
//           <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//             <p className="text-sm text-gray-600 mb-1">Avg Sentence Length</p>
//             <p className="text-2xl font-bold text-gray-900">{feedback.sentenceStructure.metrics.avgSentenceLength} words</p>
//           </div>
//           <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//             <p className="text-sm text-gray-600 mb-1">Sentence Variety</p>
//             <p className="text-2xl font-bold text-gray-900">{feedback.sentenceStructure.metrics.sentenceVariety}</p>
//           </div>
//           <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
//             <p className="text-sm text-gray-600 mb-1">Avg Paragraph Length</p>
//             <p className="text-2xl font-bold text-gray-900">{feedback.sentenceStructure.metrics.avgParagraphLength} words</p>
//           </div>
//         </div>

//         {/* Issues */}
//         {feedback.sentenceStructure.issues && feedback.sentenceStructure.issues.length > 0 && (
//           <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
//             <h4 className="font-bold text-orange-900 text-lg mb-3 flex items-center gap-2">
//               <AlertCircle className="w-5 h-5" />
//               Issues Detected
//             </h4>
//             <ul className="space-y-2">
//               {feedback.sentenceStructure.issues.map((issue, idx) => (
//                 <li key={idx} className="flex items-start gap-2 text-orange-800">
//                   <span className="text-orange-600 mt-1">•</span>
//                   <span>{issue}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Suggestions */}
//         {feedback.sentenceStructure.suggestions && feedback.sentenceStructure.suggestions.length > 0 && (
//           <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
//             <h4 className="font-bold text-teal-900 text-lg mb-3 flex items-center gap-2">
//               <Lightbulb className="w-5 h-5" />
//               Improvement Suggestions
//             </h4>
//             <ul className="space-y-3">
//               {feedback.sentenceStructure.suggestions.map((suggestion, idx) => (
//                 <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-teal-200">
//                   <div className="bg-teal-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                     {idx + 1}
//                   </div>
//                   <span className="text-teal-900">{suggestion}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const SummaryCard = () => (
//     <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
//       <div className="flex items-center gap-4 mb-6">
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
//           <Award className="w-7 h-7 text-white" />
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold text-gray-900">Assessment Summary</h3>
//           <p className="text-gray-600">Overall feedback and next steps</p>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="bg-white rounded-xl p-6 border-2 border-blue-100 shadow-sm">
//           <div className="flex items-start gap-3">
//             <BookMarked className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
//             <div>
//               <p className="text-blue-900 font-semibold text-lg mb-2">{feedback.summary.overallComment}</p>
//               <p className="text-gray-700 leading-relaxed">{feedback.summary.motivationalMessage}</p>
//             </div>
//           </div>

//           <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4 text-sm text-gray-600">
//             <span>📊 {feedback.summary.wordsAnalyzed} words analyzed</span>
//             <span>•</span>
//             <span>📝 {feedback.summary.sentencesAnalyzed} sentences</span>
//           </div>
//         </div>

//         {feedback.summary.keyTakeaways && feedback.summary.keyTakeaways.length > 0 && (
//           <div className="bg-white rounded-xl p-6 border-2 border-emerald-100">
//             <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
//               <ThumbsUp className="w-5 h-5 text-emerald-600" />
//               Key Insights
//             </h4>
//             <ul className="space-y-3">
//               {feedback.summary.keyTakeaways.map((takeaway, idx) => (
//                 <li key={idx} className="flex items-start gap-3 text-gray-700">
//                   <div className="bg-emerald-100 text-emerald-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
//                     {idx + 1}
//                   </div>
//                   <span>{takeaway}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {feedback.summary.nextSteps && feedback.summary.nextSteps.length > 0 && (
//           <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
//             <h4 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
//               <Sparkles className="w-5 h-5 text-purple-600" />
//               Action Steps
//             </h4>
//             <div className="space-y-3">
//               {feedback.summary.nextSteps.map((step, idx) => (
//                 <div key={idx} className="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border border-purple-200">
//                   <div className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                     {idx + 1}
//                   </div>
//                   <span className="text-gray-700">{step}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="bg-blue-600 p-2 rounded-lg">
//               <FileText className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900">Essay Feedback Report</h1>
//           </div>
//           <p className="text-gray-600 text-lg">Comprehensive analysis with actionable improvements</p>
//         </div>

//         <LevelUpdateBanner />
//         <ScoreDisplay />

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
//           <div className="border-b border-gray-200">
//             <div className="flex overflow-x-auto">
//               {[
//                 { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
//                 { id: 'grammar', label: 'Grammar', icon: <Edit3 className="w-4 h-4" />, count: feedback.grammarErrors?.length },
//                 { id: 'spelling', label: 'Spelling', icon: <Type className="w-4 h-4" />, count: feedback.spellingErrors?.length },
//                 { id: 'style', label: 'Style', icon: <Sparkles className="w-4 h-4" />, count: feedback.styleIssues?.length },
//                 { id: 'vocabulary', label: 'Vocabulary', icon: <BookText className="w-4 h-4" />, count: feedback.vocabularyEnhancements?.length },
//                 { id: 'structure', label: 'Structure', icon: <Layout className="w-4 h-4" /> }
//               ].map(tab => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-2 px-6 py-4 font-semibold capitalize transition-all whitespace-nowrap relative ${
//                     activeTab === tab.id
//                       ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
//                       : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   {tab.icon}
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
//                       activeTab === tab.id
//                         ? 'bg-blue-600 text-white'
//                         : 'bg-gray-200 text-gray-700'
//                     }`}>
//                       {tab.count}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="p-8">
//             {activeTab === 'overview' && <SummaryCard />}
//             {activeTab === 'grammar' && <GrammarSection />}
//             {activeTab === 'spelling' && <SpellingSection />}
//             {activeTab === 'style' && <StyleSection />}
//             {activeTab === 'vocabulary' && <VocabularySection />}
//             {activeTab === 'structure' && <StructureSection />}
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4">
//           <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
//             <MessageSquare className="w-5 h-5" />
//             Submit New Essay
//           </button>
//           <button className="px-8 bg-white hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-semibold border-2 border-gray-300 transition-all flex items-center gap-3">
//             <Download className="w-5 h-5" />
//             Export PDF
//           </button>
//           <button className="px-8 bg-white hover:bg-gray-50 text-gray-700 py-4 rounded-xl font-semibold border-2 border-gray-300 transition-all flex items-center gap-3">
//             <Share2 className="w-5 h-5" />
//             Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EssayFeedback;



// ----------------------------==================

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Award,
//   BookOpen,
//   Target,
//   Lightbulb,
//   Download,
//   Share2,
//   ChevronDown,
//   ChevronUp,
//   Star,
//   ThumbsUp,
//   MessageSquare,
//   CheckCircle,
//   XCircle,
//   AlertTriangle,
//   TrendingUp,
//   FileText,
//   Edit3,
//   Layout,
//   Type,
//   Zap,
//   AlertCircle,
//   GraduationCap,
//   Brain,
//   Clock,
//   BarChart3,
//   ArrowRight,
//   BookMarked,
//   PenTool,
//   Sparkles,
//   Eye,
//   TrendingDown,
//   Info,
//   BookText,
//   Crown,
//   Shield,
//   Zap as Lightning,
//   Users,
//   Rocket,
//   Medal,
// } from "lucide-react";

// const EssayFeedback = ({ feedbackData }) => {
//   const {
//     essay,
//     feedback,
//     studentLevel,
//     levelUpdate,
//     achievements,
//     specialRecognition,
//   } = feedbackData;
//   const { qualityBreakdown } = essay;

//   const [activeTab, setActiveTab] = useState("overview");
//   const [expandedSections, setExpandedSections] = useState({
//     grammar: false,
//     spelling: false,
//     style: false,
//     vocabulary: false,
//   });

//   // Animation variants
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

//   const cardVariants = {
//     hidden: { scale: 0.9, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//       },
//     },
//     hover: {
//       scale: 1.02,
//       y: -5,
//       transition: {
//         type: "spring",
//         stiffness: 400,
//       },
//     },
//   };

//   const getLetterGrade = (grade) => {
//     const grades = {
//       A: {
//         grade: "A",
//         color: "text-emerald-400",
//         bg: "bg-emerald-500/20",
//         border: "border-emerald-500/30",
//         gradient: "from-emerald-500 to-green-500",
//       },
//       B: {
//         grade: "B",
//         color: "text-blue-400",
//         bg: "bg-blue-500/20",
//         border: "border-blue-500/30",
//         gradient: "from-blue-500 to-cyan-500",
//       },
//       C: {
//         grade: "C",
//         color: "text-amber-400",
//         bg: "bg-amber-500/20",
//         border: "border-amber-500/30",
//         gradient: "from-amber-500 to-orange-500",
//       },
//       D: {
//         grade: "D",
//         color: "text-orange-400",
//         bg: "bg-orange-500/20",
//         border: "border-orange-500/30",
//         gradient: "from-orange-500 to-red-500",
//       },
//       F: {
//         grade: "F",
//         color: "text-red-400",
//         bg: "bg-red-500/20",
//         border: "border-red-500/30",
//         gradient: "from-red-500 to-pink-500",
//       },
//     };
//     return grades[grade] || grades["F"];
//   };

//   const letterGrade = getLetterGrade(essay.grade);

//   const getLevelBadge = () => {
//     const styles = {
//       beginner: {
//         bg: "bg-blue-500/20",
//         text: "text-blue-300",
//         border: "border-blue-500/30",
//         icon: <GraduationCap className="w-5 h-5" />,
//         gradient: "from-blue-500 to-cyan-500",
//       },
//       intermediate: {
//         bg: "bg-purple-500/20",
//         text: "text-purple-300",
//         border: "border-purple-500/30",
//         icon: <Brain className="w-5 h-5" />,
//         gradient: "from-purple-500 to-pink-500",
//       },
//       advanced: {
//         bg: "bg-emerald-500/20",
//         text: "text-emerald-300",
//         border: "border-emerald-500/30",
//         icon: <Zap className="w-5 h-5" />,
//         gradient: "from-emerald-500 to-teal-500",
//       },
//       elite: {
//         bg: "bg-amber-500/20",
//         text: "text-amber-300",
//         border: "border-amber-500/30",
//         icon: <Crown className="w-5 h-5" />,
//         gradient: "from-amber-500 to-yellow-500",
//       },
//     };
//     const style = styles[studentLevel] || styles.beginner;

//     return (
//       <motion.div
//         className={`${style.bg} ${style.text} ${style.border} px-6 py-3 rounded-2xl border-2 flex items-center gap-3 backdrop-blur-sm`}
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <motion.div
//           animate={{ rotate: [0, -10, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
//         >
//           {style.icon}
//         </motion.div>
//         <span className="font-bold capitalize text-sm">
//           {studentLevel} Writer
//         </span>
//       </motion.div>
//     );
//   };

//   const QualityChart = () => {
//     const qualities = [
//       {
//         name: "Grammar",
//         value: qualityBreakdown?.grammar,
//         icon: <Edit3 className="w-6 h-6" />,
//         color: "bg-blue-500",
//         gradient: "from-blue-500 to-cyan-500",
//       },
//       {
//         name: "Content",
//         value: qualityBreakdown?.content,
//         icon: <FileText className="w-6 h-6" />,
//         color: "bg-emerald-500",
//         gradient: "from-emerald-500 to-teal-500",
//       },
//       {
//         name: "Organization",
//         value: qualityBreakdown?.organization,
//         icon: <Layout className="w-6 h-6" />,
//         color: "bg-purple-500",
//         gradient: "from-purple-500 to-pink-500",
//       },
//       {
//         name: "Style",
//         value: qualityBreakdown?.style,
//         icon: <PenTool className="w-6 h-6" />,
//         color: "bg-amber-500",
//         gradient: "from-amber-500 to-orange-500",
//       },
//       {
//         name: "Mechanics",
//         value: qualityBreakdown?.mechanics,
//         icon: <Type className="w-6 h-6" />,
//         color: "bg-indigo-500",
//         gradient: "from-indigo-500 to-violet-500",
//       },
//     ];

//     return (
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
//         {qualities.map((q, index) => (
//           <motion.div
//             key={q.name}
//             className="text-center group"
//             variants={itemVariants}
//             initial="hidden"
//             animate="visible"
//             custom={index}
//           >
//             <motion.div
//               className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${q.gradient} text-white mb-4 shadow-lg`}
//               whileHover={{ scale: 1.1, rotate: 5 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {q.icon}
//             </motion.div>
//             <div className="text-sm font-bold text-white mb-3">{q.name}</div>
//             <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
//               <motion.div
//                 className={`absolute top-0 left-0 h-full bg-gradient-to-r ${q.gradient}`}
//                 initial={{ width: 0 }}
//                 animate={{ width: `${q.value * 100}%` }}
//                 transition={{
//                   duration: 1,
//                   delay: index * 0.1,
//                   ease: "easeOut",
//                 }}
//               />
//             </div>
//             <motion.div
//               className="text-lg font-black text-white mt-3"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: index * 0.1 + 0.5 }}
//             >
//               {Math.round(q.value * 100)}%
//             </motion.div>
//           </motion.div>
//         ))}
//       </div>
//     );
//   };

//   const LevelUpdateBanner = () => {
//     if (levelUpdate.action === "none") return null;

//     const styles = {
//       promote: {
//         bg: "bg-gradient-to-r from-emerald-500/10 to-green-500/10",
//         border: "border-emerald-500/30",
//         icon: <TrendingUp className="w-8 h-8 text-emerald-400" />,
//         title: "🎉 Level Up! Academic Achievement Unlocked!",
//         gradient: "from-emerald-500 to-green-500",
//       },
//       warn: {
//         bg: "bg-gradient-to-r from-amber-500/10 to-orange-500/10",
//         border: "border-amber-500/30",
//         icon: <AlertTriangle className="w-8 h-8 text-amber-400" />,
//         title: "⚠️ Attention Required",
//         gradient: "from-amber-500 to-orange-500",
//       },
//     };

//     const style = styles[levelUpdate.action];
//     if (!style) return null;

//     return (
//       <motion.div
//         className={`${style.bg} border-2 ${style.border} rounded-2xl p-8 mb-8 backdrop-blur-sm`}
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ type: "spring", stiffness: 200 }}
//       >
//         <div className="flex items-start gap-6">
//           <motion.div
//             className="bg-gray-800 p-4 rounded-2xl shadow-lg"
//             animate={{
//               rotate: [0, -5, 5, 0],
//               scale: [1, 1.1, 1],
//             }}
//             transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//           >
//             {style.icon}
//           </motion.div>
//           <div className="flex-1">
//             <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
//               {style.title}
//             </h3>
//             <p className="text-gray-300 leading-relaxed text-lg">
//               {levelUpdate.message}
//             </p>
//             {levelUpdate.previousLevel && levelUpdate.newLevel && (
//               <motion.div
//                 className="flex items-center gap-4 mt-4"
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <span className="text-gray-400 text-sm">Progress:</span>
//                 <span className="text-gray-300 font-semibold capitalize">
//                   {levelUpdate.previousLevel}
//                 </span>
//                 <ArrowRight className="w-4 h-4 text-gray-500" />
//                 <span className="font-bold text-white capitalize">
//                   {levelUpdate.newLevel}
//                 </span>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     );
//   };

//   const AchievementsSection = () => {
//     if (!achievements || achievements.length === 0) return null;

//     return (
//       <motion.div
//         className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 rounded-2xl p-8 mb-8 backdrop-blur-sm"
//         variants={itemVariants}
//       >
//         <div className="flex items-center gap-4 mb-6">
//           <motion.div
//             className="bg-purple-500/20 p-3 rounded-xl"
//             animate={{ rotate: [0, 10, -10, 0] }}
//             transition={{ duration: 3, repeat: Infinity }}
//           >
//             <Medal className="w-8 h-8 text-purple-400" />
//           </motion.div>
//           <div>
//             <h3 className="text-2xl font-bold text-white">
//               🏆 New Achievements Unlocked!
//             </h3>
//             <p className="text-purple-300">Your hard work is paying off!</p>
//           </div>
//         </div>
//         <div className="grid md:grid-cols-2 gap-4">
//           {achievements.map((achievement, index) => (
//             <motion.div
//               key={achievement.id}
//               className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4"
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: index * 0.2 }}
//             >
//               <span className="text-2xl">{achievement.icon}</span>
//               <div>
//                 <p className="font-bold text-white">{achievement.title}</p>
//                 <p className="text-sm text-purple-300">
//                   {achievement.description}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     );
//   };

//   const ScoreDisplay = () => (
//     <motion.div
//       className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-gray-700/50 shadow-2xl mb-8"
//       variants={cardVariants}
//       whileHover="hover"
//     >
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
//         <div className="flex-1">
//           <div className="flex items-center gap-4 mb-6">
//             <motion.div
//               className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               <BarChart3 className="w-8 h-8 text-white" />
//             </motion.div>
//             <div>
//               <p className="text-gray-400 text-sm font-medium">
//                 Academic Performance
//               </p>
//               <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                 Essay Assessment
//               </h2>
//             </div>
//           </div>

//           <div className="flex items-baseline gap-6 mb-6">
//             <div className="flex items-baseline gap-3">
//               <motion.span
//                 className="text-6xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{ type: "spring", stiffness: 200 }}
//               >
//                 {essay?.score?.toFixed(1)}
//               </motion.span>
//               <span className="text-2xl text-gray-400">/ {essay.maxScore}</span>
//             </div>
//             <motion.div
//               className={`${letterGrade.bg} ${letterGrade.color} ${letterGrade.border} px-6 py-3 rounded-2xl border-2 font-black text-xl backdrop-blur-sm`}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               Grade: {letterGrade.grade}
//             </motion.div>
//             {essay?.gradeDescription && (
//               <span className="text-gray-300 text-lg">
//                 {essay.gradeDescription}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-6">
//             <motion.div
//               className="flex items-center gap-3 text-amber-400"
//               whileHover={{ scale: 1.05 }}
//             >
//               <motion.div
//                 animate={{ rotate: [0, 180, 360] }}
//                 transition={{ duration: 3, repeat: Infinity }}
//               >
//                 <Star className="w-6 h-6 fill-current" />
//               </motion.div>
//               <span className="font-bold">
//                 {Math.round(essay.confidence * 100)}% Confidence
//               </span>
//             </motion.div>
//             <div className="w-px h-6 bg-gray-600"></div>
//             <div className="flex items-center gap-2 text-gray-400">
//               <Clock className="w-5 h-5" />
//               <span className="text-sm">Just now</span>
//             </div>
//           </div>
//         </div>

//         <motion.div className="mt-6 lg:mt-0" whileHover={{ scale: 1.05 }}>
//           {getLevelBadge()}
//         </motion.div>
//       </div>

//       <div className="border-t border-gray-700 pt-8">
//         <div className="flex items-center gap-3 mb-8">
//           <Target className="w-6 h-6 text-blue-400" />
//           <h3 className="text-xl font-bold text-white">Quality Metrics</h3>
//         </div>
//         <QualityChart />
//       </div>
//     </motion.div>
//   );

//   const GrammarSection = () => {
//     if (!feedback.grammarErrors || feedback.grammarErrors.length === 0) {
//       return (
//         <motion.div
//           className="flex items-center gap-4 p-8 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm"
//           variants={cardVariants}
//         >
//           <motion.div
//             className="bg-emerald-500/20 p-4 rounded-xl"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <CheckCircle className="w-8 h-8 text-emerald-400" />
//           </motion.div>
//           <div>
//             <p className="text-blue-300 font-bold text-lg">
//               Excellent Grammatical Accuracy
//             </p>
//             <p className="text-emerald-400 text-sm">
//               No grammatical errors detected.
//             </p>
//           </div>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div className="space-y-6" variants={containerVariants}>
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <motion.div
//               className="bg-blue-500/20 p-4 rounded-2xl"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               <Edit3 className="w-8 h-8 text-blue-400" />
//             </motion.div>
//             <div>
//               <h3 className="text-2xl font-bold text-white">
//                 Grammar & Syntax Analysis
//               </h3>
//               <p className="text-gray-400 text-lg">
//                 {feedback.grammarErrors.length} issues identified
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           {feedback.grammarErrors
//             .slice(0, expandedSections.grammar ? undefined : 3)
//             .map((error, idx) => (
//               <motion.div
//                 key={idx}
//                 className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
//                 variants={cardVariants}
//                 whileHover="hover"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3 flex-wrap">
//                     <span
//                       className={`text-xs font-bold px-4 py-2 rounded-full border ${
//                         error.severity === "severe"
//                           ? "bg-red-500/20 text-red-300 border-red-500/30"
//                           : error.severity === "moderate"
//                           ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
//                           : "bg-blue-500/20 text-blue-300 border-blue-500/30"
//                       }`}
//                     >
//                       {error.severity.charAt(0).toUpperCase() +
//                         error.severity.slice(1)}
//                     </span>
//                     <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-lg">
//                       Sentence #{error.sentenceNumber}
//                     </span>
//                     <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-lg capitalize">
//                       {error.type.replace(/_/g, " ")}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="grid lg:grid-cols-2 gap-6 mb-6">
//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <XCircle className="w-5 h-5 text-red-400" />
//                       <p className="text-sm font-bold text-gray-300">
//                         Original
//                       </p>
//                     </div>
//                     <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
//                       <p className="text-gray-200 italic leading-relaxed">
//                         "{error.sentence}"
//                       </p>
//                       <p className="text-red-300 font-semibold mt-3 text-sm">
//                         Issue:{" "}
//                         <span className="underline">{error.original}</span>
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-center gap-3">
//                       <CheckCircle className="w-5 h-5 text-emerald-400" />
//                       <p className="text-sm font-bold text-gray-300">
//                         Correction
//                       </p>
//                     </div>
//                     <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
//                       <p className="text-emerald-300 font-medium leading-relaxed">
//                         {error.correction}
//                       </p>
//                       <p className="text-emerald-400 text-sm mt-3">
//                         {error.error}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
//                   <div className="flex items-start gap-4">
//                     <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm font-bold text-blue-300 mb-2">
//                         Why This Matters
//                       </p>
//                       <p className="text-blue-200 leading-relaxed">
//                         {error.explanation}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//         </div>

//         {feedback.grammarErrors.length > 3 && (
//           <motion.button
//             onClick={() =>
//               setExpandedSections((prev) => ({
//                 ...prev,
//                 grammar: !prev.grammar,
//               }))
//             }
//             className="w-full py-5 bg-gray-700/50 hover:bg-gray-700 rounded-2xl font-bold text-gray-300 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-blue-500/50"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {expandedSections.grammar ? (
//               <>
//                 <ChevronUp className="w-5 h-5" /> Show Less
//               </>
//             ) : (
//               <>
//                 <ChevronDown className="w-5 h-5" /> View All{" "}
//                 {feedback.grammarErrors.length} Issues
//               </>
//             )}
//           </motion.button>
//         )}
//       </motion.div>
//     );
//   };

//   const StyleSection = () => {
//     if (!feedback.styleIssues || feedback.styleIssues.length === 0) {
//       return (
//         <motion.div
//           className="flex items-center gap-4 p-8 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm"
//           variants={cardVariants}
//         >
//           <motion.div
//             className="bg-emerald-500/20 p-4 rounded-xl"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <CheckCircle className="w-8 h-8 text-emerald-400" />
//           </motion.div>
//           <div>
//             <p className="text-emerald-300 font-bold text-lg">
//               Excellent Writing Style!
//             </p>
//             <p className="text-emerald-400 text-sm">
//               No major style issues detected.
//             </p>
//           </div>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div className="space-y-6" variants={containerVariants}>
//         <div className="flex items-center gap-4 mb-8">
//           <motion.div
//             className="bg-purple-500/20 p-4 rounded-2xl"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Sparkles className="w-8 h-8 text-purple-400" />
//           </motion.div>
//           <div>
//             <h3 className="text-2xl font-bold text-white">
//               Writing Style Improvements
//             </h3>
//             <p className="text-gray-400 text-lg">
//               {feedback.styleIssues.length} suggestions
//             </p>
//           </div>
//         </div>

//         {feedback.styleIssues
//           .slice(0, expandedSections.style ? undefined : 5)
//           .map((issue, idx) => (
//             <motion.div
//               key={idx}
//               className="bg-purple-500/10 border-2 border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm group"
//               variants={cardVariants}
//               whileHover="hover"
//               initial="hidden"
//               animate="visible"
//               custom={idx}
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 capitalize">
//                   {issue.type}
//                 </span>
//                 <motion.div
//                   whileHover={{ scale: 1.2 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <Info className="w-4 h-4 text-purple-400" />
//                 </motion.div>
//               </div>

//               <div className="space-y-4">
//                 <motion.div
//                   className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-4"
//                   whileHover={{ scale: 1.02 }}
//                 >
//                   <p className="text-sm text-gray-300">
//                     <strong className="text-purple-300">Found: </strong>
//                     <span className="font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded ml-2">
//                       "{issue.text}"
//                     </span>
//                   </p>
//                 </motion.div>

//                 <motion.div
//                   className="bg-gray-800/50 border border-purple-500/20 rounded-xl p-4"
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: idx * 0.1 + 0.2 }}
//                 >
//                   <p className="text-sm text-purple-200 flex items-start gap-3">
//                     <motion.span
//                       animate={{ rotate: [0, 10, -10, 0] }}
//                       transition={{ duration: 2, repeat: Infinity }}
//                     >
//                       💡
//                     </motion.span>
//                     <span>
//                       <strong className="text-purple-300">Suggestion: </strong>
//                       {issue.suggestion}
//                     </span>
//                   </p>
//                 </motion.div>

//                 {issue.context && (
//                   <motion.p
//                     className="text-xs text-gray-400 italic pt-3 border-t border-gray-600/50"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: idx * 0.1 + 0.3 }}
//                   >
//                     Context: {issue.context}
//                   </motion.p>
//                 )}
//               </div>
//             </motion.div>
//           ))}

//         {feedback.styleIssues.length > 5 && (
//           <motion.button
//             onClick={() =>
//               setExpandedSections((prev) => ({ ...prev, style: !prev.style }))
//             }
//             className="w-full py-5 bg-gray-700/50 hover:bg-gray-700 rounded-2xl font-bold text-gray-300 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-purple-500/50"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {expandedSections.style ? (
//               <>
//                 <ChevronUp className="w-5 h-5" /> Show Less
//               </>
//             ) : (
//               <>
//                 <ChevronDown className="w-5 h-5" /> Show{" "}
//                 {feedback.styleIssues.length - 5} More Style Suggestions
//               </>
//             )}
//           </motion.button>
//         )}
//       </motion.div>
//     );
//   };

//   const VocabularySection = () => {
//     if (
//       !feedback.vocabularyEnhancements ||
//       feedback.vocabularyEnhancements.length === 0
//     ) {
//       return (
//         <motion.div
//           className="flex items-center gap-4 p-8 bg-blue-500/10 rounded-2xl border-2 border-blue-500/30 backdrop-blur-sm"
//           variants={cardVariants}
//         >
//           <motion.div
//             className="bg-blue-500/20 p-4 rounded-xl"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <Info className="w-8 h-8 text-blue-400" />
//           </motion.div>
//           <div>
//             <p className="text-blue-300 font-bold text-lg">
//               Excellent Vocabulary Usage
//             </p>
//             <p className="text-blue-400 text-sm">No overused words detected.</p>
//           </div>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div className="space-y-6" variants={containerVariants}>
//         <div className="flex items-center gap-4 mb-8">
//           <motion.div
//             className="bg-indigo-500/20 p-4 rounded-2xl"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//           >
//             <BookText className="w-8 h-8 text-indigo-400" />
//           </motion.div>
//           <div>
//             <h3 className="text-2xl font-bold text-white">
//               Vocabulary Enhancement
//             </h3>
//             <p className="text-gray-400 text-lg">
//               Suggestions to vary your word choice
//             </p>
//           </div>
//         </div>

//         {feedback.vocabularyEnhancements.map((vocab, idx) => (
//           <motion.div
//             key={idx}
//             className="bg-gray-800/50 border-2 border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm group"
//             variants={cardVariants}
//             whileHover="hover"
//             initial="hidden"
//             animate="visible"
//             custom={idx}
//           >
//             <div className="space-y-6">
//               <motion.div
//                 className="flex items-center gap-4 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20"
//                 whileHover={{ x: 5 }}
//               >
//                 <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
//                 <div>
//                   <p className="text-sm text-gray-400">
//                     <strong className="text-orange-400">Overused Word:</strong>
//                   </p>
//                   <p className="font-mono text-orange-300 text-xl font-bold mt-1">
//                     {vocab.original}
//                   </p>
//                   <p className="text-sm text-orange-400/80 mt-2">
//                     {vocab.reason}
//                   </p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 + 0.2 }}
//               >
//                 <p className="text-lg font-bold text-indigo-300 mb-4 flex items-center gap-3">
//                   <Sparkles className="w-5 h-5" />✨ Try these alternatives:
//                 </p>
//                 <div className="flex flex-wrap gap-3">
//                   {vocab.alternatives.map((alt, i) => (
//                     <motion.span
//                       key={i}
//                       className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 px-4 py-3 rounded-xl border border-indigo-500/30 font-semibold text-sm hover:from-indigo-500/30 hover:to-purple-500/30 hover:text-white transition-all duration-300 cursor-pointer group/alt relative overflow-hidden"
//                       whileHover={{
//                         scale: 1.1,
//                         y: -2,
//                       }}
//                       whileTap={{ scale: 0.95 }}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: idx * 0.1 + i * 0.1 }}
//                     >
//                       <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover/alt:translate-x-[100%] transition-transform duration-700" />
//                       {alt}
//                     </motion.span>
//                   ))}
//                 </div>
//               </motion.div>

//               {vocab.context && (
//                 <motion.div
//                   className="pt-4 border-t border-gray-600/50"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: idx * 0.1 + 0.4 }}
//                 >
//                   <p className="text-sm text-gray-400 italic flex items-start gap-2">
//                     <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
//                     <span>
//                       Example from your essay:{" "}
//                       <span className="text-gray-300">{vocab.context}</span>
//                     </span>
//                   </p>
//                 </motion.div>
//               )}

//               {vocab.usageTip && (
//                 <motion.div
//                   className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: idx * 0.1 + 0.5 }}
//                 >
//                   <p className="text-sm font-medium text-emerald-300 mb-2 flex items-center gap-2">
//                     <Lightbulb className="w-4 h-4" />
//                     Usage Tip
//                   </p>
//                   <p className="text-emerald-200 text-sm">{vocab.usageTip}</p>
//                 </motion.div>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>
//     );
//   };

//   const SpellingSection = () => {
//     if (!feedback.spellingErrors || feedback.spellingErrors.length === 0) {
//       return (
//         <motion.div
//           className="flex items-center gap-4 p-8 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500/30 backdrop-blur-sm"
//           variants={cardVariants}
//         >
//           <motion.div
//             className="bg-emerald-500/20 p-4 rounded-xl"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <CheckCircle className="w-8 h-8 text-emerald-400" />
//           </motion.div>
//           <div>
//             <p className="text-emerald-300 font-bold text-lg">
//               Perfect Spelling
//             </p>
//             <p className="text-emerald-400 text-sm">
//               No spelling errors detected.
//             </p>
//           </div>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div className="space-y-6" variants={containerVariants}>
//         <div className="flex items-center gap-4 mb-8">
//           <motion.div
//             className="bg-amber-500/20 p-4 rounded-2xl"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Type className="w-8 h-8 text-amber-400" />
//           </motion.div>
//           <div>
//             <h3 className="text-2xl font-bold text-white">
//               Spelling Corrections
//             </h3>
//             <p className="text-gray-400 text-lg">
//               {feedback.spellingErrors.length} words need attention
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {feedback.spellingErrors
//             .slice(0, expandedSections.spelling ? undefined : 6)
//             .map((error, idx) => (
//               <motion.div
//                 key={idx}
//                 className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm group"
//                 variants={cardVariants}
//                 whileHover="hover"
//                 initial="hidden"
//                 animate="visible"
//                 custom={idx}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <span
//                     className={`text-xs font-bold px-4 py-2 rounded-full border ${
//                       error.severity === "severe"
//                         ? "bg-red-500/20 text-red-300 border-red-500/30"
//                         : error.severity === "moderate"
//                         ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
//                         : "bg-blue-500/20 text-blue-300 border-blue-500/30"
//                     }`}
//                   >
//                     {error.severity}
//                   </span>
//                   <motion.div
//                     whileHover={{ scale: 1.2, rotate: 180 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <Eye className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition-colors" />
//                   </motion.div>
//                 </div>

//                 <div className="space-y-4">
//                   <motion.div
//                     className="flex items-center gap-4 justify-center p-4 bg-gray-700/50 rounded-xl"
//                     whileHover={{ scale: 1.05 }}
//                   >
//                     <span className="text-red-400 line-through font-bold text-xl">
//                       {error.word}
//                     </span>
//                     <motion.div
//                       animate={{ x: [0, 5, 0] }}
//                       transition={{ duration: 1.5, repeat: Infinity }}
//                     >
//                       <ArrowRight className="w-5 h-5 text-gray-400" />
//                     </motion.div>
//                     <span className="text-emerald-400 font-black text-xl">
//                       {error.correction}
//                     </span>
//                   </motion.div>

//                   {error.suggestions && error.suggestions.length > 1 && (
//                     <motion.div
//                       className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       transition={{ delay: idx * 0.1 }}
//                     >
//                       <p className="text-xs font-medium text-blue-300 mb-2 flex items-center gap-2">
//                         <Lightbulb className="w-4 h-4" />
//                         Other suggestions:
//                       </p>
//                       <div className="flex flex-wrap gap-2">
//                         {error.suggestions.slice(1).map((suggestion, i) => (
//                           <motion.span
//                             key={i}
//                             className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-sm border border-blue-500/30 hover:bg-blue-500/30 transition-colors cursor-pointer"
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             {suggestion}
//                           </motion.span>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}

//                   {error.context && (
//                     <motion.p
//                       className="text-sm text-gray-400 italic pt-3 border-t border-gray-600/50 flex items-center gap-2"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: idx * 0.1 + 0.2 }}
//                     >
//                       <Info className="w-4 h-4" />
//                       Context: {error.context}
//                     </motion.p>
//                   )}
//                 </div>

//                 {error.rule && (
//                   <motion.div
//                     className="mt-4 pt-4 border-t border-gray-600/50"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: idx * 0.1 + 0.3 }}
//                   >
//                     <p className="text-xs text-gray-500 font-mono">
//                       Rule: {error.rule.replace(/_/g, " ")}
//                     </p>
//                   </motion.div>
//                 )}
//               </motion.div>
//             ))}
//         </div>

//         {feedback.spellingErrors.length > 6 && (
//           <motion.button
//             onClick={() =>
//               setExpandedSections((prev) => ({
//                 ...prev,
//                 spelling: !prev.spelling,
//               }))
//             }
//             className="w-full py-5 bg-gray-700/50 hover:bg-gray-700 rounded-2xl font-bold text-gray-300 transition-all duration-300 flex items-center justify-center gap-3 border-2 border-dashed border-gray-600 hover:border-amber-500/50"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             {expandedSections.spelling ? (
//               <>
//                 <ChevronUp className="w-5 h-5" /> Show Less
//               </>
//             ) : (
//               <>
//                 <ChevronDown className="w-5 h-5" /> Show{" "}
//                 {feedback.spellingErrors.length - 6} More Spelling Corrections
//               </>
//             )}
//           </motion.button>
//         )}
//       </motion.div>
//     );
//   };

//   const StructureSection = () => {
//     if (!feedback.sentenceStructure) {
//       return (
//         <motion.div
//           className="flex items-center gap-4 p-8 bg-teal-500/10 rounded-2xl border-2 border-teal-500/30 backdrop-blur-sm"
//           variants={cardVariants}
//         >
//           <motion.div
//             className="bg-teal-500/20 p-4 rounded-xl"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             <Layout className="w-8 h-8 text-teal-400" />
//           </motion.div>
//           <div>
//             <p className="text-teal-300 font-bold text-lg">
//               Structure Analysis Complete
//             </p>
//             <p className="text-teal-400 text-sm">
//               No structural issues detected.
//             </p>
//           </div>
//         </motion.div>
//       );
//     }

//     return (
//       <motion.div className="space-y-8" variants={containerVariants}>
//         <div className="flex items-center gap-4">
//           <motion.div
//             className="bg-teal-500/20 p-4 rounded-2xl"
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 0.5 }}
//           >
//             <Layout className="w-8 h-8 text-teal-400" />
//           </motion.div>
//           <div>
//             <h3 className="text-2xl font-bold text-white">
//               Sentence & Paragraph Structure
//             </h3>
//             <p className="text-gray-400 text-lg">
//               Analysis of your writing organization
//             </p>
//           </div>
//         </div>

//         {/* Metrics */}
//         <motion.div
//           className="grid md:grid-cols-3 gap-6"
//           variants={containerVariants}
//         >
//           {[
//             {
//               label: "Avg Sentence Length",
//               value: `${feedback.sentenceStructure.metrics.avgSentenceLength} words`,
//               icon: <Type className="w-6 h-6" />,
//               color: "from-blue-500 to-cyan-500",
//             },
//             {
//               label: "Sentence Variety",
//               value: feedback.sentenceStructure.metrics.sentenceVariety,
//               icon: <BarChart3 className="w-6 h-6" />,
//               color: "from-purple-500 to-pink-500",
//             },
//             {
//               label: "Avg Paragraph Length",
//               value: `${feedback.sentenceStructure.metrics.avgParagraphLength} words`,
//               icon: <FileText className="w-6 h-6" />,
//               color: "from-emerald-500 to-teal-500",
//             },
//           ].map((metric, idx) => (
//             <motion.div
//               key={metric.label}
//               className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 text-center group hover:border-gray-600 transition-all duration-300 backdrop-blur-sm"
//               variants={itemVariants}
//               whileHover={{
//                 scale: 1.05,
//                 y: -5,
//               }}
//               custom={idx}
//             >
//               <motion.div
//                 className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl mb-4 text-white`}
//                 whileHover={{ rotate: 360 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {metric.icon}
//               </motion.div>
//               <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
//               <p className="text-2xl font-black text-white">{metric.value}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Issues */}
//         {feedback.sentenceStructure.issues &&
//           feedback.sentenceStructure.issues.length > 0 && (
//             <motion.div
//               className="bg-orange-500/10 border-2 border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm"
//               variants={itemVariants}
//             >
//               <motion.h4
//                 className="font-bold text-orange-300 text-xl mb-6 flex items-center gap-3"
//                 whileHover={{ x: 5 }}
//               >
//                 <motion.div
//                   animate={{ rotate: [0, -10, 10, 0] }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                 >
//                   <AlertCircle className="w-6 h-6" />
//                 </motion.div>
//                 Structural Issues Detected
//               </motion.h4>
//               <ul className="space-y-3">
//                 {feedback.sentenceStructure.issues.map((issue, idx) => (
//                   <motion.li
//                     key={idx}
//                     className="flex items-start gap-3 text-orange-200 bg-orange-500/10 p-4 rounded-xl border border-orange-500/20"
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: idx * 0.1 }}
//                     whileHover={{ x: 5 }}
//                   >
//                     <motion.span
//                       className="text-orange-400 mt-1 flex-shrink-0"
//                       animate={{ scale: [1, 1.2, 1] }}
//                       transition={{
//                         duration: 1,
//                         repeat: Infinity,
//                         repeatDelay: 2,
//                       }}
//                     >
//                       •
//                     </motion.span>
//                     <span className="leading-relaxed">{issue}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           )}

//         {/* Suggestions */}
//         {feedback.sentenceStructure.suggestions &&
//           feedback.sentenceStructure.suggestions.length > 0 && (
//             <motion.div
//               className="bg-teal-500/10 border-2 border-teal-500/30 rounded-2xl p-8 backdrop-blur-sm"
//               variants={itemVariants}
//             >
//               <motion.h4
//                 className="font-bold text-teal-300 text-xl mb-6 flex items-center gap-3"
//                 whileHover={{ x: 5 }}
//               >
//                 <motion.div
//                   animate={{ rotate: [0, 10, -10, 0] }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                 >
//                   <Lightbulb className="w-6 h-6" />
//                 </motion.div>
//                 Improvement Suggestions
//               </motion.h4>
//               <ul className="space-y-4">
//                 {feedback.sentenceStructure.suggestions.map(
//                   (suggestion, idx) => (
//                     <motion.li
//                       key={idx}
//                       className="flex items-start gap-4 bg-teal-500/10 p-5 rounded-xl border border-teal-500/20 group hover:bg-teal-500/20 transition-all duration-300"
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: idx * 0.1 }}
//                       whileHover={{ scale: 1.02 }}
//                     >
//                       <motion.div
//                         className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0 mt-0.5 shadow-lg group-hover:scale-110 transition-transform"
//                         whileHover={{ rotate: 360 }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         {idx + 1}
//                       </motion.div>
//                       <span className="text-teal-100 leading-relaxed group-hover:text-white transition-colors">
//                         {suggestion}
//                       </span>
//                     </motion.li>
//                   )
//                 )}
//               </ul>
//             </motion.div>
//           )}

//         {/* Additional Structure Insights */}
//         {feedback.sentenceStructure.insights && (
//           <motion.div
//             className="bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm"
//             variants={itemVariants}
//           >
//             <motion.h4
//               className="font-bold text-blue-300 text-xl mb-6 flex items-center gap-3"
//               whileHover={{ x: 5 }}
//             >
//               <Brain className="w-6 h-6" />
//               Writing Structure Insights
//             </motion.h4>
//             <div className="grid md:grid-cols-2 gap-6">
//               {feedback.sentenceStructure.insights.map((insight, idx) => (
//                 <motion.div
//                   key={idx}
//                   className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/20"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: idx * 0.1 }}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   <p className="text-blue-200 text-sm leading-relaxed">
//                     {insight}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </motion.div>
//     );
//   };

//   // Similar enhanced components for Spelling, Style, Vocabulary, Structure sections...

//   const SummaryCard = () => (
//     <motion.div
//       className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border-2 border-blue-500/30 backdrop-blur-sm"
//       variants={cardVariants}
//       whileHover="hover"
//     >
//       <div className="flex items-center gap-6 mb-8">
//         <motion.div
//           className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-2xl"
//           whileHover={{ rotate: 360 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Award className="w-10 h-10 text-white" />
//         </motion.div>
//         <div>
//           <h3 className="text-3xl font-bold text-white">Assessment Summary</h3>
//           <p className="text-gray-400 text-lg">
//             Overall feedback and next steps
//           </p>
//         </div>
//       </div>

//       <div className="space-y-8">
//         <motion.div
//           className="bg-gray-800/50 rounded-2xl p-8 border-2 border-blue-500/20 shadow-lg"
//           variants={itemVariants}
//         >
//           <div className="flex items-start gap-4">
//             <BookMarked className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
//             <div>
//               <p className="text-blue-300 font-bold text-xl mb-4">
//                 {feedback.summary.overallComment}
//               </p>
//               <p className="text-gray-300 leading-relaxed text-lg">
//                 {feedback.summary.motivationalMessage}
//               </p>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-700 flex items-center gap-6 text-gray-400">
//             <span>📊 {feedback.summary.wordsAnalyzed} words analyzed</span>
//             <span>•</span>
//             <span>📝 {feedback.summary.sentencesAnalyzed} sentences</span>
//           </div>
//         </motion.div>

//         {feedback.summary.keyTakeaways &&
//           feedback.summary.keyTakeaways.length > 0 && (
//             <motion.div
//               className="bg-gray-800/50 rounded-2xl p-8 border-2 border-emerald-500/20"
//               variants={itemVariants}
//             >
//               <h4 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
//                 <ThumbsUp className="w-6 h-6 text-emerald-400" />
//                 Key Insights
//               </h4>
//               <ul className="space-y-4">
//                 {feedback.summary.keyTakeaways.map((takeaway, idx) => (
//                   <motion.li
//                     key={idx}
//                     className="flex items-start gap-4 text-gray-300 bg-gray-700/50 p-4 rounded-xl border border-gray-600"
//                     whileHover={{ x: 5 }}
//                   >
//                     <div className="bg-emerald-500/20 text-emerald-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
//                       {idx + 1}
//                     </div>
//                     <span className="text-lg">{takeaway}</span>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           )}

//         {feedback.summary.nextSteps &&
//           feedback.summary.nextSteps.length > 0 && (
//             <motion.div
//               className="bg-gray-800/50 rounded-2xl p-8 border-2 border-purple-500/20"
//               variants={itemVariants}
//             >
//               <h4 className="font-bold text-white text-2xl mb-6 flex items-center gap-3">
//                 <Rocket className="w-6 h-6 text-purple-400" />
//                 Action Steps
//               </h4>
//               <div className="space-y-4">
//                 {feedback.summary.nextSteps.map((step, idx) => (
//                   <motion.div
//                     key={idx}
//                     className="flex items-start gap-6 bg-purple-500/10 p-6 rounded-xl border border-purple-500/20 group hover:bg-purple-500/20 transition-all duration-300"
//                     whileHover={{ scale: 1.02 }}
//                   >
//                     <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 mt-0.5 shadow-lg">
//                       {idx + 1}
//                     </div>
//                     <span className="text-gray-300 text-lg group-hover:text-white transition-colors">
//                       {step}
//                     </span>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//       </div>
//     </motion.div>
//   );

//   const tabs = [
//     {
//       id: "overview",
//       label: "Overview",
//       icon: <BarChart3 className="w-5 h-5" />,
//     },
//     {
//       id: "grammar",
//       label: "Grammar",
//       icon: <Edit3 className="w-5 h-5" />,
//       count: feedback.grammarErrors?.length,
//     },
//     {
//       id: "spelling",
//       label: "Spelling",
//       icon: <Type className="w-5 h-5" />,
//       count: feedback.spellingErrors?.length,
//     },
//     {
//       id: "style",
//       label: "Style",
//       icon: <Sparkles className="w-5 h-5" />,
//       count: feedback.styleIssues?.length,
//     },
//     {
//       id: "vocabulary",
//       label: "Vocabulary",
//       icon: <BookText className="w-5 h-5" />,
//       count: feedback.vocabularyEnhancements?.length,
//     },
//     {
//       id: "structure",
//       label: "Structure",
//       icon: <Layout className="w-5 h-5" />,
//     },
//   ];

//   console.log("tab", activeTab)

//   return (
//     <motion.div
//       className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div className="mb-8" variants={itemVariants}>
//           <div className="flex items-center gap-4 mb-4">
//             <motion.div
//               className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl shadow-2xl"
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//             >
//               <FileText className="w-8 h-8 text-white" />
//             </motion.div>
//             <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//               Essay Feedback Report
//             </h1>
//           </div>
//           <p className="text-gray-400 text-xl">
//             Comprehensive analysis with actionable improvements
//           </p>
//         </motion.div>

//         <AnimatePresence>
//           {levelUpdate && <LevelUpdateBanner />}
//           {achievements && <AchievementsSection />}
//         </AnimatePresence>

//         <ScoreDisplay />

//         <motion.div
//           className="bg-gray-800/50 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-700/50 mb-8 overflow-hidden"
//           variants={itemVariants}
//         >
//           {/* Enhanced Tabs */}
//           <div className="border-b border-gray-700/50">
//             <div className="flex overflow-x-auto scrollbar-hide">
//               {tabs.map((tab) => (
//                 <motion.button
//                   key={tab.id}
//                   onClick={() => setActiveTab(tab.id)}
//                   className={`flex items-center gap-3 px-8 py-5 font-bold capitalize transition-all duration-300 whitespace-nowrap relative group ${
//                     activeTab === tab.id
//                       ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b-2 border-blue-400"
//                       : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
//                   }`}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <motion.div
//                     animate={{
//                       rotate: activeTab === tab.id ? [0, 10, -10, 0] : 0,
//                     }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     {tab.icon}
//                   </motion.div>
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <motion.span
//                       className={`ml-2 px-3 py-1 rounded-full text-xs font-black ${
//                         activeTab === tab.id
//                           ? "bg-blue-500 text-white"
//                           : "bg-gray-700 text-gray-300"
//                       }`}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                     >
//                       {tab.count}
//                     </motion.span>
//                   )}

//                   {/* Active indicator */}
//                   {activeTab === tab.id && (
//                     <motion.div
//                       className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
//                       layoutId="activeTab"
//                       initial={false}
//                       transition={{
//                         type: "spring",
//                         stiffness: 300,
//                         damping: 30,
//                       }}
//                     />
//                   )}
//                 </motion.button>
//               ))}
//             </div>
//           </div>

//           <motion.div
//             className="p-8"
//             key={activeTab}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//           >
//             {activeTab === "overview" && <SummaryCard />}
//             {activeTab === "grammar" && <GrammarSection />}
//             {activeTab === "spelling" && <SpellingSection />}
//             {activeTab === "style" && <StyleSection />}
//             {activeTab === "vocabulary" && <VocabularySection />}
//             {activeTab === "structure" && <StructureSection />}
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="flex flex-col sm:flex-row gap-4"
//           variants={containerVariants}
//         >
//           <motion.button
//             className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-4 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
//             <MessageSquare className="w-6 h-6" />
//             Submit New Essay
//           </motion.button>

//           <motion.button
//             className="px-8 bg-gray-700 hover:bg-gray-600 text-gray-200 py-5 rounded-2xl font-bold border-2 border-gray-600 transition-all flex items-center gap-3 group"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Download className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
//             Export PDF
//           </motion.button>

//           <motion.button
//             className="px-8 bg-gray-700 hover:bg-gray-600 text-gray-200 py-5 rounded-2xl font-bold border-2 border-gray-600 transition-all flex items-center gap-3 group"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Share2 className="w-5 h-5 group-hover:text-green-400 transition-colors" />
//             Share
//           </motion.button>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default EssayFeedback;


// ===============------------------

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
  Brain,
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
} from "lucide-react";

const EssayFeedback = ({ feedbackData }) => {
  const {
    essay,
    feedback,
    studentLevel,
    levelUpdate,
    achievements,
    specialRecognition,
  } = feedbackData;
  const qualityBreakdown = essay?.grading?.qualityScores || essay?.qualityBreakdown || {};

  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({
    grammar: false,
    spelling: false,
    style: false,
    vocabulary: false,
  });
  const [showOriginalText, setShowOriginalText] = useState(false);
  const [readProgress, setReadProgress] = useState({
    overview: false,
    grammar: false,
    spelling: false,
    style: false,
    vocabulary: false,
    structure: false,
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);

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
      setReadProgress(prev => {
        const newProgress = { ...prev, [section]: true };
        const completed = Object.values(newProgress).filter(Boolean).length;
        const total = Object.keys(newProgress).length;
        setCompletionPercentage(Math.round((completed / total) * 100));
        return newProgress;
      });
    }
  };

  // Mark current tab as read after viewing for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      markSectionAsRead(activeTab);
    }, 3000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const getLetterGrade = (grade) => {
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
      F: {
        grade: "F",
        color: "text-red-400",
        bg: "bg-red-500/20",
        border: "border-red-500/30",
        gradient: "from-red-500 to-pink-500",
      },
    };
    return grades[grade] || grades["F"];
  };

  const letterGrade = getLetterGrade(essay?.grading?.grade?.charAt(0) || essay?.grade?.charAt(0) || "F");

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
    const style = styles[studentLevel] || styles.beginner;

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
        value: qualityBreakdown?.grammar,
        icon: <Edit3 className="w-6 h-6" />,
        color: "bg-blue-500",
        gradient: "from-blue-500 to-cyan-500",
      },
      {
        name: "Content",
        value: qualityBreakdown?.content,
        icon: <FileText className="w-6 h-6" />,
        color: "bg-emerald-500",
        gradient: "from-emerald-500 to-teal-500",
      },
      {
        name: "Organization",
        value: qualityBreakdown?.organization,
        icon: <Layout className="w-6 h-6" />,
        color: "bg-purple-500",
        gradient: "from-purple-500 to-pink-500",
      },
      {
        name: "Style",
        value: qualityBreakdown?.style,
        icon: <PenTool className="w-6 h-6" />,
        color: "bg-amber-500",
        gradient: "from-amber-500 to-orange-500",
      },
      {
        name: "Mechanics",
        value: qualityBreakdown?.mechanics,
        icon: <Type className="w-6 h-6" />,
        color: "bg-indigo-500",
        gradient: "from-indigo-500 to-violet-500",
      },
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {qualities.map((q, index) => (
          <motion.div
            key={q.name}
            className="text-center group"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            <motion.div
              className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${q.gradient} text-white mb-4 shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              {q.icon}
            </motion.div>
            <div className="text-sm font-bold text-white mb-3">{q.name}</div>
            <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${q.gradient}`}
                initial={{ width: 0 }}
                animate={{ width: `${q.value * 100}%` }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              />
            </div>
            <motion.div
              className="text-lg font-black text-white mt-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {Math.round(q.value * 100)}%
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  const LevelUpdateBanner = () => {
    if (levelUpdate.action === "none") return null;

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
              {style.title}
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
    if (!achievements || achievements.length === 0) return null;

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
              🏆 New Achievements Unlocked!
            </h3>
            <p className="text-purple-300">Your hard work is paying off!</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
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
                {essay.fileType === "handwritten" ? "📝 Handwritten Submission" : "💻 Digital Submission"} • {essay.originalText.split(' ').length} words
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
                      <p className="font-semibold mb-1">Handwritten Text Recognition</p>
                      <p>Confidence: {essay.ocrConfidence}% - Some spelling errors may be due to handwriting recognition.</p>
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
                    <span>📊 {feedback.summary.wordsAnalyzed} words analyzed</span>
                    <span>•</span>
                    <span>📝 {feedback.summary.sentencesAnalyzed} sentences</span>
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

  const ScoreDisplay = () => (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-md rounded-3xl p-8 border-2 border-gray-700/50 shadow-2xl mb-8"
      variants={cardVariants}
      whileHover="hover"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <BarChart3 className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <p className="text-gray-400 text-sm font-medium">
                Academic Performance
              </p>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Essay Assessment
              </h2>
            </div>
          </div>

          <div className="flex items-baseline gap-6 mb-6">
            <div className="flex items-baseline gap-3">
              <motion.span
                className="text-6xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {essay?.grading?.finalScore || essay?.score || 0}
              </motion.span>
              <span className="text-2xl text-gray-400">/ 100</span>
            </div>
            <motion.div
              className={`${letterGrade.bg} ${letterGrade.color} ${letterGrade.border} px-6 py-3 rounded-2xl border-2 font-black text-xl backdrop-blur-sm`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Grade: {essay?.grading?.grade || essay?.grade || "N/A"}
            </motion.div>
            {(essay?.grading?.gradeDescription || essay?.gradeDescription) && (
              <span className="text-gray-300 text-lg">
                {essay?.grading?.gradeDescription || essay?.gradeDescription}
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <motion.div
              className="flex items-center gap-3 text-amber-400"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Star className="w-6 h-6 fill-current" />
              </motion.div>
              <span className="font-bold">
                {Math.round((essay?.grading?.confidence || essay?.confidence || 0) * 100)}% Confidence
              </span>
            </motion.div>
            <div className="w-px h-6 bg-gray-600"></div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-5 h-5" />
              <span className="text-sm">
                {new Date(essay?.gradedAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <motion.div className="mt-6 lg:mt-0" whileHover={{ scale: 1.05 }}>
          {getLevelBadge()}
        </motion.div>
      </div>

      <div className="border-t border-gray-700 pt-8">
        <div className="flex items-center gap-3 mb-8">
          <Target className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Quality Metrics</h3>
        </div>
        <QualityChart />
      </div>
    </motion.div>
  );

  const GrammarSection = () => {
    if (!feedback.grammarErrors || feedback.grammarErrors.length === 0) {
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
                {feedback.grammarErrors.length} issues identified
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {feedback.grammarErrors
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
                      {error.severity.charAt(0).toUpperCase() +
                        error.severity.slice(1)}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-700/50 px-3 py-1 rounded-lg">
                      Sentence #{error.sentenceNumber}
                    </span>
                    <span className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-lg capitalize">
                      {error.type.replace(/_/g, " ")}
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
                        "{error.sentence}"
                      </p>
                      <p className="text-red-300 font-semibold mt-3 text-sm">
                        Issue:{" "}
                        <span className="underline">{error.original}</span>
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
                        {error.correction}
                      </p>
                      <p className="text-emerald-400 text-sm mt-3">
                        {error.error}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-4">
                    <Lightbulb className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-blue-300 mb-2">
                        Why This Matters
                      </p>
                      <p className="text-blue-200 leading-relaxed">
                        {error.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {feedback.grammarErrors.length > 3 && (
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
                {feedback.grammarErrors.length} Issues
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
          variants={cardVariants}
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
    if (!feedback.spellingErrors || feedback.spellingErrors.length === 0) {
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
        </motion.div>
      );
    }

    // Smart correction suggestions based on context
    const getSmartCorrection = (error) => {
      const contextCorrections = {
        'pesple': 'people',
        'leaming': 'learning',
        'leam': 'learn',
        'busble': 'trouble',
        'ysur': 'your',
        'frionds': 'friends',
        'intemet': 'internet',
        'nour': 'now',
        'ysun': 'you',
        'computor': 'computer'
      };
      
      return contextCorrections[error.word.toLowerCase()] || error.correction;
    };

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
                {feedback.spellingErrors.length} words need attention
              </p>
            </div>
          </div>
          {essay?.fileType === "handwritten" && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Some may be OCR errors</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {feedback.spellingErrors
            .slice(0, expandedSections.spelling ? undefined : 6)
            .map((error, idx) => {
              const smartCorrection = getSmartCorrection(error);
              return (
                <motion.div
                  key={idx}
                  className="bg-gray-800/50 border-2 border-gray-700 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 backdrop-blur-sm group"
                  variants={cardVariants}
                  whileHover="hover"
                  initial="hidden"
                  animate="visible"
                  custom={idx}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-bold px-4 py-2 rounded-full border ${
                        error.severity === "severe" || error.severity === "high"
                          ? "bg-red-500/20 text-red-300 border-red-500/30"
                          : error.severity === "moderate"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      }`}
                    >
                      {error.severity}
                    </span>
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
                        {error.word}
                      </span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </motion.div>
                      <span className="text-emerald-400 font-black text-xl">
                        {smartCorrection}
                      </span>
                    </motion.div>

                    {error.context && (
                      <motion.p
                        className="text-sm text-gray-400 italic pt-3 border-t border-gray-600/50 flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 + 0.2 }}
                      >
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{error.context}</span>
                      </motion.p>
                    )}
                  </div>

                  {error.rule && (
                    <motion.div
                      className="mt-4 pt-4 border-t border-gray-600/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.3 }}
                    >
                      <p className="text-xs text-gray-500 font-mono">
                        Rule: {error.rule.replace(/_/g, " ")}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
        </div>

        {feedback.spellingErrors.length > 6 && (
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
                {feedback.spellingErrors.length - 6} More Spelling Corrections
              </>
            )}
          </motion.button>
        )}
      </motion.div>
    );
  };

  const StructureSection = () => {
    if (!feedback.sentenceStructure) {
      return (
        <motion.div
          className="flex items-center gap-4 p-8 bg-teal-500/10 rounded-2xl border-2 border-teal-500/30 backdrop-blur-sm"
          variants={cardVariants}
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
                <span className="text-gray-300 text-lg">{feedback.organizationFeedback.structure}</span>
                {feedback.organizationFeedback.organizationScore && (
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${feedback.organizationFeedback.organizationScore}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-purple-400 font-bold">{feedback.organizationFeedback.organizationScore}%</span>
                  </div>
                )}
              </div>

              {feedback.organizationFeedback.positives && feedback.organizationFeedback.positives.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-emerald-300 font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Strengths:
                  </p>
                  <ul className="space-y-2">
                    {feedback.organizationFeedback.positives.map((positive, idx) => (
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
                    ))}
                  </ul>
                </div>
              )}

              {feedback.organizationFeedback.suggestions && feedback.organizationFeedback.suggestions.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <p className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Suggestions for Improvement:
                  </p>
                  <ul className="space-y-2">
                    {feedback.organizationFeedback.suggestions.map((suggestion, idx) => (
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
                    ))}
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
              {feedback.contentFeedback.strengths && feedback.contentFeedback.strengths.length > 0 && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
                  <p className="text-emerald-300 font-bold text-lg mb-4 flex items-center gap-2">
                    <ThumbsUp className="w-5 h-5" />
                    What You Did Well
                  </p>
                  <ul className="space-y-3">
                    {feedback.contentFeedback.strengths.map((strength, idx) => (
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
                    ))}
                  </ul>
                </div>
              )}

              {feedback.contentFeedback.improvements && feedback.contentFeedback.improvements.length > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
                  <p className="text-amber-300 font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Areas to Improve
                  </p>
                  <ul className="space-y-3">
                    {feedback.contentFeedback.improvements.map((improvement, idx) => (
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
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Content Examples */}
            {feedback.contentFeedback.examples && feedback.contentFeedback.examples.length > 0 && (
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
                        <p className="text-blue-300 font-semibold">{example.type?.replace(/_/g, ' ').toUpperCase()}</p>
                        {example.before && example.after && (
                          <div className="space-y-3">
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                              <p className="text-xs text-red-400 font-semibold mb-1">Before:</p>
                              <p className="text-red-200 text-sm italic">"{example.before}"</p>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                              <p className="text-xs text-emerald-400 font-semibold mb-1">After:</p>
                              <p className="text-emerald-200 text-sm italic">"{example.after}"</p>
                            </div>
                          </div>
                        )}
                        {example.text && (
                          <p className="text-blue-200 text-sm italic">"{example.text}"</p>
                        )}
                        <p className="text-blue-100 text-sm">{example.explanation}</p>
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

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-5 h-5" />,
      badge: readProgress.overview ? "✓" : null,
    },
    {
      id: "grammar",
      label: "Grammar",
      icon: <Edit3 className="w-5 h-5" />,
      count: feedback.grammarErrors?.length,
      badge: readProgress.grammar ? "✓" : null,
    },
    {
      id: "spelling",
      label: "Spelling",
      icon: <Type className="w-5 h-5" />,
      count: feedback.spellingErrors?.length,
      badge: readProgress.spelling ? "✓" : null,
    },
    {
      id: "style",
      label: "Style",
      icon: <Sparkles className="w-5 h-5" />,
      count: feedback.styleIssues?.length,
      badge: readProgress.style ? "✓" : null,
    },
    {
      id: "vocabulary",
      label: "Vocabulary",
      icon: <BookText className="w-5 h-5" />,
      count: feedback.vocabularyEnhancements?.length,
      badge: readProgress.vocabulary ? "✓" : null,
    },
    {
      id: "structure",
      label: "Structure",
      icon: <Layout className="w-5 h-5" />,
      badge: readProgress.structure ? "✓" : null,
    },
  ];

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
              Essay Feedback Report
            </h1>
          </div>
          <p className="text-gray-400 text-xl">
            Comprehensive analysis with actionable improvements
          </p>
        </motion.div>

        <AnimatePresence>
          {levelUpdate && <LevelUpdateBanner />}
          {achievements && <AchievementsSection />}
        </AnimatePresence>

        <ProgressTracker />
        <OriginalTextSection />
        <ScoreDisplay />

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
            {activeTab === "overview" && <SummaryCard />}
            {activeTab === "grammar" && <GrammarSection />}
            {activeTab === "spelling" && <SpellingSection />}
            {activeTab === "style" && <StyleSection />}
            {activeTab === "vocabulary" && <VocabularySection />}
            {activeTab === "structure" && <StructureSection />}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          variants={containerVariants}
        >
          <motion.button
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-4 shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <MessageSquare className="w-6 h-6" />
            Submit New Essay
          </motion.button>

          <motion.button
            className="px-8 bg-gray-700 hover:bg-gray-600 text-gray-200 py-5 rounded-2xl font-bold border-2 border-gray-600 transition-all flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            Export PDF
          </motion.button>

          <motion.button
            className="px-8 bg-gray-700 hover:bg-gray-600 text-gray-200 py-5 rounded-2xl font-bold border-2 border-gray-600 transition-all flex items-center gap-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-5 h-5 group-hover:text-green-400 transition-colors" />
            Share
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EssayFeedback;