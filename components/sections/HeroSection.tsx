"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Download, Users, Zap, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const stats = [
  { key: "stats_users", value: 5000, suffix: "+", icon: Users, label: "Utilisateurs" },
  { key: "stats_essos", value: 320, suffix: "+", icon: Zap, label: "ESSO actifs" },
  { key: "stats_txns", value: 12000, suffix: "+", icon: TrendingUp, label: "Transactions" },
  { key: "stats_secure", value: 100, suffix: "%", icon: Shield, label: "Sécurisé" },
];

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return val;
}

function StatCard({ stat, active, t }: { stat: typeof stats[0]; active: boolean; t: ReturnType<typeof useTranslations> }) {
  const val = useCountUp(stat.value, active);
  const Icon = stat.icon;
  return (
    <div
      className="glass-real rounded-2xl p-5 text-center group hover:border-[var(--gold-dark)] transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
        style={{
          background: "linear-gradient(135deg, rgba(213,156,124,0.18), rgba(213,156,124,0.06))",
          border: "1px solid rgba(213,156,124,0.25)",
        }}
      >
        <Icon size={16} className="gold-text-solid" />
      </div>
      <div className="font-bold text-2xl text-[var(--text)] tabular-nums">
        {active ? val.toLocaleString() : "0"}{stat.suffix}
      </div>
      <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">
        {t(stat.key as "stats_users")}
      </div>
    </div>
  );
}

// Animated phone mockup — pure CSS 3D
function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 260, perspective: 1200 }}>
      <div className="animate-phone">
        {/* Phone shell */}
        <div
          className="relative rounded-[2.8rem] overflow-hidden shimmer"
          style={{
            width: 240,
            height: 500,
            background: "linear-gradient(145deg, var(--bg-card) 0%, var(--bg-surface) 100%)",
            border: "1.5px solid var(--glass-border-strong)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset, 20px 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <span className="text-[10px] font-semibold text-[var(--text-muted)]">9:41</span>
            <div
              className="w-20 h-5 rounded-full"
              style={{ background: "var(--bg-card)", border: "1px solid var(--glass-border)" }}
            />
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-2 rounded-sm" style={{ background: "var(--gold)", opacity: 0.7 }} />
            </div>
          </div>

          {/* App content */}
          <div className="px-5 space-y-3 mt-1">
            {/* Balance card */}
            <div
              className="glass-real rounded-2xl p-4"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)" }}
            >
              <div className="text-[10px] font-semibold text-[var(--text-muted)] mb-1">Wallet principal</div>
              <div className="font-bold text-xl gold-text">485 200 XOF</div>
              <div className="flex gap-2 mt-3">
                {["Dépôt", "Retrait", "ESSO"].map((label) => (
                  <div
                    key={label}
                    className="flex-1 py-1.5 rounded-xl text-[9px] font-semibold text-center text-white"
                    style={{ background: "linear-gradient(135deg, var(--gold-dark), var(--gold))" }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* ESSO card */}
            <div
              className="glass-real rounded-2xl p-4"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] font-semibold text-[var(--text-muted)]">ESSO Famille</div>
                <div
                  className="px-2 py-0.5 rounded-full text-[8px] font-bold"
                  style={{ background: "rgba(34,197,94,0.15)", color: "rgb(34,197,94)" }}
                >
                  ACTIF
                </div>
              </div>
              <div className="text-[11px] font-bold text-[var(--text)] mb-2">Cycle 3 sur 6</div>
              {/* Progress bar */}
              <div className="h-1.5 rounded-full bg-[var(--bg-card)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "50%",
                    background: "linear-gradient(90deg, var(--gold-dark), var(--gold-light))",
                  }}
                />
              </div>
              <div className="flex justify-between text-[8px] text-[var(--text-faint)] mt-1">
                <span>3/6 membres cotisés</span>
                <span>25 000 XOF</span>
              </div>
            </div>

            {/* Tironienne */}
            <div
              className="glass-real rounded-2xl p-4"
            >
              <div className="text-[10px] font-semibold text-[var(--text-muted)] mb-2">Tironienne — Voiture</div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold gold-text">1 250 000</span>
                <span className="text-[var(--text-faint)]">/ 2 000 000</span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--bg-card)] mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "62.5%",
                    background: "linear-gradient(90deg, var(--gold-dark), var(--gold))",
                  }}
                />
              </div>
            </div>

            <div
              className="glass-real rounded-2xl pl-4 pt-2 pb-2"
            >
              <div className="text-[9px] text-[var(--text-muted)] font-medium">Dépôt reçu</div>
              <div className="text-[11px] font-bold text-emerald-500">+25 000 XOF</div>
            </div>
          </div>

          {/* Bottom nav bar */}
          <div
            className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-4 py-4"
            style={{
              background: "linear-gradient(to top, var(--bg-card), transparent)",
              borderTop: "1px solid var(--glass-border)",
            }}
          >
            {["Accueil", "ESSO", "Épargne", "Wallet", "Profil"].map((item, i) => (
              <div key={item} className="flex flex-col items-center gap-0.5">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: i === 0 ? "var(--gold)" : "var(--text-faint)" }}
                />
                <div
                  className="text-[7px] font-medium"
                  style={{ color: i === 0 ? "var(--gold)" : "var(--text-faint)" }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Glow under phone */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-2xl"
          style={{ background: "radial-gradient(ellipse, rgba(213,156,124,0.4), transparent)" }}
        />
        {/* Side reflection */}
        <div
          className="absolute top-20 -right-4 w-1.5 h-40 rounded-full blur-sm opacity-60"
          style={{ background: "linear-gradient(to bottom, var(--gold-light), transparent)" }}
        />
            
      </div>

      {/* Floating badges 
      <div
        className="animate-float absolute -left-12 top-16 glass-real rounded-2xl px-3.5 py-2.5"
        style={{ animationDelay: "0.5s", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="text-[9px] text-[var(--text-muted)] font-medium">Tirage ESSO</div>
        <div className="text-[11px] font-bold gold-text">Koffi a gagné !</div>
      </div>
      <div
        className="animate-float absolute -right-10 bottom-28 glass-real rounded-2xl px-3.5 py-2.5"
        style={{ animationDelay: "1.8s", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="text-[9px] text-[var(--text-muted)] font-medium">Dépôt reçu</div>
        <div className="text-[11px] font-bold text-emerald-500">+25 000 XOF</div>
      </div>
      <div
        className="animate-float absolute -left-8 bottom-44 glass-real rounded-2xl px-3 py-2"
        style={{ animationDelay: "3s", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[9px] font-semibold text-[var(--text)]">Polygon</span>
        </div>
        <div className="text-[8px] text-[var(--text-muted)]">Tx validée</div>
      </div>*/}


    </div>
  );
}

export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 lg:px-8 pt-24 pb-16 overflow-hidden">
      {/* Decorative ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow opacity-[0.04] dark:opacity-[0.06]"
        style={{
          width: 900, height: 900,
          border: "1px solid var(--gold)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-spin-slow opacity-[0.03] dark:opacity-[0.04]"
        style={{
          width: 700, height: 700,
          border: "1px dashed var(--gold)",
          animationDirection: "reverse",
          animationDuration: "30s",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — text */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-8 animate-fade-up"
              style={{ animationDelay: "0.05s", animationFillMode: "forwards", opacity: 0 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "var(--gold)",
                  boxShadow: "0 0 6px var(--gold)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">
                {t("badge")}
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-display mb-6 animate-fade-up"
              style={{ animationDelay: "0.15s", animationFillMode: "forwards", opacity: 0 }}
            >
              <span className="block text-[var(--text)]">{t("title_1")}</span>
              <span className="block gold-text">{t("title_2")}</span>
              <span className="block text-[var(--text)]">{t("title_3")}</span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg lg:text-xl text-[var(--text-muted)] leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-up"
              style={{ animationDelay: "0.28s", animationFillMode: "forwards", opacity: 0 }}
            >
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards", opacity: 0 }}
            >
              <Link
                href={`/${locale}/#download`}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 60%, var(--gold-light) 100%)",
                  boxShadow: "0 8px 32px rgba(213,156,124,0.40), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                <Download size={16} className="group-hover:animate-bounce" />
                {t("cta_primary")}
              </Link>
              <Link
                href={`/${locale}/#features`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-semibold text-sm glass-real text-[var(--text)] hover:text-[var(--gold)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {t("cta_secondary")}
                <ArrowRight size={15} />
              </Link>
            </div>

            {/* Trust chips */}
            <div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-10 animate-fade-up"
              style={{ animationDelay: "0.52s", animationFillMode: "forwards", opacity: 0 }}
            >
              {["Polygon blockchain", "FedaPay", "KYC vérifié", "Flutter natif"].map((chip) => (
                <div
                  key={chip}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
                  style={{
                    background: "rgba(213,156,124,0.08)",
                    border: "1px solid rgba(213,156,124,0.2)",
                    color: "var(--text-muted)",
                  }}
                >
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: "var(--gold)" }}
                  />
                  {chip}
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone mockup */}
          <div
            className="flex justify-center lg:justify-end animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards", opacity: 0 }}
          >
            <PhoneMockup />
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 lg:mt-20"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.key}
              className="reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <StatCard stat={stat} active={statsVisible} t={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
        <div className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent opacity-50" />
        <div
          className="w-1 h-1 rounded-full"
          style={{
            background: "var(--gold)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
