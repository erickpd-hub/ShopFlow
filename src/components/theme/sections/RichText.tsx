interface RichTextSettings {
  title?: string;
  content?: string;
  alignment?: "left" | "center" | "right";
  maxWidth?: string | number;
  paddingY?: string | number;
  titleColor?: string;
  contentColor?: string;
}

export default function RichText({ settings }: { settings: RichTextSettings }) {
  const { 
    title, 
    content = "", 
    alignment = "center",
    maxWidth = 800,
    paddingY = 96,
    titleColor = "var(--theme-primary)",
    contentColor = "var(--theme-text, #1e293b)"
  } = settings;

  const getAlignmentClass = () => {
    switch (alignment) {
      case "left": return "text-left";
      case "right": return "text-right";
      default: return "text-center";
    }
  };

  return (
    <section className="w-full transition-all duration-500" 
             style={{ 
               backgroundColor: "var(--theme-bg)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className={`container mx-auto px-6 flex flex-col items-center`}>
        <div className={`w-full ${getAlignmentClass()}`} 
             style={{ maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth }}>
          {title && (
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-[-0.04em] leading-tight" 
                style={{ color: titleColor }}>
              {title}
            </h2>
          )}
          <div className="text-xl md:text-2xl font-medium leading-relaxed space-y-6" 
               style={{ color: contentColor }}>
            {(content || "").split('\n').filter(p => !!p).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {alignment === "center" && (
            <div className="mt-12 h-1 w-24 mx-auto rounded-full opacity-20" 
                 style={{ backgroundColor: "var(--theme-primary)" }} />
          )}
        </div>
      </div>
    </section>
  );
}
