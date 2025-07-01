import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Book, Home, Upload, CreditCard, Trophy, User } from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  translationKey: string;
}

export default function Navbar() {
  const router = useRouter();
  const { t } = useTranslation('navigation');

  const navItems: NavItem[] = [
    { name: t('home'), href: '/', icon: <Home size={20} />, translationKey: 'home' },
    { name: t('dashboard'), href: '/dashboard', icon: <Book size={20} />, translationKey: 'dashboard' },
    { name: t('upload'), href: '/upload', icon: <Upload size={20} />, translationKey: 'upload' },
    { name: t('flashcards'), href: '/flashcards', icon: <CreditCard size={20} />, translationKey: 'flashcards' },
    { name: t('rewards'), href: '/rewards', icon: <Trophy size={20} />, translationKey: 'rewards' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 skulwise-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{t('app_name', 'Skulwise')}</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Language Selector & User Menu */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button className="p-2 rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200">
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}