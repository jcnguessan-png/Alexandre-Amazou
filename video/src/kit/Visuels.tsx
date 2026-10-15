import React from 'react';
import { AbsoluteFill, Img, Still, staticFile, useVideoConfig } from 'remotion';
import { C, GOLD_GRADIENT } from '../theme';
import { FilmFinish, GoldDust, LightRays } from '../fx';
import { LIVRE } from '../livre/config';

/**
 * Visuels fixes du kit de campagne « Nouvelle année » (rendus en PNG avec `remotion still`).
 * Formats : 1:1 (1080×1080), 4:5 (1080×1350), 9:16 (1080×1920).
 * Les fonds Noël sont des images IA sans livre ; la vraie couverture est incrustée ici.
 */

const NOEL_FOND_CARRE = 'private/livre/noel/fond-1x1.png';
const NOEL_FOND_STORY = 'private/livre/noel/fond-9x16.png';

const gold: React.CSSProperties = {
  backgroundImage: GOLD_GRADIENT,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const useFormat = () => {
  const { width, height } = useVideoConfig();
  const r = height / width;
  return { u: width / 1080, tall: r > 1.5, mid: r > 1.1 && r <= 1.5, square: r <= 1.1, height };
};

const Fond: React.FC<{ image?: string }> = ({ image }) => (
  <>
    {image ? (
      <Img src={staticFile(image)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 70% 55% at 50% 42%, ${C.navy600}, ${C.ink} 75%)` }} />
    )}
    {image ? <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(5,5,12,0.85), rgba(5,5,12,0.45) 35%, rgba(5,5,12,0.3) 55%, rgba(5,5,12,0.8))' }} /> : null}
    <LightRays intensity={image ? 0.35 : 0.7} />
    <GoldDust count={60} seed="kit-fond" />
  </>
);

const Couverture: React.FC<{ hauteur: number; incline?: boolean }> = ({ hauteur, incline = true }) => (
  <div style={{ perspective: 1600, display: 'flex', justifyContent: 'center' }}>
    <Img
      src={staticFile(LIVRE.couverture)}
      style={{
        height: hauteur,
        transform: incline ? 'rotateY(-14deg) rotateZ(-1.5deg)' : undefined,
        boxShadow: '-28px 36px 80px rgba(0,0,0,0.75), 0 0 70px rgba(201,168,76,0.28)',
      }}
    />
  </div>
);

const Bouton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { u } = useFormat();
  return (
    <div
      style={{
        fontFamily: C.sans,
        fontWeight: 700,
        fontSize: 34 * u,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: C.navy900,
        background: GOLD_GRADIENT,
        padding: `${20 * u}px ${42 * u}px`,
        boxShadow: `0 0 ${40 * u}px rgba(228,201,119,0.4)`,
      }}
    >
      {children}
    </div>
  );
};

const Petit: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => {
  const { u } = useFormat();
  return (
    <div style={{ fontFamily: C.sans, fontWeight: 600, fontSize: 26 * u, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.gold, ...style }}>
      {children}
    </div>
  );
};

const Titre: React.FC<{ children: React.ReactNode; size: number; italic?: boolean }> = ({ children, size, italic }) => (
  <div
    style={{
      fontFamily: C.serif,
      fontWeight: 600,
      fontStyle: italic ? 'italic' : 'normal',
      fontSize: size,
      lineHeight: 1.05,
      textAlign: 'center',
      fontVariantNumeric: 'lining-nums',
      ...gold,
      filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.6))',
    }}
  >
    {children}
  </div>
);

const Colonne: React.FC<{ children: React.ReactNode; gap: number; pad: number }> = ({ children, gap, pad }) => (
  <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap, padding: pad }}>
    {children}
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Publicité principale                                                */
/* ------------------------------------------------------------------ */
const Pub: React.FC = () => {
  const { u, tall, square, height } = useFormat();
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Fond />
      <Colonne gap={(tall ? 34 : 20) * u} pad={60 * u}>
        <Petit>Best-seller · Pasteur Alexandre AMAZOU</Petit>
        <Titre size={(tall ? 96 : square ? 70 : 82) * u}>Ne subissez plus votre année.</Titre>
        <Titre size={(tall ? 120 : square ? 84 : 100) * u} italic>
          Commandez-la.
        </Titre>
        <div style={{ margin: `${(tall ? 30 : 6) * u}px 0` }}>
          <Couverture hauteur={height * (tall ? 0.36 : square ? 0.38 : 0.36)} />
        </div>
        <div style={{ fontFamily: C.sans, fontSize: 28 * u, color: C.goldBright }}>
          ★★★★★ <span style={{ color: C.cream }}>{LIVRE.note}</span>
        </div>
        <Bouton>Commander sur Amazon →</Bouton>
        <div style={{ fontFamily: C.sans, fontSize: 26 * u, color: C.cream }}>{LIVRE.url}</div>
      </Colonne>
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Carrousel « Les 4 armes de commandement » (4:5, 6 visuels)          */
/* ------------------------------------------------------------------ */
const ARMES = ['La Prière de Commandement', 'La Puissance du Sacrifice', 'La Loi de l’Honneur', 'La Loi des Prémices'];

const Carrousel: React.FC<{ n: number }> = ({ n }) => {
  const { u, height } = useFormat();
  const pastille = (
    <div style={{ position: 'absolute', top: 50 * u, right: 60 * u, fontFamily: C.sans, fontSize: 24 * u, color: C.gold, letterSpacing: '0.2em' }}>
      {n} / 6
    </div>
  );
  if (n === 1) {
    return (
      <AbsoluteFill style={{ background: C.ink }}>
        <Fond />
        <Colonne gap={26 * u} pad={70 * u}>
          <Petit>Pour réussir votre nouvelle année</Petit>
          <Titre size={150 * u}>Les 4 armes</Titre>
          <Titre size={92 * u} italic>
            de commandement
          </Titre>
          <div style={{ marginTop: 20 * u }}>
            <Couverture hauteur={height * 0.34} />
          </div>
          <Petit style={{ fontSize: 24 * u, color: C.cream }}>Faites défiler →</Petit>
        </Colonne>
        {pastille}
        <FilmFinish />
      </AbsoluteFill>
    );
  }
  if (n === 6) {
    return (
      <AbsoluteFill style={{ background: C.ink }}>
        <Fond />
        <Colonne gap={30 * u} pad={70 * u}>
          <Titre size={84 * u}>Apprenez à les activer</Titre>
          <Titre size={84 * u} italic>
            au seuil de l’année.
          </Titre>
          <Couverture hauteur={height * 0.36} />
          <Bouton>Commander sur Amazon →</Bouton>
          <div style={{ fontFamily: C.sans, fontSize: 26 * u, color: C.cream }}>{LIVRE.url}</div>
        </Colonne>
        {pastille}
        <FilmFinish />
      </AbsoluteFill>
    );
  }
  const i = n - 2;
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Fond />
      <Colonne gap={24 * u} pad={90 * u}>
        <Petit>Arme n°{i + 1}</Petit>
        <div style={{ fontFamily: C.serif, fontWeight: 700, fontSize: 300 * u, lineHeight: 1, fontVariantNumeric: 'lining-nums', ...gold }}>
          {i + 1}
        </div>
        <Titre size={96 * u}>{ARMES[i]}</Titre>
        <div style={{ width: 80 * u, height: 2 * u, background: C.gold, margin: `${16 * u}px 0` }} />
        <div style={{ fontFamily: C.serif, fontSize: 38 * u, color: C.cream, textAlign: 'center', lineHeight: 1.45, maxWidth: '86%' }}>
          Comment l’activer au seuil de la nouvelle année ? La réponse est dans le livre.
        </div>
      </Colonne>
      {pastille}
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Citations (1:1) — extraits exacts de la préface                     */
/* ------------------------------------------------------------------ */
export const CITATIONS = [
  'La connaissance sans l’action produit la condamnation.',
  'Chaque année est un champ de bataille spirituel.',
  'Apprendre à dominer le temps plutôt que d’en être dominés.',
];

const Citation: React.FC<{ n: number }> = ({ n }) => {
  const { u } = useFormat();
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Fond />
      <Colonne gap={30 * u} pad={100 * u}>
        <div style={{ fontFamily: C.serif, fontSize: 220 * u, lineHeight: 0.6, ...gold }}>“</div>
        <Titre size={78 * u} italic>
          {CITATIONS[n - 1]}
        </Titre>
        <div style={{ width: 80 * u, height: 2 * u, background: C.gold, margin: `${10 * u}px 0` }} />
        <Petit>Pasteur Alexandre AMAZOU</Petit>
        <div style={{ fontFamily: C.serif, fontStyle: 'italic', fontSize: 28 * u, color: C.cream, textAlign: 'center' }}>
          Comment préparer et réussir une nouvelle année ?
        </div>
      </Colonne>
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Statuts WhatsApp (9:16)                                             */
/* ------------------------------------------------------------------ */
const Statut: React.FC<{ n: number }> = ({ n }) => {
  const { u, height } = useFormat();
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Fond />
      <Colonne gap={34 * u} pad={80 * u}>
        {n === 1 ? (
          <>
            <Petit>Nouveau · Best-seller</Petit>
            <Titre size={92 * u}>Le livre qui change votre façon d’entrer dans l’année</Titre>
            <Couverture hauteur={height * 0.4} />
            <Bouton>Disponible sur Amazon</Bouton>
            <div style={{ fontFamily: C.sans, fontSize: 30 * u, color: C.cream }}>{LIVRE.url}</div>
          </>
        ) : (
          <>
            <div style={{ fontFamily: C.serif, fontSize: 240 * u, lineHeight: 0.6, ...gold }}>“</div>
            <Titre size={96 * u} italic>
              {CITATIONS[1]}
            </Titre>
            <Petit>Pasteur Alexandre AMAZOU</Petit>
            <Couverture hauteur={height * 0.3} />
            <div style={{ fontFamily: C.sans, fontSize: 30 * u, color: C.cream }}>{LIVRE.url}</div>
          </>
        )}
      </Colonne>
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Noël                                                                */
/* ------------------------------------------------------------------ */
const Noel: React.FC = () => {
  const { u, tall, square, height } = useFormat();
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      <Fond image={tall ? NOEL_FOND_STORY : NOEL_FOND_CARRE} />
      <Colonne gap={(tall ? 30 : 16) * u} pad={60 * u}>
        <Petit>Le cadeau de Noël qui dure toute l’année</Petit>
        <Titre size={(tall ? 100 : square ? 72 : 84) * u}>Offrez une année</Titre>
        <Titre size={(tall ? 120 : square ? 86 : 100) * u} italic>
          victorieuse.
        </Titre>
        <div style={{ margin: `${(tall ? 30 : 4) * u}px 0` }}>
          <Couverture hauteur={height * (tall ? 0.36 : square ? 0.36 : 0.36)} />
        </div>
        <Bouton>Offrez-le à Noël · Amazon →</Bouton>
        <div style={{ fontFamily: C.sans, fontSize: 26 * u, color: C.cream, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{LIVRE.url}</div>
      </Colonne>
      <FilmFinish />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Enregistrement des formats                                          */
/* ------------------------------------------------------------------ */
export const KitVisuels: React.FC = () => (
  <>
    <Still id="Pub-1x1" component={Pub} width={1080} height={1080} />
    <Still id="Pub-4x5" component={Pub} width={1080} height={1350} />
    <Still id="Pub-9x16" component={Pub} width={1080} height={1920} />
    {[1, 2, 3, 4, 5, 6].map((n) => (
      <Still key={n} id={`Carrousel-${n}`} component={Carrousel} defaultProps={{ n }} width={1080} height={1350} />
    ))}
    {[1, 2, 3].map((n) => (
      <Still key={n} id={`Citation-${n}`} component={Citation} defaultProps={{ n }} width={1080} height={1080} />
    ))}
    {[1, 2].map((n) => (
      <Still key={n} id={`Statut-${n}`} component={Statut} defaultProps={{ n }} width={1080} height={1920} />
    ))}
    <Still id="Noel-1x1" component={Noel} width={1080} height={1080} />
    <Still id="Noel-4x5" component={Noel} width={1080} height={1350} />
    <Still id="Noel-9x16" component={Noel} width={1080} height={1920} />
  </>
);
