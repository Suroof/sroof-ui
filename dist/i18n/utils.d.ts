import type { SupportedLanguage } from './index';
/**
 * 获取浏览器默认语言
 */
export declare const getBrowserLanguage: () => SupportedLanguage;
/**
 * 从本地存储获取保存的语言
 */
export declare const getSavedLanguage: () => SupportedLanguage | null;
/**
 * 保存语言到本地存储
 */
export declare const saveLanguage: (language: SupportedLanguage) => void;
/**
 * 格式化数字（考虑不同语言的数字格式）
 */
export declare const formatNumber: (num: number, language: SupportedLanguage) => string;
/**
 * 格式化日期（考虑不同语言的日期格式）
 */
export declare const formatDate: (date: Date, language: SupportedLanguage, options?: Intl.DateTimeFormatOptions) => string;
/**
 * 格式化货币（考虑不同语言的货币格式）
 */
export declare const formatCurrency: (amount: number, language: SupportedLanguage, currency?: string) => string;
/**
 * 获取文本方向（RTL/LTR）
 */
export declare const getTextDirection: (language: SupportedLanguage) => 'ltr' | 'rtl';
/**
 * 检查是否为有效的语言代码
 */
export declare const isValidLanguage: (lang: string) => lang is "en" | "zh";
/**
 * 获取语言的本地化名称
 */
export declare const getLanguageNativeName: (language: SupportedLanguage) => string;
//# sourceMappingURL=utils.d.ts.map