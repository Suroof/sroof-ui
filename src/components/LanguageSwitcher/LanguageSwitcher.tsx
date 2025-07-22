import React from 'react';
import { useLanguageSwitch } from '../../i18n/hooks/useTranslation';
import { supportedLanguages, type SupportedLanguage } from '../../i18n';
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'dropdown',
}) => {
  const { switchLanguage, currentLanguage } = useLanguageSwitch();

  const handleLanguageChange = (language: SupportedLanguage) => {
    switchLanguage(language);
  };

  if (variant === 'buttons') {
    return (
      <div className={`${styles.buttonGroup} ${className || ''}`}>
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <button
            key={code}
            className={`${
              styles.languageButton
            } ${currentLanguage === code ? styles.active : ''}`}
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
            type="button"
          >
            {name}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.dropdown} ${className || ''}`}>
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className={styles.select}
      >
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;