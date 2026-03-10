type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember">{eyebrow}</p> : null}
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {description ? <p className="max-w-3xl text-sm leading-6 text-slate">{description}</p> : null}
    </div>
  );
}
