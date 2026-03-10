import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "neutral" && "bg-ink/6 text-ink",
        tone === "success" && "bg-moss/15 text-moss",
        tone === "warning" && "bg-amber-200/70 text-amber-900",
        tone === "danger" && "bg-rose-200/70 text-rose-900",
        tone === "info" && "bg-tide/30 text-ink"
      )}
    >
      {children}
    </span>
  );
}
