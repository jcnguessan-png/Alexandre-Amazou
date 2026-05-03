import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { GraduationCap, Heart, Globe2, BookOpen } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Timeline, type TimelineItem } from '@/components/ui/Timeline';
import { Quote } from '@/components/ui/Quote';
import { Button } from '@/components/ui/Button';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { ministryStats } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'À propos — Biographie',
  description:
    "Biographie du Pasteur Alexandre AMAZOU : appel ministériel, formation, doctorat en divinité (Université Biblique d'Atlanta), fondation de l'ABMCI, plateforme Leadership 1500+ serviteurs.",
  alternates: { canonical: '/a-propos' },
  openGraph: {
    title: 'Biographie du Pasteur Alexandre AMAZOU',
    description:
      "Parcours, mission et héritage doctrinal du fondateur de l'ABMCI.",
    url: '/a-propos',
  },
};

const timeline: TimelineItem[] = [
  {
    year: "L'appel",
    title: 'Une vie transformée',
    description:
      "Suite à un appel au ministère d'enseignement et de miracle par le Seigneur Jésus, Alexandre AMAZOU consacre sa vie à la prédication. Cet appel sera confirmé par des signes et des miracles dans ses enseignements et séminaires, tant au plan national qu'international.",
  },
  {
    year: 'Formation',
    title: "ISIA, IATA-FBA, Université Biblique d'Atlanta",
    description:
      "Diplômé de l'Institut Supérieur d'Informatique Appliquée (ingénieur Marketing Management), titulaire du diplôme international IATA-FBA option Marchandises dangereuses, puis Doctorat en divinité obtenu à l'Université Biblique d'Atlanta (États-Unis).",
  },
  {
    year: '2003',
    title: "Fondation de l'ABMCI",
    description:
      "Fondation de l'Alliance Biblique Missionnaire Côte d'Ivoire — une église pentecôtiste à vocation missionnaire issue du ministère International Seed of Life. Le siège est implanté à la Cathédrale Riviera Palmeraie (Cocody, Abidjan).",
  },
  {
    year: '2005',
    title: "Bishop chargé des Affaires Africaines",
    description:
      "Consacré Bishop chargé des Affaires Africaines de People's Church of Christ de Pennsylvanie (États-Unis) — une responsabilité internationale qui prolonge le ministère ABMCI sur le continent.",
  },
  {
    year: 'Mission',
    title: 'Une présence sur quatre continents',
    description:
      "Les missions ABMCI s'étendent dans le district d'Abidjan, à l'intérieur du pays, dans la sous-région, ailleurs en Afrique, à Gatineau, Montréal, Ottawa et Québec (Canada), en France, à Genève (Suisse), Tokyo (Japon), en Corée du Sud et plusieurs autres champs missionnaires.",
  },
  {
    year: 'ISBEM',
    title: 'Former les serviteurs de Dieu',
    description:
      "Fondateur et formateur à l'Institut Supérieur de l'Enseignement Biblique et Missionnaire (ISBEM), basé à Abidjan, dédié à la formation rigoureuse des leaders chrétiens et des futurs missionnaires.",
  },
  {
    year: 'Leadership',
    title: 'Plateforme Leadership — 1 500+ serviteurs',
    description:
      "Initiateur de la Plateforme Leadership qui rassemble plus de 1 500 serviteurs de Dieu de Côte d'Ivoire et au-delà — coachés et aiguisés dans l'exercice du ministère auquel ils ont été appelés.",
  },
  {
    year: "Conférence d'Abidjan",
    title: 'Près de 10 000 personnes chaque année',
    description:
      "Porteur de la vision de la Conférence Internationale Annuelle des Églises ABMCI-Monde dénommée CONFÉRENCE D'ABIDJAN — plateforme qui sonne le réveil spirituel dans l'Afrique francophone et instrument utile pour gagner des âmes au Royaume de Dieu, rassemblant près de 10 000 personnes chaque année.",
  },
  {
    year: 'Engagement',
    title: 'Ambassadeur de Bonne Volonté',
    description:
      "Ambassadeur de Bonne Volonté pour la lutte contre la Tuberculose en Côte d'Ivoire — un engagement civique au service de la santé publique, prolongement naturel du ministère de compassion.",
  },
];

const pillars = [
  {
    icon: BookOpen,
    title: 'Enseignant biblique',
    description:
      "La voix doctrinale qui défend la droite ligne de la Parole — sans concession, avec exactitude et révélation.",
  },
  {
    icon: GraduationCap,
    title: 'Auteur',
    description:
      "Neuf ouvrages publiés sur le leadership chrétien, la foi, la prière, la famille et le monde spirituel.",
  },
  {
    icon: Globe2,
    title: 'Mentor de leaders',
    description:
      "Plateforme Leadership et Institut ISBEM — former une génération de serviteurs de Dieu équipés et exigeants.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'À propos', href: '/a-propos' },
        ])}
      />

      {/* Hero biographie */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <p className="font-quote text-sm uppercase tracking-[0.25em] text-secondary">
                Biographie
              </p>
              <h1 className="mt-4 text-balance font-heading text-display-xl font-semibold leading-[1.05] text-primary-foreground">
                Pasteur Alexandre <span className="text-secondary">AMAZOU</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/85">
                Pasteur principal de l'Alliance Biblique Missionnaire Côte
                d'Ivoire (Cathédrale), Docteur en divinité (Université
                Biblique d'Atlanta), Bishop chargé des Affaires Africaines de
                People's Church of Christ (Pennsylvanie), fondateur de
                l'ISBEM, initiateur de la Plateforme Leadership et de la
                Conférence d'Abidjan.
              </p>

              <ul className="mt-10 grid grid-cols-2 gap-4">
                {ministryStats.map((stat) => (
                  <li
                    key={stat.label}
                    className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.03] p-5 text-center backdrop-blur"
                  >
                    <div className="font-heading text-2xl font-semibold text-secondary md:text-3xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-[0.12em] text-primary-foreground/70">
                      {stat.label}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button asChild variant="primary" size="md">
                  <Link href="/me-contacter">Me contacter</Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-secondary/20">
              <Image
                src="/images/pasteur-amazou-couple-portrait.jpg"
                alt="Le Pasteur Alexandre AMAZOU et la Pasteure Manzan Laurette AMAZOU, son épouse, missionnaire"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-quote text-xs uppercase tracking-[0.2em] text-secondary">
                  Le couple pastoral
                </p>
                <p className="mt-1 font-heading text-base font-medium text-primary-foreground/90">
                  Pasteur Alexandre AMAZOU & Pasteure Manzan Laurette AMAZOU
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trois piliers */}
      <section aria-labelledby="pillars-heading" className="bg-background py-20 md:py-24">
        <div className="container">
          <SectionTitle
            as="h2"
            eyebrow="Trois piliers"
            title="Une vocation, trois services"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-lg border border-border bg-background p-6 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <pillar.icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-primary">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-foreground/75">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Biographie complète */}
      <section aria-labelledby="bio-heading" className="bg-muted/30 py-20 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[1fr_2fr]">
          <SectionTitle
            as="h2"
            eyebrow="Parcours"
            title="Une vie au service de la Parole"
            className="lg:max-w-xs"
          />

          <div className="max-w-prose">
            <div className="prose-editorial">
              <p>
                Le Pasteur Alexandre AMAZOU a eu sa vie transformée suite à un
                appel au ministère d'enseignement et de miracle par le
                Seigneur Jésus. Ce ministère a été confirmé par des signes et
                des miracles lors d'enseignements et de séminaires tant au
                plan national qu'international. Il est le président du{' '}
                <strong>Ministère International Semence de Vie</strong>{' '}
                (International Seed of Life Ministry) et des Églises de
                l'Alliance Biblique Missionnaire Monde.
              </p>
              <p>
                Diplômé de l'Institut Supérieur d'Informatique Appliquée
                (ISIA) en qualité d'ingénieur Marketing Management, il est
                également titulaire du diplôme international IATA-FBA — option
                Marchandises dangereuses — et d'un Doctorat en divinité
                obtenu à l'Université Biblique d'Atlanta aux États-Unis.
                Depuis 2005, il est <strong>Bishop chargé des Affaires
                Africaines</strong> de People's Church of Christ de
                Pennsylvanie (États-Unis).
              </p>
              <p>
                Il est actuellement Pasteur principal de l'église{' '}
                <strong>ABMCI</strong> (Alliance Biblique Missionnaire Côte
                d'Ivoire) dont le siège — la Cathédrale ABMCI — est situé à
                Riviera Palmeraie (Cocody). Les missions de l'ABMCI s'étendent
                dans le district d'Abidjan, à l'intérieur du pays, dans la
                sous-région, ailleurs en Afrique, à <strong>Gatineau,
                Montréal, Ottawa et Québec (Canada)</strong>, en France et à
                Genève (Suisse).
              </p>
              <p>
                Par ailleurs, il est fondateur et formateur à l'<strong>Institut
                Supérieur de l'Enseignement Biblique et Missionnaire (ISBEM)</strong>{' '}
                à Abidjan, et missionnaire sur les champs de Paris (France),
                Tokyo (Japon), Corée du Sud et plusieurs autres pays du monde.
              </p>
              <p id="leadership">
                Il est l'initiateur de la <strong>Plateforme Leadership</strong>{' '}
                qui rassemble plus de 1 500 serviteurs de Dieu de Côte
                d'Ivoire à l'effet de les coacher et d'aiguiser leur exercice
                du ministère auquel ils ont été appelés. Prédicateur,
                motivateur et enseignant, il est porteur de la vision de la{' '}
                <strong>Conférence d'Abidjan</strong> — Conférence
                Internationale Annuelle des Églises ABMCI-Monde — qui
                rassemble près de <strong>10 000 personnes chaque année</strong>{' '}
                et sonne le réveil spirituel dans l'Afrique francophone.
              </p>
              <p>
                Engagé au-delà du ministère religieux, il est{' '}
                <strong>Ambassadeur de Bonne Volonté pour la lutte contre la
                Tuberculose en Côte d'Ivoire</strong> — un service civique au
                cœur de la mission de compassion qu'il porte.
              </p>
            </div>

            <Quote reference="Vision du ministère International Seed of Life">
              L'enseignement de la Parole de Dieu avec exactitude et
              révélation, dans la droite ligne de la doctrine biblique.
            </Quote>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        id="isbem"
        aria-labelledby="timeline-heading"
        className="bg-background py-20 md:py-24 scroll-mt-24"
      >
        <div className="container">
          <SectionTitle
            as="h2"
            eyebrow="Étapes clés"
            title="Une chronologie au service du Royaume"
          />
          <div className="mt-10 max-w-2xl">
            <Timeline items={timeline} />
          </div>
        </div>
      </section>

      {/* Famille */}
      <section aria-labelledby="family-heading" className="bg-muted/30 py-20 md:py-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-border lg:max-w-none">
              <Image
                src="/images/pasteur-amazou-couple-famille.jpg"
                alt="Le Pasteur Alexandre AMAZOU avec son épouse, la Pasteure Manzan Laurette — un instant de complicité"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
            </div>

            <div>
              <SectionTitle
                as="h2"
                eyebrow="Famille"
                title="Un homme de famille"
              />
              <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                Marié à la <strong>Pasteure Manzan Laurette</strong>,
                missionnaire, le Pasteur Alexandre AMAZOU est père de{' '}
                <strong>cinq enfants</strong> :
              </p>
              <ol className="mt-6 space-y-2 border-l-2 border-secondary/40 pl-5 text-foreground/85">
                <li className="font-heading text-lg">Ariel Christ Esli</li>
                <li className="font-heading text-lg">Davida Fayette</li>
                <li className="font-heading text-lg">Grâce Esther</li>
                <li className="font-heading text-lg">Orly Nouriel</li>
                <li className="font-heading text-lg">IVANKA Shalom</li>
              </ol>
              <p className="mt-6 flex items-start gap-3 text-base leading-relaxed text-foreground/75">
                <Heart className="mt-1 flex-shrink-0 text-secondary" size={20} aria-hidden="true" />
                <span>
                  La famille demeure le premier ministère et le premier
                  laboratoire de la doctrine qu'il enseigne — ordre divin,
                  héritage et faveur des pères s'incarnent d'abord à la maison.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
