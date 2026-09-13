import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import tr from '../locales/tr';
import en from '../locales/en';

const STORAGE_KEY = 'hesapkitap-language';
const SUPPORTED_LANGUAGES = ['tr', 'en'];
const DEFAULT_LANGUAGE = 'tr';

const translations = {
  tr,
  en,
};

const PAGE_METADATA = {
  tr: {
    title: 'HesapKitap — Günlük Hesaplama Araçları',
    description: 'Günlük yaşam, sağlık, matematik, zaman ve eğitim alanlarında modern hesaplama araçları.',
  },
  en: {
    title: 'HesapKitap — Modern Online Calculators',
    description: 'Modern online calculation tools for health, mathematics, time, and education.',
  },
};

const LanguageContext = createContext(null);

function getNestedTranslation(obj, path) {
  if (!obj || !path) return undefined;
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i += 1) {
    if (current && typeof current === 'object' && keys[i] in current) {
      current = current[keys[i]];
    } else {
      return undefined;
    }
  }
  return current;
}

function interpolate(text, params) {
  if (typeof text !== 'string' || !params) {
    return text;
  }
  return text.replace(/\{(\w+)\}/g, (match, paramName) => {
    return Object.prototype.hasOwnProperty.call(params, paramName)
      ? String(params[paramName])
      : match;
  });
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
        return saved;
      }
    } catch {
      // Ignore localStorage read errors (e.g. private mode)
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = useCallback((newLang) => {
    if (SUPPORTED_LANGUAGES.includes(newLang)) {
      setLanguageState(newLang);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'tr' ? 'en' : 'tr'));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore localStorage write errors
    }

    // Dynamic document language attribute
    document.documentElement.lang = language;

    // Dynamic metadata update
    const meta = PAGE_METADATA[language] || PAGE_METADATA.tr;
    document.title = meta.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.description);
    }
  }, [language]);

  const t = useCallback(
    (key, params) => {
      const activeDict = translations[language] || translations[DEFAULT_LANGUAGE];
      let value = getNestedTranslation(activeDict, key);

      // Fallback to default language if key missing in active language
      if (value === undefined && language !== DEFAULT_LANGUAGE) {
        value = getNestedTranslation(translations[DEFAULT_LANGUAGE], key);
      }

      if (value === undefined) {
        return key;
      }

      if (typeof value === 'string') {
        return interpolate(value, params);
      }

      return value;
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
    }),
    [language, setLanguage, toggleLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
