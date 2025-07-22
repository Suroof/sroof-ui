// 国际化相关的类型定义

export interface TranslationNamespace {
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    submit: string;
    reset: string;
  };
  button: {
    primary: string;
    secondary: string;
    outline: string;
    text: string;
    small: string;
    medium: string;
    large: string;
    disabled: string;
  };
  navigation: {
    home: string;
    about: string;
    contact: string;
    services: string;
    products: string;
  };
  form: {
    required: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    phone: string;
    address: string;
  };
  message: {
    welcome: string;
    goodbye: string;
    itemCount: string;
  };
}

// 翻译键的类型
export type TranslationKey = {
  [K in keyof TranslationNamespace]: {
    [P in keyof TranslationNamespace[K]]: `${K}.${P & string}`;
  }[keyof TranslationNamespace[K]];
}[keyof TranslationNamespace];

// 语言代码类型
export type LanguageCode = "en" | "zh";

// 国际化配置接口
export interface I18nConfig {
  defaultLanguage: LanguageCode;
  fallbackLanguage: LanguageCode;
  supportedLanguages: LanguageCode[];
  debug?: boolean;
}

// 翻译函数类型
export type TranslateFunction = (
  key: TranslationKey,
  options?: {
    [key: string]: string | number | undefined;
    count?: number;
  }
) => string;
