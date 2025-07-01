import { Brain } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">Skulwise</span>
            </div>
            <p className="mt-4 text-gray-600 text-sm max-w-md">
              Transform your study notes into interactive audio experiences and flashcards. 
              Learn smarter, not harder with AI-powered study tools.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Features
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-gray-600">AI Summarization</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Audio Generation</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Smart Flashcards</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Progress Tracking</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="text-sm text-gray-600">Help Center</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Contact Us</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © 2024 Skulwise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}