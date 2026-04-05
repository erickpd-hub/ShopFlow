"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CopyIcon, CheckCircle2 } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import { saveGeneralSettings } from "@/app/actions/settings";

// Example Zod Schema
const generalSettingsSchema = z.object({
  storeName: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  description: z.string().max(160, "Máximo 160 caracteres para SEO.").optional(),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;

export function GeneralSettingsForm({ initialData }: { initialData?: Partial<GeneralSettingsValues> }) {
  const methods = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      storeName: initialData?.storeName || "Mi Tienda Increíble",
      description: initialData?.description || "Tienda online de productos asombrosos. Compra ahora.",
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
    watch,
  } = methods;

  const storeNameWatch = watch("storeName");
  const descriptionWatch = watch("description");

  const onSubmit = async (data: GeneralSettingsValues) => {
    try {
      const result = await saveGeneralSettings({ 
        storeName: data.storeName, 
        description: data.description 
      });

      if (result.success) {
        toast.success(result.message || "Ajustes guardados correctamente");
        methods.reset(data); // reset to hide sticky footer and set new default values
      } else {
        toast.error(result.error || "Ocurrió un error al guardar los ajustes");
      }
    } catch (error) {
      toast.error("Error al procesar la solicitud");
    }
  };

  return (
    <div className="relative pb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Identidad de la Tienda */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg">Identidad de la Tienda</CardTitle>
              <CardDescription className="text-slate-500">
                Información pública sobre tu negocio que aparece en tu escaparate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="storeName" className="font-medium text-slate-800">
                  Nombre de la tienda
                </Label>
                <Input
                  id="storeName"
                  {...methods.register("storeName")}
                  className="max-w-md bg-gray-50/50 border-slate-300 placeholder:text-slate-400 focus-visible:ring-slate-900"
                  placeholder="Ej. Acme Corp"
                />
                {methods.formState.errors.storeName && (
                  <p className="text-sm text-red-500 font-medium">
                    {methods.formState.errors.storeName.message}
                  </p>
                )}
              </div>

              <Separator className="bg-slate-100" />

              <div className="grid gap-2">
                <Label htmlFor="description" className="font-medium text-slate-800">
                  Descripción Corta (SEO)
                </Label>
                <Input
                  id="description"
                  {...methods.register("description")}
                  className="max-w-xl bg-gray-50/50 border-slate-300 placeholder:text-slate-400 focus-visible:ring-slate-900"
                  placeholder="Una breve descripción para los motores de búsqueda."
                />
                <p className="text-xs text-slate-500">
                  {descriptionWatch?.length || 0} / 160 caracteres jugarán a favor de tu indexación en Google.
                </p>
                {methods.formState.errors.description && (
                  <p className="text-sm text-red-500 font-medium">
                    {methods.formState.errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO Preview Box */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg">Previsualización en Buscadores</CardTitle>
              <CardDescription className="text-slate-500">
                Así es como se verá el inicio de tu tienda en Google.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 font-sans shadow-inner">
                <div className="flex flex-col space-y-1">
                  <span className="text-xs text-slate-600 flex items-center gap-1 font-medium">
                    <img src="https://www.google.com/favicon.ico" alt="G" className="w-4 h-4 rounded-full"/>
                    https://{storeNameWatch?.toLowerCase().replace(/\s+/g, "") || "mitienda"}.miSaaS.com
                  </span>
                  <span className="text-xl text-[#1a0dab] font-medium hover:underline cursor-pointer truncate">
                    {storeNameWatch || "Mi Tienda Increíble"} | Compra Online Segura
                  </span>
                  <p className="text-sm text-[#4d5156] leading-snug line-clamp-2">
                    {descriptionWatch || "La mejor selección de productos con envíos al mejor precio. Compra de forma segura, rápida y sin complicaciones."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sticky Footer solo visible si hay cambios (isDirty) */}
          {isDirty && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-xl transform transition-transform animate-in slide-in-from-bottom flex justify-between items-center md:px-12">
              <div className="text-slate-600 text-sm flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
                <span>Tienes cambios sin guardar.</span>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => methods.reset()}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Descartar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-slate-900 text-white hover:bg-slate-800"
                >
                  {isSubmitting ? "Guardando..." : "Guardar Ajustes"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
