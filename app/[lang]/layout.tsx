import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { GlassOrbs } from "@/components/effects/GlassOrbs";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === "fr" ? "BankVi — Néo-banque communautaire digitale" : "BankVi — Digital Community Neo-bank",
    description:
      lang === "fr"
        ? "Tontines digitales, épargne intelligente et wallet Mobile Money pour l'Afrique de l'Ouest."
        : "Digital tontines, smart savings and Mobile Money wallet for West Africa.",
    openGraph: {
      title: "BankVi",
      siteName: "BankVi",
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as "fr" | "en")) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={lang}>
      <ThemeProvider>
        <div className="min-h-screen bg-theme text-theme transition-colors duration-300 relative">
          <GlassOrbs />
          <Navbar locale={lang} />
          <main className="relative z-10">{children}</main>
          <Footer locale={lang} />
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
