import { cn } from '@/lib/utils';

export function Quote({
  children,
  cite,
  reference,
  className,
}: {
  children: React.ReactNode;
  cite?: string;
  reference?: string;
  className?: string;
}) {
  return (
    <figure className={cn('my-8', className)}>
      <blockquote
        cite={cite}
        className="border-l-4 border-secondary bg-primary/[0.02] px-6 py-5 font-quote text-xl italic leading-relaxed text-primary/90"
      >
        {children}
      </blockquote>
      {reference ? (
        <figcaption className="mt-3 pl-6 text-sm font-medium text-foreground/60">
          — {reference}
        </figcaption>
      ) : null}
    </figure>
  );
}
