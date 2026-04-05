"use client";

import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { THEME_PRESETS } from "@/lib/theme-presets";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Template {
    id: string;
    name: string;
    description: string;
    image: string;
    price: "free" | "premium";
    category: string;
    cost?: string;
}

const templates: Template[] = [
    {
        id: "aura",
        name: "Aura Minimalist",
        description: "High-end minimalist aesthetic for fashion and luxury brands.",
        image: "/templates/aura.png",
        price: "premium",
        cost: "$79",
        category: "Fashion"
    },
    {
        id: "pulse",
        name: "Pulse Tech",
        description: "Cyberpunk-inspired dark mode layout for tech and gadgets.",
        image: "/templates/pulse.png",
        price: "premium",
        cost: "$89",
        category: "Tech"
    },
    {
        id: "artisan",
        name: "Artisan Earth",
        description: "Warm, organic tones and serif fonts for handmade products.",
        image: "/templates/artisan.png",
        price: "free",
        category: "Artisan"
    },
    {
        id: "vista",
        name: "Vista Modern",
        description: "Architectural and spacious layout for modern interiors.",
        image: "/templates/vista.png",
        price: "free",
        category: "Interior"
    },
    {
        id: "dawn",
        name: "Dawn Classic",
        description: "Minimalist, chic, and optimized for high-volume catalogs.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
        price: "free",
        category: "Basic"
    },
    {
        id: "organic",
        name: "Organic Bloom",
        description: "Soft colors and serif fonts for skincare and natural products.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8ff1?w=800&q=80",
        price: "free",
        category: "Beauty"
    }
];

export default function TemplatesPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [filter, setFilter] = useState<"all" | "free" | "premium">("all");
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const handleUseTheme = (id: string) => {
        const preset = THEME_PRESETS[id as keyof typeof THEME_PRESETS];
        if (preset) {
            localStorage.setItem("pending_theme_preset", JSON.stringify(preset));
            toast.success("Theme preset loaded! Opening editor...");
            setTimeout(() => {
                router.push("/theme-editor");
            }, 800);
        } else {
            toast.error("This theme is a preview. Official templates Coming Soon.");
        }
    };

    const filteredTemplates = templates.filter(temp => {
        if (filter === "all") return true;
        return temp.price === filter;
    });

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-40 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--primary-20),transparent_50%)] opacity-30" />
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-8"
                    >
                        Store Showcase
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
                        Pick the <span className="text-primary italic">Perfect</span> <br />
                        Design for your Brand
                    </h1>
                    <p className="text-color-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                        Explore our library of high-converting templates. 
                        Fully customizable, SEO-optimized, and mobile-ready out of the box.
                    </p>

                    {/* Filters */}
                    <div className="flex items-center justify-center gap-2 bg-color-100 dark:bg-color-900/50 p-2 rounded-2xl w-fit mx-auto shadow-sm border border-color-200 dark:border-color-800">
                        {["all", "free", "premium"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilter(type as any)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${
                                    filter === type 
                                    ? "bg-white dark:bg-color-800 shadow-lg shadow-black/5 text-primary scale-105" 
                                    : "text-color-400 hover:text-foreground"
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Template Grid */}
            <section className="pb-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredTemplates.map((temp) => (
                                <motion.div
                                    layout
                                    key={temp.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="group glass-card overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 bg-white dark:bg-color-900/20"
                                >
                                    <div className="aspect-[4/3] relative overflow-hidden bg-color-100 dark:bg-color-800/50 cursor-pointer" onClick={() => setSelectedTemplate(temp)}>
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${temp.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <Button className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all bg-white text-black hover:bg-zinc-100 font-bold rounded-full gap-2 px-6">
                                                <span className="material-symbols-outlined text-sm">visibility</span>
                                                Live Preview
                                            </Button>
                                        </div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <Badge className="bg-white/90 dark:bg-black/80 backdrop-blur-md text-foreground font-bold border-none shadow-sm rounded-lg px-2 py-0.5 text-[10px] uppercase tracking-wider">
                                                {temp.category}
                                            </Badge>
                                            {temp.price === "premium" && (
                                                <Badge className="bg-primary text-white border-none shadow-lg shadow-primary/20 rounded-lg px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                                                    PREMIUM
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-black tracking-tight">{temp.name}</h3>
                                            <span className="text-primary font-black">{temp.price === "free" ? "Free" : temp.cost}</span>
                                        </div>
                                        <p className="text-color-500 font-medium text-sm leading-relaxed mb-8 flex-1">
                                            {temp.description}
                                        </p>
                                        <div className="flex gap-3">
                                            <Button 
                                                onClick={() => handleUseTheme(temp.id)}
                                                className="flex-1 rounded-2xl h-12 font-black bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all border-none cursor-pointer"
                                            >
                                                Use Theme
                                            </Button>
                                            <Button variant="ghost" className="rounded-2xl h-12 px-6 font-bold hover:bg-primary/5 text-color-400 hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedTemplate(temp)}>
                                                Preview
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Template Preview Dialog */}
            <Dialog open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
                <DialogContent className="max-w-[95vw] lg:max-w-[900px] p-0 overflow-hidden glass-card border-none shadow-3xl">
                    {selectedTemplate && (
                        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                            {/* Preview Window Mock */}
                            <div className="flex-1 bg-color-50 dark:bg-color-950 p-0 relative group/preview overflow-hidden flex flex-col h-[60vh] md:h-auto">
                                {/* Browser Header */}
                                <div className="p-3 bg-white/80 dark:bg-black/40 backdrop-blur-md border-b border-color-100 dark:border-color-800 flex items-center justify-between shrink-0">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 shadow-sm" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80 shadow-sm" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-sm" />
                                        <div className="ml-3 px-3 py-1 bg-color-100 dark:bg-color-800 rounded-lg text-[9px] font-black tracking-widest text-color-400 uppercase">
                                            https://{selectedTemplate.id}.boutique-app.ai
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-color-400">
                                        <span className="material-symbols-outlined text-base">desktop_windows</span>
                                        <span className="material-symbols-outlined text-base opacity-40">smartphone</span>
                                    </div>
                                </div>

                                {/* Scrollable Image Container */}
                                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent bg-white dark:bg-black relative group/scroll">
                                    <img 
                                        src={selectedTemplate.image} 
                                        alt={selectedTemplate.name}
                                        className="w-full h-auto block"
                                    />
                                    
                                    {/* Hint Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover/scroll:bg-black/5 pointer-events-none transition-colors duration-500" />
                                    
                                    <div className="sticky bottom-6 left-1/2 -translate-x-1/2 p-4 glass-card bg-white/90 dark:bg-black/70 backdrop-blur-2xl flex items-center gap-8 shadow-3xl border border-white/20 scale-90 opacity-0 group-hover/preview:opacity-100 group-hover/preview:scale-100 transition-all duration-500">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-primary text-sm filled">mouse</span>
                                            <span className="text-[10px] font-black uppercase tracking-wider text-color-500">Scroll to explore</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Sidebar */}
                            <div className="w-full md:w-[350px] p-10 bg-white dark:bg-color-900 border-l border-color-100 dark:border-color-800 flex flex-col justify-between">
                                <div>
                                    <Badge className="bg-primary/10 text-primary border-none text-[10px] p-1 px-3 mb-6 font-black uppercase tracking-widest">{selectedTemplate.category}</Badge>
                                    <h2 className="text-3xl font-black mb-4 tracking-tighter">{selectedTemplate.name}</h2>
                                    <p className="text-color-500 font-medium leading-relaxed mb-8">
                                        {selectedTemplate.description}
                                    </p>
                                    <ul className="space-y-4 mb-12">
                                        {["Fully Responsive", "SEO Optimized", "AI Editor Ready", "Speed Optimized"].map(feature => (
                                            <li key={feature} className="flex items-center gap-3 text-sm font-bold">
                                                <span className="material-symbols-outlined text-primary filled scale-75">check_circle</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-xs font-black uppercase tracking-widest text-color-400">PRICE</span>
                                        <span className="text-3xl font-black">{selectedTemplate.price === "free" ? "FREE" : selectedTemplate.cost}</span>
                                    </div>
                                    <Button 
                                        onClick={() => handleUseTheme(selectedTemplate.id)}
                                        className="w-full rounded-2xl h-14 font-black bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 transition-all border-none cursor-pointer"
                                    >
                                        Start with this Template
                                    </Button>
                                    <p className="text-[10px] text-center text-color-400 font-bold uppercase tracking-wider">No credit card required for Free themes</p>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <Footer />
        </main>
    );
}
