export type ProductSlug = string;

export type Product = {
  id: string;
  name: string;
  slug: ProductSlug;
  category: string;
  status: "active" | "pilot" | "planning";
  websiteUrl: string;
  primaryCta: string;
  offerSummary: string;
  targetMarketSummary: string;
  channels: string[];
  brief: string;
};

export type Audience = {
  id: string;
  productId: string;
  name: string;
  description: string;
  pains: string[];
  desires: string[];
  channels: string[];
  titles: string[];
  keywords: string[];
};

export type Offer = {
  id: string;
  productId: string;
  name: string;
  offerType: string;
  description: string;
  ctaUrl: string;
  funnelStage: string;
  active: boolean;
};

export type Organization = {
  id: string;
  productId: string;
  orgType: string;
  name: string;
  domain: string;
  websiteUrl: string;
  socialUrl?: string;
  companySizeEstimate: string;
  location: string;
  source: string;
  fitScore: number;
  status: string;
};

export type Contact = {
  id: string;
  productId: string;
  organizationId: string;
  fullName: string;
  title: string;
  email: string;
  linkedinUrl?: string;
  roleType: string;
  source: string;
  confidenceScore: number;
  status: string;
};

export type Lead = {
  id: string;
  productId: string;
  organizationId: string;
  contactId: string;
  leadType: string;
  sourceChannel: string;
  lifecycleStage: string;
  fitScore: number;
  intentScore: number;
  owner: string;
  tags: string[];
  nextAction: string;
  nextActionAt: string;
};

export type Campaign = {
  id: string;
  productId: string;
  name: string;
  campaignType: string;
  objective: string;
  channel: string;
  audienceId: string;
  offerId: string;
  status: string;
  conversionRate: number;
};

export type OutreachMessage = {
  id: string;
  productId: string;
  leadId: string;
  campaignId: string;
  sequenceStep: string;
  channel: string;
  subject: string;
  body: string;
  status: string;
  requiresApproval: boolean;
  sentAt?: string;
  responseDetected: boolean;
};

export type ContentItem = {
  id: string;
  productId: string;
  campaignId?: string;
  contentType: string;
  platform: string;
  title: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  status: string;
  requiresApproval: boolean;
  scheduledFor?: string;
};

export type Approval = {
  id: string;
  productId: string;
  itemType: string;
  itemId: string;
  reason: string;
  priority: "high" | "medium" | "low";
  status: string;
  reviewer?: string;
  notes?: string;
};

export type Playbook = {
  id: string;
  productId: string;
  name: string;
  playbookType: string;
  discoveryRules: string[];
  scoringRules: string[];
  messagingRules: string[];
  approvalRules: string[];
  active: boolean;
};

export type AgentJob = {
  id: string;
  productId: string;
  agentName: string;
  jobType: string;
  status: string;
  startedAt: string;
  completedAt?: string;
};

export type DailyMetric = {
  id: string;
  productId: string;
  metricDate: string;
  leadsFound: number;
  leadsScored: number;
  messagesGenerated: number;
  messagesSent: number;
  repliesReceived: number;
  meetingsBooked: number;
  trialsStarted: number;
  conversions: number;
  contentPublished: number;
};
