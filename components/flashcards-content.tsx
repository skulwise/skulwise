"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth/auth-provider"
import { useOfflineStorage } from "@/hooks/use-offline-storage"
import { RotateCcw, Plus, ArrowLeft, CheckCircle, X, BookOpen, Target, Zap, LogOut, User, Settings } from "lucide-react"

export default function FlashcardsContent() {
  const { user, signOut } = useAuth()
  const { isOnline, addOfflineAction } = useOfflineStorage()
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [studiedCards, setStudiedCards] = useState(0)

  const flashcards = [
    {
      id: "card-1", // Added unique IDs for better tracking
      subject: "Chemistry",
      topic: "Organic Compounds",
      question: "What is the general formula for alkanes?",
      answer:
        "CₙH₂ₙ₊₂ - Alkanes are saturated hydrocarbons with single bonds only. The simplest alkane is methane (CH₄).",
      difficulty: "Easy",
    },
    {
      id: "card-2",
      subject: "Chemistry",
      topic: "Organic Compounds",
      question: "Define functional groups and give three examples.",
      answer:
        "Functional groups are specific arrangements of atoms that give organic compounds their characteristic properties. Examples: -OH (hydroxyl), -COOH (carboxyl), -NH₂ (amino).",
      difficulty: "Medium",
    },
    {
      id: "card-3",
      subject: "Chemistry",
      topic: "Organic Compounds",
      question: "What is the difference between saturated and unsaturated hydrocarbons?",
      answer:
        "Saturated hydrocarbons contain only single bonds (alkanes), while unsaturated hydrocarbons contain double or triple bonds (alkenes and alkynes).",
      difficulty: "Medium",
    },
  ]

  const handleCardAction = (actionType: "got-it" | "review") => {
    if (!user?.id) {
      console.error("User not authenticated for flashcard action.")
      return
    }

    const currentFlashcard = flashcards[currentCard]
    if (actionType === "got-it") {
      setStudiedCards((prev) => prev + 1)
    }

    // Add flashcard progress to offline queue
    addOfflineAction("FLASHCARD_PROGRESS", {
      userId: user.id,
      cardId: currentFlashcard.id,
      actionType: actionType,
      timestamp: Date.now(),
    })

    if (currentCard < flashcards.length - 1) {
      setCurrentCard((prev) => prev + 1)
      setIsFlipped(false)
    } else {
      // End of cards
      setCurrentCard(0)
      setIsFlipped(false)
      console.log("Flashcard session completed. Syncing progress.")
    }
  }

  const progress = ((currentCard + 1) / flashcards.length) * 100

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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A2D58] mb-4 font-['Poppins']">Study Flashcards</h1>
          <div className="flex items-center justify-center space-x-6 text-xs text-[#0A2D58]/70">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-['Nunito']">Chemistry - Organic Compounds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-3.5 h-3.5" />
              <span className="font-['Nunito']">{studiedCards} cards mastered</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-[#0A2D58]/70 mb-2 font-['Nunito']">
            <span>Progress</span>
            <span>
              {currentCard + 1} of {flashcards.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="mb-8">
          <div className="relative w-full h-80 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
              {/* Front of card */}
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-[#0059C2] to-[#0A2D58] text-white p-6 flex flex-col justify-center">
                <div className="text-center">
                  <Badge className="mb-3 bg-[#F8A938] text-black">{flashcards[currentCard].difficulty}</Badge>
                  <h2 className="text-xl font-bold mb-6 font-['Poppins']">Question</h2>
                  <p className="text-lg leading-relaxed font-['Nunito']">{flashcards[currentCard].question}</p>
                  <p className="text-xs mt-6 opacity-75 font-['Nunito']">Click to reveal answer</p>
                </div>
              </Card>

              {/* Back of card */}
              <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-[#F8A938] to-[#D44713] text-white p-6 flex flex-col justify-center">
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-6 font-['Poppins']">Answer</h2>
                  <p className="text-base leading-relaxed font-['Nunito']">{flashcards[currentCard].answer}</p>
                  <p className="text-xs mt-6 opacity-75 font-['Nunito']">How well did you know this?</p>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            variant="outline"
            size="default"
            onClick={() => handleCardAction("review")}
            className="border-[#D44713] text-[#D44713] hover:bg-[#D44713] hover:text-white px-6"
            disabled={!isFlipped}
          >
            <X className="w-4 h-4 mr-2" />
            Review Again
          </Button>

          <Button
            size="default"
            onClick={() => handleCardAction("got-it")}
            className="bg-[#0059C2] hover:bg-[#0A2D58] text-white px-6"
            disabled={!isFlipped}
          >
            <CheckCircle className="w-4 h-4 mr-2" />I Got This!
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" onClick={() => setIsFlipped(!isFlipped)} className="text-[#0A2D58]">
            <RotateCcw className="w-3.5 h-3.5 mr-2" />
            Flip Card
          </Button>

          <Button variant="ghost" className="text-[#0A2D58]">
            <Plus className="w-3.5 h-3.5 mr-2" />
            Add New Card
          </Button>
        </div>

        {/* Study Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-5 text-center bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="text-xl font-bold text-[#0059C2] mb-2 font-['Inter']">{studiedCards}</div>
            <p className="text-[#0A2D58]/60 text-sm font-['Nunito']">Cards Mastered</p>
          </Card>

          <Card className="p-5 text-center bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="text-xl font-bold text-[#F8A938] mb-2 font-['Inter']">
              {flashcards.length - studiedCards}
            </div>
            <p className="text-[#0A2D58]/60 text-sm font-['Nunito']">Cards Remaining</p>
          </Card>

          <Card className="p-5 text-center bg-white shadow-sm border border-[#0A2D58]/10">
            <div className="text-xl font-bold text-[#D44713] mb-2 font-['Inter']">
              {Math.round((studiedCards / flashcards.length) * 100)}%
            </div>
            <p className="text-[#0A2D58]/60 text-sm font-['Nunito']">Completion Rate</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
