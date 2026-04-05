"use client";

import { Info, ExternalLink, Globe2, ShieldCheck } from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Optional: you can extract a tooltip component or use the Shadcn one if installed.
// We mock it for immediate UI visualization using group-hover.
function SimpleTooltip({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute z-10 w-48 p-2 mt-2 -left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-center">
        {text}
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -mt-1 w-2 h-2 bg-slate-800 rotate-45 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
}

export function DomainSettings() {
  return (
    <div className="space-y-8">
      {/* Subdominio SaaS */}
      <Card className="border-slate-200 shadow-sm bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Globe2 className="w-5 h-5 text-slate-500" />
                Subdominio Principal
              </CardTitle>
              <CardDescription className="text-slate-500 mt-1">
                Tu enlace predeterminado que te proporcionamos al registro.
              </CardDescription>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Operativo
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
             <div className="grid w-full gap-2 relative">
                <Label className="text-slate-700 font-medium">Nombre de Subdominio</Label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-slate-400 font-medium select-none text-sm">https://</span>
                  <Input 
                    value="mitienda" 
                    readOnly 
                    className="pl-[64px] rounded-r-none font-medium text-slate-900 bg-slate-50 focus-visible:ring-0 cursor-not-allowed border-r-0"
                  />
                  <div className="border border-l-0 border-slate-200 bg-slate-100 text-slate-600 px-4 py-2 text-sm font-medium rounded-r-md select-none shrink-0 h-10 flex items-center">
                    .misaas.com
                  </div>
                </div>
             </div>
             <Button variant="outline" className="text-slate-700 bg-white">
                Editar
             </Button>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            La creación de un dominio personalizado no anulará tu subdominio de prueba.
          </p>
        </CardContent>
      </Card>

      {/* Dominio Personalizado */}
      <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle className="text-slate-900 text-lg">Dominio Personalizado (Custom Domain)</CardTitle>
          <CardDescription className="text-slate-500">
            Conecta tu propio dominio (ej. mitienda.com) para darle mayor profesionalismo a tu marca.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid gap-2">
            <Label className="text-slate-700 font-medium font-sans">
              Introduce el Dominio
            </Label>
            <div className="flex max-w-lg gap-2">
               <Input placeholder="www.mitienda.com" className="bg-white" />
               <Button className="bg-slate-900 text-white hover:bg-slate-800 shrink-0">
                  Vincular Dominio
               </Button>
            </div>
          </div>

          <Separator className="bg-slate-100" />

          {/* Configuración DNS */}
          <div className="space-y-4">
             <h4 className="font-semibold text-slate-900 text-sm">
                Configuración DNS Requerida
             </h4>
             <p className="text-sm text-slate-500 max-w-2xl">
                Para que el dominio apunte a nuestra plataforma, deberás agregar los siguientes registros en tu proveedor de dominio (GoDaddy, Namecheap, etc).
             </p>

             <div className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden text-sm mt-4 shadow-inner">
                <div className="grid grid-cols-12 gap-4 p-3 bg-slate-100 font-medium text-slate-600 border-b border-slate-200">
                   <div className="col-span-2 flex items-center gap-1">
                      Tipo
                      <SimpleTooltip text="El tipo de registro DNS requerido (A para IP, CNAME para Alias).">
                         <Info className="w-4 h-4 text-slate-400 cursor-help" />
                      </SimpleTooltip>
                   </div>
                   <div className="col-span-3">Nombre (Host)</div>
                   <div className="col-span-1 flex items-center gap-1">
                      Valor
                      <SimpleTooltip text="Apunta hacia nuestros servidores (A Record para la raíz, CNAME para subdominios).">
                         <Info className="w-4 h-4 text-slate-400 cursor-help" />
                      </SimpleTooltip>
                   </div>
                   <div className="col-span-5 text-right font-mono text-slate-800 opacity-0 md:opacity-100 select-none">
                     (Ejemplo de proveedor)
                   </div>
                </div>

                <div className="grid grid-cols-12 gap-4 p-4 items-center text-slate-700 border-b border-slate-100 last:border-0 hover:bg-white transition-colors group">
                   <div className="col-span-2 font-mono text-sm tracking-widest font-semibold flex flex-col">
                      A
                      <span className="text-[10px] text-slate-400 font-sans font-normal">(Registro A)</span>
                   </div>
                   <div className="col-span-3 font-mono">@</div>
                   <div className="col-span-7 font-mono text-slate-900 select-all tracking-wider md:text-left text-right">
                      76.76.21.21
                   </div>
                </div>

                <div className="grid grid-cols-12 gap-4 p-4 items-center text-slate-700 border-b border-slate-100 last:border-0 hover:bg-white transition-colors">
                   <div className="col-span-2 font-mono text-sm tracking-widest font-semibold flex flex-col">
                      CNAME
                      <span className="text-[10px] text-slate-400 font-sans font-normal">(Alias)</span>
                   </div>
                   <div className="col-span-3 font-mono">www</div>
                   <div className="col-span-7 font-mono text-slate-900 select-all tracking-wider md:text-left text-right">
                      cname.misaas.com
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
                 <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 rounded-full font-medium shadow-none">
                    Pendiente Verificación
                 </Badge>
                 <span>La propagación del DNS puede tardar hasta 48 horas.</span>
                 <Button variant="link" className="text-indigo-600 p-0 h-auto font-medium shadow-none flex items-center">
                    Aprende más <ExternalLink className="w-3 h-3 ml-1" />
                 </Button>
             </div>
          </div>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t border-slate-100 py-3 flex justify-between">
           <p className="text-xs text-slate-500">Si necesitas ayuda extra, contáctanos.</p>
           <Button variant="outline" size="sm" className="h-8">
              Verificar Estado
           </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
