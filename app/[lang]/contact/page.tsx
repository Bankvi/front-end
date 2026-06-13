import { getTranslations } from "next-intl/server";
import { ContactForm } from "./ContactForm";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations("contact");

  const infos = [
    { label: t("address_title"), value: t("address"), icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
    { label: t("email_title"), value: t("email_value"), icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { label: t("phone_title"), value: t("phone_value"), icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-real mb-5">
            <span className="text-xs font-semibold gold-text-solid tracking-widest uppercase">{t("badge")}</span>
          </div>
          <h1 className="text-headline text-[var(--text)] mb-4">{t("title")}</h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {infos.map((info) => (
              <div
                key={info.label}
                className="glass-real rounded-2xl p-6 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(213,156,124,0.15), rgba(213,156,124,0.05))",
                    border: "1px solid rgba(213,156,124,0.25)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 w-[18px] h-[18px]">
                    <path d={info.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">{info.label}</div>
                  <div className="text-sm font-medium text-[var(--text)]">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div
              className="glass-real rounded-3xl p-8"
              style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.08)" }}
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
