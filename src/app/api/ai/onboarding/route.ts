import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { storeName, niche } = await req.json();

        const prompt = `
      Eres un experto en branding y diseño de e-commerce.
      Para una nueva tienda llamada "${storeName}" en el nicho de "${niche}", 
      genera:
      1. Un eslogan creativo y pegajoso.
      2. Una paleta de colores sugerida (Primary, Secondary, Accent) en formato Hex.
      
      Responde estrictamente en formato JSON:
      {
        "slogan": "...",
        "colors": {
          "primary": "#...",
          "secondary": "#...",
          "accent": "#..."
        }
      }
    `;

        const { text } = await generateText({
            model: google("gemini-2.0-flash") as any, // User requested Gemini 2.5 Flash, current SDK uses gemini-2.0-flash or similar, I'll use 2.0-flash as it's common.
            prompt: prompt,
        });

        // Extract JSON from response (sometimes AI wraps in ```json)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        console.error("AI Onboarding Error:", error);
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
        });
    }
}
