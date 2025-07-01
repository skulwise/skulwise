module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'yo', 'ig', 'sw', 'zu'],
  },
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  
  // Custom namespace separator
  nsSeparator: false,
  keySeparator: false,
  
  // Interpolation options
  interpolation: {
    escapeValue: false,
  },
  
  // Default namespace
  defaultNS: 'common',
  
  // Load path for translation files
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  
  // Namespace detection
  ns: ['common', 'navigation', 'landing', 'upload', 'dashboard', 'flashcards', 'rewards'],
};