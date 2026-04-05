"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSchema, ThemeSection, ThemeGlobalStyles } from "@/types/theme";
import { ThemeEngine } from "@/lib/theme-engine";
import { saveStoreTheme } from "@/app/actions/theme";
import { toast } from "sonner";
import { 
    Layout, 
    Layers, 
    Settings, 
    Smartphone, 
    Monitor, 
    ChevronLeft, 
    Plus, 
    Trash2, 
    GripVertical, 
    Save, 
    Palette, 
    ArrowRight,
    Sparkles,
    Eye,
    Type,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Default Theme Configuration (Inherited or Default) ──────────────────────
const defaultTheme: ThemeSchema = {
    global: {
        colors: {
            primary: "#F4320B", // Webkit Accent
            secondary: "#FAA18F",
            background: "#FCFAFA",
        },
        favicon: "/favicon.ico",
    },
    sections: [
        {
            id: "initial-hero",
            type: "hero",
            order: 1,
            settings: {
                title: "Build your Boutique Store with AI",
                subtitle: "The most elegant way to sell your products online. Effortless design, professional results.",
                ctaText: "Shop Collection",
                ctaLink: "#",
                alignment: "center",
            }
        },
        {
            id: "initial-products",
            type: "product-grid",
            order: 2,
            settings: {
                title: "Featured Masterpieces",
                columns: 4,
            }
        }
    ]
};

// ─── Section Catalog ─────────────────────────────────────────────────────────
const sectionCatalog = [
    { type: "hero", label: "Hero Banner", icon: <Layout className="w-5 h-5" />, desc: "High-impact opening section" },
    { type: "product-grid", label: "Product Grid", icon: <Layers className="w-5 h-5" />, desc: "Display your catalog items" },
    { type: "image-with-text", label: "Image with Text", icon: <Layout className="w-5 h-5" />, desc: "Side-by-side storytelling" },
    { type: "rich-text", label: "Rich Text", icon: <Type className="w-5 h-5" />, desc: "Centered text block" },
    { type: "newsletter", label: "Newsletter", icon: <Settings className="w-5 h-5" />, desc: "Email subscription capture" },
    { type: "testimonials", label: "Testimonials", icon: <Eye className="w-5 h-5" />, desc: "Customer social proof" },
    { type: "faq", label: "FAQ Accordion", icon: <Settings className="w-5 h-5" />, desc: "Common questions & answers" },
    { type: "promo-banner", label: "Promo Banner", icon: <Zap className="w-5 h-5" />, desc: "High-visibility top bar" },
    { type: "collections", label: "Collections", icon: <Layers className="w-5 h-5" />, desc: "Curated product grouping" },
    { type: "logo-cloud", label: "Logo Cloud", icon: <Layers className="w-5 h-5" />, desc: "Social proof logos" },
];

// ─── Field Definitions ───────────────────────────────────────────────────────
const sectionFields: Record<string, { key: string; label: string; type: "text" | "color" | "select" | "image" | "textarea" | "range"; options?: string[] }[]> = {
    "hero": [
        { key: "title", label: "Heading Text", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "subtitle", label: "Subheading Text", type: "textarea" },
        { key: "subtitleColor", label: "Subtitle Color", type: "color" },
        { key: "ctaText", label: "Button Label", type: "text" },
        { key: "ctaColor", label: "Button Color", type: "color" },
        { key: "ctaLink", label: "Button Link", type: "text" },
        { key: "imageUrl", label: "Background Image", type: "image" },
        { key: "alignment", label: "Content Alignment", type: "select", options: ["left", "center", "right"] },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "product-grid": [
        { key: "title", label: "Section Header", type: "text" },
        { key: "columns", label: "Display Columns", type: "select", options: ["2", "3", "4", "5"] },
        { key: "cardBgColor", label: "Card Background", type: "color" },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "image-with-text": [
        { key: "title", label: "Title", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "content", label: "Description", type: "textarea" },
        { key: "contentColor", label: "Content Color", type: "color" },
        { key: "ctaText", label: "Button Text", type: "text" },
        { key: "ctaLink", label: "Button Link", type: "text" },
        { key: "imageUrl", label: "Image URL", type: "image" },
        { key: "imagePosition", label: "Image Side", type: "select", options: ["left", "right"] },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "rich-text": [
        { key: "title", label: "Title", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "content", label: "Main Text", type: "textarea" },
        { key: "contentColor", label: "Content Color", type: "color" },
        { key: "alignment", label: "Text Alignment", type: "select", options: ["left", "center", "right"] },
        { key: "maxWidth", label: "Max Width (px)", type: "range" },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "newsletter": [
        { key: "title", label: "Headline", type: "text" },
        { key: "titleColor", label: "Headline Color", type: "color" },
        { key: "subtitle", label: "Incentive Text", type: "textarea" },
        { key: "buttonText", label: "Button Label", type: "text" },
        { key: "buttonColor", label: "Button Color", type: "color" },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "testimonials": [
        { key: "title", label: "Title Text", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "t1_name", label: "Customer 1 Name", type: "text" },
        { key: "t1_content", label: "Customer 1 Feedback", type: "textarea" },
        { key: "t2_name", label: "Customer 2 Name", type: "text" },
        { key: "t2_content", label: "Customer 2 Feedback", type: "textarea" },
        { key: "t3_name", label: "Customer 3 Name", type: "text" },
        { key: "t3_content", label: "Customer 3 Feedback", type: "textarea" },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "faq": [
        { key: "title", label: "FAQ Title", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "q1", label: "Question 1", type: "text" },
        { key: "a1", label: "Answer 1", type: "textarea" },
        { key: "q2", label: "Question 2", type: "text" },
        { key: "a2", label: "Answer 2", type: "textarea" },
        { key: "q3", label: "Question 3", type: "text" },
        { key: "a3", label: "Answer 3", type: "textarea" },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "promo-banner": [
        { key: "text", label: "Banner Text", type: "text" },
        { key: "bgColor", label: "Background color", type: "color" },
        { key: "textColor", label: "Text color", type: "color" },
        { key: "ctaText", label: "Button Label", type: "text" },
        { key: "ctaLink", label: "Target Link", type: "text" },
    ],
    "collections": [
        { key: "title", label: "Section Header", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "subtitle", label: "Subheading", type: "text" },
        { key: "subtitleColor", label: "Subtitle Color", type: "color" },
        { key: "columns", label: "Grid Columns", type: "select", options: ["2", "3", "4"] },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
    "logo-cloud": [
        { key: "title", label: "Section Header", type: "text" },
        { key: "titleColor", label: "Title Color", type: "color" },
        { key: "logos_list", label: "Logos (URLs, one per line)", type: "textarea" },
        { key: "logoOpacity", label: "Logo Opacity", type: "range" },
        { key: "paddingY", label: "Vertical Padding", type: "range" },
    ],
};

// Mock products
const mockProducts = [
    { id: "1", name: "Premium Artisan Candle", price: 42.00, image_url: "https://images.unsplash.com/photo-1596433809252-260c2745dfdd?w=400&q=80" },
    { id: "2", name: "Minimalist Ceramic Vase", price: 89.00, image_url: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&q=80" },
    { id: "3", name: "Organic Cotton Tote", price: 35.00, image_url: "https://images.unsplash.com/photo-1544816153-09730734bc6b?w=400&q=80" },
    { id: "4", name: "Modern Table Lamp", price: 125.00, image_url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80" },
];

export default function ThemeEditorPage() {
    const [theme, setTheme] = useState<ThemeSchema>(defaultTheme);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const pending = localStorage.getItem("pending_theme_preset");
        if (pending) {
            try {
                const preset = JSON.parse(pending);
                setTheme(preset);
                if (preset.sections && preset.sections.length > 0) {
                    setSelectedId(preset.sections[0].id);
                }
                localStorage.removeItem("pending_theme_preset");
                toast.success("Theme preset loaded successfully!");
            } catch (err) {
                console.error("Error parsing preset:", err);
            }
        } else if (theme?.sections && theme.sections.length > 0) {
            setSelectedId(theme.sections[0].id);
        }
    }, []);
    const [showAddPanel, setShowAddPanel] = useState(false);
    const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"sections" | "global">("sections");

    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const sections = theme?.sections || [];
    const selectedSection = sections.find(s => s.id === selectedId) ?? null;

    // ── Drag & drop reorder ──────────────────────────────────────────────────
    const handleDragStart = (index: number) => { dragItem.current = index; };
    const handleDragEnter = (index: number) => { dragOverItem.current = index; };
    const handleDragEnd = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const reordered = [...sections];
        const dragged = reordered.splice(dragItem.current, 1)[0];
        reordered.splice(dragOverItem.current, 0, dragged);
        const updated = reordered.map((s, idx) => ({ ...s, order: idx + 1 }));
        setTheme(prev => ({ ...prev, sections: updated }));
        dragItem.current = null;
        dragOverItem.current = null;
    };

    // ── Updates ──────────────────────────────────────────────────────────────
    const updateSectionSetting = (key: string, value: any) => {
        setTheme(prev => ({
            ...prev,
            sections: prev.sections.map(s => 
                s.id === selectedId ? { ...s, settings: { ...s.settings, [key]: value } } : s
            )
        }));
    };

    const updateGlobalSetting = (key: keyof ThemeGlobalStyles["colors"], value: string) => {
        setTheme(prev => ({
            ...prev,
            global: {
                ...prev.global,
                colors: { ...prev.global.colors, [key]: value }
            }
        }));
    };

    const addSection = (type: string) => {
        const defaultSettings: Record<string, any> = {
            "hero": {
                title: "Curated Luxury for the Modern Soul",
                subtitle: "Experience the pinnacle of boutique craftsmanship and timeless design.",
                ctaText: "Shop New Arrivals",
                alignment: "center",
                paddingY: 120,
                titleColor: "#000000",
                subtitleColor: "#666666",
                ctaColor: "#000000"
            },
            "collections": {
                title: "Handpicked Masterpieces",
                subtitle: "A curated edit of our most coveted pieces available this season.",
                columns: "3",
                paddingY: 96,
                titleColor: "#000000",
                subtitleColor: "#666666"
            },
            "product-grid": {
                title: "Our Featured Crafts",
                columns: "4",
                paddingY: 96,
                cardBgColor: "#ffffff"
            },
            "promo-banner": {
                text: "FREE WORLDWIDE SHIPPING ON ALL ORDERS",
                bgColor: "#000000",
                textColor: "#ffffff"
            },
            "newsletter": {
                title: "Join the Inner Circle",
                subtitle: "Stay updated on new collections and exclusive designer drops.",
                buttonText: "Subscribe",
                buttonColor: "#000000",
                paddingY: 96
            },
            "testimonials": {
                title: "What Our Clients Say",
                t1_name: "Sarah J.",
                t1_content: "The quality exceeds every expectation. A truly boutique experience.",
                paddingY: 96
            },
            "faq": {
                title: "Discovery & Support",
                q1: "How long is shipping?",
                a1: "Express worldwide shipping takes 3-5 business days.",
                paddingY: 96
            },
            "logo-cloud": {
                title: "Featured In",
                logoOpacity: 40,
                paddingY: 60
            },
            "rich-text": {
                title: "Sustainability is our Core",
                content: "We believe in fair trade, ethical sourcing, and products that last a lifetime.",
                alignment: "center",
                maxWidth: 800,
                paddingY: 96
            },
            "image-with-text": {
                title: "The Maker's Touch",
                content: "Every item is finished by hand in our local workshop to ensure perfection.",
                ctaText: "Meet our Team",
                imagePosition: "left",
                paddingY: 96
            }
        };

        const newSection: ThemeSection = {
            id: `section-${Date.now()}`,
            type,
            order: sections.length + 1,
            settings: defaultSettings[type] || { title: "New Section" },
        };
        setTheme(prev => ({ ...prev, sections: [...prev.sections, newSection] }));
        setSelectedId(newSection.id);
        setShowAddPanel(false);
    };

    const removeSection = (id: string) => {
        setTheme(prev => ({ ...prev, sections: prev.sections.filter(s => s.id !== id) }));
        if (selectedId === id) setSelectedId(null);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await saveStoreTheme(theme, "Tema Personalizado");
            if (result.success) {
                toast.success("Design preferences updated successfully.");
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("Internal error saving theme.");
        }
        setIsSaving(false);
    };

    return (
        <div className="flex h-screen bg-[#FAFAFA] text-[#000000] overflow-hidden">
            {/* Design Kit Left Sidebar */}
            <aside className="w-80 bg-white border-r border-[#EFEFEF] flex flex-col shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                <div className="p-6 border-b border-[#EFEFEF]">
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full hover:bg-[#F5F5F5]">
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <h1 className="text-xl font-black tracking-[-0.04em]">Design Editor</h1>
                        <Sparkles className="w-5 h-5 text-[#F4320B]" />
                    </div>

                    <div className="flex p-1 bg-[#F5F5F5] rounded-full">
                        <button 
                            onClick={() => setActiveTab("sections")} 
                            className={`flex-1 py-2 text-xs font-black rounded-full transition-all ${activeTab === "sections" ? "bg-black text-white shadow-lg" : "text-[#7B7B7B] hover:text-black"}`}
                        >
                            Components
                        </button>
                        <button 
                            onClick={() => setActiveTab("global")} 
                            className={`flex-1 py-2 text-xs font-black rounded-full transition-all ${activeTab === "global" ? "bg-black text-white shadow-lg" : "text-[#7B7B7B] hover:text-black"}`}
                        >
                            Visual Identity
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                    {activeTab === "sections" ? (
                        <>
                            <div className="flex items-center justify-between px-2 mb-4">
                                <span className="text-xs font-black uppercase tracking-widest text-[#7B7B7B]">Canvas Tree</span>
                                <Button 
                                    onClick={() => setShowAddPanel(!showAddPanel)} 
                                    size="sm" 
                                    className={`rounded-full h-8 w-8 p-0 ${showAddPanel ? 'bg-black text-white' : 'bg-[#F5F5F5] text-black hover:bg-black hover:text-white'}`}
                                >
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </div>

                            <AnimatePresence>
                                {showAddPanel && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        className="mb-6 p-4 bg-white rounded-[24px] border border-[#EFEFEF] shadow-xl space-y-2"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-tighter text-[#7B7B7B] px-2 mb-2">Library</p>
                                        {sectionCatalog.map(cat => (
                                            <button 
                                                key={cat.type} 
                                                onClick={() => addSection(cat.type)} 
                                                className="w-full flex items-center gap-3 p-3 hover:bg-[#F5F5F5] rounded-2xl text-left transition-colors group"
                                            >
                                                <div className="w-10 h-10 bg-[#F5F5F5] group-hover:bg-[#000000] group-hover:text-white rounded-xl flex items-center justify-center transition-all">
                                                    {cat.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black">{cat.label}</p>
                                                    <p className="text-[10px] text-[#A0A0A0] font-medium">{cat.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                {sections.map((section, index) => {
                                    const meta = sectionCatalog.find(c => c.type === section.type);
                                    const isActive = selectedId === section.id;
                                    return (
                                        <motion.div
                                            key={section.id}
                                            layout
                                            draggable
                                            onDragStart={() => handleDragStart(index)}
                                            onDragEnter={() => handleDragEnter(index)}
                                            onDragEnd={handleDragEnd}
                                            onClick={() => { setSelectedId(section.id); setShowAddPanel(false); }}
                                            className={`group flex items-center gap-4 p-4 rounded-[24px] cursor-pointer transition-all border ${isActive ? "bg-white border-[#000000] shadow-xl shadow-black/5 translate-x-1" : "bg-transparent border-transparent hover:bg-[#F9F9F9]"}`}
                                        >
                                            <GripVertical className="w-4 h-4 text-[#C0C0C0]" />
                                            <div className="flex-1">
                                                <p className="text-sm font-black">{meta?.label || section.type}</p>
                                            </div>
                                            <button 
                                                onClick={e => { e.stopPropagation(); removeSection(section.id); }} 
                                                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 text-red-500 rounded-full transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="px-2 space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#7B7B7B] block mb-4">Core Colors</label>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-[24px] border border-[#EFEFEF]">
                                        <span className="text-xs font-black">Primary Accent</span>
                                        <div className="w-10 h-10 rounded-full border border-[#EFEFEF] overflow-hidden p-0 relative">
                                            <input 
                                                type="color" 
                                                value={theme.global.colors.primary} 
                                                onChange={(e) => updateGlobalSetting("primary", e.target.value)} 
                                                className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-[24px] border border-[#EFEFEF]">
                                        <span className="text-xs font-black">Secondary Theme</span>
                                        <div className="w-10 h-10 rounded-full border border-[#EFEFEF] overflow-hidden p-0 relative">
                                            <input 
                                                type="color" 
                                                value={theme.global.colors.secondary || "#FAA18F"} 
                                                onChange={(e) => updateGlobalSetting("secondary", e.target.value)} 
                                                className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer" 
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-[24px] border border-[#EFEFEF]">
                                        <span className="text-xs font-black">Interface Base</span>
                                        <div className="w-10 h-10 rounded-full border border-[#EFEFEF] overflow-hidden p-0 relative shadow-sm">
                                            <input 
                                                type="color" 
                                                value={theme.global.colors.background} 
                                                onChange={(e) => updateGlobalSetting("background", e.target.value)} 
                                                className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#7B7B7B] block mb-4">Store Identity</label>
                                <div className="p-4 bg-white rounded-[24px] border border-[#EFEFEF] space-y-4">
                                    <div className="space-y-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#7B7B7B]">Favicon URL</span>
                                        <input
                                            value={theme.global.favicon || ""}
                                            onChange={(e) => setTheme(prev => ({ ...prev, global: { ...prev.global, favicon: e.target.value }}))}
                                            className="w-full h-10 rounded-xl bg-[#F5F5F5] border-none px-4 text-xs font-medium focus:ring-2 focus:ring-black outline-none transition-all"
                                            placeholder="https://.../favicon.ico"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#7B7B7B] block mb-4">Typography Scaling</label>
                                <div className="p-4 bg-white rounded-[24px] border border-[#EFEFEF] flex items-center justify-between">
                                    <Type className="w-5 h-5 text-[#7B7B7B]" />
                                    <span className="text-xs font-black">Design Kit Presets</span>
                                    <div className="px-3 py-1 bg-black text-white text-[10px] font-black rounded-full uppercase">Enabled</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 mt-auto">
                    <Button 
                        onClick={handleSave} 
                        disabled={isGenerating || isSaving}
                        className="w-full bg-black text-white hover:bg-[#1A1A1A] rounded-full h-14 font-black shadow-2xl shadow-black/10 transition-all hover:-translate-y-1 active:scale-[0.98]"
                    >
                        {isSaving ? "Syncing..." : "Publish Design"}
                        {!isSaving && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </aside>

            {/* Main Stage */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Visual Header */}
                <header className="h-20 bg-white/60 backdrop-blur-xl border-b border-[#EFEFEF] flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] rounded-full">
                            <Monitor className={`w-4 h-4 cursor-pointer ${viewMode === 'desktop' ? 'text-black' : 'text-[#C0C0C0]'}`} onClick={() => setViewMode("desktop")} />
                            <div className="w-[1px] h-3 bg-[#E0E0E0]" />
                            <Smartphone className={`w-4 h-4 cursor-pointer ${viewMode === 'mobile' ? 'text-black' : 'text-[#C0C0C0]'}`} onClick={() => setViewMode("mobile")} />
                        </div>
                        <span className="text-xs font-medium text-[#7B7B7B]">Autosaved to Cloud</span>
                    </div>
                </header>

                <div className="flex-1 overflow-auto bg-[#F0F0F0] p-6 md:p-12 flex justify-center scrollbar-hide">
                    <motion.div 
                        layout
                        className={`bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] relative flex flex-col ${viewMode === "mobile" ? "w-[390px] h-[844px] rounded-[48px] ring-[12px] ring-[#1A1A1A]" : "w-full rounded-[16px] min-h-full"}`}
                    >
                        {/* Internal Scroll Preview */}
                        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-black/5 scrollbar-track-transparent">
                            <ThemeEngine theme={theme} globalData={{ products: mockProducts }} />
                        </div>

                        {/* Device Overlay for mobile */}
                        {viewMode === "mobile" && (
                            <>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1A1A1A] rounded-b-3xl z-50 flex items-center justify-center">
                                    <div className="w-12 h-1 rounded-full bg-white/10" />
                                </div>
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 rounded-full z-50" />
                            </>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Settings Sidebar (Glass style) */}
            <aside className="w-80 bg-white border-l border-[#EFEFEF] shrink-0 overflow-y-auto px-6 py-10 z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
                <AnimatePresence mode="wait">
                    {selectedSection ? (
                        <motion.div 
                            key={selectedSection.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div>
                                <h3 className="text-xl font-black mb-1 capitalize tracking-tight">{selectedSection.type}</h3>
                                <p className="text-xs text-[#7B7B7B] font-medium">Fine-tune component properties</p>
                            </div>

                            <div className="space-y-6">
                                {(sectionFields[selectedSection.type] || []).map(field => (
                                    <div key={field.key} className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#7B7B7B] block">{field.label}</label>
                                        {field.type === "text" && (
                                            <input
                                                value={selectedSection.settings[field.key] || ""}
                                                onChange={e => updateSectionSetting(field.key, e.target.value)}
                                                className="w-full h-12 rounded-2xl bg-[#F5F5F5] border-none px-4 text-sm font-medium focus:ring-2 focus:ring-black outline-none transition-all"
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                            />
                                        )}
                                        {field.type === "textarea" && (
                                            <textarea
                                                value={selectedSection.settings[field.key] || ""}
                                                onChange={e => updateSectionSetting(field.key, e.target.value)}
                                                className="w-full h-32 rounded-2xl bg-[#F5F5F5] border-none p-4 text-sm font-medium focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                            />
                                        )}
                                        {field.type === "color" && (
                                            <div className="flex items-center justify-between p-4 bg-[#F5F5F5] rounded-2xl">
                                                <span className="text-xs font-black">{field.label}</span>
                                                <div className="w-10 h-10 rounded-full border border-white overflow-hidden p-0 relative shadow-sm hover:scale-105 transition-transform">
                                                    <input 
                                                        type="color" 
                                                        value={selectedSection.settings[field.key] || "#000000"} 
                                                        onChange={(e) => updateSectionSetting(field.key, e.target.value)} 
                                                        className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] cursor-pointer" 
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {field.type === "range" && (
                                            <input
                                                type="range"
                                                min="0"
                                                max="200"
                                                step="10"
                                                value={selectedSection.settings[field.key] || 96}
                                                onChange={e => updateSectionSetting(field.key, e.target.value)}
                                                className="w-full accent-black"
                                            />
                                        )}
                                        {field.type === "select" && field.options && (
                                            <select
                                                value={selectedSection.settings[field.key] || field.options[0]}
                                                onChange={e => updateSectionSetting(field.key, e.target.value)}
                                                className="w-full h-12 rounded-2xl bg-[#F5F5F5] border-none px-4 text-sm font-black focus:ring-2 focus:ring-black outline-none appearance-none cursor-pointer"
                                            >
                                                {field.options.map(opt => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        )}
                                        {field.type === "image" && (
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    value={selectedSection.settings[field.key] || ""}
                                                    onChange={e => updateSectionSetting(field.key, e.target.value)}
                                                    className="w-full h-12 rounded-2xl bg-[#F5F5F5] border-none px-4 text-sm font-medium outline-none transition-all mb-2"
                                                    placeholder="Paste Image URL..."
                                                />
                                                <div className="h-32 bg-[#F5F5F5] rounded-2xl border-2 border-dashed border-[#E0E0E0] flex flex-col items-center justify-center text-[#A0A0A0] group cursor-pointer hover:border-black transition-all">
                                                    <Palette className="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                                                    <span className="text-[10px] font-black uppercase">Browse Assets</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-32 opacity-30 italic">
                            <Layers className="w-8 h-8 mb-4" />
                            <p className="text-sm font-medium">Select a component to access its visual parameters.</p>
                        </div>
                    )}
                </AnimatePresence>
            </aside>
        </div>
    );
}

// ── Shared Helper Components (Internal) ───────────────────────────────────────
const isGenerating = false; // Mock for loading state integration
