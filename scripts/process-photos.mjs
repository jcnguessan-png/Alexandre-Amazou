/**
 * One-shot script to crop & optimise the pastoral couple photos.
 * Run via: node scripts/process-photos.mjs
 *
 * Source: D:\Refonte site Bishop Amazou\photos couple pastoral
 * Output: public/images/
 *
 * Strategy:
 *  - _MG_9810 (landscape, both face camera) → master shot
 *      • crop right portion → solo portrait of Pasteur (home hero)
 *      • full landscape → AboutTeaser + base for OG image
 *      • cover-resize 1200×630 → OG image
 *  - _MG_9805 (portrait, both face camera) → /a-propos hero
 *  - _MG_9809 (portrait, intimate, looking at each other) → Famille section
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'D:/Refonte site Bishop Amazou/photos couple pastoral';
const DST = 'D:/Refonte site Bishop Amazou/alexandreamazou/public/images';

await mkdir(DST, { recursive: true });

const tasks = [
  {
    label: 'Hero home — Pasteur solo (cropped from _MG_9810 right side)',
    out: 'pasteur-amazou-portrait.jpg',
    pipeline: () =>
      sharp(`${SRC}/_MG_9810.jpg.jpeg`)
        // _MG_9810 is 5760×3840. Pasteur is on the right.
        // Tighter crop: start at x=3050 to exclude the wife's shoulder.
        .extract({ left: 3050, top: 150, width: 2200, height: 2750 })
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(`${DST}/pasteur-amazou-portrait.jpg`),
  },
  {
    label: 'Couple landscape (resized from _MG_9810)',
    out: 'pasteur-amazou-couple-landscape.jpg',
    pipeline: () =>
      sharp(`${SRC}/_MG_9810.jpg.jpeg`)
        .resize({ width: 1600 })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(`${DST}/pasteur-amazou-couple-landscape.jpg`),
  },
  {
    label: 'OG image 1200×630 (cover-resize from _MG_9810)',
    out: 'og-image.jpg',
    pipeline: () =>
      sharp(`${SRC}/_MG_9810.jpg.jpeg`)
        .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(`${DST}/og-image.jpg`),
  },
  {
    label: '/a-propos hero — couple portrait (from _MG_9805)',
    out: 'pasteur-amazou-couple-portrait.jpg',
    pipeline: () =>
      sharp(`${SRC}/_MG_9805.jpg.jpeg`)
        .resize({ width: 1200 })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(`${DST}/pasteur-amazou-couple-portrait.jpg`),
  },
  {
    label: 'Famille — intimate couple (from _MG_9809)',
    out: 'pasteur-amazou-couple-famille.jpg',
    pipeline: () =>
      sharp(`${SRC}/_MG_9809.jpg.jpeg`)
        .resize({ width: 1200 })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(`${DST}/pasteur-amazou-couple-famille.jpg`),
  },
];

for (const task of tasks) {
  try {
    const info = await task.pipeline();
    const sizeKb = Math.round(info.size / 1024);
    console.log(`OK  ${task.out.padEnd(40)} ${info.width}×${info.height}  ${sizeKb} KB  — ${task.label}`);
  } catch (err) {
    console.error(`ERR ${task.out}: ${err.message}`);
  }
}
