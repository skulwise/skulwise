import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Book, 
  Upload, 
  CreditCard, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target,
  PlayCircle,
  FileText,
  Zap
} from 'lucide-react';

// Mock data - in a real app, this would come from a database
const mockStats = {
  totalXP: 1250,
  level: 8,
  streak: 12,
  notesProcessed: 24,
  flashcardsCompleted: 156,
  studyTime: 47, // hours
};

const mockRecentActivities = [
  {
    id: 1,
    type: 'upload',
    title: 'Uploaded Biology Chapter 3 Notes',
    timestamp: '2 hours ago',
    xp: 10,
  },
  {
    id: 2,
    type: 'flashcards',
    title: 'Completed Chemistry Flashcard Set',
    timestamp: '1 day ago',
    xp: 25,
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Unlocked "Week Warrior" Achievement',
    timestamp: '2 days ago',
    xp: 150,
  },
  {
    id: 4,
    type: 'study',
    title: 'Listened to Physics Audio Summary',
    timestamp: '3 days ago',
    xp: 8,
  },
];

const mockQuickActions = [
  {
    title: 'Upload New Notes',
    description: 'Transform your latest study notes',
    href: '/upload',
    icon: Upload,
    color: 'bg-blue-600',
  },
  {
    title: 'Study Flashcards',
    description: 'Review with interactive cards',
    href: '/flashcards',
    icon: CreditCard,
    color: 'bg-green-600',
  },
  {
    title: 'View Rewards',
    description: 'Check your achievements',
    href: '/rewards',
    icon: Trophy,
    color: 'bg-yellow-600',
  },
];

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const calculateLevelProgress = () => {
    const currentLevelXP = (mockStats.level - 1) * 100;
    const nextLevelXP = mockStats.level * 100;
    const progress = ((mockStats.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload size={16} className="text-blue-600" />;
      case 'flashcards':
        return <CreditCard size={16} className="text-green-600" />;
      case 'achievement':
        return <Trophy size={16} className="text-yellow-600" />;
      case 'study':
        return <PlayCircle size={16} className="text-purple-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Ready to continue your learning journey?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Level & XP */}
          <div className="skulwise-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Level</h3>
                <p className="text-2xl font-bold text-gray-900">{mockStats.level}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{mockStats.totalXP} XP</span>
                <span>{mockStats.level * 100} XP</span>
              </div>
              <div className="xp-bar">
                <div 
                  className="xp-progress" 
                  style={{ width: `${calculateLevelProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Study Streak */}
          <div className="skulwise-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Study Streak</h3>
                <p className="text-2xl font-bold text-gray-900">{mockStats.streak}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Keep it up! 🔥</p>
          </div>

          {/* Notes Processed */}
          <div className="skulwise-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Notes Processed</h3>
                <p className="text-2xl font-bold text-gray-900">{mockStats.notesProcessed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Book className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Total sets uploaded</p>
          </div>

          {/* Flashcards Completed */}
          <div className="skulwise-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Cards Studied</h3>
                <p className="text-2xl font-bold text-gray-900">{mockStats.flashcardsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-sm text-gray-600">Flashcards mastered</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="skulwise-card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockQuickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="text-white" size={20} />
                    </div>
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="skulwise-card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Study Progress</h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-600">Progress chart coming soon!</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Track your daily study habits and improvements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="skulwise-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {mockRecentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.timestamp} • +{activity.xp} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Goal */}
            <div className="skulwise-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Goal</h2>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 relative">
                  <div className="w-full h-full bg-gray-200 rounded-full"></div>
                  <div 
                    className="absolute top-0 left-0 w-full h-full bg-blue-600 rounded-full"
                    style={{
                      background: `conic-gradient(#3b82f6 ${75 * 3.6}deg, #e5e7eb 0deg)`
                    }}
                  ></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-900">75%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  3 of 4 flashcard sets completed
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Complete goal
                </button>
              </div>
            </div>

            {/* Study Time */}
            <div className="skulwise-card p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="mr-2" size={20} />
                Study Time
              </h2>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {mockStats.studyTime}h
                </p>
                <p className="text-sm text-gray-600">
                  Total this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}