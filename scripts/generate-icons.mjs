/**
 * Génère les variantes PNG des icônes (favicon, apple-touch, PWA)
 * depuis logo-mark.svg.
 *
 * Lancement : node scripts/generate-icons.mjs
 *
 * Sortie : /public/
 *  - favicon-32.png        (32×32,  fond transparent, marque noire)
 *  - apple-touch-icon.png  (180×180, fond bleu nuit, marque or pâle)
 *  - icon-192.png          (192×192, fond bleu nuit, marque or pâle)
 *  - icon-512.png          (512×512, fond bleu nuit, marque or pâle)
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const OUT = 'D:/Refonte site Bishop Amazou/alexandreamazou/public';

// Couleurs de la charte (extraites du tailwind.config — bleu nuit + or)
const COLORS = {
  primary: '#1a1a2e',
  light: '#fafaf8',
  secondary: '#c9a84c',
};

/**
 * Construit un SVG carré en mémoire avec la marque centrée + fond optionnel.
 * @param {object} opts
 * @param {string} opts.stroke  Couleur du tracé
 * @param {string|null} opts.bg Couleur de fond (null = transparent)
 * @param {number} opts.size    Dimension du SVG carré (px)
 * @param {number} opts.padding Marge intérieure (proportion 0..1)
 */
function buildSquareSvg({ stroke, bg, size = 512, padding = 0.18 }) {
  // La marque originale fait 130×50 (ratio 2.6:1) — on l'ajuste pour qu'elle
  // occupe (1 - 2*padding) de la largeur du carré.
  const innerWidth = size * (1 - 2 * padding);
  const scale = innerWidth / 130;
  const markHeight = 50 * scale;
  const offsetX = size * padding;
  const offsetY = (size - markHeight) / 2;
  const strokeWidth = 3 * scale;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg ? `<rect width="${size}" height="${size}" fill="${bg}" rx="${size * 0.18}"/>` : ''}
  <g transform="translate(${offsetX},${offsetY}) scale(${scale})" stroke="${stroke}" stroke-width="${strokeWidth / scale}" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M5 45 L35 5 L65 45"/>
    <path d="M65 45 L95 5 L125 45"/>
    <path d="M35 5 Q65 35 95 5"/>
  </g>
</svg>`;
}

const variants = [
  {
    out: 'favicon-32.png',
    size: 32,
    stroke: COLORS.primary,
    bg: null,
    padding: 0.1,
  },
  {
    out: 'apple-touch-icon.png',
    size: 180,
    stroke: COLORS.secondary,
    bg: COLORS.primary,
    padding: 0.18,
  },
  {
    out: 'icon-192.png',
    size: 192,
    stroke: COLORS.secondary,
    bg: COLORS.primary,
    padding: 0.18,
  },
  {
    out: 'icon-512.png',
    size: 512,
    stroke: COLORS.secondary,
    bg: COLORS.primary,
    padding: 0.18,
  },
];

for (const v of variants) {
  const svg = buildSquareSvg(v);
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  const dst = path.join(OUT, v.out);
  await writeFile(dst, png);
  console.log(`✓ ${v.out}  (${v.size}×${v.size}, ${(png.length / 1024).toFixed(1)} ko)`);
}

console.log('\nTerminé.');
