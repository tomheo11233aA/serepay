import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import english from "./english.json"
import vietnamese from "./vietnamese.json"
import korean from "./korean.json"
import japanese from "./japanese.json"
import chinese from "./chinese.json"
import thailand from "./thailand.json"
import khmer from "./cambodia.json"
import laos from "./laos.json"
import indonesia from "./indonesia.json"
import french from "./french.json"
import spanish from "./spain.json"
import italian from "./italy.json"
import german from "./germany.json"
import portuguese from "./portugal.json"
import turkish from "./turkey.json"
import russian from "./russia.json"
import dutch from "./netherland.json"
import malay from "./malaysia.json"
import arabic from "./saudiarabia.json"
import hebrew from "./israel.json"
import greek from "./greece.json"
import polish from "./poland.json"
import hindi from "./india.json"

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
        en: english,
        vn: vietnamese,
        ko: korean,
        ja: japanese,
        zh: chinese,
        th: thailand,
        km: khmer,
        lo: laos,
        id: indonesia,
        fr: french,
        es: spanish,
        it: italian,
        de: german,
        pt: portuguese,
        tr: turkish,
        ru: russian,
        nl: dutch,
        ms: malay,
        ar: arabic,
        he: hebrew,
        el: greek,
        pl: polish,
        hi: hindi,
    },
    lng: 'en',
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
})

export default i18next