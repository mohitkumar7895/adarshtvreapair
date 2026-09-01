import type { Metadata } from "next";
import { Award, CheckCircle2, Cpu, ShieldCheck, Sparkles, Tv, Users, Wrench } from "lucide-react";
import { getPublishedPageBySlug } from "@/server/repositories/pages.repository";
import { getSeo } from "@/server/repositories/seo.repository";
import { getSiteContext } from "@/server/services/site";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { buildMetadata } from "@/lib/seo/metadata";
import { CmsImage } from "@/components/website/CmsImage";
import { PageHero } from "@/components/website/PageHero";
import { Reveal } from "@/components/website/Reveal";

async function renderCms(slug: string, titleFallback: string) {
  const [page, site] = await Promise.all([getPublishedPageBySlug(slug), getSiteContext()]);
  if (!page) return null;
  const seo = await getSeo("page", page.id);
  return { page, site, seo, titleFallback };
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await renderCms("about", "About Us");
  if (!data) return { title: "About Us" };
  return buildMetadata({
    seo: data.seo,
    fallbackTitle: data.page.title || "About Us",
    fallbackDescription: data.page.excerpt || "Professional LED, OLED & Smart TV repair center.",
    path: "/about",
    settings: data.site.settings,
  });
}

export default async function AboutPage() {
  const data = await renderCms("about", "About Us");
  const name = data?.site.settings["business.name"] || "India LED TV Repair Center";

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "About Us", href: "/about" }]} />
      <PageHero
        eyebrow="Our Company Profile"
        title="Leading TV Repair Specialists in Delhi NCR"
        description="Over a decade of excellence in LED, OLED, QLED & 4K Smart TV diagnostics, chip-level repairs, and genuine replacement parts."
        image="/images/site/tv-bench.jpg"
      />

      <section className="container-wide section-pad bg-white text-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/ bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <Sparkles size={13} />
              <span>Who We Are</span>
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Precision Diagnostics & Dependable Repairs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Welcome to <strong className="text-slate-900">{name}</strong>, your trusted destination for comprehensive television repair. With over 10 years of hands-on experience and a dedicated squad of certified engineers, we specialize in diagnosing and resolving all types of display, audio, power, and motherboard complications quickly, reliably, and affordably.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We exclusively use brand-approved authentic replacement components, providing a complimentary 90-day post-repair warranty on every completed service.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: "Smart TV Repair", desc: "Android, Google TV & webOS" },
                { title: "OLED & QLED Panels", desc: "Backlight & display calibration" },
                { title: "Motherboard IC", desc: "Chip-level micro-soldering" },
                { title: "Power Supply Boards", desc: "Capacitor & voltage repairs" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-3.5">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl">
            <CmsImage src="/images/site/tv-bench.jpg" alt="TV Repair Workshop Workbench" className="object-cover" sizes="(max-width: 768px) 100vw, 500px" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-slate-900/80 p-4 text-white backdrop-blur-md">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Delhi NCR Service Lab</p>
              <p className="text-sm font-semibold text-slate-200">Advanced diagnostic equipment & cleanroom workbench</p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Users, title: "Certified Technicians", desc: "Experienced engineers trained across all major global television brands." },
            { icon: ShieldCheck, title: "90-Day Warranty", desc: "Complete peace of mind with our transparent workmanship guarantee." },
            { icon: Wrench, title: "Doorstep Service", desc: "Prompt 60-90 minute on-site service at your home or workplace." },
            { icon: Cpu, title: "Genuine Spare Parts", desc: "Direct OEM spare components to ensure lasting television longevity." },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 transition hover:border-emerald-400 hover:bg-white hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/ mb-4">
                  <Icon size={20} />
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
