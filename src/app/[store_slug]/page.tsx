import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import SalesChat from "@/components/storefront/SalesChat";
import { ThemeEngine } from "@/lib/theme-engine";
import { ThemeSchema } from "@/types/theme";

export default async function StoreFrontPage({
    params,
}: {
    params: Promise<{ store_slug: string }>;
}) {
    const { store_slug } = await params;
    const supabase = await createClient();

    // Fetch store details
    const { data: store } = await supabase
        .from("stores")
        .select("*")
        .eq("slug", store_slug)
        .single();

    if (!store) return notFound();

    // Fetch products for this store
    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("store_id", store.id);

    // Schema de fallback por si el JSON no existe o la tienda es nueva.
    const defaultTheme: ThemeSchema = {
        global: {
            colors: {
                primary: "#0f172a", // slate-900 (Ejemplo del accent)
                secondary: "#64748b", // slate-500
                background: "#f8fafc", // slate-50
            },
            borders: "0.75rem",
        },
        sections: [
            {
                id: "section-hero",
                type: "hero",
                order: 1,
                settings: {
                    title: store.config_json?.slogan || "Bienvenidos a nuestra tienda",
                    subtitle: "Encuentra lo mejor y de la manera más rápida con nuestro catálogo.",
                    ctaText: "Ver Catálogo",
                    ctaLink: "#",
                    alignment: "center",
                }
            },
            {
                id: "section-products",
                type: "product-grid",
                order: 2,
                settings: {
                    title: "Productos Destacados",
                    columns: 4,
                }
            }
        ]
    };

    // Usamos el json nativo de la base de datos o el default fallback
    const themeData = (store.theme_json as ThemeSchema) || defaultTheme;

    return (
        <div className="flex flex-col min-h-screen font-sans bg-[var(--theme-bg)] transition-colors duration-300" 
             style={{ 
                 "--theme-primary": themeData.global.colors.primary, 
                 "--theme-bg": themeData.global.colors.background 
             } as React.CSSProperties}>
            
            {/* Header aislado de la configuración de plantillas, o podría abstraerse en el futuro */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="font-bold text-xl flex items-center gap-2">
                        <div className="p-1.5 rounded-lg text-white transition-colors duration-300" style={{ backgroundColor: "var(--theme-primary)" }}>
                            <ShoppingBag className="h-5 w-5" />
                        </div>
                        {store.name}
                    </div>
                    <div className="flex gap-4">
                        <Button variant="ghost" className="text-sm font-medium">Catálogo</Button>
                        <Button className="font-bold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: "var(--theme-primary)" }}>
                            Carrito (0)
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Inyección del Motor de Plantillas Dinámico (Server Component) */}
            <main className="flex-grow">
                <ThemeEngine theme={themeData} globalData={{ products: products || [] }} />
            </main>

            {/* Footer Fijo */}
            <footer className="mt-auto py-12 border-t text-center text-muted-foreground bg-white transition-colors">
                <p>© {new Date().getFullYear()} {store.name} - Potenciado por el Motor de Plantillas</p>
            </footer>

            {/* Chatbot Dinámico con IA */}
            <SalesChat storeId={store.id} storeName={store.name} />
        </div>
    );
}
