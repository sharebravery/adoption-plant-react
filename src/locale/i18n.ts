import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './locales/index'

const browserLanguage = window.navigator.language

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: browserLanguage ?? 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
