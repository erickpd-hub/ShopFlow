import { PaymentsSettings } from "@/components/dashboard/settings/payments-settings";

export default function PaymentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Pagos</h3>
        <p className="text-slate-500 text-sm">Configura cómo tus clientes pagan y en qué moneda vendes.</p>
      </div>
      <PaymentsSettings />
    </div>
  );
}
