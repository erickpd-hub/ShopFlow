# Guía de Despliegue en Vercel (ShopFlow)

Este repositorio está listo para ser desplegado en **Vercel**. Sigue estos pasos para completar la configuración:

## 1. Conectar con GitHub
- Sube los últimos cambios a tu repositorio:
  ```bash
  git add .
  git commit -m "build: convert to Vite for Vercel deployment"
  git push origin main
  ```
- En el dashboard de Vercel, selecciona **"Import Project"** y elige tu repositorio `ShopFlow`.
- **IMPORTANTE**: Asegúrate de que el **Framework Preset** en Vercel esté seleccionado como **Vite**. La carpeta de salida (`Output Directory`) debe ser `dist`.

## 2. Configurar Variables de Entorno
Copia los valores de tu archivo `.env.local` al panel de Vercel en `Settings > Environment Variables`. Estas son las obligatorias:

| Variable | Valor sugerido |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Tu URL de proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Tu llave anónima de proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Tu llave de rol de servicio (secret) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Tu llave de Google AI (Gemini) |
| `STRIPE_SECRET_KEY` | Tu llave secreta de Stripe |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Tu llave pública de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secret del Webhook (obtenido al configurar el webhook en Stripe) |
| `AFTERSHIP_API_KEY` | Tu API key de AfterShip |

## 3. Base de Datos (Supabase)
Asegúrate de haber ejecutado los scripts SQL que se encuentran en la raíz del proyecto en el **SQL Editor** de Supabase:
1. `supabase_schema.sql` (Base de datos principal)
2. `supabase_themes_migration.sql` (Configuración de temas y buckets)

## 4. Notas de Producción
- **Middleware/Proxy**: Este proyecto utiliza la nueva convención `src/proxy.ts` de Next.js para manejar la autenticación dinámica y refresco de tokens.
- **Validación de Temas**: Se corrigió un error de tipos en `src/lib/theme-validator.ts` que impedía la compilación en producción.

¡Tu SaaS debería estar en línea en unos minutos!
