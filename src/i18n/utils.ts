import type { SupportedLanguage } from './index';

/**
 * 获取浏览器默认语言
 */
export const getBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.split('-')[0];
  return (browserLang === 'zh' ? 'zh' : 'en') as SupportedLanguage;
};

/**
 * 从本地存储获取保存的语言
 */
export const getSavedLanguage = (): SupportedLanguage | null => {
  try {
    const saved = localStorage.getItem('i18nextLng');
    return saved as SupportedLanguage;
  } catch {
    return null;
  }
};

/**
 * 保存语言到本地存储
 */
export const saveLanguage = (language: SupportedLanguage): void => {
  try {
    localStorage.setItem('i18nextLng', language);
  } catch {
    // 忽略存储错误
  }
};

/**
 * 格式化数字（考虑不同语言的数字格式）
 */
export const formatNumber = (num: number, language: SupportedLanguage): string => {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  return new Intl.NumberFormat(locale).format(num);
};

/**
 * 格式化日期（考虑不同语言的日期格式）
 */
export const formatDate = (
  date: Date,
  language: SupportedLanguage,
  options?: Intl.DateTimeFormatOptions
): string => {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat(locale, { ...defaultOptions, ...options }).format(date);
};

/**
 * 格式化货币（考虑不同语言的货币格式）
 */
export const formatCurrency = (
  amount: number,
  language: SupportedLanguage,
  currency: string = 'USD'
): string => {
  const locale = language === 'zh' ? 'zh-CN' : 'en-US';
  const currencyCode = language === 'zh' && currency === 'USD' ? 'CNY' : currency;
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

/**
 * 获取文本方向（RTL/LTR）
 */
export const getTextDirection = (language: SupportedLanguage): 'ltr' | 'rtl' => {
  // 目前支持的语言都是 LTR，如果以后添加阿拉伯语等 RTL 语言需要修改
  return 'ltr';
};

/**
 * 检查是否为有效的语言代码
 */
export const isValidLanguage = (lang: string): lang is SupportedLanguage => {
  return ['en', 'zh'].includes(lang);
};

/**
 * 获取语言的本地化名称
 */
export const getLanguageNativeName = (language: SupportedLanguage): string => {
  const names = {
    en: 'English',
    zh: '中文',
  };
  return names[language];
};