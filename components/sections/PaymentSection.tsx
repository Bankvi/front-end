"use client";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tilt3D } from "@/components/ui/Tilt3D";

export function PaymentSection({ locale }: { locale: string }) {
  const t = useTranslations("mobile_money");

  const operators = [
    {
      name: t("moov_title"),
      desc: t("moov_desc"),
      color: "#FF6B00",
      abbr: "FL",
      sub: "Flooz",
    },
    {
      name: t("tmoney_title"),
      desc: t("tmoney_desc"),
      color: "#00A651",
      abbr: "TM",
      sub: "T-Money",
    },
  ];

  const fees = [
    { label: t("fees_deposit"), value: t("fees_percent"), highlight: true },
    { label: t("fees_withdrawal"), value: t("fees_percent"), highlight: true },
    { label: t("fees_transfer"), value: t("fees_free"), highlight: false },
  ];

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-8">
      {/* Horizontal divider */}
      <div className="max-w-7xl mx-auto mb-16 lg:mb-20">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--glass-border-strong), transparent)" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text & operators */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-6">
                <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
              </div>
              <h2 className="text-headline text-[var(--text)] mb-4">{t("title")}</h2>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-10">{t("subtitle")}</p>
            </ScrollReveal>

            {/* Operator cards */}
            <div className="space-y-4">
              {operators.map((op, i) => (
                <ScrollReveal key={op.name} delay={i * 120}>
                  <Tilt3D intensity={6}>
                    <div
                      className="glass-real rounded-2xl p-5 flex items-center gap-4 group hover:border-[var(--gold-dark)] transition-all duration-300"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${op.color}, ${op.color}bb)`,
                          boxShadow: `0 4px 16px ${op.color}44`,
                        }}
                      >
                        {op.abbr}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[var(--text)]">{op.name}</div>
                        <div className="text-xs text-[var(--text-muted)] mt-0.5">{op.desc}</div>
                      </div>
                      <div
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(34,197,94,0.12)", color: "rgb(34,197,94)" }}
                      >
                        Actif
                      </div>
                    </div>
                  </Tilt3D>
                </ScrollReveal>
              ))}
            </div>

            {/* Powered by FedaPay */}
            <ScrollReveal delay={240} className="mt-6">
              <div
                className="glass-real rounded-2xl p-5 flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(213,156,124,0.2), rgba(213,156,124,0.08))",
                    border: "1px solid rgba(213,156,124,0.3)",
                    color: "var(--gold)",
                  }}
                >
                  FP
                </div>
                <div>
                  <div className="font-semibold text-sm text-[var(--text)]">{t("fedapay_title")}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">{t("fedapay_desc")}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — fees visual */}
          <ScrollReveal mode="scale">
            <Tilt3D intensity={8}>
              <div
                className="glass-real rounded-3xl p-8"
                style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.10)" }}
              >
                <div className="text-sm font-semibold gold-text-solid tracking-widest uppercase mb-6">{t("fees_title")}</div>
                <div className="space-y-3">
                  {fees.map((fee, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-4 px-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                      style={{
                        background: fee.highlight
                          ? "linear-gradient(135deg, rgba(213,156,124,0.08), rgba(213,156,124,0.03))"
                          : "rgba(0,0,0,0.02)",
                        border: "1px solid",
                        borderColor: fee.highlight ? "rgba(213,156,124,0.15)" : "rgba(0,0,0,0.04)",
                      }}
                    >
                      <span className="text-sm font-medium text-[var(--text)]">{fee.label}</span>
                      <span
                        className="text-lg font-bold"
                        style={{ color: fee.highlight ? "var(--gold)" : "rgb(34,197,94)" }}
                      >
                        {fee.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Flow diagram */}
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--glass-border)" }}>
                  <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-5">
                    Flux de paiement
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    {["Mobile Money", "FedaPay", "BankVi Wallet"].map((step, i) => (
                      <div key={step} className="flex items-center gap-2">
                        <div
                          className="px-3 py-2 rounded-xl text-center"
                          style={{
                            background: "rgba(213,156,124,0.08)",
                            border: "1px solid rgba(213,156,124,0.15)",
                          }}
                        >
                          <div className="text-[10px] font-semibold text-[var(--gold)]">{step}</div>
                        </div>
                        {i < 2 && (
                          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                            <path d="M0 5h12M8 1l4 4-4 4" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Tilt3D>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
