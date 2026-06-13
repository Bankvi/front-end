import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BankVi — Néo-banque communautaire digitale",
  description: "Tontines digitales ESSO, épargne Tironienne et wallet Mobile Money. La finance communautaire réinventée pour l'Afrique de l'Ouest.",
  keywords: ["néo-banque", "tontine", "ESSO", "Mobile Money", "Togo", "Afrique de l'Ouest"],
  openGraph: {
    title: "BankVi",
    siteName: "BankVi",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bankvi-theme');var d=t?t:(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');if(d==='dark')document.documentElement.classList.add('dark');document.documentElement.style.colorScheme=d;}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
