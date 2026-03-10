import { PageShell } from "@/components/dashboard/page-shell";
import { Card } from "@/components/ui/card";
import { agentJobs, campaigns, metricsDaily, products } from "@/lib/data";

const totals = metricsDaily.reduce(
  (acc, metric) => {
    acc.leadsFound += metric.leadsFound;
    acc.messagesSent += metric.messagesSent;
    acc.replies += metric.repliesReceived;
    acc.conversions += metric.conversions;
    acc.content += metric.contentPublished;
    return acc;
  },
  { leadsFound: 0, messagesSent: 0, replies: 0, conversions: 0, content: 0 }
);

export default function AnalyticsPage() {
  return (
    <PageShell
      eyebrow="Analytics"
      title="Daily metrics, performance summaries, and agent throughput"
      description="The Analytics Agent aggregates product-level metrics so the team can compare channels, spot bottlenecks, and prioritize the next workflow improvements."
      stats={[
        { label: "Leads Found", value: String(totals.leadsFound), detail: "Across all products today" },
        { label: "Messages Sent", value: String(totals.messagesSent), detail: "Outbound execution count" },
        { label: "Replies", value: String(totals.replies), detail: "Inbound signal captured" },
        { label: "Conversions", value: String(totals.conversions), detail: "Demo, trial, or subscription events" }
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <h3 className="font-display text-2xl text-ink">Product performance</h3>
          <div className="space-y-3">
            {products.map((product) => {
              const metric = metricsDaily.find((item) => item.productId === product.id);
              const campaign = campaigns.find((item) => item.productId === product.id);

              return (
                <div key={product.id} className="grid gap-3 rounded-[24px] bg-cream p-4 md:grid-cols-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">{product.name}</p>
                    <p className="mt-2 text-sm text-slate">{campaign?.name}</p>
                  </div>
                  <MetricCell label="Leads" value={String(metric?.leadsFound ?? 0)} />
                  <MetricCell label="Messages" value={String(metric?.messagesSent ?? 0)} />
                  <MetricCell label="Replies" value={String(metric?.repliesReceived ?? 0)} />
                  <MetricCell label="Conversions" value={String(metric?.conversions ?? 0)} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-display text-2xl text-ink">Agent run log</h3>
          {agentJobs.map((job) => (
            <div key={job.id} className="rounded-[22px] border border-ink/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{job.agentName}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate">{job.jobType}</p>
                </div>
                <span className="rounded-full bg-ink/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                  {job.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate">Started {new Date(job.startedAt).toLocaleString("en-US")}</p>
            </div>
          ))}
        </Card>
      </div>
    </PageShell>
  );
}

function MetricCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">{label}</p>
      <p className="mt-2 font-display text-2xl text-ink">{value}</p>
    </div>
  );
}
