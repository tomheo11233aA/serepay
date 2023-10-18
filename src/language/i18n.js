import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import english from "./english.json"
import vietnamese from "./vietnamese.json"

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: english,
        vn: vietnamese,
    },
    lng: 'en',
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
})

export default i18next