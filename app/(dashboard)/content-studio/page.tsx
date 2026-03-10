import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { contentItems, products } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default function ContentStudioPage() {
  return (
    <PageShell
      eyebrow="Content Studio"
      title="Draft, review, and schedule cross-channel content"
      description="The Content Agent generates social, funnel, and landing drafts with product-aware CTA mapping. High-visibility pieces can be routed into approval before publishing."
      stats={[
        { label: "Drafts", value: String(contentItems.length), detail: "Queued or scheduled content items" },
        { label: "Needs Review", value: String(contentItems.filter((item) => item.requiresApproval).length), detail: "Human approval gated" },
        { label: "Scheduled", value: String(contentItems.filter((item) => item.status === "scheduled").length), detail: "Ready for owned-channel publish" },
        { label: "Platforms", value: String(new Set(contentItems.map((item) => item.platform)).size), detail: "Web + social coverage" }
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {contentItems.map((item) => {
          const product = products.find((product) => product.id === item.productId);

          return (
            <Card key={item.id} className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">{product?.name}</p>
                <Badge tone={item.requiresApproval ? "warning" : "success"}>{item.status}</Badge>
              </div>

              <div>
                <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-slate">{item.platform} • {item.contentType}</p>
              </div>

              <div className="rounded-[22px] bg-cream p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Hook</p>
                <p className="mt-2 text-sm leading-6 text-ink">{item.hook}</p>
              </div>

              <p className="text-sm leading-6 text-slate">{item.body}</p>

              <div className="flex flex-wrap gap-2">
                {item.hashtags.map((tag) => (
                  <span key={tag} className="rounded-full bg-ink/6 px-3 py-1 text-xs text-ink">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-slate">
                <span>{item.cta}</span>
                <span>{item.scheduledFor ? formatDate(item.scheduledFor) : "Unscheduled"}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
