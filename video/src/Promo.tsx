import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { s } from './theme';
import { MEDIA } from './media';
import {
  SceneBlack,
  SceneBooks,
  SceneBroll,
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
 * Voix off découpée phrase par phrase : chaque phrase (from→to dans le MP3, en secondes) est
 * posée à `at` sur la timeline. Repères mesurés par détection de silences (ffmpeg silencedetect).
 * La phrase marquée `fin` est remplacée par l'enregistrement du Pasteur s'il est fourni.
 */
type VoClip = { at: number; from: number; to: number; text: string; fin?: boolean };

const Voice: React.FC<{ src: string | null; clips: VoClip[] }> = ({ src, clips }) => (
  <>
    {clips.map((c, i) => {
      const usePasteur = Boolean(c.fin && MEDIA.pasteurFin);
      const file = usePasteur ? MEDIA.pasteurFin : src;
      if (!file) return null;
      return (
        <Sequence key={i} from={s(c.at)} durationInFrames={usePasteur ? s(4) : s(c.to - c.from) + 3}>
          {usePasteur ? (
            <Audio src={staticFile(file)} />
          ) : (
            <Audio src={staticFile(file)} trimBefore={s(c.from)} trimAfter={s(c.to) + 3} />
          )}
        </Sequence>
      );
    })}
  </>
);

const Music: React.FC = () =>
  MEDIA.musique ? <Audio src={staticFile(MEDIA.musique)} volume={0.8} /> : null;

/** Sous-titres alignés sur les phrases placées. */
const toSubtitles = (clips: VoClip[]) =>
  clips.map((c) => ({ from: c.at, to: c.at + (c.to - c.from) + 0.35, text: c.text }));

/* ------------------------------------------------------------------ */
/* 16:9 — 60 s                                                         */
/* ------------------------------------------------------------------ */
export const PROMO_16x9_SECONDS = 60;

const VO_16x9: VoClip[] = [
  { at: 0.8, from: 0, to: 1.76, text: 'Il y a des voix… qu’on entend.' },
  { at: 4.6, from: 3.18, to: 5.41, text: 'Et il y a des voix… qui changent une vie.' },
  { at: 9.0, from: 7.19, to: 9.65, text: 'Depuis plus de trente ans, une mission…' },
  { at: 14.2, from: 10.59, to: 14.19, text: 'transformer des personnes ordinaires… en de véritables leaders.' },
  { at: 20.4, from: 15.43, to: 18.85, text: 'D’Abidjan à Montréal. De Paris à Genève.' },
  { at: 25.15, from: 19.84, to: 21.35, text: 'Dix mille personnes chaque année.' },
  { at: 26.75, from: 21.68, to: 22.88, text: 'Mille cinq cents leaders formés.' },
  { at: 29.0, from: 23.9, to: 25.89, text: 'Un enseignement… qui ne s’écoute pas seulement.' },
  { at: 31.15, from: 26.67, to: 27.08, text: 'Il se vit.' },
  {
    at: 41.1,
    from: 29.69,
    to: 35.46,
    text: 'Onze ouvrages pour bâtir votre victoire. Sur Amazon, à la Librairie Alliance, et sur alexandreamazou.com.',
  },
  { at: 49.4, from: 38.03, to: 39.98, text: 'Votre histoire… n’est pas terminée.', fin: true },
  { at: 55.0, from: 42.71, to: 44.87, text: 'Enseignements. Livres. Podcast.' },
  { at: 57.8, from: 45.61, to: 46.53, text: 'Rejoignez-nous.' },
];

export const Promo16x9: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Timeline
      shots={[
        { at: 0, dur: 4, el: <SceneOpening /> },
        { at: 4, dur: 4, el: <SceneBroll src={MEDIA.broll.bible} label="B1 · BIBLE DANS LA LUMIÈRE" /> },
        {
          at: 8,
          dur: 6,
          el: <ScenePortrait src="bishop-sans-fond.png" title="30 ans." subtitle="Une mission" align="right" />,
        },
        { at: 14, dur: 3, el: <SceneBroll src={MEDIA.broll.abidjan} label="B2 · ABIDJAN AU LEVER DU SOLEIL" /> },
        {
          at: 17,
          dur: 3,
          el: (
            <SceneBroll
              src={MEDIA.broll.foule}
              label="B3 · FOULE EN LOUANGE"
              title="De l’ordinaire à l’extraordinaire"
              titleStart={2}
            />
          ),
        },
        { at: 20, dur: 5, el: <SceneCities /> },
        { at: 25, dur: 4, el: <SceneCounters /> },
        { at: 29, dur: 2, el: <SceneBroll src={MEDIA.broll.pupitre} label="B4 · LIVRE SUR UN PUPITRE" /> },
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
              titleStart={36}
            />
          ),
        },
        { at: 54.2, dur: 5.8, el: <SceneEndCard /> },
      ]}
    />
    <Music />
    <Voice src={MEDIA.vo16x9} clips={VO_16x9} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* 9:16 — 30 s (accroche dans les 2 premières secondes, sous-titrée)   */
/* ------------------------------------------------------------------ */
export const PROMO_9x16_SECONDS = 30;

const VO_9x16: VoClip[] = [
  { at: 0.15, from: 0, to: 1.69, text: 'Trente ans. Une mission.' },
  { at: 2.1, from: 2.21, to: 5.48, text: 'Transformer des personnes ordinaires en véritables leaders.' },
  { at: 5.5, from: 6.08, to: 9.18, text: 'D’Abidjan à Montréal, de Paris à Genève.' },
  { at: 8.8, from: 9.7, to: 11.12, text: 'Dix mille personnes chaque année.' },
  { at: 10.4, from: 11.96, to: 13.53, text: 'Des enseignements qui se vivent.' },
  { at: 19.1, from: 16.73, to: 21.11, text: 'Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com.' },
  { at: 23.8, from: 21.82, to: 23.35, text: 'Votre histoire n’est pas terminée.', fin: true },
  { at: 27.0, from: 24.37, to: 24.94, text: 'Abonnez-vous.' },
  { at: 27.75, from: 25.24, to: 25.93, text: 'Rejoignez-nous.' },
];

export const Promo9x16: React.FC = () => (
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
        {
          at: 2,
          dur: 3.4,
          el: (
            <SceneBroll
              src={MEDIA.broll.foule9x16 ?? MEDIA.broll.foule}
              label="B3 · FOULE"
              title="De l’ordinaire à l’extraordinaire"
              titleStart={8}
            />
          ),
        },
        { at: 5.4, dur: 3.2, el: <SceneCities /> },
        { at: 8.6, dur: 1.7, el: <SceneCounters stats={[{ value: 10000, label: 'personnes / an' }]} /> },
        { at: 10.3, dur: 8.7, el: <SceneBooks books={FEATURED_BOOKS.slice(0, 3)} /> },
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
    <Subtitles lines={toSubtitles(VO_9x16)} />
    <Music />
    <Voice src={MEDIA.vo9x16} clips={VO_9x16} />
  </AbsoluteFill>
);
