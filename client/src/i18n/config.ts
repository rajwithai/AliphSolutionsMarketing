import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

// Set initial language from localStorage
const initialLang = localStorage.getItem('language') || 'en';
// Keep LTR direction for both languages (no mirroring)
document.documentElement.dir = 'ltr';
document.documentElement.lang = initialLang;
if (initialLang === 'ar') {
  document.body.classList.add('font-arabic');
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Update HTML attributes when language changes (but keep LTR direction)
i18n.on('languageChanged', (lng) => {
  // Always keep LTR direction - no mirroring
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = lng;
  localStorage.setItem('language', lng);
  
  // Update Arabic font class
  if (lng === 'ar') {
    document.body.classList.add('font-arabic');
  } else {
    document.body.classList.remove('font-arabic');
  }
});

export default i18n;
