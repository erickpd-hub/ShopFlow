"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Features() {
    const { t } = useLanguage();

    const steps = [
        {
            title: t.features.step1Title,
            description: t.features.step1Desc,
            icon: "auto_awesome_motion",
            linkText: t.features.step1Link,
        },
        {
            title: t.features.step2Title,
            description: t.features.step2Desc,
            icon: "touch_app",
            linkText: t.features.step2Link,
        },
        {
            title: t.features.step3Title,
            description: t.features.step3Desc,
            icon: "payments",
            linkText: t.features.step3Link,
        }
    ];

    return (
        <section id="how-it-works" className="py-32 px-4 bg-background duration-500 transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black dark:text-white leading-tight">
                        {t.features.title} <em>{t.features.titleAccent}</em>{t.features.titleEnd}
                    </h2>
                    <p className="text-color-500 dark:text-color-400 max-w-2xl mx-auto text-lg font-medium">
                        {t.features.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:grid-rows-2">
                    {/* Step 1 - Large Cell */}
                    <div className="md:col-span-3 md:row-span-2 glass-card p-10 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-black/5 hover:shadow-primary/5">
                        <div>
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                                <span className="material-symbols-outlined text-primary text-3xl">{steps[0].icon}</span>
                            </div>
                            <h3 className="text-3xl font-black mb-6 text-black dark:text-white">{steps[0].title}</h3>
                            <p className="text-color-500 dark:text-color-400 text-lg leading-relaxed mb-8 max-w-md">
                                {steps[0].description}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group-hover:gap-3 transition-all">
                            {steps[0].linkText} <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </div>
                    </div>

                    {/* Step 2 - Medium Cell */}
                    <div className="md:col-span-3 md:row-span-1 glass-card p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-black/5 hover:shadow-primary/5">
                        <div className="flex gap-8 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-primary text-2xl">{steps[1].icon}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-3 text-black dark:text-white">{steps[1].title}</h3>
                                <p className="text-color-500 dark:text-color-400 text-sm leading-relaxed mb-4">
                                    {steps[1].description}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs cursor-pointer group-hover:gap-3 transition-all">
                                    {steps[1].linkText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 - Medium Cell */}
                    <div className="md:col-span-3 md:row-span-1 glass-card p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-black/5 hover:shadow-primary/5">
                        <div className="flex gap-8 items-start">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-primary text-2xl">{steps[2].icon}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-black mb-3 text-black dark:text-white">{steps[2].title}</h3>
                                <p className="text-color-500 dark:text-color-400 text-sm leading-relaxed mb-4">
                                    {steps[2].description}
                                </p>
                                <div className="flex items-center gap-2 text-primary font-bold text-xs cursor-pointer group-hover:gap-3 transition-all">
                                    {steps[2].linkText} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
