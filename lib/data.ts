import {
  AgentJob,
  Approval,
  Audience,
  Campaign,
  Contact,
  ContentItem,
  DailyMetric,
  Lead,
  Offer,
  Organization,
  OutreachMessage,
  Playbook,
  Product,
  ProductSlug
} from "@/lib/types";

export const products: Product[] = [
  {
    id: "prod_tc",
    name: "TrailerCheck",
    slug: "trailercheck",
    category: "Fleet Compliance SaaS",
    status: "active",
    websiteUrl: "https://trailercheck.example.com",
    primaryCta: "Book Demo",
    offerSummary: "Compliance checklist, defect reduction walkthrough, AI verification demo.",
    targetMarketSummary: "Fleets, safety leaders, compliance managers, maintenance operators.",
    channels: ["Email", "Landing Pages", "LinkedIn Research", "Public Fleet Discovery"],
    brief:
      "TrailerCheck helps safety and maintenance teams reduce inspection risk, tighten defect tracking, and move from paper-heavy processes to audit-ready trailer inspection workflows."
  },
  {
    id: "prod_np",
    name: "NCLEX / Nursing Platform",
    slug: "nursing-platform",
    category: "Education Subscription",
    status: "pilot",
    websiteUrl: "https://nursing.example.com",
    primaryCta: "Start Free Trial",
    offerSummary: "Quiz packs, daily challenge, category-specific practice packs.",
    targetMarketSummary: "NCLEX candidates, nursing students, educators, creators, school clubs.",
    channels: ["Instagram", "TikTok", "Facebook Communities", "Educator Outreach"],
    brief:
      "The nursing platform packages bite-sized practice, challenge loops, and community-friendly offers that can move students from free study assets into paid prep."
  },
  {
    id: "prod_cr",
    name: "Chart Readi",
    slug: "chart-readi",
    category: "Trading Education",
    status: "pilot",
    websiteUrl: "https://chartreadi.example.com",
    primaryCta: "Get Free Drill",
    offerSummary: "Reset prompt, scenario checklist, market discipline framework.",
    targetMarketSummary: "Retail traders, futures traders, psychology-focused trading learners.",
    channels: ["X", "Instagram", "TikTok", "Email Newsletter"],
    brief:
      "Chart Readi focuses on trader discipline and psychology, using repeatable drills and educational content to move audiences into subscription products."
  }
];

export const audiences: Audience[] = [
  {
    id: "aud_tc_1",
    productId: "prod_tc",
    name: "Fleet Safety Teams",
    description: "Safety managers and compliance leaders inside multi-location carriers.",
    pains: ["Manual inspection processes", "Audit risk", "Slow defect verification"],
    desires: ["Demo-ready proof", "Lower defect rates", "Centralized inspection visibility"],
    channels: ["Email", "LinkedIn"],
    titles: ["Safety Manager", "Director of Compliance", "Fleet Safety Lead"],
    keywords: ["fleet compliance", "DOT safety", "trailer inspection"]
  },
  {
    id: "aud_np_1",
    productId: "prod_np",
    name: "NCLEX Candidates",
    description: "Students preparing for NCLEX who respond to daily practice loops.",
    pains: ["Inconsistent prep", "Test anxiety", "Weak category repetition"],
    desires: ["Daily momentum", "Faster recall", "Affordable prep"],
    channels: ["TikTok", "Instagram", "Email"],
    titles: ["Student Nurse"],
    keywords: ["NCLEX", "nursing school", "practice questions"]
  },
  {
    id: "aud_cr_1",
    productId: "prod_cr",
    name: "Discipline-Oriented Traders",
    description: "Active traders who care about psychology and repeatable execution.",
    pains: ["Revenge trading", "Lack of routine", "Poor process review"],
    desires: ["Discipline", "Reset frameworks", "Short daily drills"],
    channels: ["X", "TikTok", "Email"],
    titles: ["Trader", "Trading Coach"],
    keywords: ["trading psychology", "discipline", "futures"]
  }
];

export const offers: Offer[] = [
  {
    id: "off_tc_checklist",
    productId: "prod_tc",
    name: "Trailer Inspection Compliance Checklist",
    offerType: "Lead Magnet",
    description: "A practical checklist for safety teams managing trailer inspection readiness.",
    ctaUrl: "/offers/trailercheck-checklist",
    funnelStage: "Top of Funnel",
    active: true
  },
  {
    id: "off_np_quiz",
    productId: "prod_np",
    name: "Free NCLEX Quiz Pack",
    offerType: "Lead Magnet",
    description: "A free practice pack designed to move students into recurring study habits.",
    ctaUrl: "/offers/nclex-quiz-pack",
    funnelStage: "Top of Funnel",
    active: true
  },
  {
    id: "off_cr_drill",
    productId: "prod_cr",
    name: "Daily Reset Drill",
    offerType: "Lead Magnet",
    description: "A routine-building drill for traders focused on discipline and psychology.",
    ctaUrl: "/offers/chart-readi-reset",
    funnelStage: "Top of Funnel",
    active: true
  }
];

export const organizations: Organization[] = [
  {
    id: "org_tc_1",
    productId: "prod_tc",
    orgType: "Fleet",
    name: "Blue Ridge Carriers",
    domain: "blueridgecarriers.com",
    websiteUrl: "https://blueridgecarriers.com",
    companySizeEstimate: "180 trailers",
    location: "Charlotte, NC",
    source: "Public fleet directory",
    fitScore: 91,
    status: "qualified"
  },
  {
    id: "org_tc_2",
    productId: "prod_tc",
    orgType: "Fleet",
    name: "MidSouth Freight Lines",
    domain: "midsouthfreight.com",
    websiteUrl: "https://midsouthfreight.com",
    companySizeEstimate: "120 trailers",
    location: "Memphis, TN",
    source: "Carrier website",
    fitScore: 84,
    status: "researching"
  },
  {
    id: "org_np_1",
    productId: "prod_np",
    orgType: "Creator",
    name: "Nurse Study Circle",
    domain: "nursestudycircle.com",
    websiteUrl: "https://nursestudycircle.com",
    companySizeEstimate: "54k social audience",
    location: "Remote",
    source: "Instagram research",
    fitScore: 78,
    status: "qualified"
  },
  {
    id: "org_cr_1",
    productId: "prod_cr",
    orgType: "Creator",
    name: "Process First Trading",
    domain: "processfirsttrading.com",
    websiteUrl: "https://processfirsttrading.com",
    companySizeEstimate: "21k subscribers",
    location: "Remote",
    source: "X research",
    fitScore: 74,
    status: "qualified"
  }
];

export const contacts: Contact[] = [
  {
    id: "con_tc_1",
    productId: "prod_tc",
    organizationId: "org_tc_1",
    fullName: "Alicia Moran",
    title: "Director of Safety",
    email: "alicia@blueridgecarriers.com",
    linkedinUrl: "https://linkedin.com/in/alicia-moran",
    roleType: "Buyer",
    source: "Public website",
    confidenceScore: 0.94,
    status: "validated"
  },
  {
    id: "con_tc_2",
    productId: "prod_tc",
    organizationId: "org_tc_2",
    fullName: "Terrence Hall",
    title: "Fleet Maintenance Manager",
    email: "thall@midsouthfreight.com",
    roleType: "Champion",
    source: "Public fleet directory",
    confidenceScore: 0.88,
    status: "new"
  },
  {
    id: "con_np_1",
    productId: "prod_np",
    organizationId: "org_np_1",
    fullName: "Kayla Ramos",
    title: "Founder",
    email: "hello@nursestudycircle.com",
    roleType: "Partner",
    source: "Instagram bio",
    confidenceScore: 0.81,
    status: "new"
  },
  {
    id: "con_cr_1",
    productId: "prod_cr",
    organizationId: "org_cr_1",
    fullName: "Chris Everett",
    title: "Trading Educator",
    email: "team@processfirsttrading.com",
    roleType: "Partner",
    source: "X profile",
    confidenceScore: 0.79,
    status: "new"
  }
];

export const leads: Lead[] = [
  {
    id: "lead_tc_1",
    productId: "prod_tc",
    organizationId: "org_tc_1",
    contactId: "con_tc_1",
    leadType: "Direct Outreach",
    sourceChannel: "Email",
    lifecycleStage: "ready_for_outreach",
    fitScore: 93,
    intentScore: 71,
    owner: "Outreach Agent",
    tags: ["safety-role", "multi-location", "valid-email"],
    nextAction: "Review first-touch checklist email",
    nextActionAt: "2026-03-11T09:00:00Z"
  },
  {
    id: "lead_tc_2",
    productId: "prod_tc",
    organizationId: "org_tc_2",
    contactId: "con_tc_2",
    leadType: "Direct Outreach",
    sourceChannel: "Email",
    lifecycleStage: "scored",
    fitScore: 84,
    intentScore: 58,
    owner: "Scoring Agent",
    tags: ["maintenance-role", "carrier-site"],
    nextAction: "Find second buyer contact",
    nextActionAt: "2026-03-11T14:30:00Z"
  },
  {
    id: "lead_np_1",
    productId: "prod_np",
    organizationId: "org_np_1",
    contactId: "con_np_1",
    leadType: "Partnership",
    sourceChannel: "Instagram",
    lifecycleStage: "approval_needed",
    fitScore: 79,
    intentScore: 63,
    owner: "Outreach Agent",
    tags: ["creator", "community-fit"],
    nextAction: "Approve creator partnership intro",
    nextActionAt: "2026-03-11T16:00:00Z"
  },
  {
    id: "lead_cr_1",
    productId: "prod_cr",
    organizationId: "org_cr_1",
    contactId: "con_cr_1",
    leadType: "Creator Outreach",
    sourceChannel: "X",
    lifecycleStage: "qualified",
    fitScore: 76,
    intentScore: 61,
    owner: "Prospect Agent",
    tags: ["discipline", "creator-fit"],
    nextAction: "Draft collaboration offer",
    nextActionAt: "2026-03-12T10:00:00Z"
  }
];

export const campaigns: Campaign[] = [
  {
    id: "camp_tc_1",
    productId: "prod_tc",
    name: "Checklist to Demo",
    campaignType: "Outbound",
    objective: "Book TrailerCheck demos from qualified fleet accounts",
    channel: "Email",
    audienceId: "aud_tc_1",
    offerId: "off_tc_checklist",
    status: "active",
    conversionRate: 12.8
  },
  {
    id: "camp_np_1",
    productId: "prod_np",
    name: "Quiz Pack Creator Push",
    campaignType: "Partnership",
    objective: "Drive free trial signups via creator partnerships",
    channel: "Instagram",
    audienceId: "aud_np_1",
    offerId: "off_np_quiz",
    status: "draft",
    conversionRate: 6.1
  },
  {
    id: "camp_cr_1",
    productId: "prod_cr",
    name: "Daily Reset Funnel",
    campaignType: "Content",
    objective: "Capture email leads from trader discipline content",
    channel: "X",
    audienceId: "aud_cr_1",
    offerId: "off_cr_drill",
    status: "active",
    conversionRate: 8.4
  }
];

export const outreachMessages: OutreachMessage[] = [
  {
    id: "msg_tc_1",
    productId: "prod_tc",
    leadId: "lead_tc_1",
    campaignId: "camp_tc_1",
    sequenceStep: "Step 1",
    channel: "Email",
    subject: "A trailer inspection checklist for Blue Ridge",
    body:
      "Alicia, your team looks like a fit for a streamlined checklist + verification workflow. I drafted a quick checklist asset that maps to safety and maintenance handoff risk.",
    status: "awaiting_approval",
    requiresApproval: true,
    responseDetected: false
  },
  {
    id: "msg_tc_2",
    productId: "prod_tc",
    leadId: "lead_tc_2",
    campaignId: "camp_tc_1",
    sequenceStep: "Step 2",
    channel: "Email",
    subject: "Following up on trailer defect verification",
    body:
      "Terrence, sending a short follow-up on defect reduction workflows for trailer-heavy fleets. I can share the defect walkthrough if useful.",
    status: "drafted",
    requiresApproval: false,
    responseDetected: false
  },
  {
    id: "msg_np_1",
    productId: "prod_np",
    leadId: "lead_np_1",
    campaignId: "camp_np_1",
    sequenceStep: "Intro",
    channel: "Instagram DM",
    subject: "Creator partnership intro",
    body:
      "Kayla, I put together a simple NCLEX quiz pack partnership idea that fits your audience's daily challenge style.",
    status: "awaiting_approval",
    requiresApproval: true,
    responseDetected: false
  }
];

export const contentItems: ContentItem[] = [
  {
    id: "content_tc_1",
    productId: "prod_tc",
    campaignId: "camp_tc_1",
    contentType: "Landing Page Copy",
    platform: "Web",
    title: "Checklist Landing Refresh",
    hook: "Turn trailer inspection confusion into a simple audit-ready workflow.",
    body:
      "The draft frames manual compliance pain, highlights defect verification, and closes with a demo invitation tied to the checklist asset.",
    cta: "Book Demo",
    hashtags: ["#fleetcompliance", "#trailersafety"],
    status: "review",
    requiresApproval: true,
    scheduledFor: "2026-03-12T15:00:00Z"
  },
  {
    id: "content_np_1",
    productId: "prod_np",
    campaignId: "camp_np_1",
    contentType: "Short Form Video",
    platform: "TikTok",
    title: "3 NCLEX mistakes in med-surg questions",
    hook: "If you miss med-surg because you read too fast, this is the fix.",
    body:
      "A 30-second script tied to the free quiz pack and daily challenge signup.",
    cta: "Get Free Quiz Pack",
    hashtags: ["#nclex", "#nursingstudent"],
    status: "draft",
    requiresApproval: false
  },
  {
    id: "content_cr_1",
    productId: "prod_cr",
    campaignId: "camp_cr_1",
    contentType: "Thread",
    platform: "X",
    title: "The discipline reset before the open",
    hook: "Good trading days usually start before the market opens.",
    body:
      "A thread that breaks down a short reset routine and ties into the free drill.",
    cta: "Get Free Drill",
    hashtags: ["#tradingpsychology", "#futures"],
    status: "scheduled",
    requiresApproval: false,
    scheduledFor: "2026-03-11T13:00:00Z"
  }
];

export const approvals: Approval[] = [
  {
    id: "app_1",
    productId: "prod_tc",
    itemType: "outreach_message",
    itemId: "msg_tc_1",
    reason: "First-touch outbound email requires review",
    priority: "high",
    status: "pending"
  },
  {
    id: "app_2",
    productId: "prod_np",
    itemType: "outreach_message",
    itemId: "msg_np_1",
    reason: "Creator partnership outreach requires review",
    priority: "high",
    status: "pending"
  },
  {
    id: "app_3",
    productId: "prod_tc",
    itemType: "content_item",
    itemId: "content_tc_1",
    reason: "Landing page copy touches high-visibility messaging",
    priority: "medium",
    status: "pending"
  }
];

export const playbooks: Playbook[] = [
  {
    id: "play_tc_1",
    productId: "prod_tc",
    name: "TrailerCheck Core Growth Playbook",
    playbookType: "Outbound + Content",
    discoveryRules: [
      "Fleet-related keywords",
      "Safety or compliance department identified",
      "Maintenance operations visible",
      "Multi-location carriers prioritized"
    ],
    scoringRules: [
      "Fleet over 100 units: +20",
      "Safety title found: +25",
      "Maintenance title found: +15",
      "Multiple terminals: +10",
      "Valid business email: +10"
    ],
    messagingRules: [
      "Lead with audit-readiness or defect reduction",
      "Match copy to safety or maintenance pain",
      "Route into checklist -> demo CTA"
    ],
    approvalRules: [
      "All first-touch outbound emails require review",
      "Auto-send only approved follow-ups",
      "Block risky or non-permissioned automation"
    ],
    active: true
  },
  {
    id: "play_np_1",
    productId: "prod_np",
    name: "Nursing Audience Playbook",
    playbookType: "Creator + Community",
    discoveryRules: ["NCLEX keywords", "Educators", "School clubs", "Nursing creators"],
    scoringRules: ["Nursing relevance", "Audience size", "Engagement", "Partnership access"],
    messagingRules: ["Offer quiz packs", "Use challenge framing", "Move to trial CTA"],
    approvalRules: ["All creator/community outreach reviewed"],
    active: true
  },
  {
    id: "play_cr_1",
    productId: "prod_cr",
    name: "Chart Readi Discipline Playbook",
    playbookType: "Content Funnel",
    discoveryRules: ["Psychology traders", "Discipline creators", "Futures communities"],
    scoringRules: ["Educational fit", "Creator activity", "Short-form fit"],
    messagingRules: ["Lead with reset and discipline", "Use drill CTA"],
    approvalRules: ["Review partnership asks and unusual replies"],
    active: true
  }
];

export const agentJobs: AgentJob[] = [
  {
    id: "job_1",
    productId: "prod_tc",
    agentName: "Prospect Agent",
    jobType: "lead_discovery",
    status: "completed",
    startedAt: "2026-03-10T06:00:00Z",
    completedAt: "2026-03-10T06:03:00Z"
  },
  {
    id: "job_2",
    productId: "prod_tc",
    agentName: "Scoring Agent",
    jobType: "lead_scoring",
    status: "completed",
    startedAt: "2026-03-10T06:04:00Z",
    completedAt: "2026-03-10T06:05:00Z"
  },
  {
    id: "job_3",
    productId: "prod_np",
    agentName: "Content Agent",
    jobType: "content_batch",
    status: "running",
    startedAt: "2026-03-10T08:45:00Z"
  }
];

export const metricsDaily: DailyMetric[] = [
  {
    id: "met_tc_1",
    productId: "prod_tc",
    metricDate: "2026-03-10",
    leadsFound: 18,
    leadsScored: 18,
    messagesGenerated: 9,
    messagesSent: 3,
    repliesReceived: 1,
    meetingsBooked: 1,
    trialsStarted: 0,
    conversions: 1,
    contentPublished: 0
  },
  {
    id: "met_np_1",
    productId: "prod_np",
    metricDate: "2026-03-10",
    leadsFound: 9,
    leadsScored: 9,
    messagesGenerated: 5,
    messagesSent: 0,
    repliesReceived: 0,
    meetingsBooked: 0,
    trialsStarted: 4,
    conversions: 1,
    contentPublished: 2
  },
  {
    id: "met_cr_1",
    productId: "prod_cr",
    metricDate: "2026-03-10",
    leadsFound: 7,
    leadsScored: 7,
    messagesGenerated: 3,
    messagesSent: 1,
    repliesReceived: 1,
    meetingsBooked: 0,
    trialsStarted: 3,
    conversions: 1,
    contentPublished: 3
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getProductBundle(slug: ProductSlug) {
  const product = getProductBySlug(slug);

  if (!product) {
    return null;
  }

  return {
    product,
    audiences: audiences.filter((item) => item.productId === product.id),
    offers: offers.filter((item) => item.productId === product.id),
    organizations: organizations.filter((item) => item.productId === product.id),
    contacts: contacts.filter((item) => item.productId === product.id),
    leads: leads.filter((item) => item.productId === product.id),
    campaigns: campaigns.filter((item) => item.productId === product.id),
    contentItems: contentItems.filter((item) => item.productId === product.id),
    outreachMessages: outreachMessages.filter((item) => item.productId === product.id),
    approvals: approvals.filter((item) => item.productId === product.id),
    playbooks: playbooks.filter((item) => item.productId === product.id),
    agentJobs: agentJobs.filter((item) => item.productId === product.id),
    metrics: metricsDaily.filter((item) => item.productId === product.id)
  };
}

export const navigation = [
  { href: "/products", label: "Products" },
  { href: "/leads", label: "Leads" },
  { href: "/campaigns", label: "Campaigns" },
  { href: "/content-studio", label: "Content Studio" },
  { href: "/outreach-queue", label: "Outreach Queue" },
  { href: "/approvals", label: "Approvals" },
  { href: "/analytics", label: "Analytics" }
];
