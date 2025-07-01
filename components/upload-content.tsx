"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth/auth-provider"
import {
  Upload,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  FileText,
  ArrowLeft,
  LogOut,
  User,
  Settings,
} from "lucide-react"

export default function UploadContent() {
  const { user, signOut } = useAuth()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(45)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file.name)
    }
  }

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
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0A2D58] mb-4 font-['Poppins']">Notes to Audiobook</h1>
          <p className="text-base text-[#0A2D58]/70 font-['Nunito']">
            Upload your notes and let AI convert them into engaging audiobooks, making learning accessible and
            enjoyable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="p-6 bg-white shadow-lg border border-[#0A2D58]/10">
            <h2 className="text-xl font-bold text-[#0A2D58] mb-6 font-['Poppins']">Upload Your Notes</h2>

            <div className="border-2 border-dashed border-[#0059C2]/20 rounded-xl p-6 text-center mb-6 hover:border-[#0059C2] transition-colors">
              <Upload className="w-10 h-10 text-[#0059C2] mx-auto mb-4" />
              <p className="text-[#0A2D58]/80 mb-3 font-['Nunito']">
                Drag and drop your files here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="bg-[#0059C2] hover:bg-[#0A2D58] text-white py-2.5">Choose Files</Button>
              </label>
              <p className="text-xs text-[#0A2D58]/50 mt-2 font-['Nunito']">Supports PDF, DOC, DOCX (Max 10MB)</p>
            </div>

            {uploadedFile && (
              <div className="bg-[#F8A938]/5 border border-[#F8A938]/20 rounded-lg p-3 mb-6">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-[#F8A938]" />
                  <span className="text-[#0A2D58]/90 text-sm font-['Nunito']">{uploadedFile}</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#0A2D58] mb-2 font-['Nunito']">Voice Type</label>
                <Select>
                  <SelectTrigger className="border-[#0A2D58]/10">
                    <SelectValue placeholder="Select voice type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male-nigerian">Male - Nigerian Accent</SelectItem>
                    <SelectItem value="female-nigerian">Female - Nigerian Accent</SelectItem>
                    <SelectItem value="male-kenyan">Male - Kenyan Accent</SelectItem>
                    <SelectItem value="female-kenyan">Female - Kenyan Accent</SelectItem>
                    <SelectItem value="male-south-african">Male - South African Accent</SelectItem>
                    <SelectItem value="female-south-african">Female - South African Accent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-[#F8A938] hover:bg-[#D44713] text-black font-bold py-2.5"
                disabled={!uploadedFile}
              >
                Convert to Audiobook
              </Button>
            </div>
          </Card>

          {/* Audio Player Section */}
          <Card className="p-6 bg-white shadow-lg border border-[#0A2D58]/10">
            <h2 className="text-xl font-bold text-[#0A2D58] mb-6 font-['Poppins']">Audio Player</h2>

            <div className="bg-gradient-to-r from-[#0059C2] to-[#0A2D58] rounded-xl p-5 text-white mb-6">
              <h3 className="font-bold text-base mb-2 font-['Poppins']">Introduction to Organic Chemistry</h3>
              <p className="text-sm opacity-90 font-['Nunito']">Chapter 1: Basic Concepts and Nomenclature</p>
            </div>

            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[#0A2D58]/70 font-['Nunito']">
                  <span>2:34</span>
                  <span>5:47</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center space-x-6">
                <Button variant="ghost" size="icon" className="text-[#0A2D58]">
                  <SkipBack className="w-6 h-6" />
                </Button>

                <Button
                  size="icon"
                  className="w-14 h-14 bg-[#0059C2] hover:bg-[#0A2D58] text-white rounded-full"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
                </Button>

                <Button variant="ghost" size="icon" className="text-[#0A2D58]">
                  <SkipForward className="w-6 h-6" />
                </Button>
              </div>

              {/* Speed and Volume Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-[#0A2D58]" />
                  <Progress value={75} className="w-20 h-2" />
                </div>

                <Select>
                  <SelectTrigger className="w-20 border-[#0A2D58]/20">
                    <SelectValue placeholder="1x" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                className="w-full border-[#0059C2] text-[#0059C2] hover:bg-[#0059C2] hover:text-white py-2.5"
              >
                Download Audio
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
