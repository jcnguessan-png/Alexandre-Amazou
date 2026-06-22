import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import './a-propos.css';

export const metadata: Metadata = {
  title: 'À propos — Biographie',
  description:
    "Biographie du Pasteur Alexandre AMAZOU : appel ministériel, formation, doctorat en divinité (Université Biblique d'Atlanta), fondation de l'ABMCI, plateforme Leadership 1500+ serviteurs.",
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'Biographie du Pasteur Alexandre AMAZOU',
    description: "Parcours, mission et héritage doctrinal du fondateur de l'ABMCI.",
    url: '/a-propos',
  },
};

const STATS = [
  { value: '30+', label: 'années de ministère' },
  { value: '11', label: 'ouvrages publiés' },
  { value: '1 500+', label: 'leaders formés' },
  { value: '10 000', label: "Conférence d'Abidjan" },
];

const PILLARS = [
  {
    k: 'I',
    title: 'Enseignant biblique',
    text: 'La voix doctrinale qui défend la droite ligne de la Parole — sans concession, avec exactitude et révélation.',
  },
  {
    k: 'II',
    title: 'Auteur',
    text: 'Onze ouvrages publiés sur le leadership chrétien, la foi, la prière, la famille et le monde spirituel.',
  },
  {
    k: 'III',
    title: 'Mentor de leaders',
    text: 'Plateforme Leadership et Institut ISBEM — former une génération de serviteurs de Dieu équipés et exigeants.',
  },
];

const TIMELINE = [
  {
    year: "L'appel",
    title: 'Une vie transformée',
    text: "Suite à un appel au ministère d'enseignement et de miracle par le Seigneur Jésus, Alexandre AMAZOU consacre sa vie à la prédication — un appel confirmé par des signes et des miracles, au plan national et international.",
  },
  {
    year: 'Formation',
    title: "ISIA · IATA-FBA · Université d'Atlanta",
    text: "Ingénieur Marketing Management, diplôme international IATA-FBA, puis Doctorat en divinité obtenu à l'Université Biblique d'Atlanta (États-Unis).",
  },
  {
    year: '2003',
    title: "Fondation de l'ABMCI",
    text: "Fondation de l'Alliance Biblique Missionnaire Côte d'Ivoire — église pentecôtiste à vocation missionnaire. Siège à la Cathédrale Riviera Palmeraie (Cocody, Abidjan).",
  },
  {
    year: '2005',
    title: 'Bishop chargé des Affaires Africaines',
    text: "Consacré Bishop chargé des Affaires Africaines de People's Church of Christ de Pennsylvanie (États-Unis).",
  },
  {
    year: 'Mission',
    title: 'Une présence sur quatre continents',
    text: "Les missions ABMCI s'étendent en Côte d'Ivoire, dans la sous-région, au Canada (Montréal, Ottawa, Québec), en France, à Genève, Tokyo et en Corée du Sud.",
  },
  {
    year: 'ISBEM',
    title: 'Former les serviteurs de Dieu',
    text: "Fondateur et formateur à l'Institut Supérieur de l'Enseignement Biblique et Missionnaire, dédié à la formation rigoureuse des leaders chrétiens.",
  },
  {
    year: 'Leadership',
    title: 'Plateforme Leadership — 1 500+ serviteurs',
    text: "Initiateur de la Plateforme Leadership qui rassemble et coache plus de 1 500 serviteurs de Dieu de Côte d'Ivoire et au-delà.",
  },
  {
    year: "Conférence d'Abidjan",
    title: 'Près de 10 000 personnes chaque année',
    text: "Porteur de la vision de la Conférence Internationale Annuelle des Églises ABMCI-Monde, qui sonne le réveil spirituel dans l'Afrique francophone.",
  },
  {
    year: 'Engagement',
    title: 'Ambassadeur de Bonne Volonté',
    text: 'Ambassadeur de Bonne Volonté pour la lutte contre la Tuberculose en Côte d’Ivoire — un service civique au cœur de sa mission de compassion.',
  },
];

const KIDS = ['Ariel Christ Esli', 'Davida Fayette', 'Grâce Esther', 'Orly Nouriel', 'IVANKA Shalom'];

export default function AboutPage() {
  return (
    <div className="dyn dyn-apropos" data-page="a-propos">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'À propos', href: '/a-propos' },
        ])}
      />

      {/* HERO */}
      <section className="ab-hero">
        <div className="inner">
          <div>
            <p className="eyebrow eyebrow-gold reveal">Biographie</p>
            <h1 className="reveal" data-delay="1">
              Pasteur Alexandre <span className="g">AMAZOU</span>
            </h1>
            <p className="lead reveal" data-delay="2">
              Pasteur principal de l&apos;ABMCI Cathédrale, Docteur en divinité (Université
              Biblique d&apos;Atlanta), Bishop chargé des Affaires Africaines, fondateur de
              l&apos;ISBEM, initiateur de la Plateforme Leadership et de la Conférence
              d&apos;Abidjan.
            </p>
            <div className="stats reveal" data-delay="3">
              {STATS.map((s) => (
                <div className="s" key={s.label}>
                  <div className="v">{s.value}</div>
                  <div className="l">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <figure className="portrait reveal" data-delay="2">
            <div className="ph">
              <Image
                src="/images/pasteur-amazou-couple-portrait.jpg"
                alt="Le Pasteur Alexandre AMAZOU et la Pasteure Manzan Laurette AMAZOU"
                fill
                priority
                sizes="(max-width: 880px) 360px, 460px"
              />
            </div>
            <figcaption className="cap">
              <div className="r">Le couple pastoral</div>
              <div className="n">Alexandre &amp; Laurette AMAZOU</div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* PILIERS */}
      <section className="ab-pillars">
        <div className="inner">
          <div className="section-head reveal">
            <p className="eyebrow">Trois piliers</p>
            <h2 className="ab-h2">Une vocation, trois services</h2>
          </div>
          <div className="grid">
            {PILLARS.map((p, i) => (
              <div className="p reveal" data-delay={i ? String(i) : undefined} key={p.k}>
                <div className="k">{p.k}</div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="ab-bio">
        <div className="inner">
          <div className="reveal">
            <p className="eyebrow">Parcours</p>
            <h2 className="ab-h2">Une vie au service de la Parole</h2>
          </div>
          <div className="prose reveal" data-delay="1">
            <p>
              Le Pasteur Alexandre AMAZOU a eu sa vie transformée suite à un appel au
              ministère d&apos;enseignement et de miracle par le Seigneur Jésus, confirmé par
              des signes et des miracles, au plan national qu&apos;international. Il est président
              du <strong>Ministère International Semence de Vie</strong> et des Églises de
              l&apos;Alliance Biblique Missionnaire Monde.
            </p>
            <p>
              Diplômé de l&apos;Institut Supérieur d&apos;Informatique Appliquée en qualité
              d&apos;ingénieur Marketing Management, il est également titulaire du diplôme
              international IATA-FBA et d&apos;un <strong>Doctorat en divinité</strong> obtenu à
              l&apos;Université Biblique d&apos;Atlanta (États-Unis). Depuis 2005, il est{' '}
              <strong>Bishop chargé des Affaires Africaines</strong> de People&apos;s Church of
              Christ de Pennsylvanie.
            </p>
            <p>
              Il est actuellement Pasteur principal de l&apos;<strong>ABMCI</strong> dont le
              siège est situé à Riviera Palmeraie (Cocody, Abidjan). Les missions de
              l&apos;ABMCI s&apos;étendent dans le district d&apos;Abidjan, dans la sous-région,
              ailleurs en Afrique, à <strong>Montréal, Ottawa et Québec (Canada)</strong>, en
              France et à Genève (Suisse).
            </p>
            <p id="leadership">
              Il est l&apos;initiateur de la <strong>Plateforme Leadership</strong> qui
              rassemble plus de 1 500 serviteurs de Dieu, et porteur de la vision de la{' '}
              <strong>Conférence d&apos;Abidjan</strong> qui réunit près de{' '}
              <strong>10 000 personnes chaque année</strong>. Engagé au-delà du ministère, il
              est <strong>Ambassadeur de Bonne Volonté pour la lutte contre la Tuberculose</strong>{' '}
              en Côte d&apos;Ivoire.
            </p>
            <div className="pullquote">
              <p className="q">
                L&apos;enseignement de la Parole de Dieu avec exactitude et révélation, dans la
                droite ligne de la doctrine biblique.
              </p>
              <p className="s">— Vision du ministère International Seed of Life</p>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="ab-time" id="isbem">
        <div className="inner">
          <div className="reveal">
            <p className="eyebrow eyebrow-gold">Étapes clés</p>
            <h2 className="ab-h2">Une chronologie au service du Royaume</h2>
          </div>
          <div className="tl">
            {TIMELINE.map((t, i) => (
              <div className="item reveal" data-delay={String(i % 3)} key={t.title}>
                <div className="yr">{t.year}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFÉRENCE */}
      <section className="ab-conf">
        <div className="inner">
          <div className="reveal">
            <p className="eyebrow eyebrow-gold">Conférence d&apos;Abidjan</p>
            <div className="big">≈ 10 000</div>
            <h2>personnes chaque année</h2>
          </div>
          <div className="reveal" data-delay="1">
            <p>
              Porteur de la vision de la Conférence Internationale Annuelle des Églises
              ABMCI-Monde, le Pasteur Alexandre AMAZOU rassemble près de dix mille personnes
              chaque année à Abidjan.
            </p>
            <p>
              Cette plateforme sonne le réveil spirituel dans l&apos;Afrique francophone et
              demeure un instrument puissant pour gagner des âmes au Royaume de Dieu.
            </p>
          </div>
        </div>
      </section>

      {/* FAMILLE */}
      <section className="ab-family">
        <div className="inner">
          <figure className="ph reveal">
            <Image
              src="/images/pasteur-amazou-couple-famille.jpg"
              alt="Le Pasteur Alexandre AMAZOU et son épouse la Pasteure Manzan Laurette"
              fill
              sizes="(max-width: 820px) 360px, 520px"
            />
          </figure>
          <div className="reveal" data-delay="1">
            <p className="eyebrow">Famille</p>
            <h2>Un homme de famille</h2>
            <p>
              Marié à la <strong>Pasteure Manzan Laurette</strong>, missionnaire, le Pasteur
              Alexandre AMAZOU est père de cinq enfants. La famille demeure le premier
              ministère et le premier laboratoire de la doctrine qu&apos;il enseigne.
            </p>
            <ul className="kids">
              {KIDS.map((kid) => (
                <li key={kid}>{kid}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ab-cta">
        <h2 className="reveal">
          Découvrez ses <em>enseignements</em> et ses <em>ouvrages</em>
        </h2>
        <div className="cta reveal" data-delay="1">
          <Link className="btn btn-gold" href="/mes-enseignements">
            Mes enseignements <span className="ar">→</span>
          </Link>
          <Link className="btn btn-ghost-gold" href="/mes-livres">
            Mes livres
          </Link>
        </div>
      </section>
    </div>
  );
}
