import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UploadNoteForm from '../components/UploadNoteForm';
import { CheckCircle, Sparkles, Volume2, CreditCard } from 'lucide-react';

export default function UploadPage() {
  const [processingResult, setProcessingResult] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const handleUploadSuccess = (data: any) => {
    setProcessingResult(data);
    setShowResults(true);
  };

  const playAudio = () => {
    if (processingResult?.audioUrl) {
      const audio = new Audio(processingResult.audioUrl);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Failed to play audio');
      });
    }
  };

  const goToFlashcards = () => {
    // Store flashcards in localStorage for demo purposes
    // In a real app, this would be saved to a database
    if (processingResult?.flashcards) {
      localStorage.setItem('flashcards', JSON.stringify(processingResult.flashcards));
      router.push('/flashcards');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <div>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Upload Your Study Notes
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your notes into powerful learning tools. Upload text files, 
                paste content, or record voice notes to get started.
              </p>
            </div>

            {/* Upload Form */}
            <UploadNoteForm onUploadSuccess={handleUploadSuccess} />

            {/* Benefits Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                What You'll Get
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Summary</h3>
                  <p className="text-gray-600">
                    Get a concise summary of your notes highlighting the most important concepts.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Volume2 className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Audio Version</h3>
                  <p className="text-gray-600">
                    Listen to your notes as high-quality audio for learning on-the-go.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Flashcards</h3>
                  <p className="text-gray-600">
                    Auto-generated flashcards to test your knowledge and reinforce learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Processing Complete!
              </h1>
              <p className="text-lg text-gray-600">
                Your notes have been transformed into powerful study materials.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Summary */}
              <div className="skulwise-card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="mr-2 text-blue-600" size={20} />
                  AI Summary
                </h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {processingResult?.summary}
                  </p>
                </div>
              </div>

              {/* Key Points */}
              <div className="skulwise-card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Key Points
                </h2>
                <ul className="space-y-2">
                  {processingResult?.keyPoints?.map((point: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Audio Player */}
            {processingResult?.audioUrl && (
              <div className="mt-8 skulwise-card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Volume2 className="mr-2 text-blue-600" size={20} />
                  Audio Summary
                </h2>
                <p className="text-gray-600 mb-4">
                  Listen to your notes as natural-sounding audio. Perfect for reviewing while commuting or exercising.
                </p>
                <button
                  onClick={playAudio}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                >
                  <Volume2 className="mr-2" size={20} />
                  Play Audio Summary
                </button>
              </div>
            )}

            {/* Flashcards Preview */}
            {processingResult?.flashcards && processingResult.flashcards.length > 0 && (
              <div className="mt-8 skulwise-card p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="mr-2 text-blue-600" size={20} />
                  Generated Flashcards ({processingResult.flashcards.length})
                </h2>
                <p className="text-gray-600 mb-4">
                  We've created {processingResult.flashcards.length} flashcards from your notes to help reinforce your learning.
                </p>
                
                {/* Preview first flashcard */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-2">Preview:</div>
                  <div className="font-medium text-gray-900 mb-2">
                    Q: {processingResult.flashcards[0].question}
                  </div>
                  <div className="text-gray-700">
                    A: {processingResult.flashcards[0].answer}
                  </div>
                </div>

                <button
                  onClick={goToFlashcards}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                >
                  <CreditCard className="mr-2" size={20} />
                  Study with Flashcards
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowResults(false)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Process More Notes
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Go to Dashboard
              </button>
            </div>

            {/* XP Reward */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-100 text-yellow-800">
                <span className="text-lg font-semibold">🎉 +10 XP earned for processing notes!</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}