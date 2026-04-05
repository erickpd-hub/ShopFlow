import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { type, prompt } = await req.json();

        let systemContext = "";
        
        switch (type) {
            case "sem":
                systemContext = "Eres un experto en SEM (Google Ads). Escribe 3 títulos magnéticos y 2 descripciones de alta conversión basados en lo que pida el usuario. Sé persuasivo, enfocado en conversiones.";
                break;
            case "social":
                systemContext = "Eres un Copywriter de Redes Sociales. Diseña un post para Facebook/Instagram/TikTok llamativo, que incite a la acción, incluyendo hashtags relevantes y un formato amigable con emojis.";
                break;
            case "email":
                systemContext = "Eres un experto en Email Marketing. Escribe el asunto de un correo y el cuerpo del mismo. El objetivo es vender o anunciar algo. Debe ser corto, persuasivo y tener un Call to Action claro.";
                break;
            case "seo":
                systemContext = "Eres especialista en SEO y Ecommerce. Devuelve 1 título SEO óptimo, 1 meta descripción atractiva que tenga la palabra clave principal, y sugerencias de etiquetas Alt para las imágenes de los productos descritos.";
                break;
            case "blog":
                systemContext = "Eres un redactor de contenidos para blogs. Genera un artículo de blog corto o un borrador sobre el tema solicitado, optimizado para posicionamiento SEO e incluyendo introdución, cuerpo y conclusión.";
                break;
            default:
                systemContext = "Eres un experto en marketing digital. Ayúdame con mi campaña.";
        }

        const internalPrompt = `El usuario quiere generar contenido basándose en esto: "${prompt}". Escribe el contenido en formato Markdown.`;

        const result = await streamText({
            model: google("gemini-2.0-flash") as any,
            system: systemContext,
            prompt: internalPrompt,
        });

        return result.toTextStreamResponse();
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
        });
    }
}
