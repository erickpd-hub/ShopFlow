import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageWithTextSettings {
  title?: string;
  content?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  imagePosition?: "left" | "right";
  paddingY?: string | number;
  titleColor?: string;
  contentColor?: string;
}

export default function ImageWithText({ settings }: { settings: ImageWithTextSettings }) {
  const { 
    title, 
    content, 
    ctaText, 
    ctaLink, 
    imageUrl, 
    imagePosition = "left",
    paddingY = 96,
    titleColor = "var(--theme-primary)",
    contentColor = "var(--theme-text, #1e293b)"
  } = settings;

  return (
    <section className="w-full transition-all duration-500 overflow-hidden" 
             style={{ 
               backgroundColor: "var(--theme-bg)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6">
        <div className={`flex flex-col ${imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16 md:gap-24`}>
          {/* Image Part */}
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/5] md:aspect-square relative overflow-hidden shadow-2xl shadow-black/5">
              <Image 
                src={imageUrl || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"} 
                alt={title || "Section Image"} 
                fill 
                className="object-cover"
              />
            </div>
            {/* Design accents */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-8 border-white/40 rounded-full blur-xl -z-10" />
          </div>

          {/* Text Part */}
          <div className="flex-1 flex flex-col items-start text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-[-0.04em] leading-tight" style={{ color: titleColor }}>
              {title || "Distinctive Design, Uncompromising Quality"}
            </h2>
            <p className="text-lg md:text-xl opacity-80 mb-12 font-medium leading-relaxed" style={{ color: contentColor }}>
              {content || "We believe that true luxury lies in the details. Every piece in our collection is meticulously crafted to tell its own unique story."}
            </p>
            {ctaText && (
              <Button 
                size="lg" 
                className="h-16 px-12 font-black text-white rounded-full shadow-xl shadow-black/5 hover:-translate-y-1 transition-all"
                style={{ backgroundColor: "var(--theme-primary)" }}
                asChild
              >
                <a href={ctaLink || "#"}>{ctaText}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
