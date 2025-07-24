import type { SupportedLanguage } from '../index';
type TranslationKey = `common.${string}` | `button.${string}` | `navigation.${string}` | `form.${string}` | `message.${string}` | `input.${string}`;
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
export declare const useTranslation: () => UseTranslationReturn;
/**
 * 获取当前语言
 */
export declare const useCurrentLanguage: () => SupportedLanguage;
/**
 * 语言切换 Hook
 */
export declare const useLanguageSwitch: () => {
    switchLanguage: (language: SupportedLanguage) => void;
    getCurrentLanguage: () => SupportedLanguage;
    currentLanguage: SupportedLanguage;
};
export {};
//# sourceMappingURL=useTranslation.d.ts.map