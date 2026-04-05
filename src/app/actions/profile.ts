"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveProfileInfo(data: { name: string; avatarUrl?: string }) {
  try {
    const supabase = await createClient();

    // Verify auth
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError || !userData?.user) {
      return { success: false, error: "No autorizado" };
    }

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: data.name,
        ...(data.avatarUrl && { avatar_url: data.avatarUrl }),
      })
      .eq("id", userData.user.id);

    // Si la tabla no existe o hay error, la actualizamos/insertamos usando upsert.
    if (updateError) {
       console.error("Error updating profile:", updateError);
       // Haremos Upsert en caso de que sea el primer inicio
       const { error: upsertError } = await supabase
         .from("profiles")
         .upsert({
             id: userData.user.id,
             email: userData.user.email,
             full_name: data.name,
             ...(data.avatarUrl && { avatar_url: data.avatarUrl }),
         });
         
         if (upsertError) {
             return { success: false, error: "Error al actualizar o crear el perfil" };
         }
    }

    // Revalidate global layout that might show user menu avatar
    revalidatePath("/dashboard");

    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error: any) {
    console.error("Error in saveProfileInfo:", error);
    return { success: false, error: "Error interno del servidor" };
  }
}
