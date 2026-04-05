import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function HowItWorksPage() {
    const details = [
        {
            num: "01",
            title: "Connect your store",
            desc: "Register in seconds and name your store. Our IA will start preparing your environment immediately.",
            icon: "stadium"
        },
        {
            num: "02",
            title: "Customize with AI",
            desc: "Tell us about your brand. We'll generate product descriptions, SEO keywords, and high-converting copy in minutes.",
            icon: "psychology"
        },
        {
            num: "03",
            title: "Launch & Sell",
            desc: "Connect your favorite payment gateway and hit Publish. Your products are now ready for the world.",
            icon: "rocket_launch"
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                            How <span className="gradient-text">It Works</span>
                        </h1>
                        <p className="text-color-600 dark:text-color-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            A seamless experience designed for entrepreneurs, not developers.
                        </p>
                    </div>

                    <div className="space-y-32">
                        {details.map((detail, index) => (
                            <div key={detail.num} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
                                <div className="flex-1 text-left">
                                    <span className="text-6xl font-black text-primary/10 mb-4 block leading-none">{detail.num}</span>
                                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{detail.title}</h2>
                                    <p className="text-color-600 dark:text-color-400 text-lg leading-relaxed mb-8">
                                        {detail.desc}
                                    </p>
                                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 inline-flex items-center gap-3">
                                        <span className="material-symbols-outlined text-primary">{detail.icon}</span>
                                        <span className="text-sm font-bold">Included in all plans</span>
                                    </div>
                                </div>
                                <div className="flex-1 aspect-square bg-color-50 dark:bg-color-950 rounded-[3rem] border border-color-200 dark:border-color-900 flex items-center justify-center p-12">
                                    <div className="w-full h-full bg-white dark:bg-color-900 rounded-3xl shadow-2xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[80px] text-color-200">{detail.icon}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
