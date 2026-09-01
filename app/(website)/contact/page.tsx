import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { getPublishedPageBySlug } from "@/server/repositories/pages.repository";
import { getSeo } from "@/server/repositories/seo.repository";
import { getSiteContext } from "@/server/services/site";
import { PageRenderer } from "@/components/website/PageRenderer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/website/PageHero";
import { buildMetadata } from "@/lib/seo/metadata";
import { hasSection, pageBanner } from "@/lib/page-banner";
import { phoneHref, whatsappHref } from "@/lib/utils/cn";

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPublishedPageBySlug("contact"), getSiteContext()]);
  const seo = page ? await getSeo("page", page.id) : null;
  return buildMetadata({
    seo,
    fallbackTitle: "Contact Us",
    fallbackDescription: "Call, WhatsApp or request a technician for TV repair across Delhi NCR.",
    path: "/contact",
    settings: site.settings,
  });
}

export default async function ContactPage() {
  const [page, site] = await Promise.all([getPublishedPageBySlug("contact"), getSiteContext()]);
  const s = site.settings;
  const showHero = !hasSection(page?.sections, "hero");
  const showForm = !hasSection(page?.sections, "contact_form");

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Contact Us", href: "/contact" }]} />
      {showHero ? (
        <PageHero
          eyebrow="Helpdesk & Support"
          title="Connect with Our TV Repair Coordinators"
          description="Have questions about TV repair costs, scheduling a doorstep visit, or warranty details? Reach out directly via call, WhatsApp, or the form below."
          image={pageBanner(page)}
        />
      ) : null}

      {page ? (
        <PageRenderer
          sections={page.sections.filter((sec) => (showHero ? sec.type !== "text" : true))}
          extras={site}
        />
      ) : null}

      {showForm ? (
        <section className="container-wide section-pad bg-slate-50">
          <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            {/* Left Contact Cards */}
            <div className="min-w-0 space-y-4">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/ bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <Sparkles size={13} />
                  <span>Direct Communication Channels</span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Get in Touch Instantly
                </h2>
              </div>

              {s["business.phone"] ? (
                <a
                  href={phoneHref(s["business.phone"])}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/ transition group-hover:scale-105">
                    <Phone size={20} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Direct Telephone Hotline</span>
                    <span className="block font-display text-base font-bold text-slate-900 group-hover:text-emerald-600 sm:text-lg">{s["business.phone"]}</span>
                  </div>
                </a>
              ) : null}

              {s["business.whatsapp"] ? (
                <a
                  href={whatsappHref(s["business.whatsapp"], "Hi, I need TV repair assistance.")}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25 transition group-hover:scale-105">
                    <MessageCircle size={20} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Instant WhatsApp Support</span>
                    <span className="block font-display text-base font-bold text-slate-900 group-hover:text-emerald-600 sm:text-lg">Chat with Service Coordinator</span>
                  </div>
                </a>
              ) : null}

              {s["business.email"] ? (
                <a
                  href={`mailto:${s["business.email"]}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-500 group-hover:text-white">
                    <Mail size={20} />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Email Helpdesk</span>
                    <span className="block truncate font-medium text-slate-800">{s["business.email"]}</span>
                  </div>
                </a>
              ) : null}

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <MapPin size={20} />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Head Office & Lab</span>
                  <span className="mt-0.5 block font-medium text-slate-800 leading-relaxed">{s["business.address"] || "Delhi NCR, India"}</span>
                  {s["business.working_hours"] ? (
                    <span className="mt-1 block text-xs font-semibold text-emerald-600">{s["business.working_hours"]}</span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Right Contact Form Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl sm:p-8">
              <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                Send an Online Inquiry
              </h3>
              <p className="mt-1 mb-6 text-xs leading-relaxed text-slate-500 sm:text-sm">
                Leave your contact details and television issue. We will respond promptly within working hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
