"use client";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import LogoCloud from "@/components/landing/LogoCloud";
import Features from "@/components/landing/Features";
import TemplatesSection from "@/components/landing/TemplatesSection";
import Footer from "@/components/landing/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <LogoCloud />
      <Features />
      <TemplatesSection />

      {/* Pricing Section - Adapted following the new design */}
      <section id="pricing" className="py-32 bg-background duration-500 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-8 uppercase tracking-widest">
            {t.pricing.badge} <em>{t.pricing.badgeAccent}</em>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-black dark:text-white tracking-tight">
            {t.pricing.title} <em>{t.pricing.titleAccent}</em>{t.pricing.titleEnd}
          </h2>
          <p className="text-color-500 dark:text-color-400 text-lg mb-16 max-w-2xl mx-auto font-medium">
            {t.pricing.subtitle}
          </p>
          <div className="max-w-4xl mx-auto glass-card p-16 flex flex-col items-center justify-center shadow-2xl shadow-black/5">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-5xl text-primary">payments</span>
            </div>
            <p className="text-color-500 font-bold text-xl mb-2">{t.pricing.comingSoon}</p>
            <p className="text-color-400">{t.pricing.integrated}</p>
          </div>
        </div>
      </section>

      {/* FAQ Section - Adapted */}
      <section id="faq" className="py-32 bg-background duration-500 transition-colors">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-black dark:text-white tracking-tight">
              {t.faq.title} <em>{t.faq.titleAccent}</em>
            </h2>
            <p className="text-color-500 dark:text-color-400 text-lg font-medium">{t.faq.subtitle}</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-10 glass-card text-left shadow-2xl shadow-black/5 hover:shadow-primary/5 transition-all">
              <h3 className="font-black mb-4 text-xl text-black dark:text-white">{t.faq.q1}</h3>
              <p className="text-color-500 dark:text-color-400 leading-relaxed text-lg">{t.faq.a1}</p>
            </div>
            <div className="p-10 glass-card text-left shadow-2xl shadow-black/5 hover:shadow-primary/5 transition-all">
              <h3 className="font-black mb-4 text-xl text-black dark:text-white">{t.faq.q2}</h3>
              <p className="text-color-500 dark:text-color-400 leading-relaxed text-lg">{t.faq.a2}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
