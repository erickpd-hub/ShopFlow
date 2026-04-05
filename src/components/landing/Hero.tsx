"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <header className="pt-32 pb-20 px-4 relative overflow-hidden">
            {/* Background Aesthetic Fade */}
            <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none">
                <div
                    className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[120%] aspect-square opacity-[0.50] blur-[80px]"
                    style={{
                        background: 'radial-gradient(circle at center, #F4320B 0%, transparent 70%)',
                        borderRadius: '35% 65% 60% 40% / 40% 35% 65% 60%' // Non-perfect organic circle
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center text-primary text-xs font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4">
                    {t.hero.badge}
                </div>

                <h1 className="text-5xl md:text-8xl font-black mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-500">
                    {t.hero.title1} <em>{t.hero.title2}</em>{t.hero.title3} <br />
                    <span className="text-primary">{t.hero.title4}</span> <span className="gradient-text">{t.hero.title5}</span>
                </h1>

                <p className="text-color-600 dark:text-color-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 font-medium">
                    {t.hero.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
                    <Button asChild className="bg-black dark:bg-white text-white dark:text-black px-10 py-7 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all group h-auto text-lg border-none shadow-xl shadow-black/5">
                        <Link href="/register">
                            {t.hero.ctaPrimary}
                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>
                        </Link>
                    </Button>
                    <Link href="/how-it-works" className="glass-card px-10 py-4 font-bold flex items-center gap-2 hover:bg-white/80 dark:bg-color-900/80 transition-all border-white/40">
                        <span className="material-symbols-outlined">play_circle</span>
                        {t.hero.ctaSecondary}
                    </Link>
                </div>

                <p className="mt-6 text-xs text-color-500 dark:text-color-500">
                    {t.hero.footer}
                </p>
            </div>

            {/* Mockup Section */}
            <div className="mt-20 max-w-6xl mx-auto relative group px-4">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white dark:bg-color-900 border border-color-200 dark:border-color-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-1000">
                    {/* Browser Toolbar */}
                    <div className="h-12 bg-slate-50 dark:bg-color-900/50 border-b border-color-200 dark:border-color-900 flex items-center px-4 justify-between">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-color-300"></div>
                            <div className="w-3 h-3 rounded-full bg-color-300"></div>
                            <div className="w-3 h-3 rounded-full bg-color-300"></div>
                        </div>
                        <div className="bg-white dark:bg-color-700 px-6 py-1 rounded-full text-[10px] text-color-400 flex items-center gap-2 border border-color-200 dark:border-color-600">
                            <span className="material-symbols-outlined text-[10px]">lock</span>
                            mystore.shopflow.app/editor
                        </div>
                        <div className="flex gap-2">
                            <div className="w-8 h-4 bg-primary/20 rounded-full"></div>
                        </div>
                    </div>

                    {/* Editor Mockup Content */}
                    <MockupContent />
                </div>
            </div>
        </header>
    );
}

function MockupContent() {
    const [step, setStep] = useState(0);
    const [droppedItems, setDroppedItems] = useState<string[]>([]);
    
    // Step definition: 
    // 0: Neutral 
    // 1: Hovering Gallery -> 2: Dragging Gallery -> 3: Drop Gallery (Preview shows Gallery)
    // 4: Hovering Button -> 5: Dragging Button -> 6: Drop Button (Preview shows Button)
    // 7: Hovering Reviews -> 8: Dragging Reviews -> 9: Drop Reviews (Preview shows Reviews)
    // 10: Reset
    
    useEffect(() => {
        const sequence = [
            { duration: 1500 }, // 0: Start
            { duration: 1000 }, // 1: Hover Gallery
            { duration: 1200 }, // 2: Drag Gallery
            { duration: 800 },  // 3: Drop Gallery
            { duration: 1000 }, // 4: Hover Button
            { duration: 1200 }, // 5: Drag Button
            { duration: 800 },  // 6: Drop Button
            { duration: 1000 }, // 7: Hover Reviews
            { duration: 1200 }, // 8: Drag Reviews
            { duration: 800 },  // 9: Drop Reviews
            { duration: 2000 }, // 10: Show Final
        ];

        let current = 0;
        const run = () => {
            setStep(current);
            setTimeout(() => {
                current = (current + 1) % sequence.length;
                run();
            }, sequence[current].duration);
        };
        
        const timeout = setTimeout(run, 500);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (step === 0 || step === 10) {
            if (step === 0) setDroppedItems([]);
        } else if (step === 3) {
            setDroppedItems(['gallery']);
        } else if (step === 6) {
            setDroppedItems(['gallery', 'button']);
        } else if (step === 9) {
            setDroppedItems(['gallery', 'button', 'reviews']);
        }
    }, [step]);

    const sidebarItems = [
        { id: 'gallery', icon: "image", label: "Product Gallery" },
        { id: 'button', icon: "payments", label: "Buy Button" },
        { id: 'reviews', icon: "reviews", label: "Customer Reviews" },
    ];

    // Coordinates relative to the mockup container (1000x600 aprox)
    // Sidebar center is around x=128
    const positions: Record<number, { x: string | number, y: string | number }> = {
        0: { x: '60%', y: '40%' },   // Start
        1: { x: 128, y: 120 },      // Hover Gallery
        2: { x: '50%', y: '30%' },   // Drag Gallery to Dropzone
        3: { x: '50%', y: '30%' },   // Drop
        4: { x: 128, y: 170 },      // Hover Button
        5: { x: '50%', y: '65%' },   // Drag Button
        6: { x: '50%', y: '65%' },   // Drop
        7: { x: 128, y: 220 },      // Hover Reviews
        8: { x: '50%', y: '85%' },   // Drag Reviews
        9: { x: '50%', y: '85%' },   // Drop
        10: { x: '85%', y: '85%' },  // Move to 'Publish'
    };

    const isDragging = step === 2 || step === 5 || step === 8;
    const draggingItemId = step === 2 ? 'gallery' : step === 5 ? 'button' : step === 8 ? 'reviews' : null;

    return (
        <div className="flex h-[450px] md:h-[650px] bg-slate-50 dark:bg-color-950 relative overflow-hidden select-none">
            {/* Sidebar */}
            <div className="hidden md:block w-64 bg-white dark:bg-color-900 border-r border-color-200 dark:border-color-900 p-6 z-10 shadow-xl">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <h4 className="text-[10px] font-black uppercase text-color-400 tracking-[0.2em]">Components</h4>
                </div>
                
                <div className="space-y-4">
                    {sidebarItems.map((item, idx) => {
                        const currentTargetIdx = step === 1 ? 0 : step === 4 ? 1 : step === 7 ? 2 : -1;
                        const isActive = currentTargetIdx === idx;
                        const isDisabled = (idx === 0 && droppedItems.includes('gallery')) || 
                                         (idx === 1 && droppedItems.includes('button')) || 
                                         (idx === 2 && droppedItems.includes('reviews'));

                        return (
                            <motion.div 
                                key={item.id} 
                                animate={{ 
                                    opacity: isDisabled && !isActive ? 0.3 : 1,
                                    scale: isActive ? 1.05 : 1,
                                    x: isActive ? 10 : 0,
                                    borderColor: isActive ? 'var(--primary)' : 'transparent',
                                    backgroundColor: isActive ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent'
                                }}
                                className="p-4 border rounded-xl flex items-center gap-3 bg-white dark:bg-color-800 shadow-sm border-color-100 dark:border-color-800 transition-all cursor-default"
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-color-700 text-color-400'}`}>
                                    <span className="material-symbols-outlined text-sm">{item.icon}</span>
                                </div>
                                <span className="text-[11px] font-bold text-color-700 dark:text-color-200">{item.label}</span>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Helpful Tip */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-20 p-4 rounded-xl bg-primary/5 border border-primary/10"
                >
                    <p className="text-[9px] text-primary font-black uppercase mb-1">Pro Tip</p>
                    <p className="text-[10px] text-color-500 leading-relaxed font-medium">Drag components to build your product page in seconds.</p>
                </motion.div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 overflow-visible p-4 md:p-12 relative z-0 bg-white/40 dark:bg-black/20">
                <div className="max-w-xl mx-auto bg-white dark:bg-color-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-3xl border border-color-100 dark:border-color-800 h-full flex flex-col relative overflow-hidden">
                    {/* Fake Header */}
                    <div className="p-6 flex justify-between items-center border-b border-color-50 dark:border-color-800/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                                <span className="text-white dark:text-black text-[10px] font-black">S</span>
                            </div>
                            <div className="h-4 w-24 bg-color-50 dark:bg-color-800 rounded-full"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-2 w-10 bg-slate-100 dark:bg-color-800 rounded-full"></div>
                            <div className="h-2 w-10 bg-slate-100 dark:bg-color-800 rounded-full"></div>
                        </div>
                    </div>
                    
                    <div className="flex-1 p-8 overflow-y-auto space-y-10 scrollbar-hide">
                        {/* Dynamic Dropped Content Rendering */}
                        <AnimatePresence mode="popLayout">
                            {/* 1. Gallery Section */}
                            {droppedItems.includes('gallery') ? (
                                <motion.div 
                                    key="gallery-view"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="aspect-[4/3] w-full bg-slate-100 dark:bg-color-800 rounded-2xl overflow-hidden relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                                        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80" alt="Product" className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-3">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className="aspect-square bg-slate-100 dark:bg-color-800 rounded-xl border-2 border-transparent hover:border-primary/30 transition-colors"></div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    animate={{ 
                                        borderColor: draggingItemId === 'gallery' ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.1)',
                                        backgroundColor: draggingItemId === 'gallery' ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent',
                                        scale: draggingItemId === 'gallery' ? 1.02 : 1
                                    }}
                                    className="w-full aspect-[4/3] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-all"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">add_a_photo</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary/40">Drop Gallery Here</p>
                                </motion.div>
                            )}

                            {/* 2. Info Section (Fixed) */}
                            <div className="space-y-4">
                                <div className="h-10 w-3/4 bg-slate-900 dark:bg-white rounded-2xl"></div>
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-0.5">
                                        {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined text-[14px] text-amber-500 fill-amber-500">star</span>)}
                                    </div>
                                    <div className="h-3 w-20 bg-color-100 dark:bg-color-800 rounded-full"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-color-50 dark:bg-color-800 rounded-full"></div>
                                    <div className="h-3 w-2/3 bg-color-50 dark:bg-color-800 rounded-full"></div>
                                </div>
                            </div>

                            {/* 3. Button Dropzone / Element */}
                            {droppedItems.includes('button') ? (
                                <motion.div 
                                    key="button-view"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex gap-4"
                                >
                                    <div className="flex-1 h-14 bg-primary text-white rounded-2xl flex items-center justify-center font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
                                        Add to Cart — $249
                                    </div>
                                    <div className="w-14 h-14 border-2 border-color-100 dark:border-color-800 rounded-2xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-color-400">favorite</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    animate={{ 
                                        borderColor: draggingItemId === 'button' ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                                        backgroundColor: draggingItemId === 'button' ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent',
                                    }}
                                    className="h-14 w-full rounded-2xl border-2 border-dashed flex items-center justify-center"
                                >
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-color-300">Product CTA Zone</span>
                                </motion.div>
                            )}

                            {/* 4. Reviews Dropzone / Element */}
                            {droppedItems.includes('reviews') ? (
                                <motion.div 
                                    key="reviews-view"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="pt-10 border-t border-color-50 dark:border-color-800/50 space-y-6"
                                >
                                    <h5 className="font-black text-xs uppercase tracking-widest">Recent Feedback</h5>
                                    {[1, 2].map(i => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-color-800"></div>
                                                    <div className="h-3 w-24 bg-slate-50 dark:bg-color-800 rounded-full"></div>
                                                </div>
                                                <div className="flex gap-0.5">
                                                    {[1,2,3,4,5].map(j => <span key={j} className="material-symbols-outlined text-[10px] text-amber-500 fill-amber-500">star</span>)}
                                                </div>
                                            </div>
                                            <div className="h-2 w-full bg-slate-50 dark:bg-color-800 rounded-full"></div>
                                        </div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    animate={{ 
                                        borderColor: draggingItemId === 'reviews' ? 'var(--primary)' : 'rgba(0,0,0,0.05)',
                                        backgroundColor: draggingItemId === 'reviews' ? 'rgba(var(--primary-rgb), 0.05)' : 'transparent',
                                    }}
                                    className="h-32 w-full rounded-2xl border-2 border-dashed flex items-center justify-center"
                                >
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-color-300">Social Proof Section</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Floating Settings - Interactive! */}
                <motion.div 
                    animate={{ 
                        x: step === 10 ? -20 : 0,
                        scale: step === 10 ? 1.05 : 1
                    }}
                    className="absolute top-20 right-6 glass-card p-5 rounded-2xl shadow-2xl border border-primary/20 w-56 hidden lg:block z-20"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm animate-spin-slow">settings</span>
                            <span className="text-[10px] font-black text-foreground uppercase tracking-wider">Editor</span>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-primary/10 text-[8px] font-black text-primary uppercase">Active</div>
                    </div>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-[8px] text-color-400 mb-2 font-black uppercase tracking-widest">Product Theme</p>
                            <div className="flex gap-2">
                                <motion.div whileHover={{ scale: 1.2 }} className="w-6 h-6 rounded-lg bg-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-slate-900 shadow-lg"></motion.div>
                                <motion.div whileHover={{ scale: 1.2 }} className="w-6 h-6 rounded-lg bg-emerald-500 shadow-lg opacity-40"></motion.div>
                                <motion.div whileHover={{ scale: 1.2 }} className="w-6 h-6 rounded-lg bg-rose-500 shadow-lg opacity-40"></motion.div>
                            </div>
                        </div>
                        
                        <div className="p-3 bg-slate-50 dark:bg-color-800 rounded-xl space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] font-bold text-color-400 uppercase">Radius</span>
                                <span className="text-[8px] font-bold text-primary">Full</span>
                            </div>
                            <div className="h-1 w-full bg-slate-200 dark:bg-color-700 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-primary rounded-full"></div>
                            </div>
                        </div>

                        <motion.button 
                            animate={{ 
                                backgroundColor: step === 10 ? 'var(--primary)' : 'var(--foreground)',
                                scale: step === 10 ? 1.1 : 1
                            }}
                            className="w-full py-3 text-background dark:text-foreground text-[10px] font-black uppercase tracking-[0.24em] rounded-xl transition-all shadow-xl shadow-black/10"
                        >
                            Publish Store
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Simulated Cursor & Ghost */}
            <AnimatePresence>
                {isDragging && (
                    <motion.div
                        key="ghost"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1,
                            left: positions[step].x, 
                            top: positions[step].y,
                        }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute pointer-events-none z-[110] -translate-x-1/2 -translate-y-[120%] flex flex-col items-center gap-2"
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-primary text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/20 backdrop-blur-md">
                            <span className="material-symbols-outlined text-sm">
                                {draggingItemId === 'gallery' ? 'image' : draggingItemId === 'button' ? 'payments' : 'reviews'}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                Placing {draggingItemId === 'gallery' ? 'Gallery' : draggingItemId === 'button' ? 'Button' : 'Reviews'}...
                            </span>
                        </div>
                        {/* Connecting Line / Visual indicator */}
                        <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent opacity-50"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="absolute pointer-events-none z-[120] text-primary"
                animate={{
                    left: positions[step].x,
                    top: positions[step].y,
                    scale: isDragging ? 0.9 : 1.1,
                }}
                transition={{ 
                    duration: 1.2, 
                    ease: [0.23, 1, 0.32, 1] // Custom ease-out
                }}
            >
                <div className="relative">
                    {/* Ripple Effect */}
                    {(step === 3 || step === 6 || step === 9) && (
                        <motion.div 
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 4, opacity: 0 }}
                            className="absolute inset-0 rounded-full border-2 border-primary"
                        />
                    )}
                    
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2.5" className="drop-shadow-2xl">
                        <path d="M5.626 3.14a1.2 1.2 0 0 0-1.748 1.487L8.83 19.82a1.2 1.2 0 0 0 2.22-.053l2.5-6.505 6.505-2.5a1.2 1.2 0 0 0 .053-2.22L6.113 2.923a1.2 1.2 0 0 0-.487.217Z" />
                    </svg>
                </div>
            </motion.div>
        </div>
    );
}
