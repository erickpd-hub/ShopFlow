import { TaxesSettings } from "@/components/dashboard/settings/taxes-settings";

export default function TaxesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Impuestos & Legal</h3>
        <p className="text-slate-500 text-sm">Gestiona tus tasas impositivas y documentos formales cifrados.</p>
      </div>
      <TaxesSettings />
    </div>
  );
}
