"use server";

import { createClient } from "@/utils/supabase/server";
import { ThemeSchema } from "@/types/theme";
import { revalidatePath } from "next/cache";

// Límite de plantillas asignado a nivel general (puede atarse a un plan en el futuro)
const MAX_THEMES_PER_STORE = 3;

export async function saveStoreTheme(theme: ThemeSchema, themeName: string = "Mi Tema", storeId?: string) {
  try {
    const supabase = await createClient();

    // 1. Autorización: asegurar que el usuario está logeado
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData?.user) {
      return { success: false, error: "No autorizado" };
    }

    // Buscamos la tienda principal del usuario si no nos la pasa
    let activeStoreId = storeId;
    if (!activeStoreId) {
      const { data: firstStore } = await supabase
        .from("stores")
        .select("id, slug")
        .eq("owner_id", userData.user.id)
        .limit(1)
        .single();
        
      if (!firstStore) return { success: false, error: "No tienes una tienda configurada" };
      activeStoreId = firstStore.id;
    }

    // Continuamos verificación normal
    const { data: store, error: storeError } = await supabase
      .from("stores")
      .select("id, slug, owner_id")
      .eq("id", activeStoreId)
      .single();

    if (storeError || !store || store.owner_id !== userData.user.id) {
      return { success: false, error: "Tienda no encontrada o acceso denegado" };
    }

    // 2. Verificar límite de plantillas en la tabla store_themes
    // NOTA: Requiere que la tabla `store_themes` esté creada.
    const { count, error: countError } = await supabase
      .from("store_themes")
      .select("id", { count: "exact" })
      .eq("store_id", activeStoreId);

    // Si la tabla no existe aún (Supabase error), haremos un "fallback" clásico guardando en `store.theme_json`
    if (countError && countError.code === "42P01") { // 42P01 = relation does not exist
      // Fallback: Guardar directo en la tabla de tiendas
      const { error: updateError } = await supabase
        .from("stores")
        .update({ theme_json: theme })
        .eq("id", activeStoreId);
        
      if (updateError) throw updateError;
      
      revalidatePath(`/${store.slug}`);
      return { success: true, message: "Tema guardado exitosamente (Fallback direct)" };
    }

    if (count !== null && count >= MAX_THEMES_PER_STORE) {
      // Si la tienda ya tiene el máximo permitido, se rechaza la creación de uno nuevo.
      // (En la realidad de UI permitirías "actualizar" uno existente, pero aquí forzamos el límite explícito).
      return { 
        success: false, 
        error: `Has alcanzado el límite de ${MAX_THEMES_PER_STORE} temas para tu tienda. Mejora tu plan para añadir más.` 
      };
    }

    // 3. Insertar el nuevo tema
    const { error: insertError } = await supabase
      .from("store_themes")
      .insert({
        store_id: activeStoreId,
        name: themeName,
        theme_json: theme,
        is_active: true // Por simplicidad, se marca activo al crearlo
      });

    if (insertError) throw insertError;

    // Actualizamos el JSON principal en la tienda para asegurar retro-compatibilidad
    await supabase
      .from("stores")
      .update({ theme_json: theme })
      .eq("id", activeStoreId);

    revalidatePath(`/${store.slug}`);
    return { success: true, message: "Tema guardado correctamente" };

  } catch (error: any) {
    console.error("Error saving theme:", error);
    return { success: false, error: "Error interno del servidor", details: error.message };
  }
}
