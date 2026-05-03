import { ministryStats } from '@/lib/site-config';

export function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-primary text-primary-foreground"
    >
      <div className="container py-16 md:py-20">
        <h2 id="stats-heading" className="sr-only">
          Le ministère en chiffres
        </h2>
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {ministryStats.map((stat, idx) => (
            <li
              key={stat.label}
              className="text-center motion-safe:animate-fade-up md:border-r md:border-primary-foreground/10 md:px-6 md:last:border-0"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              <div className="font-heading text-5xl font-semibold text-secondary md:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.15em] text-primary-foreground/70 md:text-base md:tracking-[0.1em] md:normal-case">
                {stat.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
