import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomepage } from "@/server/repositories/pages.repository";
import { getSeo } from "@/server/repositories/seo.repository";
import { getSiteContext } from "@/server/services/site";
import { PageRenderer } from "@/components/website/PageRenderer";
import { HomeHero } from "@/components/website/HomeHero";
import { StatsSection } from "@/components/website/StatsSection";
import { GallerySlider } from "@/components/website/GallerySlider";
import { OfferSlider } from "@/components/website/OfferSlider";
import { QuickDiagnosis } from "@/components/website/QuickDiagnosis";
import { buildMetadata } from "@/lib/seo/metadata";
import { query } from "@/lib/db/query";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [page, site] = await Promise.all([getHomepage(), getSiteContext()]);
    if (!page) return { title: "TV Repair" };
    const seo = await getSeo("homepage", page.id);
    return buildMetadata({
      seo,
      fallbackTitle: page.title,
      fallbackDescription: page.excerpt || "",
      path: "/",
      settings: site.settings,
    });
  } catch {
    return { title: "TV Repair" };
  }
}

export default async function HomePage() {
  const site = await getSiteContext();
  try {
    const [page, galleryImages] = await Promise.all([
      getHomepage(),
      query<{ id: number; image_url: string; alt_text?: string; caption?: string }>(`
        SELECT g.id, m.url as image_url, m.alt_text, g.caption
        FROM gallery_images g
        JOIN media m ON g.media_id = m.id
        WHERE g.is_visible = 1
        ORDER BY g.sort_order ASC, g.id DESC
        LIMIT 8
      `).catch(() => []),
    ]);

    if (!page) notFound();

    const brandTypes = new Set(["brands", "trust_badges"]);
    const brandSections = page.sections.filter((s) => brandTypes.has(s.type));
    const servicesSections = page.sections.filter((s) => s.type === "services_grid");
    const restSections = page.sections.filter((s) => {
      if (s.type === "hero") return false;
      if (brandTypes.has(s.type)) return false;
      if (s.type === "services_grid" || s.type === "statistics" || s.type === "features") return false;
      return true;
    });

    const defaultBanners = "/images/promo_banner_1.jpg,/images/promo_banner_2.jpg,/images/promo_banner_3.jpg";
    const bannerImages = (site.settings["promo.banners"] || defaultBanners)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <>
        {/* Brand New Luxury Hero + Integrated Fast Booking Card */}
        <HomeHero settings={site.settings} />

        {/* Multi-Brand Trust Section */}
        <PageRenderer sections={brandSections} extras={site} homeVariant />

        {/* Interactive Symptom & Diagnosis Tool */}
        <QuickDiagnosis phone={site.settings["business.phone"] || "9990113545"} />

        {/* Promo Slider Banner */}
        {bannerImages.length > 0 && <OfferSlider images={bannerImages} />}

        {/* Services Bento Grid */}
        <PageRenderer sections={servicesSections} extras={site} homeVariant />

        {/* Animated Statistics Banner */}
        <StatsSection />

        {/* Live Repair Work Gallery Marquee */}
        {galleryImages.length > 0 && <GallerySlider images={galleryImages} />}

        {/* Remaining CMS Sections (Testimonials, FAQs, CTA) */}
        <PageRenderer sections={restSections} extras={site} homeVariant />
      </>
    );
  } catch (error) {
    console.error("[home]", error);
    return (
      <>
        <PageRenderer sections={[]} extras={site} />
        <StatsSection />
      </>
    );
  }
}



