import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

export default function ShowcasePage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Built with <span className="gradient-text">ShopFlow</span>
                    </h1>
                    <p className="text-color-600 dark:text-color-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                        Join 10,000+ businesses running on our platform. From startup to global scale.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-2xl">
                                <div className="aspect-video bg-color-950 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-color-900 to-color-950 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                        <span className="material-symbols-outlined text-6xl text-color-700">language</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8 text-left">
                                    <h3 className="text-white text-2xl font-bold mb-2">Startup Store {i}</h3>
                                    <p className="text-color-300 mb-4">&quot;ShopFlow changed the way we handle our online presence. 10/10 experience.&quot;</p>
                                    <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm w-fit">Visit Website</button>
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
