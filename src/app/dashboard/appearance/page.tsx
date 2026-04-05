"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { createClient } from "@/utils/supabase/client";
import { uploadTheme } from "@/app/actions/upload-theme";
import { toast } from "sonner";

interface Theme {
    id: string;
    name: string;
    version: string;
    lastUpdated: string;
    previewImage: string;
    status: "live" | "draft";
}

export default function ThemesPage() {
    const { t } = useLanguage();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [storeId, setStoreId] = useState<string | null>(null);
    const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
    const [themeLibrary, setThemeLibrary] = useState<Theme[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                // 1. Obtener sesión y tienda
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data: store } = await supabase
                    .from("stores")
                    .select("id")
                    .eq("owner_id", user.id)
                    .single();

                if (!store) {
                    setIsLoading(false);
                    return;
                }
                setStoreId(store.id);

                // 2. Fetch themes de la tabla store_themes
                const { data: themes, error } = await supabase
                    .from("store_themes")
                    .select("*")
                    .eq("store_id", store.id)
                    .order("created_at", { ascending: false });

                if (error) throw error;

                if (themes && themes.length > 0) {
                    const mappedThemes: Theme[] = themes.map(t => ({
                        id: t.id,
                        name: t.name,
                        version: t.theme_json?.manifest?.version || "1.0.0",
                        lastUpdated: new Date(t.created_at).toLocaleDateString(),
                        previewImage: t.theme_json?.preview_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
                        status: t.is_active ? "live" : "draft"
                    }));

                    const active = mappedThemes.find(t => t.status === "live") || mappedThemes[0];
                    setActiveTheme(active);
                    setThemeLibrary(mappedThemes.filter(t => t.id !== active.id));
                }
            } catch (error) {
                console.error("Error loading themes:", error);
                toast.error("Error al cargar temas reales.");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [supabase]);

    const handleEditTheme = () => {
        window.location.href = '/theme-editor';
    };

    const handleRename = (id: string, currentName: string) => {
        const newName = prompt("Nuevo nombre para el tema:", currentName);
        if (!newName || newName === currentName) return;

        if (!activeTheme) return;

        if (activeTheme.id === id) {
            setActiveTheme({ ...activeTheme, name: newName });
        } else {
            setThemeLibrary(prev => prev.map(t => t.id === id ? { ...t, name: newName } : t));
        }
    };

    const handleDuplicate = (theme: Theme) => {
        const newTheme: Theme = {
            ...theme,
            id: `theme-${Date.now()}`,
            name: `${theme.name} (Copia)`,
            status: "draft",
            lastUpdated: "recién"
        };
        setThemeLibrary(prev => [newTheme, ...prev]);
    };

    const handleDelete = (id: string) => {
        if (!confirm("¿Estás seguro de que quieres eliminar este tema?")) return;
        setThemeLibrary(prev => prev.filter(t => t.id !== id));
    };

    const handlePublish = (theme: Theme) => {
        if (!activeTheme) {
            toast.error("No hay un tema activo para reemplazar.");
            return;
        }
        if (!confirm(`¿Quieres publicar "${theme.name}"? El tema actual pasará a la biblioteca.`)) return;

        const oldActive = { ...activeTheme, status: "draft" as const, lastUpdated: "recién" };
        const newActive = { ...theme, status: "live" as const, lastUpdated: "recién" };

        setActiveTheme(newActive);
        setThemeLibrary(prev => [oldActive, ...prev.filter(t => t.id !== theme.id)]);
    };

    const handleImportTheme = () => {
        if (!storeId) {
            toast.error("No se encontró una tienda activa vinculada a tu cuenta.");
            return;
        }

        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.zip';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;

            setIsUploading(true);
            setIsAddModalOpen(false);
            const loadingToast = toast.loading("Validando y subiendo tema...");

            try {
                const formData = new FormData();
                formData.append("theme", file);
                formData.append("storeId", storeId);

                const result = await uploadTheme(formData);

                if (result.success) {
                    toast.success(result.detail || "Tema subido y activado correctamente", { id: loadingToast });
                    // Recargar la página para ver los cambios
                    window.location.reload();
                } else {
                    toast.error(`${result.error}: ${result.detail}`, { id: loadingToast });
                }
            } catch (error: any) {
                toast.error(`Error inesperado: ${error.message}`, { id: loadingToast });
            } finally {
                setIsUploading(false);
            }
        };
        input.click();
    };

    if (isLoading || !(t.dashboard as Record<string, unknown>).themes) {
        return (
            <div className="flex flex-col h-full space-y-8 animate-pulse">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="h-10 w-48 bg-color-50 dark:bg-color-900/50 rounded-lg"></div>
                        <div className="h-4 w-64 bg-color-50 dark:bg-color-900/50 rounded mt-2"></div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-6 w-32 bg-color-50 dark:bg-color-900/50 rounded"></div>
                    <div className="glass-card h-[400px] w-full rounded-3xl bg-color-50 dark:bg-color-900/20"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">{t.dashboard.themes.title}</h1>
                    <p className="text-color-500 font-medium mt-1">{t.dashboard.themes.subtitle}</p>
                </div>
            </div>

             {/* Live Theme Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black">{t.dashboard.themes.activeTheme}</h2>
                </div>

                {activeTheme ? (
                    <div className="glass-card overflow-hidden shadow-2xl shadow-black/5 bg-white dark:bg-color-900/20">
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Preview Image */}
                            <div className="w-full md:w-[45%] lg:w-[40%] bg-color-100 dark:bg-color-800/50 h-[300px] md:h-auto relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/10 dark:to-transparent flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-primary/30">web</span>
                                </div>
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeTheme.previewImage})`, opacity: 0.9 }}></div>
                            </div>

                            {/* Theme Info and Actions */}
                            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-black">{activeTheme.name}</h3>
                                        <Badge className="bg-green-500 text-white border-none shadow-lg shadow-green-500/20 rounded-full px-3 text-[10px] font-black uppercase tracking-widest">
                                            {t.dashboard.themes.status.live}
                                        </Badge>
                                    </div>
                                    <p className="text-color-500 font-medium text-sm">
                                        {t.dashboard.themes.lastUpdated} {activeTheme.lastUpdated}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-12 md:mt-0">
                                    <Button
                                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-xl shadow-black/5 rounded-2xl h-14 px-8 font-black gap-2 transition-all cursor-pointer"
                                        onClick={handleEditTheme}
                                    >
                                        <span className="material-symbols-outlined text-lg">edit</span>
                                        {t.dashboard.themes.customize}
                                    </Button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-14 w-14 p-0 rounded-2xl hover:bg-color-100 dark:hover:bg-color-800/50 transition-all shadow-sm">
                                                <span className="material-symbols-outlined text-xl">more_horiz</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56 glass-card border-none shadow-2xl p-2 animate-in fade-in zoom-in-95">
                                            <DropdownMenuItem
                                                onClick={() => handleRename(activeTheme.id, activeTheme.name)}
                                                className="gap-3 rounded-xl focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-3 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit_note</span> {t.dashboard.themes.rename}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDuplicate(activeTheme)}
                                                className="gap-3 rounded-xl focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-3 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-lg">file_copy</span> {t.dashboard.themes.duplicate}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="gap-3 rounded-xl focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-3 cursor-pointer">
                                                <span className="material-symbols-outlined text-lg">code</span> {t.dashboard.themes.editCode}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-dashed border-color-200 dark:border-color-800 bg-transparent text-center space-y-4">
                        <span className="material-symbols-outlined text-6xl text-color-300">broken_image</span>
                        <h3 className="text-xl font-bold text-color-500">No hay temas instalados o activos.</h3>
                        <p className="text-sm text-color-400">Instala un tema desde la tienda o sube uno nuevo para comenzar.</p>
                    </div>
                )}
            </div>

            <hr className="border-color-100 dark:border-color-900/50" />

            {/* Theme Library Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black">{t.dashboard.themes.themeLibrary}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Add Theme Card with Modal */}
                    <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                        <DialogTrigger asChild>
                            <div className="glass-card flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-color-200 dark:border-color-800 bg-transparent hover:bg-color-50 dark:hover:bg-color-900/20 transition-all cursor-pointer min-h-[350px] group">
                                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <span className="material-symbols-outlined text-3xl font-bold">add</span>
                                </div>
                                <h3 className="font-black text-lg">{t.dashboard.themes.addTheme}</h3>
                                <p className="text-color-400 text-sm mt-2 text-center">Explora la tienda de temas o sube el tuyo en formato .zip</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] glass-card border-none p-0 overflow-hidden shadow-2xl">
                            <DialogHeader className="p-8 pb-4">
                                <DialogTitle className="text-2xl font-black">Añadir nuevo tema</DialogTitle>
                            </DialogHeader>
                            <div className="p-8 pt-0 grid gap-4">
                                <button
                                    onClick={handleImportTheme}
                                    disabled={isUploading}
                                    className="flex items-center gap-4 p-6 rounded-2xl bg-color-50 dark:bg-color-900/40 hover:bg-primary/10 hover:ring-1 hover:ring-primary/30 transition-all group text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full"
                                >
                                    <div className="w-12 h-12 bg-white dark:bg-color-800 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <span className={`material-symbols-outlined text-primary ${isUploading ? 'animate-spin' : ''}`}>
                                            {isUploading ? 'cloud_upload' : 'upload_file'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-black text-foreground">{isUploading ? 'Subiendo...' : 'Importar archivo .zip'}</p>
                                        <p className="text-color-400 text-xs mt-0.5 font-medium">Límite 50MB. Incluye manifest.json</p>
                                    </div>
                                    {!isUploading && <span className="material-symbols-outlined ml-auto text-color-300 group-hover:translate-x-1 transition-transform">chevron_right</span>}
                                </button>

                                <button
                                    className="flex items-center gap-4 p-6 rounded-2xl bg-color-50 dark:bg-color-900/40 hover:bg-primary/10 hover:ring-1 hover:ring-primary/30 transition-all group text-left cursor-pointer"
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        window.location.href = "/templates";
                                    }}
                                >
                                    <div className="w-12 h-12 bg-white dark:bg-color-800 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-primary">storefront</span>
                                    </div>
                                    <div>
                                        <p className="font-black text-foreground">Visitar tienda de temas</p>
                                        <p className="text-color-400 text-xs mt-0.5 font-medium">Explora diseños premium recomendados</p>
                                    </div>
                                    <span className="material-symbols-outlined ml-auto text-color-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
                                </button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Store/Theme Cards */}
                    {themeLibrary.map(theme => (
                        <div key={theme.id} className="glass-card overflow-hidden shadow-lg shadow-black/5 bg-white dark:bg-color-900/20 flex flex-col group">
                            {/* Preview */}
                            <div className="w-full h-[220px] bg-color-100 dark:bg-color-800/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${theme.previewImage})` }}></div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-black">{theme.name}</h3>
                                        <p className="text-color-400 text-xs font-medium mt-1">V {theme.version}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-color-100 dark:hover:bg-color-800/50 transition-all">
                                                <span className="material-symbols-outlined text-lg">more_horiz</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 glass-card border-none shadow-2xl p-2 animate-in fade-in zoom-in-95">
                                            <DropdownMenuItem
                                                onClick={() => handleRename(theme.id, theme.name)}
                                                className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-lg">edit_note</span> {t.dashboard.themes.rename}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => handleDuplicate(theme)}
                                                className="gap-3 rounded-lg focus:bg-color-100 dark:focus:bg-color-900/80 font-bold px-3 py-2 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-lg">file_copy</span> {t.dashboard.themes.duplicate}
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-color-50 dark:bg-color-900/50 my-1" />
                                            <DropdownMenuItem
                                                onClick={() => handleDelete(theme.id)}
                                                className="gap-3 rounded-lg focus:bg-red-50 dark:focus:bg-red-950/30 text-red-500 font-bold px-3 py-2 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-lg">delete</span> {t.dashboard.themes.remove}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="mt-auto pt-6 flex gap-3">
                                    <Button
                                        onClick={handleEditTheme}
                                        className="flex-1 bg-color-100 dark:bg-color-800 hover:bg-color-200 dark:hover:bg-color-700 text-foreground shadow-none border-none rounded-xl font-bold cursor-pointer transition-colors"
                                    >
                                        {t.dashboard.themes.customize}
                                    </Button>
                                    <Button
                                        onClick={() => handlePublish(theme)}
                                        className="flex-1 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 border-none rounded-xl font-bold cursor-pointer transition-colors"
                                    >
                                        {t.dashboard.themes.publish}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
