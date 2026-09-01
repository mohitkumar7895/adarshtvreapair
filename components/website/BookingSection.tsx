"use client";

import { CheckCircle2, Clock, MapPin, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { BookingForm } from "@/components/forms/BookingForm";
import type { SettingsMap } from "@/types";
import { phoneHref } from "@/lib/utils/cn";
import { Reveal } from "@/components/website/Reveal";

export function BookingSection({
  settings,
  source = "home",
  heading = "Book a Doorstep TV Repair Visit",
}: {
  settings: SettingsMap;
  source?: string;
  heading?: string;
}) {
  const phone = settings["business.phone"] || "";
  const hours = settings["business.working_hours"] || "";
  const city = settings["business.city"] || "Delhi NCR";

  return (
    <section className="relative z-10 -mt-6 pb-6 sm:-mt-10 md:-mt-12">
      <div className="container-wide">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl lg:grid lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left Info Panel */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-[#0c1424] via-[#0f172a] to-[#090d16] p-6 text-white sm:p-8 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Sparkles size={13} />
                  <span>Express Doorstep Visit</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Tell us your TV model and the issue. Our support coordinator confirms the appointment window and dispatches a verified engineer.
                </p>

                <ul className="mt-6 space-y-3.5 text-sm text-slate-200">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span>60-90 Minute doorstep response</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                    <span>90-Day post-repair parts warranty</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MapPin size={16} className="text-emerald-400 shrink-0" />
                    <span>Doorstep service across {city}</span>
                  </li>
                </ul>
              </div>

              {phone ? (
                <div className="mt-8 border-t border-white/10 pt-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Need direct telephone booking?</span>
                  <a
                    href={phoneHref(phone)}
                    className="mt-1 flex items-center gap-2 font-display text-lg font-bold text-white transition hover:text-emerald-400"
                  >
                    <Phone size={16} className="text-emerald-400" />
                    <span>{phone}</span>
                  </a>
                </div>
              ) : null}
            </div>

            {/* Right Booking Form Panel */}
            <div className="p-6 sm:p-8 lg:p-10 bg-white">
              <div className="mb-6">
                <h3 className="font-display text-xl font-bold text-slate-900 sm:text-2xl">
                  Quick Service Appointment
                </h3>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Fill the short form below to get an instant callback from our technician.
                </p>
              </div>
              <BookingForm variant="panel" source={source} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
