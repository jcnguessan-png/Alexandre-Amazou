'use client';

import { useState, useMemo, useDeferredValue } from 'react';
import { Search, X } from 'lucide-react';
import type { Video, Playlist } from '@/lib/youtube';
import { VideoGrid } from './VideoGrid';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 12;

export function TeachingsBrowser({
  videos,
  playlists = [],
}: {
  videos: Video[];
  playlists?: Playlist[];
}) {
  const [query, setQuery] = useState('');
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const deferred = useDeferredValue(query);

  const filtered = useMemo(() => {
    let list = videos;
    if (activePlaylist) {
      list = list.filter((v) => v.playlistId === activePlaylist);
    }
    const q = deferred.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q),
      );
    }
    return list;
  }, [videos, deferred, activePlaylist]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const reset = () => {
    setQuery('');
    setActivePlaylist(null);
    setPage(1);
  };

  return (
    <div>
      {/* Recherche */}
      <div className="mb-6">
        <label htmlFor="teachings-search" className="sr-only">
          Rechercher un enseignement
        </label>
        <div className="relative max-w-xl">
          <Search
            aria-hidden="true"
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
          />
          <input
            id="teachings-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Rechercher un enseignement, un thème, un verset…"
            className="w-full rounded-md border border-border bg-background py-3 pl-12 pr-4 text-base text-foreground placeholder:text-foreground/40 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Effacer la recherche"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-foreground/50 hover:bg-muted hover:text-foreground"
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Filtres séries */}
      {playlists.length > 0 ? (
        <div role="group" aria-label="Filtrer par série" className="mb-10 flex flex-wrap gap-2">
          <FilterPill active={activePlaylist === null} onClick={() => { setActivePlaylist(null); setPage(1); }}>
            Toutes les séries
          </FilterPill>
          {playlists.map((p) => (
            <FilterPill
              key={p.id}
              active={activePlaylist === p.id}
              onClick={() => { setActivePlaylist(p.id); setPage(1); }}
            >
              {p.title}
              {p.itemCount ? <span className="ml-1.5 text-xs opacity-70">({p.itemCount})</span> : null}
            </FilterPill>
          ))}
        </div>
      ) : null}

      <p className="mb-6 text-sm text-foreground/60">
        {filtered.length} enseignement{filtered.length > 1 ? 's' : ''}
        {filtered.length !== videos.length ? ` sur ${videos.length}` : ''}
        {(query || activePlaylist) ? (
          <button
            type="button"
            onClick={reset}
            className="ml-3 text-secondary hover:underline"
          >
            Réinitialiser
          </button>
        ) : null}
      </p>

      <VideoGrid
        videos={visible}
        emptyMessage="Aucun enseignement ne correspond à votre recherche."
      />

      {pageCount > 1 ? (
        <Pagination current={safePage} total={pageCount} onChange={setPage} />
      ) : null}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition',
        active
          ? 'border-secondary bg-secondary text-secondary-foreground'
          : 'border-border bg-background text-foreground/70 hover:border-secondary/60 hover:text-primary',
      )}
    >
      {children}
    </button>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground/70 transition hover:border-secondary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Précédent
      </button>
      <ul className="mx-2 flex items-center gap-1">
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              onClick={() => onChange(p)}
              aria-current={current === p ? 'page' : undefined}
              aria-label={`Page ${p}`}
              className={cn(
                'min-w-[40px] rounded-md px-3 py-2 text-sm font-medium transition',
                current === p
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground/70 hover:bg-muted hover:text-primary',
              )}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground/70 transition hover:border-secondary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
      >
        Suivant
      </button>
    </nav>
  );
}
