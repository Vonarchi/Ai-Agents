"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Sidebar({ products }: { products: Product[] }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col justify-between rounded-[32px] border border-white/40 bg-ink px-5 py-6 text-cream shadow-panel">
      <div className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-tide">JMD Tech</p>
          <h1 className="mt-3 font-display text-3xl">Growth Engine</h1>
          <p className="mt-3 text-sm leading-6 text-cream/72">
            Shared growth ops infrastructure for product launches, outreach, and approvals.
          </p>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition",
                  active ? "bg-white text-ink" : "text-cream/80 hover:bg-white/10 hover:text-cream"
                )}
              >
                <span>{item.label}</span>
                <span className="text-xs uppercase tracking-[0.16em]">{String(item.label.length).padStart(2, "0")}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/6 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide">Products Live</p>
        <div className="mt-4 space-y-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="block rounded-2xl border border-white/10 px-3 py-3 text-sm transition hover:border-white/30 hover:bg-white/8"
            >
              <div className="flex items-center justify-between gap-3">
                <span>{product.name}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-cream/60">{product.status}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
