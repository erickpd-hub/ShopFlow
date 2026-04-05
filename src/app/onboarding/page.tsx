"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Store, Sparkles, Wand2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function OnboardingPage() {
    const router = useRouter();
    const supabase = createClient();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const [formData, setFormData] = useState({
        storeName: "",
        niche: "",
        slogan: "",
        subdomain: "",
        primaryColor: "#7c3aed",
        secondaryColor: "#ffffff",
        accentColor: "#10b981",
    });

    const generateAIBranding = async () => {
        if (!formData.storeName || !formData.niche) return;
        setAiLoading(true);
        try {
            const res = await fetch("/api/ai/onboarding", {
                method: "POST",
                body: JSON.stringify({ storeName: formData.storeName, niche: formData.niche }),
            });
            const data = await res.json();
            setFormData({
                ...formData,
                slogan: data.slogan,
                primaryColor: data.colors.primary,
                secondaryColor: data.colors.secondary,
                accentColor: data.colors.accent,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setAiLoading(false);
        }
    };

    const handleCreateStore = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { error } = await supabase.from("stores").insert({
            owner_id: user.id,
            name: formData.storeName,
            slug: formData.subdomain || formData.storeName.toLowerCase().replace(/\s+/g, "-"),
            subdomain: formData.subdomain || formData.storeName.toLowerCase().replace(/\s+/g, "-"),
            config_json: {
                slogan: formData.slogan,
                theme: {
                    primary: formData.primaryColor,
                    secondary: formData.secondaryColor,
                    accent: formData.accentColor,
                }
            }
        });

        if (error) {
            alert(error.message);
            setLoading(false);
        } else {
            setStep(4);
            setTimeout(() => router.push("/dashboard"), 3000);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                {/* Progress Bar */}
                <div className="flex justify-between mb-8 px-4">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={`h-2 flex-1 mx-1 rounded-full transition-all ${step >= s ? "bg-primary" : "bg-muted"}`}
                        />
                    ))}
                </div>

                <Card className="border-none shadow-2xl bg-card/50 backdrop-blur-xl">
                    {step === 1 && (
                        <>
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Store className="h-6 w-6 text-primary" /> Define tu tienda
                                </CardTitle>
                                <CardDescription>Cuéntanos el nombre y a qué se dedicará tu negocio.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="storeName">Nombre de la tienda</Label>
                                    <Input
                                        id="storeName"
                                        placeholder="Ej: TechGadgets Store"
                                        value={formData.storeName}
                                        onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="niche">Nicho / Categoría</Label>
                                    <Input
                                        id="niche"
                                        placeholder="Ej: Electrónica, Moda, Mascotas..."
                                        value={formData.niche}
                                        onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full h-11" disabled={!formData.storeName} onClick={() => setStep(2)}>
                                    Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Sparkles className="h-6 w-6 text-purple-500" /> Branding IA
                                </CardTitle>
                                <CardDescription>Nuestra IA generará un eslogan y colores basados en tu nicho.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 border-dashed border-primary/50 hover:bg-primary/5 text-primary gap-2"
                                    onClick={generateAIBranding}
                                    disabled={aiLoading}
                                >
                                    <Wand2 className={`h-5 w-5 ${aiLoading ? "animate-spin" : ""}`} />
                                    {aiLoading ? "Generando..." : "Generar con IA"}
                                </Button>

                                {formData.slogan && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                                        <div className="space-y-2">
                                            <Label>Eslogan sugerido</Label>
                                            <Input
                                                value={formData.slogan}
                                                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Prmario</Label>
                                                <div className="flex gap-2">
                                                    <div className="w-8 h-8 rounded border shadow-sm" style={{ backgroundColor: formData.primaryColor }} />
                                                    <Input className="h-8 text-xs p-1" value={formData.primaryColor} readOnly />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Secundario</Label>
                                                <div className="flex gap-2">
                                                    <div className="w-8 h-8 rounded border shadow-sm" style={{ backgroundColor: formData.secondaryColor }} />
                                                    <Input className="h-8 text-xs p-1" value={formData.secondaryColor} readOnly />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Acento</Label>
                                                <div className="flex gap-2">
                                                    <div className="w-8 h-8 rounded border shadow-sm" style={{ backgroundColor: formData.accentColor }} />
                                                    <Input className="h-8 text-xs p-1" value={formData.accentColor} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button variant="ghost" className="flex-1" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" /> Atrás</Button>
                                <Button className="flex-[2]" onClick={() => setStep(3)}>Continuar</Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <CardHeader>
                                <CardTitle className="text-2xl">Finalizar Lanzamiento</CardTitle>
                                <CardDescription>Elige tu subdominio inicial para tu tienda.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Tu subdominio</Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="nombre-de-tienda"
                                            className="text-right"
                                            value={formData.subdomain || formData.storeName.toLowerCase().replace(/\s+/g, "-")}
                                            onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                                        />
                                        <span className="text-muted-foreground font-medium">.tu-saas.com</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                                <Button variant="ghost" className="flex-1" onClick={() => setStep(2)}>Atrás</Button>
                                <Button
                                    className="flex-[2] bg-gradient-to-r from-primary to-purple-600"
                                    onClick={handleCreateStore}
                                    disabled={loading}
                                >
                                    {loading ? "Creando tienda..." : "Crear mi tienda"}
                                </Button>
                            </CardFooter>
                        </>
                    )}

                    {step === 4 && (
                        <div className="p-12 text-center space-y-6">
                            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto animate-bounce" />
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">¡Tu tienda está lista!</h2>
                                <p className="text-muted-foreground">Redirigiéndote al dashboard...</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
