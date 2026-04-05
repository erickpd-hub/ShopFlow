import React, { ReactNode, Suspense } from "react";
import { ThemeSchema, ThemeSection } from "@/types/theme";
import Hero from "@/components/theme/sections/Hero";
import ProductGrid from "@/components/theme/sections/ProductGrid";
import Newsletter from "@/components/theme/sections/Newsletter";
import Testimonials from "@/components/theme/sections/Testimonials";
import ImageWithText from "@/components/theme/sections/ImageWithText";
import RichText from "@/components/theme/sections/RichText";
import FAQ from "@/components/theme/sections/FAQ";
import LogoCloud from "@/components/theme/sections/LogoCloud";
import PromoBanner from "@/components/theme/sections/PromoBanner";
import Collections from "@/components/theme/sections/Collections";

// Registro de componentes disponibles en el motor de plantillas
const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  "product-grid": ProductGrid,
  newsletter: Newsletter,
  testimonials: Testimonials,
  "image-with-text": ImageWithText,
  "rich-text": RichText,
  faq: FAQ,
  "logo-cloud": LogoCloud,
  "promo-banner": PromoBanner,
  "collections": Collections,
};

interface ThemeEngineProps {
  theme: ThemeSchema;
  globalData?: Record<string, any>; // Pasar datos externos como productos, posts, etc.
}

export function ThemeEngine({ theme, globalData = {} }: ThemeEngineProps) {
  const { global, sections } = theme;

  // Construir las variables CSS que consumirá Tailwind y estilos en línea
  const cssVariables = {
    "--theme-primary": global.colors.primary,
    "--theme-secondary": global.colors.secondary,
    "--theme-bg": global.colors.background,
    "--theme-text": global.colors.primary === "#ffffff" ? "#000000" : "#1e293b", // Fallback color for text
    "--theme-primary-foreground": "#ffffff",
  } as React.CSSProperties;

  // Ordenar las secciones según el prop 'order'
  const sortedSections = [...(sections || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div style={cssVariables} className="w-full min-h-screen bg-[var(--theme-bg)] transition-colors duration-300">
      {sortedSections.map((section, idx) => {
        if (!section || !section.type) return null;
        
        const SectionComponent = SECTION_COMPONENTS[section.type];

        // Fallback: Si el componente no existe en el registro
        if (!SectionComponent) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div key={section.id} className="p-4 m-4 border-2 border-dashed border-red-500 bg-red-50 text-red-700 rounded-md text-center font-mono text-sm max-w-4xl mx-auto">
                <p>⚠️ Missing Component: "{section.type}" no está registrado en el ThemeEngine.</p>
              </div>
            );
          }
          // En producción, ignoramos la sección para no romper la tienda
          return null;
        }

        // Combinar datos globales cuando sea necesario
        const mergedSettings = { ...section.settings };
        
        if ((section.type === "product-grid" || section.type === "collections") && globalData.products) {
          mergedSettings.products = globalData.products;
        }

        return (
          <Suspense 
            key={section.id} 
            fallback={
              <div className="h-48 flex flex-col items-center justify-center text-slate-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-400 mb-2"></div>
                Cargando sección...
              </div>
            }
          >
            <SectionComponent settings={mergedSettings} />
          </Suspense>
        );
      })}
    </div>
  );
}
