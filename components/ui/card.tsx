import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-[28px] border border-ink/10 bg-white/90 p-6 shadow-panel", className)}>
      {children}
    </div>
  );
}
