import React, { useEffect, useRef, useState } from 'react';
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const languageEntries = Object.entries(supportedLanguages);
  const currentIndex = languageEntries.findIndex(([code]) => code === currentLanguage);

  useEffect(() => {
    if (containerRef.current && variant === 'buttons') {
      const buttons = containerRef.current.querySelectorAll('button');
      const activeButton = buttons[currentIndex] as HTMLButtonElement;
      
      if (activeButton) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        
        setIndicatorStyle({
          width: `${buttonRect.width}px`,
          transform: `translateX(${buttonRect.left - containerRect.left}px)`,
        });
      }
    }
  }, [currentLanguage, variant, currentIndex]);

  if (variant === 'buttons') {
    return (
      <div 
        ref={containerRef}
        className={`${styles.buttonGroup} ${className || ''}`}
      >
        <div 
          className={styles.indicator}
          style={indicatorStyle}
        />
        {languageEntries.map(([code, name]) => (
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