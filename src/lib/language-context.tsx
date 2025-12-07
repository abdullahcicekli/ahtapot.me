'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { translations, TranslationKey } from '@/data/translations';
import type { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLang?: Language;
}

export function LanguageProvider({ children, initialLang = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Navigate to the new language path
    const newPath = pathname.replace(/^\/(en|tr)/, `/${lang}`);
    router.push(newPath);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
