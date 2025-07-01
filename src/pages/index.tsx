import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brain, BookOpen, Headphones, Trophy, Upload, Play, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { t } = useTranslation(['landing', 'navigation', 'common']);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="skulwise-gradient absolute inset-0 opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
              {t('landing:hero.title')}
              <span className="text-transparent bg-clip-text skulwise-gradient">{t('landing:hero.title_ai')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('landing:hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Link
                  href="/upload"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Upload className="mr-2" size={20} />
                  {t('landing:hero.cta_primary')}
                </Link>
                <Link
                  href="/dashboard"
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <Play className="mr-2" size={20} />
                  {t('landing:hero.cta_secondary')}
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Learning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Skulwise combines cutting-edge AI technology with proven learning methods 
              to create the ultimate study companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* AI Summarization */}
            <div className="skulwise-card p-6 text-center">
              <div className="w-12 h-12 skulwise-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Summarization</h3>
              <p className="text-gray-600">
                Transform lengthy notes into concise, digestible summaries using advanced AI technology.
              </p>
            </div>

            {/* Audio Learning */}
            <div className="skulwise-card p-6 text-center">
              <div className="w-12 h-12 skulwise-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Headphones className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Audio Learning</h3>
              <p className="text-gray-600">
                Convert your notes to high-quality audio for learning on-the-go, during commutes, or workouts.
              </p>
            </div>

            {/* Interactive Flashcards */}
            <div className="skulwise-card p-6 text-center">
              <div className="w-12 h-12 skulwise-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Flashcards</h3>
              <p className="text-gray-600">
                Auto-generated flashcards from your notes to reinforce learning through active recall.
              </p>
            </div>

            {/* Gamification */}
            <div className="skulwise-card p-6 text-center">
              <div className="w-12 h-12 skulwise-gradient rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reward System</h3>
              <p className="text-gray-600">
                Stay motivated with XP points, achievements, and streaks that make learning addictive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How Skulwise Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started with AI-powered learning is simple and intuitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Your Notes</h3>
              <p className="text-gray-600">
                Upload text files, paste content, or even record voice notes. 
                Skulwise accepts multiple formats for maximum flexibility.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Processing</h3>
              <p className="text-gray-600">
                Our AI analyzes your content, creates summaries, generates flashcards, 
                and converts text to natural-sounding audio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Learn & Earn</h3>
              <p className="text-gray-600">
                Study with interactive flashcards, listen to audio summaries, 
                and earn XP and achievements as you progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 skulwise-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already learning smarter with Skulwise. 
            Start your AI-powered study journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/dashboard"
              className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'navigation',
        'landing',
      ])),
    },
  };
};