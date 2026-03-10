import { createCampaignAction, deleteCampaignAction, updateCampaignAction } from "@/app/actions/campaigns";
import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCampaignWorkspace } from "@/lib/supabase/queries";
import { formatPct } from "@/lib/utils";

export default async function CampaignsPage() {
  const { audiences, campaigns, offers, products } = await getCampaignWorkspace();
  const topCvr = campaigns.length > 0 ? Math.max(...campaigns.map((item) => item.conversionRate)) : 0;

  return (
    <PageShell
      eyebrow="Campaigns"
      title="Offers, channels, and conversion loops"
      description="Campaigns now read from Supabase so the outreach and content workspaces can operate on live campaign objects instead of seed data."
      stats={[
        { label: "Campaigns", value: String(campaigns.length), detail: "Cross-product acquisition loops" },
        { label: "Active", value: String(campaigns.filter((item) => item.status === "active").length), detail: "Currently running" },
        { label: "Draft", value: String(campaigns.filter((item) => item.status === "draft").length), detail: "Waiting for launch prep" },
        { label: "Top CVR", value: formatPct(topCvr), detail: "Best current campaign" }
      ]}
    >
      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Create Campaign</p>
          <h3 className="mt-2 font-display text-2xl text-ink">Add a live campaign record</h3>
        </div>
        <form action={createCampaignAction} className="grid gap-3 md:grid-cols-4">
          <select name="productId" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-slate">
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <Input name="name" placeholder="Campaign name" />
          <Input name="campaignType" placeholder="Outbound" />
          <Input name="objective" placeholder="Book demos" />
          <Input name="channel" placeholder="Email" />
          <select name="audienceId" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-slate">
            <option value="">No audience</option>
            {audiences.map((audience) => (
              <option key={audience.id} value={audience.id}>
                {audience.name}
              </option>
            ))}
          </select>
          <select name="offerId" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-slate">
            <option value="">No offer</option>
            {offers.map((offer) => (
              <option key={offer.id} value={offer.id}>
                {offer.name}
              </option>
            ))}
          </select>
          <Input name="status" placeholder="draft" />
          <Input name="conversionRate" placeholder="0" />
          <button type="submit" className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-cream">
            Create Campaign
          </button>
        </form>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        {campaigns.map((campaign) => {
          const product = products.find((item) => item.id === campaign.productId);
          const audience = audiences.find((item) => item.id === campaign.audienceId);
          const offer = offers.find((item) => item.id === campaign.offerId);

          return (
            <Card key={campaign.id} className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">{product?.name}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink">{campaign.name}</h3>
                </div>
                <Badge tone={campaign.status === "active" ? "success" : "info"}>{campaign.status}</Badge>
              </div>

              <p className="text-sm leading-6 text-slate">{campaign.objective}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <MiniMetric label="Channel" value={campaign.channel} />
                <MiniMetric label="CVR" value={formatPct(campaign.conversionRate)} />
                <MiniMetric label="Audience" value={audience?.name ?? "Unknown"} />
                <MiniMetric label="Offer" value={offer?.name ?? "Unknown"} />
              </div>

              <form action={updateCampaignAction} className="grid gap-3">
                <input type="hidden" name="id" value={campaign.id} />
                <Input name="name" defaultValue={campaign.name} />
                <Input name="objective" defaultValue={campaign.objective} />
                <div className="grid grid-cols-3 gap-3">
                  <Input name="status" defaultValue={campaign.status} />
                  <Input name="channel" defaultValue={campaign.channel} />
                  <Input name="conversionRate" defaultValue={String(campaign.conversionRate)} />
                </div>
                <button
                  type="submit"
                  className="rounded-2xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cream"
                >
                  Update
                </button>
              </form>

              <form action={deleteCampaignAction}>
                <input type="hidden" name="id" value={campaign.id} />
                <button
                  type="submit"
                  className="w-full rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  Delete
                </button>
              </form>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-cream px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">{label}</p>
      <p className="mt-2 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function Input({
  name,
  placeholder,
  defaultValue
}: {
  name: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-slate outline-none transition focus:border-ember"
    />
  );
}
