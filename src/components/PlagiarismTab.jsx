import React from "react";
import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertCircle, FileText, Search, BarChart3, BookOpen, Zap } from "lucide-react";

const PlagiarismTab = ({ plagiarism }) => {
  if (!plagiarism) return null;

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

  const getSimilarityColor = (percentage) => {
    if (percentage === 0) return "from-emerald-500 to-green-500";
    if (percentage <= 10) return "from-amber-500 to-orange-500";
    if (percentage <= 20) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-500";
  };

  const getSimilarityStatus = (percentage) => {
    if (percentage === 0) return { text: "Perfectly Original", color: "text-emerald-400" };
    if (percentage <= 10) return { text: "Mostly Original", color: "text-amber-400" };
    if (percentage <= 20) return { text: "Needs Review", color: "text-orange-400" };
    return { text: "High Similarity", color: "text-red-400" };
  };

  const similarityStatus = getSimilarityStatus(plagiarism.overallSimilarity);

  return (
    <div className="space-y-6">
      {/* Main Plagiarism Status Card */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className={`bg-gradient-to-br ${getSimilarityColor(plagiarism.overallSimilarity)}/10 rounded-2xl p-6 border-2 ${
          plagiarism.overallSimilarity === 0 
            ? "border-emerald-500/30" 
            : plagiarism.overallSimilarity <= 10
            ? "border-amber-500/30"
            : plagiarism.overallSimilarity <= 20
            ? "border-orange-500/30"
            : "border-red-500/30"
        }`}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`p-3 rounded-xl bg-gradient-to-r ${getSimilarityColor(plagiarism.overallSimilarity)}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            {plagiarism.overallSimilarity === 0 ? (
              <CheckCircle className="w-6 h-6 text-white" />
            ) : (
              <Shield className="w-6 h-6 text-white" />
            )}
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">Originality Report</h3>
            <p className={similarityStatus.color}>
              {similarityStatus.text} • {plagiarism.method?.replace(/_/g, " ")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-2">Similarity Score</p>
            <p className={`text-3xl font-bold ${similarityStatus.color}`}>
              {plagiarism.overallSimilarity}%
            </p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-2">Content Checked</p>
            <p className="text-3xl font-bold text-white">
              {plagiarism.checkedChunks}
            </p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-2">Confidence</p>
            <p className="text-3xl font-bold text-blue-400">
              {(plagiarism.confidence * 100).toFixed(0)}%
            </p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <p className="text-gray-300 text-sm mb-2">Status</p>
            <p className={`text-lg font-bold ${similarityStatus.color}`}>
              {plagiarism.isPlagiarized ? "Review Needed" : "All Clear"}
            </p>
          </div>
        </div>

        {/* Similarity Scale */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-300">
            <span>0% - Perfect</span>
            <span>10% - Good</span>
            <span>20% - Review</span>
            <span>20%+ - Concern</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${getSimilarityColor(plagiarism.overallSimilarity)}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(plagiarism.overallSimilarity, 100)}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Analysis Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sources & Matches */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-blue-400" />
            <h4 className="text-lg font-bold text-blue-300">Sources Analysis</h4>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <span className="text-blue-300">External Sources</span>
              <span className="text-white font-bold">
                {plagiarism.sources?.length || 0} found
              </span>
            </div>

            <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <span className="text-purple-300">Internal Matches</span>
              <span className="text-white font-bold">
                {plagiarism.internalMatches?.length || 0} found
              </span>
            </div>

            {plagiarism.details?.properCitations > 0 && (
              <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <span className="text-emerald-300">Proper Citations</span>
                <span className="text-white font-bold">
                  {plagiarism.details.properCitations}
                </span>
              </div>
            )}
          </div>

          {/* Sources List */}
          {plagiarism.sources && plagiarism.sources.length > 0 && (
            <div className="mt-4 space-y-2">
              <h5 className="font-semibold text-gray-300 text-sm">Matched Sources:</h5>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {plagiarism.sources.map((source, index) => (
                  <div key={index} className="p-2 bg-gray-700/50 rounded text-sm text-gray-300">
                    {source.url || "Unknown source"} ({source.similarity}% similar)
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Writing Statistics */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <h4 className="text-lg font-bold text-green-300">Writing Statistics</h4>
          </div>

          {plagiarism.details?.statistics && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-300 text-sm mb-1">Words</p>
                  <p className="text-white font-bold text-lg">
                    {plagiarism.details.statistics.totalWords}
                  </p>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-purple-300 text-sm mb-1">Sentences</p>
                  <p className="text-white font-bold text-lg">
                    {plagiarism.details.statistics.totalSentences}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Vocabulary Diversity</span>
                  <span className="text-amber-400 font-semibold">
                    {plagiarism.details.statistics.lexicalDiversity}%
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Reading Level</span>
                  <span className="text-blue-400 font-semibold">
                    Grade {plagiarism.details.statistics.readingLevel?.grade}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Avg Sentence Length</span>
                  <span className="text-green-400 font-semibold">
                    {plagiarism.details.statistics.avgSentenceLength} words
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-amber-400" />
          <h4 className="text-lg font-bold text-amber-300">Recommendations</h4>
        </div>

        <div className="space-y-3">
          {plagiarism.overallSimilarity === 0 ? (
            <div className="flex items-start gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-emerald-300 font-semibold">Excellent Originality!</p>
                <p className="text-emerald-200 text-sm">
                  Your essay shows complete originality. Continue writing in your own voice and properly citing any references.
                </p>
              </div>
            </div>
          ) : plagiarism.overallSimilarity <= 10 ? (
            <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-amber-300 font-semibold">Good Originality</p>
                <p className="text-amber-200 text-sm">
                  Your work is mostly original. Consider rephrasing any commonly used phrases and ensure all sources are properly cited.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-300 font-semibold">Review Recommended</p>
                <p className="text-red-200 text-sm">
                  Consider rephrasing sections with high similarity and ensure proper citation of all referenced material.
                </p>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h5 className="font-semibold text-amber-300 text-sm">Best Practices:</h5>
              <ul className="text-amber-200 text-sm space-y-1">
                <li>• Always cite your sources</li>
                <li>• Use your own words and phrasing</li>
                <li>• Paraphrase instead of copying</li>
                <li>• Use quotation marks for direct quotes</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-semibold text-blue-300 text-sm">Tips for Improvement:</h5>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Read and understand, then write in your own words</li>
                <li>• Use multiple sources for research</li>
                <li>• Take notes in your own language</li>
                <li>• Use plagiarism checkers before submitting</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Technical Details */}
      <motion.div
        variants={cardVariants}
        className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-gray-400" />
          <h4 className="text-lg font-bold text-gray-300">Technical Details</h4>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Detection Method:</span>
            <span className="text-white ml-2">{plagiarism.method || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-400">Analysis Date:</span>
            <span className="text-white ml-2">{new Date().toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-gray-400">Database Size:</span>
            <span className="text-white ml-2">
              {plagiarism.checkedChunks || "N/A"} chunks analyzed
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PlagiarismTab;