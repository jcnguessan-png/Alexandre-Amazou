import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { safeGetFeaturedPlaylistVideos, safeGetChannelUploads } from '@/lib/youtube';
import { videoObjectSchema, breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';
import { formatDateFR } from '@/lib/utils';
import { YouTubeFacade } from '@/components/home/dynamic/YouTubeFacade';
import './mes-enseignements.css';

export const metadata: Metadata = {
  title: 'Mes enseignements',
  description:
    "Tous les enseignements bibliques du Pasteur Alexandre AMAZOU : prédications, séries, séminaires et émissions. Foi, leadership, monde spirituel, prière, famille — la doctrine biblique sans concession.",
  alternates: { canonical: '/mes-enseignements' },
  openGraph: {
    title: 'Mes enseignements – Pasteur Alexandre AMAZOU',
    description:
      'Toute la chaîne YouTube officielle du Pasteur Alexandre AMAZOU, organisée par séries et thématiques.',
    url: '/mes-enseignements',
  },
};

export const revalidate = 3600;

const THEMES = [
  {
    title: 'Monde spirituel',
    text: 'Combat spirituel, réalité des esprits, héritage et libération — la dimension invisible expliquée bibliquement.',
  },
  {
    title: 'Leadership chrétien',
    text: 'Vocation, vision, valeurs — former des serviteurs de Dieu équipés pour leur appel et leur génération.',
  },
  {
    title: 'Prière & foi',
    text: 'Prière de commandement, intercession, prières exaucées — bâtir une vie de prière puissante et féconde.',
  },
  {
    title: 'Famille & héritage',
    text: 'Ordre divin, faveur des pères, bénédiction générationnelle — la doctrine vécue d’abord à la maison.',
  },
  {
    title: 'Réussite & finances',
    text: 'Réussir sa vie selon Dieu, théologie de l’argent au service du Royaume, produire pour la mission.',
  },
  {
    title: "Conférence d'Abidjan",
    text: 'Les temps forts du réveil spirituel de l’Afrique francophone, près de 10 000 personnes chaque année.',
  },
];

export default async function TeachingsPage() {
  const [videos, latest] = await Promise.all([
    safeGetFeaturedPlaylistVideos(50),
    safeGetChannelUploads(siteConfig.youtube.channelId, 3),
  ]);
  const poster = videos[0]?.thumbnailHigh ?? videos[0]?.thumbnailUrl;
  const channel = siteConfig.youtube.channelUrl;
  const channelVideos = `${channel}/videos`;

  return (
    <div className="dyn dyn-ens" data-page="enseignements">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Mes enseignements', href: '/mes-enseignements' },
        ])}
      />
      {videos.map((v) => (
        <JsonLd key={v.id} data={videoObjectSchema(v)} />
      ))}

      {/* HERO */}
      <section className="en-hero">
        <div className="inner">
          <p className="eyebrow eyebrow-gold reveal">Mes enseignements</p>
          <h1 className="reveal" data-delay="1">
            La Parole en <em>vidéo</em>, librement
          </h1>
          <p className="reveal" data-delay="2">
            Des centaines de prédications, séminaires et enseignements bibliques en accès libre.
            Plongez dans la doctrine, sans concession, directement depuis la chaîne officielle
            YouTube.
          </p>
          <div className="cta reveal" data-delay="2">
            <a className="btn btn-gold" href={channel} target="_blank" rel="noopener noreferrer">
              S&apos;abonner à la chaîne <span className="ar">→</span>
            </a>
            <a
              className="btn btn-ghost-gold"
              href={siteConfig.youtube.featuredPlaylistUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir la playlist
            </a>
          </div>
        </div>
      </section>

      {/* PLAYER */}
      <div className="en-player">
        <div className="yt3 reveal">
          <YouTubeFacade
            playlistId={siteConfig.youtube.featuredPlaylistId}
            poster={poster}
            ariaLabel="Lancer la lecture des enseignements"
          />
        </div>
      </div>

      {/* DERNIÈRES VIDÉOS DE LA CHAÎNE */}
      {latest.length > 0 ? (
        <section className="en-latest">
          <div className="head reveal">
            <p className="eyebrow eyebrow-gold">Dernières vidéos</p>
            <h2>Les plus récentes de la chaîne</h2>
          </div>
          <div className="en-vgrid">
            {latest.map((v, i) => (
              <article className="en-vid reveal" data-delay={String(i % 3)} key={v.id}>
                <div className="en-vid-thumb">
                  <YouTubeFacade
                    videoId={v.id}
                    poster={v.thumbnailUrl}
                    title=""
                    subtitle=""
                    ariaLabel={`Lire la vidéo : ${v.title}`}
                  />
                </div>
                <h3>{v.title}</h3>
                <time className="en-vid-date" dateTime={v.publishedAt}>
                  {formatDateFR(v.publishedAt)}
                </time>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* THÈMES */}
      <section className="en-themes">
        <div className="head reveal">
          <p className="eyebrow eyebrow-gold">Par thème</p>
          <h2>Explorez selon votre besoin</h2>
        </div>
        <div className="en-grid">
          {THEMES.map((t, i) => (
            <a
              className="en-card reveal"
              data-delay={String(i % 3)}
              href={channelVideos}
              target="_blank"
              rel="noopener noreferrer"
              key={t.title}
            >
              <div className="ic" aria-hidden="true">
                ✦
              </div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <div className="go">Voir sur YouTube →</div>
            </a>
          ))}
        </div>
      </section>

      {/* ABONNEMENT */}
      <section className="en-sub">
        <h2 className="reveal">
          Ne manquez aucun <em>enseignement</em>
        </h2>
        <p className="reveal" data-delay="1">
          Abonnez-vous à la chaîne YouTube officielle et activez les notifications pour suivre
          chaque nouvelle prédication.
        </p>
        <div className="cta reveal" data-delay="1">
          <a className="btn btn-gold" href={channel} target="_blank" rel="noopener noreferrer">
            S&apos;abonner sur YouTube <span className="ar">→</span>
          </a>
          <Link className="btn btn-ghost-gold" href="/mes-livres">
            Découvrir mes livres
          </Link>
        </div>
      </section>
    </div>
  );
}
