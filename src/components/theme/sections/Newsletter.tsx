import { Button } from "@/components/ui/button";

interface NewsletterSettings {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  paddingY?: string | number;
  titleColor?: string;
  buttonColor?: string;
}

export default function Newsletter({ settings }: { settings: NewsletterSettings }) {
  const { 
    title, 
    subtitle, 
    buttonText, 
    paddingY = 96,
    titleColor = "var(--theme-primary)",
    buttonColor = "var(--theme-primary)"
  } = settings;

  return (
    <section className="w-full transition-all duration-500" 
             style={{ 
               backgroundColor: "var(--theme-bg)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6">
        <div className="glass-card max-w-5xl mx-auto p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden border border-black/5" 
             style={{ backgroundColor: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(20px)" }}>
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-[-0.04em] leading-tight" style={{ color: titleColor }}>
            {title || "Join the Boutique Elite"}
          </h2>
          <p className="text-xl md:text-2xl opacity-70 max-w-2xl mb-12 font-medium leading-relaxed" style={{ color: "var(--theme-text, #1e293b)" }}>
            {subtitle || "Subscribe to receive early access to new collections and exclusive designer insights."}
          </p>
          
          <div className="w-full max-w-md flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-1 h-16 px-8 rounded-full bg-white border-none shadow-inner focus:ring-2 focus:ring-black outline-none font-medium transition-all"
            />
            <Button 
              size="lg" 
              className="h-16 px-12 font-black text-white rounded-full shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all border-none"
              style={{ backgroundColor: buttonColor }}
            >
              {buttonText || "Subscribe"}
            </Button>
          </div>
          <p className="mt-8 text-[10px] font-black uppercase tracking-widest opacity-30">No spam, only excellence. Unsubscribe at any time.</p>
        </div>
      </div>
    </section>
  );
}
