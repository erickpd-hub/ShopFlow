"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/language-toggle";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed z-50 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out ${scrolled
            ? "top-4 w-[calc(100%-2rem)] max-w-7xl glass-card py-2 rounded-2xl shadow-xl px-4"
            : "top-0 w-full bg-transparent py-4 px-0 border-transparent shadow-none"
            }`}>
            <div className={`mx-auto transition-all duration-500 ease-in-out ${scrolled ? "w-full" : "max-w-7xl px-4 sm:px-6 lg:px-8"}`}>
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-2xl">storefront</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">ShopFlow</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
                        <Link href="/how-it-works" className="hover:text-primary transition-colors">{t.nav.howItWorks}</Link>
                        <Link href="/templates" className="hover:text-primary transition-colors">{t.nav.templates}</Link>
                        <Link href="/pricing" className="hover:text-primary transition-colors">{t.nav.pricing}</Link>
                        <Link href="/showcase" className="hover:text-primary transition-colors">{t.nav.showcase}</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">{t.nav.login}</Link>
                        <Button asChild className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-all border-none h-auto shadow-lg shadow-black/5">
                            <Link href="/register">{t.nav.startSelling}</Link>
                        </Button>
                        <LanguageToggle />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
