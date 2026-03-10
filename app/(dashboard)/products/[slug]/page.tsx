import { notFound } from "next/navigation";

import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getProductWorkspaceBySlug } from "@/lib/supabase/queries";
import { formatPct } from "@/lib/utils";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bundle = await getProductWorkspaceBySlug(slug);

  if (!bundle) {
    notFound();
  }

  const latestMetric = bundle.metrics[0];
  const playbook = bundle.playbooks[0];

  return (
    <PageShell
      eyebrow="Product Detail"
      title={`${bundle.product.name} growth workspace`}
      description={bundle.product.brief}
      stats={[
        { label: "Leads", value: String(bundle.leads.length), detail: "Tracked in normalized pipeline" },
        { label: "Campaigns", value: String(bundle.campaigns.length), detail: "Offer-linked acquisition loops" },
        { label: "Pending Approval", value: String(bundle.approvals.length), detail: "Review-first risky actions" },
        {
          label: "Conversion Rate",
          value: latestMetric ? formatPct((latestMetric.conversions / Math.max(latestMetric.leadsFound, 1)) * 100) : "0.0%",
          detail: "Daily conversion snapshot"
        }
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Offer Agent Brief</p>
              <h3 className="mt-2 font-display text-3xl text-ink">{bundle.product.offerSummary}</h3>
            </div>
            <Badge tone="success">{bundle.product.primaryCta}</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">Target Market</p>
              <p className="mt-3 text-sm leading-6 text-slate">{bundle.product.targetMarketSummary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">Channels</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {bundle.product.channels.map((channel) => (
                  <span key={channel} className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-ink">
                    {channel}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {bundle.audiences.map((audience) => (
              <div key={audience.id} className="rounded-[22px] border border-ink/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">{audience.name}</p>
                <p className="mt-3 text-sm leading-6 text-slate">{audience.description}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate">Keywords</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {audience.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full bg-ink/6 px-3 py-1 text-xs text-ink">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Playbook</p>
            <h3 className="font-display text-2xl text-ink">{playbook?.name}</h3>
            <RuleGroup title="Discovery Rules" items={playbook?.discoveryRules ?? []} />
            <RuleGroup title="Scoring Rules" items={playbook?.scoringRules ?? []} />
            <RuleGroup title="Approval Rules" items={playbook?.approvalRules ?? []} />
          </Card>

          <Card className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Agent Activity</p>
            {bundle.agentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between rounded-[20px] bg-cream px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{job.agentName}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate">{job.jobType}</p>
                </div>
                <Badge tone={job.status === "completed" ? "success" : "warning"}>{job.status}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

function RuleGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate">
        {items.map((item) => (
          <li key={item} className="rounded-2xl bg-cream px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
