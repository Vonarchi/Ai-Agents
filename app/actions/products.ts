"use server";

import { revalidatePath } from "next/cache";

import { hasSupabaseEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createProductAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const name = String(formData.get("name") ?? "");
  const slug = slugify(String(formData.get("slug") || name));
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("products").insert({
    name,
    slug,
    category: String(formData.get("category") ?? ""),
    status: String(formData.get("status") ?? "planning"),
    website_url: String(formData.get("websiteUrl") ?? ""),
    primary_cta: String(formData.get("primaryCta") ?? ""),
    offer_summary: String(formData.get("offerSummary") ?? ""),
    target_market_summary: String(formData.get("targetMarketSummary") ?? "")
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/products");
}

export async function updateProductAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const id = String(formData.get("id") ?? "");
  const slug = slugify(String(formData.get("slug") ?? ""));
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase
    .from("products")
    .update({
      name: String(formData.get("name") ?? ""),
      slug,
      status: String(formData.get("status") ?? "planning"),
      primary_cta: String(formData.get("primaryCta") ?? "")
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
}

export async function deleteProductAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const id = String(formData.get("id") ?? "");
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/products");
}
