import { ProfileForm } from "@/components/dashboard/profile/profile-form";
import { SecuritySettings } from "@/components/dashboard/profile/security-settings";
import { BillingCard } from "@/components/dashboard/profile/billing-card";
import { SessionsList } from "@/components/dashboard/profile/sessions-list";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mi Perfil</h1>
        <p className="text-slate-500 mt-2">Gestiona tu información personal, seguridad y suscripción.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <ProfileForm />
          <SecuritySettings />
          <SessionsList />
        </div>
        
        <div className="space-y-8">
          <BillingCard />
        </div>
      </div>
    </div>
  );
}
