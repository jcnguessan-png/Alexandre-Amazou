import React from 'react';
import {
  AbsoluteFill,
  Easing,
  OffthreadVideo,
  interpolate,
  random,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { C, GOLD_GRADIENT } from './theme';
import { SHOW_PLACEHOLDER_LABELS } from './media';

/** Poussière dorée en suspension (déterministe). */
export const GoldDust: React.FC<{ count?: number; seed?: string; opacity?: number }> = ({
  count = 70,
  seed = 'dust',
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const x0 = random(`${seed}-x-${i}`) * width;
        const y0 = random(`${seed}-y-${i}`) * height;
        const size = 1.5 + random(`${seed}-s-${i}`) * 4.5;
        const speed = 0.15 + random(`${seed}-v-${i}`) * 0.6;
        const drift = Math.sin(frame / (40 + i) + i) * 18;
        const y = (y0 - frame * speed + height * 2) % (height + 40);
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(frame / (12 + (i % 9)) + i));
        const blur = size > 4.5 ? 2 : 0;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x0 + drift,
              top: y,
              width: size,
              height: size,
              borderRadius: '50%',
              background: C.goldBright,
              boxShadow: `0 0 ${size * 3}px ${C.gold}`,
              opacity: twinkle * 0.8,
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/** Rais de lumière volumétriques venant d'en haut. */
export const LightRays: React.FC<{ intensity?: number; originX?: number }> = ({
  intensity = 1,
  originX = 50,
}) => {
  const frame = useCurrentFrame();
  const sway = Math.sin(frame / 60) * 4;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'screen', opacity: intensity }}>
      <AbsoluteFill
        style={{
          background: `conic-gradient(from ${180 + sway}deg at ${originX}% -10%, transparent 0deg, rgba(228,201,119,0.16) 8deg, transparent 14deg, rgba(228,201,119,0.10) 22deg, transparent 30deg, rgba(228,201,119,0.14) 340deg, transparent 346deg, rgba(228,201,119,0.08) 352deg, transparent 360deg)`,
          filter: 'blur(14px)',
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 45% 55% at ${originX}% 0%, rgba(228,201,119,0.22), transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Vignette + grain film. */
export const FilmFinish: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 75% 70% at 50% 50%, transparent 55%, rgba(0,0,0,0.75) 100%)',
        }}
      />
      <AbsoluteFill style={{ opacity: 0.07, mixBlendMode: 'overlay' }}>
        <svg width="100%" height="100%">
          <filter id={`grain-${frame % 4}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 4} />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${frame % 4})`} />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Titre or révélé par un masque qui balaie, avec léger resserrement de l'interlettrage. */
export const GoldTitle: React.FC<{
  children: React.ReactNode;
  size: number;
  start?: number;
  duration?: number;
  font?: 'serif' | 'sans';
  tracking?: number;
  exitAt?: number;
  style?: React.CSSProperties;
}> = ({ children, size, start = 0, duration = 24, font = 'serif', tracking, exitAt, style }) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.22, 0.61, 0.21, 1),
  });
  const out =
    exitAt === undefined
      ? 1
      : interpolate(frame, [exitAt, exitAt + 12], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const shine = interpolate(frame, [start, start + duration + 40], [-60, 160], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const baseTracking = tracking ?? (font === 'sans' ? 0.32 : 0.04);
  return (
    <div
      style={{
        fontFamily: font === 'serif' ? C.serif : C.sans,
        fontWeight: font === 'serif' ? 600 : 600,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: `${baseTracking + (1 - t) * 0.12}em`,
        textTransform: font === 'sans' ? 'uppercase' : undefined,
        textAlign: 'center',
        fontVariantNumeric: 'lining-nums',
        backgroundImage: `${GOLD_GRADIENT}, linear-gradient(100deg, transparent ${shine - 20}%, rgba(255,255,255,0.9) ${shine}%, transparent ${shine + 20}%)`,
        backgroundBlendMode: 'screen',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        clipPath: `inset(-20% ${(1 - t) * 100}% -20% 0)`,
        filter: `blur(${(1 - t) * 6}px) drop-shadow(0 0 ${18 * t}px rgba(201,168,76,0.35))`,
        opacity: out,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Fondu entrée/sortie d'une scène. */
export const useSceneFade = (durationInFrames: number, fadeIn = 10, fadeOut = 10) => {
  const frame = useCurrentFrame();
  return interpolate(
    frame,
    [0, fadeIn, durationInFrames - fadeOut, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );
};

/**
 * Plan IA (Higgsfield / Veo). Tant que le fichier n'est pas fourni, plan d'attente
 * atmosphérique (rais + poussière) avec le nom du plan attendu.
 */
export const Broll: React.FC<{ src: string | null; label: string; tint?: string }> = ({
  src,
  label,
  tint = C.navy800,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const zoom = interpolate(frame, [0, durationInFrames], [1.04, 1.14]);
  if (src) {
    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: C.ink }}>
        <OffthreadVideo
          src={staticFile(src)}
          muted
          style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})` }}
        />
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(5,5,12,0.15), rgba(5,5,12,0.55))' }} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 30%, ${tint}, ${C.ink} 75%)` }}>
      <LightRays intensity={0.9} />
      <GoldDust count={50} seed={label} />
      {SHOW_PLACEHOLDER_LABELS ? (
        <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 40 }}>
          <div
            style={{
              fontFamily: C.sans,
              fontSize: 22,
              letterSpacing: '0.2em',
              color: 'rgba(244,238,223,0.45)',
              border: '1px dashed rgba(244,238,223,0.3)',
              padding: '8px 16px',
            }}
          >
            PLAN IA À VENIR · {label}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
