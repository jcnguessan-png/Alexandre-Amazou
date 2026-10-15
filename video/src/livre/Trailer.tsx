import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { FPS, s } from '../theme';
import { SceneBroll, Subtitles } from '../scenes';
import {
  ANNEES,
  DUREES_LIVRE,
  MEDIA_LIVRE,
  VOIX_15,
  VOIX_30,
  VOIX_6,
  fichierVoixLivre,
  type Ligne,
} from './config';
import { SceneBookHero, SceneEndLivre, SceneImpact, SceneKinetic, SceneList } from './scenes';

type Shot = { at: number; dur: number; el: React.ReactNode };
type Clip = { at: number; dur: number; text: string; file: string };

const Timeline: React.FC<{ shots: Shot[] }> = ({ shots }) => (
  <>
    {shots.map((sh, i) => (
      <Sequence key={i} from={s(sh.at)} durationInFrames={s(sh.dur)}>
        {sh.el}
      </Sequence>
    ))}
  </>
);

const toClips = (format: '30' | '15' | '6', lignes: Ligne[]): Clip[] =>
  lignes.map((l) => {
    const file = fichierVoixLivre(format, l.id);
    return { at: l.at, dur: DUREES_LIVRE[file] ?? l.max, text: l.text, file };
  });

const Voice: React.FC<{ clips: Clip[] }> = ({ clips }) =>
  MEDIA_LIVRE.voix ? (
    <>
      {clips.map((c, i) => (
        <Sequence key={i} from={s(c.at)} durationInFrames={s(c.dur + 1)}>
          <Audio src={staticFile(c.file)} />
        </Sequence>
      ))}
    </>
  ) : null;

/** Musique avec baisse automatique sous la voix ; `trimStart` (s) pour n'en jouer que la fin. */
const Music: React.FC<{ src: string | null; clips: Clip[]; trimStart?: number }> = ({ src, clips, trimStart = 0 }) => {
  if (!src) return null;
  const volumeAt = (t: number) => {
    let v = 0.85;
    if (!MEDIA_LIVRE.voix) return v;
    for (const c of clips) {
      const a = c.at - 0.15;
      const b = c.at + c.dur + 0.15;
      if (t >= a && t <= b) v = Math.min(v, 0.42 + 0.43 * Math.max(0, 1 - Math.min(t - a, b - t) / 0.15));
    }
    return v;
  };
  return (
    <Audio
      src={staticFile(src)}
      trimBefore={trimStart ? s(trimStart) : undefined}
      volume={(f) => volumeAt(f / FPS)}
    />
  );
};

const subs = (clips: Clip[]) => clips.map((c) => ({ from: c.at, to: c.at + c.dur + 0.3, text: c.text }));

const ACCROCHE = `${ANNEES.prochaine} comme ${ANNEES.passee} ?`;

/* ------------------------------------------------------------------ */
/* 30 s                                                                */
/* ------------------------------------------------------------------ */
export const LIVRE_30_SECONDS = 30;

export const Livre30: React.FC = () => {
  const clips = toClips('30', VOIX_30);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Timeline
        shots={[
          {
            at: 0,
            dur: 2.6,
            el: <SceneBroll src={MEDIA_LIVRE.broll.calendrier} label="L1 · CALENDRIER" title={ACCROCHE} titleStart={2} />,
          },
          { at: 2.6, dur: 2.95, el: <SceneKinetic words={['Mêmes combats.', 'Mêmes blocages.', 'Mêmes déceptions.']} /> },
          {
            at: 5.55,
            dur: 2.75,
            el: (
              <SceneBroll
                src={MEDIA_LIVRE.broll.horloge}
                label="L2 · HORLOGE"
                title="Pas un simple changement de calendrier"
                titleStart={6}
              />
            ),
          },
          {
            at: 8.3,
            dur: 2.6,
            el: <SceneBroll src={MEDIA_LIVRE.broll.echecs} label="L3 · ÉCHECS" title="Un champ de bataille spirituel" titleStart={3} />,
          },
          { at: 10.9, dur: 3.4, el: <SceneBookHero /> },
          {
            at: 14.3,
            dur: 1.95,
            el: <SceneBroll src={MEDIA_LIVRE.broll.portes} label="L4 · PORTES" title="Les 4 portes de l’année" titleStart={2} />,
          },
          {
            at: 16.25,
            dur: 2.15,
            el: (
              <SceneList
                title="Les 4 armes de commandement"
                items={['La Prière de Commandement', 'La Puissance du Sacrifice', 'La Loi de l’Honneur', 'La Loi des Prémices']}
              />
            ),
          },
          {
            at: 18.4,
            dur: 2.5,
            el: <SceneList title="Un plan d’action" items={['Diagnostiquer', 'Combattre', 'Programmer']} />,
          },
          {
            at: 20.9,
            dur: 4.4,
            el: <SceneImpact line1="Ne subissez plus votre année." line2="Commandez-la." line2At={s(2.35)} />,
          },
          { at: 25.3, dur: 4.7, el: <SceneEndLivre /> },
        ]}
      />
      <Subtitles lines={subs(clips)} />
      <Music src={MEDIA_LIVRE.musique30} clips={clips} />
      <Voice clips={clips} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 15 s                                                                */
/* ------------------------------------------------------------------ */
export const LIVRE_15_SECONDS = 15;

export const Livre15: React.FC = () => {
  const clips = toClips('15', VOIX_15);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Timeline
        shots={[
          {
            at: 0,
            dur: 2.55,
            el: <SceneBroll src={MEDIA_LIVRE.broll.calendrier} label="L1 · CALENDRIER" title={ACCROCHE} titleStart={1} />,
          },
          {
            at: 2.55,
            dur: 2.45,
            el: <SceneBroll src={MEDIA_LIVRE.broll.echecs} label="L3 · ÉCHECS" title="Un champ de bataille spirituel" titleStart={4} />,
          },
          { at: 5.0, dur: 3.45, el: <SceneBookHero kicker="4 portes · 4 armes" /> },
          {
            at: 8.45,
            dur: 3.65,
            el: <SceneImpact line1="Ne subissez plus votre année." line2="Commandez-la." line2At={s(1.75)} />,
          },
          { at: 12.1, dur: 2.9, el: <SceneEndLivre /> },
        ]}
      />
      <Subtitles lines={subs(clips)} />
      <Music src={MEDIA_LIVRE.musique15} clips={clips} />
      <Voice clips={clips} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* 6 s (bumper)                                                        */
/* ------------------------------------------------------------------ */
export const LIVRE_6_SECONDS = 6;

export const Livre6: React.FC = () => {
  const clips = toClips('6', VOIX_6);
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <Timeline
        shots={[
          {
            at: 0,
            dur: 3.8,
            el: <SceneImpact line1="Ne subissez plus votre année." line2="Commandez-la." line2At={s(2.25)} />,
          },
          { at: 3.8, dur: 2.2, el: <SceneEndLivre /> },
        ]}
      />
      <Subtitles lines={subs(clips)} />
      <Music src={MEDIA_LIVRE.musique30} clips={clips} trimStart={21.5} />
      <Voice clips={clips} />
    </AbsoluteFill>
  );
};
