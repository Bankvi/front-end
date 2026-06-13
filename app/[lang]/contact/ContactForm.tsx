"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://api-bankvi.duckdns.org";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [data, setData] = useState({ name: "", email: "", subject: "", message: "" });

  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const submit = async () => {
    setStatus("sending");
    try {
      const r = await fetch(`${BACKEND}/api/v1/public/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(r.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  const inputClass = `
    w-full px-4 py-3.5 rounded-2xl text-sm text-[var(--text)] font-medium
    transition-all duration-200 outline-none
    placeholder:text-[var(--text-faint)]
    focus:border-[var(--gold-dark)]
  `;
  const inputStyle = {
    background: "var(--bg-card)",
    border: "1.5px solid var(--glass-border)",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.04)",
  };
  const focusStyle = { "--focus-border": "var(--gold)" } as React.CSSProperties;

  if (status === "ok") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
        >
          <CheckCircle size={28} className="text-emerald-500" />
        </div>
        <div>
          <div className="font-bold text-lg text-[var(--text)] mb-1">{t("success")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={inputClass} style={inputStyle} placeholder={t("name_placeholder")} value={data.name} onChange={set("name")} />
        <input className={inputClass} style={inputStyle} type="email" placeholder={t("email_placeholder")} value={data.email} onChange={set("email")} />
      </div>
      <input className={inputClass} style={inputStyle} placeholder={t("subject_placeholder")} value={data.subject} onChange={set("subject")} />
      <textarea
        className={`${inputClass} resize-none`}
        style={{ ...inputStyle, minHeight: 140 }}
        placeholder={t("message_placeholder")}
        value={data.message}
        onChange={set("message")}
      />
      {status === "err" && (
        <div className="text-sm text-red-400 px-1">{t("error")}</div>
      )}
      <button
        onClick={submit}
        disabled={status === "sending" || !data.name || !data.email || !data.message}
        className="w-full py-4 rounded-2xl font-semibold text-sm text-white flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
          boxShadow: "0 8px 24px rgba(213,156,124,0.35)",
        }}
      >
        <Send size={15} />
        {status === "sending" ? t("sending") : t("send")}
      </button>
    </div>
  );
}
