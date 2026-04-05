import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { name, currentDescription, category } = await req.json();

        const prompt = `
      Eres un experto en copywriting para e-commerce de alto impacto.
      Mejora la siguiente descripción de producto para que sea más vendedora, 
      persuasiva y optimizada para SEO.
      
      Producto: "${name}"
      Categoría: "${category}"
      Descripción actual: "${currentDescription || 'Sin descripción'}"
      
      Responde con:
      1. Una nueva descripción estructurada (máximo 3 párrafos).
      2. Una lista de 3 características clave (bullet points).
      3. Sugerencia de palabras clave SEO.
      
      Formato JSON:
      {
        "description": "...",
        "features": ["...", "...", "..."],
        "seoKeywords": "..."
      }
    `;

        const { text } = await generateText({
            model: google("gemini-1.5-flash") as any,
            prompt: prompt,
        });

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
        });
    }
}
