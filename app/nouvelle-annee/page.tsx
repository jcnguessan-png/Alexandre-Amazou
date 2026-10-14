import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { DoorOpen, Swords, ListChecks, Target, Star, Church, MapPin, BookOpen } from 'lucide-react';
import { getBookBySlug } from '@/data/books';
import { BookCover } from '@/components/home/dynamic/BookCover';
import { TrackedLink } from '@/components/campagne/TrackedLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { bookSchema, breadcrumbSchema } from '@/lib/schema';
import { campagne } from '@/lib/campagne-nouvelle-annee';
import { buildBookWhatsAppUrl } from '@/lib/site-config';
import './nouvelle-annee.css';

export const metadata: Metadata = {
  title: 'Comment préparer et réussir une nouvelle année ? — le livre',
  description:
    "Ne subissez plus votre année : commandez-la. Le manuel de guerre spirituelle du Pasteur Alexandre AMAZOU — les 4 portes prophétiques, les 4 armes de commandement et un plan d'action. Broché 30 €, disponible sur Amazon.",
  alternates: { canonical: '/nouvelle-annee' },
  openGraph: {
    title: 'Ne subissez plus votre année. Commandez-la.',
    description:
      "Le manuel de guerre spirituelle du Pasteur Alexandre AMAZOU pour préparer et réussir votre nouvelle année. Disponible sur Amazon.",
    url: '/nouvelle-annee',
    images: [{ url: '/images/livres/preparer-et-reussir-une-nouvelle-annee.jpg', width: 1600, height: 2500 }],
  },
};

const DECOUVERTES = [
  {
    icon: DoorOpen,
    titre: 'Les 4 portes prophétiques',
    texte:
      "Chaque année s'ouvre et se referme à des moments précis — équinoxes et solstices. Apprenez à les reconnaître et à vous y positionner.",
  },
  {
    icon: Swords,
    titre: 'Les 4 armes de commandement',
    texte:
      'La Prière de Commandement, la Puissance du Sacrifice, la Loi de l’Honneur et la Loi des Prémices : les leviers pour ne plus subir.',
  },
  {
    icon: ListChecks,
    titre: 'Des protocoles concrets',
    texte:
      'Diagnostic de l’année écoulée, guerre prophétique, programmation de l’année nouvelle : une méthode pas à pas, appuyée sur des cas réels.',
  },
  {
    icon: Target,
    titre: 'Votre plan d’action',
    texte:
      'Un plan personnalisé pour entrer dans l’année avec une stratégie, au lieu d’espérer que « cette année sera la bonne ».',
  },
];

const FAQ = [
  {
    q: 'Dans quels pays puis-je le commander ?',
    r: 'Sur Amazon en France, en Belgique, en Suisse (via amazon.fr) et au Canada (amazon.ca). En Côte d’Ivoire, le livre est disponible à la Librairie Alliance (Abidjan), commande par WhatsApp.',
  },
  {
    q: 'Quels formats existent ?',
    r: `Broché (${campagne.prix.broche}) et relié (${campagne.prix.relie}). Le compagnon « Mon Journal de Victoire » est vendu ${campagne.prix.journal}.`,
  },
  {
    q: 'Est-il encore temps si l’année a déjà commencé ?',
    r: 'Oui. Le livre explique comment reprendre la main à chacune des quatre portes de l’année : il n’est jamais trop tard pour cesser de subir.',
  },
  {
    q: 'Je veux l’offrir à mon église ou à mon groupe : comment faire ?',
    r: 'Faites une demande de commande groupée : le secrétariat vous répond avec les modalités.',
  },
];

async function loadExcerpt(): Promise<string | null> {
  try {
    return await fs.readFile(
      path.join(process.cwd(), 'data', 'excerpts', 'comment-preparer-et-reussir-une-nouvelle-annee.mdx'),
      'utf-8',
    );
  } catch {
    return null;
  }
}

export default async function NouvelleAnneePage() {
  const livre = getBookBySlug(campagne.slugLivre);
  const journal = getBookBySlug(campagne.slugJournal);
  const extrait = await loadExcerpt();
  if (!livre || !journal) return null;

  const { amazon, prix, note, avis, direct, dedicace } = campagne;
  const whatsapp = buildBookWhatsAppUrl(livre.title);

  return (
    <div className="dyn dyn-na" data-page="nouvelle-annee">
      <JsonLd data={bookSchema({ ...livre, amazonUrl: amazon.broche })} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Mes livres', href: '/mes-livres' },
          { name: 'Réussir sa nouvelle année', href: '/nouvelle-annee' },
        ])}
      />

      {/* 1. Accroche */}
      <section className="na-hero">
        <div className="na-wrap na-hero-grid">
          <div className="na-hero-text">
            <p className="eyebrow eyebrow-gold reveal">Best-seller · Pasteur Alexandre AMAZOU</p>
            <h1 className="reveal" data-delay="1">
              Ne subissez plus votre année.
              <br />
              <em>Commandez-la.</em>
            </h1>
            <p className="lead reveal" data-delay="2">
              <strong>Comment préparer et réussir une nouvelle année&nbsp;?</strong> — le manuel de guerre
              spirituelle pour entrer dans l’année avec une stratégie, et non avec un simple vœu.
            </p>
            <div className="na-rating reveal" data-delay="2">
              <span className="stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} size={16} />
                ))}
              </span>
              {note.valeur}/5 sur Amazon · {note.nombreAvis} avis
            </div>
            <div className="na-cta reveal" data-delay="3">
              <TrackedLink
                className="btn btn-gold"
                href={amazon.broche}
                target="_blank"
                rel="noopener noreferrer"
                event="Clic Amazon"
                props={{ format: 'broche', emplacement: 'hero' }}
              >
                Commander sur Amazon — {prix.broche} <span className="ar">→</span>
              </TrackedLink>
              <TrackedLink
                className="btn btn-ghost-gold"
                href={amazon.serie}
                target="_blank"
                rel="noopener noreferrer"
                event="Clic Amazon"
                props={{ format: 'pack', emplacement: 'hero' }}
              >
                Le livre + son journal
              </TrackedLink>
            </div>
            <p className="na-note reveal" data-delay="3">
              Livré en France, Belgique, Suisse et au Canada ·{' '}
              <a href="#abidjan">Côte d’Ivoire : Librairie Alliance</a>
            </p>
          </div>

          <div className="na-books reveal" data-delay="1" aria-hidden="true">
            <div className="na-book na-book-back">
              <BookCover book={journal} />
            </div>
            <div className="na-book na-book-front">
              <BookCover book={livre} badge="Best-seller" priority />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Le constat */}
      <section className="na-section na-pain">
        <div className="na-wrap narrow">
          <p className="eyebrow eyebrow-gold reveal">Le constat</p>
          <h2 className="reveal">Et si vos années se ressemblaient… pour une raison précise ?</h2>
          <blockquote className="reveal">
            « J’ai observé des milliers de chrétiens sincères entrer dans chaque nouvelle année avec
            enthousiasme, puis vivre des expériences répétitives, décevantes, parfois tragiques —
            comme si une force invisible les maintenait dans un cycle de limitation. »
          </blockquote>
          <p className="reveal">
            La plupart des croyants traitent une nouvelle année comme un simple changement de
            calendrier. Ce livre révèle qu’elle est un champ de bataille spirituel, gouverné par des
            lois précises — et qu’on peut apprendre à <strong>dominer le temps</strong> plutôt qu’à
            en être dominé.
          </p>
        </div>
      </section>

      {/* 3. Ce que vous allez découvrir */}
      <section className="na-section">
        <div className="na-wrap">
          <div className="subhead reveal">
            <p className="eyebrow eyebrow-gold">Dans ce livre</p>
            <h2>Ce que vous allez découvrir</h2>
            <span className="bar" aria-hidden="true" />
          </div>
          <div className="dgrid cols-2 na-grid">
            {DECOUVERTES.map((d) => (
              <div className="dcard reveal" key={d.titre}>
                <span className="ic">
                  <d.icon size={20} aria-hidden="true" />
                </span>
                <h3>{d.titre}</h3>
                <p>{d.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Le pack */}
      <section className="na-section na-pack">
        <div className="na-wrap na-pack-grid">
          <div className="na-pack-cover reveal">
            <BookCover book={journal} />
          </div>
          <div className="reveal" data-delay="1">
            <p className="eyebrow eyebrow-gold">Le compagnon</p>
            <h2>Mon Journal de Victoire — édition 2026</h2>
            <p>
              Le livre vous donne la stratégie ; le journal vous la fait vivre, mois après mois :
              objectifs spirituels et naturels, prières et décrets, jeûnes, Loi de l’Honneur et Loi
              des Prémices, victoires à documenter.
            </p>
            <p className="na-price">
              Livre {prix.broche} · Journal {prix.journal}
            </p>
            <div className="na-cta">
              <TrackedLink
                className="btn btn-gold"
                href={amazon.serie}
                target="_blank"
                rel="noopener noreferrer"
                event="Clic Amazon"
                props={{ format: 'pack', emplacement: 'pack' }}
              >
                Commander le livre et le journal <span className="ar">→</span>
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Avis lecteurs (affiché uniquement avec de vrais avis) */}
      {avis.length > 0 ? (
        <section className="na-section">
          <div className="na-wrap">
            <div className="subhead reveal">
              <p className="eyebrow eyebrow-gold">Ils l’ont lu</p>
              <h2>Avis de lecteurs</h2>
              <span className="bar" aria-hidden="true" />
            </div>
            <div className="dgrid cols-3 na-grid">
              {avis.map((a) => (
                <figure className="dcard reveal na-avis" key={a.texte}>
                  <blockquote>« {a.texte} »</blockquote>
                  <figcaption>
                    {a.auteur} · avis lecteur Amazon
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* 6. Extrait */}
      {extrait ? (
        <section className="na-section" id="extrait">
          <div className="na-wrap narrow">
            <details className="na-excerpt">
              <summary>
                <BookOpen size={20} aria-hidden="true" />
                <span>
                  <span className="k">Extrait gratuit</span>
                  Lire la préface et le début du chapitre 1
                </span>
              </summary>
              <div className="prose">
                <MDXRemote source={extrait} />
              </div>
              <div className="na-cta center">
                <TrackedLink
                  className="btn btn-gold"
                  href={amazon.broche}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="Clic Amazon"
                  props={{ format: 'broche', emplacement: 'extrait' }}
                >
                  Lire la suite — commander sur Amazon <span className="ar">→</span>
                </TrackedLink>
              </div>
            </details>
          </div>
        </section>
      ) : null}

      {/* 7. L'auteur */}
      <section className="na-section na-author">
        <div className="na-wrap na-author-grid">
          <div className="na-author-photo reveal">
            <Image
              src="/images/pasteur-amazou-portrait.jpg"
              alt="Le Pasteur Alexandre AMAZOU"
              width={600}
              height={750}
              sizes="(max-width: 860px) 70vw, 360px"
            />
          </div>
          <div className="reveal" data-delay="1">
            <p className="eyebrow eyebrow-gold">L’auteur</p>
            <h2>Pasteur Alexandre AMAZOU</h2>
            <p>
              Fondateur et pasteur principal des Églises ABMCI, il exerce depuis plus de trente ans
              un ministère d’enseignement présent en Côte d’Ivoire, en France, en Suisse, au Canada
              et en RD Congo. Initiateur de la Plateforme Leadership, qui rassemble plus de
              1 500 serviteurs de Dieu, il porte la vision de la Conférence d’Abidjan.
            </p>
            {direct ? (
              <p className="na-event">
                <strong>En direct :</strong> {direct.date} à {direct.heure} sur {direct.plateforme}
                {direct.lien ? (
                  <>
                    {' '}
                    — <a href={direct.lien}>rejoindre le direct</a>
                  </>
                ) : null}
              </p>
            ) : null}
            <Link className="btn btn-ghost-gold" href="/a-propos">
              Découvrir son parcours
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Églises & Abidjan */}
      <section className="na-section">
        <div className="na-wrap">
          <div className="dgrid cols-2 na-grid">
            <div className="panel-gold reveal">
              <Church size={26} aria-hidden="true" className="na-panel-ic" />
              <h2>Pour votre église</h2>
              <p>
                Offrez le livre à vos membres avant la veillée du 31 décembre, ou étudiez-le en
                groupe au premier trimestre. Le secrétariat vous propose des conditions pour les
                commandes groupées.
              </p>
              <div className="cta">
                <Link className="btn btn-gold" href="/me-contacter?objet=commande-groupee#formulaire">
                  Demander une commande groupée <span className="ar">→</span>
                </Link>
              </div>
            </div>
            <div className="panel-gold reveal" data-delay="1" id="abidjan">
              <MapPin size={26} aria-hidden="true" className="na-panel-ic" />
              <h2>À Abidjan</h2>
              {dedicace ? (
                <p>
                  <strong>Séance de dédicace</strong> le {dedicace.date} à {dedicace.heure} —{' '}
                  {dedicace.lieu}
                  {dedicace.adresse ? `, ${dedicace.adresse}` : ''}. Venez rencontrer le Pasteur et
                  repartir avec votre exemplaire dédicacé.
                </p>
              ) : (
                <p>
                  Une <strong>séance de dédicace</strong> avec le Pasteur aura lieu en décembre : la
                  date sera annoncée ici. Le livre est déjà disponible à la Librairie Alliance.
                </p>
              )}
              <div className="cta">
                <TrackedLink
                  className="btn btn-ghost-gold"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  event="Clic WhatsApp"
                  props={{ emplacement: 'abidjan' }}
                >
                  Commander par WhatsApp
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="na-section">
        <div className="na-wrap narrow">
          <div className="subhead reveal">
            <p className="eyebrow eyebrow-gold">Questions</p>
            <h2>Avant de commander</h2>
            <span className="bar" aria-hidden="true" />
          </div>
          <div className="na-faq">
            {FAQ.map((f) => (
              <details key={f.q} className="reveal">
                <summary>{f.q}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Dernier appel */}
      <section className="na-final">
        <div className="na-wrap narrow center">
          <h2 className="reveal">
            Cette année ne doit pas ressembler à la précédente.
            <br />
            <em>Elle commence par une décision.</em>
          </h2>
          <div className="na-cta center reveal" data-delay="1">
            <TrackedLink
              className="btn btn-gold"
              href={amazon.broche}
              target="_blank"
              rel="noopener noreferrer"
              event="Clic Amazon"
              props={{ format: 'broche', emplacement: 'final' }}
            >
              Commander le livre — {prix.broche} <span className="ar">→</span>
            </TrackedLink>
            <TrackedLink
              className="btn btn-ghost-gold"
              href={amazon.relie}
              target="_blank"
              rel="noopener noreferrer"
              event="Clic Amazon"
              props={{ format: 'relie', emplacement: 'final' }}
            >
              Version reliée — {prix.relie}
            </TrackedLink>
          </div>
          <p className="na-note">
            Au Canada :{' '}
            <TrackedLink
              href={amazon.canada}
              target="_blank"
              rel="noopener noreferrer"
              event="Clic Amazon"
              props={{ format: 'broche', emplacement: 'final', pays: 'CA' }}
            >
              amazon.ca
            </TrackedLink>{' '}
            · En Belgique :{' '}
            <TrackedLink
              href={amazon.belgique}
              target="_blank"
              rel="noopener noreferrer"
              event="Clic Amazon"
              props={{ format: 'broche', emplacement: 'final', pays: 'BE' }}
            >
              amazon.com.be
            </TrackedLink>
          </p>
        </div>
      </section>
    </div>
  );
}
