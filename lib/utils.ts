import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateFR(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const [, h, m, s] = match;
  const parts: string[] = [];
  if (h) parts.push(`${h}h`);
  if (m) parts.push(`${m.padStart(h ? 2 : 1, '0')}min`);
  else if (h) parts.push('00min');
  if (!h && s && !m) parts.push(`${s}s`);
  return parts.join(' ');
}

export function formatViewCount(count: string | number): string {
  const n = typeof count === 'string' ? parseInt(count, 10) : count;
  if (Number.isNaN(n)) return '';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace('.0', '')} M vues`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace('.0', '')} k vues`;
  return `${n} vues`;
}
