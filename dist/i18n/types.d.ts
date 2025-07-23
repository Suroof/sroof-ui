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
export type TranslationKey = {
    [K in keyof TranslationNamespace]: {
        [P in keyof TranslationNamespace[K]]: `${K}.${P & string}`;
    }[keyof TranslationNamespace[K]];
}[keyof TranslationNamespace];
export type LanguageCode = "en" | "zh";
export interface I18nConfig {
    defaultLanguage: LanguageCode;
    fallbackLanguage: LanguageCode;
    supportedLanguages: LanguageCode[];
    debug?: boolean;
}
export type TranslateFunction = (key: TranslationKey, options?: {
    [key: string]: string | number | undefined;
    count?: number;
}) => string;
//# sourceMappingURL=types.d.ts.map