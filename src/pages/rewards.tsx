import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getDefaultAchievements, type Achievement } from '../lib/xpSystem';
import { 
  Trophy, 
  Star, 
  Crown, 
  Zap, 
  Target, 
  TrendingUp,
  Gift,
  Lock,
  Calendar,
  Award
} from 'lucide-react';

// Mock user stats - in a real app, this would come from a database
const mockUserStats = {
  totalXP: 1250,
  level: 8,
  streak: 12,
  notesProcessed: 24,
  flashcardsCompleted: 156,
  lastActivityDate: new Date().toISOString().split('T')[0],
};

export default function RewardsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'leaderboard' | 'goals'>('achievements');

  useEffect(() => {
    // Initialize achievements
    const defaultAchievements = getDefaultAchievements();
    
    // Mock some unlocked achievements based on user stats
    const updatedAchievements = defaultAchievements.map(achievement => {
      switch (achievement.id) {
        case 'first_upload':
          return { ...achievement, unlocked: mockUserStats.notesProcessed >= 1, unlockedDate: '2024-01-15' };
        case 'week_streak':
          return { ...achievement, unlocked: mockUserStats.streak >= 7, unlockedDate: '2024-01-20' };
        case 'level_up':
          return { ...achievement, unlocked: mockUserStats.level >= 5, unlockedDate: '2024-01-25' };
        default:
          return achievement;
      }
    });
    
    setAchievements(updatedAchievements);
  }, []);

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const totalXPFromAchievements = unlockedAchievements.reduce((total, a) => total + a.xpReward, 0);

  const calculateLevelProgress = () => {
    const currentLevelXP = (mockUserStats.level - 1) * 100;
    const nextLevelXP = mockUserStats.level * 100;
    const progress = ((mockUserStats.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const mockLeaderboard = [
    { rank: 1, name: 'Alex Chen', level: 12, xp: 2450, avatar: '👨‍🎓' },
    { rank: 2, name: 'Sarah Johnson', level: 11, xp: 2180, avatar: '👩‍🎓' },
    { rank: 3, name: 'Mike Rodriguez', level: 10, xp: 1960, avatar: '👨‍💻' },
    { rank: 4, name: 'You', level: mockUserStats.level, xp: mockUserStats.totalXP, avatar: '🎓', isCurrentUser: true },
    { rank: 5, name: 'Emma Wilson', level: 7, xp: 1120, avatar: '👩‍🔬' },
  ];

  const mockGoals = [
    {
      id: 1,
      title: 'Daily Flashcard Master',
      description: 'Complete 20 flashcards today',
      progress: 15,
      target: 20,
      xpReward: 25,
      type: 'daily',
      icon: Target,
    },
    {
      id: 2,
      title: 'Weekly Note Processor',
      description: 'Process 5 sets of notes this week',
      progress: 3,
      target: 5,
      xpReward: 100,
      type: 'weekly',
      icon: Trophy,
    },
    {
      id: 3,
      title: 'Study Streak Champion',
      description: 'Maintain a 30-day study streak',
      progress: mockUserStats.streak,
      target: 30,
      xpReward: 500,
      type: 'challenge',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Rewards & Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your progress, unlock achievements, and compete with fellow learners.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="skulwise-card p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Crown className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockUserStats.level}</h3>
            <p className="text-sm text-gray-600">Current Level</p>
            <div className="mt-3">
              <div className="xp-bar">
                <div 
                  className="xp-progress" 
                  style={{ width: `${calculateLevelProgress()}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {mockUserStats.totalXP} / {mockUserStats.level * 100} XP
              </p>
            </div>
          </div>

          <div className="skulwise-card p-6 text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Trophy className="text-yellow-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{unlockedAchievements.length}</h3>
            <p className="text-sm text-gray-600">Achievements</p>
            <p className="text-xs text-gray-500 mt-1">
              {totalXPFromAchievements} XP earned
            </p>
          </div>

          <div className="skulwise-card p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockUserStats.streak}</h3>
            <p className="text-sm text-gray-600">Day Streak</p>
            <p className="text-xs text-gray-500 mt-1">Keep it going! 🔥</p>
          </div>

          <div className="skulwise-card p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockUserStats.totalXP}</h3>
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-xs text-gray-500 mt-1">All time earned</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setSelectedTab('achievements')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                selectedTab === 'achievements'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setSelectedTab('leaderboard')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                selectedTab === 'leaderboard'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setSelectedTab('goals')}
              className={`px-6 py-3 rounded-md font-medium transition-colors duration-200 ${
                selectedTab === 'goals'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Goals
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'achievements' && (
          <div>
            {/* Unlocked Achievements */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="mr-3 text-yellow-600" size={28} />
                Unlocked Achievements ({unlockedAchievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unlockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="skulwise-card p-6 achievement-badge">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                          +{achievement.xpReward} XP
                        </span>
                        {achievement.unlockedDate && (
                          <span className="text-gray-500">
                            {new Date(achievement.unlockedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Achievements */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lock className="mr-3 text-gray-400" size={28} />
                Locked Achievements ({lockedAchievements.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gray-100 border border-gray-200 rounded-lg p-6 opacity-60">
                    <div className="text-center">
                      <div className="text-4xl mb-3 grayscale">{achievement.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-medium text-sm">
                          +{achievement.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Weekly Leaderboard
            </h2>
            <div className="skulwise-card">
              <div className="divide-y divide-gray-200">
                {mockLeaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`p-6 flex items-center justify-between ${
                      user.isCurrentUser ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-500 text-white' :
                        user.rank === 2 ? 'bg-gray-400 text-white' :
                        user.rank === 3 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {user.rank}
                      </div>
                      <div className="text-2xl">{user.avatar}</div>
                      <div>
                        <h3 className={`font-semibold ${user.isCurrentUser ? 'text-blue-600' : 'text-gray-900'}`}>
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{user.xp.toLocaleString()} XP</p>
                      {user.rank <= 3 && (
                        <div className="flex items-center justify-end">
                          <Award className="w-4 h-4 text-yellow-500 mr-1" />
                          <span className="text-xs text-yellow-600">Top 3</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'goals' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Current Goals & Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockGoals.map((goal) => (
                <div key={goal.id} className="skulwise-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <goal.icon className="w-5 h-5 text-blue-600 mr-2" />
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.type === 'daily' ? 'bg-green-100 text-green-800' :
                          goal.type === 'weekly' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {goal.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {goal.description}
                      </p>
                    </div>
                    <Gift className="text-yellow-500" size={20} />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{goal.progress} / {goal.target}</span>
                      <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (goal.progress / goal.target) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-600">
                      +{goal.xpReward} XP reward
                    </span>
                    {goal.progress >= goal.target && (
                      <span className="text-sm font-medium text-green-600">
                        ✅ Completed!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}