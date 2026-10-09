import type { Metadata } from 'next';
import Link from 'next/link';
import { get } from '@vercel/blob';
import { Download, Lock, FileText, Film, ImageIcon, CalendarCheck } from 'lucide-react';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { CopyButton } from '@/components/kit/CopyButton';
import { verifyToken, getKitFile, type KitFile } from '@/lib/kit';
import { siteConfig } from '@/lib/site-config';
import './kit.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Kit de communication',
  description:
    'Espace réservé aux organisateurs ayant invité le Pasteur Alexandre AMAZOU : biographies, photos et vidéo officielles.',
  robots: { index: false, follow: false },
};

/** Lit un texte du store privé (biographies). */
async function readText(file: KitFile | undefined): Promise<string | null> {
  if (!file) return null;
  try {
    const res = await get(file.pathname, { access: 'private' });
    if (res?.statusCode !== 200 || !res.stream) return null;
    return (await new Response(res.stream).text()).trim();
  } catch (err) {
    console.error('[kit] lecture', file.pathname, err);
    return null;
  }
}

export default async function KitPage({ searchParams }: { searchParams: { acces?: string } }) {
  const access = verifyToken(searchParams.acces, 'access');

  if (!access) {
    return (
      <div className="dyn dyn-kit" data-page="kit">
        <div className="page-center">
          <Lock className="ico" size={56} aria-hidden="true" />
          <p className="k">Espace réservé</p>
          <h1>Kit de communication</h1>
          <p>
            Biographies, photos et vidéo officielles du Pasteur Alexandre AMAZOU sont réservées
            aux églises et organisateurs qui l’invitent. Envoyez votre demande d’invitation : une
            fois validée par le secrétariat, vous recevrez un lien d’accès personnel par email.
          </p>
          {searchParams.acces ? (
            <p className="kit-expired">
              Votre lien a expiré ou n’est pas valide. Écrivez à{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> pour
              en recevoir un nouveau.
            </p>
          ) : null}
          <div className="cta">
            <Link className="btn btn-gold" href="/me-contacter?objet=invitation#formulaire">
              Inviter le Pasteur <span className="ar">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const q = `acces=${encodeURIComponent(searchParams.acces as string)}`;
  const href = (slug: string, dl = false) => `/api/kit/${slug}?${q}${dl ? '&dl=1' : ''}`;
  const [bioShort, bioLong] = await Promise.all([
    readText(getKitFile('bio-courte')),
    readText(getKitFile('bio-longue')),
  ]);
  const until = new Date(access.exp).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const photos = [
    {
      title: 'Portrait en pied — smoking',
      preview: 'photo-smoking',
      downloads: [
        { slug: 'photo-smoking', label: 'JPG' },
        { slug: 'photo-smoking-hd', label: 'PNG HD' },
      ],
      note: '2114 × 4119 px — affiches, bâches, écrans',
    },
    {
      title: 'Portrait — costume blanc',
      preview: 'photo-blanc-1',
      downloads: [{ slug: 'photo-blanc-1', label: 'PNG' }],
      note: '646 × 1038 px — réseaux sociaux, web',
    },
    {
      title: 'Portrait — costume blanc (variante)',
      preview: 'photo-blanc-2',
      downloads: [{ slug: 'photo-blanc-2', label: 'PNG' }],
      note: '658 × 1043 px — réseaux sociaux, web',
    },
  ];

  return (
    <div className="dyn dyn-kit" data-page="kit">
      <DynPageHero
        eyebrow="Kit de communication"
        title={
          <>
            Ressources <em>officielles</em>
          </>
        }
        lead={`Bienvenue ${access.name}${access.organisation ? ` (${access.organisation})` : ''}. Voici les éléments à utiliser pour annoncer la venue du Pasteur Alexandre AMAZOU.`}
      />

      <div className="page-body">
        <p className="kit-validity">
          <CalendarCheck size={16} aria-hidden="true" /> Accès personnel valable jusqu’au {until}{' '}
          — merci de ne pas partager ce lien.
        </p>

        <section className="kit-section" aria-labelledby="kit-bios">
          <div className="subhead">
            <p className="eyebrow eyebrow-gold">01</p>
            <h2 id="kit-bios">Biographie officielle</h2>
            <span className="bar" aria-hidden="true" />
          </div>
          <div className="dgrid cols-2">
            {[
              { slug: 'bio-courte', title: 'Version courte', usage: 'Flyers, réseaux sociaux, annonce au micro', text: bioShort },
              { slug: 'bio-longue', title: 'Version longue', usage: 'Programme, dossier de presse, présentation', text: bioLong },
            ].map((b) => (
              <article className="dcard kit-bio" key={b.slug}>
                <span className="ic">
                  <FileText size={20} aria-hidden="true" />
                </span>
                <h3>{b.title}</h3>
                <p className="kit-usage">{b.usage}</p>
                <div className="kit-text">
                  {b.text
                    ? b.text.split(/\n+/).map((para, i) => <p key={i}>{para}</p>)
                    : <p>Texte momentanément indisponible — utilisez le bouton de téléchargement.</p>}
                </div>
                <div className="kit-actions">
                  {b.text ? <CopyButton text={b.text} label="Copier le texte" /> : null}
                  <a className="btn btn-ghost-gold" href={href(b.slug, true)}>
                    <Download size={16} aria-hidden="true" /> .txt
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kit-section" aria-labelledby="kit-video">
          <div className="subhead">
            <p className="eyebrow eyebrow-gold">02</p>
            <h2 id="kit-video">Vidéo de présentation</h2>
            <span className="bar" aria-hidden="true" />
          </div>
          <div className="kit-video">
            <video controls preload="metadata" playsInline src={href('video')}>
              Votre navigateur ne lit pas la vidéo : téléchargez-la ci-dessous.
            </video>
            <div className="kit-video-meta">
              <span className="ic">
                <Film size={20} aria-hidden="true" />
              </span>
              <div>
                <h3>Biographie du Pasteur Alexandre AMAZOU</h3>
                <p>MP4 · 1920 × 1080 · 54 s · 30 Mo — à diffuser sur écran ou réseaux sociaux.</p>
              </div>
              <a className="btn btn-gold" href={href('video', true)}>
                <Download size={16} aria-hidden="true" /> Télécharger
              </a>
            </div>
          </div>
        </section>

        <section className="kit-section" aria-labelledby="kit-photos">
          <div className="subhead">
            <p className="eyebrow eyebrow-gold">03</p>
            <h2 id="kit-photos">Photos officielles</h2>
            <span className="bar" aria-hidden="true" />
          </div>
          <div className="dgrid cols-3 kit-photos">
            {photos.map((p) => (
              <figure className="dcard kit-photo" key={p.preview}>
                <div className="kit-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element -- fichier privé servi par redirection signée */}
                  <img src={href(p.preview)} alt={`Pasteur Alexandre AMAZOU — ${p.title}`} loading="lazy" />
                </div>
                <figcaption>
                  <h3>
                    <ImageIcon size={16} aria-hidden="true" /> {p.title}
                  </h3>
                  <p>{p.note}</p>
                  <div className="kit-actions">
                    {p.downloads.map((d) => (
                      <a className="btn btn-ghost-gold" href={href(d.slug, true)} key={d.slug}>
                        <Download size={16} aria-hidden="true" /> {d.label}
                      </a>
                    ))}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="panel-gold kit-rules" aria-labelledby="kit-rules">
          <h2 id="kit-rules">Conditions d’utilisation</h2>
          <ul>
            <li>Usage réservé à la promotion de l’événement auquel le Pasteur est invité.</li>
            <li>
              Titre à utiliser : <strong>Pasteur Alexandre AMAZOU</strong> (ou Bishop Alexandre
              AMAZOU).
            </li>
            <li>
              Ne pas déformer, recadrer de manière dégradante ni retoucher les photos ; ne pas
              modifier le texte des biographies (une version abrégée est possible).
            </li>
            <li>Aucun usage commercial ni diffusion de ces fichiers en dehors de votre communication.</li>
            <li>
              Une question ou un visuel à faire valider : écrivez à{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> ou
              au secrétariat :{' '}
              <a href={`mailto:${siteConfig.contact.secretariatEmail}`}>
                {siteConfig.contact.secretariatEmail}
              </a>
              .
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
