"use client";

import { useState } from "react";
import { HelpCircle, MessageCircle, Minus, Phone, Plus } from "lucide-react";
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
  const [open, setOpen] = useState<number | null>(0);
  const settings = useSettings();
  const phone = settings["business.phone"] || "";
  const whatsapp = settings["business.whatsapp"] || phone;
  if (!items.length) return null;

  return (
    <section className="section-pad bg-white">
      <div className="container-wide grid min-w-0 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
        {/* Left Column: Heading & Quick Support Cards */}
        <Reveal className="min-w-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/ bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
            <HelpCircle size={13} className="text-emerald-500" />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            {heading || "Frequently Asked Questions"}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            Find quick answers regarding our repair turnaround, inspection fees, spare parts, and warranty coverage before scheduling your technician.
          </p>

          <div className="mt-8 space-y-3.5">
            {phone ? (
              <a
                href={phoneHref(phone)}
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/ transition group-hover:scale-105">
                  <Phone size={18} />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Need Immediate Help?</span>
                  <span className="block font-bold text-slate-900 group-hover:text-emerald-600">{phone}</span>
                </div>
              </a>
            ) : null}

            {whatsapp ? (
              <a
                href={whatsappHref(whatsapp, "Hi, I have a question about TV repair.")}
                className="group flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-md"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25 transition group-hover:scale-105">
                  <MessageCircle size={18} />
                </span>
                <div className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">WhatsApp Coordinator</span>
                  <span className="block font-bold text-slate-900 group-hover:text-emerald-600">Chat with Support Team</span>
                </div>
              </a>
            ) : null}
          </div>
        </Reveal>

        {/* Right Column: Interactive Accordion */}
        <Reveal delay={80} className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-emerald-500/ bg-emerald-50/30 shadow-md shadow-emerald-500/"
                    : "border-slate-200/90 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3.5">
                    <span className={`mt-0.5 font-mono text-sm font-bold ${isOpen ? "text-emerald-600" : "text-slate-400"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base font-semibold text-slate-900 sm:text-lg">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-200/80 text-slate-600"
                    }`}
                  >
                    {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                  </span>
                </button>

                <div className={`faq-answer ${isOpen ? "open" : ""}`}>
                  <div className="px-4 pb-5 pt-1 pl-12 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pl-14 sm:text-[0.95rem]">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
