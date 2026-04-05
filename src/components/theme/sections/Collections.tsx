import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url?: string;
}

interface CollectionsSettings {
  title?: string;
  subtitle?: string;
  products?: Product[];
  collectionId?: string;
  paddingY?: string | number;
  titleColor?: string;
  subtitleColor?: string;
  columns?: string | number;
}

export default function Collections({ settings }: { settings: CollectionsSettings }) {
  const { 
    title = "Selected Collection", 
    subtitle = "Explore our curated picks for this season.", 
    products = [], 
    paddingY = 96,
    titleColor = "var(--theme-primary)",
    subtitleColor = "var(--theme-text, #1e293b)",
    columns = 3
  } = settings;

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4"
  }[columns] || "md:grid-cols-3";

  return (
    <section className="w-full transition-all duration-500"
             style={{ 
               backgroundColor: "var(--theme-bg)", 
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-16">
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] mb-4" style={{ color: titleColor }}>
            {title}
          </h2>
          <p className="text-xl opacity-60 font-medium" style={{ color: subtitleColor }}>
            {subtitle}
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-12`}>
          {products.length > 0 ? products.map((product) => (
            <div key={product.id} className="group flex flex-col overflow-hidden transition-all duration-300">
              <div className="aspect-[3/4] bg-[#F5F5F5] relative overflow-hidden">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="text-slate-300 italic font-black uppercase tracking-widest text-xs flex items-center justify-center h-full">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                <Button 
                    className="absolute bottom-6 left-6 right-6 h-12 rounded-none bg-black text-white font-black uppercase tracking-widest text-[10px] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:text-black"
                >
                    Add to Cart
                </Button>
              </div>
              
              <div className="py-6 flex flex-col">
                <h3 className="text-lg font-black tracking-tight mb-1 truncate">
                  {product.name}
                </h3>
                <span className="text-xl font-medium tracking-tight" style={{ color: "var(--theme-primary)" }}>
                  ${product.price ? product.price.toFixed(2) : "0.00"}
                </span>
              </div>
            </div>
          )) : (
            // Placeholder boxes that actually look better
            [1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col">
                    <div className="aspect-[3/4] bg-zinc-100 flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-zinc-300" />
                    </div>
                    <div className="py-6 space-y-2">
                        <div className="h-6 w-3/4 bg-zinc-100" />
                        <div className="h-6 w-1/4 bg-zinc-100" />
                    </div>
                </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
