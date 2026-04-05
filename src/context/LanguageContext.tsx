"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

type TranslationKeys = typeof translations.en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'es')) {
            setLanguageState(savedLang);
            document.documentElement.lang = savedLang;
        } else {
            const browserLang = navigator.language.split('-')[0];
            const detected = browserLang === 'es' ? 'es' : 'en';
            setLanguageState(detected);
            document.documentElement.lang = detected;
        }
        setIsMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
    };

    const value = {
        language,
        setLanguage,
        t: translations[language]
    };

    if (!isMounted) return null;

    if (!isMounted) return null; // Prevenimos mismatch de hidratación

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
