"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

const featuredTemplates = [
    {
        id: "dawn",
        name: "Dawn Classic",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        price: "Free",
        category: "Basic"
    },
    {
        id: "nova",
        name: "Nova Tech",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        price: "Premium",
        category: "Tech"
    },
    {
        id: "organic",
        name: "Organic Bloom",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8ff1?w=800&q=80",
        price: "Free",
        category: "Beauty"
    }
];

export default function TemplatesSection() {
    const { t, language } = useLanguage();

    const title = language === "es" ? "Diseños que" : "Designs that";
    const accent = language === "es" ? "venden" : "sell";
    const subtitle = language === "es" 
        ? "Elige una base profesional y personalízala con IA. Sin límites creativos."
        : "Start with a professional base and customize it with AI. No creative limits.";
    const cta = language === "es" ? "Ver todos los diseños" : "View all designs";

    return (
        <section id="templates" className="py-32 bg-background duration-500 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-8">
                        {language === "es" ? "Plantillas Premium" : "Premium Templates"}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 text-black dark:text-white tracking-tight leading-tight">
                        {title} <em className="text-primary">{accent}</em>
                    </h2>
                    <p className="text-color-500 dark:text-color-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {featuredTemplates.map((temp) => (
                        <motion.div
                            key={temp.id}
                            whileHover={{ y: -10 }}
                            className="group glass-card overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-white dark:bg-color-900/20"
                        >
                            <div className="aspect-[4/3] relative overflow-hidden bg-color-100 dark:bg-color-800/50">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${temp.image})` }}
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <Badge className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-foreground font-black border-none rounded-lg px-2 py-0.5 text-[10px] uppercase tracking-wider">
                                        {temp.category}
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-black">{temp.name}</h3>
                                    <span className={`text-xs font-black px-3 py-1 rounded-full ${temp.price === 'Free' ? 'bg-green-500/10 text-green-600' : 'bg-primary/10 text-primary'}`}>
                                        {temp.price}
                                    </span>
                                </div>
                                <Button asChild className="w-full rounded-2xl h-12 font-black bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-xl transition-all border-none">
                                    <Link href="/templates">
                                        {language === "es" ? "Usar esta plantilla" : "Use this template"}
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-6">
                    <Button asChild variant="outline" className="rounded-2xl h-14 px-12 text-lg font-black bg-transparent border-color-200 dark:border-color-800 hover:bg-primary/5 hover:text-primary transition-all group group-hover:gap-4 shadow-xl shadow-black/5">
                        <Link href="/templates">
                            {cta}
                            <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </Button>
                    <p className="text-color-400 text-sm font-bold uppercase tracking-widest">
                        {language === "es" ? "+50 Diseños próximamente" : "+50 Designs coming soon"}
                    </p>
                </div>
            </div>
        </section>
    );
}
