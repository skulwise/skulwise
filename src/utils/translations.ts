import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Language configuration
export const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    direction: 'ltr' as const,
  },
  {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    flag: '🇳🇬',
    direction: 'ltr' as const,
  },
  {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Igbo',
    flag: '🇳🇬',
    direction: 'ltr' as const,
  },
  {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    flag: '🇰🇪',
    direction: 'ltr' as const,
  },
  {
    code: 'zu',
    name: 'Zulu',
    nativeName: 'IsiZulu',
    flag: '🇿🇦',
    direction: 'ltr' as const,
  },
];

// Available namespaces
export const namespaces = [
  'common',
  'navigation',
  'landing',
  'upload',
  'dashboard',
  'flashcards',
  'rewards',
] as const;

export type Namespace = typeof namespaces[number];
export type LanguageCode = typeof languages[number]['code'];

// Helper function to get static props with translations
export const getStaticPropsWithTranslations = (requiredNamespaces: Namespace[]): GetStaticProps => {
  return async ({ locale }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', requiredNamespaces)),
      },
    };
  };
};

// Helper function to get all namespaces (useful for layout components)
export const getAllNamespaces = (): Namespace[] => {
  return [...namespaces];
};

// Helper function to get language info by code
export const getLanguageByCode = (code: string) => {
  return languages.find(lang => lang.code === code) || languages[0];
};

// Helper function to get supported locales for Next.js config
export const getSupportedLocales = (): string[] => {
  return languages.map(lang => lang.code);
};

// Default translation keys for common UI elements
export const commonKeys = {
  // Actions
  save: 'save',
  cancel: 'cancel',
  delete: 'delete',
  edit: 'edit',
  close: 'close',
  confirm: 'confirm',
  submit: 'submit',
  reset: 'reset',
  search: 'search',
  filter: 'filter',
  upload: 'upload',
  download: 'download',
  
  // Status
  loading: 'loading',
  error: 'error',
  success: 'success',
  warning: 'warning',
  
  // Navigation
  home: 'home',
  dashboard: 'dashboard',
  flashcards: 'flashcards',
  rewards: 'rewards',
  
  // Time
  today: 'today',
  yesterday: 'yesterday',
  tomorrow: 'tomorrow',
  
  // Gamification
  level: 'level',
  xp: 'xp',
  points: 'points',
  progress: 'progress',
} as const;

// Helper for formatting interpolated strings
export const formatTranslation = (template: string, values: Record<string, string | number>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
};

// Helper for pluralization (basic implementation)
export const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return singular;
  return plural || `${singular}s`;
};

// Direction helper for RTL support (future enhancement)
export const getTextDirection = (languageCode: string): 'ltr' | 'rtl' => {
  const language = getLanguageByCode(languageCode);
  return language?.direction || 'ltr';
};

// Validation helper for checking if all required translations exist
export const validateTranslations = (
  translations: Record<string, any>,
  requiredKeys: string[]
): { isValid: boolean; missingKeys: string[] } => {
  const missingKeys: string[] = [];
  
  const checkKeys = (obj: any, keys: string[], prefix = '') => {
    keys.forEach(key => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (key.includes('.')) {
        const [firstKey, ...restKeys] = key.split('.');
        if (obj[firstKey]) {
          checkKeys(obj[firstKey], [restKeys.join('.')], firstKey);
        } else {
          missingKeys.push(fullKey);
        }
      } else if (!(key in obj)) {
        missingKeys.push(fullKey);
      }
    });
  };
  
  checkKeys(translations, requiredKeys);
  
  return {
    isValid: missingKeys.length === 0,
    missingKeys,
  };
};

// Export default configurations for easy import
export const defaultTranslationConfig = {
  languages,
  namespaces,
  defaultLanguage: 'en',
  fallbackLanguage: 'en',
};

// Helper for development - logs missing translations
export const logMissingTranslation = (key: string, namespace: string, locale: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`Missing translation: ${namespace}:${key} for locale ${locale}`);
  }
};

export default {
  languages,
  namespaces,
  getStaticPropsWithTranslations,
  getAllNamespaces,
  getLanguageByCode,
  getSupportedLocales,
  commonKeys,
  formatTranslation,
  pluralize,
  getTextDirection,
  validateTranslations,
  defaultTranslationConfig,
  logMissingTranslation,
};