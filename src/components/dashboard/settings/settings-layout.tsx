"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Settings,
  Globe,
  CreditCard,
  Truck,
  Scale,
  Bot
} from "lucide-react";

export interface SettingsLayoutProps {
  children: React.ReactNode;
}

const sidebarNavItems = [
  {
    title: "General",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Nombre de tienda, logo, favicon y descripción SEO.",
  },
  {
    title: "Dominio",
    href: "/dashboard/settings/domain",
    icon: Globe,
    description: "Gestión del subdominio y configuración de dominio personalizado.",
  },
  {
    title: "Pagos",
    href: "/dashboard/settings/payments",
    icon: CreditCard,
    description: "Conexión con Stripe/PayPal y configuración de moneda.",
  },
  {
    title: "Envíos",
    href: "/dashboard/settings/shipping",
    icon: Truck,
    description: "Configuración de zonas de entrega y tarifas.",
  },
  {
    title: "Impuestos & Legal",
    href: "/dashboard/settings/taxes",
    icon: Scale,
    description: "Tax ID (RFC), tasas de IVA y documentos legales.",
  },
  {
    title: "Preferencias de IA",
    href: "/dashboard/settings/ai",
    icon: Bot,
    description: "Configuración del \"Tono de Voz\" e integraciones AI.",
  },
];

export function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col space-y-8 md:flex-row md:space-x-12 md:space-y-0 p-10 bg-gray-50 min-h-screen">
      <aside className="w-full md:w-1/4 lg:w-1/5">
        <div className="mb-8">
          <h2 className="text-2xl flex items-center gap-2 font-bold tracking-tight text-slate-900">
            Ajustes
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Administra la configuración fundamental de tu tienda.
          </p>
        </div>
        <nav className="flex space-x-2 md:flex-col md:space-x-0 md:space-y-1 overflow-x-auto pb-4 md:pb-0">
          {sidebarNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out text-sm font-medium shrink-0",
                  isActive
                    ? "bg-slate-900 text-white shadow-md relative"
                    : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-slate-200" : "text-slate-500")} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 w-full max-w-4xl mx-auto">
        <main className="space-y-8">{children}</main>
      </div>
    </div>
  );
}
