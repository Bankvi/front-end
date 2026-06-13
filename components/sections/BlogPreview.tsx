"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Post { id: number; slug?: string; title: string; excerpt: string; date: string; category?: string; cover_image?: string; }

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

const placeholderPosts: Post[] = [
  { id: 1, title: "BankVi révolutionne la tontine en Afrique de l'Ouest", excerpt: "Découvrez comment notre plateforme transforme la pratique ancestrale des tontines en un système digital sécurisé.", date: "2025-05-01", category: "Produit", cover_image: "" },
  { id: 2, title: "ESSO : la tontine 3.0 propulsée par la blockchain", excerpt: "Notre module ESSO enregistre chaque tirage sur la blockchain Polygon pour une transparence totale et irréfutable.", date: "2025-04-15", category: "Technologie", cover_image: "" },
  { id: 3, title: "Partenariat FedaPay : paiements Mobile Money sans friction", excerpt: "L'intégration native de FedaPay permet les dépôts et retraits Flooz / T-Money directement dans l'application.", date: "2025-04-01", category: "Finance", cover_image: "" },
];

export function BlogPreview({ locale }: { locale: string }) {
  const t = useTranslations("blog");
  const [posts, setPosts] = useState<Post[]>(placeholderPosts);

  useEffect(() => {
    fetch(`${BACKEND}/api/v1/public/blog?lang=${locale}&limit=3`)
      .then((r) => r.json())
      .then((d) => { if (d?.data?.length) setPosts(d.data); })
      .catch(() => {});
  }, [locale]);

  const categories = ["Produit", "Technologie", "Finance"];
  const catColors: Record<string, string> = {
    Produit: "rgba(213,156,124,0.12)",
    Technologie: "rgba(99,102,241,0.12)",
    Finance: "rgba(34,197,94,0.12)",
  };
  const catText: Record<string, string> = {
    Produit: "var(--gold)",
    Technologie: "rgb(129,140,248)",
    Finance: "rgb(34,197,94)",
  };

  return (
    <section className="relative py-24 lg:py-28 px-5 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5">
              <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
            </div>
            <h2 className="text-headline text-[var(--text)]">{t("title")}</h2>
            <p className="text-[var(--text-muted)] mt-2 text-base">{t("subtitle")}</p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass-real text-[var(--text-muted)] hover:text-[var(--gold)] transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t("all_posts")} <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => {
            const cat = post.category ?? categories[i % categories.length];
            const href = `/${locale}/blog/${post.slug ?? post.id}`;
            return (
              <ScrollReveal key={post.id} delay={i * 100} mode="scale">
                <Tilt3D className="h-full">
                  <Link href={href} className="block h-full group">
                    <div
                      className="glass-real rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-400 hover:border-[var(--gold-dark)] hover:-translate-y-1"
                      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
                    >
                      {/* Cover image */}
                      <div
                        className="relative w-full overflow-hidden"
                        style={{ height: 180 }}
                      >
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          /* Fallback gradient cover when no image */
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                              background: `linear-gradient(135deg,
                                ${catColors[cat] ? catColors[cat].replace("0.12","0.25") : "rgba(213,156,124,0.25)"} 0%,
                                rgba(213,156,124,0.05) 100%)`,
                            }}
                          >
                            <span
                              className="text-5xl font-bold opacity-10 select-none"
                              style={{ color: catText[cat] ?? "var(--gold)" }}
                            >
                              {post.title.charAt(0)}
                            </span>
                          </div>
                        )}
                        {/* Shimmer overlay on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: "linear-gradient(135deg, rgba(213,156,124,0.12) 0%, transparent 60%)",
                          }}
                        />
                        {/* Category badge over the image */}
                        <div className="absolute top-3 left-3">
                          <div
                            className="px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md"
                            style={{
                              background: "rgba(10,10,10,0.55)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              color: catText[cat] ?? "var(--gold)",
                            }}
                          >
                            {cat}
                          </div>
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex flex-col flex-1 p-6">
                        <h3 className="font-bold text-base text-[var(--text)] mb-2.5 leading-snug group-hover:text-[var(--gold)] transition-colors duration-200 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div
                          className="flex items-center justify-between mt-5 pt-4"
                          style={{ borderTop: "1px solid var(--glass-border)" }}
                        >
                          <span className="text-[11px] text-[var(--text-faint)]">
                            {new Date(post.date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <span className="text-xs font-semibold gold-text-solid flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                            {t("read_more")} <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Tilt3D>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}