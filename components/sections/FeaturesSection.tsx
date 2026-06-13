"use client";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { Check } from "lucide-react";

const features = [
  {
    key: "esso",
    gradient: "from-amber-500/20 to-orange-400/10",
    accentColor: "#F59E0B",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <circle cx="20" cy="20" r="16" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="4 2" className="animate-spin-slow" />
        {[0,1,2,3,4,5].map((i) => {
          const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
          return (
            <circle key={i} cx={20 + 11 * Math.cos(angle)} cy={20 + 11 * Math.sin(angle)} r="3"
              fill={i < 3 ? "var(--gold)" : "rgba(213,156,124,0.3)"} />
          );
        })}
        <circle cx="20" cy="20" r="4" fill="var(--gold)" />
      </svg>
    ),
  },
  {
    key: "tiro",
    gradient: "from-emerald-500/15 to-teal-400/8",
    accentColor: "#10B981",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="8" y="28" width="5" height="8" rx="1.5" fill="rgba(213,156,124,0.3)" />
        <rect x="15" y="22" width="5" height="14" rx="1.5" fill="rgba(213,156,124,0.5)" />
        <rect x="22" y="16" width="5" height="20" rx="1.5" fill="rgba(213,156,124,0.7)" />
        <rect x="29" y="10" width="5" height="26" rx="1.5" fill="var(--gold)" />
        <path d="M8 24 L15 18 L22 13 L29 8" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "wallet",
    gradient: "from-blue-500/15 to-indigo-400/8",
    accentColor: "#6366F1",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        <rect x="6" y="12" width="28" height="20" rx="4" stroke="var(--gold)" strokeWidth="1.5" />
        <rect x="26" y="18" width="8" height="8" rx="2" fill="var(--gold)" opacity="0.6" />
        <circle cx="29" cy="22" r="1.5" fill="var(--gold)" />
        <line x1="10" y1="17" x2="22" y2="17" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
  {
    key: "blockchain",
    gradient: "from-purple-500/15 to-violet-400/8",
    accentColor: "#8B5CF6",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
        {[[20,8],[32,16],[32,28],[20,36],[8,28],[8,16]].map(([x,y], i) => (
          <polygon key={i} points={`${x},${y-4} ${x+4},${y} ${x},${y+4} ${x-4},${y}`}
            fill="var(--gold)" opacity={0.3 + i * 0.12} />
        ))}
        <line x1="20" y1="12" x2="28" y2="20" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <line x1="28" y1="20" x2="20" y2="32" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <line x1="20" y1="32" x2="12" y2="20" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <line x1="12" y1="20" x2="20" y2="12" stroke="var(--gold)" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="20" r="3" fill="var(--gold)" />
      </svg>
    ),
  },
];

function FeatureCard({ feature, index, t }: { feature: typeof features[0]; index: number; t: ReturnType<typeof useTranslations> }) {
  const details = [
    t(`${feature.key}_detail_1` as "esso_detail_1"),
    t(`${feature.key}_detail_2` as "esso_detail_2"),
    t(`${feature.key}_detail_3` as "esso_detail_3"),
  ];

  return (
    <Tilt3D className="h-full">
      <div
        className="glass-real rounded-3xl p-7 h-full group cursor-default transition-all duration-500 hover:border-[var(--gold-dark)]"
        style={{
          boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
          minHeight: 380,
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${feature.accentColor}66, transparent)` }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl mb-5 p-3 transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, rgba(213,156,124,0.12), rgba(213,156,124,0.04))`,
            border: "1px solid rgba(213,156,124,0.2)",
          }}
        >
          {feature.icon}
        </div>

        {/* Title */}
        <h3 className="text-title text-[var(--text)] mb-3">
          {t(`${feature.key}_title` as "esso_title")}
        </h3>

        {/* Desc */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
          {t(`${feature.key}_desc` as "esso_desc")}
        </p>

        {/* Details */}
        <ul className="space-y-2.5">
          {details.map((d, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 shrink-0"
                style={{ background: "rgba(213,156,124,0.15)", border: "1px solid rgba(213,156,124,0.3)" }}
              >
                <Check size={9} className="gold-text-solid" />
              </div>
              {d}
            </li>
          ))}
        </ul>

        {/* Corner number */}
        <div
          className="absolute bottom-5 right-6 text-5xl font-bold opacity-[0.04] dark:opacity-[0.06] select-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          0{index + 1}
        </div>
      </div>
    </Tilt3D>
  );
}

export function FeaturesSection({ locale }: { locale: string }) {
  const t = useTranslations("features");

  return (
    <section id="features" className="relative py-24 lg:py-32 px-5 lg:px-8">
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5"
          >
            <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h2 className="text-headline text-[var(--text)] mb-4">{t("title")}</h2>
          <p className="text-lg text-[var(--text-muted)] leading-relaxed">{t("subtitle")}</p>
        </ScrollReveal>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {features.map((feature, i) => (
            <ScrollReveal key={feature.key} delay={i * 100} mode="scale">
              <FeatureCard feature={feature} index={i} t={t} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
