import LangaugeDetector from "i18next-browser-languagedetector"
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";


const createLanguageDetector = (detector?: LangaugeDetector) => {
  const internalDetector = detector || new LangaugeDetector()
  return {
    type: "languageDetector" as const,
    async: false,
    init(options?: any, allOptions?: any) {
      internalDetector.init(options, allOptions)
    },
    detect(){
      const detected = internalDetector.detect()
      if(typeof detected === "string"){
        return detected.toLowerCase().startsWith("en")? "en": detected
      }else if(Array.isArray(detected)){
        return detected.map((item: string) => {
          return item.toLowerCase().startsWith("en")? "en": item
        })
      }
      return "en"
    }
  }
}

const customDetector = createLanguageDetector()

i18next
  .use(I18NextHttpBackend)
  .use(initReactI18next)
  .use(customDetector as any)
  .init({
    debug: false,
    detection: {
      lookupLocalStorage: 'i18nextLng'
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    ns: ['default'],
    defaultNS: 'default',
    keySeparator: '.'
  })
export default i18next;