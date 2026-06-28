"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface FooterProps { locale: string; }

export function Footer({ locale }: FooterProps) {
  const t = useTranslations("footer");
  const nt = useTranslations("nav");

  return (
    <footer className="relative pt-20 pb-8 px-5 lg:px-8" style={{ borderTop: "1px solid var(--glass-border)" }}>
      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 mb-5 group">
              <div
                className="w-9 h-9 rounded-xl overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, rgba(213,156,124,0.15), rgba(213,156,124,0.05))",
                  border: "1px solid var(--glass-border-strong)",
                }}
              >
                <Image src="/images/logo.png" alt="BankVi" fill className="object-contain p-1"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <span className="font-bold text-lg gold-text" style={{ letterSpacing: "-0.03em" }}>BankVi</span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{t("tagline")}</p>
            {/* Social / location pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[var(--text-muted)]"
              style={{ background: "rgba(213,156,124,0.06)", border: "1px solid rgba(213,156,124,0.12)" }}
            >
              <span className="text-base">TG</span>
              Lomé, Togo — {t("made_in").replace("Fait avec passion au Togo", "").replace("Made with passion in Togo", "").trim() || t("made_in")}
            </div>
          </div>

          {/* Product links */}
          <div>
            <div className="text-xs font-bold text-[var(--text)] tracking-widest uppercase mb-5">{t("product")}</div>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/#features`, label: t("features") },
                { href: `/${locale}/#download`, label: t("download") },
                { href: `/${locale}/blog`, label: t("blog") },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="text-xs font-bold text-[var(--text)] tracking-widest uppercase mb-5">{t("support")}</div>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/faq`, label: t("faq") },
                { href: `/${locale}/contact`, label: t("contact") },
                { href: `/${locale}/docs`, label: t("docs") },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-bold text-[var(--text)] tracking-widest uppercase mb-5">{t("legal")}</div>
            <ul className="space-y-3">
              {[
                { href: `/${locale}/legal/terms`, label: t("terms") },
                { href: `/${locale}/legal/privacy`, label: t("privacy") },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid var(--glass-border)" }}
        >
          <span className="text-xs text-[var(--text-faint)]">
            &copy; {new Date().getFullYear()} BankVi. {t("rights")}
          </span>
          {/* Polygon badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)", color: "rgb(167,139,250)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            Propulsé par Polygon
          </div>
          <span className="text-xs text-[var(--text-faint)]">
            {t("made_in")}  by <Link href={"https://faychal.vercel.app"} className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200">
                                KGF Studio
                              </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
