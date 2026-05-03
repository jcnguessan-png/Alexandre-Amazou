export type TimelineItem = {
  year: string;
  title: string;
  description: string;
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-4 border-l-2 border-secondary/40">
      {items.map((item) => (
        <li key={`${item.year}-${item.title}`} className="ml-8 pb-10 last:pb-0">
          <span
            className="absolute -left-[9px] mt-1 block h-4 w-4 rounded-full border-2 border-secondary bg-background"
            aria-hidden="true"
          />
          <div className="text-sm font-semibold uppercase tracking-[0.15em] text-secondary">
            {item.year}
          </div>
          <h3 className="mt-1 text-xl font-semibold text-primary">{item.title}</h3>
          <p className="mt-2 leading-relaxed text-foreground/75">{item.description}</p>
        </li>
      ))}
    </ol>
  );
}
