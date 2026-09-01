import { Fragment } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Clock, Phone, ShieldCheck, Sparkles, Tv, Wrench } from "lucide-react";
import type { PageSection } from "@/models";
import type { Faq, Service, Testimonial } from "@/models";
import type { SettingsMap } from "@/types";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQSection } from "@/components/website/FAQSection";
import { TestimonialsSection } from "@/components/website/TestimonialsSection";
import { BrandsStrip } from "@/components/website/BrandsStrip";
import { BookingSection } from "@/components/website/BookingSection";
import { SiteLink } from "@/components/website/SiteLink";
import { FeaturesSection } from "@/components/website/FeaturesSection";
import { StatsSection } from "@/components/website/StatsSection";
import { OfferSlider } from "@/components/website/OfferSlider";
import { Reveal } from "@/components/website/Reveal";
import { phoneHref } from "@/lib/utils/cn";
import { sanitizeHtml } from "@/lib/utils/sanitize";
import { resolveWorkImage, SITE_IMAGES } from "@/lib/site-images";
import { applySettingsTokens } from "@/lib/site-settings";
import { CmsImage } from "@/components/website/CmsImage";
import { HeroBackground } from "@/components/website/HeroBackground";

export interface RendererExtras {
  services: Service[];
  faqs: Faq[];
  testimonials: Testimonial[];
  settings: SettingsMap;
}

export function PageRenderer({
  sections,
  extras,
  homeVariant = false,
}: {
  sections: PageSection[];
  extras: RendererExtras;
  homeVariant?: boolean;
}) {
  const visible = sections.filter((s) => s.is_visible);
  return (
    <>
      {visible.map((section) => (
        <Fragment key={section.id || `${section.type}-${section.sort_order}`}>
          <Section section={section} extras={extras} homeVariant={homeVariant} />
          {section.type === "hero" && section.content.showBookingForm ? (
            <BookingSection settings={extras.settings} source="hero" />
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

function Section({ section, extras, homeVariant }: { section: PageSection; extras: RendererExtras; homeVariant: boolean }) {
  const c = section.content;
  const settings = extras.settings;
  const align = section.settings?.alignment === "center" ? "text-center mx-auto" : "";
  const str = (key: string, fallback = "") => {
    const value = c[key];
    const text = typeof value === "string" ? value : fallback;
    return applySettingsTokens(text, settings);
  };
  const img = (key: string) => resolveWorkImage(str(key));

  /* ───────────────────────────────────────────────────────────── */
  /*  HERO SECTION                                                 */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "hero") {
    const badges = Array.isArray(c.badges) ? (c.badges as string[]) : [];
    const image = img("image");
    return (
      <section className={`relative isolate overflow-hidden bg-[#090d16] text-white ${homeVariant ? "home-hero" : ""}`}>
        <div className="page-hero-mesh pointer-events-none absolute inset-0 opacity-80" />
        {homeVariant ? <HeroBackground images={[SITE_IMAGES.hero, SITE_IMAGES.bench, SITE_IMAGES.soldering, SITE_IMAGES.screen, SITE_IMAGES.smart]} /> : null}

        <div className={`container-wide relative z-10 grid min-w-0 items-center gap-8 py-12 sm:gap-10 sm:py-16 md:gap-12 lg:gap-16 lg:py-24 ${image && !homeVariant ? "md:grid-cols-2" : ""} ${c.showBookingForm ? "pb-12 sm:pb-16 lg:pb-28" : ""}`}>
          <div className={`min-w-0 ${homeVariant ? "home-hero-copy mx-auto w-full max-w-3xl text-center" : ""}`}>
            <div className={`flex flex-wrap items-center gap-2 ${homeVariant ? "justify-center" : ""}`}>
              <span className="eyebrow-dark">
                <Sparkles size={12} className="text-emerald-400" />
                {str("eyebrow", "Doorstep TV Repair")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                60-90 Min Response
              </span>
            </div>

            <h1 className={`mt-4 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.1] ${homeVariant ? "mx-auto" : ""}`}>
              <span className="gradient-text">{str("heading")}</span>
            </h1>

            <p className={`mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8 ${homeVariant ? "mx-auto" : ""}`}>
              {str("description")}
            </p>

            {/* Action CTAs */}
            <div className={`mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-8 sm:gap-4 ${homeVariant ? "justify-center" : ""}`}>
              <SiteLink
                href={str("primaryHref", "/book-service")}
                className="btn-primary w-full min-[480px]:w-auto shadow-lg shadow-emerald-500/25"
                source="hero"
              >
                <Wrench size={16} />
                {str("primaryLabel", "Book a Repair Visit")}
              </SiteLink>
              <SiteLink
                href={str("secondaryHref", "/contact")}
                className="btn-outline w-full border-white/20 text-white hover:bg-white/10 min-[480px]:w-auto"
                source="hero"
              >
                <Phone size={16} />
                {str("secondaryLabel", "Call Hotline")}
              </SiteLink>
            </div>

            {str("availabilityText") ? (
              <p className="mt-4 text-xs font-medium text-slate-400">{str("availabilityText")}</p>
            ) : null}

            {/* Trust Highlights Badges */}
            <div className={`mt-6 flex flex-wrap gap-2.5 sm:gap-3 ${homeVariant ? "justify-center" : ""}`}>
              {(badges.length ? badges : ["90-Day Warranty", "100% Genuine Parts", "Certified Technicians"]).map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm"
                >
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Image Frame for Inner Hero */}
          {image && !homeVariant ? (
            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:aspect-4/3">
              <CmsImage src={image} alt="" sizes="(max-width: 768px) 100vw, 50vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16]/80 via-transparent to-transparent" />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  TEXT / RICH TEXT SECTION                                     */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "text" || section.type === "rich_text") {
    return (
      <section className="section-pad bg-white">
        <div className={`container-narrow ${align}`}>
          {str("heading") ? (
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {str("heading")}
            </h2>
          ) : null}
          <div
            className="prose-site mt-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(str("html") || str("body") || str("description")) }}
          />
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  IMAGE + TEXT SECTION                                         */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "image_text") {
    const image = img("image");
    return (
      <section className="section-pad bg-white">
        <div className={`container-wide grid min-w-0 items-center gap-10 sm:gap-12 ${image ? "lg:grid-cols-2 lg:gap-16" : ""}`}>
          {image ? (
            <Reveal from="left" className="relative min-w-0">
              <div className="relative aspect-5/4 overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                <CmsImage src={image} alt={str("heading")} sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </Reveal>
          ) : null}
          <Reveal from="right" delay={80} className="min-w-0">
            <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              {str("heading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {str("body") || str("description")}
            </p>
            {str("buttonLabel") ? (
              <SiteLink href={str("buttonHref", "/contact")} className="btn-primary mt-8 shadow-lg shadow-emerald-500/" source="image-text">
                {str("buttonLabel")}
              </SiteLink>
            ) : null}
          </Reveal>
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  SERVICES GRID SECTION                                        */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "services_grid") {
    const limit = Number(c.limit || 8);
    const services = extras.services.slice(0, limit);
    return (
      <section className="section-pad bg-slate-50 border-y border-slate-200/80">
        <div className="container-wide">
          <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/ bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <Tv size={13} className="text-emerald-500" />
                  <span>Expert Repair Categories</span>
                </div>
                <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {str("heading", "Our TV Repair Services")}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-right">
                From screen backlight replacement to motherboard chip-level micro soldering, explore all repair services.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 60}>
                <Link
                  href={`/tv-repair/${service.slug}`}
                  prefetch={true}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/ hover:shadow-xl hover:shadow-emerald-500/"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100 p-2">
                    {service.image_url ? (
                      <CmsImage
                        src={service.image_url}
                        alt={service.name}
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-slate-300">
                        TV
                      </div>
                    )}
                    <span className="absolute top-3 left-3 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
                      Repairs
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
                      {service.name}
                    </h3>
                    {service.short_description ? (
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                        {service.short_description}
                      </p>
                    ) : null}

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                      <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                        View Service & Pricing
                      </span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-transform group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white">
                        <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {extras.services.length > limit ? (
            <div className="mt-12 text-center">
              <Link href="/services" className="btn-primary inline-flex shadow-lg shadow-emerald-500/">
                Explore All Services
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  FAQ SECTION                                                  */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "faq") {
    const category = str("category");
    const items = extras.faqs.filter((f) => !category || f.category === category);
    return <FAQSection heading={str("heading")} items={items} />;
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  TESTIMONIALS SECTION                                         */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "testimonials") {
    const items = c.featuredOnly ? extras.testimonials.filter((t) => t.is_featured) : extras.testimonials;
    return <TestimonialsSection heading={str("heading")} items={items.slice(0, 3)} />;
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  CALL TO ACTION (CTA) SECTION                                 */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "cta") {
    const phone = extras.settings["business.phone"] || "";
    return (
      <section className="relative overflow-hidden bg-gradient-to-r from-[#04140e] via-[#09221a] to-[#04140e] py-8 sm:py-10 text-white border-y border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-25">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-emerald-500 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-teal-500 blur-3xl" />
        </div>

        <div className="container-wide relative z-10 grid min-w-0 items-center gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8">
          <Reveal className="min-w-0">
            <span className="eyebrow-dark">
              <Sparkles size={11} className="text-emerald-400" />
              Fast Doorstep Assistance
            </span>
            <h2 className="mt-2 font-display text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
              <span className="gradient-text">{str("heading")}</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-slate-300 sm:text-sm">
              {str("body")}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <SiteLink
                href={str("primaryHref", "/book-service")}
                className="btn-primary w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/20"
                source="cta"
              >
                {str("primaryLabel", "Book a Doorstep Repair")}
              </SiteLink>
              <SiteLink
                href={str("secondaryHref", "/contact")}
                className="btn-outline w-full sm:w-auto px-5 py-2.5 text-xs sm:text-sm border-white/20 text-white hover:bg-white/10"
                source="cta"
              >
                {str("secondaryLabel", "WhatsApp Us")}
              </SiteLink>
            </div>
          </Reveal>

          {phone ? (
            <Reveal delay={80}>
              <a
                href={phoneHref(phone)}
                className="block min-w-0 rounded-xl border border-white/15 bg-white/5 p-4 sm:p-5 backdrop-blur-xl transition duration-300 hover:border-emerald-400/50 hover:bg-white/10"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-400">Direct Technician Desk</p>
                <p className="mt-1.5 flex items-center gap-2.5 font-display text-xl font-extrabold sm:text-2xl text-white">
                  <Phone size={20} className="shrink-0 text-emerald-400" />
                  <span>{phone}</span>
                </p>
                <p className="mt-1.5 text-xs text-slate-400">
                  Open 7 days · Doorstep arrival in 60-90 minutes across Noida & NCR
                </p>
              </a>
            </Reveal>
          ) : null}
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  FEATURES SECTION                                             */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "features") {
    const items = Array.isArray(c.items)
      ? (c.items as { title: string; body: string; image?: string }[]).map((item) => ({
          ...item,
          image: resolveWorkImage(item.image),
        }))
      : [];
    return <FeaturesSection heading={str("heading", "Why Choose Us")} items={items} />;
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  STATISTICS SECTION                                           */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "statistics") {
    return <StatsSection />;
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  OFFER SLIDER SECTION                                         */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "offer_slider" || section.type === "gallery") {
    const images = Array.isArray(c.images) ? (c.images as string[]).filter(Boolean) : [];
    if (!images.length) return null;
    return <OfferSlider images={images} />;
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  CONTACT FORM SECTION                                         */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "contact_form") {
    return (
      <section className="section-pad bg-slate-50">
        <div className="container-narrow">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {str("heading", "Contact Us")}
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">{str("body")}</p>
          <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md sm:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  BOOKING FORM SECTION                                         */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "booking_form") {
    return (
      <BookingSection
        settings={extras.settings}
        source="booking-section"
        heading={str("heading", "Book a Doorstep TV Repair")}
      />
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  VIDEO SECTION                                                */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "video" && str("url")) {
    return (
      <section className="section-pad bg-white">
        <div className="container-narrow">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{str("heading")}</h2>
          <div className="mt-6 aspect-video overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
            <iframe src={str("url")} className="h-full w-full" title={str("heading")} allowFullScreen />
          </div>
        </div>
      </section>
    );
  }

  /* ───────────────────────────────────────────────────────────── */
  /*  BRANDS / TRUST STRIP SECTION                                 */
  /* ───────────────────────────────────────────────────────────── */
  if (section.type === "brands" || section.type === "trust_badges") {
    const items = Array.isArray(c.items) ? (c.items as string[]) : [];
    return <BrandsStrip heading={str("heading")} items={items} />;
  }

  if (section.type === "custom_html") {
    return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(str("html")) }} />;
  }

  return null;
}
