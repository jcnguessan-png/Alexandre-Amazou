import React from 'react';
import { Composition } from 'remotion';
import { FPS } from './theme';
import { Promo16x9, Promo9x16, PROMO_16x9_SECONDS, PROMO_9x16_SECONDS } from './Promo';
import { KitVisuels } from './kit/Visuels';
import { Livre15, Livre30, Livre6, LIVRE_15_SECONDS, LIVRE_30_SECONDS, LIVRE_6_SECONDS } from './livre/Trailer';
import { Noel15, Noel30, NOEL_15_SECONDS, NOEL_30_SECONDS } from './livre/Noel';

export const Root: React.FC = () => (
  <>
    {/* Vidéo promo du site */}
    <Composition id="Promo16x9" component={Promo16x9} durationInFrames={PROMO_16x9_SECONDS * FPS} fps={FPS} width={1920} height={1080} />
    <Composition id="Promo9x16" component={Promo9x16} durationInFrames={PROMO_9x16_SECONDS * FPS} fps={FPS} width={1080} height={1920} />

    {/* Bande-annonce du livre « Nouvelle année » — 9:16 (Reels, Stories) et 4:5 (fil d'actualité) */}
    <Composition id="Livre30-9x16" component={Livre30} durationInFrames={LIVRE_30_SECONDS * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="Livre30-9x16-femme" component={Livre30} defaultProps={{ dossier: 'vo' as const }} durationInFrames={LIVRE_30_SECONDS * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="Livre15-9x16" component={Livre15} durationInFrames={LIVRE_15_SECONDS * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="Livre6-9x16" component={Livre6} durationInFrames={LIVRE_6_SECONDS * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="Livre30-4x5" component={Livre30} durationInFrames={LIVRE_30_SECONDS * FPS} fps={FPS} width={1080} height={1350} />
    <Composition id="Livre15-4x5" component={Livre15} durationInFrames={LIVRE_15_SECONDS * FPS} fps={FPS} width={1080} height={1350} />
    {/* Déclinaison Noël */}
    <Composition id="Noel30-9x16" component={Noel30} durationInFrames={NOEL_30_SECONDS * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="Noel15-9x16" component={Noel15} durationInFrames={NOEL_15_SECONDS * FPS} fps={FPS} width={1080} height={1920} />
    <Composition id="Noel30-4x5" component={Noel30} durationInFrames={NOEL_30_SECONDS * FPS} fps={FPS} width={1080} height={1350} />
    <Composition id="Noel15-4x5" component={Noel15} durationInFrames={NOEL_15_SECONDS * FPS} fps={FPS} width={1080} height={1350} />

    {/* Visuels fixes du kit (PNG) */}
    <KitVisuels />
  </>
);
