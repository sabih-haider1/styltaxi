import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import es from './locales/es.json'
import ca from './locales/ca.json'

export const LANGUAGES = [
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ca', label: 'Català', short: 'CA' },
  { code: 'en', label: 'English', short: 'EN' },
]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ca: { translation: ca },
    },
    fallbackLng: 'es',
    supportedLngs: ['en', 'es', 'ca'],
    // Normalize regional variants (en-US, es-ES, ca-ES) to our bundles so
    // detection never lands on an unsupported variant with missing strings.
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    detection: {
      // Default to Spanish for everyone; only an explicit choice (persisted
      // in localStorage) overrides it — browser language is ignored.
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'styltaxi_lang',
    },
  })

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

// init() resolves before the listener above is attached (resources are
// bundled, so init is synchronous) — sync the attribute for the initial load.
document.documentElement.lang = i18n.resolvedLanguage || 'es'

export default i18n
