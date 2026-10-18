import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { C, FPS, GOLD_GRADIENT, s } from '../theme';
import { FilmFinish, GoldDust, GoldTitle, LightRays, useSceneFade } from '../fx';
import { Subtitles } from '../scenes';
import { CATALOGUE, DUREES_CATALOGUE, VO, type Livre } from './config';

/**
 * Vidéo catalogue des livres du Pasteur, diffusée avant et après ses enseignements
 * (YouTube, Facebook, TikTok). Voix off Paul K, sans présentateur.
 */

const dur = (file: string) => DUREES_CATALOGUE[file] ?? 3;
const useU = () => {
  const { width, height } = useVideoConfig();
  return { u: Math.min(width, height) / 1080, vertical: height > width, height, width };
};

const gold: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/** Couverture provisoire aux couleurs du site quand l'image n'existe pas encore. */
const CouvertureProvisoire: React.FC<{ titre: string; hauteur: number }> = ({ titre, hauteur }) => (
  <div
    style={{
      height: hauteur,
      width: hauteur * 0.64,
      background: `linear-gradient(160deg, ${C.navy600}, ${C.ink})`,
      border: `${hauteur * 0.006}px solid ${C.gold}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: hauteur * 0.06,
      gap: hauteur * 0.05,
    }}
  >
    <div style={{ fontFamily: C.sans, fontSize: hauteur * 0.035, letterSpacing: '0.25em', color: C.gold }}>ALEXANDRE AMAZOU</div>
    <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: hauteur * 0.085, lineHeight: 1.05, textAlign: 'center', ...gold }}>{titre}</div>
  </div>
);

const Couverture: React.FC<{ livre: Livre; hauteur: number; style?: React.CSSProperties }> = ({ livre, hauteur, style }) =>
  livre.couverture ? (
    <Img
      src={staticFile(livre.couverture)}
      style={{
        height: hauteur,
        display: 'block',
        boxShadow: livre.maquette ? undefined : `-24px 34px 70px rgba(0,0,0,0.7)`,
        filter: livre.maquette ? 'drop-shadow(-18px 26px 40px rgba(0,0,0,0.7))' : undefined,
        ...style,
      }}
    />
  ) : (
    <div style={{ boxShadow: `-24px 34px 70px rgba(0,0,0,0.7)`, ...style }}>
      <CouvertureProvisoire titre={livre.titre} hauteur={hauteur} />
    </div>
  );

/* ------------------------------------------------------------------ */
/* Un livre                                                            */
/* ------------------------------------------------------------------ */
const SceneLivre: React.FC<{ livre: Livre; index: number; total: number }> = ({ livre, index, total }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, vertical, height } = useU();
  const sp = spring({ frame, fps, config: { damping: 18 }, durationInFrames: 26 });
  const rot = interpolate(sp, [0, 1], [-60, -12]) + interpolate(frame, [0, durationInFrames], [0, 5]);
  const sweep = interpolate(frame, [8, 34], [-40, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const hauteur = height * (vertical ? 0.44 : 0.66);
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 5, 5) }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 45% 55% at ${vertical ? '50% 34%' : '30% 50%'}, rgba(228,201,119,${0.28 * sp}), transparent 70%)`,
        }}
      />
      <LightRays intensity={0.45} originX={vertical ? 50 : 30} />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: vertical ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: (vertical ? 60 : 110) * u,
          padding: vertical ? `${120 * u}px ${70 * u}px ${330 * u}px` : `0 ${140 * u}px`,
        }}
      >
        <div style={{ perspective: 1800 * u, flex: 'none' }}>
          <div style={{ position: 'relative', transform: `rotateY(${rot}deg)`, transformOrigin: '0% 50%' }}>
            <Couverture livre={livre} hauteur={hauteur} />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(105deg, transparent ${sweep - 18}%, rgba(255,255,255,0.35) ${sweep}%, transparent ${sweep + 18}%)`,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>
        <div style={{ maxWidth: vertical ? '100%' : 900 * u, display: 'flex', flexDirection: 'column', gap: 22 * u, alignItems: vertical ? 'center' : 'flex-start' }}>
          <div style={{ fontFamily: C.sans, fontWeight: 600, fontSize: 26 * u, letterSpacing: '0.3em', color: C.gold, opacity: sp }}>
            {String(index + 1).padStart(2, '0')} / {total}
          </div>
          <GoldTitle size={(vertical ? 78 : 84) * u} start={6} duration={16} style={{ textAlign: vertical ? 'center' : 'left' }}>
            {livre.titre}
          </GoldTitle>
          <div
            style={{
              fontFamily: C.serifItalic,
              fontStyle: 'italic',
              fontSize: (vertical ? 44 : 42) * u,
              lineHeight: 1.3,
              color: C.cream,
              textAlign: vertical ? 'center' : 'left',
              opacity: interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}
          >
            {livre.accroche}
          </div>
        </div>
      </AbsoluteFill>
      <GoldDust count={35} seed={livre.id} />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Ouverture : éventail des 12 couvertures                             */
/* ------------------------------------------------------------------ */
const SceneEventail: React.FC<{ titre: string; sousTitre: string }> = ({ titre, sousTitre }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, vertical, height } = useU();
  const livres = CATALOGUE;
  const n = livres.length;
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 8, 8) }}>
      <LightRays intensity={0.75} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: vertical ? 'center' : 'flex-start', paddingTop: vertical ? 0 : 90 * u }}>
        <div style={{ position: 'relative', height: height * (vertical ? 0.3 : 0.42), width: 1, marginTop: vertical ? -260 * u : 120 * u }}>
          {livres.map((l, i) => {
            const k = i - (n - 1) / 2;
            const sp = spring({ frame: frame - Math.abs(k) * 1.5, fps, config: { damping: 20 }, durationInFrames: 30 });
            const angle = k * (vertical ? 6 : 7) * sp + Math.sin(frame / 45) * 0.6;
            return (
              <div
                key={l.id}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: Math.abs(k) * 5 * u,
                  height: '100%',
                  transformOrigin: '50% 170%',
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  zIndex: 100 - Math.round(Math.abs(k) * 2),
                  opacity: sp,
                }}
              >
                <Couverture livre={{ ...l, maquette: false }} hauteur={height * (vertical ? 0.3 : 0.42)} style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 18 * u,
          paddingBottom: (vertical ? 380 : 90) * u,
          paddingLeft: 60 * u,
          paddingRight: 60 * u,
        }}
      >
        <GoldTitle size={(vertical ? 30 : 28) * u} start={10} font="sans">
          {sousTitre}
        </GoldTitle>
        <GoldTitle size={(vertical ? 82 : 86) * u} start={16}>
          {titre}
        </GoldTitle>
      </AbsoluteFill>
      <GoldDust count={45} seed="eventail" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Fin : où les trouver (laisse la place à l'écran de fin YouTube)     */
/* ------------------------------------------------------------------ */
const SceneFin: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, vertical } = useU();
  const lignes = ['Amazon', 'Librairie Alliance · Abidjan', 'alexandreamazou.com'];
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 10, 1) }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 55% at 50% 40%, ${C.navy600}, ${C.ink} 75%)` }} />
      <LightRays intensity={0.6} />
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: vertical ? 'center' : 'flex-start',
          paddingTop: vertical ? 0 : 110 * u,
          display: 'flex',
          flexDirection: 'column',
          gap: 26 * u,
        }}
      >
        <Img src={staticFile('logo-amazou.png')} style={{ height: (vertical ? 190 : 150) * u }} />
        <GoldTitle size={(vertical ? 74 : 72) * u} start={6}>
          Les livres du Pasteur Alexandre AMAZOU
        </GoldTitle>
        <div style={{ display: 'flex', flexDirection: vertical ? 'column' : 'row', gap: (vertical ? 18 : 40) * u, marginTop: 14 * u, alignItems: 'center' }}>
          {lignes.map((l, i) => {
            const sp = spring({ frame: frame - 18 - i * 8, fps, config: { damping: 14 }, durationInFrames: 24 });
            return (
              <div
                key={l}
                style={{
                  fontFamily: C.sans,
                  fontWeight: 600,
                  fontSize: (vertical ? 40 : 34) * u,
                  color: i === 0 ? C.navy900 : C.cream,
                  background: i === 0 ? GOLD_GRADIENT : 'transparent',
                  border: i === 0 ? 'none' : `${2 * u}px solid rgba(201,168,76,0.6)`,
                  padding: `${14 * u}px ${30 * u}px`,
                  opacity: Math.min(1, sp),
                  transform: `scale(${0.85 + 0.15 * Math.min(1, sp)})`,
                }}
              >
                {l}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <GoldDust count={45} seed="fin-catalogue" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Assemblage                                                          */
/* ------------------------------------------------------------------ */
type Plan = { at: number; dur: number; el: React.ReactNode };
type Clip = { at: number; file: string; text: string };

const Montage: React.FC<{ plans: Plan[]; clips: Clip[]; musique: string; trimMusique?: number; sousTitres: boolean }> = ({
  plans,
  clips,
  musique,
  trimMusique = 0,
  sousTitres,
}) => {
  const { durationInFrames } = useVideoConfig();
  const volumeAt = (t: number) => {
    let v = 0.6;
    for (const c of clips) {
      const a = c.at - 0.15;
      const b = c.at + dur(c.file) + 0.15;
      if (t >= a && t <= b) v = Math.min(v, 0.28 + 0.32 * Math.max(0, 1 - Math.min(t - a, b - t) / 0.15));
    }
    // fondu final de la musique
    const fin = durationInFrames / FPS;
    if (t > fin - 2) v *= Math.max(0, (fin - t) / 2);
    return v;
  };
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      {plans.map((p, i) => (
        <Sequence key={i} from={s(p.at)} durationInFrames={s(p.dur)}>
          {p.el}
        </Sequence>
      ))}
      {sousTitres ? <Subtitles lines={clips.map((c) => ({ from: c.at, to: c.at + dur(c.file) + 0.3, text: c.text }))} /> : null}
      <Audio src={staticFile(musique)} trimBefore={trimMusique ? s(trimMusique) : undefined} volume={(f) => volumeAt(f / FPS)} />
      {clips.map((c, i) => (
        <Sequence key={`v${i}`} from={s(c.at)} durationInFrames={s(dur(c.file) + 1)}>
          <Audio src={staticFile(c.file)} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

/** Construit la timeline : ouverture, un plan par livre calé sur sa phrase, fin. */
const construire = (intro: { file: string; text: string }, ouverture: number, gap: number, finDur: number) => {
  const plans: Plan[] = [];
  const clips: Clip[] = [];
  plans.push({ at: 0, dur: ouverture, el: <SceneEventail titre="Les livres du Pasteur Alexandre AMAZOU" sousTitre="Allez plus loin" /> });
  clips.push({ at: 0.4, file: intro.file, text: intro.text });
  let t = Math.max(ouverture, 0.4 + dur(intro.file) + 0.2);
  CATALOGUE.forEach((livre, i) => {
    const d = Math.max(2.6, dur(livre.voix) + gap);
    plans.push({ at: t, dur: d, el: <SceneLivre livre={livre} index={i} total={CATALOGUE.length} /> });
    clips.push({ at: t + 0.25, file: livre.voix, text: livre.phrase });
    t += d;
  });
  plans.push({ at: t, dur: finDur, el: <SceneFin /> });
  clips.push({ at: t + 0.4, file: VO.fin, text: 'Douze livres pour grandir dans la foi. Disponibles sur Amazon, à la Librairie Alliance et sur alexandreamazou.com.' });
  return { plans, clips, total: t + finDur };
};

export const APRES = construire({ file: VO.intro, text: 'Cet enseignement vous a fait du bien ? Allez plus loin avec les livres du Pasteur Alexandre Amazou.' }, 4.2, 0.55, 14);
export const VERTICAL = construire({ file: VO.intro, text: 'Cet enseignement vous a fait du bien ? Allez plus loin avec les livres du Pasteur Alexandre Amazou.' }, 4.2, 0.35, 8);

/** Version longue, après l'enseignement (16:9) — la fin laisse ~12 s à l'écran de fin YouTube. */
export const CatalogueApres: React.FC = () => <Montage plans={APRES.plans} clips={APRES.clips} musique="private/catalogue/musique-longue.mp3" sousTitres={false} />;

/** Version verticale TikTok / Reels / Shorts, sous-titrée. */
export const CatalogueVertical: React.FC = () => <Montage plans={VERTICAL.plans} clips={VERTICAL.clips} musique="private/catalogue/musique-longue.mp3" sousTitres />;

/** Version courte, avant l'enseignement (16:9) : éventail + phrase unique + fin. */
export const AVANT_SECONDS = 15;
export const CatalogueAvant: React.FC = () => {
  const d = dur(VO.avant);
  const plans: Plan[] = [
    { at: 0, dur: 9.5, el: <SceneEventail titre="Les livres du Pasteur Alexandre AMAZOU" sousTitre="Avant de commencer" /> },
    { at: 9.5, dur: AVANT_SECONDS - 9.5, el: <SceneFin /> },
  ];
  const clips: Clip[] = [{ at: Math.max(0.3, (AVANT_SECONDS - 0.8 - d) / 2), file: VO.avant, text: 'Avant de commencer… découvrez les livres du Pasteur Alexandre Amazou.' }];
  return <Montage plans={plans} clips={clips} musique="private/livre/musique-15.mp3" sousTitres={false} />;
};

