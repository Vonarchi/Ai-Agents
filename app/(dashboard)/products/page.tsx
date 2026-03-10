import Link from "next/link";

import { createProductAction, deleteProductAction, updateProductAction } from "@/app/actions/products";
import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCampaignWorkspace, getProducts, getProductWorkspaceBySlug } from "@/lib/supabase/queries";

export default async function ProductsPage() {
  const [products, campaignWorkspace] = await Promise.all([getProducts(), getCampaignWorkspace()]);
  const bundles = await Promise.all(products.map((product) => getProductWorkspaceBySlug(product.slug)));
  const liveBundles = bundles.filter((bundle) => bundle !== null);

  return (
    <PageShell
      eyebrow="Products"
      title="Multi-product workspace"
      description="Shared product architecture keeps offers, audiences, campaigns, and playbooks reusable while preserving product-specific growth logic."
      stats={[
        { label: "Products", value: String(products.length), detail: "Live product workspaces" },
        {
          label: "Offers",
          value: String(liveBundles.reduce((sum, bundle) => sum + bundle.offers.length, 0)),
          detail: "Lead magnets and CTA paths"
        },
        {
          label: "Audiences",
          value: String(campaignWorkspace.audiences.length),
          detail: "Reusable target segments"
        },
        {
          label: "Playbooks",
          value: String(liveBundles.reduce((sum, bundle) => sum + bundle.playbooks.length, 0)),
          detail: "Product-specific growth logic"
        }
      ]}
    >
      <Card className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ember">Create Product</p>
          <h3 className="mt-2 font-display text-2xl text-ink">Add a new Supabase-backed product</h3>
        </div>
        <form action={createProductAction} className="grid gap-3 md:grid-cols-4">
          <Input name="name" placeholder="Product name" />
          <Input name="slug" placeholder="product-slug" />
          <Input name="category" placeholder="Category" />
          <Input name="status" placeholder="active" />
          <Input name="websiteUrl" placeholder="https://example.com" />
          <Input name="primaryCta" placeholder="Book Demo" />
          <Input name="offerSummary" placeholder="Offer summary" />
          <Input name="targetMarketSummary" placeholder="Target market summary" />
          <button type="submit" className="rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-cream">
            Create Product
          </button>
        </form>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="space-y-5">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember">{product.category}</p>
                  <h3 className="mt-2 font-display text-3xl text-ink">{product.name}</h3>
                </div>
                <Badge tone={product.status === "active" ? "success" : "info"}>{product.status}</Badge>
              </div>
              <p className="text-sm leading-6 text-slate">{product.brief}</p>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">Primary CTA</p>
                <p className="text-sm text-ink">{product.primaryCta}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.channels.map((channel) => (
                  <span key={channel} className="rounded-full bg-ink/6 px-3 py-1 text-xs font-medium text-ink">
                    {channel}
                  </span>
                ))}
              </div>
            </div>

            <form action={updateProductAction} className="grid gap-3">
              <input type="hidden" name="id" value={product.id} />
              <Input name="name" defaultValue={product.name} />
              <Input name="slug" defaultValue={product.slug} />
              <div className="grid grid-cols-2 gap-3">
                <Input name="status" defaultValue={product.status} />
                <Input name="primaryCta" defaultValue={product.primaryCta} />
              </div>
              <button
                type="submit"
                className="rounded-2xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink transition hover:bg-cream"
              >
                Update
              </button>
            </form>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center justify-between rounded-2xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-cream"
              >
                Open workspace
                <span>01</span>
              </Link>
              <form action={deleteProductAction}>
                <input type="hidden" name="id" value={product.id} />
                <button
                  type="submit"
                  className="w-full rounded-2xl border border-rose-200 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  Delete
                </button>
              </form>
            </div>
          </Card>
        ))}
      </div>
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
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-slate outline-none transition focus:border-ember"
    />
  );
}
