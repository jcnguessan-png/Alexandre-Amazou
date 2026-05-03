import { cn } from '@/lib/utils';

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  className,
  as = 'h2',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  invert?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const Heading = as;
  return (
    <header
      className={cn(
        'mb-10 max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'mb-3 text-xs font-semibold uppercase tracking-[0.18em]',
            invert ? 'text-secondary' : 'text-secondary',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          'text-balance text-display-md font-semibold',
          invert ? 'text-primary-foreground' : 'text-primary',
        )}
      >
        {title}
      </Heading>
      <span
        className={cn(
          'mt-5 block h-[2px] w-12 bg-secondary',
          align === 'center' && 'mx-auto',
        )}
        aria-hidden="true"
      />
      {description ? (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed',
            invert ? 'text-primary-foreground/80' : 'text-foreground/75',
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
