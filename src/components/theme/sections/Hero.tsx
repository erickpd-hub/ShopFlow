import Image from "next/image";
import { Button } from "@/components/ui/button";

interface HeroSettings {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  alignment?: "left" | "center" | "right";
  paddingY?: string | number;
  titleColor?: string;
  subtitleColor?: string;
  ctaColor?: string;
}

export default function Hero({ settings }: { settings: HeroSettings }) {
  const { 
    title, 
    subtitle, 
    ctaText, 
    ctaLink, 
    imageUrl, 
    alignment = "center",
    paddingY = 96,
    titleColor = "var(--theme-primary)",
    subtitleColor = "var(--theme-text, #1e293b)",
    ctaColor = "var(--theme-primary)"
  } = settings;

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left":
        return "text-left items-start";
      case "right":
        return "text-right items-end";
      default:
        return "text-center items-center";
    }
  };

  return (
    <section className="w-full transition-colors duration-400" 
             style={{ 
               backgroundColor: "var(--theme-bg)", 
               color: subtitleColor,
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className={`container mx-auto px-6 flex flex-col ${getAlignmentClass()}`}>
        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-[-0.04em] leading-tight" 
            style={{ color: titleColor }}>
          {title || "Crafting Premium Experiences"}
        </h1>
        
        <p className="text-xl md:text-2xl opacity-80 max-w-2xl mb-12 font-medium leading-relaxed"
           style={{ color: subtitleColor }}>
          {subtitle || "We help boutiques scale their digital presence with AI-powered commerce and hyper-personalized designs."}
        </p>

        {imageUrl && (
          <div className="w-full max-w-5xl h-[500px] relative mb-12 overflow-hidden shadow-2xl shadow-black/5">
            <Image 
              src={imageUrl} 
              alt={title || "Hero Image"} 
              fill 
              className="object-cover" 
            />
          </div>
        )}

        <Button 
          size="lg" 
          className="h-16 px-12 font-black text-white rounded-full shadow-xl shadow-black/5 hover:-translate-y-1 transition-all border-none"
          style={{ backgroundColor: ctaColor }} 
          asChild
        >
          <a href={ctaLink || "#"}>{ctaText || "Explore Catalog"}</a>
        </Button>
      </div>
    </section>
  );
}
