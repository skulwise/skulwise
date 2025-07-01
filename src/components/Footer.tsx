import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Heart, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation('navigation');
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 skulwise-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
                              <span className="text-xl font-bold text-gray-900">{t('app_name', 'Skulwise')}</span>
            </div>
                          <p className="text-gray-600 mb-4 max-w-md">
                {t('footer.description')}
              </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Upload Notes
                </Link>
              </li>
              <li>
                <Link href="/flashcards" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Flashcards
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Rewards
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 Skulwise. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-600 text-sm mr-2">Made with</span>
              <Heart size={16} className="text-red-500" />
              <span className="text-gray-600 text-sm ml-2">for students everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}