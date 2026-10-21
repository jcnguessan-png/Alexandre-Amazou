import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { FPS, s } from './theme';
import { MEDIA } from './media';
import { DUREES, VOIX_16x9, VOIX_9x16, fichierVoix, type Ligne } from './voix';
import {
  SceneBlack,
  SceneBooks,
  SceneBroll,
  SceneClip,
  SceneCities,
  SceneCounters,
  SceneEndCard,
  SceneLibrary,
  SceneOpening,
  ScenePortrait,
  Subtitles,
  type Book,
} from './scenes';

/** Les 4 livres de la séquence « portes ». */
export const FEATURED_BOOKS: Book[] = [
  { cover: 'livres/realite-monde-esprits-2026.png', title: 'La Réalité du Monde des Esprits', flat: false },
  { cover: 'livres/40-jours-combat-spirituel.png', title: '40 Jours de Combat Spirituel', flat: false },
  {
    cover: 'livres/preparer-et-reussir-une-nouvelle-annee.jpg',
    title: 'Comment préparer et réussir une nouvelle année ?',
    flat: true,
  },
  { cover: 'livres/mon-journal-de-victoire.png', title: 'Mon Journal de Victoire', flat: true },
];

/**
 * Couvertures à plat pour l'éventail « bibliothèque ». Les titres récents sont au centre
 * (la version verticale n'utilise que les 7 premières, les plus anciens sont en fin de liste).
 */
const LIBRARY = [
  'livres/la-faveur-des-peres-face.png',
  'livres/devenir-riche-pour-dieu-face.png',
  'livres/la-verite-sur-les-prieres-non-exaucees-face.png',
  'livres/mon-journal-de-victoire.png',
  'livres/preparer-et-reussir-une-nouvelle-annee.jpg',
  'livres/les-hommes-de-la-race-de-dieu-face.png',
  'livres/reussir-sa-vie-face.png',
  'livres/le-transfert-de-l-iniquite-face.png',
  'livres/protocole-gloire.png',
];

type Shot = { at: number; dur: number; el: React.ReactNode };

const Timeline: React.FC<{ shots: Shot[] }> = ({ shots }) => (
  <>
    {shots.map((sh, i) => (
      <Sequence key={i} from={s(sh.at)} durationInFrames={s(sh.dur)}>
        {sh.el}
      </Sequence>
    ))}
  </>
);

/**
 * Voix off : une phrase par fichier, posée à `at` (voir src/voix.ts).
 * La phrase marquée `fin` est remplacée par l'enregistrement du Pasteur s'il est fourni.
 */
type VoClip = { at: number; dur: number; text: string; file: string; fin?: boolean };

const toClips = (format: '16x9' | '9x16', lignes: Ligne[]): VoClip[] =>
  MEDIA.voixDynamique
    ? lignes.map((l) => {
        const file = fichierVoix(format, l.id);
        return { at: l.at, dur: DUREES[file] ?? l.max, text: l.text, file, fin: l.fin };
      })
    : [];

const Voice: React.FC<{ clips: VoClip[] }> = ({ clips }) => (
  <>
    {clips.map((c, i) => {
      const file = c.fin && MEDIA.pasteurFin ? MEDIA.pasteurFin : c.file;
      return (
        <Sequence key={i} from={s(c.at)} durationInFrames={s(c.dur + 2)}>
          <Audio src={staticFile(file)} />
        </Sequence>
      );
    })}
  </>
);

/**
 * Musique recalée et mixée :
 * - `offset` (s) : > 0 retarde la piste, < 0 l'avance (on coupe son début) pour caler l'impact ;
 * - baisse automatique sous la voix (ducking) ;
 * - `silences` : coupures franches créées au mixage (la piste générée n'en a pas).
 */
const Music: React.FC<{
  src: string | null;
  clips: VoClip[];
  offset?: number;
  silences?: [number, number][];
}> = ({ src, clips, offset = 0, silences = [] }) => {
  if (!src) return null;
  const BASE = 0.85;
  const DUCK = 0.42;
  const RAMP = 0.15;
  const volumeAt = (t: number) => {
    for (const [a, b] of silences) {
      if (t >= a && t <= b) return 0;
      if (t > a - 0.12 && t < a) return BASE * ((a - t) / 0.12);
      if (t > b && t < b + 0.15) return BASE * ((t - b) / 0.15);
    }
    let v = BASE;
    for (const c of clips) {
      const start = c.at - RAMP;
      const end = c.at + c.dur + RAMP;
      if (t >= start && t <= end) {
        const k = Math.min(1, (t - start) / RAMP, (end - t) / RAMP);
        v = Math.min(v, BASE - (BASE - DUCK) * Math.max(0, k));
      }
    }
    return v;
  };
  const from = Math.max(0, s(offset));
  return (
    <Sequence from={from}>
      <Audio
        src={staticFile(src)}
        trimBefore={offset < 0 ? s(-offset) : undefined}
        volume={(f) => volumeAt((f + from) / FPS)}
      />
    </Sequence>
  );
};

/** Sous-titres alignés sur les phrases placées. */
const toSubtitles = (clips: VoClip[]) => clips.map((c) => ({ from: c.at, to: c.at + c.dur + 0.3, text: c.text }));

/** Extraits réels du Pasteur dans la vidéo de biographie (source 1920×1080). */
const BIO = 'private/bio.mp4';
const CLIP = {
  scene: { from: 11.0, crop: { scale: 1.06 } }, // prédication, scène rouge (11,0–12,2 dans la source)
  bleu: { from: 44.3, crop: { scale: 1.58 } }, // costume bleu (sort du cadre « pellicule »)
  geste: { from: 46.4, crop: { scale: 1.58 } }, // costume bleu, geste vers la salle
};

/* ------------------------------------------------------------------ */
/* 16:9 — 60 s                                                         */
/* ------------------------------------------------------------------ */
export const PROMO_16x9_SECONDS = 60;

export const Promo16x9: React.FC = () => {
  const clips = toClips('16x9', VOIX_16x9);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Timeline
        shots={[
          { at: 0, dur: 2.5, el: <SceneOpening /> },
          { at: 2.5, dur: 3, el: <SceneBroll src={MEDIA.broll.bible} label="B1 · BIBLE DANS LA LUMIÈRE" /> },
          {
            at: 5.5,
            dur: 2.5,
            el: (
              <ScenePortrait
                src="bishop-sans-fond.png"
                title="30 ans."
                subtitle="Une mission"
                align="right"
                titleStart={6}
              />
            ),
          },
          { at: 8.0, dur: 1.2, el: <SceneClip src={BIO} {...CLIP.scene} /> },
          { at: 9.2, dur: 2.4, el: <SceneClip src={BIO} {...CLIP.bleu} /> },
          { at: 11.6, dur: 2.2, el: <SceneBroll src={MEDIA.broll.abidjan} label="B2 · ABIDJAN" /> },
          {
            at: 13.8,
            dur: 2.8,
            el: (
              <SceneBroll
                src={MEDIA.broll.foule}
                label="B3 · FOULE EN LOUANGE"
                title="De l’ordinaire à l’extraordinaire"
                titleStart={4}
              />
            ),
          },
          { at: 16.6, dur: 1.8, el: <SceneClip src={BIO} {...CLIP.geste} /> },
          { at: 18.4, dur: 5.4, el: <SceneCities /> },
          { at: 23.8, dur: 4.7, el: <SceneCounters /> },
          { at: 28.5, dur: 2.5, el: <SceneBroll src={MEDIA.broll.pupitre} label="B4 · LIVRE SUR UN PUPITRE" /> },
          { at: 31, dur: 10, el: <SceneBooks books={FEATURED_BOOKS} /> },
          { at: 41, dur: 6, el: <SceneLibrary covers={LIBRARY} /> },
          { at: 47, dur: 1.2, el: <SceneBlack /> },
          {
            at: 48.2,
            dur: 6,
            el: (
              <ScenePortrait
                src="bishop-hero.webp"
                title="Votre histoire n’est pas terminée."
                subtitle="Pasteur Alexandre AMAZOU"
                align="left"
                burst
                zoomFrom={1.18}
                zoomTo={1.02}
                titleStart={24}
              />
            ),
          },
          { at: 54.2, dur: 5.8, el: <SceneEndCard /> },
        ]}
      />
      <Music src={MEDIA.musique} clips={clips} offset={-1} silences={[[47.0, 48.15]]} />
      <Voice clips={clips} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 9:16 — 30 s (accroche dans les 2 premières secondes, sous-titrée)   */
/* ------------------------------------------------------------------ */
export const PROMO_9x16_SECONDS = 30;

export const Promo9x16: React.FC = () => {
  const clips = toClips('9x16', VOIX_9x16);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Timeline
        shots={[
          {
            at: 0,
            dur: 2,
            el: (
              <ScenePortrait
                src="bishop-hero.webp"
                title="30 ans. Une mission."
                burst
                zoomFrom={1.1}
                zoomTo={1}
                titleStart={2}
              />
            ),
          },
          { at: 2, dur: 1, el: <SceneClip src={BIO} {...CLIP.scene} crop={{ scale: 1, x: 40 }} /> },
          {
            at: 3,
            dur: 2.4,
            el: (
              <SceneBroll
                src={MEDIA.broll.foule9x16 ?? MEDIA.broll.foule}
                label="B3 · FOULE"
                title="De l’ordinaire à l’extraordinaire"
                titleStart={4}
              />
            ),
          },
          { at: 5.4, dur: 3.2, el: <SceneCities /> },
          { at: 8.6, dur: 1.2, el: <SceneCounters stats={[{ value: 10000, label: 'personnes / an' }]} /> },
          { at: 9.8, dur: 9.2, el: <SceneBooks books={FEATURED_BOOKS.slice(0, 3)} /> },
          { at: 19, dur: 4.6, el: <SceneLibrary covers={LIBRARY.slice(0, 7)} /> },
          {
            at: 23.6,
            dur: 3,
            el: (
              <ScenePortrait
                src="bishop-sans-fond.png"
                title="Votre histoire n’est pas terminée."
                subtitle="Pasteur Alexandre AMAZOU"
                titleStart={6}
              />
            ),
          },
          { at: 26.6, dur: 3.4, el: <SceneEndCard /> },
        ]}
      />
      <Subtitles lines={toSubtitles(clips)} />
      <Music src={MEDIA.musique9x16} clips={clips} offset={0.4} />
      <Voice clips={clips} />
    </AbsoluteFill>
  );
};
