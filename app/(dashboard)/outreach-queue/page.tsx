import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { campaigns, leads, outreachMessages, products } from "@/lib/data";

export default function OutreachQueuePage() {
  return (
    <PageShell
      eyebrow="Outreach Queue"
      title="Sequence drafts, approval gates, and send readiness"
      description="The Outreach Agent personalizes messages against campaigns and lead records, then applies approval rules so risky first-touch actions stay human-reviewed."
      stats={[
        { label: "Messages", value: String(outreachMessages.length), detail: "Drafted or queued sequence steps" },
        { label: "Approval Needed", value: String(outreachMessages.filter((item) => item.requiresApproval).length), detail: "Risk-gated items" },
        { label: "Ready to Send", value: String(outreachMessages.filter((item) => !item.requiresApproval).length), detail: "Auto-safe follow-up pool" },
        { label: "Channels", value: String(new Set(outreachMessages.map((item) => item.channel)).size), detail: "Email + DMs" }
      ]}
    >
      <div className="space-y-4">
        {outreachMessages.map((message) => {
          const product = products.find((item) => item.id === message.productId);
          const lead = leads.find((item) => item.id === message.leadId);
          const campaign = campaigns.find((item) => item.id === message.campaignId);

          return (
            <Card key={message.id} className="grid gap-5 xl:grid-cols-[0.35fr_0.65fr]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">{product?.name}</p>
                <h3 className="font-display text-2xl text-ink">{message.subject}</h3>
                <Badge tone={message.requiresApproval ? "warning" : "success"}>{message.status}</Badge>
                <div className="space-y-1 text-sm text-slate">
                  <p>{message.channel}</p>
                  <p>{message.sequenceStep}</p>
                  <p>{campaign?.name}</p>
                  <p>{lead?.lifecycleStage.replaceAll("_", " ")}</p>
                </div>
              </div>
              <div className="rounded-[24px] bg-cream p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">Draft Body</p>
                <p className="mt-3 text-sm leading-7 text-ink">{message.body}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
