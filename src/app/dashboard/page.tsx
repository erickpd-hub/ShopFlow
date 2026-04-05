"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { useUser } from "@/context/UserContext";

type Period = "today" | "week" | "year" | "historic";

interface ChartConfig {
    values: number[];
    labels: { es: string[]; en: string[] };
}

interface PeriodStats {
    revenue: string;
    orders: string;
    customers: string;
    conversion: string;
}

const chartData: Record<Period, ChartConfig> = {
    today: {
        values: [12, 28, 45, 38, 60, 52, 70, 48],
        labels: {
            es: ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"],
            en: ["6am", "8am", "10am", "12pm", "2pm", "4pm", "6pm", "8pm"],
        },
    },
    week: {
        values: [45, 30, 60, 40, 50, 75, 55],
        labels: {
            es: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
            en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
    },
    year: {
        values: [40, 55, 48, 62, 70, 58, 80, 72, 65, 90, 85, 95],
        labels: {
            es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
    },
    historic: {
        values: [20, 35, 42, 55, 60, 70, 65, 80, 90, 85, 95, 100, 110, 115, 120],
        labels: {
            es: ["10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
            en: ["'10", "'11", "'12", "'13", "'14", "'15", "'16", "'17", "'18", "'19", "'20", "'21", "'22", "'23", "'24"],
        },
    },
};

const periodStats: Record<Period, PeriodStats> = {
    today: { revenue: "$1,240.00", orders: "5", customers: "48", conversion: "4.1%" },
    week: { revenue: "$12,450.00", orders: "48", customers: "1,203", conversion: "3.2%" },
    year: { revenue: "$148,320.00", orders: "576", customers: "14,430", conversion: "2.8%" },
    historic: { revenue: "$1.2M", orders: "4,820", customers: "89,000", conversion: "2.3%" },
};

const periodChanges: Record<Period, { revenue: string; orders: string; customers: string; conversion: string; revTrend: "up" | "down"; ordTrend: "up" | "down"; custTrend: "up" | "down"; convTrend: "up" | "down" }> = {
    today: { revenue: "+8%", orders: "+3%", customers: "+1%", conversion: "+0.3%", revTrend: "up", ordTrend: "up", custTrend: "up", convTrend: "up" },
    week: { revenue: "+16%", orders: "-2%", customers: "+8%", conversion: "+0.5%", revTrend: "up", ordTrend: "down", custTrend: "up", convTrend: "up" },
    year: { revenue: "+32%", orders: "+28%", customers: "+22%", conversion: "-0.4%", revTrend: "up", ordTrend: "up", custTrend: "up", convTrend: "down" },
    historic: { revenue: "+500%", orders: "+482%", customers: "+890%", conversion: "+1.1%", revTrend: "up", ordTrend: "up", custTrend: "up", convTrend: "up" },
};

export default function DashboardHome() {
    const { t, language } = useLanguage();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [activePeriod, setActivePeriod] = useState<Period>("week");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const lang = language === "es" ? "es" : "en";
    const currentChart = chartData[activePeriod];
    const currentStats = periodStats[activePeriod];
    const currentChanges = periodChanges[activePeriod];
    const maxVal = Math.max(...currentChart.values);

    const periodLabels: Record<Period, { es: string; en: string }> = {
        today: { es: "Hoy", en: "Today" },
        week: { es: "Semana", en: "Week" },
        year: { es: "Año", en: "Year" },
        historic: { es: "Histórico", en: "Historic" },
    };

    const recentOrders = [
        { id: "#ORD-001", customer: "John Doe", product: "DualSense Wireless Controller", total: "$79.99", status: t.dashboard.home.orders.completed },
        { id: "#ORD-002", customer: "Sarah Smith", product: "Ultra Soft Sneakers", total: "$120.50", status: t.dashboard.home.orders.pending },
        { id: "#ORD-003", customer: "Mike K.", product: "Noise Cancel H-P", total: "$249.00", status: t.dashboard.home.orders.shipped },
        { id: "#ORD-004", customer: "Liza Ray", product: "Winter Puffer", total: "$89.99", status: t.dashboard.home.orders.completed },
    ];

    const statCards = [
        { name: t.dashboard.home.stats.revenue, value: currentStats.revenue, change: currentChanges.revenue, trend: currentChanges.revTrend, icon: "payments" },
        { name: t.dashboard.home.stats.orders, value: currentStats.orders, change: currentChanges.orders, trend: currentChanges.ordTrend, icon: "shopping_cart" },
        { name: t.dashboard.home.stats.customers, value: currentStats.customers, change: currentChanges.customers, trend: currentChanges.custTrend, icon: "group" },
        { name: t.dashboard.home.stats.conversion, value: currentStats.conversion, change: currentChanges.conversion, trend: currentChanges.convTrend, icon: "insights" },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-2">
                    {language === "es" ? "¡Hola," : "Hello,"} <span className="text-primary">{user.name.split(' ')[0]}!</span>
                </h1>
                <p className="text-color-500 font-medium mt-1">
                    {t.dashboard.home.subtitle}{" "}
                    <span className="text-primary italic font-serif">&quot;TechGadgets Store&quot;</span>
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading
                    ? [1, 2, 3, 4].map((i) => (
                        <div key={i} className="glass-card p-6 shadow-xl shadow-black/5 flex flex-col gap-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="h-3 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-1/3" />
                                <div className="h-6 w-6 bg-color-50 dark:bg-color-900/50 rounded-full animate-pulse" />
                            </div>
                            <div className="h-8 bg-color-100 dark:bg-color-800 rounded animate-pulse w-1/2" />
                            <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-2/3 mt-2" />
                        </div>
                    ))
                    : statCards.map((stat) => (
                        <div
                            key={stat.name}
                            className="glass-card p-6 group hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-black/5 hover:shadow-primary/5 relative overflow-hidden"
                        >
                            <div className="flex flex-row items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-color-400 tracking-[0.2em] uppercase">{stat.name}</span>
                                <span className="material-symbols-outlined text-primary/30 text-xl group-hover:text-primary transition-colors">{stat.icon}</span>
                            </div>
                            <div className="text-3xl font-black text-foreground mb-3 transition-all duration-300">{stat.value}</div>
                            <div className="flex items-center">
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] font-black border-none px-2 rounded-full ${stat.trend === "up"
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-[10px] mr-1">
                                        {stat.trend === "up" ? "trending_up" : "trending_down"}
                                    </span>
                                    {stat.change}
                                </Badge>
                                <span className="text-[10px] text-color-400 ml-2 font-medium uppercase tracking-wider">
                                    {t.dashboard.home.stats.vsLastMonth}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <div className="lg:col-span-2 glass-card p-8 shadow-2xl shadow-black/5">
                    <div className="flex flex-row items-center justify-between mb-10">
                        {isLoading ? (
                            <div className="space-y-2 w-1/2">
                                <div className="h-6 bg-color-100 dark:bg-color-800 rounded animate-pulse w-1/2" />
                                <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-3/4" />
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-black text-foreground">{t.dashboard.home.sales.title}</h3>
                                <p className="text-color-500 text-sm font-medium">{t.dashboard.home.sales.subtitle}</p>
                            </div>
                        )}

                        {/* Period Filter Buttons */}
                        <div className="flex gap-1 p-1 bg-color-100/50 dark:bg-color-900/50 rounded-xl">
                            {(["today", "week", "year", "historic"] as Period[]).map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setActivePeriod(period)}
                                    className={`text-[10px] font-black h-7 px-3 rounded-lg transition-all duration-200 cursor-pointer ${activePeriod === period
                                            ? "bg-white dark:bg-color-800 shadow-sm text-primary scale-105"
                                            : "text-color-400 hover:text-foreground hover:bg-white/60 dark:hover:bg-color-800/60"
                                        }`}
                                >
                                    {periodLabels[period][lang]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex items-end justify-between gap-3 h-[280px] mb-4">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-color-50 dark:bg-color-900/50 animate-pulse rounded-t-xl"
                                    style={{ height: `${30 + i * 10}%` }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="h-[280px] flex items-end justify-between px-2 gap-2 mb-4">
                            {currentChart.values.map((val, i) => (
                                <div
                                    key={`${activePeriod}-${i}`}
                                    className="flex-1 flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 duration-500"
                                    style={{ animationDelay: `${i * 40}ms` }}
                                >
                                    <div
                                        className="w-full bg-primary/10 hover:bg-primary transition-colors duration-500 rounded-2xl relative group cursor-pointer"
                                        style={{ height: `${(val / maxVal) * 240}px` }}
                                    >
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass-card py-2 px-3 text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-xl whitespace-nowrap z-20">
                                            ${(val * 100).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between px-2 text-[10px] text-color-400 uppercase font-black tracking-[0.15em]">
                        {currentChart.labels[lang].map((label, i) => (
                            <span key={i} className="flex-1 text-center truncate">{label}</span>
                        ))}
                    </div>
                </div>

                {/* AI Insight Card */}
                <div className="glass-card p-2 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden group shadow-2xl shadow-black/5 hover:shadow-primary/5 transition-all">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full" />
                    <div className="p-8 relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-6 bg-white dark:bg-color-900/80 w-fit px-4 py-2 rounded-2xl shadow-sm">
                            <span className="material-symbols-outlined text-primary filled">sparkles</span>
                            <span className="text-[10px] font-black tracking-widest uppercase text-color-500">{t.dashboard.home.ai.title}</span>
                        </div>
                        {isLoading ? (
                            <div className="flex-1 space-y-3 pt-2">
                                <div className="h-4 bg-color-100 dark:bg-color-800 rounded animate-pulse w-full" />
                                <div className="h-4 bg-color-100 dark:bg-color-800 rounded animate-pulse w-5/6" />
                                <div className="h-4 bg-color-100 dark:bg-color-800 rounded animate-pulse w-4/6" />
                            </div>
                        ) : (
                            <p className="text-foreground font-bold text-lg leading-relaxed mb-8 flex-1 animate-in fade-in duration-500">
                                &quot;{language === "es" ? "Tus ventas de " : "Your sales of "}
                                <em className="font-serif italic text-primary">
                                    {language === "es" ? "electrónica" : "electronics"}
                                </em>{" "}
                                {language === "es" ? "han subido un " : "have risen by "}
                                <span className="font-black text-primary">22%</span>
                                {language === "es" ? " esta semana." : " this week."}&quot;
                            </p>
                        )}
                        <Button className="w-full bg-black dark:bg-white text-white dark:text-black font-black rounded-2xl h-14 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer border-none shadow-xl shadow-black/5 mt-auto">
                            {t.dashboard.home.ai.button}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="glass-card shadow-2xl shadow-black/5 overflow-hidden">
                <div className="p-8 flex flex-row items-center justify-between border-b border-color-50 dark:border-color-900/50 bg-white/40 dark:bg-color-900/20">
                    <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{t.dashboard.home.orders.title}</h3>
                    <Button variant="ghost" size="sm" className="text-xs font-black rounded-xl hover:bg-color-100 dark:hover:bg-color-900/50 transition-all">
                        {t.dashboard.home.orders.viewAll}{" "}
                        <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-color-400 border-b border-color-50 dark:border-color-900/50 bg-color-50/30 dark:bg-color-950/30">
                                <th className="py-5 font-black px-8 uppercase tracking-widest text-[10px]">{t.dashboard.home.orders.id}</th>
                                <th className="py-5 font-black uppercase tracking-widest text-[10px]">{t.dashboard.home.orders.customer}</th>
                                <th className="py-5 font-black uppercase tracking-widest text-[10px]">{t.dashboard.home.orders.product}</th>
                                <th className="py-5 font-black uppercase tracking-widest text-[10px] text-right">{t.dashboard.home.orders.total}</th>
                                <th className="py-5 font-black uppercase tracking-widest text-[10px] text-center px-8">{t.dashboard.home.orders.status}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-color-50 dark:divide-color-900/50">
                            {isLoading
                                ? [1, 2, 3, 4].map((i) => (
                                    <tr key={i}>
                                        <td className="py-5 px-8"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-16" /></td>
                                        <td className="py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-24" /></td>
                                        <td className="py-5"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-40" /></td>
                                        <td className="py-5 flex justify-end"><div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-16" /></td>
                                        <td className="py-5 px-8"><div className="h-6 mx-auto bg-color-50 dark:bg-color-900/50 rounded-full animate-pulse w-20" /></td>
                                    </tr>
                                ))
                                : recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-primary/5 transition-colors cursor-pointer animate-in fade-in">
                                        <td className="py-5 font-bold px-8 text-primary">{order.id}</td>
                                        <td className="py-5 font-medium text-foreground">{order.customer}</td>
                                        <td className="py-5 text-color-500 font-medium">{order.product}</td>
                                        <td className="py-5 text-right font-black text-foreground">{order.total}</td>
                                        <td className="py-5 px-8">
                                            <div className="flex justify-center">
                                                <Badge
                                                    variant="secondary"
                                                    className={`text-[10px] font-black px-3 py-1 rounded-full border-none ${order.status === t.dashboard.home.orders.completed
                                                            ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
                                                            : order.status === t.dashboard.home.orders.pending
                                                                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                                                                : "bg-primary text-white shadow-lg shadow-primary/20"
                                                        }`}
                                                >
                                                    {order.status}
                                                </Badge>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
