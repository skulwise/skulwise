import Link from 'next/link';
import { Brain, Upload, Headphones, CreditCard, Trophy, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

export default function Home() {
  const features = [
    {
      icon: Upload,
      title: 'Upload Your Notes',
      description: 'Simply upload your study notes or lecture transcripts in any format.',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Brain,
      title: 'AI-Powered Summarization',
      description: 'Our AI extracts key points and creates concise summaries for efficient studying.',
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Headphones,
      title: 'Convert to Audio',
      description: 'Transform your notes into natural-sounding audio for hands-free learning.',
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: CreditCard,
      title: 'Smart Flashcards',
      description: 'Automatically generated flashcards with adaptive difficulty levels.',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      icon: Trophy,
      title: 'Gamified Learning',
      description: 'Earn points, maintain streaks, and unlock achievements as you study.',
      color: 'bg-yellow-50 text-yellow-600',
    },
  ];

  const benefits = [
    'Save hours of manual note organization',
    'Improve retention with multi-modal learning',
    'Study anywhere with audio content',
    'Track your progress and stay motivated',
    'Adaptive learning based on your performance',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-indigo-50 via-white to-cyan-50 py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                  Transform Your Study Notes with
                  <span className="text-indigo-600 block">AI-Powered Learning</span>
                </h1>
                
                <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                  Upload your notes, get AI summaries, convert to audio, and create smart flashcards. 
                  Make studying more efficient and engaging with Skulwise.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="px-8 py-3 text-lg">
                    <Link href="/upload">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg" asChild>
                    <Link href="/dashboard">
                      View Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How Skulwise Works
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  A simple, powerful workflow that transforms your study materials into an engaging learning experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Why Choose Skulwise?
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Traditional studying methods can be time-consuming and ineffective. 
                    Skulwise leverages AI to create personalized learning experiences that adapt to your needs.
                  </p>
                  
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="text-center">
                    <Brain className="w-20 h-20 text-indigo-600 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Ready to Transform Your Learning?
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Join thousands of students who have revolutionized their study habits with Skulwise.
                    </p>
                    <Button asChild size="lg" className="w-full">
                      <Link href="/upload">
                        Start Learning Smarter
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-indigo-600">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Revolutionize Your Study Routine?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Upload your first set of notes and experience the power of AI-enhanced learning.
              </p>
              <Button asChild size="lg" variant="secondary" className="px-8 py-3 text-lg">
                <Link href="/upload">
                  Get Started Now - It's Free
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }
