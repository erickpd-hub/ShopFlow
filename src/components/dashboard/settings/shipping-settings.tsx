"use client";

import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Truck, MapPin, Package, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const shippingSchema = z.object({
  freeShippingEnabled: z.boolean(),
  freeShippingThreshold: z.number().min(0),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export function ShippingSettings() {
  const methods = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      freeShippingEnabled: true,
      freeShippingThreshold: 50,
    },
  });

  const { formState: { isDirty, isSubmitting }, watch, setValue, reset } = methods;
  const freeShippingEnabled = watch("freeShippingEnabled");

  const onSave: SubmitHandler<ShippingFormValues> = async (data) => {
    console.log("Saving shipping settings:", data);
    await new Promise((res) => setTimeout(res, 1000));
    reset(data);
  };

  return (
    <div className="space-y-8 pb-24">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSave)} className="space-y-8">
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Truck className="w-5 h-5 text-slate-500" />
                Reglas Globales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-indigo-100 rounded-lg bg-indigo-50/30">
                <Label className="text-base text-indigo-900 font-semibold">Envío Gratis</Label>
                <Switch 
                  checked={freeShippingEnabled} 
                  onCheckedChange={(checked) => setValue("freeShippingEnabled", checked, { shouldDirty: true })}
                />
              </div>
              
              <div className={`grid gap-2 max-w-sm ${freeShippingEnabled ? "opacity-100" : "opacity-40"}`}>
                <Label htmlFor="free-shipping-threshold">Monto mínimo</Label>
                <Input 
                  id="free-shipping-threshold" 
                  type="number" 
                  {...methods.register("freeShippingThreshold", { valueAsNumber: true })}
                />
              </div>
            </CardContent>
          </Card>

          {isDirty && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-xl flex justify-between items-center md:px-12">
              <span className="text-sm italic">Cambios pendientes...</span>
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => reset()} className="text-slate-600">Descartar</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white">
                  {isSubmitting ? "Sincronizando..." : "Guardar Ajustes"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
