interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating?: number;
}

interface TestimonialSettings {
  title?: string;
  testimonials?: Testimonial[];
  t1_name?: string;
  t1_content?: string;
  t2_name?: string;
  t2_content?: string;
  t3_name?: string;
  t3_content?: string;
  paddingY?: string | number;
  titleColor?: string;
}

export default function Testimonials({ settings }: { settings: TestimonialSettings }) {
  const { 
    title = "Lo que dicen nuestros clientes", 
    testimonials = [],
    t1_name, t1_content,
    t2_name, t2_content,
    t3_name, t3_content,
    paddingY = 96,
    titleColor = "var(--theme-primary)"
  } = settings;

  // Combine fixed items from settings if they exist
  const customItems: Testimonial[] = [];
  if (t1_name || t1_content) customItems.push({ name: t1_name || "Client Name", content: t1_content || "Feedback here...", rating: 5 });
  if (t2_name || t2_content) customItems.push({ name: t2_name || "Client Name", content: t2_content || "Feedback here...", rating: 5 });
  if (t3_name || t3_content) customItems.push({ name: t3_name || "Client Name", content: t3_content || "Feedback here...", rating: 5 });

  const displayItems = customItems.length > 0 ? customItems : (testimonials.length > 0 ? testimonials : [
    { name: "Ana Martínez", content: "¡Excelente servicio y calidad increíble! Totalmente recomendado.", rating: 5 },
    { name: "Luis Gómez", content: "Llegó súper rápido y era exactamente lo que buscaba.", rating: 5 },
    { name: "Carla P.", content: "La atención y el producto son de primera. Definitivamente volveré a comprar.", rating: 4 }
  ]);

  return (
    <section className="w-full transition-all duration-500" 
             style={{ 
               backgroundColor: "var(--theme-bg)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black mb-20 tracking-[-0.04em] text-center" style={{ color: titleColor }}>
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayItems.map((item, idx) => (
            <div key={idx} className="p-12 bg-white flex flex-col shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-black/5">
              {/* Abstract element */}
              <div className="absolute top-6 left-10 text-8xl font-black opacity-5 transition-all group-hover:opacity-10 pointer-events-none italic" style={{ color: "var(--theme-primary)" }}>“</div>
              
              <div className="relative z-10 flex flex-col h-full items-center">
                <p className="text-lg md:text-xl font-medium mb-10 leading-relaxed italic" style={{ color: "var(--theme-text, #1e293b)" }}>
                  “{item.content}”
                </p>
                <div className="mt-auto">
                  <div className="flex justify-center gap-1 mb-4">
                    {Array.from({ length: item.rating || 5 }).map((_, i) => (
                      <span key={i} className="text-xl" style={{ color: "var(--theme-primary)" }}>★</span>
                    ))}
                  </div>
                  <h4 className="text-lg font-black tracking-tight" style={{ color: "var(--theme-text, #1e293b)" }}>{item.name}</h4>
                  {item.role && <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-2">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
