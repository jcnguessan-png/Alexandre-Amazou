// Statistiques affichées sous le héros (copie dédiée à la Direction C).
const STATS = [
  { value: '30+', label: 'années de ministère' },
  { value: '11', label: 'ouvrages publiés' },
  { value: '1 500+', label: 'leaders formés' },
  { value: '10 000', label: "personnes / Conférence d'Abidjan" },
] as const;

export function StatsBand() {
  return (
    <section className="c-stats" aria-label="Le ministère en chiffres">
      <div className="row">
        {STATS.map((stat) => (
          <div className="s" key={stat.label}>
            <div className="v">{stat.value}</div>
            <div className="l">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
