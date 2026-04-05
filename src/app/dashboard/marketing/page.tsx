"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useCompletion } from "@ai-sdk/react";

type AITool = 'none' | 'sem' | 'social' | 'email' | 'seo' | 'blog';
type MarketingTab = 'campaigns' | 'channels' | 'ai-assistant';

export default function MarketingPage() {
    const { language, t } = useLanguage();
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
    const [activeTab, setActiveTab] = useState<MarketingTab>('campaigns');
    const [activeTool, setActiveTool] = useState<AITool>('none');
    const [prompt, setPrompt] = useState('');
    const [openDialog, setOpenDialog] = useState<string | null>(null);

    // AI SDK Completion Hook for Streaming
    const { 
        completion: result, 
        complete, 
        isLoading: isGenerating, 
        setCompletion 
    } = useCompletion({
        api: '/api/ai/marketing',
        onFinish: () => {
            toast.success(language === 'es' ? '¡Contenido generado con éxito!' : 'Content generated successfully!');
        },
        onError: (err: any) => {
            toast.error(language === 'es' ? 'Hubo un error al generar' : 'Error generating content');
            console.error(err);
        }
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingSkeleton(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleGenerate = async () => {
        if (!prompt || activeTool === 'none') return;
        setCompletion(''); // Clear previous result
        await complete(prompt, {
            body: { type: activeTool }
        });
    }

    const handleSaveConfig = () => {
        toast.success(language === 'es' ? 'Configuración guardada correctamente. La IA ahora controlará esta función automáticamente.' : 'Configuration saved correctly. The AI will now control this feature automatically.');
        setOpenDialog(null);
    }

    const renderCampaignsTab = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Herramientas de Recuperación */}
                <div className="bg-white dark:bg-color-950 p-6 rounded-3xl border border-color-200 dark:border-color-800 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-8xl">shopping_cart_checkout</span>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-2xl">published_with_changes</span>
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2">{language === 'es' ? 'Recuperador de Carritos IA' : 'AI Cart Recovery'}</h3>
                        <p className="text-sm font-medium text-color-500 mb-6">{language === 'es' ? 'Sistema automático que detecta carritos abandonados y envía emails persuasivos con IA.' : 'Automated system that detects abandoned carts and sends persuasive AI-generated emails.'}</p>
                        <Button variant="outline" className="w-full justify-between font-bold rounded-xl h-12" onClick={() => setOpenDialog('cart')}>
                            {language === 'es' ? 'Configurar Recuperación' : 'Configure Recovery'}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Button>
                    </div>
                </div>

                {/* WhatsApp Marketing */}
                <div className="bg-white dark:bg-color-950 p-6 rounded-3xl border border-color-200 dark:border-color-800 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-8xl">forum</span>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-2xl">chat</span>
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2">WhatsApp Marketing</h3>
                        <p className="text-sm font-medium text-color-500 mb-6">{language === 'es' ? 'Envía promociones, recordatorios y notificaciones de envío directamente al móvil del cliente.' : 'Send promotions, reminders and shipping notifications directly to the customer\'s mobile.'}</p>
                        <Button variant="outline" className="w-full justify-between font-bold rounded-xl h-12" onClick={() => setOpenDialog('whatsapp')}>
                            {language === 'es' ? 'Conectar WhatsApp' : 'Connect WhatsApp'}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Button>
                    </div>
                </div>

                {/* Motor de Cupones */}
                <div className="bg-white dark:bg-color-950 p-6 rounded-3xl border border-color-200 dark:border-color-800 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-8xl">loyalty</span>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-2xl">local_offer</span>
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2">{language === 'es' ? 'Motor de Cupones' : 'Coupon Engine'}</h3>
                        <p className="text-sm font-medium text-color-500 mb-6">{language === 'es' ? 'Crea códigos de descuento (%, monto, envío) con reglas avanzadas y expiración.' : 'Create discount codes (%, amount, shipping) with advanced rules and expiration.'}</p>
                        <Button variant="outline" className="w-full justify-between font-bold rounded-xl h-12" onClick={() => setOpenDialog('coupons')}>
                            {language === 'es' ? 'Crear Nuevo Cupón' : 'Create New Coupon'}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Button>
                    </div>
                </div>

                {/* Programa de Lealtad */}
                <div className="bg-white dark:bg-color-950 p-6 rounded-3xl border border-color-200 dark:border-color-800 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-8xl">stars</span>
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                            <span className="material-symbols-outlined text-2xl">workspace_premium</span>
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2">{language === 'es' ? 'Programa de Puntos' : 'Loyalty Points'}</h3>
                        <p className="text-sm font-medium text-color-500 mb-6">{language === 'es' ? 'Fideliza clientes permitiéndoles acumular puntos por compra para canjear luego.' : 'Build loyalty by allowing customers to earn points per purchase to redeem later.'}</p>
                        <Button variant="outline" className="w-full justify-between font-bold rounded-xl h-12" onClick={() => setOpenDialog('loyalty')}>
                            {language === 'es' ? 'Activar Recompensas' : 'Activate Rewards'}
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Banner de Intención de Salida */}
            <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="flex-1">
                    <h3 className="text-2xl font-black text-primary mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined">exit_to_app</span>
                        {language === 'es' ? 'Pop-ups de Intención de Salida' : 'Exit-Intent Pop-ups'}
                    </h3>
                    <p className="text-color-600 dark:text-color-400 font-medium max-w-2xl">
                        {language === 'es' ? 'Retén a visitantes que están a punto de abandonar tu tienda mostrando ofertas de último segundo de forma automática.' : 'Retain visitors who are about to leave your store by automatically showing last-second offers.'}
                    </p>
                </div>
                <Button className="bg-primary text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-primary/30 flex-shrink-0 cursor-pointer" onClick={() => setOpenDialog('exit-intent')}>
                    {language === 'es' ? 'Personalizar Banner' : 'Customize Banner'}
                </Button>
            </div>
        </motion.div>
    );

    const renderChannelsTab = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-white dark:bg-color-950 p-8 rounded-3xl border border-color-200 dark:border-color-800 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-8 border-b border-color-100 dark:border-color-800 pb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined text-4xl">travel_explore</span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-foreground">{language === 'es' ? 'El Centro de Mando' : 'The Command Center'}</h2>
                        <p className="text-color-500 font-medium">{language === 'es' ? 'Conecta tu tienda con los píxeles y feeds más importantes del mercado.' : 'Connect your store with the most important pixels and feeds on the market.'}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Meta / Google Pixels */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-color-50 dark:bg-color-900/30 rounded-2xl border border-color-100 dark:border-color-800">
                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                            <div className="bg-white dark:bg-black p-3 rounded-xl shadow-sm mt-1">
                                <span className="material-symbols-outlined text-primary">data_object</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-foreground mb-1">{language === 'es' ? 'Píxeles y Tag Manager' : 'Pixels & Tag Manager'}</h4>
                                <p className="text-sm font-medium text-color-500 max-w-md">
                                    {language === 'es' ? 'Pega tu ID para Meta, Google o TikTok. Nosotros disparamos los eventos (ViewContent, AddToCart, Purchase) en automático.' : 'Paste your ID for Meta, Google or TikTok. We fire the events (ViewContent, AddToCart, Purchase) automatically.'}
                                </p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full md:w-auto font-bold rounded-xl h-10 border-color-300" onClick={() => setOpenDialog('pixels')}>
                            {language === 'es' ? 'Gestionar IDs' : 'Manage IDs'}
                        </Button>
                    </div>

                    {/* Google Shopping Feed */}
                    <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-color-50 dark:bg-color-900/30 rounded-2xl border border-color-100 dark:border-color-800">
                        <div className="flex items-start gap-4 mb-4 md:mb-0">
                            <div className="bg-white dark:bg-black p-3 rounded-xl shadow-sm mt-1">
                                <span className="material-symbols-outlined text-orange-500">storefront</span>
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-foreground mb-1">{language === 'es' ? 'Feed para Google Shopping' : 'Google Shopping Feed'}</h4>
                                <p className="text-sm font-medium text-color-500 max-w-md">
                                    {language === 'es' ? 'Genera automáticamente un XML/JSON de tu catálogo para sincronizar con Google Merchant Center.' : 'Automatically generate an XML/JSON of your catalog to sync with Google Merchant Center.'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="flex-1 md:w-48 bg-white dark:bg-black border border-color-200 dark:border-color-800 rounded-lg px-3 py-2 text-xs font-mono truncate text-color-400">
                                https://api.shopflow.app/feed/xml/1234
                            </div>
                            <Button size="icon" variant="outline" className="h-10 w-10 shrink-0 rounded-lg cursor-pointer" onClick={() => {
                                navigator.clipboard.writeText("https://api.shopflow.app/feed/xml/1234");
                                toast.success(language === 'es' ? "URL Copiada" : "URL Copied");
                            }}>
                                <span className="material-symbols-outlined text-sm">content_copy</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Predictive Insights Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-100 dark:border-indigo-900/30">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-indigo-500 bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-lg">public</span>
                        <h4 className="font-bold text-lg text-indigo-900 dark:text-indigo-100">{language === 'es' ? 'Mapa de Ventas' : 'Sales Map'}</h4>
                    </div>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium mb-4">
                        {language === 'es' ? 'Descubre de qué ciudades vienen tus compradores para que sepas dónde apuntar tus anuncios.' : 'Discover which cities your buyers come from so you know where to target your ads.'}
                    </p>
                    <div className="h-32 bg-white/50 dark:bg-black/20 rounded-xl flex items-center justify-center border border-indigo-200/50 dark:border-indigo-800/30 border-dashed">
                        <span className="text-indigo-400 font-medium text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined animate-pulse">explore</span>
                            {language === 'es' ? 'Necesitas más ventas para el mapa' : 'Need more sales for the map'}
                        </span>
                    </div>
                </div>

                <div className="bg-rose-50 dark:bg-rose-950/20 p-6 rounded-3xl border border-rose-100 dark:border-rose-900/30">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="material-symbols-outlined text-rose-500 bg-rose-100 dark:bg-rose-900/50 p-2 rounded-lg">trending_up</span>
                        <h4 className="font-bold text-lg text-rose-900 dark:text-rose-100">{language === 'es' ? 'Insights y Predicciones' : 'Insights & Predictions'}</h4>
                    </div>
                    <div className="bg-white/80 dark:bg-black/40 p-4 rounded-xl border border-rose-200/50 dark:border-rose-800/30 shadow-sm mb-3 relative">
                        <div className="absolute top-0 right-0 w-1 h-full bg-rose-500 rounded-r-xl"></div>
                        <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">AI SUGERENCIA</p>
                        <p className="text-sm text-foreground font-medium">
                            {language === 'es' ? '"Zapatillas Runner" tiene tráfico pero baja conversión. Intenta bajar precio 5%.' : '"Runner Shoes" has traffic but low conversion. Try lowering price 5%.'}
                        </p>
                    </div>
                    <Button variant="ghost" className="w-full text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-xl">
                        {language === 'es' ? 'Ver todas las predicciones' : 'View all predictions'}
                    </Button>
                </div>
            </div>
        </motion.div>
    );

    const renderAiAssistantTab = () => (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Tool Selection */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <button 
                    onClick={() => setActiveTool(activeTool === 'sem' ? 'none' : 'sem')}
                    className={`p-6 rounded-3xl text-left transition-all duration-300 border-2 group cursor-pointer relative overflow-hidden ${activeTool === 'sem' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-color-200 dark:border-color-800 bg-white dark:bg-color-900/50 hover:border-primary/50'}`}
                >
                    {activeTool === 'sem' && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-all"></div>}
                    <div className={`relative z-10 w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-colors ${activeTool === 'sem' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined text-3xl">ads_click</span>
                    </div>
                    <h3 className="relative z-10 text-xl font-black mb-2 text-foreground">{language === 'es' ? 'Ads Express (Generador)' : 'Ads Express (Generator)'}</h3>
                    <p className="relative z-10 text-sm font-medium text-color-500">{language === 'es' ? 'Genera títulos y copys que venden automáticamente basándose en los productos de tu tienda.' : 'Generate headlines and copy that sell automatically based on your store products.'}</p>
                </button>

                <button 
                    onClick={() => setActiveTool(activeTool === 'social' ? 'none' : 'social')}
                    className={`p-6 rounded-3xl text-left transition-all duration-300 border-2 group cursor-pointer relative overflow-hidden ${activeTool === 'social' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-color-200 dark:border-color-800 bg-white dark:bg-color-900/50 hover:border-primary/50'}`}
                >
                    {activeTool === 'social' && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-all"></div>}
                    <div className={`relative z-10 w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-colors ${activeTool === 'social' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined text-3xl">troubleshoot</span>
                    </div>
                    <h3 className="relative z-10 text-xl font-black mb-2 text-foreground">{language === 'es' ? 'Optimizador SEO en un clic' : '1-Click SEO Optimizer'}</h3>
                    <p className="relative z-10 text-sm font-medium text-color-500">{language === 'es' ? 'Analiza productos y sugiere SEO (títulos, etiquetas alt, meta) para aparecer antes en Google.' : 'Analyze products and suggest SEO (titles, alt tags, meta) to rank higher on Google.'}</p>
                </button>

                <button 
                    onClick={() => setActiveTool(activeTool === 'email' ? 'none' : 'email')}
                    className={`p-6 rounded-3xl text-left transition-all duration-300 border-2 group cursor-pointer relative overflow-hidden ${activeTool === 'email' ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10' : 'border-color-200 dark:border-color-800 bg-white dark:bg-color-900/50 hover:border-primary/50'}`}
                >
                    {activeTool === 'email' && <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -mr-16 -mt-16 transition-all"></div>}
                    <div className={`relative z-10 w-14 h-14 rounded-2xl mb-4 flex items-center justify-center transition-colors ${activeTool === 'email' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 group-hover:bg-primary/20 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined text-3xl">article</span>
                    </div>
                    <h3 className="relative z-10 text-xl font-black mb-2 text-foreground">{language === 'es' ? 'Blog Automático' : 'Auto Blog'}</h3>
                    <p className="relative z-10 text-sm font-medium text-color-500">{language === 'es' ? 'Asistente que redacta boletines y artículos cortos orientados al tráfico orgánico de tus productos.' : 'Assistant that writes newsletters and short articles aimed at organic traffic for your products.'}</p>
                </button>
            </div>

            <AnimatePresence>
                {activeTool !== 'none' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 rounded-3xl bg-white dark:bg-color-950 border border-color-200 dark:border-color-800 shadow-2xl shadow-black/5 mt-6 relative">
                            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                                <span className="material-symbols-outlined text-9xl">auto_awesome</span>
                            </div>
                            <div className="relative z-10 max-w-4xl">
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">psychology</span>
                                    {language === 'es' ? 'Generador IA de Campañas' : 'AI Campaign Generator'}
                                </h2>
                                <p className="text-color-500 mb-6 font-medium max-w-2xl">
                                    {language === 'es' ? 'Describe tu producto, oferta o promoción. Nuestro motor de Inteligencia Artificial especializado en marketing (SEM y Performance) creará el texto perfecto para atraer clientes y maximizar tus conversiones.' : 'Describe your product, offer or promotion. Our Artificial Intelligence engine specialized in marketing (SEM and Performance) will create the perfect text to attract customers and maximize your conversions.'}
                                </p>
                                
                                <div className="flex flex-col gap-4">
                                    <div className="relative">
                                        <div className="absolute top-4 left-4 text-color-400">
                                            <span className="material-symbols-outlined">edit_note</span>
                                        </div>
                                        <textarea 
                                            className="w-full bg-color-50 dark:bg-color-900/50 border-none rounded-2xl p-4 pl-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary shadow-inner resize-none h-32 text-foreground"
                                            placeholder={language === 'es' ? 'Ej: Zapatillas de correr ultraligeras con tecnología de amortiguación para maratones, promoción de lanzamiento 20% descuento...' : 'Ex: Ultralight running shoes with cushioning technology for marathons, launch promotion 20% discount...'}
                                            value={prompt}
                                            onChange={(e) => setPrompt(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-start">
                                        <Button 
                                            onClick={handleGenerate}
                                            disabled={isGenerating || !prompt}
                                            className="bg-black dark:bg-white text-white dark:text-black py-6 px-8 rounded-xl font-black shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 transition-all text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                                        >
                                            {isGenerating ? (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                                                    {language === 'es' ? 'Magia en proceso...' : 'Magic loading...'}
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined mr-2 group-hover:rotate-12 transition-transform">magic_button</span>
                                                    {language === 'es' ? `Generar Contenido para ${activeTool === 'sem' ? 'Ads' : activeTool === 'social' ? 'SEO' : 'Blog'}` : `Generate Content for ${activeTool === 'sem' ? 'Ads' : activeTool === 'social' ? 'SEO' : 'Blog'}`}
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {result && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-8 p-6 bg-color-50 dark:bg-color-900/30 rounded-2xl border border-color-200 dark:border-color-800 relative shadow-sm"
                                        >
                                            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground font-medium whitespace-pre-wrap">
                                                {result}
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-color-200 dark:border-color-800 flex justify-end gap-3">
                                                <Button variant="outline" className="rounded-xl font-bold cursor-pointer hover:bg-white dark:hover:bg-color-900 border-color-200 dark:border-color-700" onClick={() => {
                                                    navigator.clipboard.writeText(result);
                                                    toast.success(language === 'es' ? "Contenido copiado al portapapeles" : "Content copied to clipboard");
                                                }}>
                                                    <span className="material-symbols-outlined mr-2 text-sm">content_copy</span>
                                                    {language === 'es' ? 'Copiar al portapapeles' : 'Copy to clipboard'}
                                                </Button>
                                                <Button className="rounded-xl font-bold bg-primary hover:bg-primary/90 text-white cursor-pointer px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40" onClick={() => {
                                                    toast.success(language === 'es' ? "Contenido guardado exitosamente." : "Content saved successfully.");
                                                }}>
                                                    <span className="material-symbols-outlined mr-2 text-sm">rocket_launch</span>
                                                    {language === 'es' ? 'Guardar Contenido' : 'Save Content'}
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 overflow-x-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground">{t.dashboard.menu.marketing}</h1>
                    <p className="text-color-500 font-medium mt-1">{language === 'es' ? 'Recupera ventas, conecta canales y crea contenido con Inteligencia Artificial.' : 'Recover sales, connect channels and create content with Artificial Intelligence.'}</p>
                </div>
                
                {/* Custom Tabs Navigation */}
                <div className="flex items-center gap-2 bg-color-50 dark:bg-color-900/50 p-1 rounded-2xl border border-color-200 dark:border-color-800/80 shadow-inner w-full md:w-auto overflow-x-auto scroller-hide">
                    {[
                        { id: 'campaigns', icon: 'campaign', label: language === 'es' ? 'Campañas' : 'Campaigns' },
                        { id: 'channels', icon: 'hub', label: language === 'es' ? 'Canales' : 'Channels' },
                        { id: 'ai-assistant', icon: 'auto_awesome', label: language === 'es' ? 'Asistente IA' : 'AI Assistant' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as MarketingTab)}
                            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 relative whitespace-nowrap min-w-max flex-1 md:flex-none cursor-pointer ${activeTab === tab.id ? 'text-white shadow-md' : 'text-color-500 hover:text-foreground hover:bg-color-100 dark:hover:bg-color-800'}`}
                        >
                            {activeTab === tab.id && (
                                <motion.div 
                                    layoutId="marketingTabActive" 
                                    className="absolute inset-0 bg-foreground dark:bg-white rounded-xl"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className={`relative z-10 material-symbols-outlined text-lg ${activeTab === tab.id ? '' : 'text-color-400'}`}>{tab.icon}</span>
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {isLoadingSkeleton ? (
                <div className="glass-card shadow-xl shadow-black/5 overflow-hidden flex flex-col items-center justify-center py-24 text-center border border-color-200 dark:border-color-800">
                    <div className="w-16 h-16 bg-color-50 dark:bg-color-900/50 rounded-full animate-pulse mb-6"></div>
                    <div className="h-6 bg-color-100 dark:bg-color-800 rounded animate-pulse w-48 mb-4"></div>
                    <div className="space-y-2 flex flex-col items-center">
                        <div className="h-4 bg-color-50 dark:bg-color-900/50 rounded animate-pulse w-64"></div>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    {activeTab === 'campaigns' && renderCampaignsTab()}
                    {activeTab === 'channels' && renderChannelsTab()}
                    {activeTab === 'ai-assistant' && renderAiAssistantTab()}
                </div>
            )}
            
            {/* Dynamic configuration dialogs depending on clicked card */}
            <Dialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl p-8 border-none bg-background shadow-2xl glass-card">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black mb-1">
                            {openDialog === 'cart' && (language === 'es' ? 'Recuperador de Carritos IA' : 'AI Cart Recovery')}
                            {openDialog === 'whatsapp' && 'WhatsApp Marketing'}
                            {openDialog === 'coupons' && (language === 'es' ? 'Crear Nuevo Cupón' : 'Create New Coupon')}
                            {openDialog === 'loyalty' && (language === 'es' ? 'Activar Recompensas' : 'Activate Rewards')}
                            {openDialog === 'exit-intent' && (language === 'es' ? 'Banner de Intención de Salida' : 'Exit Intent Banner')}
                            {openDialog === 'pixels' && (language === 'es' ? 'Configurar Píxeles' : 'Configure Pixels')}
                        </DialogTitle>
                        <DialogDescription className="text-sm font-medium">
                            {language === 'es' ? 'Realiza los cambios y asienta tus preferencias, el asitente las ejecutará.' : 'Make changes and set priorities, the AI assistant will run them automatically.'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-6 space-y-6">
                        {openDialog === 'cart' && (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch id="cart-enable" defaultChecked />
                                    <Label htmlFor="cart-enable" className="font-bold">{language === 'es' ? 'Activar correos de recuperación' : 'Enable recovery emails'}</Label>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-color-500">{language === 'es' ? 'Tono de la IA' : 'AI Tone'}</Label>
                                    <Input defaultValue={language === 'es' ? 'Urgencia amistosa, ofrecer 10% dto si el carrito supera $50' : 'Friendly urgency, offer 10% off if cart is over $50'} />
                                </div>
                            </div>
                        )}

                        {openDialog === 'whatsapp' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>{language === 'es' ? 'Número Remitente API (Business)' : 'Sender API Number (Business)'}</Label>
                                    <Input placeholder="+1 234 567 8900" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="wa-notify" defaultChecked />
                                    <Label htmlFor="wa-notify">{language === 'es' ? 'Notificar estados de envío automáticamente' : 'Automatically notify shipping states'}</Label>
                                </div>
                            </div>
                        )}

                        {openDialog === 'coupons' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Código del Cupón</Label>
                                    <Input placeholder="EJ: OFERTA20" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Tipo</Label>
                                        <Input defaultValue="Porcentaje (%)" readOnly className="bg-muted cursor-default" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Valor</Label>
                                        <Input type="number" defaultValue="20" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {openDialog === 'loyalty' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label className="font-bold">{language === 'es' ? 'Sistema Puntos vs Dólares' : 'Points vs Dollars system'}</Label>
                                    <Switch id="loyalty-enable" defaultChecked />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs">{language === 'es' ? '1 Dólar gastado equivales a (Puntos):' : '1 Dollar spent equals (Points):'}</Label>
                                    <Input type="number" defaultValue="10" />
                                </div>
                            </div>
                        )}

                         {openDialog === 'exit-intent' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>{language === 'es' ? 'Título del Banner' : 'Banner Title'}</Label>
                                    <Input defaultValue="¡Espera! No te vayas sin este regalo 🎁" />
                                </div>
                                <div className="space-y-2">
                                    <Label>{language === 'es' ? 'Descripción' : 'Description'}</Label>
                                    <Input defaultValue="Te damos un 10% extra en tu orden actual." />
                                </div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <Switch id="exit-modal" defaultChecked />
                                    <Label htmlFor="exit-modal">{language === 'es' ? 'Mostrar al mover mouse hacia arriba' : 'Show when mouse moves up'}</Label>
                                </div>
                            </div>
                        )}

                        {openDialog === 'pixels' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Meta Pixel ID</Label>
                                    <Input placeholder="Ej: 123456789012345" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Google Analytics (G-XXXXX)</Label>
                                    <Input placeholder="G-XXXXXXXXXX" />
                                </div>
                                <div className="space-y-2">
                                    <Label>TikTok Pixel ID</Label>
                                    <Input placeholder="CXXXXXXXXXXXXX" />
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(null)} className="rounded-xl font-bold">Cancelar</Button>
                        <Button className="rounded-xl font-bold bg-primary" onClick={handleSaveConfig}>{language === 'es' ? 'Guardar y Activar' : 'Save and Activate'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
