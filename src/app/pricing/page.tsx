import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for testing your idea.",
            features: ["1 Store", "10 Products", "Standard Subdomain", "Basic Analytics"],
            buttonText: "Get Started",
            highlight: false
        },
        {
            name: "Pro",
            price: "$29",
            description: "For growing businesses.",
            features: ["Unlimited Products", "Custom Domain", "Advanced AI Content", "Priority Support"],
            buttonText: "Start Free Trial",
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Scale your empire.",
            features: ["Multi-tenant Control", "White-label Solution", "API Access", "Dedicated Manager"],
            buttonText: "Contact Sales",
            highlight: false
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        Plan your <span className="gradient-text">Success</span>
                    </h1>
                    <p className="text-color-600 dark:text-color-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed">
                        Simple, transparent pricing for entrepreneurs at every stage.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.name} className={`p-8 rounded-[1.5rem] border ${plan.highlight ? 'border-primary ring-1 ring-primary shadow-xl bg-primary/5' : 'border-color-200 dark:border-color-900 bg-white dark:bg-color-900'} flex flex-col items-start text-left relative overflow-hidden`}>
                                {plan.highlight && (
                                    <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Most Popular</div>
                                )}
                                <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== "Custom" && <span className="text-color-400">/mo</span>}
                                </div>
                                <p className="text-color-500 text-sm mb-8">{plan.description}</p>
                                <ul className="space-y-4 mb-10 w-full">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm">
                                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className={`w-full h-12 rounded-full font-bold mt-auto ${plan.highlight ? 'bg-primary text-white hover:opacity-90' : 'bg-color-950 dark:bg-white text-white dark:text-color-950'}`}>
                                    {plan.buttonText}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
