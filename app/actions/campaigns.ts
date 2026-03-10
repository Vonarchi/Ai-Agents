"use server";

import { revalidatePath } from "next/cache";

import { hasSupabaseEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function createCampaignAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("campaigns").insert({
    product_id: String(formData.get("productId") ?? ""),
    name: String(formData.get("name") ?? ""),
    campaign_type: String(formData.get("campaignType") ?? ""),
    objective: String(formData.get("objective") ?? ""),
    channel: String(formData.get("channel") ?? ""),
    audience_id: String(formData.get("audienceId") ?? "") || null,
    offer_id: String(formData.get("offerId") ?? "") || null,
    status: String(formData.get("status") ?? "draft"),
    conversion_rate: Number(formData.get("conversionRate") ?? 0)
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/campaigns");
}

export async function updateCampaignAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("campaigns")
    .update({
      name: String(formData.get("name") ?? ""),
      status: String(formData.get("status") ?? "draft"),
      channel: String(formData.get("channel") ?? ""),
      conversion_rate: Number(formData.get("conversionRate") ?? 0),
      objective: String(formData.get("objective") ?? "")
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/campaigns");
}

export async function deleteCampaignAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("campaigns").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/campaigns");
}
