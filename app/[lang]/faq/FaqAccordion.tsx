"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem { id: number; question: string; answer: string; }

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="glass-real rounded-2xl overflow-hidden transition-all duration-300 hover:border-[var(--gold-dark)]"
          style={{ boxShadow: open === faq.id ? "0 8px 32px rgba(213,156,124,0.12)" : "none" }}
        >
          <button
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
            className="w-full flex items-center justify-between p-6 text-left gap-4 group"
          >
            <span className="font-semibold text-sm text-[var(--text)] group-hover:text-[var(--gold)] transition-colors duration-200 leading-snug">
              {faq.question}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
              style={{
                background: open === faq.id ? "var(--gold)" : "rgba(213,156,124,0.1)",
                border: "1px solid rgba(213,156,124,0.25)",
                color: open === faq.id ? "white" : "var(--gold)",
              }}
            >
              {open === faq.id ? <Minus size={12} /> : <Plus size={12} />}
            </div>
          </button>

          <div
            style={{
              maxHeight: open === faq.id ? 500 : 0,
              overflow: "hidden",
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <div className="px-6 pb-6 text-sm text-[var(--text-muted)] leading-relaxed"
              style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "1rem" }}>
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
