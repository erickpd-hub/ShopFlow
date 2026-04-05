import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

interface ProductGridSettings {
  title?: string;
  columns?: number;
  products?: Product[];
  paddingY?: string | number;
  cardBgColor?: string;
}

export default function ProductGrid({ settings }: { settings: ProductGridSettings }) {
  const { 
    title, 
    columns = 4, 
    products = [], 
    paddingY = 96,
    cardBgColor = "#ffffff"
  } = settings;

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
  }[columns] || "md:grid-cols-4";

  return (
    <section className="w-full transition-all duration-500"
             style={{ 
               backgroundColor: "var(--theme-bg)", 
               color: "var(--theme-text, #1e293b)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6">
        {title && (
            <h2 className="text-4xl md:text-6xl font-black mb-16 tracking-[-0.04em] text-center" style={{ color: "var(--theme-primary)" }}>
            {title}
            </h2>
        )}

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-12`}>
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)]" 
                 style={{ 
                   backgroundColor: cardBgColor 
                 }}>
              <div className="aspect-[4/5] bg-[#F5F5F5] relative overflow-hidden flex items-center justify-center">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="text-slate-300 italic font-black uppercase tracking-widest text-xs">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-black tracking-tight mb-2 truncate group-hover:text-[var(--theme-primary)] transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-end justify-between mt-auto pt-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Price</span>
                    <span className="text-2xl font-black leading-none" style={{ color: "var(--theme-primary)" }}>
                      ${product.price}
                    </span>
                  </div>
                  <Button 
                    className="h-14 w-14 rounded-full text-white shadow-xl shadow-black/5 flex items-center justify-center transition-all hover:scale-110 active:scale-95" 
                    style={{ backgroundColor: "var(--theme-primary)" }}
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {(!products || products.length === 0) && [1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse flex flex-col bg-white opacity-40 grayscale">
              <div className="aspect-[4/5] bg-slate-100" />
              <div className="p-8 space-y-4">
                <div className="h-6 w-3/4 bg-slate-100 rounded-none" />
                <div className="h-10 w-1/4 bg-slate-100 rounded-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
