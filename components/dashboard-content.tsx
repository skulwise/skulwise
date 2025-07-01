"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth/auth-provider"
import { useOfflineStorage } from "@/hooks/use-offline-storage"
import {
  BookOpen,
  Target,
  Zap,
  Calendar,
  Gift,
  Play,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  LogOut,
  User,
  Settings,
} from "lucide-react"

export default function DashboardContent() {
  const { user, signOut } = useAuth()
  const { isOnline, addOfflineAction } = useOfflineStorage()

  const todayTasks = [
    { id: 1, subject: "Mathematics", topic: "Algebraic Equations", duration: "30 min", completed: false },
    { id: 2, subject: "History", topic: "Pre-Colonial African Kingdoms", duration: "45 min", completed: true },
    { id: 3, subject: "Physics", topic: "Newtonian Mechanics", duration: "25 min", completed: false },
    {
      id: 4,
      subject: "Literature",
      topic: "Chinua Achebe's 'Things Fall Apart'",
      duration: "35 min",
      completed: false,
    },
  ]

  const weeklyProgress = [
    { day: "Mon", xp: 120 },
    { day: "Tue", xp: 85 },
    { day: "Wed", xp: 150 },
    { day: "Thu", xp: 95 },
    { day: "Fri", xp: 180 },
    { day: "Sat", xp: 0 },
    { day: "Sun", xp: 0 },
  ]

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Student"
  const userInitials = getUserInitials(userDisplayName)

  const handleStartStudySession = () => {
    if (!user?.id) {
      console.error("User not authenticated for study session.")
      return
    }

    const sessionData = {
      userId: user.id,
      subject: "General Study", // Placeholder, ideally selected by user
      topic: "Unspecified", // Placeholder
      duration: 0, // Will be updated when session ends
      xpEarned: 0, // Will be updated
      sessionType: "general",
      completedAt: Date.now(),
    }

    addOfflineAction("STUDY_SESSION", sessionData)
    console.log("Study session initiated. Check console for sync status.")
    // Navigate to a study page or start a timer
    // router.push("/study-session-page"); // Example navigation
  }

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#0A2D58]/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Image src="/skulwise-logo.png" alt="Skulwise Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-[#0A2D58] font-bold text-lg font-['Montserrat']">Skulwise</span>
            {!isOnline && (
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Offline
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-[#F8A938]/10 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-[#F8A938]" />
              <span className="font-bold text-[#0A2D58] font-['Inter']">1,247 XP</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-8 h-8 p-0 bg-[#0059C2] rounded-full hover:bg-[#0A2D58]">
                  <span className="text-white font-bold text-sm">{userInitials}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2 border-b">
                  <p className="font-medium text-[#0A2D58] font-['Nunito']">{userDisplayName}</p>
                  <p className="text-sm text-[#0A2D58]/70 font-['Nunito']">{user?.email}</p>
                  {user?.user_metadata?.university && (
                    <p className="text-xs text-[#0A2D58]/50 font-['Nunito']">{user.user_metadata.university}</p>
                  )}
                </div>
                <DropdownMenuItem className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0A2D58] mb-2 font-['Poppins']">
            Welcome back, {userDisplayName.split(" ")[0]}! 👋
          </h1>
          <p className="text-base text-[#0A2D58]/70 font-['Nunito']">
            Ready to continue your learning journey? You're doing great!
          </p>
          {user?.user_metadata?.country && (
            <Badge variant="secondary" className="mt-2 bg-[#F8A938]/10 text-[#0A2D58]">
              📍 {user.user_metadata.country}
            </Badge>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-5 bg-gradient-to-r from-[#0059C2] to-[#0A2D58] text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-['Nunito']">Today's XP</p>
                <p className="text-xl font-bold font-['Inter']">180</p>
              </div>
              <Zap className="w-7 h-7 text-[#F8A938]" />
            </div>
          </Card>

          <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#0A2D58]/70 text-sm font-['Nunito']">Study Streak</p>
                <p className="text-xl font-bold text-[#0A2D58] font-['Inter']">7 days</p>
              </div>
              <Target className="w-7 h-7 text-[#F8A938]" />
            </div>
          </Card>

          <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#0A2D58]/70 text-sm font-['Nunito']">Completed</p>
                <p className="text-xl font-bold text-[#0A2D58] font-['Inter']">12/16</p>
              </div>
              <CheckCircle className="w-7 h-7 text-[#D44713]" />
            </div>
          </Card>

          <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#0A2D58]/70 text-sm font-['Nunito']">Rank</p>
                <p className="text-xl font-bold text-[#0A2D58] font-['Inter']">#23</p>
              </div>
              <Award className="w-7 h-7 text-[#F8A938]" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-[#0A2D58] font-['Poppins']">Today's Study Tasks</h2>
                <Button
                  className="bg-[#F8A938] hover:bg-[#D44713] text-black font-bold px-4 py-2 text-sm"
                  onClick={handleStartStudySession}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Study Session
                </Button>
              </div>

              <div className="space-y-4">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded-lg border ${
                      task.completed ? "bg-green-50 border-green-200" : "bg-white border-[#0A2D58]/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {task.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-[#0A2D58]/50" />
                        )}
                        <div>
                          <h3 className="font-semibold text-sm text-[#0A2D58] font-['Nunito']">{task.subject}</h3>
                          <p className="text-xs text-[#0A2D58]/70 font-['Nunito']">{task.topic}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-[#F8A938]/10 text-[#0A2D58] text-xs">
                          {task.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Progress Tracker */}
          <div className="space-y-6">
            <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
              <h3 className="text-base font-bold text-[#0A2D58] mb-4 font-['Poppins']">Weekly Progress</h3>
              <div className="space-y-3">
                {weeklyProgress.map((day) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="text-xs text-[#0A2D58]/70 font-['Nunito']">{day.day}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={(day.xp / 200) * 100} className="w-16 h-1.5" />
                      <span className="text-xs font-bold text-[#0A2D58] font-['Inter']">{day.xp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-r from-[#F8A938] to-[#D44713] text-white">
              <div className="text-center">
                <TrendingUp className="w-7 h-7 mx-auto mb-3" />
                <h3 className="text-base font-bold mb-2 font-['Poppins']">Level Up!</h3>
                <p className="text-xs opacity-90 mb-4 font-['Nunito']">You're 53 XP away from Gold tier</p>
                <Progress value={85} className="mb-4" />
                <Link href="/rewards">
                  <Button className="bg-white text-[#0A2D58] hover:bg-white/90 px-4 py-2 text-sm">View Rewards</Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <Tabs defaultValue="flashcards" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-[#0A2D58]/10">
              <TabsTrigger
                value="flashcards"
                className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="calendar" className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white">
                <Gift className="w-4 h-4 mr-2" />
                Rewards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flashcards" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Mathematics", "Chemistry", "Physics", "Biology"].map((subject) => (
                  <Link key={subject} href="/flashcards">
                    <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer bg-white border border-[#0A2D58]/10">
                      <h4 className="font-semibold text-base text-[#0A2D58] font-['Poppins']">{subject}</h4>
                      <p className="text-xs text-[#0A2D58]/70 font-['Nunito']">24 cards available</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-6">
              <Card className="p-6 bg-white shadow-sm border border-[#0A2D58]/10">
                <p className="text-center text-[#0A2D58]/70 font-['Nunito']">Calendar view coming soon...</p>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="mt-6">
              <div className="text-center">
                <Link href="/rewards">
                  <Button className="bg-[#F8A938] hover:bg-[#D44713] text-black font-bold">View All Rewards</Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
