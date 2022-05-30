/*
Initialisering og konfigurering av i18next.js. i18next er språkbiblioteket som vi har benyttet
for dette prosjektet. Siden denne innleses i index.js blir oversettelser tilgjengelig globalt
i hele prosjektet ved import og bruk av {t} variabelen. Oversettelser leses inn
fra /frontend/public/locales{språk}/translation.json og brukes ved å gjengi en nøkkel sammen med
variabelen {t}. Et eksempel: {t(nøkkel_som_skal_leses)}
*/
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: false,
    react: {
      wait: true,
      useSuspense: false
   }
  });
  


export default i18n;