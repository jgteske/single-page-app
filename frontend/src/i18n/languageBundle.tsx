import { supportedLngs } from './config';
import { useTranslation } from 'react-i18next';

export const createLocalLanguageBundle = <T extends object>(messages: T): T => {
  for (const key in messages) {
    if (!(key in supportedLngs)) {
      console.error(
        `Language ${key} not supported! Use either of the supported languages [${Object.keys(supportedLngs)}]`
      );
    }
  }
  return messages;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useLocalLanguageBundle = <T extends Record<string, any>>(
  messages: T
): T[keyof T] => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Check if the current language is in the messages object
  if (currentLang in messages) {
    return messages[currentLang] as T[keyof T];
  }

  // Provide a fallback (default to English)
  return messages.en as T[keyof T];
};
