"use client";

import { Bot, Sparkles, MessageSquare, PenTool, CheckCircle2 } from "lucide-react";
import { type SubmitHandler, useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Schema for AI tone selection
const aiSchema = z.object({
  tone: z.enum(["formal", "friendly", "sales"]),
});

type AIFormValues = z.infer<typeof aiSchema>;

const INSTRUCTIONS = [
  {
    id: "formal",
    title: "Formal / Profesional",
    description: "Tono serio y objetivo. Ideal para tiendas B2B o de lujo.",
    icon: PenTool,
  },
  {
    id: "friendly",
    title: "Amigable / Cercano",
    description: "Tono relajado con emojis. Ideal para moda o estilo de vida.",
    icon: MessageSquare,
  },
  {
    id: "sales",
    title: "Vendedor / Persuasivo",
    description: "Uso de urgencia y llamadas a la acción agresivas.",
    icon: Sparkles,
  }
];

export function AISettings() {
  const methods = useForm<AIFormValues>({
    resolver: zodResolver(aiSchema),
    defaultValues: {
      tone: "friendly",
    },
  });

  const { handleSubmit, formState: { isDirty, isSubmitting }, watch, setValue, reset } = methods;
  const selectedTone = watch("tone");

  const onSave: SubmitHandler<AIFormValues> = async (data) => {
    console.log("Applying AI tone:", data);
    await new Promise((res) => setTimeout(res, 1000));
    reset(data); // Clear isDirty
  };

  return (
    <div className="space-y-8 pb-24">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSave)} className="space-y-8">
          <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1"></div>
            <CardHeader>
              <CardTitle className="text-slate-900 text-lg flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-600" />
                Preferencias del Asistente IA
              </CardTitle>
              <CardDescription className="text-slate-500 mt-1">
                Configura la "personalidad" que utilizarán los generadores de la IA (Descripciones, SEO, Blogs).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {INSTRUCTIONS.map((tone) => {
                  const isSelected = selectedTone === tone.id;
                  const Icon = tone.icon;
                  return (
                    <div 
                      key={tone.id}
                      onClick={() => setValue("tone", tone.id as "formal" | "friendly" | "sales", { shouldDirty: true })}
                      className={`relative border-2 rounded-xl p-5 cursor-pointer transition-all ${
                        isSelected 
                          ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-3 -right-3 bg-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-white border-2 border-white shadow-sm">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      <Icon className={`w-8 h-8 mb-4 ${isSelected ? "text-indigo-600" : "text-slate-400"}`} />
                      <h4 className={`font-semibold mb-1 ${isSelected ? "text-indigo-900" : "text-slate-900"}`}>
                        {tone.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {tone.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Separator className="bg-slate-100" />

              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 text-sm text-slate-700 shadow-inner">
                <h5 className="font-semibold text-slate-900 flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Ejemplo de Respuesta IA generada:
                </h5>
                <div className="min-h-[3rem] italic text-slate-600">
                  {selectedTone === 'formal' && "El producto cuenta con una manufactura de precisión, ideal para entornos ejecutivos."}
                  {selectedTone === 'friendly' && "¡Hola! ✨ Este producto te va a encantar, es súper suave y perfecto para tu día a día ❤️"}
                  {selectedTone === 'sales' && "¿Vas a dejar pasar esta oportunidad? 🚨 ¡Compra ahora mismo! 🛒💨"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sticky Footer */}
          {isDirty && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-xl transform transition-transform animate-in slide-in-from-bottom flex justify-between items-center md:px-12">
              <div className="text-slate-600 text-sm flex items-center space-x-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-400"></span>
                <span>Has cambiado el tono de la IA.</span>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" type="button" onClick={() => reset()} className="text-slate-600">Descartar</Button>
                <Button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white">
                  {isSubmitting ? "Aplicando..." : "Guardar Preferencias"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
