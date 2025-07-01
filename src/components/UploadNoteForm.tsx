import React, { useState, useRef } from 'react';
import { Upload, FileText, Mic, MicOff, Volume2, Loader2 } from 'lucide-react';

interface UploadNoteFormProps {
  onUploadSuccess?: (data: any) => void;
}

export default function UploadNoteForm({ onUploadSuccess }: UploadNoteFormProps) {
  const [text, setText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (file.type.startsWith('text/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a text file (.txt, .md, etc.)');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        // Here you would typically send the audio to your speech-to-text API
        // For now, we'll just show a placeholder
        setText(prev => prev + '\n[Audio transcription would appear here]');
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Error accessing microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          generateAudio: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process notes');
      }

      const data = await response.json();
      
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      }

      if (onUploadSuccess) {
        onUploadSuccess(data);
      }

    } catch (error) {
      console.error('Error processing notes:', error);
      alert('Failed to process notes. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(error => {
        console.error('Error playing audio:', error);
        alert('Failed to play audio');
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Notes</h2>
          
          {/* File Upload Area */}
          <div
            className={`upload-area ${dragActive ? 'dragover' : ''} mb-6`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.doc,.docx"
              onChange={handleFileInput}
              className="hidden"
            />
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your files here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports .txt, .md, .doc, .docx files
              </p>
            </div>
          </div>

          {/* Text Input */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="notes-text" className="block text-sm font-medium text-gray-700 mb-2">
                Or paste your notes here:
              </label>
              <div className="relative">
                <textarea
                  id="notes-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your study notes here..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                
                {/* Voice Recording Button */}
                <button
                  type="button"
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors duration-200 ${
                    isRecording
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
              </div>
              {isRecording && (
                <p className="text-sm text-red-600 mt-2 flex items-center">
                  <span className="animate-pulse">🔴</span>
                  <span className="ml-2">Recording... Click the microphone to stop</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!text.trim() || isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Processing Notes...
                </>
              ) : (
                <>
                  <FileText className="mr-2" size={20} />
                  Process Notes
                </>
              )}
            </button>
          </form>

          {/* Audio Player */}
          {audioUrl && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Generated Audio Summary</h3>
              <button
                onClick={playAudio}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Volume2 size={20} />
                <span>Play Audio</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}