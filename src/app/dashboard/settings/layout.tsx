import { SettingsLayout } from "@/components/dashboard/settings/settings-layout";

export default function SettingsBaseLayout({ children }: { children: React.ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}
