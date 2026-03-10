import Link from "next/link";

import { signOutAction } from "@/app/actions/auth";

export function Topbar({
  productCount,
  leadsToday,
  approvalCount,
  conversions
}: {
  productCount: number;
  leadsToday: number;
  approvalCount: number;
  conversions: number;
}) {
  return (
    <header className="flex flex-col gap-4 rounded-[28px] border border-ink/10 bg-white/85 p-5 shadow-panel lg:flex-row lg:items-center lg:justify-between">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">MVP Control Room</p>
        <h2 className="mt-2 font-display text-3xl text-ink">Reusable multi-product growth system</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate">
          TrailerCheck is wired first, with Nursing and Chart Readi using the same campaign, content, approval, and analytics primitives.
        </p>
      </div>

      <div className="flex flex-col gap-3 xl:items-end">
        <form action={signOutAction}>
          <button
            type="submit"
            className="rounded-2xl border border-ink/10 px-4 py-3 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-cream"
          >
            Sign Out
          </button>
        </form>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="Products" value={String(productCount)} />
          <MetricCard label="Leads Today" value={String(leadsToday)} />
          <MetricCard label="Approvals" value={String(approvalCount)} link="/approvals" />
          <MetricCard label="Conversions" value={String(conversions)} />
        </div>
      </div>
    </header>
  );
}

function MetricCard({ label, value, link }: { label: string; value: string; link?: string }) {
  const content = (
    <div className="rounded-[22px] bg-cream px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">{label}</p>
      <p className="mt-2 font-display text-2xl text-ink">{value}</p>
    </div>
  );

  if (!link) {
    return content;
  }

  return <Link href={link}>{content}</Link>;
}
