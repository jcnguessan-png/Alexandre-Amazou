import React from 'react';
import { AbsoluteFill, Audio, Sequence, random, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FPS, s } from '../theme';
import { SceneBroll, Subtitles } from '../scenes';
import { DUREES_LIVRE } from './config';
import { SceneBookHero, SceneEndLivre, SceneImpact, SceneKinetic } from './scenes';

/**
 * Déclinaison Noël de la bande-annonce : « offrez le livre à Noël ».
 * Médias privés : private/livre/noel/ (plans, voix Paul K, musique).
 */
const N = 'private/livre/noel/';
const BROLL = { cadeau: `${N}broll/cadeau.mp4`, sapin: `${N}broll/sapin.mp4`, mains: `${N}broll/mains.mp4` };
const MUSIQUE = `${N}musique-30.mp3`;

type Clip = { at: number; file: string; text: string };

const dur = (file: string) => DUREES_LIVRE[file] ?? 2;

/** Neige légère dorée et blanche, par-dessus toute la vidéo. */
const Neige: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {new Array(70).fill(0).map((_, i) => {
        const size = 3 + random(`n-s-${i}`) * 7;
        const speed = 0.8 + random(`n-v-${i}`) * 1.6;
        const x = random(`n-x-${i}`) * width + Math.sin(frame / (30 + i) + i) * 25;
        const y = (random(`n-y-${i}`) * height + frame * speed) % (height + 20);
        const gold = i % 4 === 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y - 10,
              width: size,
              height: size,
              borderRadius: '50%',
              background: gold ? '#e4c977' : '#fff8ea',
              opacity: gold ? 0.75 : 0.55,
              filter: size > 7 ? 'blur(1.5px)' : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Voix: React.FC<{ clips: Clip[] }> = ({ clips }) => (
  <>
    {clips.map((c, i) => (
      <Sequence key={i} from={s(c.at)} durationInFrames={s(dur(c.file) + 1)}>
        <Audio src={staticFile(c.file)} />
      </Sequence>
    ))}
  </>
);

const Musique: React.FC<{ clips: Clip[]; trimStart?: number }> = ({ clips, trimStart = 0 }) => {
  const volumeAt = (t: number) => {
    let v = 0.85;
    for (const c of clips) {
      const a = c.at - 0.15;
      const b = c.at + dur(c.file) + 0.15;
      if (t >= a && t <= b) v = Math.min(v, 0.42 + 0.43 * Math.max(0, 1 - Math.min(t - a, b - t) / 0.15));
    }
    return v;
  };
  return <Audio src={staticFile(MUSIQUE)} trimBefore={trimStart ? s(trimStart) : undefined} volume={(f) => volumeAt(f / FPS)} />;
};

const Plans: React.FC<{ shots: { at: number; dur: number; el: React.ReactNode }[] }> = ({ shots }) => (
  <>
    {shots.map((sh, i) => (
      <Sequence key={i} from={s(sh.at)} durationInFrames={s(sh.dur)}>
        {sh.el}
      </Sequence>
    ))}
  </>
);

const subs = (clips: Clip[]) => clips.map((c) => ({ from: c.at, to: c.at + dur(c.file) + 0.3, text: c.text }));

/* ------------------------------------------------------------------ */
/* 30 s                                                                */
/* ------------------------------------------------------------------ */
export const NOEL_30_SECONDS = 30;

const VOIX_NOEL_30: Clip[] = [
  { at: 0.3, file: `${N}vo/N-01.mp3`, text: 'Cette année… offrez plus qu’un cadeau.' },
  { at: 3.6, file: `${N}vo/N-02.mp3`, text: 'Offrez une année victorieuse !' },
  { at: 6.8, file: `${N}vo/N-03.mp3`, text: '« Comment préparer et réussir une nouvelle année », du Pasteur Alexandre Amazou.' },
  { at: 12.2, file: `${N}vo/N-04.mp3`, text: 'Le cadeau idéal pour vos proches, vos amis, votre famille spirituelle.' },
  { at: 16.8, file: `${N}vo/N-05.mp3`, text: 'Parce qu’une nouvelle année se prépare… avant qu’elle ne commence.' },
  { at: 21.3, file: `${N}vo/N-06.mp3`, text: 'Offrez-le à Noël !' },
  { at: 24.9, file: 'private/livre/vo-homme/30-11.mp3', text: 'Disponible dès maintenant sur Amazon.' },
];

export const Noel30: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Plans
      shots={[
        { at: 0, dur: 3.4, el: <SceneBroll src={BROLL.cadeau} label="N1" title="Cette année, à Noël…" titleStart={6} /> },
        { at: 3.4, dur: 3.2, el: <SceneBroll src={BROLL.mains} label="N3" title="Offrez une année victorieuse" titleStart={4} /> },
        { at: 6.6, dur: 5.4, el: <SceneBookHero kicker="Le cadeau idéal" /> },
        {
          at: 12.0,
          dur: 4.6,
          el: <SceneBroll src={BROLL.sapin} label="N2" title="Pour vos proches, vos amis, votre famille spirituelle" titleStart={6} />,
        },
        {
          at: 16.6,
          dur: 4.4,
          el: <SceneImpact line1="Une nouvelle année se prépare" line2="avant qu’elle commence." line2At={s(1.9)} />,
        },
        { at: 21.0, dur: 3.6, el: <SceneKinetic words={['Offrez-le à Noël.']} kicker="Le cadeau qui dure toute l’année" /> },
        { at: 24.6, dur: 5.4, el: <SceneEndLivre cta="Offrez-le à Noël →" /> },
      ]}
    />
    <Neige />
    <Subtitles lines={subs(VOIX_NOEL_30)} />
    <Musique clips={VOIX_NOEL_30} />
    <Voix clips={VOIX_NOEL_30} />
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* 15 s                                                                */
/* ------------------------------------------------------------------ */
export const NOEL_15_SECONDS = 15;

const VOIX_NOEL_15: Clip[] = [
  { at: 0.2, file: `${N}vo/N15-01.mp3`, text: 'Cette année, offrez plus qu’un cadeau : une année victorieuse !' },
  { at: 4.6, file: `${N}vo/N-03.mp3`, text: '« Comment préparer et réussir une nouvelle année », du Pasteur Alexandre Amazou.' },
  { at: 9.75, file: `${N}vo/N-06.mp3`, text: 'Offrez-le à Noël !' },
  { at: 11.8, file: 'private/livre/vo-homme/15-05.mp3', text: 'Disponible sur Amazon.' },
];

export const Noel15: React.FC = () => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Plans
      shots={[
        { at: 0, dur: 4.5, el: <SceneBroll src={BROLL.cadeau} label="N1" title="Offrez une année victorieuse" titleStart={8} /> },
        { at: 4.5, dur: 5.1, el: <SceneBookHero kicker="Le cadeau idéal" /> },
        { at: 9.6, dur: 2.0, el: <SceneKinetic words={['Offrez-le à Noël.']} /> },
        { at: 11.6, dur: 3.4, el: <SceneEndLivre cta="Offrez-le à Noël →" /> },
      ]}
    />
    <Neige />
    <Subtitles lines={subs(VOIX_NOEL_15)} />
    <Musique clips={VOIX_NOEL_15} trimStart={12} />
    <Voix clips={VOIX_NOEL_15} />
  </AbsoluteFill>
);
