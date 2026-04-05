"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Ingresa un correo válido."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

import { saveProfileInfo } from "@/app/actions/profile";

export function ProfileForm() {
  const { user, updateUser } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    // Call server action to update DB
    const res = await saveProfileInfo({ name: data.name });
    
    if (res.success) {
      updateUser({ name: data.name });
      setIsSaved(true);
      toast.success("¡Perfil actualizado!", {
        description: res.message || "Tus cambios se han reflejado.",
      });
      setTimeout(() => setIsSaved(false), 3000);
    } else {
      toast.error(res.error || "Ocurrió un error");
    }
    
    setIsLoading(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    toast.info("Subiendo imagen...");
    
    // Aquí idealmente subiríamos el objeto file a un Cloud Storage (Supabase Storage) y luego obtendríamos la URL real
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const fakeUrl = URL.createObjectURL(file);
    
    // En produccion se enviaria la url final al back:
    const res = await saveProfileInfo({ name: user.name, avatarUrl: fakeUrl });

    if (res.success) {
        updateUser({ avatarUrl: fakeUrl });
        toast.success("Foto de perfil actualizada.");
    } else {
        toast.error("Error al guardar foto en base de datos.");
    }

    setIsLoading(false);
  };

  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="border-b border-slate-50 bg-slate-50/50">
        <CardTitle className="text-xl font-black text-slate-900">Información General</CardTitle>
        <CardDescription>Actualiza tu foto de perfil e información básica.</CardDescription>
      </CardHeader>
      <CardContent className="pt-8 space-y-8">
        <div className="flex flex-col items-center sm:flex-row gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 ring-4 ring-white shadow-xl">
              <AvatarImage src={user.avatarUrl} />
              <AvatarFallback className="text-2xl font-black bg-primary/10 text-primary">
                {user.name?.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <label 
              htmlFor="avatar-upload" 
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-6 h-6" />
            </label>
            <input 
              id="avatar-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleAvatarUpload}
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-slate-900">Tu Foto de Perfil</h4>
            <p className="text-sm text-slate-500">JPG, GIF o PNG. Máx 2MB.</p>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-8"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                Cambiar
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => updateUser({ avatarUrl: "" })}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-semibold">Nombre Completo</Label>
            <Input 
              id="name" 
              {...form.register("name")} 
              className={`bg-slate-50/50 border-slate-200 focus:bg-white transition-all ${form.formState.errors.name ? "border-red-500" : ""}`}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500 font-medium">{form.formState.errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-semibold">Correo Electrónico</Label>
            <div className="relative">
              <Input 
                id="email" 
                disabled 
                value={user.email}
                className="bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed pr-24"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Verificado
              </span>
            </div>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-slate-50 flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading || !form.formState.isDirty}
              className={`min-w-[140px] rounded-xl font-black transition-all ${
                isSaved ? "bg-green-600 hover:bg-green-700" : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : isSaved ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Guardado
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
