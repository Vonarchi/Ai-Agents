import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { approvals, contentItems, outreachMessages, products } from "@/lib/data";

export default function ApprovalsPage() {
  return (
    <PageShell
      eyebrow="Approvals"
      title="Human review queue for risky actions"
      description="Review is enforced for first-touch outreach, partnerships, high-visibility content, and unusual external interactions. This queue is the hard stop between draft generation and third-party execution."
      stats={[
        { label: "Pending", value: String(approvals.filter((item) => item.status === "pending").length), detail: "Items waiting for review" },
        { label: "High Priority", value: String(approvals.filter((item) => item.priority === "high").length), detail: "Urgent reviewer attention" },
        { label: "Outreach", value: String(approvals.filter((item) => item.itemType === "outreach_message").length), detail: "First-touch and partner asks" },
        { label: "Content", value: String(approvals.filter((item) => item.itemType === "content_item").length), detail: "High-visibility publishing" }
      ]}
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {approvals.map((approval) => {
          const product = products.find((item) => item.id === approval.productId);
          const message = outreachMessages.find((item) => item.id === approval.itemId);
          const content = contentItems.find((item) => item.id === approval.itemId);

          return (
            <Card key={approval.id} className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">{product?.name}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{approval.itemType.replaceAll("_", " ")}</h3>
                </div>
                <Badge tone={approval.priority === "high" ? "danger" : "warning"}>{approval.priority}</Badge>
              </div>

              <p className="text-sm leading-6 text-slate">{approval.reason}</p>

              <div className="rounded-[22px] bg-cream p-4 text-sm leading-6 text-ink">
                {message ? message.subject : content?.title}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate">Status: {approval.status}</span>
                <span className="font-medium text-ink">Review required</span>
              </div>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}
