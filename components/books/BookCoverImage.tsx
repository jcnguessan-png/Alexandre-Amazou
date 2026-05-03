'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Book } from '@/data/books';
import { cn } from '@/lib/utils';

/**
 * Image de couverture avec gestion d'erreur :
 * - Si la couverture WebP/PNG/JPG n'est pas encore déposée dans
 *   /public/images/livres, l'image se retire pour laisser apparaître le
 *   fallback éditorial rendu derrière.
 * - Les scans recto-verso (4ème de couv à gauche + 1ère de couv à droite)
 *   sont automatiquement recadrés sur la 1ère de couv via
 *   `object-position: right` lorsque `book.coverLayout === 'recto-verso'`.
 */
export function BookCoverImage({
  book,
  priority,
}: {
  book: Book;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const layout = book.coverLayout ?? 'recto-verso';
  const positionClass =
    layout === 'recto-verso'
      ? 'object-right'
      : layout === 'pub-poster'
        ? 'object-center'
        : 'object-center';

  return (
    <Image
      src={book.coverImage}
      alt={`Couverture du livre « ${book.title} » par Alexandre AMAZOU`}
      fill
      sizes="(max-width: 768px) 80vw, (max-width: 1280px) 33vw, 25vw"
      className={cn(
        'relative object-cover transition-transform duration-500 group-hover:scale-[1.02]',
        positionClass,
      )}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}
