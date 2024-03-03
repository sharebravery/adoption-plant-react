import en from './en-US.json'
import zh from './zh-CN.json'

export enum LanguageType {
  EN = 'en',
  ZH = 'zh',
}

export const resources = {
  [LanguageType.EN]: {
    translation: en,
  },
  [LanguageType.ZH]: {
    translation: zh,
  },
}
