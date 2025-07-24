import { useTranslation as useI18nTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../index';

// 类型安全的翻译键
type TranslationKey = 
  | `common.${string}`
  | `button.${string}`
  | `navigation.${string}`
  | `form.${string}`
  | `message.${string}`
  | `input.${string}`;

interface UseTranslationReturn {
  t: (key: TranslationKey, options?: any) => string;
  i18n: {
    language: string;
    changeLanguage: (lng: SupportedLanguage) => Promise<any>;
  };
  ready: boolean;
}

/**
 * 自定义的国际化 Hook，提供类型安全的翻译功能
 */
export const useTranslation = (): UseTranslationReturn => {
  const { t, i18n, ready } = useI18nTranslation();

  return {
    t: (key: TranslationKey, options?: any) => {
      const result = t(key, options);
      return typeof result === 'string' ? result : String(result);
    },
    i18n: {
      language: i18n.language,
      changeLanguage: (lng: SupportedLanguage) => i18n.changeLanguage(lng),
    },
    ready,
  };
};

/**
 * 获取当前语言
 */
export const useCurrentLanguage = (): SupportedLanguage => {
  const { i18n } = useI18nTranslation();
  return i18n.language as SupportedLanguage;
};

/**
 * 语言切换 Hook
 */
export const useLanguageSwitch = () => {
  const { i18n } = useI18nTranslation();
  
  const switchLanguage = (language: SupportedLanguage) => {
    i18n.changeLanguage(language);
  };

  const getCurrentLanguage = (): SupportedLanguage => {
    return i18n.language as SupportedLanguage;
  };

  return {
    switchLanguage,
    getCurrentLanguage,
    currentLanguage: i18n.language as SupportedLanguage,
  };
};
