"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
}

// Automatically provision a blank store for new users
async function provisionFirstStore(userId: string, userEmail: string) {
  const supabase = await createClient();

  // Check if the user already has a store
  const { data: existingStore } = await supabase
    .from("stores")
    .select("id")
    .eq("owner_id", userId)
    .limit(1)
    .single();

  if (existingStore) return; // Already has a store, nothing to do

  // Create the profile row (upsert prevents dup errors)
  await supabase.from("profiles").upsert({
    id: userId,
    email: userEmail,
    full_name: userEmail.split("@")[0],
  });

  // Derive a unique slug from the email prefix
  const baseSlug = generateSlug(userEmail.split("@")[0]);
  const slug = `${baseSlug}-${userId.slice(0, 6)}`;

  // Create the blank store
  await supabase.from("stores").insert({
    owner_id: userId,
    name: "Mi Tienda",
    slug,
    config_json: {
      slogan: "Bienvenidos a mi tienda",
      description: "La mejor tienda del mundo",
    },
    theme_json: null, // Will be set by the theme editor
  });
}

// ─── Email + Password Sign-Up ─────────────────────────────────────────────────
export async function signUp(formData: { email: string; password: string; name?: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: { full_name: formData.name || "" },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // If Supabase auto-confirms the email (e.g., in dev/test mode), provision immediately
  if (data.user && data.user.email_confirmed_at) {
    await provisionFirstStore(data.user.id, data.user.email!);
  }

  return { success: true, message: "Revisa tu correo para confirmar tu cuenta" };
}

// ─── Email + Password Sign-In ─────────────────────────────────────────────────
export async function signIn(formData: { email: string; password: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    return { success: false, error: "Correo o contraseña incorrectos" };
  }

  // Provision store on first login (idempotent)
  if (data.user) {
    await provisionFirstStore(data.user.id, data.user.email!);
  }

  redirect("/dashboard");
}

// ─── Auth Callback (called after email confirmation / OAuth) ─────────────────
export async function handleAuthCallback(userId: string, email: string) {
  await provisionFirstStore(userId, email);
}

// ─── Sign Out ─────────────────────────────────────────────────────────────────
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
