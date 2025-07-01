'use client';

import { useState, useEffect } from 'react';
import { 
  Brain, 
  Upload, 
  CreditCard, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target,
  Zap,
  PlayCircle,
  FileText,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import { calculateLevelProgress, getUserAchievements, UserXP } from '@/src/lib/xpSystem';

export default function Dashboard() {
  const [userStats, setUserStats] = useState<UserXP>({
    totalXP: 450,
    level: 3,
    currentLevelXP: 100,
    xpToNextLevel: 125,
    streak: 5,
    lastActivity: new Date(),
  });

  useEffect(() => {
    // Calculate current level progress
    const progress = calculateLevelProgress(userStats.totalXP);
    setUserStats(prev => ({
      ...prev,
      level: progress.level,
      currentLevelXP: progress.currentLevelXP,
      xpToNextLevel: progress.xpToNextLevel,
    }));
  }, [userStats.totalXP]);

  const achievements = getUserAchievements(userStats);
  const progressPercentage = (userStats.currentLevelXP / (userStats.currentLevelXP + userStats.xpToNextLevel)) * 100;

  const quickActions = [
    {
      icon: Upload,
      title: 'Upload Notes',
      description: 'Add new study materials',
      href: '/upload',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      icon: CreditCard,
      title: 'Study Flashcards',
      description: 'Review your flashcards',
      href: '/flashcards',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      icon: Trophy,
      title: 'View Rewards',
      description: 'Check achievements',
      href: '/rewards',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  const recentActivity = [
    {
      type: 'upload',
      title: 'Biology Chapter 12 Notes',
      time: '2 hours ago',
      xp: 50,
    },
    {
      type: 'flashcard',
      title: 'Physics Formulas Set',
      time: '1 day ago',
      xp: 30,
    },
    {
      type: 'study',
      title: 'Chemistry Review Session',
      time: '2 days ago',
      xp: 40,
    },
  ];

  const studySets = [
    {
      title: 'Biology Chapter 12',
      flashcards: 15,
      completed: 8,
      lastStudied: '2 hours ago',
    },
    {
      title: 'Physics Formulas',
      flashcards: 22,
      completed: 22,
      lastStudied: '1 day ago',
    },
    {
      title: 'Chemistry Reactions',
      flashcards: 18,
      completed: 5,
      lastStudied: '3 days ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600">
            Here's your learning progress and study materials.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Level</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.level}</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total XP</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalXP}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.streak} days</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Study Sets</p>
                  <p className="text-2xl font-bold text-gray-900">{studySets.length}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Level Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">
                      Level {userStats.level}
                    </span>
                    <span className="text-sm text-gray-500">
                      {userStats.xpToNextLevel} XP to next level
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{userStats.currentLevelXP} XP</span>
                    <span>{userStats.currentLevelXP + userStats.xpToNextLevel} XP</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        asChild
                        variant="outline"
                        className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-md transition-shadow"
                      >
                        <Link href={action.href}>
                          <div className={`p-3 rounded-lg ${action.color}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-900">{action.title}</p>
                            <p className="text-sm text-gray-500">{action.description}</p>
                          </div>
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Study Sets */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Your Study Sets</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studySets.map((set, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{set.title}</h3>
                        <Badge variant="secondary">
                          {set.completed}/{set.flashcards} cards
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Last studied: {set.lastStudied}</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/flashcards">
                            <PlayCircle className="w-4 h-4 mr-1" />
                            Study
                          </Link>
                        </Button>
                      </div>
                      <Progress 
                        value={(set.completed / set.flashcards) * 100} 
                        className="mt-2 h-2" 
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.title}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">{activity.time}</p>
                          <Badge variant="outline" className="text-xs">
                            +{activity.xp} XP
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.length > 0 ? (
                    achievements.map((achievement, index) => (
                      <Badge key={index} variant="default" className="w-full justify-center py-2">
                        {achievement}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center">
                      Keep studying to unlock achievements!
                    </p>
                  )}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link href="/rewards">View All Rewards</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
