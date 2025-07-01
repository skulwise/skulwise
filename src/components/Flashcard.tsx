import React, { useState } from 'react';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
}

interface FlashcardProps {
  card: FlashcardData;
  onAnswer?: (cardId: string, correct: boolean) => void;
  showControls?: boolean;
}

export default function Flashcard({ card, onAnswer, showControls = true }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (correct: boolean) => {
    setAnswered(true);
    if (onAnswer) {
      onAnswer(card.id, correct);
    }
    
    // Reset after a short delay for the next card
    setTimeout(() => {
      setIsFlipped(false);
      setAnswered(false);
    }, 1500);
  };

  const resetCard = () => {
    setIsFlipped(false);
    setAnswered(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Flashcard */}
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''} cursor-pointer`}
        onClick={!answered ? handleFlip : undefined}
      >
        <div className="flashcard-inner">
          {/* Front of card (Question) */}
          <div className="flashcard-front">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Question</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {card.question}
              </p>
              {!isFlipped && (
                <p className="text-sm text-gray-500 mt-4">Click to reveal answer</p>
              )}
            </div>
          </div>

          {/* Back of card (Answer) */}
          <div className="flashcard-back">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Answer</h3>
              <p className="text-gray-700 text-base leading-relaxed">
                {card.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && isFlipped && !answered && (
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => handleAnswer(false)}
            className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            <XCircle size={20} />
            <span>Incorrect</span>
          </button>
          
          <button
            onClick={() => handleAnswer(true)}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <CheckCircle size={20} />
            <span>Correct</span>
          </button>
        </div>
      )}

      {/* Reset Button */}
      {showControls && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={resetCard}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <RotateCcw size={16} />
            <span className="text-sm">Reset Card</span>
          </button>
        </div>
      )}

      {/* Feedback */}
      {answered && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800">
            <span className="text-sm font-medium">
              +5 XP earned! 🎉
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// Flashcard Set Component for multiple cards
interface FlashcardSetProps {
  cards: FlashcardData[];
  onComplete?: (results: { correct: number; total: number }) => void;
}

export function FlashcardSet({ cards, onComplete }: FlashcardSetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (cardId: string, correct: boolean) => {
    const newResults = [...results, correct];
    setResults(newResults);

    if (currentIndex + 1 < cards.length) {
      // Move to next card
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 1500);
    } else {
      // Session complete
      setIsCompleted(true);
      if (onComplete) {
        onComplete({
          correct: newResults.filter(r => r).length,
          total: newResults.length
        });
      }
    }
  };

  const resetSession = () => {
    setCurrentIndex(0);
    setResults([]);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const correctCount = results.filter(r => r).length;
    const percentage = Math.round((correctCount / results.length) * 100);

    return (
      <div className="text-center">
        <div className="skulwise-card p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Session Complete! 🎉</h2>
          <div className="text-6xl mb-6">{percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '📚'}</div>
          <p className="text-xl text-gray-700 mb-6">
            You got {correctCount} out of {results.length} correct ({percentage}%)
          </p>
          
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-lg font-semibold text-blue-600">
              +{results.length * 5} XP earned!
            </div>
            <button
              onClick={resetSession}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Study Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{results.filter(r => r).length} correct</span>
        </div>
        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Card */}
      <Flashcard
        card={cards[currentIndex]}
        onAnswer={handleAnswer}
        showControls={true}
      />
    </div>
  );
}