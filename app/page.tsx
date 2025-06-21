import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Headphones, Trophy, Brain, Users, Zap } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0059C2] via-[#0A2D58] to-[#0059C2]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Image src="/skulwise-logo.png" alt="Skulwise Logo" width={50} height={50} className="rounded-lg" />
          <span className="text-white font-bold text-xl font-['Montserrat']">Skulwise</span>
        </div>
        <div className="hidden md:flex space-x-6 text-white">
          <Link href="/dashboard" className="hover:text-[#F8A938] transition-colors">
            Dashboard
          </Link>
          <Link href="/flashcards" className="hover:text-[#F8A938] transition-colors">
            Study
          </Link>
          <Link href="/rewards" className="hover:text-[#F8A938] transition-colors">
            Rewards
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Poppins']">
            Study Smarter with <span className="text-[#F8A938]">AI</span>
          </h1>
          <p className="text-lg md:text-xl text-[#F4F7FA] mb-4 font-['Nunito']">
            Built for African Students. Powered by AI.
          </p>
          <p className="text-base text-[#F4F7FA] mb-12 max-w-2xl mx-auto font-['Nunito']">
            Transform your notes into audiobooks, get AI-powered study plans, and compete with students across Africa.
            Your academic success starts here.
          </p>

          <Button
            size="lg"
            className="bg-[#F8A938] hover:bg-[#D44713] text-black font-bold px-10 py-3 text-base rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Join Beta
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Poppins']">
          Powerful Features for African Students
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-center hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#F8A938]/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-7 h-7 text-[#F8A938]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 font-['Poppins']">Notes to Audio</h3>
            <p className="text-white/80 font-['Nunito']">
              Upload your notes and let AI convert them into engaging audiobooks with local accents
            </p>
          </Card>

          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-center hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#F8A938]/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-7 h-7 text-[#F8A938]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 font-['Poppins']">Past Question Solutions</h3>
            <p className="text-white/80 font-['Nunito']">
              Get AI-powered solutions to past questions from universities across Africa
            </p>
          </Card>

          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-center hover:bg-white/10 transition-all duration-300">
            <div className="bg-[#F8A938]/20 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-7 h-7 text-[#F8A938]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-4 font-['Poppins']">Gamified Study Plan</h3>
            <p className="text-white/80 font-['Nunito']">
              Earn XP, compete with peers, and unlock rewards as you progress through your studies
            </p>
          </Card>
        </div>
      </section>

      {/* Why Skulwise? Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12 font-['Poppins']">
          Why Choose Skulwise Over Others?
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-left hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4 font-['Poppins']">Tailored for African Students</h3>
            <p className="text-white/80 font-['Nunito']">
              Unlike generic AI tools, Skulwise is built from the ground up with the unique academic needs and cultural
              context of African students in mind. From local accents in audio notes to past questions from African
              universities, we understand your journey.
            </p>
          </Card>
          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-left hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4 font-['Poppins']">Engaging & Gamified Learning</h3>
            <p className="text-white/80 font-['Nunito']">
              We go beyond simple summarization. Skulwise transforms passive learning into an active, rewarding
              experience with gamified study plans, XP points, and competitive leaderboards, making studying fun and
              motivating.
            </p>
          </Card>
          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-left hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4 font-['Poppins']">Comprehensive Study Ecosystem</h3>
            <p className="text-white/80 font-['Nunito']">
              Skulwise offers a holistic approach to studying, combining AI-powered note conversion to audio, past
              question solutions, and personalized study plans all in one platform. No need for multiple tools –
              everything you need is here.
            </p>
          </Card>
          <Card className="bg-white/5 border border-white/10 rounded-xl shadow-lg p-8 text-left hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-4 font-['Poppins']">Community & Competition</h3>
            <p className="text-white/80 font-['Nunito']">
              Connect with a vibrant community of African students. Compete, collaborate, and grow together, fostering a
              supportive environment that drives academic excellence.
            </p>
          </Card>
        </div>
      </section>

      {/* Student Illustrations Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-8 font-['Poppins']">Join Thousands of African Students</h2>
          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-[#F8A938]" />
              <span className="text-white font-bold text-lg font-['Inter']">10,000+</span>
              <span className="text-[#F4F7FA] font-['Nunito']">Students</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#F8A938]" />
              <span className="text-white font-bold text-lg font-['Inter']">50,000+</span>
              <span className="text-[#F4F7FA] font-['Nunito']">Notes Converted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-[#F8A938]" />
              <span className="text-white font-bold text-lg font-['Inter']">1M+</span>
              <span className="text-[#F4F7FA] font-['Nunito']">XP Earned</span>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-[#D44713] hover:bg-[#F8A938] text-white font-bold px-6 py-2.5 text-base rounded-full"
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-6 text-center text-white/70 border-t border-white/20">
        <p className="font-['Nunito']">© 2024 Skulwise. Built for African Students. Powered by AI.</p>
      </footer>
    </div>
  )
}
