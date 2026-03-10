"use server";

import { revalidatePath } from "next/cache";

import { hasSupabaseEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createLeadAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("leads").insert({
    product_id: String(formData.get("productId") ?? ""),
    organization_id: String(formData.get("organizationId") ?? "") || null,
    contact_id: String(formData.get("contactId") ?? "") || null,
    lead_type: String(formData.get("leadType") ?? ""),
    source_channel: String(formData.get("sourceChannel") ?? ""),
    lifecycle_stage: String(formData.get("lifecycleStage") ?? "new"),
    fit_score: Number(formData.get("fitScore") ?? 0),
    intent_score: Number(formData.get("intentScore") ?? 0),
    owner: String(formData.get("owner") ?? ""),
    tags_json: parseTags(String(formData.get("tags") ?? "")),
    next_action: String(formData.get("nextAction") ?? ""),
    next_action_at: String(formData.get("nextActionAt") ?? "") || null
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/leads");
}

export async function updateLeadAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase
    .from("leads")
    .update({
      lifecycle_stage: String(formData.get("lifecycleStage") ?? ""),
      fit_score: Number(formData.get("fitScore") ?? 0),
      intent_score: Number(formData.get("intentScore") ?? 0),
      next_action: String(formData.get("nextAction") ?? ""),
      owner: String(formData.get("owner") ?? "")
    })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/leads");
}

export async function deleteLeadAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("leads").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/leads");
}
