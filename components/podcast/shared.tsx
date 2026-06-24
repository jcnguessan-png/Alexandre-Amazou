/** Petits éléments partagés entre le hub /podcast et les fiches /podcast/[slug]. */

export function Headphones({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4.5" height="7" rx="1.6" />
      <rect x="17" y="13" width="4.5" height="7" rx="1.6" />
    </svg>
  );
}

export function PlatformRow({
  label,
  href,
  withRss,
}: {
  label: string;
  href?: string;
  withRss?: boolean;
}) {
  return (
    <div className="row">
      <span className="name">
        {withRss ? (
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5 3a16 16 0 0 1 16 16h-3A13 13 0 0 0 5 6V3zm0 6a10 10 0 0 1 10 10h-3A7 7 0 0 0 5 12V9zm1.5 6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z" />
          </svg>
        ) : null}
        {label}
      </span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          Écouter <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span className="soon">À venir</span>
      )}
    </div>
  );
}
