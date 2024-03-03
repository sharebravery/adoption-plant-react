import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import type { Locale } from 'antd/es/locale'

export function getLanguageLib() {
  const browserLanguage: string = window.navigator.language

  const lanMap: Record<string, Locale> = {
    'zh-CN': zhCN,
    'en-US': enUS,
  }

  return {
    locale: lanMap[browserLanguage] ?? lanMap['en-US'],
    // locale: lanMap['en-US'],
    browserLanguage,
  }
}
