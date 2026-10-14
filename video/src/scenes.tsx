import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { C, GOLD_GRADIENT } from './theme';
import { Broll, FilmFinish, GoldDust, GoldTitle, LightRays, useSceneFade } from './fx';

/** Unité responsive : 1 = 1 px sur le petit côté d'un rendu 1080p. */
const useLayout = () => {
  const { width, height } = useVideoConfig();
  return { vertical: height > width, u: Math.min(width, height) / 1080, width, height };
};

const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', ...style }}>{children}</AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Ouverture : noir, rai de lumière, poussière                        */
/* ------------------------------------------------------------------ */
export const SceneOpening: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const light = interpolate(frame, [0, durationInFrames], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 20, 8) }}>
      <LightRays intensity={light} />
      <GoldDust count={60} seed="opening" opacity={light} />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Plan IA avec titre optionnel                                       */
/* ------------------------------------------------------------------ */
export const SceneBroll: React.FC<{
  src: string | null;
  label: string;
  title?: React.ReactNode;
  titleStart?: number;
}> = ({ src, label, title, titleStart = 10 }) => {
  const { durationInFrames } = useVideoConfig();
  const { u, vertical } = useLayout();
  return (
    <AbsoluteFill style={{ opacity: useSceneFade(durationInFrames, 8, 8) }}>
      <Broll src={src} label={label} />
      {title ? (
        <Center style={{ padding: 80 * u }}>
          <GoldTitle size={(vertical ? 96 : 110) * u} start={titleStart}>
            {title}
          </GoldTitle>
        </Center>
      ) : null}
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Portrait (photo détourée) en parallaxe 2,5D                        */
/* ------------------------------------------------------------------ */
export const ScenePortrait: React.FC<{
  src: string;
  title: React.ReactNode;
  subtitle?: string;
  titleStart?: number;
  align?: 'left' | 'right';
  burst?: boolean;
  zoomFrom?: number;
  zoomTo?: number;
}> = ({ src, title, subtitle, titleStart = 18, align = 'right', burst = false, zoomFrom = 1.12, zoomTo = 1 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { u, vertical, height } = useLayout();
  const p = interpolate(frame, [0, durationInFrames], [0, 1], {
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });
  const zoom = interpolate(p, [0, 1], [zoomFrom, zoomTo]);
  const reveal = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const burstScale = interpolate(frame, [0, 40], [0.6, 1.05], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const imgH = vertical ? height * 0.72 : height * 1.02;
  const side = vertical ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';

  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 10, 10), overflow: 'hidden' }}>
      {/* Fond : halo + rais, bougent moins vite que le sujet (parallaxe) */}
      <AbsoluteFill style={{ transform: `scale(${1 + p * 0.04})` }}>
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 55% 65% at ${vertical ? 50 : align === 'right' ? 68 : 32}% 45%, ${C.navy600}, ${C.ink} 70%)`,
          }}
        />
        {burst ? (
          <AbsoluteFill
            style={{
              background: `radial-gradient(circle at 50% ${vertical ? 40 : 38}%, rgba(255,240,200,0.75) 0%, rgba(228,201,119,0.45) 12%, rgba(201,168,76,0.12) 32%, transparent 55%)`,
              transform: `scale(${burstScale})`,
            }}
          />
        ) : null}
        <LightRays intensity={0.8} originX={vertical ? 50 : align === 'right' ? 68 : 32} />
      </AbsoluteFill>

      <GoldDust count={45} seed="portrait-back" opacity={0.6} />

      {/* Sujet */}
      <AbsoluteFill
        style={{
          alignItems: side,
          justifyContent: 'flex-end',
          paddingLeft: vertical ? 0 : align === 'left' ? 140 * u : 0,
          paddingRight: vertical ? 0 : align === 'right' ? 140 * u : 0,
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            height: imgH,
            transform: `scale(${zoom}) translateY(${(1 - reveal) * 30 * u}px)`,
            transformOrigin: '50% 100%',
            filter: `brightness(${0.55 + reveal * 0.5}) contrast(1.05) saturate(1.05) drop-shadow(0 0 ${60 * u}px rgba(201,168,76,0.25))`,
          }}
        />
      </AbsoluteFill>

      {/* Bas d'image fondu */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 70%, ${C.ink} 100%)` }} />

      <GoldDust count={25} seed="portrait-front" />

      {/* Titre */}
      <AbsoluteFill
        style={{
          justifyContent: vertical ? 'flex-start' : 'center',
          alignItems: vertical ? 'center' : align === 'right' ? 'flex-start' : 'flex-end',
          padding: vertical ? `${180 * u}px ${60 * u}px` : `0 ${150 * u}px`,
        }}
      >
        <div style={{ maxWidth: vertical ? '100%' : '48%', display: 'flex', flexDirection: 'column', gap: 24 * u }}>
          <GoldTitle size={(vertical ? 104 : 150) * u} start={titleStart}>
            {title}
          </GoldTitle>
          {subtitle ? (
            <GoldTitle size={(vertical ? 30 : 34) * u} start={titleStart + 16} font="sans">
              {subtitle}
            </GoldTitle>
          ) : null}
        </div>
      </AbsoluteFill>
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Villes                                                              */
/* ------------------------------------------------------------------ */
const CITIES = ['ABIDJAN', 'MONTRÉAL', 'PARIS', 'GENÈVE', 'KINSHASA'];

export const SceneCities: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const { u, vertical } = useLayout();
  const step = Math.floor((durationInFrames - 30) / CITIES.length);
  const line = interpolate(frame, [0, durationInFrames - 20], [0, 100], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 8, 8) }}>
      <WorldDots />
      <LightRays intensity={0.5} />
      <Center>
        <div
          style={{
            display: 'flex',
            flexDirection: vertical ? 'column' : 'row',
            alignItems: 'center',
            gap: (vertical ? 40 : 54) * u,
          }}
        >
          {CITIES.map((city, i) => {
            const start = i * step;
            const o = interpolate(frame, [start, start + 10], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const flash = interpolate(frame, [start, start + 4, start + 18], [0, 1, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={city}
                style={{
                  fontFamily: C.sans,
                  fontWeight: 600,
                  fontSize: (vertical ? 58 : 44) * u,
                  letterSpacing: '0.24em',
                  color: C.cream,
                  opacity: o,
                  transform: `translateY(${(1 - o) * 16 * u}px)`,
                  textShadow: `0 0 ${30 * flash * u}px ${C.goldBright}, 0 0 ${8 * flash * u}px ${C.gold}`,
                }}
              >
                {city}
              </div>
            );
          })}
        </div>
      </Center>
      {/* Ligne d'or qui relie */}
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div
          style={{
            position: 'absolute',
            [vertical ? 'left' : 'top']: vertical ? '50%' : '62%',
            [vertical ? 'top' : 'left']: '10%',
            [vertical ? 'width' : 'height']: 2 * u,
            [vertical ? 'height' : 'width']: `${line * 0.8}%`,
            background: `linear-gradient(${vertical ? 180 : 90}deg, transparent, ${C.gold}, transparent)`,
            opacity: vertical ? 0.25 : 0.7,
          }}
        />
      </AbsoluteFill>
      <GoldDust count={40} seed="cities" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/** Trame de points discrète évoquant une carte du monde. */
const WorldDots: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const gap = Math.round(Math.min(width, height) / 40);
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `radial-gradient(rgba(201,168,76,0.22) 1.2px, transparent 1.4px)`,
        backgroundSize: `${gap}px ${gap}px`,
        backgroundPosition: `${-frame * 0.4}px 0`,
        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black, transparent 80%)',
        opacity: 0.8,
      }}
    />
  );
};

/* ------------------------------------------------------------------ */
/* Chiffres                                                            */
/* ------------------------------------------------------------------ */
const fmt = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/ | /g, ' ');

export const SceneCounters: React.FC<{ stats?: { value: number; suffix?: string; label: string }[] }> = ({
  stats = [
    { value: 10000, label: 'personnes chaque année' },
    { value: 1500, suffix: '+', label: 'leaders formés' },
  ],
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, vertical } = useLayout();
  const per = Math.floor(durationInFrames / stats.length);
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 6, 8) }}>
      <LightRays intensity={0.6} />
      <Center>
        <div
          style={{
            display: 'flex',
            flexDirection: vertical ? 'column' : 'row',
            gap: (vertical ? 80 : 160) * u,
            alignItems: 'center',
          }}
        >
          {stats.map((st, i) => {
            const start = i * Math.round(per * 0.55);
            const sp = spring({ frame: frame - start, fps, config: { damping: 200 }, durationInFrames: 40 });
            const hit = interpolate(frame, [start, start + 3, start + 14], [1.25, 1.25, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            return (
              <div key={st.label} style={{ textAlign: 'center', opacity: sp, transform: `scale(${hit})` }}>
                <div
                  style={{
                    fontFamily: C.sans,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    fontSize: (vertical ? 190 : 190) * u,
                    lineHeight: 1,
                    backgroundImage: GOLD_GRADIENT,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {fmt(st.value * sp)}
                  {st.suffix ?? ''}
                </div>
                <div
                  style={{
                    fontFamily: C.sans,
                    fontWeight: 600,
                    fontSize: 30 * u,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: C.cream,
                    marginTop: 18 * u,
                  }}
                >
                  {st.label}
                </div>
              </div>
            );
          })}
        </div>
      </Center>
      <GoldDust count={35} seed="counters" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Livres : chaque couverture s'ouvre comme une porte                  */
/* ------------------------------------------------------------------ */
export type Book = { cover: string; title: string; flat: boolean };

const BookReveal: React.FC<{ book: Book; duration: number }> = ({ book, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u, vertical, height } = useLayout();
  const open = spring({ frame, fps, config: { damping: 18, mass: 0.9 }, durationInFrames: 34 });
  const rot = interpolate(open, [0, 1], [-78, -10]);
  const drift = interpolate(frame, [0, duration], [0, 6]);
  const sweep = interpolate(frame, [12, 40], [-40, 140], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const out = interpolate(frame, [duration - 8, duration], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const h = height * (vertical ? 0.5 : 0.66);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      {/* Lumière derrière la porte */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 30% 45% at 50% ${vertical ? 42 : 46}%, rgba(255,236,180,${0.55 * open}), rgba(201,168,76,${0.18 * open}) 45%, transparent 70%)`,
        }}
      />
      <Center style={{ perspective: 1800 * u, paddingBottom: (vertical ? 260 : 120) * u }}>
        <div
          style={{
            position: 'relative',
            height: h,
            transformStyle: 'preserve-3d',
            transformOrigin: '0% 50%',
            transform: `rotateY(${rot + drift}deg)`,
          }}
        >
          <Img
            src={staticFile(book.cover)}
            style={{
              height: '100%',
              display: 'block',
              boxShadow: book.flat ? `${-30 * u}px ${40 * u}px ${90 * u}px rgba(0,0,0,0.7)` : undefined,
              filter: book.flat ? undefined : `drop-shadow(${-20 * u}px ${30 * u}px ${50 * u}px rgba(0,0,0,0.7))`,
            }}
          />
          {/* Reflet qui balaie la couverture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(105deg, transparent ${sweep - 18}%, rgba(255,255,255,0.35) ${sweep}%, transparent ${sweep + 18}%)`,
              mixBlendMode: 'screen',
              WebkitMaskImage: `url(${staticFile(book.cover)})`,
              WebkitMaskSize: '100% 100%',
              maskImage: `url(${staticFile(book.cover)})`,
              maskSize: '100% 100%',
            }}
          />
        </div>
      </Center>
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: (vertical ? 280 : 70) * u,
          paddingLeft: 60 * u,
          paddingRight: 60 * u,
        }}
      >
        <GoldTitle size={(vertical ? 64 : 58) * u} start={14} duration={20}>
          {book.title}
        </GoldTitle>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SceneBooks: React.FC<{ books: Book[] }> = ({ books }) => {
  const { durationInFrames } = useVideoConfig();
  const per = Math.floor(durationInFrames / books.length);
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <LightRays intensity={0.45} />
      {books.map((b, i) => (
        <Sequence key={b.cover} from={i * per} durationInFrames={per} layout="none">
          <BookReveal book={b} duration={per} />
        </Sequence>
      ))}
      <GoldDust count={45} seed="books" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Éventail de tous les ouvrages + où les trouver                      */
/* ------------------------------------------------------------------ */
export const SceneLibrary: React.FC<{ covers: string[] }> = ({ covers }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, vertical, height } = useLayout();
  const n = covers.length;
  const fanDeg = vertical ? 7 : 8;
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 8, 10) }}>
      <LightRays intensity={0.7} />
      <AbsoluteFill
        style={{
          perspective: 2200 * u,
          alignItems: 'center',
          justifyContent: vertical ? 'flex-start' : 'center',
          paddingTop: vertical ? 300 * u : 0,
          paddingBottom: vertical ? 0 : 220 * u,
        }}
      >
        <div style={{ position: 'relative', height: height * (vertical ? 0.32 : 0.5), width: 1, marginTop: vertical ? 0 : -40 * u }}>
          {covers.map((c, i) => {
            const k = i - (n - 1) / 2;
            const sp = spring({ frame: frame - Math.abs(k) * 2, fps, config: { damping: 20 }, durationInFrames: 30 });
            const angle = k * fanDeg * sp + Math.sin(frame / 45) * 0.8;
            const lift = Math.abs(k) * 6 * u;
            return (
              <Img
                key={c}
                src={staticFile(c)}
                style={{
                  position: 'absolute',
                  height: '100%',
                  left: 0,
                  top: 0,
                  transformOrigin: '50% 160%',
                  transform: `translateX(-50%) translateY(${lift}px) rotate(${angle}deg) rotateY(${-k * 4}deg)`,
                  zIndex: 100 - Math.abs(Math.round(k * 2)),
                  boxShadow: `0 ${30 * u}px ${70 * u}px rgba(0,0,0,0.75)`,
                  opacity: sp,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: (vertical ? 300 : 80) * u,
          gap: 14 * u,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GoldTitle size={(vertical ? 30 : 26) * u} start={14} font="sans">
          Disponibles
        </GoldTitle>
        <GoldTitle size={(vertical ? 62 : 58) * u} start={22}>
          Amazon · Librairie Alliance
        </GoldTitle>
        <GoldTitle size={(vertical ? 36 : 34) * u} start={34} font="sans" tracking={0.18}>
          alexandreamazou.com
        </GoldTitle>
      </AbsoluteFill>
      <GoldDust count={40} seed="library" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Silence noir                                                        */
/* ------------------------------------------------------------------ */
export const SceneBlack: React.FC = () => <AbsoluteFill style={{ background: '#000' }} />;

/* ------------------------------------------------------------------ */
/* Carte de fin : réseaux sociaux                                      */
/* ------------------------------------------------------------------ */
const ICONS: Record<string, React.ReactNode> = {
  youtube: (
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
  ),
  facebook: (
    <path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z" />
  ),
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2ZM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z" />
  ),
  whatsapp: (
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5v-.5c-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4ZM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8ZM12 0a12 12 0 0 0-10.3 18L0 24l6.2-1.6A12 12 0 1 0 12 0Z" />
  ),
};

const SOCIALS = [
  { icon: 'youtube', name: 'YouTube', handle: '@AlexandreAmazou' },
  { icon: 'youtube', name: 'YouTube', handle: '@EGLISEABMCI' },
  { icon: 'facebook', name: 'Facebook', handle: 'PasteurAlexandreAmazouABMCI' },
  { icon: 'instagram', name: 'Instagram', handle: '@alexandreamazou' },
  { icon: 'whatsapp', name: 'WhatsApp', handle: 'Chaîne officielle' },
];

export const SceneEndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const { u, vertical } = useLayout();
  const logo = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  return (
    <AbsoluteFill style={{ background: C.ink, opacity: useSceneFade(durationInFrames, 12, 1) }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(ellipse 60% 55% at 50% ${vertical ? 30 : 32}%, ${C.navy600}, ${C.ink} 75%)` }}
      />
      <LightRays intensity={0.6} />
      <AbsoluteFill
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          display: 'flex',
          gap: (vertical ? 34 : 22) * u,
          padding: 60 * u,
        }}
      >
        <Img
          src={staticFile('logo-amazou.png')}
          style={{ height: (vertical ? 210 : 150) * u, opacity: logo, transform: `scale(${0.9 + logo * 0.1})` }}
        />
        <GoldTitle size={(vertical ? 78 : 70) * u} start={10}>
          Rejoignez-nous
        </GoldTitle>
        <GoldTitle size={(vertical ? 36 : 32) * u} start={22} font="sans" tracking={0.16}>
          alexandreamazou.com
        </GoldTitle>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: vertical ? '1fr' : 'repeat(5, auto)',
            gap: (vertical ? 26 : 46) * u,
            marginTop: (vertical ? 40 : 30) * u,
          }}
        >
          {SOCIALS.map((so, i) => {
            const sp = spring({ frame: frame - 34 - i * 6, fps, config: { damping: 14 }, durationInFrames: 30 });
            return (
              <div
                key={so.handle}
                style={{
                  display: 'flex',
                  flexDirection: vertical ? 'row' : 'column',
                  alignItems: 'center',
                  gap: 14 * u,
                  opacity: Math.min(1, sp),
                  transform: `translateY(${(1 - sp) * 30 * u}px) scale(${0.8 + 0.2 * sp})`,
                }}
              >
                <div
                  style={{
                    width: (vertical ? 76 : 96) * u,
                    height: (vertical ? 76 : 96) * u,
                    borderRadius: '50%',
                    border: `${2 * u}px solid ${C.gold}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 ${24 * u}px rgba(201,168,76,0.35)`,
                    flex: 'none',
                  }}
                >
                  <svg viewBox="0 0 24 24" width={(vertical ? 36 : 44) * u} height={(vertical ? 36 : 44) * u} fill={C.goldBright}>
                    {ICONS[so.icon]}
                  </svg>
                </div>
                <div style={{ textAlign: vertical ? 'left' : 'center' }}>
                  <div
                    style={{
                      fontFamily: C.sans,
                      fontSize: (vertical ? 22 : 20) * u,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: C.gold,
                    }}
                  >
                    {so.name}
                  </div>
                  <div style={{ fontFamily: C.sans, fontSize: (vertical ? 32 : 30) * u, color: C.cream, marginTop: 4 * u }}>
                    {so.handle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <GoldDust count={50} seed="end" />
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Sous-titres (version verticale)                                     */
/* ------------------------------------------------------------------ */
export const Subtitles: React.FC<{ lines: { from: number; to: number; text: string }[] }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { u } = useLayout();
  const t = frame / fps;
  const line = lines.find((l) => t >= l.from && t < l.to);
  if (!line) return null;
  const o = interpolate(t, [line.from, line.from + 0.15, line.to - 0.15, line.to], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 150 * u }}>
      <div
        style={{
          fontFamily: C.sans,
          fontWeight: 600,
          fontSize: 44 * u,
          lineHeight: 1.25,
          color: '#fff',
          textAlign: 'center',
          maxWidth: '86%',
          padding: `${10 * u}px ${22 * u}px`,
          background: 'rgba(5,5,12,0.55)',
          borderRadius: 10 * u,
          opacity: o,
        }}
      >
        {line.text}
      </div>
    </AbsoluteFill>
  );
};
