/**
 * @module translationBundle
 * @group Function
 */
import { supportedLngs } from './config';
import { useTranslation } from 'react-i18next';

/**
 * Let's you create a language Bundle
 * @param messages - An object containing language messages.
 * @returns The provided language bundle.
 * @template T - The type of the messages object.
 *
 * @example
 * ```ts
 * import { createLocalLanguageBundle } from './i18n';
 *
 * const messages = {
 *   de: { greeting: "Hallo" },
 *   en: { greeting: "Hello" },
 * };
 *
 * const bundle = createLocalLanguageBundle(messages);
 * // Output: { en: { greeting: "Hello" }, fr: { greeting: "Bonjour" } }
 * ```
 */
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

/**
 * Provides the globally defined language Bundle
 * @param messages - An object containing language messages.
 * @returns The language messages for the current language, or English as fallback.
 * @template T - The type of the messages object.
 *
 * @example
 * ```ts
 * import { useLocalLanguageBundle } from './i18n';
 * import { useTranslation } from 'react-i18next';
 *
 * const messages = {
 *   en: { greeting: "Hello" },
 *   fr: { greeting: "Bonjour" }
 * };
 *
 * const Greeting = () => {
 *   const { greeting } = useLocalLanguageBundle(messages);
 *   return <div>{greeting}</div>;
 * };
 * // If the current language is French, the output will be: <div>Bonjour</div>
 * ```
 *
 * {@link createLocalLanguageBundle}
 */
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
