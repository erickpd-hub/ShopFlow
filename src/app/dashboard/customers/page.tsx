"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";

export default function CustomersPage() {
    const { t, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">{language === 'es' ? 'Clientes' : 'Customers'}</h1>
                    <p className="text-color-500 font-medium mt-1">{language === 'es' ? 'Gestiona tu base de clientes y su historial.' : 'Manage your customer base and history.'}</p>
                </div>
            </div>

            {isLoading ? (
                <div className="glass-card shadow-xl shadow-black/5 overflow-hidden flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-color-50 dark:bg-color-900/50 rounded-full animate-pulse mb-6"></div>
                    <div className="h-6 bg-color-100 dark:bg-color-800 rounded animate-pulse w-48 mb-4"></div>
                    <div className="space-y-2 mb-8 flex flex-col items-center">
                        <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-64"></div>
                        <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-56"></div>
                    </div>
                    <div className="h-10 bg-color-100 dark:bg-color-800 rounded-2xl animate-pulse w-40"></div>
                </div>
            ) : (
                <div className="glass-card shadow-2xl shadow-black/5 overflow-hidden flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-color-50 dark:bg-color-900/50 rounded-full flex items-center justify-center mb-6">
                        <span className="material-symbols-outlined text-4xl text-color-400">group</span>
                    </div>
                    <h2 className="text-xl font-black text-foreground mb-2">{language === 'es' ? 'Listado de Clientes' : 'Customer List'}</h2>
                    <p className="text-color-500 font-medium max-w-sm mb-8">
                        {language === 'es' ? 'Aquí podrás ver y gestionar la información detallada de todas las personas que compren en tu tienda.' : 'Here you can view and manage detailed information about everyone who buys from your store.'}
                    </p>
                    <Button className="bg-black dark:bg-white text-white dark:text-black px-6 rounded-2xl font-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer shadow-xl shadow-black/5 border-none">
                        {language === 'es' ? 'Añadir cliente manual' : 'Add manual customer'}
                    </Button>
                </div>
            )}
        </div>
    );
}
