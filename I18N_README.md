# Skulwise Internationalization (i18n) Documentation

## Overview

Skulwise now supports multiple languages using next-i18next, providing a seamless multi-language experience for users across different African countries and regions.

## Supported Languages

| Language | Code | Native Name | Region | Flag |
|----------|------|-------------|--------|------|
| English | `en` | English | Global | 🇬🇧 |
| Yoruba | `yo` | Yorùbá | Nigeria | 🇳🇬 |
| Igbo | `ig` | Igbo | Nigeria | 🇳🇬 |
| Swahili | `sw` | Kiswahili | Kenya/Tanzania | 🇰🇪 |
| Zulu | `zu` | IsiZulu | South Africa | 🇿🇦 |

## File Structure

```
public/locales/
├── en/                    # English translations
│   ├── common.json        # Common UI elements
│   ├── navigation.json    # Navigation and layout
│   ├── landing.json       # Landing page
│   ├── upload.json        # Upload page
│   ├── dashboard.json     # Dashboard page
│   ├── flashcards.json    # Flashcards page
│   └── rewards.json       # Rewards page
├── yo/                    # Yoruba translations
│   ├── common.json
│   ├── navigation.json
│   └── ...
├── ig/                    # Igbo translations
├── sw/                    # Swahili translations
└── zu/                    # Zulu translations
```

## Configuration Files

### next-i18next.config.js
Main configuration file defining:
- Supported locales
- Default locale (English)
- Fallback language
- Namespace loading

### next.config.mjs
Updated to include i18n configuration and route handling.

## Components

### LanguageSelector
A comprehensive language selector component with two variants:
- **Dropdown**: Compact selector for navbar
- **Inline**: Button list for settings pages

**Features:**
- Flag emojis for visual identification
- Native language names
- Smooth transitions
- Accessibility support

**Usage:**
```tsx
import LanguageSelector from '@/components/LanguageSelector';

// Dropdown variant (default)
<LanguageSelector />

// Inline variant
<LanguageSelector variant="inline" />

// Without flags
<LanguageSelector showFlags={false} />
```

## Implementation Guide

### 1. Adding Translations to Components

```tsx
import { useTranslation } from 'next-i18next';

export default function MyComponent() {
  const { t } = useTranslation(['common', 'navigation']);
  
  return (
    <div>
      <h1>{t('common:welcome')}</h1>
      <button>{t('navigation:home')}</button>
    </div>
  );
}
```

### 2. Adding Translations to Pages

```tsx
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MyPage() {
  const { t } = useTranslation(['common', 'mypage']);
  
  return <div>{t('mypage:title')}</div>;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
        'mypage',
      ])),
    },
  };
};
```

### 3. Using the Translation Utility

```tsx
import { getStaticPropsWithTranslations } from '@/utils/translations';

// Simplified page setup
export const getStaticProps = getStaticPropsWithTranslations(['common', 'navigation']);
```

## Translation Keys Structure

### Namespaces
- **common**: Shared UI elements (buttons, status messages, etc.)
- **navigation**: Menu items, breadcrumbs, footer
- **landing**: Landing page content
- **upload**: File upload and processing
- **dashboard**: Dashboard statistics and actions
- **flashcards**: Flashcard study interface
- **rewards**: Achievements and gamification

### Key Naming Convention
- Use snake_case for keys
- Use dot notation for nested objects
- Keep keys descriptive but concise

Example:
```json
{
  "hero": {
    "title": "Transform Your Study Notes",
    "subtitle": "AI-powered learning tools",
    "cta_primary": "Get Started",
    "cta_secondary": "Learn More"
  },
  "features": {
    "ai_summarization": {
      "title": "AI Summarization",
      "description": "Smart note processing"
    }
  }
}
```

## Features

### 1. Language Persistence
- User's language choice persists across sessions
- Automatic detection of browser language
- Fallback to English for unsupported languages

### 2. SEO Optimization
- Language-specific URLs (`/en/dashboard`, `/yo/dashboard`)
- Proper hreflang tags
- Localized meta descriptions

### 3. Interpolation Support
```tsx
// Translation file
{
  "welcome_message": "Welcome {{name}}, you have {{count}} notifications"
}

// Component usage
const { t } = useTranslation();
const message = t('welcome_message', { name: 'John', count: 5 });
```

### 4. Pluralization
```tsx
// Translation file
{
  "item_count": "{{count}} item",
  "item_count_plural": "{{count}} items"
}

// Component usage
const { t } = useTranslation();
const message = t('item_count', { count: items.length });
```

## URL Structure

- Default (English): `/dashboard`
- Yoruba: `/yo/dashboard`
- Igbo: `/ig/dashboard`
- Swahili: `/sw/dashboard`
- Zulu: `/zu/dashboard`

## Development Workflow

### Adding New Languages

1. Create language directory in `public/locales/`
2. Copy base translation files from English
3. Translate content to target language
4. Add language to `next-i18next.config.js`
5. Update `LanguageSelector` component

### Adding New Translation Keys

1. Add key to English translation file
2. Update all other language files
3. Use the new key in components
4. Test with language switching

### Translation Guidelines

1. **Context Matters**: Provide context for translators
2. **Cultural Sensitivity**: Consider cultural nuances
3. **Consistency**: Use consistent terminology
4. **Testing**: Test with different text lengths
5. **Accessibility**: Ensure translations work with screen readers

## Utility Functions

### Translation Helpers
- `formatTranslation()`: String interpolation
- `pluralize()`: Basic pluralization
- `getLanguageByCode()`: Language metadata
- `validateTranslations()`: Translation completeness check

### Development Helpers
- `logMissingTranslation()`: Development warnings
- `validateTranslations()`: Check translation coverage

## Performance Considerations

1. **Namespace Loading**: Only load required namespaces per page
2. **Static Generation**: Pre-generate pages for all languages
3. **Bundle Size**: Translations are loaded on-demand
4. **Caching**: Browser caches translation files

## Browser Support

- Modern browsers with ES6+ support
- Graceful fallback to English for unsupported scenarios
- Works with JavaScript disabled (SSR)

## Testing

### Manual Testing
1. Switch languages using the language selector
2. Verify translations appear correctly
3. Test URL structure for each language
4. Check browser back/forward behavior

### Automated Testing
```bash
# Test build with all languages
npm run build

# Check for missing translations
npm run lint:translations
```

## Troubleshooting

### Common Issues

1. **Missing Translation**: Shows key instead of text
   - **Solution**: Add translation to all language files

2. **Language Not Switching**: 
   - **Solution**: Check `next-i18next.config.js` setup

3. **404 on Language Routes**:
   - **Solution**: Verify Next.js i18n configuration

4. **Build Errors**:
   - **Solution**: Ensure all namespaces exist for all languages

### Debug Mode
Enable debug mode in `next-i18next.config.js`:
```js
debug: process.env.NODE_ENV === 'development'
```

## Future Enhancements

1. **RTL Support**: Add Arabic, Hebrew support
2. **Dynamic Loading**: Load translations dynamically
3. **Translation Management**: Integration with translation services
4. **A/B Testing**: Test different translations
5. **Analytics**: Track language usage patterns

## Contributing

### Adding New Languages
1. Research target audience and regions
2. Find native speakers for translation
3. Consider regional variations
4. Test with native speakers
5. Submit PR with translations

### Translation Updates
1. Use consistent terminology
2. Consider cultural context
3. Test UI with longer/shorter text
4. Update all related files
5. Document changes

---

**Note**: All translations are community-contributed and continuously improved. Native speakers are encouraged to contribute corrections and improvements.