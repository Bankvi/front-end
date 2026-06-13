import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

async function getPost(slug: string, lang: string) {
  try {
    const r = await fetch(`${BACKEND}/api/v1/public/blog/${slug}/?lang=${lang}`, { next: { revalidate: 3600 } });
    console.log(`Fetching blog post: ${slug} (${lang}) returned status ${r.status}`);
    return r.ok ? r.json() : null;
  } catch { return null; }
}


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const t = await getTranslations("blog");
  const post = (await getPost(slug, lang)).data;

  if (!post) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-5 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="glass-real rounded-3xl p-12 text-center">
            <div className="text-6xl font-bold gold-text mb-4">404</div>
            <div className="text-[var(--text-muted)] mb-8 text-lg">Article introuvable</div>
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                boxShadow: "0 4px 20px rgba(213,156,124,0.35)",
              }}
            >
              {t("back")}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* ── Hero cover ── */}
      {post.cover_image ? (
        <div className="relative w-full overflow-hidden" style={{ height: "clamp(300px, 45vw, 520px)" }}>
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
            style={{ transform: "scale(1.05)" }}
          />
          {/* Multi-layer overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 60%, var(--bg) 100%)",
            }}
          />
          {/* Glass panel at bottom of hero */}
          <div className="absolute inset-x-0 bottom-0 px-5 lg:px-8 pb-10 pt-20">
            <div className="max-w-3xl mx-auto">
              {post.category && (
                <div
                  className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                  style={{
                    background: "rgba(213,156,124,0.25)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(213,156,124,0.4)",
                    color: "var(--gold-light)",
                  }}
                >
                  {post.category}
                </div>
              )}
              <h1
                className="text-headline leading-tight"
                style={{ color: "#FFFFFF", textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}
              >
                {post.title}
              </h1>
              <div className="mt-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
                {t("published")}{" "}
                {new Date(post.date ?? post.created_at ?? Date.now()).toLocaleDateString(lang, {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </div>
            </div>
          </div>
          {/* Back button over cover */}
          <div className="absolute top-0 left-0 right-0 pt-24 px-5 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <Link
                href={`/${lang}/blog`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 group"
                style={{
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(0,0,0,0.25)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  padding: "6px 14px",
                  borderRadius: "99px",
                }}
              >
                <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform">
                  <path d="M0 5h9M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("back")}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* No cover — simple top bar */
        <div className="pt-28 px-5 lg:px-8">
          <div className="max-w-3xl mx-auto mb-10">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors group"
            >
              <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3 rotate-180 group-hover:-translate-x-0.5 transition-transform">
                <path d="M0 5h9M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("back")}
            </Link>
          </div>
        </div>
      )}

      {/* ── Article body ── */}
      <div className="px-5 lg:px-8 mt-6">
        <div className="max-w-3xl mx-auto">
          {/* Meta row if no cover (title shown here) */}
          {!post.cover_image && (
            <div className="mb-8">
              {post.category && (
                <div
                  className="inline-flex px-3 py-1 rounded-full text-[11px] font-semibold mb-4"
                  style={{ background: "rgba(213,156,124,0.12)", color: "var(--gold)" }}
                >
                  {post.category}
                </div>
              )}
              <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
                {t("published")}{" "}
                {new Date(post.date ?? post.created_at ?? Date.now()).toLocaleDateString(lang, {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </div>
              <h1 className="text-headline text-[var(--text)] leading-tight">{post.title}</h1>
            </div>
          )}

          <div
            className="glass-real rounded-3xl p-8 lg:p-12"
            style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.08)" }}
          >
            <div
              className="prose prose-sm max-w-none leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content ?? post.body ?? post.excerpt ?? ""}
              </ReactMarkdown>
            </div>
          </div>

          {/* Back link bottom */}
          <div className="mt-10 text-center">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                color: "white",
                boxShadow: "0 4px 20px rgba(213,156,124,0.35)",
              }}
            >
              {t("back")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}