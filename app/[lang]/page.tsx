import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { PaymentSection } from "@/components/sections/PaymentSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { DownloadSection } from "@/components/sections/DownloadSection";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <HeroSection locale={lang} />
      <FeaturesSection locale={lang} />
      <PaymentSection locale={lang} />
      <TrustSection locale={lang} />
      <DownloadSection locale={lang} />
      <BlogPreview locale={lang} />
    </>
  );
}
