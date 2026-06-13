import { getTranslations } from "next-intl/server";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

async function getPost(slug: string, lang: string) {
  try {
    const r = await fetch(`${BACKEND}/api/blog/posts/${slug}/?lang=${lang}`, { next: { revalidate: 3600 } });
    return r.ok ? r.json() : null;
  } catch { return null; }
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const t = await getTranslations("blog");
  const post = await getPost(slug, lang);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl font-bold gold-text mb-4">404</div>
          <div className="text-[var(--text-muted)] mb-6">Article introuvable</div>
          <Link href={`/${lang}/blog`} className="text-sm font-semibold gold-text-solid hover:underline">{t("back")}</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-5 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors mb-10">
          <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3 rotate-180"><path d="M0 5h9M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {t("back")}
        </Link>
        <div className="glass-real rounded-3xl p-8 lg:p-12">
          <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            {t("published")} {new Date(post.date).toLocaleDateString(lang, { day: "numeric", month: "long", year: "numeric" })}
          </div>
          <h1 className="text-headline text-[var(--text)] mb-8">{post.title}</h1>
          <div className="prose prose-sm max-w-none text-[var(--text-muted)] leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content ?? post.excerpt}</ReactMarkdown>
          </div>
        </div>
      </div>
    </main>
  );
}
