import { DomainSettings } from "@/components/dashboard/settings/domain-settings";

export default function DomainPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Dominio</h3>
        <p className="text-slate-500 text-sm">Gestiona cómo tus clientes acceden a tu tienda online.</p>
      </div>
      <DomainSettings />
    </div>
  );
}
