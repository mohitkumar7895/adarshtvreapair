"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, Cpu, Home, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { CmsImage } from "@/components/website/CmsImage";
import { resolveWorkImage } from "@/lib/site-images";

const ICONS = [Cpu, ShieldCheck, Home, BadgeCheck];

export function FeaturesSection({
  heading,
  items,
}: {
  heading?: string;
  items: { title: string; body: string; image?: string }[];
}) {
  const unwantedHeadings = ["How we work"];
  if (heading && unwantedHeadings.includes(heading.trim())) return null;

  let displayItems = items;
  if (heading && heading.trim().toLowerCase() === "why choose us") {
    displayItems = [
      {
        title: "Expert Technicians",
        body: "Certified engineers specialized in LED, OLED, QLED & 4K Smart TV motherboards, power supplies & panels.",
      },
      {
        title: "Transparent & Fair Pricing",
        body: "Clear upfront estimates with zero hidden charges. Pay only after complete satisfaction and diagnosis.",
      },
      {
        title: "Same-Day Doorstep Visit",
        body: "Fast 60-90 minute doorstep service across Delhi NCR. Fully equipped mobile repair van with tools.",
      },
      {
        title: "100% Genuine Spare Parts",
        body: "Authentic company-approved spare components with a guaranteed 90-day post-repair warranty.",
      }
    ];
  } else {
    displayItems = items.filter(
      (it) => !["Inspect", "Confirm", "Restore"].includes(it.title.trim()),
    );
  }

  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!displayItems.length) return null;

  return (
    <section ref={ref} className="section-pad relative overflow-hidden bg-slate-50">
      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className={`mx-auto max-w-2xl text-center ${inView ? "feature-in" : "feature-wait"}`}>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/ bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <Sparkles size={13} className="text-emerald-500" />
            <span>Why Choose Our Service</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
            {heading || "Trusted TV Repair Experts"}
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Delivering top-tier television repair with unmatched reliability, certified technicians, and genuine parts.
          </p>
        </div>

        {/* Feature Cards Bento Grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:mt-14">
          {displayItems.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const n = String(i + 1).padStart(2, "0");
            const photo = resolveWorkImage(item.image);
            return (
              <article
                key={item.title}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/ hover:shadow-xl hover:shadow-emerald-500/ ${
                  inView ? "feature-in" : "feature-wait"
                }`}
                style={{ animationDelay: `${150 + i * 100}ms` }}
              >
                {photo ? (
                  <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-xl bg-slate-900">
                    <CmsImage
                      src={photo}
                      alt={item.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  </div>
                ) : null}

                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/ transition-transform duration-300 group-hover:scale-110">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    {n}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>

                {/* Bottom accent glow on hover */}
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-300 group-hover:scale-x-100" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
