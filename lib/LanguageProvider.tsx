'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations, type Lang, type Translations } from './i18n';

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Translations };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('ekie-lang')) as Lang | null;
    if (saved === 'en' || saved === 'fr') setLangState(saved);
    else if (typeof navigator !== 'undefined' && navigator.language.startsWith('fr')) setLangState('fr');
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('ekie-lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
