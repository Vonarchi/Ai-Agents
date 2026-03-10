import { redirect } from "next/navigation";

import { signInAction } from "@/app/actions/auth";
import { hasSupabaseEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (hasSupabaseEnv()) {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/products");
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-ink/10 bg-white/85 shadow-panel lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative flex flex-col justify-between gap-10 bg-ink px-8 py-10 text-cream sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(141,185,181,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(191,91,61,0.22),_transparent_38%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-tide">JMD Tech Internal</p>
            <h1 className="mt-6 max-w-xl font-display text-5xl leading-tight text-cream">
              Centralize product growth without giving up human review.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-cream/78">
              The MVP unifies product briefs, lead discovery, content drafting, outreach approvals, and analytics across TrailerCheck, the nursing platform, and Chart Readi.
            </p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-3">
            <Stat title="Products" value="3" />
            <Stat title="Agents" value="8" />
            <Stat title="Guardrails" value="Review-first" />
          </div>
        </section>

        <section className="flex items-center px-8 py-10 sm:px-12">
          <div className="w-full">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">Login</p>
            <h2 className="mt-4 font-display text-4xl text-ink">Access the control room</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate">
              Sign in with Supabase Auth to access the dashboard. Until the environment variables are configured, local scaffolding stays accessible for development.
            </p>

            <form action={signInAction} className="mt-8 space-y-4">
              <Field label="Email" name="email" type="email" placeholder="ops@jmdtech.io" />
              <Field label="Password" name="password" type="password" placeholder="Enter your password" />
              {error ? <p className="text-sm text-rose-700">{error}</p> : null}
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-ink px-4 py-4 text-sm font-semibold text-cream transition hover:bg-ink/90"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 rounded-[24px] border border-ink/10 bg-cream p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate">Approval Policy</p>
              <p className="mt-3 text-sm leading-6 text-slate">
                First-touch outreach, influencer asks, and high-visibility content stay behind review gates. Drafting, scoring, and analytics remain automated.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type,
  placeholder
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-ink/10 bg-white px-4 py-4 text-sm text-slate outline-none transition focus:border-ember"
      />
    </label>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-tide">{title}</p>
      <p className="mt-3 font-display text-2xl text-cream">{value}</p>
    </div>
  );
}
