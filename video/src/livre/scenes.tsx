import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { C, GOLD_GRADIENT } from '../theme';
import { FilmFinish, GoldDust, GoldTitle, LightRays, useSceneFade } from '../fx';
import { LIVRE } from './config';

const useU = () => {
  const { width, height } = useVideoConfig();
  return { u: width / 1080, height, tall: height / width > 1.5 };
};

const goldText: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/* ------------------------------------------------------------------ */
/* Mots qui claquent les uns après les autres                          */
/* ------------------------------------------------------------------ */
export const SceneKinetic: React.FC<{ words: string[]; kicker?: string }> = ({ words, kicker }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { u } = useU();
  const per = durationInFrames / words.length;
  const i = Math.min(words.length - 1, Math.floor(frame / per));
  const local = frame - i * per;
  const punch = interpolate(local, [0, 5, 12], [1.35, 0.97, 1], { extrapolateRight: 'clamp' });
  const flash = interpolate(local, [0, 3], [0.35, 0], { extrapolateRight: 'clamp' });
  const shake = local < 6 ? Math.sin(local * 3) * (6 - local) * 1.2 * u : 0;
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 3, 4) }}>
      <LightRays intensity={0.5} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', padding: 70 * u }}>
        {kicker ? (
          <div
            style={{
              fontFamily: C.sans,
              fontWeight: 600,
              fontSize: 30 * u,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: C.gold,
              marginBottom: 30 * u,
            }}
          >
            {kicker}
          </div>
        ) : null}
        <div
          key={i}
          style={{
            fontFamily: C.serif,
            fontWeight: 700,
            fontSize: 132 * u,
            lineHeight: 1,
            textAlign: 'center',
            transform: `scale(${punch}) translateX(${shake}px)`,
            ...goldText,
            filter: `drop-shadow(0 0 ${24 * u}px rgba(201,168,76,0.35))`,
          }}
        >
          {words[i]}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: '#fff4d6', opacity: flash }} />
      <GoldDust count={40} seed="kinetic" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Révélation du livre en 3D                                           */
/* ------------------------------------------------------------------ */
export const SceneBookHero: React.FC<{ kicker?: string; caption?: string }> = ({
  kicker = 'Best-seller',
  caption = 'Pasteur Alexandre AMAZOU',
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, height, tall } = useU();
  const open = spring({ frame, fps, config: { damping: 16, mass: 0.9 }, durationInFrames: 36 });
  const rot = interpolate(open, [0, 1], [-70, -14]) + interpolate(frame, [0, durationInFrames], [0, 6]);
  const lift = interpolate(open, [0, 1], [80 * u, 0]);
  const sweep = interpolate(frame, [14, 46], [-40, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const coverH = height * (tall ? 0.5 : 0.42);
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 6, 6) }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,236,180,${0.5 * open}), rgba(201,168,76,${0.15 * open}) 45%, transparent 70%)`,
        }}
      />
      <LightRays intensity={0.7} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', perspective: 1800 * u }}>
        <div style={{ marginTop: (tall ? -110 : -190) * u, transform: `translateY(${lift}px) rotateY(${rot}deg)`, transformStyle: 'preserve-3d' }}>
          <div style={{ position: 'relative', height: coverH }}>
            <Img
              src={staticFile(LIVRE.couverture)}
              style={{ height: '100%', display: 'block', boxShadow: `${-30 * u}px ${40 * u}px ${90 * u}px rgba(0,0,0,0.75)` }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(105deg, transparent ${sweep - 18}%, rgba(255,255,255,0.4) ${sweep}%, transparent ${sweep + 18}%)`,
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: (tall ? 330 : 345) * u, gap: 14 * u, display: 'flex', flexDirection: 'column' }}
      >
        <GoldTitle size={26 * u} start={18} font="sans">
          {kicker}
        </GoldTitle>
        <GoldTitle size={62 * u} start={24}>
          {caption}
        </GoldTitle>
      </AbsoluteFill>
      <GoldDust count={45} seed="bookhero" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Liste numérotée (4 armes, plan d'action…)                           */
/* ------------------------------------------------------------------ */
export const SceneList: React.FC<{ title: string; items: string[] }> = ({ title, items }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u } = useU();
  const step = Math.max(5, Math.floor((durationInFrames - 20) / items.length));
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 4, 6) }}>
      <LightRays intensity={0.55} />
      <AbsoluteFill style={{ justifyContent: 'center', padding: `0 ${90 * u}px` }}>
        <GoldTitle size={70 * u} start={0} duration={12} style={{ textAlign: 'left' }}>
          {title}
        </GoldTitle>
        <div style={{ marginTop: 50 * u, display: 'grid', gap: 26 * u }}>
          {items.map((it, i) => {
            const sp = spring({ frame: frame - 8 - i * step, fps, config: { damping: 15 }, durationInFrames: 22 });
            return (
              <div
                key={it}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 28 * u,
                  opacity: Math.min(1, sp),
                  transform: `translateX(${(1 - sp) * -60 * u}px)`,
                }}
              >
                <span style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 84 * u, width: 70 * u, ...goldText }}>
                  {i + 1}
                </span>
                <span style={{ fontFamily: C.sans, fontWeight: 600, fontSize: 46 * u, color: C.cream, letterSpacing: '0.02em' }}>
                  {it}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <GoldDust count={35} seed={title} />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Grand titre sur le portrait du Pasteur                              */
/* ------------------------------------------------------------------ */
export const SceneImpact: React.FC<{ line1: string; line2: string; line2At: number }> = ({ line1, line2, line2At }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { u, height, tall } = useU();
  const zoom = interpolate(frame, [0, durationInFrames], [1.12, 1.02], { easing: Easing.out(Easing.cubic) });
  const burst = interpolate(frame, [line2At, line2At + 4, line2At + 20], [0, 0.5, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 6, 8), overflow: 'hidden' }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(circle at 50% 62%, rgba(255,236,180,0.45), rgba(201,168,76,0.12) 30%, transparent 58%)` }}
      />
      <LightRays intensity={0.8} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Img
          src={staticFile('bishop-hero.webp')}
          style={{ height: height * (tall ? 0.55 : 0.62), transform: `scale(${zoom})`, transformOrigin: '50% 100%', filter: 'brightness(0.8)' }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.ink} 0%, transparent 45%, rgba(5,5,12,0.6) 100%)` }} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: (tall ? 260 : 110) * u, gap: 20 * u, display: 'flex', flexDirection: 'column' }}>
        <GoldTitle size={70 * u} start={2} duration={14}>
          {line1}
        </GoldTitle>
        <GoldTitle size={150 * u} start={line2At} duration={10} style={{ fontStyle: 'italic' }}>
          {line2}
        </GoldTitle>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: '#fff4d6', opacity: burst }} />
      <GoldDust count={40} seed="impact" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Carte de fin : où l'acheter                                          */
/* ------------------------------------------------------------------ */
export const SceneEndLivre: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, height, tall } = useU();
  const sp = spring({ frame, fps, config: { damping: 14 }, durationInFrames: 30 });
  const btn = spring({ frame: frame - 16, fps, config: { damping: 12 }, durationInFrames: 30 });
  const pulse = 1 + Math.max(0, Math.sin((frame - 30) / 6)) * 0.03 * (frame > 30 ? 1 : 0);
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 6, 1) }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 45% at 50% 38%, ${C.navy600}, ${C.ink} 75%)` }} />
      <LightRays intensity={0.6} />
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 26 * u }}>
        <Img
          src={staticFile(LIVRE.couverture)}
          style={{
            height: height * (tall ? 0.36 : 0.4),
            boxShadow: `0 ${30 * u}px ${80 * u}px rgba(0,0,0,0.7), 0 0 ${60 * u}px rgba(201,168,76,0.25)`,
            transform: `scale(${0.85 + 0.15 * sp}) rotate(${(1 - sp) * -4}deg)`,
            opacity: Math.min(1, sp * 1.5),
          }}
        />
        <div style={{ fontFamily: C.sans, fontSize: 28 * u, color: C.goldBright, letterSpacing: '0.08em' }}>
          ★★★★★ <span style={{ color: C.cream }}>{LIVRE.note}</span>
        </div>
        <div
          style={{
            fontFamily: C.sans,
            fontWeight: 700,
            fontSize: 40 * u,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.navy900,
            background: GOLD_GRADIENT,
            padding: `${22 * u}px ${46 * u}px`,
            transform: `scale(${Math.min(1, btn) * pulse})`,
            boxShadow: `0 0 ${40 * u}px rgba(228,201,119,0.45)`,
          }}
        >
          Commander sur Amazon →
        </div>
        <div style={{ fontFamily: C.sans, fontSize: 30 * u, color: C.cream, opacity: Math.min(1, btn), letterSpacing: '0.04em' }}>
          {LIVRE.url}
        </div>
      </AbsoluteFill>
      <GoldDust count={50} seed="endlivre" />
      <FilmFinish />
    </AbsoluteFill>
  );
};
