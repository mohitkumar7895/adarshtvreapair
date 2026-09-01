import Link from "next/link";
import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import type { Service, ServiceFaq } from "@/models";
import type { SettingsMap } from "@/types";
import { BookingForm } from "@/components/forms/BookingForm";
import { CmsImage } from "@/components/website/CmsImage";
import { FAQSection } from "@/components/website/FAQSection";
import { Reveal } from "@/components/website/Reveal";
import { SiteLink } from "@/components/website/SiteLink";
import { phoneHref } from "@/lib/utils/cn";

export function ServiceDetailView({
  item,
  settings,
  related,
  faqs,
}: {
  item: Service;
  settings: SettingsMap;
  related: Service[];
  faqs: ServiceFaq[];
}) {
  const phone = settings["business.phone"] || "";
  const hours = settings["business.working_hours"] || "";
  const city = settings["business.city"] || "Delhi NCR";

  return (
    <>
      {/* Service Detail Hero */}
      <section className="relative isolate overflow-hidden bg-[#090d16] text-white">
        <CmsImage src={item.image_url} alt="" className="object-cover object-[center_35%] opacity-25" sizes="100vw" priority />
        <div className="hero-photo-shade pointer-events-none absolute inset-0" />

        <div className="container-wide relative z-10 grid min-w-0 items-end gap-8 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
          <Reveal className="min-w-0">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Wrench size={13} />
              <span>Doorstep TV Repair</span>
            </div>

            <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="gradient-text">{item.name}</span>
            </h1>

            {item.short_description ? (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {item.short_description}
              </p>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 min-[480px]:flex-row min-[480px]:flex-wrap sm:mt-8">
              <SiteLink
                href="/book-service"
                className="btn-primary w-full min-[480px]:w-auto shadow-lg shadow-emerald-500/25"
                source={`service-hero:${item.slug}`}
              >
                <Sparkles size={16} />
                Book This Repair
              </SiteLink>
              {phone ? (
                <a
                  href={phoneHref(phone)}
                  className="btn-outline w-full border-white/20 text-white hover:bg-white/10 min-[480px]:w-auto"
                >
                  <Phone size={16} />
                  Call Support
                </a>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <CheckCircle2 size={13} className="text-emerald-400" />
                Doorstep in {city}
              </span>
              {hours ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <Clock size={13} className="text-emerald-400" />
                  {hours}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                <ShieldCheck size={13} className="text-emerald-400" />
                90-Day Parts Warranty
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Detail Content + Sticky Booking Form */}
      <section className="container-wide grid min-w-0 gap-10 py-10 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-20 items-start">
        <div className="min-w-0 space-y-10">
          {item.description ? (
            <Reveal>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <span>Detailed Overview</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Diagnostic & Repair Procedure
              </h2>
              <div className="prose-site mt-4 whitespace-pre-line text-slate-600 leading-relaxed">
                {item.description}
              </div>
            </Reveal>
          ) : null}

          {item.symptoms?.length ? (
            <Reveal delay={40}>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-600">
                <span>Fault Symptoms</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                Common Signs You May Observe
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.symptoms.map((symptom) => (
                  <li
                    key={symptom}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-sm text-slate-800"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}

          {item.benefits?.length ? (
            <Reveal delay={60}>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <span>Service Guarantee</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                What’s Included in This Visit
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {item.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-4 text-sm text-slate-800"
                  >
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>

        {/* Sticky Booking Panel */}
        <Reveal delay={80} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <aside className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl">
            <div className="bg-gradient-to-br from-[#05140f] via-[#09221a] to-[#05140f] p-5 text-white sm:p-6">
              <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                <Sparkles size={11} />
                <span>Instant Confirmation</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">Book This Repair</h3>
              <p className="mt-1 text-xs text-slate-400">
                A coordinator confirms appointment slot prior to technician dispatch.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                {phone ? (
                  <li>
                    <a href={phoneHref(phone)} className="inline-flex items-center gap-2 hover:text-emerald-400">
                      <Phone size={13} className="text-emerald-400" />
                      <span>{phone}</span>
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center gap-2">
                  <MapPin size={13} className="text-emerald-400" />
                  <span>Doorstep Across {city}</span>
                </li>
              </ul>
            </div>
            <div className="p-5 sm:p-6">
              <BookingForm compact source={`service:${item.slug}`} />
            </div>
          </aside>
        </Reveal>
      </section>

      <FAQSection heading={`Questions about ${item.name}`} items={faqs} />
    </>
  );
}
