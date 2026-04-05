import { ShippingSettings } from "@/components/dashboard/settings/shipping-settings";

export default function ShippingPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Envíos</h3>
        <p className="text-slate-500 text-sm">Gestiona zonas, tarifas estándar, envíos exprés o gratis.</p>
      </div>
      <ShippingSettings />
    </div>
  );
}
