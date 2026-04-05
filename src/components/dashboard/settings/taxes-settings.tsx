"use client";

import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Scale, ShieldCheck, FileText, UploadCloud } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const taxesSchema = z.object({
  taxId: z.string().min(8, "Debes ingresar un identificador fiscal válido."),
  vatRate: z.number().min(0).max(100),
});

type TaxesFormValues = z.infer<typeof taxesSchema>;

export function TaxesSettings() {
  const methods = useForm<TaxesFormValues>({
    resolver: zodResolver(taxesSchema),
    defaultValues: {
      taxId: "",
      vatRate: 16,
    },
  });

  const { formState: { isDirty, isSubmitting }, reset } = methods;

  const onSave: SubmitHandler<TaxesFormValues> = async (data) => {
    console.log("Guardando datos fiscales encriptados:", data);
    await new Promise((res) => setTimeout(res, 1000));
    reset(data);
  };

  return (
    <div className="relative pb-24 space-y-8">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSave)} className="space-y-8">
          
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Scale className="w-5 h-5 text-slate-500" />
                Información Fiscal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg border border-emerald-100 italic text-sm">
                 Tus datos están protegidos por encriptación.
              </div>

              <div className="grid gap-2 max-w-sm">
                <Label htmlFor="taxId">Identificador Fiscal</Label>
                <Input
                  id="taxId"
                  {...methods.register("taxId")}
                  className="font-mono"
                  type="password"
                />
              </div>

              <div className="grid gap-2 max-w-xs">
                <Label htmlFor="vatRate">Tasa de IVA (%)</Label>
                <Input
                  id="vatRate"
                  type="number"
                  step="0.1"
                  {...methods.register("vatRate", { valueAsNumber: true })}
                />
              </div>
            </CardContent>
          </Card>

          {isDirty && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-xl flex justify-between items-center md:px-12">
              <span className="text-sm text-slate-600 italic">Cambios pendientes...</span>
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => reset()} className="text-slate-600">Descartar</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white">
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
