
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

async function getPosts(lang: string) {
  try {
    const r = await fetch(`${BACKEND}/api/v1/public/blog?lang=${lang}`, /*{ next: { revalidate: 1800 } }*/);
    const d = await r.json();
    return d?.data ?? d ?? [];
  } catch { return []; }
}


const placeholderPosts = [
  { id: 1, title: "BankVi révolutionne la tontine en Afrique de l'Ouest", excerpt: "Découvrez comment notre plateforme transforme la pratique ancestrale des tontines en un système digital sécurisé.", date: "2025-05-01", category: "Produit", cover_image: "" },
  { id: 2, title: "ESSO : la tontine 3.0 propulsée par la blockchain", excerpt: "Notre module ESSO enregistre chaque tirage sur la blockchain Polygon pour une transparence totale et irréfutable.", date: "2025-04-15", category: "Technologie", cover_image: "" },
  { id: 3, title: "Partenariat FedaPay : paiements Mobile Money sans friction", excerpt: "L'intégration native de FedaPay permet les dépôts et retraits Flooz / T-Money directement dans l'application.", date: "2025-04-01", category: "Finance", cover_image: "" },
  { id: 4, title: "La Tironienne : votre épargne programmable à portée de main", excerpt: "Créez autant de sous-comptes d'épargne que vous voulez, avec des objectifs personnalisés et un suivi de progression.", date: "2025-03-15", category: "Produit", cover_image: "" },
];

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations("blog");
  const posts = (await getPosts(lang)).length ? await getPosts(lang) : placeholderPosts;

  const categories = ["Produit", "Technologie", "Finance"];
  const catColors: Record<string, { bg: string; text: string }> = {
    Produit: { bg: "rgba(213,156,124,0.12)", text: "var(--gold)" },
    Technologie: { bg: "rgba(99,102,241,0.12)", text: "rgb(129,140,248)" },
    Finance: { bg: "rgba(34,197,94,0.12)", text: "rgb(34,197,94)" },
  };

  return (
    <main className="min-h-screen pt-28 pb-20 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5">
            <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h1 className="text-headline text-[var(--text)] mb-4">{t("title")}</h1>
          <p className="text-lg text-[var(--text-muted)]">{t("subtitle")}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[var(--text-muted)]">{t("no_posts")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: { id: number; slug?: string; title: string; excerpt: string; date: string; category?: string; cover_image?: string }) => {
              const cat = post.category ?? categories[post.id % categories.length];
              const c = catColors[cat] ?? catColors["Produit"];
              const href = `/${lang}/blog/${post.slug ?? post.id}`;
              return (
                <Link key={post.id} href={href} className="group block h-full">
                  <div
                    className="glass-real rounded-3xl overflow-hidden h-full flex flex-col transition-all duration-400 hover:border-[var(--gold-dark)] hover:-translate-y-1.5"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
                  >
                    {/* Cover image */}
                    <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
                      {post.cover_image ? (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${c.bg.replace("0.12","0.3")} 0%, rgba(213,156,124,0.04) 100%)`,
                          }}
                        >
                          <span
                            className="text-6xl font-bold select-none"
                            style={{ color: c.text, opacity: 0.12 }}
                          >
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      {/* Gradient fade bottom */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-16 pointer-events-none"
                        style={{
                          background: "linear-gradient(to top, var(--bg-card), transparent)",
                        }}
                      />
                      {/* Hover shimmer */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: "linear-gradient(135deg, rgba(213,156,124,0.10) 0%, transparent 60%)" }}
                      />
                      {/* Category pill over image */}
                      <div className="absolute top-3 left-3">
                        <div
                          className="px-3 py-1 rounded-full text-[11px] font-semibold"
                          style={{
                            background: "rgba(10,10,10,0.60)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.10)",
                            color: c.text,
                          }}
                        >
                          {cat}
                        </div>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex flex-col flex-1 p-6">
                      <h2 className="font-bold text-base text-[var(--text)] mb-2.5 leading-snug group-hover:text-[var(--gold)] transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                      <div
                        className="flex items-center justify-between mt-5 pt-4"
                        style={{ borderTop: "1px solid var(--glass-border)" }}
                      >
                        <span className="text-[11px] text-[var(--text-faint)]">
                          {new Date(post.date).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                        <span className="text-xs font-semibold gold-text-solid flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                          {t("read_more")} <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}