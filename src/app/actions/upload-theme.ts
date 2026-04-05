"use server";

import { createClient } from "@/utils/supabase/server";
import { validateThemePackage } from "@/lib/theme-validator";
import { revalidatePath } from "next/cache";

export type UploadResponse = {
  success: boolean;
  error?: string;
  detail?: string;
  themeId?: string;
};

// Configuración del servidor para body size limit en Next.js (si se despliega en Vercel)
// export const config = { api: { bodyParser: { sizeLimit: "50mb" } } };

export async function uploadTheme(formData: FormData): Promise<UploadResponse> {
  const supabase = await createClient();
  
  // 1. Auth & Authorization
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "AUTH_ERROR", detail: "Usuario no autenticado" };
  }

  // 2. FormData Extraction
  const themeFile = formData.get("theme") as File;
  const storeId = formData.get("storeId") as string;

  if (!themeFile || !storeId) {
    return { success: false, error: "MISSING_DATA", detail: "Falta el archivo .zip o el ID de la tienda" };
  }

  // Double check store ownership
  const { data: store, error: storeError } = await supabase
    .from("stores")
    .select("id, owner_id, slug")
    .eq("id", storeId)
    .single();

  if (storeError || !store || store.owner_id !== user.id) {
    return { success: false, error: "FORBIDDEN", detail: "No tienes permiso sobre esta tienda" };
  }

  // 3. Size & Extension pre-validation
  if (themeFile.size > 50 * 1024 * 1024) {
    return { success: false, error: "MAX_SIZE_EXCEEDED", detail: "El archivo supera los 50MB permitidos" };
  }

  if (!themeFile.name.endsWith(".zip")) {
    return { success: false, error: "INVALID_FORMAT", detail: "Solo se permiten archivos .zip" };
  }

  // 4. Content Validation (Strict Mode)
  const buffer = Buffer.from(await themeFile.arrayBuffer());
  const validation = await validateThemePackage(buffer);

  if (!validation.success || !validation.data) {
    return { 
      success: false, 
      error: validation.error?.error || "VALIDATION_FAILED", 
      detail: validation.error?.detail || "Error desconocido en la validación" 
    };
  }

  const { manifest, config: themeConfig, preview } = validation.data;

  try {
    const themeUuid = crypto.randomUUID();
    const zipPath = `themes/${storeId}/${themeUuid}.zip`;
    const previewPath = `previews/${storeId}/${themeUuid}.png`;

    // 5. Upload to Supabase Storage
    // NOTE: El bucket 'themes' y 'previews' debe existir en Supabase
    const { error: uploadZipError } = await supabase.storage
      .from("themes")
      .upload(zipPath, buffer, { contentType: "application/zip", upsert: true });

    if (uploadZipError) throw new Error(`Storage Zip Error: ${uploadZipError.message}`);

    const { error: uploadPreviewError } = await supabase.storage
      .from("previews")
      .upload(previewPath, preview.getData(), { contentType: "image/png", upsert: true });

    if (uploadPreviewError) throw new Error(`Storage Preview Error: ${uploadPreviewError.message}`);

    // Get public URL for preview
    const { data: { publicUrl: previewUrl } } = supabase.storage
      .from("previews")
      .getPublicUrl(previewPath);

    // 6. DB Registration (store_themes)
    // Deactivamos otros temas si este será el activo
    await supabase
      .from("store_themes")
      .update({ is_active: false })
      .eq("store_id", storeId);

    const { data: newTheme, error: insertError } = await supabase
      .from("store_themes")
      .insert({
        store_id: storeId,
        name: manifest.name,
        theme_json: {
          ...themeConfig,
          manifest,
          zip_path: zipPath,
          preview_url: previewUrl
        },
        is_active: true
      })
      .select("id")
      .single();

    if (insertError) throw insertError;

    // Actualizamos la configuración de la tienda para que use el nuevo tema
    await supabase
        .from("stores")
        .update({ theme_json: themeConfig })
        .eq("id", storeId);

    // 7. Success
    revalidatePath(`/dashboard/themes`);
    revalidatePath(`/${store.slug}`);
    
    return { 
      success: true, 
      themeId: newTheme.id,
      detail: "Tema validado, subido y activado correctamente" 
    };

  } catch (err: any) {
    console.error("Theme Upload Error:", err);
    return { success: false, error: "SERVER_ERROR", detail: err.message };
  }
}
