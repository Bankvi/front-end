"use client";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tilt3D } from "@/components/ui/Tilt3D";

export function DownloadSection({ locale }: { locale: string }) {
  const t = useTranslations("download");

  const features = [
    t("features_1"), t("features_2"), t("features_3"), t("features_4"),
  ];

  return (
    <section id="download" className="relative py-24 lg:py-32 px-5 lg:px-8 overflow-hidden">
      {/* Full-width glass panel */}
      <div className="max-w-7xl mx-auto">
        <ScrollReveal mode="scale">
          <div
            className="glass-real rounded-[2.5rem] overflow-hidden relative"
            style={{
              boxShadow: "0 40px 120px rgba(213,156,124,0.15), 0 0 0 1px var(--glass-border)",
            }}
          >
            {/* Decorative orb inside */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[80px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(213,156,124,0.25), transparent 70%)" }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-[60px] pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(193,123,82,0.18), transparent 70%)" }}
            />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-10 lg:p-14">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
                  style={{ border: "1px solid rgba(213,156,124,0.25)" }}>
                  <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
                </div>
                <h2 className="text-headline text-[var(--text)] mb-4">{t("title")}</h2>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">{t("subtitle")}</p>

                <ul className="space-y-3 mb-10">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(213,156,124,0.15)", border: "1px solid rgba(213,156,124,0.3)" }}
                      >
                        <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                          <path d="M1 4l2.5 2.5L9 1" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Store buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Tilt3D intensity={8}>
                    <button
                      className="flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-105 group"
                      style={{
                        background: "var(--bg-card)",
                        border: "1.5px solid var(--glass-border-strong)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      }}
                      aria-label="App Store"
                    >
                      <svg viewBox="0 0 24 24" fill="var(--text)" className="w-8 h-8">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                      <div className="text-left">
                        <div className="text-[10px] text-[var(--text-muted)] font-medium">{t("soon")}</div>
                        <div className="text-sm font-bold text-[var(--text)] group-hover:gold-text">{t("ios")}</div>
                      </div>
                    </button>
                  </Tilt3D>

                  <Tilt3D intensity={8}>
                    <button
                      className="flex items-center gap-3.5 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-105 group"
                      style={{
                        background: "var(--bg-card)",
                        border: "1.5px solid var(--glass-border-strong)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      }}
                      aria-label="Google Play"
                    >
                      <svg viewBox="0 0 24 24" className="w-8 h-8">
                        <path d="M3.18 23.76c.37.2.8.25 1.22.14l11.56-11.56L12 8.38 3.18 23.76z" fill="#EA4335" />
                        <path d="M20.46 10.48l-3-1.71-4.08 4.08 4.08 4.08 3.02-1.72c.86-.49.86-2.25-.02-2.73z" fill="#FBBC04" />
                        <path d="M2.4.44C2.07.77 1.9 1.29 1.9 1.97v20.07c0 .68.17 1.2.5 1.52l.08.08L13.84 12v-.24L2.48.36 2.4.44z" fill="#4285F4" />
                        <path d="M15.96 8.04L12 12l3.96 3.96 5.52-3.14c.58-.33.93-.88.93-1.5 0-.61-.35-1.16-.93-1.5l-5.52-3.78z" fill="#34A853" />
                      </svg>
                      <div className="text-left">
                        <div className="text-[10px] text-[var(--text-muted)] font-medium">{t("soon")}</div>
                        <div className="text-sm font-bold text-[var(--text)] group-hover:gold-text">{t("android")}</div>
                      </div>
                    </button>
                  </Tilt3D>
                </div>
              </div>

              {/* Right — mini phone preview */}
              <div className="flex items-center justify-center">
                <div
                  className="relative"
                  style={{ perspective: 1000 }}
                >
                  <div className="animate-float">
                    {/* Phone frame */}
                    <div
                      className="rounded-[2.5rem] relative overflow-hidden"
                      style={{
                        width: 200, height: 420,
                        background: "linear-gradient(145deg, var(--bg-card), var(--bg-surface))",
                        border: "1.5px solid var(--glass-border-strong)",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                        transform: "perspective(800px) rotateY(-10deg) rotateX(3deg)",
                      }}
                    >
                      {/* Download screen */}
                      <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, rgba(213,156,124,0.2), rgba(213,156,124,0.05))",
                            border: "1px solid rgba(213,156,124,0.3)",
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" className="w-8 h-8">
                            <path d="M12 2v10m0 0l-3-3m3 3l3-3M3 17l1.5 3h15L21 17" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-base gold-text">BankVi</div>
                          <div className="text-[10px] text-[var(--text-muted)] mt-0.5">v1.0 Production</div>
                        </div>
                        <div className="space-y-2 w-full mt-2">
                          {["iOS", "Android"].map((s) => (
                            <div key={s} className="w-full py-2 rounded-xl text-center text-[11px] font-semibold"
                              style={{
                                background: "linear-gradient(135deg, rgba(213,156,124,0.15), rgba(213,156,124,0.06))",
                                border: "1px solid rgba(213,156,124,0.2)",
                                color: "var(--gold)",
                              }}>
                              {s} — {t("soon")}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* glow */}
                    <div
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-8 rounded-full blur-xl"
                      style={{ background: "rgba(213,156,124,0.35)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
