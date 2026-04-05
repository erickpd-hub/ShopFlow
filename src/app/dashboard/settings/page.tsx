import { GeneralSettingsForm } from "@/components/dashboard/settings/general-settings-form";
import { getGeneralSettings } from "@/app/actions/settings";

export default async function SettingsGeneralPage() {
  const { data } = await getGeneralSettings();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-6">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">General</h3>
        <p className="text-slate-500 text-sm">Administra la información básica de tu tienda y cómo apareces en la web.</p>
      </div>
      <GeneralSettingsForm initialData={data || undefined} />
    </div>
  );
}
