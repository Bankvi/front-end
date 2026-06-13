import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const API_BASE = "https://api-bankvi.duckdns.org/api/v1/public";

export async function fetchBlogPosts() {
  try {
    const res = await fetch(`${API_BASE}/blog/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function fetchBlogPost(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/blog/${slug}/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export async function fetchFAQs() {
  try {
    const res = await fetch(`${API_BASE}/faq/`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export async function submitContact(payload: {
  full_name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export function formatDate(dateStr: string, locale: string) {
  try {
    return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}
