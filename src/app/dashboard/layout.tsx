"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import { useUser } from "@/context/UserContext";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    const supabase = createClient();
    const { t } = useLanguage();
    const { user } = useUser();

    const menuItems = [
        {
            group: t.dashboard.groups.main, items: [
                { name: t.dashboard.menu.dashboard, icon: "space_dashboard", href: "/dashboard" },
                { name: t.dashboard.menu.products, icon: "store", href: "/dashboard/products" },
                { name: t.dashboard.menu.orders, icon: "local_mall", href: "/dashboard/orders", badge: "3" },
                { name: t.dashboard.menu.customers, icon: "groups", href: "/dashboard/customers" },
                { name: t.dashboard.menu.analytics, icon: "monitoring", href: "/dashboard/analytics" },
            ]
        },
        {
            group: t.dashboard.groups.shop, items: [
                { name: t.dashboard.menu.themes, icon: "format_paint", href: "/dashboard/appearance" },
                { name: t.dashboard.menu.marketing, icon: "stars", href: "/dashboard/marketing" },
                { name: t.dashboard.menu.settings, icon: "toggle_on", href: "/dashboard/settings" },
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-background duration-500 transition-colors">
            {/* Sidebar */}
            <aside className={`${isCollapsed ? "w-16" : "w-48"} bg-white dark:bg-black flex flex-col hidden md:flex transition-all duration-300 border-r border-transparent dark:border-color-900/50 relative`}>
                <div className={`p-4 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:rotate-6 transition-transform flex-shrink-0">
                            <span className="material-symbols-outlined font-bold">rocket_launch</span>
                        </div>
                        {!isCollapsed && <span className="text-xl font-black text-foreground tracking-tight transition-opacity duration-300">ShopFlow</span>}
                    </Link>
                </div>

                <nav className={`flex-1 py-4 space-y-8 overflow-y-auto overflow-x-hidden ${isCollapsed ? "px-2" : "px-4"}`}>
                    {menuItems.map((group) => (
                        <div key={group.group} className="space-y-2">
                            {!isCollapsed && (
                                <p className="px-5 text-[10px] font-black text-color-400 tracking-[0.2em] uppercase transition-opacity duration-300">
                                    {group.group}
                                </p>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center w-full ${isCollapsed ? "justify-center aspect-square rounded-2xl" : "justify-between px-3 py-2 rounded-lg"} text-xs font-bold transition-all duration-300 relative ${isActive
                                                ? "text-white scale-[1.02]"
                                                : `text-color-500 dark:text-color-400 hover:bg-color-100 dark:hover:bg-color-800/50 ${!isCollapsed ? "hover:px-4" : ""}`
                                                }`}
                                            title={isCollapsed ? item.name : undefined}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTab"
                                                    className={`absolute inset-0 bg-primary shadow-lg shadow-primary/20 z-0 ${isCollapsed ? "rounded-2xl" : "rounded-lg"}`}
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <div className={`flex items-center relative z-10 ${isCollapsed ? "justify-center" : "gap-3"}`}>
                                                <span className={`material-symbols-outlined text-xl ${isActive ? "text-white" : ""}`}>
                                                    {item.icon}
                                                </span>
                                                {!isCollapsed && <span className="transition-opacity duration-300 whitespace-nowrap">{item.name}</span>}
                                            </div>
                                            {!isCollapsed && item.badge && (
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black relative z-10 ${isActive ? "bg-white/20 text-white" : "bg-primary text-white"}`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="px-4 mt-auto mb-2 flex justify-center">
                    <button
                        className={`p-3 rounded-2xl flex items-center justify-center transition-all bg-color-50 dark:bg-color-800/30 duration-300 text-color-500 dark:text-color-400 hover:bg-color-100 dark:hover:bg-color-800/50 cursor-pointer`}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        <span className="material-symbols-outlined text-xl">
                            {isCollapsed ? "keyboard_double_arrow_right" : "keyboard_double_arrow_left"}
                        </span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-transparent flex items-center justify-between px-8 z-10">
                    <div className="max-w-md w-full relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-color-400 group-focus-within:text-primary transition-colors">search</span>
                        <input
                            type="text"
                            placeholder={t.dashboard.search}
                            className="w-full bg-color-50 dark:bg-color-900/50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none shadow-sm shadow-black/5 focus:shadow-lg focus:shadow-primary/5 transition-all text-foreground"
                        />
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 p-1.5 bg-color-50 dark:bg-color-900/50 rounded-2xl shadow-sm shadow-black/5">
                            <LanguageToggle />
                            <div className="w-px h-4 bg-color-200 dark:bg-color-700 mx-1"></div>
                            <ModeToggle />
                        </div>

                        <Button variant="ghost" size="icon" className="relative h-11 w-11 bg-color-50 dark:bg-color-900/50 rounded-2xl shadow-sm shadow-black/5 hover:bg-color-100 dark:hover:bg-color-800 transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-color-950" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-11 w-11 bg-color-50 dark:bg-color-900/50 rounded-2xl text-color-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            onClick={() => supabase.auth.signOut()}
                        >
                            <span className="material-symbols-outlined">logout</span>
                        </Button>
                    </div>
                </header>

                {/* Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-8 pt-4">
                    {children}
                </div>
            </main>
        </div>
    );
}
