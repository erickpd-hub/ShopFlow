"use client";

import { useState } from "react";
import { Shield, Key, Smartphone, ChevronRight, Lock, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function SecuritySettings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChangingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordOpen(false);
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-50 bg-slate-50/50">
        <CardTitle className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Seguridad
        </CardTitle>
        <CardDescription>Protege tu cuenta con contraseñas seguras y verificación doble.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Password Section */}
        <div className="flex items-center justify-between group cursor-pointer" onClick={() => setPasswordOpen(true)}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Contraseña</p>
              <p className="text-xs text-slate-500">Último cambio hace 3 meses</p>
            </div>
          </div>
          <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-xl font-bold flex items-center gap-2">
                Cambiar <ChevronRight className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-2xl">
              <form onSubmit={handlePasswordChange}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black">Cambiar Contraseña</DialogTitle>
                  <DialogDescription>
                    Ingresa tu contraseña actual y la nueva para actualizarla.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current">Contraseña Actual</Label>
                    <Input id="current" type="password" placeholder="••••••••" required className="rounded-xl bg-slate-50 border-slate-200" />
                  </div>
                  <Separator className="my-2" />
                  <div className="grid gap-2">
                    <Label htmlFor="new">Nueva Contraseña</Label>
                    <Input id="new" type="password" placeholder="••••••••" required className="rounded-xl bg-slate-50 border-slate-200" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm">Confirmar Nueva Contraseña</Label>
                    <Input id="confirm" type="password" placeholder="••••••••" required className="rounded-xl bg-slate-50 border-slate-200" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isChangingPassword} className="bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl w-full h-12">
                    {isChangingPassword ? (
                       <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Actualizando...
                       </>
                    ) : "Actualizar Contraseña"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Separator className="bg-slate-50" />

        {/* 2FA Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${twoFactorEnabled ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-600"}`}>
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Autenticación de Dos Pasos (2FA)</p>
              <p className="text-xs text-slate-500">Añade una capa extra de seguridad a tu cuenta.</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="2fa" 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <Separator className="bg-slate-50" />

        <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex gap-3 items-start">
           <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
           <div className="space-y-1">
             <p className="text-sm font-bold text-amber-900">Cierre de Sesión Automático</p>
             <p className="text-xs text-amber-800/80 leading-relaxed">
               Tu sesión se cerrará automáticamente después de 24 horas de inactividad por motivos de seguridad.
             </p>
           </div>
        </div>
      </CardContent>
    </Card>
  );
}
