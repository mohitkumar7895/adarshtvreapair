"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Phone } from "lucide-react";
import { useSettings } from "@/context/settings";
import { phoneHref, whatsappHref } from "@/lib/utils/cn";
import { Reveal } from "@/components/website/Reveal";

export function FAQSection({
  heading,
  items,
}: {
  heading?: string;
  items: { question: string; answer: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  const settings = useSettings();
  const phone = settings["business.phone"] || "9990113545";
  const whatsapp = settings["business.whatsapp"] || phone;
  if (!items.length) return null;

  return (
    <section className="py-6 sm:py-10 bg-slate-50 border-t border-slate-200/80">
      <div className="container-wide grid min-w-0 gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10 items-start">
        {/* Left Side: Headings & Direct Contact Buttons */}
        <Reveal className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <HelpCircle size={12} className="text-emerald-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-2 font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
            {heading || "Frequently Asked Questions"}
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-md">
            Find quick answers regarding our repair turnaround, inspection fees, spare parts, and warranty coverage.
          </p>

          {/* Contact Action Pills */}
          <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
            {phone ? (
              <a
                href={phoneHref(phone)}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-800 shadow-xs transition hover:border-emerald-400 hover:text-emerald-600"
              >
                <Phone size={13} className="text-emerald-600" />
                <span>Call: {phone}</span>
              </a>
            ) : null}
            {whatsapp ? (
              <a
                href={whatsappHref(whatsapp, "Hi, I have a question about TV repair.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-700 shadow-xs transition hover:bg-emerald-500/20"
              >
                <MessageCircle size={13} className="text-emerald-600" />
                <span>WhatsApp Coordinator</span>
              </a>
            ) : null}
          </div>
        </Reveal>

        {/* Right Side: FAQ Accordions */}
        <Reveal delay={60} className="space-y-1.5 sm:space-y-2 min-w-0">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-lg sm:rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? "border-emerald-500/50 bg-white shadow-xs ring-1 ring-emerald-500/20"
                    : "border-slate-200/90 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 p-2.5 sm:p-3 text-left cursor-pointer"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <span className={`shrink-0 font-mono text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded ${
                      isOpen ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen
                        ? "rotate-180 text-emerald-600 bg-emerald-50"
                        : "text-slate-400 bg-slate-50"
                    }`}
                  >
                    <ChevronDown size={14} />
                  </span>
                </button>

                {isOpen ? (
                  <div className="px-3 pb-2.5 pt-1 sm:px-3.5 sm:pb-3 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
