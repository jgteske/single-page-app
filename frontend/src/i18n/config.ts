// src/i18n/config.ts

// Core i18next library.
import i18n from 'i18next';
// Bindings for React: allow components to
// re-render when language changes.
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend'; // primary use cache

// Add names for each locale to
// show the user in our locale
// switcher.
export const supportedLngs = {
  en: 'Englisch',
  de: 'Deutsch',
};

import translationEN from '../locales/en/translation.json';
import translationDE from '../locales/de/translation.json';

i18n
  .use(Backend)
  // Detect Language of browser
  .use(LanguageDetector)
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options for LanguageDetector
    // first check set language in querystring (?lng=en), then set language with Language selector in localStorage (persistent language setting) and at last the browser settings
    detection: {
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      //order: ['querystring', 'localStorage', 'path'],
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
    },
    // Specifies the default language (locale) used
    // when a user visits our site for the first time.
    // We use English here, but feel free to use
    // whichever locale you want.
    //lng: 'de',

    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here.
    fallbackLng: 'en',

    // Explicitly tell i18next our
    // supported locales.
    supportedLngs: Object.keys(supportedLngs),

    // Enables useful output in the browser’s
    // dev console.
    debug: false,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn
    // it off in i18next.
    interpolation: {
      escapeValue: false,
    },

    // use backends
    backend: {
      backends: [
        LocalStorageBackend, // primary backend
      ],
      backendOptions: [
        {
          /* options for primary backend */
          // prefix for stored languages

          // expiration
          expirationTime: 30 * 1000, // 7 days
          //expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
      ],
    },

    // Translation messages. Add any languages
    // you want here.
    resources: {
      // English
      en: translationEN,
      // German
      de: translationDE,
    },
  });

export default i18n;
