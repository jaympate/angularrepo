import {TranslationKeyValues} from './translation.key.values';


export interface BackendTranslations {
  translations: TranslationsForLanguage;
}

export interface TranslationsForLanguage {
  en: TranslationKeyValues;
  fr: TranslationKeyValues;
  nl: TranslationKeyValues;
}
