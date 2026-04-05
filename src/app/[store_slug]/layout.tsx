import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

interface StoreConfig {
    theme?: {
        primary?: string;
        secondary?: string;
        accent?: string;
    };
}

export default async function StoreLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ store_slug: string }>;
}) {
    const { store_slug } = await params;
    const supabase = await createClient();

    const { data: store } = await supabase
        .from("stores")
        .select("config_json")
        .eq("slug", store_slug)
        .single();

    if (!store) return notFound();

    const config = store.config_json as StoreConfig;
    const theme = config.theme || {
        primary: "#7c3aed",
        secondary: "#ffffff",
        accent: "#10b981",
    };

    return (
        <div
            style={
                {
                    "--store-primary": theme.primary,
                    "--store-secondary": theme.secondary,
                    "--store-accent": theme.accent,
                } as React.CSSProperties
            }
            className="min-h-screen bg-[var(--store-secondary)] text-foreground"
        >
            {children}
        </div>
    );
}
