export type Language = 'en' | 'es';

export const translations = {
    en: {
        nav: {
            login: "Log in",
            startSelling: "Start Selling Free",
            howItWorks: "How it works",
            templates: "Templates",
            pricing: "Pricing",
            showcase: "Showcase"
        },
        hero: {
            badge: "Join 5,000+ new entrepreneurs this month",
            title1: "Launch Your ",
            title2: "Store",
            title3: ", ",
            title4: "No Code",
            title5: " Required",
            subtitle: "The simplest way to start your online business. Choose a template, drag your products in, and start taking orders in under 10 minutes.",
            ctaPrimary: "Build My Store Now",
            ctaSecondary: "See how it works",
            footer: "Free to start • No technical skills needed • 24/7 Expert Support"
        },
        features: {
            badge: "Simple",
            title: "Start Selling in 3 ",
            titleAccent: "Simple",
            titleEnd: " Steps",
            subtitle: "We've removed all the technical hurdles so you can focus on what you do best: creating and selling amazing products.",
            step1Title: "Pick a Template",
            step1Desc: "Start with a professionally designed store layout. High-converting and mobile-ready from day one.",
            step1Link: "Browse designs",
            step2Title: "Drag & Drop",
            step2Desc: "Add your logos, photos, and descriptions. No complex menus or settings to learn—just point and click.",
            step2Link: "Watch how it works",
            step3Title: "Go Live",
            step3Desc: "Connect your payment method and hit publish. You're ready to take orders globally in minutes.",
            step3Link: "Setup guide"
        },
        logocloud: {
            text: "Empowering ",
            accent: "Modern",
            end: " Entrepreneurs"
        },
        pricing: {
            badge: "Simple ",
            badgeAccent: "Pricing",
            title: "Plans for ",
            titleAccent: "Every",
            titleEnd: " Stage",
            subtitle: "Start for free and scale when you need it. No hidden costs.",
            comingSoon: "Pricing Section Coming Soon",
            integrated: "Integrated with Stripe Connect for seamless payments."
        },
        faq: {
            title: "Frequently Asked ",
            titleAccent: "Questions",
            subtitle: "Everything you need to know about ShopFlow.",
            q1: "Do I need coding skills?",
            a1: "No, our visual interface and AI handle all technical aspects for you. You focus on the store, we focus on the code.",
            q2: "Can I use my own domain?",
            a2: "Yes, on Pro plans you can connect custom domains like .com, .app, or any other TLD you prefer."
        },
        footer: {
            title: "Turn your ",
            titleAccent: "Idea",
            titleEnd: " into a business today",
            subtitle: "No risk, no hidden fees. Just a world-class platform to help you succeed as an entrepreneur.",
            cta: "Get Started for Free",
            howItWorks: "How it works",
            solution: "Solution",
            sellOnline: "Sell Online",
            templates: "Store Templates",
            marketing: "Marketing Tools",
            support: "Support",
            helpCenter: "Help Center",
            community: "Community",
            contact: "Contact Us",
            legal: "Legal",
            privacy: "Privacy",
            terms: "Terms",
            fees: "Fees",
            resources: "Resources",
            blog: "Blog",
            course: "Free Course",
            podcast: "Podcast",
            copyright: "Empowering the next generation of online sellers."
        },
        dashboard: {
            search: "Search products, orders...",
            newProduct: "New Product",
            groups: {
                main: "MAIN",
                shop: "SHOP"
            },
            menu: {
                dashboard: "Dashboard",
                products: "Products",
                orders: "Orders",
                customers: "Customers",
                analytics: "Analytics",
                themes: "Themes",
                marketing: "Marketing",
                settings: "Settings"
            },
            home: {
                title: "Dashboard",
                subtitle: "Overview of your store",
                stats: {
                    revenue: "Total Revenue",
                    orders: "Active Orders",
                    customers: "New Customers",
                    conversion: "Conversion Rate",
                    vsLastMonth: "vs. last month"
                },
                sales: {
                    title: "Sales Performance",
                    subtitle: "Net sales throughout the week",
                    today: "Today",
                    week: "Week",
                    month: "Month"
                },
                ai: {
                    title: "AI Insight of the Day",
                    button: "See suggested strategy"
                },
                orders: {
                    title: "Recent Orders",
                    viewAll: "View All",
                    id: "Order ID",
                    customer: "Customer",
                    product: "Product",
                    total: "Total",
                    status: "Status",
                    completed: "Completed",
                    pending: "Pending",
                    shipped: "Shipped"
                }
            },
            products: {
                title: "Product Catalog",
                subtitle: "Manage inventory and enhance your products with AI",
                add: "Add Product",
                filter: "Filter by name...",
                categories: "Categories",
                table: {
                    product: "Product",
                    status: "Status",
                    price: "Price",
                    stock: "Stock",
                    actions: "Actions"
                },
                status: {
                    active: "Active",
                    outOfStock: "Out of Stock",
                    draft: "Draft"
                },
                pagination: {
                    showing: "Showing",
                    of: "of",
                    products: "products",
                    previous: "Previous",
                    next: "Next"
                },
                actions: {
                    title: "Actions",
                    edit: "Edit",
                    improveIA: "Improve with AI",
                    delete: "Delete"
                }
            },
            ordersPage: {
                title: "Order Management",
                subtitle: "Track sales and manage customer deliveries",
                search: "Filter by customer or ID...",
                export: "Export CSV",
                table: {
                    id: "Order ID",
                    customer: "Customer",
                    date: "Date",
                    total: "Total",
                    status: "Status",
                    actions: "Actions"
                }
            },
            themes: {
                title: "Themes",
                subtitle: "Manage your store designs and published themes",
                activeTheme: "Live Theme",
                themeLibrary: "Theme Library",
                addTheme: "Add Theme",
                customize: "Customize",
                actions: "Actions",
                rename: "Rename",
                duplicate: "Duplicate",
                editCode: "Edit Code",
                remove: "Remove",
                publish: "Publish",
                lastUpdated: "Last updated",
                status: {
                    live: "Live",
                    draft: "Draft"
                }
            }
        }
    },
    es: {
        nav: {
            login: "Iniciar sesión",
            startSelling: "Vender gratis",
            howItWorks: "Cómo funciona",
            templates: "Plantillas",
            pricing: "Precios",
            showcase: "Galería"
        },
        hero: {
            badge: "Únete a más de 5,000 emprendedores este mes",
            title1: "Lanza tu ",
            title2: "Tienda",
            title3: ", ",
            title4: "Sin Código",
            title5: "",
            subtitle: "La forma más sencilla de comenzar tu negocio online. Elige una plantilla, añade tus productos y empieza a recibir pedidos en menos de 10 minutos.",
            ctaPrimary: "Crear mi tienda ahora",
            ctaSecondary: "Ver cómo funciona",
            footer: "Gratis para empezar • Sin conocimientos técnicos • Soporte 24/7"
        },
        features: {
            badge: "Simple",
            title: "Vende en 3 pasos ",
            titleAccent: "sencillos",
            titleEnd: "",
            subtitle: "Hemos eliminado todos los obstáculos técnicos para que puedas concentrarte en lo que mejor haces: crear y vender productos increíbles.",
            step1Title: "Elige una plantilla",
            step1Desc: "Comienza con un diseño profesional. Optimizado para conversión y listo para móviles desde el primer día.",
            step1Link: "Ver diseños",
            step2Title: "Arrastra y suelta",
            step2Desc: "Añade logos, fotos y descripciones. Sin menús complejos: solo señalar y hacer clic.",
            step2Link: "Ver demostración",
            step3Title: "Publica tu tienda",
            step3Desc: "Conecta tu método de pago y publica. Estás listo para recibir pedidos globalmente en minutos.",
            step3Link: "Guía de configuración"
        },
        logocloud: {
            text: "Impulsando emprendedores ",
            accent: "modernos",
            end: ""
        },
        pricing: {
            badge: "Precios ",
            badgeAccent: "simples",
            title: "Planes para ",
            titleAccent: "cada",
            titleEnd: " etapa",
            subtitle: "Comienza gratis y escala cuando lo necesites. Sin costos ocultos.",
            comingSoon: "Sección de precios próximamente",
            integrated: "Integrado con Stripe Connect para pagos sin interrupciones."
        },
        faq: {
            title: "Preguntas ",
            titleAccent: "Frecuentes",
            subtitle: "Todo lo que necesitas saber sobre ShopFlow.",
            q1: "¿Necesito saber programar?",
            a1: "No, nuestra interfaz visual y nuestra IA se encargan de todo lo técnico. Tú te enfocas en la tienda, nosotros en el código.",
            q2: "¿Puedo usar mi propio dominio?",
            a2: "Sí, en los planes Pro puedes conectar dominios personalizados como .com, .app o el que prefieras."
        },
        footer: {
            title: "Convierte tu ",
            titleAccent: "Idea",
            titleEnd: " en un negocio hoy",
            subtitle: "Sin riesgos ni cargos ocultos. Una plataforma de clase mundial para ayudarte a tener éxito.",
            cta: "Empezar gratis",
            howItWorks: "Cómo funciona",
            solution: "Solución",
            sellOnline: "Vender online",
            templates: "Plantillas",
            marketing: "Herramientas de marketing",
            support: "Soporte",
            helpCenter: "Centro de ayuda",
            community: "Comunidad",
            contact: "Contacto",
            legal: "Legal",
            privacy: "Privacidad",
            terms: "Términos",
            fees: "Tarifas",
            resources: "Recursos",
            blog: "Blog",
            course: "Curso gratuito",
            podcast: "Podcast",
            copyright: "Impulsando a la próxima generación de vendedores online."
        },
        dashboard: {
            search: "Buscar productos, pedidos...",
            newProduct: "Nuevo Producto",
            groups: {
                main: "PRINCIPAL",
                shop: "TIENDA"
            },
            menu: {
                dashboard: "Panel de Control",
                products: "Productos",
                orders: "Pedidos",
                customers: "Clientes",
                analytics: "Analíticas",
                themes: "Temas",
                marketing: "Marketing",
                settings: "Configuración"
            },
            home: {
                title: "Panel de Control",
                subtitle: "Resumen de tu tienda",
                stats: {
                    revenue: "Ingresos Totales",
                    orders: "Pedidos Activos",
                    customers: "Nuevos Clientes",
                    conversion: "Tasa de Conversión",
                    vsLastMonth: "vs. mes anterior"
                },
                sales: {
                    title: "Rendimiento de Ventas",
                    subtitle: "Ventas netas a lo largo de la semana",
                    today: "Hoy",
                    week: "Semana",
                    month: "Mes"
                },
                ai: {
                    title: "IA Insight del Día",
                    button: "Ver estrategia sugerida"
                },
                orders: {
                    title: "Pedidos Recientes",
                    viewAll: "Ver todos",
                    id: "ID Pedido",
                    customer: "Cliente",
                    product: "Producto",
                    total: "Total",
                    status: "Estado",
                    completed: "Completado",
                    pending: "Pendiente",
                    shipped: "Enviado"
                }
            },
            products: {
                title: "Catálogo de Productos",
                subtitle: "Gestiona el inventario y mejora tus productos con IA",
                add: "Añadir Producto",
                filter: "Filtrar por nombre...",
                categories: "Categorías",
                table: {
                    product: "Producto",
                    status: "Estado",
                    price: "Precio",
                    stock: "Stock",
                    actions: "Acciones"
                },
                status: {
                    active: "Activo",
                    outOfStock: "Agotado",
                    draft: "Borrador"
                },
                pagination: {
                    showing: "Mostrando",
                    of: "de",
                    products: "productos",
                    previous: "Anterior",
                    next: "Siguiente"
                },
                actions: {
                    title: "Acciones",
                    edit: "Editar",
                    improveIA: "Mejorar con IA",
                    delete: "Eliminar"
                }
            },
            ordersPage: {
                title: "Gestión de Pedidos",
                subtitle: "Seguimiento de ventas y envíos a clientes",
                search: "Filtrar por cliente o ID...",
                export: "Exportar CSV",
                table: {
                    id: "ID Pedido",
                    customer: "Cliente",
                    date: "Fecha",
                    total: "Total",
                    status: "Estado",
                    actions: "Acciones"
                }
            },
            themes: {
                title: "Temas",
                subtitle: "Gestiona los diseños de tu tienda y temas publicados",
                activeTheme: "Tema Activo",
                themeLibrary: "Biblioteca de Temas",
                addTheme: "Añadir Tema",
                customize: "Personalizar",
                actions: "Acciones",
                rename: "Renombrar",
                duplicate: "Duplicar",
                editCode: "Editar Código",
                remove: "Eliminar",
                publish: "Publicar",
                lastUpdated: "Última actualización",
                status: {
                    live: "Activo",
                    draft: "Borrador"
                }
            }
        }
    }
};
