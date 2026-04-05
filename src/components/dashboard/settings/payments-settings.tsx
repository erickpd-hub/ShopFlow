"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, DollarSign, WalletCards } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const paymentsSchema = z.object({
  currency: z.string(),
});

type PaymentsFormValues = z.infer<typeof paymentsSchema>;

export function PaymentsSettings() {
  const methods = useForm<PaymentsFormValues>({
    resolver: zodResolver(paymentsSchema),
    defaultValues: {
      currency: "USD",
    },
  });

  const { handleSubmit, formState: { isDirty, isSubmitting } } = methods;

  const onSubmit = async (data: PaymentsFormValues) => {
    console.log("Saving payment settings:", data);
    await new Promise((res) => setTimeout(res, 1000));
    methods.reset(data);
  };

  return (
    <div className="space-y-8 pb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Pasarelas de Pago */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <WalletCards className="w-5 h-5 text-slate-500" />
                Pasarelas de Pago
              </CardTitle>
              <CardDescription className="text-slate-500">
                Conecta tus cuentas para procesar pagos de forma segura en tu tienda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#635BFF]/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#635BFF]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                      Stripe 
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 shadow-none border-0">Conectado</Badge>
                    </h4>
                    <p className="text-sm text-slate-500">Pagos con tarjeta de crédito y débito.</p>
                  </div>
                </div>
                <Button variant="outline" type="button" className="mt-4 md:mt-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                  Desconectar
                </Button>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border border-slate-200 rounded-lg bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00457C]/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-[#00457C] text-lg">P</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                      PayPal 
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 shadow-none border-0">No conectado</Badge>
                    </h4>
                    <p className="text-sm text-slate-500">Pagos a través de cuenta PayPal.</p>
                  </div>
                </div>
                <Button type="button" className="mt-4 md:mt-0 bg-[#00457C] text-white hover:bg-[#003865]">
                  Conectar PayPal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferencias de Moneda */}
          <Card className="border-slate-200 shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                </div>
                Moneda Oficial
              </CardTitle>
              <CardDescription className="text-slate-500">
                La divisa principal en la que se venderán tus productos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <label className="text-sm font-medium text-slate-800 block mb-2">Divisa de la tienda</label>
                <select 
                  {...methods.register("currency")}
                  className="w-full flex h-10 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="USD">USD - Dólar Estadounidense ($)</option>
                  <option value="EUR">EUR - Euro (€)</option>
                  <option value="MXN">MXN - Peso Mexicano ($)</option>
                </select>
                <p className="text-sm text-slate-500 mt-2">
                  Cambiar la divisa afectará cómo se visualizan los precios actuales.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sticky Footer */}
          {isDirty && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-xl transform transition-transform animate-in slide-in-from-bottom flex justify-between items-center md:px-12">
              <div className="text-slate-600 text-sm flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
                <span>Configuración de pagos modificada.</span>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => methods.reset()} className="text-slate-600">Descartar</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white">
                  {isSubmitting ? "Procesando..." : "Guardar Cambios"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
