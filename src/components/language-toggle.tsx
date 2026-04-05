"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-3 font-bold text-xs hover:bg-color-100 dark:hover:bg-color-800/50 transition-all active:scale-95 flex items-center gap-1.5"
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        >
            <span className="material-symbols-outlined text-sm">language</span>
            <span className="uppercase">{language}</span>
        </Button>
    );
}
