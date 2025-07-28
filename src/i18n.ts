import LangaugeDetector from "i18next-browser-languagedetector"
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import en from './locales/en/default.json';
// import zh from './locales/zh-Hant/default.json';
import ar from './locales/ar/default.json';
import es from './locales/es/default.json';

i18next
  // .use(I18NextHttpBackend)
  .use(LangaugeDetector)
  .use(initReactI18next)
  // .use(customDetector as any)
  .init({
    debug: false,
    resources: {
      en: {translation: en},
      // zh: {translation: zh},
      ar: {translation: ar},
      es: {translation: es},
    },
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0,
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    keySeparator: '.'
  })
export default i18next;