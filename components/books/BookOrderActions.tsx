import { ShoppingCart, MessageCircle, Store } from 'lucide-react';
import type { Book } from '@/data/books';
import { siteConfig, buildBookWhatsAppUrl } from '@/lib/site-config';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * Trois canaux d'achat pour chaque livre :
 *  1. Amazon (lien direct si `amazonUrl` renseigné, sinon recherche Amazon)
 *  2. WhatsApp Librairie Alliance (message pré-rempli avec le titre du livre)
 *  3. Mention de la disponibilité physique à la Librairie Alliance (Abidjan)
 */
export function BookOrderActions({
  book,
  layout = 'stacked',
  className,
}: {
  book: Book;
  layout?: 'stacked' | 'inline';
  className?: string;
}) {
  const amazonHref = book.amazonUrl ?? siteConfig.bookOrder.amazonAuthorUrl;
  const whatsappHref = buildBookWhatsAppUrl(book.title);

  return (
    <div
      className={cn(
        layout === 'stacked' ? 'space-y-3' : 'flex flex-wrap gap-3',
        className,
      )}
    >
      <Button asChild variant="primary" size="md" className={layout === 'stacked' ? 'w-full' : undefined}>
        <a href={amazonHref} target="_blank" rel="noopener noreferrer">
          <ShoppingCart size={16} aria-hidden="true" />
          Acheter sur Amazon
        </a>
      </Button>

      <Button
        asChild
        variant="outline"
        size="md"
        className={cn(
          layout === 'stacked' ? 'w-full' : undefined,
          'border-[#25D366] !text-[#1f8a4a] hover:!bg-[#25D366] hover:!text-white',
        )}
      >
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={`Commander « ${book.title} » par WhatsApp`}>
          <MessageCircle size={16} aria-hidden="true" />
          Commander par WhatsApp
        </a>
      </Button>

      <p className="flex items-start gap-2 pt-2 text-xs leading-relaxed text-foreground/60">
        <Store size={14} aria-hidden="true" className="mt-0.5 flex-shrink-0 text-secondary" />
        <span>
          Également disponible en version papier à la{' '}
          <strong className="font-semibold text-primary">{siteConfig.bookOrder.bookstoreName}</strong>{' '}
          ({siteConfig.bookOrder.bookstoreCity}) — commande WhatsApp au{' '}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:text-secondary hover:underline"
          >
            {siteConfig.bookOrder.whatsappDisplay}
          </a>
          .
        </span>
      </p>
    </div>
  );
}
