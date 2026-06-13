import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "./FaqAccordion";
import Link from "next/link";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

async function getFaqs(lang: string) {
  try {
    const r = await fetch(`${BACKEND}/api/faqs/?lang=${lang}`, { next: { revalidate: 3600 } });
    const d = await r.json();
    return d?.results ?? d ?? [];
  } catch { return []; }
}

const placeholderFaqs = [
  { id: 1, question: "Qu'est-ce qu'un ESSO ?", answer: "Un ESSO est une tontine digitale. Plusieurs membres cotisent régulièrement et chaque cycle, un membre désigné par tirage reçoit la totalité des fonds collectés. BankVi propose 3 modes de tirage : rotation fixe, aléatoire et roue interactive." },
  { id: 2, question: "Comment fonctionne la vérification KYC ?", answer: "Pour accéder à toutes les fonctionnalités de BankVi, vous devez soumettre une photo de votre carte d'identité nationale (recto-verso) et un selfie. Un modérateur valide votre dossier sous 24h." },
  { id: 3, question: "Quels opérateurs Mobile Money sont supportés ?", answer: "BankVi est connecté nativement à Moov Money (Flooz) et Togocel (T-Money) via la passerelle FedaPay. Les dépôts et retraits se font sans redirection, directement dans l'application." },
  { id: 4, question: "Comment sont sécurisés mes fonds ?", answer: "Vos fonds sont protégés par plusieurs couches de sécurité : authentification JWT, code PIN à 6 chiffres ou biométrie, chiffrement TLS 1.3, et enregistrement des transactions critiques sur la blockchain Polygon." },
  { id: 5, question: "Qu'est-ce que la Tironienne ?", answer: "La Tironienne est un compte d'épargne programmable individuel. Vous définissez un objectif en XOF, une fréquence de versement et une durée. En mode bloqué, les fonds ne sont pas retirables avant l'échéance." },
];

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations("faq");
  const faqs = (await getFaqs(lang)).length ? await getFaqs(lang) : placeholderFaqs;

  return (
    <main className="min-h-screen pt-28 pb-20 px-5 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5">
            <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h1 className="text-headline text-[var(--text)] mb-4">{t("title")}</h1>
          <p className="text-lg text-[var(--text-muted)]">{t("subtitle")}</p>
        </div>

        <FaqAccordion faqs={faqs} />

        <div className="text-center mt-12">
          <p className="text-sm text-[var(--text-muted)] mb-4">{t("contact_cta")}</p>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
              color: "white",
              boxShadow: "0 4px 20px rgba(213,156,124,0.35)",
            }}
          >
            {t("contact_link")}
          </Link>
        </div>
      </div>
    </main>
  );
}
