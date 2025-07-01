import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Globe, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    flag: '🇳🇬',
  },
  {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Igbo',
    flag: '🇳🇬',
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
  },
  {
    code: 'zu',
    name: 'Zulu',
    nativeName: 'IsiZulu',
    flag: '🇿🇦',
  },
];

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'inline';
  showFlags?: boolean;
  showNativeNames?: boolean;
}

export default function LanguageSelector({ 
  variant = 'dropdown', 
  showFlags = true, 
  showNativeNames = true 
}: LanguageSelectorProps) {
  const router = useRouter();
  const { t } = useTranslation('navigation');
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === router.locale) || languages[0];

  const handleLanguageChange = async (languageCode: string) => {
    const { pathname, asPath, query } = router;
    
    // Close dropdown
    setIsOpen(false);
    
    // Navigate to the same page with new locale
    await router.push({ pathname, query }, asPath, { locale: languageCode });
  };

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              language.code === router.locale
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
            }`}
            title={`${language.name} (${language.nativeName})`}
          >
            {showFlags && <span className="mr-2">{language.flag}</span>}
            <span>{showNativeNames ? language.nativeName : language.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
        aria-label={t('language_selector')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 mr-2" />
        {showFlags && <span className="mr-2">{currentLanguage.flag}</span>}
        <span className="hidden sm:block mr-1">
          {showNativeNames ? currentLanguage.nativeName : currentLanguage.name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                    language.code === router.locale
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700'
                  }`}
                >
                  {showFlags && <span className="mr-3 text-lg">{language.flag}</span>}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{language.name}</div>
                    {showNativeNames && language.nativeName !== language.name && (
                      <div className="text-xs text-gray-500">{language.nativeName}</div>
                    )}
                  </div>
                  {language.code === router.locale && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Hook for getting language information
export function useCurrentLanguage() {
  const router = useRouter();
  return languages.find(lang => lang.code === router.locale) || languages[0];
}

// Export language data for use in other components
export { languages };