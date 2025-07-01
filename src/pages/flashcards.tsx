import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Flashcard, { FlashcardSet } from '../components/Flashcard';
import { CreditCard, Play, Plus, BookOpen, Filter, Search } from 'lucide-react';

// Mock flashcard data
const mockFlashcardSets = [
  {
    id: '1',
    title: 'Biology Chapter 3: Cell Structure',
    subject: 'Biology',
    cardCount: 12,
    difficulty: 'Medium',
    lastStudied: '2 days ago',
    cards: [
      {
        id: '1-1',
        question: 'What is the powerhouse of the cell?',
        answer: 'The mitochondria is known as the powerhouse of the cell because it produces ATP through cellular respiration.'
      },
      {
        id: '1-2',
        question: 'What is the function of the cell membrane?',
        answer: 'The cell membrane controls what enters and exits the cell, maintaining homeostasis and protecting the cell\'s interior.'
      },
      {
        id: '1-3',
        question: 'What is the difference between prokaryotic and eukaryotic cells?',
        answer: 'Prokaryotic cells lack a membrane-bound nucleus, while eukaryotic cells have a distinct nucleus enclosed by a nuclear membrane.'
      }
    ]
  },
  {
    id: '2',
    title: 'Chemistry: Periodic Table',
    subject: 'Chemistry',
    cardCount: 8,
    difficulty: 'Hard',
    lastStudied: '1 week ago',
    cards: [
      {
        id: '2-1',
        question: 'What is the atomic number of Carbon?',
        answer: 'Carbon has an atomic number of 6, meaning it has 6 protons in its nucleus.'
      },
      {
        id: '2-2',
        question: 'What are noble gases?',
        answer: 'Noble gases are elements in Group 18 of the periodic table that are chemically inert under normal conditions.'
      }
    ]
  },
  {
    id: '3',
    title: 'Physics: Newton\'s Laws',
    subject: 'Physics',
    cardCount: 6,
    difficulty: 'Easy',
    lastStudied: 'Yesterday',
    cards: [
      {
        id: '3-1',
        question: 'State Newton\'s First Law of Motion',
        answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.'
      },
      {
        id: '3-2',
        question: 'What is the formula for Newton\'s Second Law?',
        answer: 'F = ma, where F is force, m is mass, and a is acceleration.'
      }
    ]
  }
];

export default function FlashcardsPage() {
  const [selectedSet, setSelectedSet] = useState<any>(null);
  const [isStudying, setIsStudying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [customFlashcards, setCustomFlashcards] = useState<any[]>([]);

  useEffect(() => {
    // Load flashcards from localStorage (from upload page)
    const storedFlashcards = localStorage.getItem('flashcards');
    if (storedFlashcards) {
      try {
        const parsedCards = JSON.parse(storedFlashcards);
        const customSet = {
          id: 'custom',
          title: 'Recently Uploaded Notes',
          subject: 'Custom',
          cardCount: parsedCards.length,
          difficulty: 'Medium',
          lastStudied: 'Never',
          cards: parsedCards.map((card: any, index: number) => ({
            id: `custom-${index}`,
            question: card.question,
            answer: card.answer
          }))
        };
        setCustomFlashcards([customSet]);
      } catch (error) {
        console.error('Error parsing stored flashcards:', error);
      }
    }
  }, []);

  const allFlashcardSets = [...customFlashcards, ...mockFlashcardSets];

  const filteredSets = allFlashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSubject === 'all' || set.subject.toLowerCase() === filterSubject.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const subjects = ['all', ...Array.from(new Set(allFlashcardSets.map(set => set.subject.toLowerCase())))];

  const startStudying = (set: any) => {
    setSelectedSet(set);
    setIsStudying(true);
  };

  const handleStudyComplete = (results: { correct: number; total: number }) => {
    // Here you would typically save the results to a database
    console.log('Study session completed:', results);
    setIsStudying(false);
    setSelectedSet(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
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

  if (isStudying && selectedSet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedSet.title}
            </h1>
            <p className="text-lg text-gray-600">
              Study Session in Progress
            </p>
            <button
              onClick={() => {
                setIsStudying(false);
                setSelectedSet(null);
              }}
              className="mt-4 text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to Flashcard Sets
            </button>
          </div>

          <FlashcardSet
            cards={selectedSet.cards}
            onComplete={handleStudyComplete}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Study with Flashcards
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master your subjects with AI-generated flashcards. 
            Test your knowledge and track your progress.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject.charAt(0).toUpperCase() + subject.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Flashcard Sets Grid */}
        {filteredSets.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="mx-auto mb-4 text-gray-400" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No flashcard sets found
            </h3>
            <p className="text-gray-600 mb-6">
              {allFlashcardSets.length === 0 
                ? "Upload some notes to generate your first flashcard set!"
                : "Try adjusting your search or filter criteria."
              }
            </p>
            <button
              onClick={() => window.location.href = '/upload'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center mx-auto"
            >
              <Plus className="mr-2" size={20} />
              Create Flashcards
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => (
              <div key={set.id} className="skulwise-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {set.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {set.subject}
                    </p>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(set.difficulty)}`}>
                        {set.difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {set.cardCount} cards
                      </span>
                    </div>
                  </div>
                  <CreditCard className="text-gray-400" size={24} />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    Last studied: {set.lastStudied}
                  </p>
                </div>

                <button
                  onClick={() => startStudying(set)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Play className="mr-2" size={20} />
                  Start Studying
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        {allFlashcardSets.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allFlashcardSets.length}
              </div>
              <p className="text-gray-600">Total Sets</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allFlashcardSets.reduce((total, set) => total + set.cardCount, 0)}
              </div>
              <p className="text-gray-600">Total Cards</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {new Set(allFlashcardSets.map(set => set.subject)).size}
              </div>
              <p className="text-gray-600">Subjects</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}