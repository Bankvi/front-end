"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ui/ThemeProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavbarProps { locale: string; }

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations("nav");
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "fr" ? "en" : "fr";
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
    router.push(`/${next}${pathWithoutLocale}`);
  };

  const links = [
    { href: `/${locale}/#features`, label: t("features") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/faq`, label: t("faq") },
    { href: `/${locale}/docs`, label: t("docs") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname.startsWith(href.replace(`/${locale}`, "").split("/")[1] ? href : "___");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong border-b"
            : "bg-transparent"
        )}
        style={{
          borderColor: scrolled ? "var(--glass-border)" : "transparent",
        }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light))",
            boxShadow: "0 0 8px rgba(213,156,124,0.6)",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
              <div
                className="relative w-9 h-9 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(213,156,124,0.15), rgba(213,156,124,0.05))",
                  border: "1px solid var(--glass-border-strong)",
                  boxShadow: "0 2px 12px rgba(213,156,124,0.15)",
                }}
              >
                <Image src="/images/logo.png" alt="BankVi" fill className="object-contain p-1"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <span
                className="font-bold text-xl tracking-tight gold-text"
                style={{ letterSpacing: "-0.03em" }}
              >
                BankVi
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    "hover:text-[var(--gold)] text-[var(--text-muted)]",
                    "hover:bg-[rgba(213,156,124,0.08)]",
                    isActive(l.href) && "text-[var(--gold)] bg-[rgba(213,156,124,0.1)]"
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Lang toggle */}
              <button
                onClick={switchLocale}
                className={cn(
                  "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl",
                  "text-xs font-semibold transition-all duration-200",
                  "text-[var(--text-muted)] hover:text-[var(--gold)]",
                  "hover:bg-[rgba(213,156,124,0.08)]",
                  "border border-transparent hover:border-[var(--glass-border)]"
                )}
                aria-label="Change language"
              >
                <span className="text-sm">{locale === "fr" ? "FR" : "EN"}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 1h6M1 5h8M2 9h6" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggle}
                aria-label={theme === "dark" ? t("theme_light") : t("theme_dark")}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center",
                  "transition-all duration-200",
                  "text-[var(--text-muted)] hover:text-[var(--gold)]",
                  "hover:bg-[rgba(213,156,124,0.08)]",
                  "border border-transparent hover:border-[var(--glass-border)]"
                )}
              >
                {theme === "dark"
                  ? <Sun size={16} />
                  : <Moon size={16} />}
              </button>

              {/* Download CTA */}
              <Link
                href={`/${locale}/#download`}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                  boxShadow: "0 4px 16px rgba(213,156,124,0.35)",
                }}
              >
                {t("download")}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
                aria-label="Menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-400",
            open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
          style={{ transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease" }}
        >
          <div
            className="glass-strong border-t px-5 py-4 space-y-1"
            style={{ borderColor: "var(--glass-border)" }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--gold)] hover:bg-[rgba(213,156,124,0.08)] transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: "var(--glass-border)" }}>
              <button
                onClick={switchLocale}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--gold)] bg-[rgba(213,156,124,0.06)] transition-all"
              >
                {locale === "fr" ? "English" : "Français"}
              </button>
              <button
                onClick={toggle}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--gold)] bg-[rgba(213,156,124,0.06)] transition-all"
              >
                {theme === "dark" ? t("theme_light") : t("theme_dark")}
              </button>
            </div>
            <Link
              href={`/${locale}/#download`}
              onClick={() => setOpen(false)}
              className="block w-full text-center py-3 rounded-xl text-sm font-semibold text-white mt-2 transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                boxShadow: "0 4px 16px rgba(213,156,124,0.35)",
              }}
            >
              {t("download")}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
