import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PromoBannerSettings {
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  bgColor?: string;
  textColor?: string;
}

export default function PromoBanner({ settings }: { settings: PromoBannerSettings }) {
  const { 
    text = "FREE SHIPPING ON ORDERS OVER $200", 
    ctaText, 
    ctaLink = "#",
    bgColor = "#000000",
    textColor = "#ffffff"
  } = settings;

  return (
    <div className="w-full min-h-[40px] py-2 flex items-center justify-center gap-6 px-4 relative overflow-hidden transition-all duration-500" 
         style={{ backgroundColor: bgColor, color: textColor }}>
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
          {text}
        </span>
        {ctaText && (
            <a href={ctaLink} className="text-[10px] font-black uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-70 transition-opacity">
                {ctaText}
            </a>
        )}
      </div>
    </div>
  );
}
