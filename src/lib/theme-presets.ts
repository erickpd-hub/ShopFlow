import { ThemeSchema } from "@/types/theme";

export const THEME_PRESETS: Record<string, ThemeSchema> = {
    aura: {
        global: {
            colors: {
                primary: "#0D0D0D",
                secondary: "#666666",
                background: "#FDFDFD",
                accent: "#F0F0F0"
            },
            fonts: {
                heading: "Inter",
                body: "Inter"
            },
        },
        sections: [
            {
                id: "aura-banner",
                type: "promo-banner",
                order: 0,
                settings: {
                    text: "WORLDWIDE EXPRESS SHIPPING INCLUDED",
                    bgColor: "#000000",
                    textColor: "#ffffff"
                }
            },
            {
                id: "aura-hero",
                type: "hero",
                order: 1,
                settings: {
                    title: "The Essence of Luxury",
                    subtitle: "Curated collection for the modern minimal soul. Quality over quantity.",
                    ctaText: "Shop Collection",
                    alignment: "center",
                    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80"
                }
            },
            {
                id: "aura-collections",
                type: "collections",
                order: 2,
                settings: {
                    title: "Selected Edit",
                    subtitle: "Handpicked masterpieces for your wardrobe.",
                    columns: "3"
                }
            },
            {
                id: "aura-newsletter",
                type: "newsletter",
                order: 4,
                settings: {
                    title: "Join the Inner Circle",
                    subtitle: "Get exclusive early access to our limited editions.",
                    buttonText: "Subscribe",
                    buttonColor: "#000000"
                }
            }
        ]
    },
    pulse: {
        global: {
            colors: {
                primary: "#00E0FF",
                secondary: "#7000FF",
                background: "#050505",
                accent: "#1A1A1A"
            },
            fonts: {
                heading: "Space Grotesk",
                body: "Inter"
            },
        },
        sections: [
            {
                id: "pulse-banner",
                type: "promo-banner",
                order: 0,
                settings: {
                    text: "DROP 02: CYBERPUNK COLLECTION LIVE",
                    bgColor: "#00E0FF",
                    textColor: "#000000"
                }
            },
            {
                id: "pulse-hero",
                type: "hero",
                order: 1,
                settings: {
                    title: "POWER YOUR SETUP",
                    subtitle: "Next-gen electronics designed for peak performance and style.",
                    ctaText: "UPGRADE NOW",
                    alignment: "left",
                    imageUrl: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1200&q=80",
                    titleColor: "#00E0FF"
                }
            },
            {
                id: "pulse-collections",
                type: "collections",
                order: 2,
                settings: {
                    title: "TECH STACK",
                    subtitle: "Optimized for speed and aesthetics.",
                    columns: "4"
                }
            },
            {
                id: "pulse-newsletter",
                type: "newsletter",
                order: 3,
                settings: {
                    title: "DON'T MISS THE DROP",
                    subtitle: "Be the first to know about new tech releases.",
                    buttonText: "SIGN UP",
                    buttonColor: "#00E0FF"
                }
            }
        ]
    },
    artisan: {
        global: {
            colors: {
                primary: "#8C6A5D",
                secondary: "#BF8F7A",
                background: "#F7F3F0",
                accent: "#E4D5C9"
            },
            fonts: {
                heading: "Cormorant Garamond",
                body: "Inter"
            },
        },
        sections: [
            {
                id: "artisan-banner",
                type: "promo-banner",
                order: 0,
                settings: {
                    text: "ETHICALLY SOURCED. HAND-CRAFTED. FOREVER.",
                    bgColor: "#8C6A5D",
                    textColor: "#ffffff"
                }
            },
            {
                id: "artisan-hero",
                type: "hero",
                order: 1,
                settings: {
                    title: "Rooted in Tradition",
                    subtitle: "Hand-crafted artifacts that bring a touch of nature into your home.",
                    ctaText: "Our Story",
                    alignment: "center",
                    imageUrl: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=1200&q=80",
                    titleColor: "#8C6A5D"
                }
            },
            {
                id: "artisan-collections",
                type: "collections",
                order: 2,
                settings: {
                    title: "The Maker's Edit",
                    subtitle: "Each piece tells a unique story of craftsmanship.",
                    columns: "3"
                }
            },
            {
                id: "artisan-newsletter",
                type: "newsletter",
                order: 3,
                settings: {
                    title: "Join our Community",
                    subtitle: "Stay updated on new seasonal collections and maker stories.",
                    buttonText: "Join",
                    buttonColor: "#8C6A5D"
                }
            }
        ]
    },
    vista: {
        global: {
            colors: {
                primary: "#2D3436",
                secondary: "#636E72",
                background: "#FFFFFF",
                accent: "#F1F2F6"
            },
            fonts: {
                heading: "Outfit",
                body: "Inter"
            },
        },
        sections: [
            {
                id: "vista-banner",
                type: "promo-banner",
                order: 0,
                settings: {
                    text: "SOPHISTICATED LIVING. MODERN SOLUTIONS.",
                    bgColor: "#2D3436",
                    textColor: "#ffffff"
                }
            },
            {
                id: "vista-hero",
                type: "hero",
                order: 1,
                settings: {
                    title: "Vision for Living",
                    subtitle: "Architectural elegance meet everyday comfort. Modern solutions for modern lives.",
                    ctaText: "View Collection",
                    alignment: "right",
                    imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&q=80",
                    titleColor: "#2D3436"
                }
            },
            {
                id: "vista-collections",
                type: "collections",
                order: 2,
                settings: {
                    title: "Modern Living",
                    subtitle: "Crafted for the conscious homeowner.",
                    columns: "4"
                }
            },
            {
                id: "vista-newsletter",
                type: "newsletter",
                order: 3,
                settings: {
                    title: "Design Updates",
                    subtitle: "Tips and inspiration for your modern home.",
                    buttonText: "Subscribe",
                    buttonColor: "#2D3436"
                }
            }
        ]
    }
};
