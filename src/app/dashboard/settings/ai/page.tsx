import { AISettings } from "@/components/dashboard/settings/ai-settings";

export default function AIPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Preferencias de IA</h3>
        <p className="text-slate-500 text-sm">Ajusta el tono de voz de los asitentes para coincidir con tu marca.</p>
      </div>
      <AISettings />
    </div>
  );
}
