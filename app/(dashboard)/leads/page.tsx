import { createLeadAction, deleteLeadAction, updateLeadAction } from "@/app/actions/leads";
import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getLeadWorkspace } from "@/lib/supabase/queries";
import { formatDate } from "@/lib/utils";

export default async function LeadsPage() {
  const { contacts, leads, organizations, products } = await getLeadWorkspace();

  return (
    <PageShell
      eyebrow="Leads"
      title="Organizations, contacts, and next actions"
      description="The lead workspace now reads from Supabase so prospecting, scoring, and outreach queues use the shared products, organizations, contacts, and leads tables."
      stats={[
        { label: "Leads", value: String(leads.length), detail: "Across all products" },
        { label: "Organizations", value: String(organizations.length), detail: "Companies, creators, and communities" },
        { label: "Contacts", value: String(contacts.length), detail: "Buyer and partner records" },
        { label: "Ready", value: String(leads.filter((lead) => lead.lifecycleStage.includes("outreach")).length), detail: "Queued for outbound or review" }
      ]}
    >
      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Create Lead</p>
          <h3 className="mt-2 font-display text-2xl text-ink">Insert a lead into the live pipeline</h3>
        </div>
        <form action={createLeadAction} className="grid gap-3 md:grid-cols-4">
          <select name="productId" className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-slate">
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          <Input name="organizationId" placeholder="Organization ID" />
          <Input name="contactId" placeholder="Contact ID" />
          <Input name="leadType" placeholder="Direct Outreach" />
          <Input name="sourceChannel" placeholder="Email" />
          <Input name="lifecycleStage" placeholder="new" />
          <Input name="fitScore" placeholder="80" />
          <Input name="intentScore" placeholder="60" />
          <Input name="owner" placeholder="Outreach Agent" />
          <Input name="tags" placeholder="fleet, safety-role" />
          <Input name="nextAction" placeholder="Review first touch" />
          <Input name="nextActionAt" placeholder="2026-03-12T15:00:00Z" />
          <button type="submit" className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-cream">
            Create Lead
          </button>
        </form>
      </Card>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-ink text-cream">
              <tr>
                {["Product", "Organization", "Contact", "Stage", "Scores", "Next Action", "Manage"].map((heading) => (
                  <th key={heading} className="px-5 py-4 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const product = products.find((item) => item.id === lead.productId);
                const org = organizations.find((item) => item.id === lead.organizationId);
                const contact = contacts.find((item) => item.id === lead.contactId);

                return (
                  <tr key={lead.id} className="border-t border-ink/8">
                    <td className="px-5 py-4 align-top">
                      <div className="font-semibold text-ink">{product?.name}</div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate">{lead.sourceChannel}</div>
                    </td>
                    <td className="px-5 py-4 align-top text-slate">{org?.name ?? "Unknown"}</td>
                    <td className="px-5 py-4 align-top">
                      <div className="font-medium text-ink">{contact?.fullName ?? "Unknown"}</div>
                      <div className="text-slate">{contact?.title ?? "No title"}</div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <Badge tone={lead.lifecycleStage === "ready_for_outreach" ? "warning" : "info"}>
                        {lead.lifecycleStage.replaceAll("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 align-top text-slate">
                      Fit {lead.fitScore} / Intent {lead.intentScore}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="max-w-xs text-slate">{lead.nextAction}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate">{formatDate(lead.nextActionAt)}</div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <form action={updateLeadAction} className="space-y-2">
                        <input type="hidden" name="id" value={lead.id} />
                        <Input name="owner" defaultValue={lead.owner} />
                        <Input name="lifecycleStage" defaultValue={lead.lifecycleStage} />
                        <div className="grid grid-cols-2 gap-2">
                          <Input name="fitScore" defaultValue={String(lead.fitScore)} />
                          <Input name="intentScore" defaultValue={String(lead.intentScore)} />
                        </div>
                        <Input name="nextAction" defaultValue={lead.nextAction} />
                        <button
                          type="submit"
                          className="w-full rounded-xl border border-ink/10 px-3 py-2 text-xs font-semibold text-ink transition hover:bg-cream"
                        >
                          Save
                        </button>
                      </form>
                      <form action={deleteLeadAction} className="mt-2">
                        <input type="hidden" name="id" value={lead.id} />
                        <button
                          type="submit"
                          className="w-full rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </PageShell>
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
      className="w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm text-slate outline-none transition focus:border-ember"
    />
  );
}
