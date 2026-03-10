import { redirect } from "next/navigation";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { hasSupabaseEnv } from "@/lib/env";
import { getDashboardSummary, getProducts } from "@/lib/supabase/queries";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (hasSupabaseEnv()) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }
  }

  const [products, summary] = await Promise.all([getProducts(), getDashboardSummary()]);

  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <Sidebar products={products} />
        </div>
        <div className="space-y-4">
          <Topbar
            productCount={summary.productCount}
            leadsToday={summary.leadsToday}
            approvalCount={summary.approvalCount}
            conversions={summary.conversions}
          />
          {children}
        </div>
      </div>
    </main>
  );
}
