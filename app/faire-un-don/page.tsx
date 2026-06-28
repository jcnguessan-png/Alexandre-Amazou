import type { Metadata } from 'next';
import Link from 'next/link';
import { DynPageHero } from '@/components/layout/DynPageHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';
import './faire-un-don.css';

export const metadata: Metadata = {
  title: 'Faire un don — Soutenir le ministère',
  description:
    "Soutenez le ministère du Pasteur Alexandre AMAZOU et l'œuvre de l'ABMCI. Mobile Money (MTN, Orange, Wave), virement bancaire (GTBank, Ecobank), transfert (MoneyGram, Western Union) ou carte bancaire. Reçu sur demande.",
  alternates: { canonical: '/faire-un-don' },
};

const HOLDER = 'YAO Kouakou Lucien';

const MOBILE_MONEY = [
  { operator: 'MTN Mobile Money', number: '+225 05 75 02 48 91', tel: '+2250575024891' },
  { operator: 'Orange Money', number: '+225 07 78 67 10 04', tel: '+2250778671004' },
];

type Row = { label: string; value: string; mono?: boolean };
type Transfer = { type: string; beneficiary: string; rows: Row[] };

const TRANSFERS: Transfer[] = [
  {
    type: 'GTBank',
    beneficiary: "Alliance Biblique Missionnaire Côte d'Ivoire",
    rows: [{ label: 'Numéro de compte', value: '01202 · 0000000634010 · 47', mono: true }],
  },
  {
    type: 'Ecobank',
    beneficiary: "Alliance Biblique Missionnaire Côte d'Ivoire",
    rows: [
      { label: 'Numéro de compte', value: '120106725002 · RIB 59', mono: true },
      { label: 'Code banque · guichet', value: 'CI059 · 01010', mono: true },
    ],
  },
  {
    type: 'MoneyGram',
    beneficiary: HOLDER,
    rows: [{ label: 'Contact', value: '+225 07 78 67 10 04 / +225 05 75 02 48 91' }],
  },
  {
    type: 'Western Union',
    beneficiary: "N'GUESSAN Adjoa Adélaïde",
    rows: [{ label: 'Contact', value: '+225 07 78 67 10 04 / +225 05 75 02 48 91' }],
  },
];

export default function DonationPage() {
  return (
    <div className="dyn" data-page="don">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Accueil', href: '/' },
          { name: 'Faire un don', href: '/faire-un-don' },
        ])}
      />

      <DynPageHero
        eyebrow="Soutenir le ministère"
        title="Faire un don"
        lead="Votre soutien permet de poursuivre l'œuvre missionnaire, de financer les conférences internationales, de former gratuitement les serviteurs de Dieu et de produire les contenus qui transforment des vies."
      />

      <div className="page-body">
        <div className="stack-lg">
          <div className="reveal">
            <span className="don-ref">Action de grâces · Dîmes · Offrandes — Malachie 3:10</span>
          </div>

          <div className="dquote reveal">
            <p className="q">
              « Que chacun donne comme il l&apos;a résolu en son cœur, sans tristesse ni
              contrainte ; car Dieu aime celui qui donne avec joie. »
            </p>
            <p className="src">— 2 Corinthiens 9 : 7</p>
          </div>

          {/* MOBILE MONEY */}
          <div>
            <div className="subhead reveal">
              <p className="eyebrow eyebrow-gold">Mobile Money</p>
              <h2>Don rapide par Mobile Money</h2>
              <span className="bar" aria-hidden="true" />
            </div>
            <div className="dgrid cols-2" style={{ marginTop: '32px' }}>
              {MOBILE_MONEY.map((m) => (
                <div className="dcard reveal" key={m.operator}>
                  <h3>{m.operator}</h3>
                  <a className="don-val" href={`tel:${m.tel}`}>
                    {m.number}
                  </a>
                </div>
              ))}
            </div>
            <p className="don-holder">
              Compte Mobile Money au nom de <strong>{HOLDER}</strong>. <strong>Wave</strong>{' '}
              également disponible (QR « Scannez-moi » à l&apos;église).
            </p>
          </div>

          {/* VIREMENT & TRANSFERT */}
          <div>
            <div className="subhead reveal">
              <p className="eyebrow eyebrow-gold">Virement & transfert</p>
              <h2>Par virement bancaire ou transfert d&apos;argent</h2>
              <span className="bar" aria-hidden="true" />
            </div>
            <div className="dgrid cols-2" style={{ marginTop: '32px' }}>
              {TRANSFERS.map((t) => (
                <div className="dcard reveal" key={t.type}>
                  <h3>{t.type}</h3>
                  <dl className="don-rows">
                    <div>
                      <dt>Bénéficiaire</dt>
                      <dd>{t.beneficiary}</dd>
                    </div>
                    {t.rows.map((r) => (
                      <div key={r.label}>
                        <dt>{r.label}</dt>
                        <dd className={r.mono ? 'mono' : undefined}>{r.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>

          {/* CARTE BANCAIRE */}
          <div className="panel-gold reveal">
            <h2>Par carte bancaire</h2>
            <p>
              Don en ligne sécurisé via le portail officiel de l&apos;Alliance Biblique
              Missionnaire Côte d&apos;Ivoire — accusé de réception immédiat et, sur demande, un
              reçu.
            </p>
            <div className="cta">
              <a
                className="btn btn-gold"
                href={siteConfig.donationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Donner par carte sur abmci.com <span className="ar">→</span>
              </a>
              <Link className="btn btn-ghost-gold" href="/me-contacter">
                Demander un reçu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
