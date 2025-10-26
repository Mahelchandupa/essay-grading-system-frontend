import React from "react";
import { motion } from "framer-motion";
import { Award, Star, TrendingUp, Target, Zap, Sparkles, Trophy } from "lucide-react";

const AchievementsTab = ({ achievementsUnlocked, achievements, studentLevel }) => {
  console.log('achievements', achievements)
  if (!achievements) return null;


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

  const progressBarVariants = {
    initial: { width: 0 },
    animate: (percentage) => ({
      width: `${percentage}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    })
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        delay: 0.1
      }
    }
  };

  // Calculate total unlocked count
  const totalUnlocked = achievements.unlocked?.length || achievementsUnlocked?.length || 0;
  
  // Get newly unlocked achievements
  const newlyUnlocked = achievements.newAchievements || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        // variants={cardVariants}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30"
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Award className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-white">Writing Achievements</h3>
            <p className="text-purple-300">Track your progress and unlock new milestones</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <Star className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">{studentLevel || "Beginner"}</p>
            <p className="text-purple-300 text-sm">Current Level</p>
          </div>
          <div className="text-center p-4 bg-pink-500/10 rounded-xl border border-pink-500/20">
            <Zap className="w-5 h-5 text-pink-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">{totalUnlocked}</p>
            <p className="text-pink-300 text-sm">Badges Unlocked</p>
          </div>
          <div className="text-center p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <TrendingUp className="w-5 h-5 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">{achievements.totalPoints || 0}</p>
            <p className="text-blue-300 text-sm">Total Points</p>
          </div>
        </div>
      </motion.div>

      {/* Newly Unlocked Achievements */}
      {newlyUnlocked.length > 0 && (
        <motion.div
          variants={cardVariants}
          className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg"
            >
              <Trophy className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white">New Achievements Unlocked! 🎉</h3>
              <p className="text-amber-300">You've earned new badges in this essay</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newlyUnlocked.map((achievement, index) => (
              <motion.div
                key={achievement.badgeId}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index}
                className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/20 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="text-2xl flex-shrink-0"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-amber-200 text-xs mb-2">
                      {achievement.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        achievement.difficulty === 'Beginner' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : achievement.difficulty === 'Intermediate'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {achievement.difficulty}
                      </span>
                      <span className="text-amber-400 font-bold text-sm">
                        +{achievement.points}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All Unlocked Achievements */}
      {achievementsUnlocked && achievementsUnlocked.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            Your Achievement Collection
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {achievementsUnlocked.map((achievement, index) => (
              <motion.div
                key={achievement.badgeId}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700/50 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className="text-xl flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white text-sm">
                        {achievement.title}
                      </h4>
                      <span className="text-purple-400 font-bold text-sm ml-2">
                        +{achievement.points}
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs mb-2">
                      {achievement.description}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">
                        {achievement.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Progress to Next Achievements */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          Next Goals
        </h3>

        {/* Sample progress items - you can replace with actual progress data */}
        {[
          {
            badgeId: "ACHV_008",
            badge: {
              title: "Vocabulary Virtuoso",
              description: "Use 10+ advanced vocabulary words in your essay",
              difficulty: "Intermediate",
              icon: "📖"
            },
            percentage: 65,
            message: "7/10 advanced words used",
            points: 30
          },
          {
            badgeId: "ACHV_009",
            badge: {
              title: "Essay Expert",
              description: "Submit 5 essays with excellent structure",
              difficulty: "Advanced",
              icon: "✍️"
            },
            percentage: 40,
            message: "2/5 essays completed",
            points: 50
          }
        ].map((progress, index) => (
          <motion.div
            key={progress.badgeId}
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                  {progress.badge.icon}
                </div>
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-white text-lg">
                    {progress.badge.title}
                  </h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    progress.badge.difficulty === 'Beginner' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : progress.badge.difficulty === 'Intermediate'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {progress.badge.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">
                  {progress.badge.description}
                </p>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-semibold">
                      {progress.percentage}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      custom={progress.percentage}
                      variants={progressBarVariants}
                      initial="initial"
                      animate="animate"
                      className={`h-full rounded-full ${
                        progress.percentage >= 90 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : progress.percentage >= 70
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          : progress.percentage >= 50
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{progress.message}</span>
                    <span>{progress.points} points</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivation Section */}
      <motion.div
        variants={cardVariants}
        className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/30 text-center"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h4 className="text-lg font-bold text-emerald-300">Keep Going!</h4>
        </div>
        <p className="text-emerald-200">
          Every essay brings you closer to your next achievement. Stay consistent and watch your writing skills grow!
        </p>
      </motion.div>
    </div>
  );
};

export default AchievementsTab;