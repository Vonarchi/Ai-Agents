import { unstable_noStore as noStore } from "next/cache";

import {
  agentJobs,
  approvals,
  audiences as fallbackAudiences,
  campaigns as fallbackCampaigns,
  contacts as fallbackContacts,
  leads as fallbackLeads,
  metricsDaily,
  offers as fallbackOffers,
  organizations as fallbackOrganizations,
  playbooks as fallbackPlaybooks,
  products as fallbackProducts
} from "@/lib/data";
import { hasSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/supabase/database";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Audience, Campaign, Contact, Lead, Offer, Organization, Playbook, Product } from "@/lib/types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type AudienceRow = Database["public"]["Tables"]["audiences"]["Row"];
type OfferRow = Database["public"]["Tables"]["offers"]["Row"];
type OrganizationRow = Database["public"]["Tables"]["organizations"]["Row"];
type ContactRow = Database["public"]["Tables"]["contacts"]["Row"];
type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
type CampaignRow = Database["public"]["Tables"]["campaigns"]["Row"];
type PlaybookRow = Database["public"]["Tables"]["playbooks"]["Row"];

function reportQueryError(scope: string, error: { message?: string; code?: string } | null) {
  if (!error) {
    return;
  }

  console.error(`[supabase:${scope}]`, error.code ?? "unknown", error.message ?? "Unknown error");
}

function toArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mapProduct(row: ProductRow): Product {
  const offerSummary = row.offer_summary ?? "";
  const targetMarketSummary = row.target_market_summary ?? "";

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category ?? "Uncategorized",
    status: (row.status as Product["status"]) ?? "planning",
    websiteUrl: row.website_url ?? "",
    primaryCta: row.primary_cta ?? "Learn More",
    offerSummary,
    targetMarketSummary,
    channels: [],
    brief: [offerSummary, targetMarketSummary].filter(Boolean).join(" ")
  };
}

function mapAudience(row: AudienceRow): Audience {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    description: row.description ?? "",
    pains: toArray(row.pains_json),
    desires: toArray(row.desires_json),
    channels: toArray(row.channels_json),
    titles: toArray(row.titles_json),
    keywords: toArray(row.keywords_json)
  };
}

function mapOffer(row: OfferRow): Offer {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    offerType: row.offer_type ?? "",
    description: row.description ?? "",
    ctaUrl: row.cta_url ?? "",
    funnelStage: row.funnel_stage ?? "",
    active: row.active ?? false
  };
}

function mapOrganization(row: OrganizationRow): Organization {
  return {
    id: row.id,
    productId: row.product_id,
    orgType: row.org_type ?? "",
    name: row.name,
    domain: row.domain ?? "",
    websiteUrl: row.website_url ?? "",
    socialUrl: row.social_url ?? undefined,
    companySizeEstimate: row.company_size_estimate ?? "",
    location: row.location ?? "",
    source: row.source ?? "",
    fitScore: row.fit_score ?? 0,
    status: row.status ?? ""
  };
}

function mapContact(row: ContactRow): Contact {
  return {
    id: row.id,
    productId: row.product_id,
    organizationId: row.organization_id ?? "",
    fullName: row.full_name ?? "",
    title: row.title ?? "",
    email: row.email ?? "",
    linkedinUrl: row.linkedin_url ?? undefined,
    roleType: row.role_type ?? "",
    source: row.source ?? "",
    confidenceScore: row.confidence_score ?? 0,
    status: row.status ?? ""
  };
}

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    productId: row.product_id,
    organizationId: row.organization_id ?? "",
    contactId: row.contact_id ?? "",
    leadType: row.lead_type ?? "",
    sourceChannel: row.source_channel ?? "",
    lifecycleStage: row.lifecycle_stage ?? "",
    fitScore: row.fit_score ?? 0,
    intentScore: row.intent_score ?? 0,
    owner: row.owner ?? "",
    tags: toArray(row.tags_json),
    nextAction: row.next_action ?? "",
    nextActionAt: row.next_action_at ?? new Date().toISOString()
  };
}

function mapCampaign(row: CampaignRow): Campaign {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    campaignType: row.campaign_type ?? "",
    objective: row.objective ?? "",
    channel: row.channel ?? "",
    audienceId: row.audience_id ?? "",
    offerId: row.offer_id ?? "",
    status: row.status ?? "",
    conversionRate: row.conversion_rate ?? 0
  };
}

function mapPlaybook(row: PlaybookRow): Playbook {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    playbookType: row.playbook_type ?? "",
    discoveryRules: toArray(row.trigger_rules_json),
    scoringRules: toArray(row.scoring_rules_json),
    messagingRules: toArray(row.messaging_rules_json),
    approvalRules: toArray(row.approval_rules_json),
    active: row.active ?? false
  };
}

export async function getProducts() {
  noStore();

  if (!hasSupabaseEnv()) {
    return fallbackProducts;
  }

  const supabase = await createServerSupabaseClient();
  const [{ data: productRows, error: productError }, { data: audienceRows, error: audienceError }] = await Promise.all([
    supabase.from("products").select("*").order("created_at", { ascending: false }),
    supabase.from("audiences").select("*")
  ]);
  reportQueryError("products", productError);
  reportQueryError("audiences", audienceError);

  const audiences = ((audienceRows ?? []) as AudienceRow[]).map(mapAudience);

  return ((productRows ?? []) as ProductRow[]).map((row) => {
    const productAudiences = audiences.filter((audience) => audience.productId === row.id);
    const channels = new Set(productAudiences.flatMap((audience) => audience.channels));

    return {
      ...mapProduct(row),
      channels: Array.from(channels)
    };
  });
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductWorkspaceBySlug(slug: string) {
  noStore();

  if (!hasSupabaseEnv()) {
    const product = fallbackProducts.find((item) => item.slug === slug);

    if (!product) {
      return null;
    }

    return {
      product,
      audiences: fallbackAudiences.filter((item) => item.productId === product.id),
      offers: fallbackOffers.filter((item) => item.productId === product.id),
      leads: fallbackLeads.filter((item) => item.productId === product.id),
      campaigns: fallbackCampaigns.filter((item) => item.productId === product.id),
      approvals: approvals.filter((item) => item.productId === product.id),
      playbooks: fallbackPlaybooks.filter((item) => item.productId === product.id),
      agentJobs: agentJobs.filter((item) => item.productId === product.id),
      metrics: metricsDaily.filter((item) => item.productId === product.id)
    };
  }

  const supabase = await createServerSupabaseClient();
  const product = await getProductBySlug(slug);

  if (!product) {
    return null;
  }

  const [
    { data: audienceRows, error: audienceError },
    { data: offerRows, error: offerError },
    { data: leadRows, error: leadError },
    { data: campaignRows, error: campaignError },
    { data: playbookRows, error: playbookError }
  ] = await Promise.all([
    supabase.from("audiences").select("*").eq("product_id", product.id),
    supabase.from("offers").select("*").eq("product_id", product.id),
    supabase.from("leads").select("*").eq("product_id", product.id),
    supabase.from("campaigns").select("*").eq("product_id", product.id),
    supabase.from("playbooks").select("*").eq("product_id", product.id)
  ]);
  reportQueryError("product-workspace:audiences", audienceError);
  reportQueryError("product-workspace:offers", offerError);
  reportQueryError("product-workspace:leads", leadError);
  reportQueryError("product-workspace:campaigns", campaignError);
  reportQueryError("product-workspace:playbooks", playbookError);

  return {
    product,
    audiences: ((audienceRows ?? []) as AudienceRow[]).map(mapAudience),
    offers: ((offerRows ?? []) as OfferRow[]).map(mapOffer),
    leads: ((leadRows ?? []) as LeadRow[]).map(mapLead),
    campaigns: ((campaignRows ?? []) as CampaignRow[]).map(mapCampaign),
    approvals: approvals.filter((item) => item.productId === product.id),
    playbooks: ((playbookRows ?? []) as PlaybookRow[]).map(mapPlaybook),
    agentJobs: agentJobs.filter((item) => item.productId === product.id),
    metrics: metricsDaily.filter((item) => item.productId === product.id)
  };
}

export async function getLeadWorkspace() {
  noStore();

  if (!hasSupabaseEnv()) {
    return {
      leads: fallbackLeads,
      products: fallbackProducts,
      organizations: fallbackOrganizations,
      contacts: fallbackContacts
    };
  }

  const supabase = await createServerSupabaseClient();
  const [
    { data: leadRows, error: leadError },
    { data: productRows, error: productError },
    { data: organizationRows, error: organizationError },
    { data: contactRows, error: contactError }
  ] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase.from("products").select("*"),
    supabase.from("organizations").select("*"),
    supabase.from("contacts").select("*")
  ]);
  reportQueryError("leads", leadError);
  reportQueryError("lead-workspace:products", productError);
  reportQueryError("organizations", organizationError);
  reportQueryError("contacts", contactError);

  return {
    leads: ((leadRows ?? []) as LeadRow[]).map(mapLead),
    products: ((productRows ?? []) as ProductRow[]).map(mapProduct),
    organizations: ((organizationRows ?? []) as OrganizationRow[]).map(mapOrganization),
    contacts: ((contactRows ?? []) as ContactRow[]).map(mapContact)
  };
}

export async function getCampaignWorkspace() {
  noStore();

  if (!hasSupabaseEnv()) {
    return {
      campaigns: fallbackCampaigns,
      products: fallbackProducts,
      audiences: fallbackAudiences,
      offers: fallbackOffers
    };
  }

  const supabase = await createServerSupabaseClient();
  const [
    { data: campaignRows, error: campaignError },
    { data: productRows, error: productError },
    { data: audienceRows, error: audienceError },
    { data: offerRows, error: offerError }
  ] = await Promise.all([
    supabase.from("campaigns").select("*").order("created_at", { ascending: false }),
    supabase.from("products").select("*"),
    supabase.from("audiences").select("*"),
    supabase.from("offers").select("*")
  ]);
  reportQueryError("campaigns", campaignError);
  reportQueryError("campaign-workspace:products", productError);
  reportQueryError("campaign-workspace:audiences", audienceError);
  reportQueryError("campaign-workspace:offers", offerError);

  return {
    campaigns: ((campaignRows ?? []) as CampaignRow[]).map(mapCampaign),
    products: ((productRows ?? []) as ProductRow[]).map(mapProduct),
    audiences: ((audienceRows ?? []) as AudienceRow[]).map(mapAudience),
    offers: ((offerRows ?? []) as OfferRow[]).map(mapOffer)
  };
}

export async function getDashboardSummary() {
  const [products, leadWorkspace] = await Promise.all([getProducts(), getLeadWorkspace()]);
  const totals = metricsDaily.reduce(
    (acc, metric) => {
      acc.leads += metric.leadsFound;
      acc.conversions += metric.conversions;
      return acc;
    },
    { leads: 0, conversions: 0 }
  );

  return {
    productCount: products.length,
    leadCount: leadWorkspace.leads.length,
    leadsToday: totals.leads,
    approvalCount: approvals.filter((item) => item.status === "pending").length,
    conversions: totals.conversions
  };
}
