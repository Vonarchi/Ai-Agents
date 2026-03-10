import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

type Stat = {
  label: string;
  value: string;
  detail: string;
};

export function PageShell({
  eyebrow,
  title,
  description,
  stats,
  children
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
  stats: Stat[];
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          <div className="grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-[22px] bg-cream px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">{stat.label}</p>
                <p className="mt-2 font-display text-3xl text-ink">{stat.value}</p>
                <p className="mt-2 text-sm text-slate">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
      {children}
    </div>
  );
}
