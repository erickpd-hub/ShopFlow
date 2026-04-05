"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Eye, EyeOff, Loader2, MailCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { signIn, signUp } from "@/app/actions/auth";
import { toast } from "sonner";

type AuthMode = "login" | "register";

export default function LoginPage() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        setIsGoogleLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        setIsLoading(true);

        if (mode === "register") {
            const result = await signUp({ email, password, name });
            if (result.success) {
                setSignUpSuccess(true);
            } else {
                toast.error(result.error || "Error al registrarse");
            }
        } else {
            const result = await signIn({ email, password });
            if (result && !result.success) {
                toast.error(result.error || "Credenciales incorrectas");
            }
        }
        setIsLoading(false);
    };

    if (signUpSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4">
                <div className="w-full max-w-md text-center animate-in fade-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MailCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-black text-white mb-3">¡Revisa tu correo!</h1>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Te enviamos un enlace de confirmación a <strong className="text-white">{email}</strong>. 
                        Haz clic en él para activar tu cuenta y acceder al dashboard.
                    </p>
                    <Button variant="ghost" className="text-slate-400 hover:text-white" onClick={() => { setSignUpSuccess(false); setMode("login"); }}>
                        Volver al inicio de sesión
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[150px] rounded-full pointer-events-none" />

            <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
            </Link>

            <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500 relative z-10">

                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-3 mb-10">
                    <div className="bg-indigo-600 p-2.5 rounded-xl shadow-xl shadow-indigo-900/50">
                        <span className="material-symbols-outlined text-white text-2xl">storefront</span>
                    </div>
                    <span className="text-white text-2xl font-black tracking-tight">ShopFlow</span>
                </Link>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
                    {/* Mode tabs */}
                    <div className="flex border-b border-white/10">
                        {(["login", "register"] as const).map((m) => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`flex-1 py-4 text-sm font-bold transition-all ${mode === m ? "text-white bg-white/10" : "text-slate-500 hover:text-slate-300"}`}
                            >
                                {m === "login" ? "Iniciar Sesión" : "Crear Cuenta"}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 space-y-5">
                        <div>
                            <h1 className="text-2xl font-black text-white">
                                {mode === "login" ? "Bienvenido de vuelta" : "Empieza gratis hoy"}
                            </h1>
                            <p className="text-slate-400 text-sm mt-1">
                                {mode === "login" 
                                    ? "Ingresa tus credenciales para continuar"
                                    : "Crea tu cuenta y tu tienda se activa al instante"}
                            </p>
                        </div>

                        {/* Google OAuth */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12 gap-3 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading}
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            )}
                            Continuar con Google
                        </Button>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/10" />
                            <span className="text-xs text-slate-500 font-medium">o con email</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {mode === "register" && (
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Nombre</label>
                                    <Input
                                        type="text"
                                        placeholder="Tu nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-indigo-500/30"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">Correo</label>
                                <Input
                                    type="email"
                                    placeholder="tu@email.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-indigo-500/30"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contraseña</label>
                                    {mode === "login" && (
                                        <button type="button" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mínimo 8 caracteres"
                                        required
                                        minLength={8}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-indigo-500 focus:ring-indigo-500/30 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-base shadow-xl shadow-indigo-900/50 transition-all hover:-translate-y-0.5"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : mode === "login" ? (
                                    "Entrar al Dashboard →"
                                ) : (
                                    "Crear mi cuenta gratis →"
                                )}
                            </Button>
                        </form>

                        {mode === "register" && (
                            <p className="text-xs text-slate-500 text-center leading-relaxed">
                                Al registrarte aceptas los{" "}
                                <Link href="/terms" className="text-indigo-400 hover:underline">Términos de Servicio</Link>{" "}y la{" "}
                                <Link href="/privacy" className="text-indigo-400 hover:underline">Política de Privacidad</Link>
                            </p>
                        )}
                    </div>
                </div>

                <p className="mt-8 text-xs text-slate-600 text-center">© {new Date().getFullYear()} ShopFlow. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}
