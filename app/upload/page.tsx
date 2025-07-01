'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Volume2, FileText, Headphones, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import UploadNoteForm from '@/src/components/UploadNoteForm';
import { generateAudioFromText } from '@/src/utils/openai';
import { SummaryResponse } from '@/src/utils/openai';

export default function Upload() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (data: { text?: string; file?: File }) => {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    setAudioUrl(null);

    try {
      let textContent = data.text || '';

      // If file is uploaded, extract text (simplified - in production you'd use proper file parsing)
      if (data.file) {
        if (data.file.type === 'text/plain') {
          textContent = await data.file.text();
        } else {
          throw new Error('File type not supported yet. Please use plain text files or paste content directly.');
        }
      }

      // Call summarization API
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process notes');
      }

      const summaryData: SummaryResponse = await response.json();
      setSummary(summaryData);

      // Generate audio from summary
      try {
        const audioBlob = await generateAudioFromText(summaryData.summary);
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } catch (audioError) {
        console.error('Audio generation failed:', audioError);
        // Continue without audio - summary is still available
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'study-summary.mp3';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const goToFlashcards = () => {
    if (summary) {
      // Store flashcards in localStorage for the flashcards page
      localStorage.setItem('generated-flashcards', JSON.stringify(summary.flashcards));
      router.push('/flashcards');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Notes to Audio
          </h1>
          <p className="text-gray-600">
            Upload your study notes or paste text to generate AI summaries, audio content, and flashcards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <div>
            <UploadNoteForm onSubmit={handleUpload} isLoading={isLoading} />
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Results */}
          <div className="space-y-6">
            {summary && (
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="audio">Audio</TabsTrigger>
                  <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>AI Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                        <p className="text-gray-700 leading-relaxed">{summary.summary}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Key Points</h3>
                        <ul className="space-y-2">
                          {summary.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="text-gray-700">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audio">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Headphones className="w-5 h-5" />
                        <span>Audio Summary</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {audioUrl ? (
                        <>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <audio controls className="w-full">
                              <source src={audioUrl} type="audio/mpeg" />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button onClick={downloadAudio} variant="outline" className="flex-1">
                              <Download className="w-4 h-4 mr-2" />
                              Download Audio
                            </Button>
                            <Button variant="outline">
                              <Share className="w-4 h-4 mr-2" />
                              Share
                            </Button>
                          </div>
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <Volume2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">
                            Audio generation in progress or failed. The summary is still available above.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="flashcards">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Generated Flashcards</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          {summary.flashcards.length} flashcards generated from your notes.
                        </p>
                        
                        <div className="space-y-3">
                          {summary.flashcards.slice(0, 3).map((card, index) => (
                            <div key={index} className="border rounded-lg p-3 bg-gray-50">
                              <p className="font-medium text-gray-900 mb-1">
                                Q: {card.question}
                              </p>
                              <p className="text-gray-600 text-sm">
                                A: {card.answer}
                              </p>
                            </div>
                          ))}
                          
                          {summary.flashcards.length > 3 && (
                            <p className="text-sm text-gray-500 text-center">
                              +{summary.flashcards.length - 3} more flashcards...
                            </p>
                          )}
                        </div>
                        
                        <Button onClick={goToFlashcards} className="w-full">
                          Study All Flashcards
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}

            {!summary && !isLoading && (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Process Your Notes
                  </h3>
                  <p className="text-gray-600">
                    Upload a file or paste your text to get started with AI-powered summarization and audio generation.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
