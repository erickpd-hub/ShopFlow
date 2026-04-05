"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="py-32 px-4 bg-background duration-500 transition-colors">
            <div className="max-w-7xl mx-auto bg-black text-white rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary"></div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                    {t.footer.title} <em>{t.footer.titleAccent}</em>{t.footer.titleEnd}
                </h2>
                <p className="text-color-400 mb-12 max-w-xl mx-auto text-lg font-medium">
                    {t.footer.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Button asChild className="bg-white text-black px-10 py-7 rounded-full font-bold shadow-xl shadow-white/5 hover:scale-105 transition-all h-auto border-none text-lg">
                        <Link href="/register">{t.footer.cta}</Link>
                    </Button>
                    <Link href="/how-it-works" className="text-sm font-bold hover:text-primary transition-all underline underline-offset-8 decoration-primary/30">
                        {t.footer.howItWorks}
                    </Link>
                </div>

                <div className="mt-24 pt-12 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 text-left text-sm text-color-500">
                    <div className="space-y-3">
                        <p className="font-bold text-white uppercase tracking-wider">{t.footer.solution}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.sellOnline}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.templates}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.marketing}</p>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-white uppercase tracking-wider">{t.footer.support}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.helpCenter}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.community}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.contact}</p>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-white uppercase tracking-wider">{t.footer.legal}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.privacy}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.terms}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.fees}</p>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-white uppercase tracking-wider">{t.footer.resources}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.blog}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.course}</p>
                        <p className="hover:text-primary cursor-pointer transition-colors">{t.footer.podcast}</p>
                    </div>
                </div>
                <p className="mt-12 text-[10px] text-color-600">© {new Date().getFullYear()} ShopFlow. {t.footer.copyright}</p>
            </div>
        </footer>
    );
}
