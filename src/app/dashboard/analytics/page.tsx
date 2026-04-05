"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    const metrics = [
        { label: language === 'es' ? 'Ventas Totales' : 'Total Sales', value: '$12,450.00', trend: '+15.2%', isPositive: true, icon: 'payments' },
        { label: language === 'es' ? 'Tasa de Conversión' : 'Conversion Rate', value: '3.8%', trend: '+0.4%', isPositive: true, icon: 'trending_up' },
        { label: language === 'es' ? 'Valor Promedio' : 'Avg Order Value', value: '$85.00', trend: '-2.1%', isPositive: false, icon: 'shopping_bag' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">{language === 'es' ? 'Analíticas' : 'Analytics'}</h1>
                    <p className="text-color-500 font-medium mt-1">{language === 'es' ? 'Revisa el rendimiento y estadísticas de tu tienda.' : 'Review your store performance and statistics.'}</p>
                </div>
                <Button variant="ghost" className="h-14 px-6 rounded-2xl gap-3 bg-white dark:bg-color-900/50 font-black shadow-sm shadow-black/5 hover:bg-color-50 dark:hover:bg-color-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">download</span>
                    {language === 'es' ? 'Exportar Reporte' : 'Export Report'}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="glass-card p-6 shadow-xl shadow-black/5 flex flex-col gap-4">
                            <div className="h-10 w-10 bg-color-50 dark:bg-color-900/50 rounded-xl animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-1/2"></div>
                                <div className="h-8 bg-color-100 dark:bg-color-800 rounded animate-pulse w-3/4"></div>
                            </div>
                        </div>
                    ))
                ) : (
                    metrics.map((metric, i) => (
                        <div key={i} className="glass-card p-6 shadow-xl shadow-black/5 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                            <div className="flex justify-between items-start">
                                <div className="h-10 w-10 bg-color-50 dark:bg-color-900/50 rounded-xl flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">{metric.icon}</span>
                                </div>
                                <span className={`text-xs font-black px-2 py-1 rounded-full ${metric.isPositive ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                                    {metric.trend}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-color-400 font-bold text-sm tracking-widest uppercase mb-1">{metric.label}</h3>
                                <div className="text-3xl font-black text-foreground">{metric.value}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="glass-card shadow-2xl shadow-black/5 p-8 flex flex-col min-h-[400px]">
                <h3 className="text-lg font-black text-foreground mb-6 uppercase tracking-widest">{language === 'es' ? 'Ingresos vs Pedidos' : 'Revenue vs Orders'}</h3>
                {isLoading ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-color-200 dark:text-color-800 mb-4 animate-pulse">monitoring</span>
                        <p className="text-color-500 font-bold animate-pulse">{language === 'es' ? 'Cargando gráficos de rendimiento...' : 'Loading performance charts...'}</p>
                    </div>
                ) : (
                    <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 mt-auto pt-8 border-b border-color-50 dark:border-color-900/50 pb-2 animate-in fade-in duration-700">
                        {/* Mock bar chart */}
                        {[45, 60, 35, 70, 85, 50, 95].map((height, i) => (
                            <div key={i} className="w-full relative group flex justify-center">
                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded-lg transition-all scale-95 group-hover:scale-100 z-10 pointer-events-none">
                                    ${height * 100}
                                </div>
                                <div className="w-full max-w-[4rem] bg-color-100 dark:bg-color-900/50 rounded-t-xl overflow-hidden self-end hover:bg-primary transition-colors cursor-pointer group-hover:shadow-lg group-hover:shadow-primary/20" style={{ height: `${height}%` }}>
                                    <div className="w-full bg-primary/20 h-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
