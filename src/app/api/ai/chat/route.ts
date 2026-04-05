import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createClient } from "@/utils/supabase/server";

export const runtime = "edge";

export async function POST(req: Request) {
    try {
        const { messages, storeId, storeName } = await req.json();
        const supabase = await createClient();

        // RAG: Fetch products for context
        const { data: products } = await supabase
            .from("products")
            .select("name, description, price, stock")
            .eq("store_id", storeId);

        const productsContext = products
            ?.map(p => `- ${p.name}: ${p.description} (Precio: $${p.price}, Stock: ${p.stock})`)
            .join("\n") || "Sin productos actualmente.";

        const systemPrompt = `
      Eres el asistente de ventas experto de "${storeName}".
      Tu objetivo es ayudar a los clientes a encontrar productos y resolver sus dudas.
      
      PRODUCTOS DISPONIBLES:
      ${productsContext}
      
      INSTRUCCIONES:
      - Sé amable, profesional y persuasivo.
      - Si el cliente pregunta por algo que no está en la lista, dile que actualmente no lo tenemos pero sugiérele algo similar.
      - Mantén las respuestas breves y directas.
      - Usa emoticonos ocasionalmente para ser más cercano.
    `;

        const result = await streamText({
            model: google("gemini-1.5-flash") as any, // Cast to any to fix TS version mismatch
            messages,
            system: systemPrompt,
        });

        return result.toTextStreamResponse();
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error: (error as Error).message }), {
            status: 500,
        });
    }
}
