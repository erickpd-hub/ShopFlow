"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveGeneralSettings(data: { storeName: string; description?: string }) {
  try {
    const supabase = await createClient();

    // Verify auth
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData?.user) {
      return { success: false, error: "No autorizado" };
    }

    // Get the user's primary store
    const { data: store, error: storeError } = await supabase
      .from("stores")
      .select("id, config_json")
      .eq("owner_id", userData.user.id)
      .limit(1)
      .single();

    if (storeError || !store) {
      return { success: false, error: "Tienda no encontrada" };
    }

    // Prepare updated config
    const currentConfig = (store.config_json as Record<string, any>) || {};
    const newConfig = {
      ...currentConfig,
      slogan: data.description || currentConfig.slogan,
      description: data.description,
    };

    // Update store
    const { error: updateError } = await supabase
      .from("stores")
      .update({
        name: data.storeName,
        config_json: newConfig,
      })
      .eq("id", store.id);

    if (updateError) {
      console.error("Error updating store:", updateError);
      return { success: false, error: "Error al actualizar la tienda" };
    }

    // Revalidate paths that might display the store name
    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");

    return { success: true, message: "Ajustes guardados correctamente" };
  } catch (error: any) {
    console.error("Error in saveGeneralSettings:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}

export async function getGeneralSettings() {
  try {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return { success: false };

    const { data: store } = await supabase
      .from("stores")
      .select("name, config_json")
      .eq("owner_id", userData.user.id)
      .limit(1)
      .single();

    if (!store) return { success: false };

    const config = store.config_json as Record<string, any>;
    
    return { 
      success: true, 
      data: {
        storeName: store.name,
        description: config?.description || config?.slogan || "",
      }
    };
  } catch (error) {
    return { success: false };
  }
}
