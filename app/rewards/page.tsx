import { ProtectedRoute } from "@/components/auth/protected-route"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Gift, Smartphone, BookOpen, Wifi, ArrowLeft, Crown, Medal, Award, Zap, Star } from "lucide-react"

function RewardsPageContent() {
  const userStats = {
    currentXP: 1247,
    currentTier: "Silver",
    nextTier: "Gold",
    xpToNextTier: 253,
    weeklyRank: 23,
    totalStudents: 10000,
  }

  const leaderboard = [
    { rank: 1, name: "Chioma O.", xp: 2450, avatar: "CO", tier: "Gold" },
    { rank: 2, name: "Kwame A.", xp: 2380, avatar: "KA", tier: "Gold" },
    { rank: 3, name: "Fatima M.", xp: 2250, avatar: "FM", tier: "Gold" },
    { rank: 4, name: "Thabo S.", xp: 2100, avatar: "TS", tier: "Silver" },
    { rank: 5, name: "Amara N.", xp: 1950, avatar: "AN", tier: "Silver" },
  ]

  const rewards = [
    {
      id: 1,
      name: "MTN Airtime",
      description: "₦500 airtime credit",
      cost: 500,
      icon: Smartphone,
      category: "airtime",
      available: true,
    },
    {
      id: 2,
      name: "Data Bundle",
      description: "2GB data for 30 days",
      cost: 800,
      icon: Wifi,
      category: "data",
      available: true,
    },
    {
      id: 3,
      name: "Study Guide eBook",
      description: "JAMB Mathematics Guide",
      cost: 300,
      icon: BookOpen,
      category: "ebooks",
      available: true,
    },
    {
      id: 4,
      name: "Premium Access",
      description: "1 month premium features",
      cost: 1200,
      icon: Crown,
      category: "premium",
      available: false,
    },
  ]

  const badges = [
    { name: "Study Streak", description: "7 days in a row", earned: true, icon: "🔥" },
    { name: "Quick Learner", description: "Complete 10 flashcards in 5 minutes", earned: true, icon: "⚡" },
    { name: "Night Owl", description: "Study after 10 PM", earned: false, icon: "🦉" },
    { name: "Early Bird", description: "Study before 6 AM", earned: false, icon: "🌅" },
    { name: "Subject Master", description: "Score 100% in any subject", earned: true, icon: "🎯" },
    { name: "Social Learner", description: "Share 5 study sessions", earned: false, icon: "👥" },
  ]

  const redemptionHistory = [
    { date: "2024-01-15", item: "MTN Airtime ₦500", cost: 500 },
    { date: "2024-01-10", item: "Study Guide eBook", cost: 300 },
    { date: "2024-01-05", item: "Data Bundle 1GB", cost: 400 },
  ]

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#0A2D58]/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-[#0A2D58]" />
              <span className="text-[#0A2D58] font-['Nunito']">Dashboard</span>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Image src="/skulwise-logo.png" alt="Skulwise Logo" width={40} height={40} className="rounded-lg" />
            <span className="text-[#0A2D58] font-bold text-lg font-['Montserrat']">Skulwise</span>
          </div>
          <div className="flex items-center space-x-2 bg-[#F8A938]/10 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-[#F8A938]" />
            <span className="font-bold text-[#0A2D58] font-['Inter']">{userStats.currentXP} XP</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A2D58] mb-4 font-['Poppins']">Rewards & Leaderboard</h1>
          <p className="text-base text-[#0A2D58]/70 font-['Nunito']">
            Earn XP, climb the ranks, and redeem amazing rewards!
          </p>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-5 bg-gradient-to-r from-[#F8A938] to-[#D44713] text-white text-center">
            <Trophy className="w-7 h-7 mx-auto mb-3" />
            <div className="text-xl font-bold mb-1 font-['Inter']">{userStats.currentXP}</div>
            <div className="text-xs opacity-90 font-['Nunito']">Total XP</div>
          </Card>

          <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10 text-center">
            <Medal className="w-7 h-7 mx-auto mb-3 text-[#F8A938]" />
            <div className="text-xl font-bold text-[#0A2D58] mb-1 font-['Inter']">#{userStats.weeklyRank}</div>
            <div className="text-xs text-[#0A2D58]/70 font-['Nunito']">Weekly Rank</div>
          </Card>

          <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10 text-center">
            <Crown className="w-7 h-7 mx-auto mb-3 text-[#0059C2]" />
            <div className="text-xl font-bold text-[#0A2D58] mb-1 font-['Inter']">{userStats.currentTier}</div>
            <div className="text-xs text-[#0A2D58]/70 font-['Nunito']">Current Tier</div>
          </Card>

          <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="text-center mb-3">
              <Star className="w-7 h-7 mx-auto text-[#D44713]" />
            </div>
            <div className="text-xs text-[#0A2D58]/70 mb-2 font-['Nunito']">
              {userStats.xpToNextTier} XP to {userStats.nextTier}
            </div>
            <Progress value={((userStats.currentXP % 1000) / 1000) * 100} className="h-1.5" />
          </Card>
        </div>

        <Tabs defaultValue="leaderboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-[#0A2D58]/10">
            <TabsTrigger
              value="leaderboard"
              className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white"
            >
              <Trophy className="w-3.5 h-3.5 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white">
              <Gift className="w-3.5 h-3.5 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="badges" className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white">
              <Award className="w-3.5 h-3.5 mr-2" />
              Badges
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-[#0059C2] data-[state=active]:text-white">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="mt-6">
            <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
              <h2 className="text-lg font-bold text-[#0A2D58] mb-6 font-['Poppins']">Weekly Leaderboard</h2>
              <div className="space-y-4">
                {leaderboard.map((student) => (
                  <div
                    key={student.rank}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F4F7FA] border border-[#0A2D58]/5"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                          student.rank === 1
                            ? "bg-[#F8A938]"
                            : student.rank === 2
                              ? "bg-[#D44713]"
                              : student.rank === 3
                                ? "bg-[#0059C2]"
                                : "bg-[#0A2D58]"
                        }`}
                      >
                        {student.rank}
                      </div>
                      <div className="w-9 h-9 bg-[#0059C2] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{student.avatar}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-[#0A2D58] font-['Nunito']">{student.name}</div>
                        <Badge variant="secondary" className="text-xxs">
                          {student.tier}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm text-[#0A2D58] font-['Inter']">{student.xp} XP</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
                  <div className="text-center">
                    <div className="bg-[#F8A938]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                      <reward.icon className="w-7 h-7 text-[#F8A938]" />
                    </div>
                    <h3 className="font-semibold text-base text-[#0A2D58] mb-2 font-['Poppins']">{reward.name}</h3>
                    <p className="text-xs text-[#0A2D58]/70 mb-4 font-['Nunito']">{reward.description}</p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <Zap className="w-3.5 h-3.5 text-[#F8A938]" />
                      <span className="font-semibold text-sm text-[#0A2D58] font-['Inter']">{reward.cost} XP</span>
                    </div>
                    <Button
                      className={`w-full py-2.5 text-sm ${
                        reward.available && userStats.currentXP >= reward.cost
                          ? "bg-[#0059C2] hover:bg-[#0A2D58] text-white"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!reward.available || userStats.currentXP < reward.cost}
                    >
                      {!reward.available
                        ? "Coming Soon"
                        : userStats.currentXP < reward.cost
                          ? "Not Enough XP"
                          : "Redeem"}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((badge, index) => (
                <Card
                  key={index}
                  className={`p-5 ${badge.earned ? "bg-white shadow-sm border border-[#F8A938]/30" : "bg-gray-50 border border-gray-200"}`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-3">{badge.icon}</div>
                    <h3
                      className={`font-semibold text-base mb-2 font-['Poppins'] ${badge.earned ? "text-[#0A2D58]" : "text-gray-500"}`}
                    >
                      {badge.name}
                    </h3>
                    <p className={`text-xs font-['Nunito'] ${badge.earned ? "text-[#0A2D58]/70" : "text-gray-400"}`}>
                      {badge.description}
                    </p>
                    {badge.earned && <Badge className="mt-2 bg-[#F8A938] text-black">Earned</Badge>}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="p-5 bg-white shadow-sm border border-[#0A2D58]/10">
              <h2 className="text-lg font-bold text-[#0A2D58] mb-6 font-['Poppins']">Redemption History</h2>
              <div className="space-y-4">
                {redemptionHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F4F7FA] border border-[#0A2D58]/5"
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#0A2D58] font-['Nunito']">{item.item}</div>
                      <div className="text-xs text-[#0A2D58]/70 font-['Nunito']">{item.date}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Zap className="w-3.5 h-3.5 text-[#F8A938]" />
                      <span className="font-semibold text-sm text-[#0A2D58] font-['Inter']">{item.cost} XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function RewardsPage() {
  return (
    <ProtectedRoute>
      <RewardsPageContent />
    </ProtectedRoute>
  )
}
