import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './en.json';
import vi from './vi.json';

const LANGUAGE_KEY = '@app_language';

// Detect stored language
const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    try {
      const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
      callback(stored || 'vi'); // Mặc định tiếng Việt
    } catch {
      callback('vi');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch {}
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
    fallbackLng: 'vi',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export const changeLanguage = async (lang) => {
  await i18n.changeLanguage(lang);
};

export const getCurrentLanguage = () => i18n.language;

export default i18n;
