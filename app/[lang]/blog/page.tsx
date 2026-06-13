import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

async function getPosts(lang: string) {
  try {
    const r = await fetch(`${BACKEND}/api/blog/posts/?lang=${lang}`, { next: { revalidate: 1800 } });
    const d = await r.json();
    return d?.results ?? d ?? [];
  } catch { return []; }
}

const placeholderPosts = [
  { id: 1, title: "BankVi révolutionne la tontine en Afrique de l'Ouest", excerpt: "Découvrez comment notre plateforme transforme la pratique ancestrale des tontines en un système digital sécurisé.", date: "2025-05-01", category: "Produit" },
  { id: 2, title: "ESSO : la tontine 3.0 propulsée par la blockchain", excerpt: "Notre module ESSO enregistre chaque tirage sur la blockchain Polygon pour une transparence totale et irréfutable.", date: "2025-04-15", category: "Technologie" },
  { id: 3, title: "Partenariat FedaPay : paiements Mobile Money sans friction", excerpt: "L'intégration native de FedaPay permet les dépôts et retraits Flooz / T-Money directement dans l'application.", date: "2025-04-01", category: "Finance" },
  { id: 4, title: "La Tironienne : votre épargne programmable à portée de main", excerpt: "Créez autant de sous-comptes d'épargne que vous voulez, avec des objectifs personnalisés et un suivi de progression.", date: "2025-03-15", category: "Produit" },
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
            {posts.map((post: { id: number; title: string; excerpt: string; date: string; category?: string }) => {
              const cat = post.category ?? categories[post.id % categories.length];
              const c = catColors[cat] ?? catColors["Produit"];
              return (
                <Link key={post.id} href={`/${lang}/blog/${post.id}`} className="group block">
                  <div
                    className="glass-real rounded-3xl p-7 h-full flex flex-col transition-all duration-400 hover:border-[var(--gold-dark)] hover:-translate-y-1.5"
                    style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)", minHeight: 280 }}
                  >
                    <div
                      className="inline-flex self-start px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                      style={{ background: c.bg, color: c.text }}
                    >
                      {cat}
                    </div>
                    <h2 className="font-bold text-base text-[var(--text)] mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: "1px solid var(--glass-border)" }}>
                      <span className="text-[11px] text-[var(--text-faint)]">
                        {new Date(post.date).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" })}
                      </span>
                      <span className="text-xs font-semibold gold-text-solid flex items-center gap-1 group-hover:gap-2 transition-all">
                        {t("read_more")} <ArrowRight size={12} />
                      </span>
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
