import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationES from './locales/sl/translation.json';

const storedLanguage = localStorage.getItem('language');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      sl: { translation: translationES },
    },
    lng: storedLanguage || 'en', // Use stored language or default to 'en'
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Update the language in localStorage when the user changes it
i18n.on('languageChanged', (newLanguage) => {
  localStorage.setItem('language', newLanguage);
});

export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';

// import translationEN from './locales/en/translation.json';
// import translationES from './locales/sl/translation.json';

// i18n
//   .use(initReactI18next)
//   .init({
//     resources: {
//       en: { translation: translationEN },
//       sl: { translation: translationES },
//     },
//     lng: 'en', // Default language
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false,
//     },
//   });

// export default i18n;
