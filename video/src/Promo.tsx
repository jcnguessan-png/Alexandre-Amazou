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
  { cover: 'livres/protocole-gloire.png', title: 'Le Protocole d’accès à la Gloire de Dieu', flat: true },
  { cover: 'livres/mon-journal-de-victoire.png', title: 'Mon Journal de Victoire', flat: true },
];

/** Couvertures à plat pour l'éventail « bibliothèque ». */
const LIBRARY = [
  'livres/la-faveur-des-peres-face.png',
  'livres/devenir-riche-pour-dieu-face.png',
  'livres/la-verite-sur-les-prieres-non-exaucees-face.png',
  'livres/protocole-gloire.png',
  'livres/preparer-et-reussir-une-nouvelle-annee.jpg',
  'livres/mon-journal-de-victoire.png',
  'livres/les-hommes-de-la-race-de-dieu-face.png',
  'livres/reussir-sa-vie-face.png',
  'livres/le-transfert-de-l-iniquite-face.png',
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

const Soundtrack: React.FC<{ vo: string | null; finAt: number }> = ({ vo, finAt }) => (
  <>
    {MEDIA.musique ? <Audio src={staticFile(MEDIA.musique)} volume={0.8} /> : null}
    {vo ? <Audio src={staticFile(vo)} /> : null}
    {MEDIA.pasteurFin ? (
      <Sequence from={s(finAt)}>
        <Audio src={staticFile(MEDIA.pasteurFin)} />
      </Sequence>
    ) : null}
  </>
);

/* ------------------------------------------------------------------ */
/* 16:9 — 60 s                                                         */
/* ------------------------------------------------------------------ */
export const PROMO_16x9_SECONDS = 60;

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
        { at: 41, dur: 5, el: <SceneLibrary covers={LIBRARY} /> },
        { at: 46, dur: 1.5, el: <SceneBlack /> },
        {
          at: 47.5,
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
              titleStart={30}
            />
          ),
        },
        { at: 53.5, dur: 6.5, el: <SceneEndCard /> },
      ]}
    />
    <Soundtrack vo={MEDIA.vo16x9} finAt={48} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* 9:16 — 30 s (accroche dans les 2 premières secondes, sous-titrée)   */
/* ------------------------------------------------------------------ */
export const PROMO_9x16_SECONDS = 30;

export const VO_9x16 = [
  { from: 0.2, to: 2, text: 'Trente ans. Une mission.' },
  { from: 2, to: 4, text: 'Transformer des personnes ordinaires en véritables leaders.' },
  { from: 4.2, to: 7, text: 'D’Abidjan à Montréal, de Paris à Genève.' },
  { from: 7, to: 10, text: 'Dix mille personnes chaque année.' },
  { from: 10.3, to: 19, text: 'Des enseignements qui se vivent.' },
  { from: 19.2, to: 22, text: 'Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com.' },
  { from: 22.3, to: 25.4, text: 'Votre histoire n’est pas terminée.' },
  { from: 25.6, to: 29.6, text: 'Abonnez-vous. Rejoignez le mouvement.' },
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
          dur: 2,
          el: (
            <SceneBroll
              src={MEDIA.broll.foule}
              label="B3 · FOULE"
              title="De l’ordinaire à l’extraordinaire"
              titleStart={1}
            />
          ),
        },
        { at: 4, dur: 3, el: <SceneCities /> },
        { at: 7, dur: 3, el: <SceneCounters stats={[{ value: 10000, label: 'personnes / an' }]} /> },
        { at: 10, dur: 9, el: <SceneBooks books={FEATURED_BOOKS.slice(0, 3)} /> },
        { at: 19, dur: 3, el: <SceneLibrary covers={LIBRARY.slice(0, 7)} /> },
        {
          at: 22,
          dur: 3.5,
          el: (
            <ScenePortrait
              src="bishop-sans-fond.png"
              title="Votre histoire n’est pas terminée."
              subtitle="Pasteur Alexandre AMAZOU"
              titleStart={8}
            />
          ),
        },
        { at: 25.5, dur: 4.5, el: <SceneEndCard /> },
      ]}
    />
    <Subtitles lines={VO_9x16} />
    <Soundtrack vo={MEDIA.vo9x16} finAt={22.3} />
  </AbsoluteFill>
);
