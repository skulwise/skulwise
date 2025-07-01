'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Check, X, Star } from 'lucide-react';
import { FlashcardData } from '@/src/utils/openai';

interface FlashcardProps {
  flashcard: FlashcardData;
  onAnswer?: (correct: boolean) => void;
  showControls?: boolean;
  className?: string;
}

export default function Flashcard({ 
  flashcard, 
  onAnswer, 
  showControls = true,
  className = '' 
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    setHasAnswered(true);
    onAnswer?.(correct);
  };

  const resetCard = () => {
    setIsFlipped(false);
    setHasAnswered(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < count ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <Card className="relative h-80 cursor-pointer perspective-1000">
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card (Question) */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <CardContent className="flex flex-col justify-between h-full p-6">
              <div className="flex justify-between items-start mb-4">
                <Badge className={getDifficultyColor(flashcard.difficulty)}>
                  {flashcard.difficulty}
                </Badge>
                <div className="flex space-x-1">
                  {getDifficultyStars(flashcard.difficulty)}
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg font-medium text-center text-gray-800 leading-relaxed">
                  {flashcard.question}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">Click to reveal answer</p>
              </div>
            </CardContent>
          </div>

          {/* Back of card (Answer) */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <CardContent className="flex flex-col justify-between h-full p-6 bg-indigo-50">
              <div className="flex justify-between items-start mb-4">
                <Badge className={getDifficultyColor(flashcard.difficulty)}>
                  {flashcard.difficulty}
                </Badge>
                <div className="flex space-x-1">
                  {getDifficultyStars(flashcard.difficulty)}
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-center text-gray-800 leading-relaxed">
                  {flashcard.answer}
                </p>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">Click to flip back</p>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      {/* Control buttons */}
      {showControls && isFlipped && (
        <div className="mt-4 space-y-3">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Did you get it right?
            </p>
          </div>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
              onClick={() => handleAnswer(false)}
              disabled={hasAnswered}
            >
              <X className="w-4 h-4 mr-2" />
              Incorrect
            </Button>
            
            <Button
              variant="outline"
              className="flex-1 text-green-600 border-green-300 hover:bg-green-50"
              onClick={() => handleAnswer(true)}
              disabled={hasAnswered}
            >
              <Check className="w-4 h-4 mr-2" />
              Correct
            </Button>
          </div>
          
          <Button
            variant="ghost"
            className="w-full text-gray-600"
            onClick={resetCard}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Card
          </Button>
        </div>
      )}

      {hasAnswered && (
        <div className="mt-4 text-center">
          <Badge variant={hasAnswered ? 'default' : 'secondary'}>
            Response recorded
          </Badge>
        </div>
      )}
    </div>
  );
}