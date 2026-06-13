"use client";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tilt3D } from "@/components/ui/Tilt3D";

const trustItems = [
  { key: "kyc", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { key: "encryption", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { key: "jwt", icon: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" },
  { key: "biometric", icon: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" },
  { key: "blockchain", icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" },
];

export function TrustSection({ locale }: { locale: string }) {
  const t = useTranslations("trust");

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-8">
      {/* BG accent */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, var(--gold) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5">
            <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h2 className="text-headline text-[var(--text)] mb-4">{t("title")}</h2>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">{t("subtitle")}</p>
        </ScrollReveal>

        {/* Honeycomb-style grid — 3+2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {trustItems.slice(0, 3).map((item, i) => (
            <ScrollReveal key={item.key} delay={i * 100}>
              <Tilt3D>
                <div
                  className="glass-real rounded-3xl p-7 h-full group hover:border-[var(--gold-dark)] transition-all duration-400 hover:-translate-y-1"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(213,156,124,0.15), rgba(213,156,124,0.05))",
                      border: "1px solid rgba(213,156,124,0.25)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-base text-[var(--text)] mb-2">
                    {t(`${item.key}_title` as "kyc_title")}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {t(`${item.key}_desc` as "kyc_desc")}
                  </p>
                </div>
              </Tilt3D>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 md:px-[calc(100%/6)]">
          {trustItems.slice(3).map((item, i) => (
            <ScrollReveal key={item.key} delay={(i + 3) * 100}>
              <Tilt3D>
                <div
                  className="glass-real rounded-3xl p-7 group hover:border-[var(--gold-dark)] transition-all duration-400 hover:-translate-y-1"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "linear-gradient(135deg, rgba(213,156,124,0.15), rgba(213,156,124,0.05))",
                      border: "1px solid rgba(213,156,124,0.25)",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-base text-[var(--text)] mb-2">
                    {t(`${item.key}_title` as "kyc_title")}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {t(`${item.key}_desc` as "kyc_desc")}
                  </p>
                </div>
              </Tilt3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
