import Image from "next/image";

interface LogoCloudSettings {
  title?: string;
  logos?: string[];
  logos_list?: string;
  logoOpacity?: string | number;
  paddingY?: string | number;
  titleColor?: string;
}

export default function LogoCloud({ settings }: { settings: LogoCloudSettings }) {
  const { 
    title, 
    logos = [],
    logos_list = "",
    logoOpacity = 40,
    paddingY = 80,
    titleColor = "var(--theme-text, #1e293b)"
  } = settings;

  const displayLogos = logos_list 
    ? logos_list.split('\n').map(l => l.trim()).filter(l => !!l)
    : (logos.length > 0 ? logos : ["Brand 1", "Brand 2", "Brand 3", "Brand 4", "Brand 5"]);

  return (
    <section className="w-full transition-all duration-500" 
             style={{ 
               backgroundColor: "var(--theme-bg)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6">
        {title && (
          <p className="text-center text-[10px] font-black uppercase tracking-widest mb-12" 
             style={{ color: titleColor, opacity: 0.5 }}>
            {title}
          </p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale"
             style={{ opacity: Number(logoOpacity) / 100 }}>
          {displayLogos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center min-w-[120px]">
              {logo.startsWith('http') ? (
                <img src={logo} alt={`Logo ${idx}`} className="h-8 md:h-12 w-auto object-contain" />
              ) : (
                <span className="font-black text-xl italic tracking-tighter opacity-100">{logo}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
