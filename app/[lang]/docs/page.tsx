import { getTranslations } from "next-intl/server";
import Link from "next/link";

const docsModules = [
  { key: "esso_guide", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0", color: "var(--gold)" },
  { key: "tiro_guide", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", color: "rgb(34,197,94)" },
  { key: "wallet_guide", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", color: "rgb(99,102,241)" },
  { key: "kyc_guide", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", color: "rgb(244,63,94)" },
  { key: "partner_api", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "rgb(234,179,8)" },
];

export default async function DocsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations("docs");

  return (
    <main className="min-h-screen pt-28 pb-20 px-5 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5">
            <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h1 className="text-headline text-[var(--text)] mb-4">{t("title")}</h1>
          <p className="text-lg text-[var(--text-muted)]">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {docsModules.map((mod) => (
            <div
              key={mod.key}
              className="glass-real rounded-3xl p-7 group hover:border-[var(--gold-dark)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `${mod.color}18`,
                  border: `1px solid ${mod.color}30`,
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" stroke={mod.color}>
                  <path d={mod.icon} />
                </svg>
              </div>
              <h3 className="font-semibold text-base text-[var(--text)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                {t(mod.key as "esso_guide")}
              </h3>
              <div className="flex items-center gap-1 mt-4 text-xs font-medium gold-text-solid opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Voir le guide</span>
                <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                  <path d="M0 5h9M5 1l4 4-4 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          ))}

          {/* FAQ CTA */}
          <div
            className="glass-real rounded-3xl p-7 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, rgba(213,156,124,0.06), rgba(213,156,124,0.02))" }}
          >
            <div>
              <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">Questions fréquentes</div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">Consultez notre FAQ pour trouver des réponses rapides aux questions les plus courantes.</p>
            </div>
            <Link
              href={`/${lang}/faq`}
              className="mt-6 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                boxShadow: "0 4px 16px rgba(213,156,124,0.3)",
              }}
            >
              {t("faq_link")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
