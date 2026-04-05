"use client";

import { CreditCard, Zap, ExternalLink, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BillingCard() {
  return (
    <Card className="border-slate-200 shadow-xl bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4">
        <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
          Activo
        </Badge>
      </div>
      <CardHeader className="bg-gradient-to-br from-slate-900 to-slate-800 text-white pb-8">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
          <Zap className="w-6 h-6 text-primary filled" />
        </div>
        <CardTitle className="text-2xl font-black">Plan Pro</CardTitle>
        <CardDescription className="text-slate-400">Perfecto para negocios que escalan rápidamente.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-slate-900">$29</span>
          <span className="text-slate-500 font-medium">/mes</span>
        </div>
        
        <div className="space-y-3 pt-4">
          {[
            "Productos ilimitados",
            "Soporte prioritario 24/7",
            "Análisis avanzados con IA",
            "Dominio personalizado .com"
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t border-slate-50 pt-6">
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl h-12 shadow-lg shadow-black/10">
          Mejorar Plan
        </Button>
        <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-slate-200 flex items-center gap-2 group hover:bg-slate-50">
          <CreditCard className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
          <span>Gestionar Facturación</span>
          <ExternalLink className="w-3 h-3 text-slate-400 ml-auto" />
        </Button>
      </CardFooter>
      <div className="p-4 bg-slate-50/50 border-t border-slate-50">
        <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
          Siguiente facturación el 12 de Abril, 2026 via Stripe.
        </p>
      </div>
    </Card>
  );
}
