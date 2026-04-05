"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LogoCloud() {
    const { t } = useLanguage();

    return (
        <section className="py-20 border-y border-color-100 dark:border-color-900 bg-background duration-500 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <p className="text-center text-xs font-bold tracking-[0.2em] text-color-400 uppercase mb-12">
                    {t.logocloud.text} <em>{t.logocloud.accent}</em>{t.logocloud.end}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700 ease-in-out">
                    <div className="flex items-center gap-2 font-bold text-xl text-foreground"><span className="material-symbols-outlined">local_mall</span> Boutique</div>
                    <div className="flex items-center gap-2 font-bold text-xl text-foreground"><span className="material-symbols-outlined">diamond</span> Jewel</div>
                    <div className="flex items-center gap-2 font-bold text-xl text-foreground"><span className="material-symbols-outlined">brush</span> Studio</div>
                    <div className="flex items-center gap-2 font-bold text-xl text-foreground"><span className="material-symbols-outlined">styler</span> Fashion</div>
                    <div className="flex items-center gap-2 font-bold text-xl text-foreground"><span className="material-symbols-outlined">coffee</span> Roasters</div>
                </div>
            </div>
        </section>
    );
}
