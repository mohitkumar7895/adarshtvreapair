"use client";

import { CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Tv } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/website/Reveal";

const BRAND_NOTES: Record<string, { desc: string; commonIssues: string[] }> = {
  samsung: {
    desc: "Expertise in Neo QLED, Crystal 4K, The Frame & curved LED panels.",
    commonIssues: ["Screen flickering / backlight bleeding", "T-Con board & ribbon failure", "Smart Hub / One Connect box loop"],
  },
  lg: {
    desc: "Specialized in OLED evo, NanoCell, QNED & webOS smart mainboards.",
    commonIssues: ["OLED burn-in & pixel retention", "Power supply capacitor bulging", "Magic remote & Wi-Fi module failure"],
  },
  sony: {
    desc: "Certified repair for Bravia XR, Cognitive Processor, OLED & Triluminos.",
    commonIssues: ["6 or 8 times red light blinking code", "Sound working but no picture display", "Android TV bootloop on Sony logo"],
  },
  mi: {
    desc: "Fast service for Mi TV 4A/4X/5X, Redmi Smart TV & PatchWall OS.",
    commonIssues: ["PatchWall OS bootloop / frozen screen", "Mainboard EMMC chip corruption", "Backlight LED strip burnouts"],
  },
  tcl: {
    desc: "Full repair solutions for TCL Mini-LED, QLED & Google TV series.",
    commonIssues: ["Audio synchronization delay", "Dead power supply board", "Screen vertical & horizontal lines"],
  },
  panasonic: {
    desc: "Precision repair for Viera 4K LED, OLED & IPS display panels.",
    commonIssues: ["Inverter board voltage drop", "HDMI port IC breakdown", "Power standby blinking errors"],
  },
  oneplus: {
    desc: "Component-level repair for OnePlus TV Q1, U1S & Y1S series.",
    commonIssues: ["Display gamma distortion", "Gamma IC heating issues", "Soundbar & Bluetooth audio lag"],
  },
  vu: {
    desc: "Prompt doorstep support for Vu Cinema TV, Masterpiece & GloLED.",
    commonIssues: ["Backlight dark spots", "Motherboard firmware crash", "Remote IR sensor malfunction"],
  },
};

export function BrandsStrip({ heading, items }: { heading?: string; items: string[] }) {
  const brands = items.filter(Boolean);
  const [active, setActive] = useState(0);
  if (!brands.length) return null;
  const current = brands[active];
  const brandInfo = BRAND_NOTES[current.toLowerCase()] || {
    desc: "Panel, power supply, motherboard, and software diagnostics for all screen sizes.",
    commonIssues: ["Power standby / no start", "Display blank / backlight off", "Motherboard IC replacement"],
  };

  return (
    <section className="section-pad bg-white">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <Tv size={13} className="text-emerald-500" />
                <span>Multi-Brand Specialists</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                {heading || "All Major Brands Repaired"}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-right">
              Our technicians carry brand-specific diagnostic tools and authentic components for fast doorstep diagnosis.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 sm:mt-8 grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-8">
          {/* Brand Selection Buttons Grid */}
          <Reveal className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
            {brands.map((brand, index) => {
              const selected = index === active;
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-pressed={selected}
                  className={`group relative flex min-h-[56px] sm:min-h-[72px] flex-col justify-between rounded-lg sm:rounded-xl border p-2 sm:p-3 text-left transition-all duration-200 ${
                    selected
                      ? "border-emerald-500 bg-[#090d16] text-white shadow-md shadow-emerald-500/20 ring-2 ring-emerald-500/30"
                      : "border-slate-200 bg-slate-50/70 text-slate-800 hover:border-emerald-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${selected ? "text-emerald-400" : "text-slate-400"}`}>
                      Brand
                    </span>
                    <ChevronRight
                      size={12}
                      className={`transition-transform duration-200 group-hover:translate-x-0.5 sm:size-3.5 ${selected ? "text-emerald-400" : "text-slate-300"}`}
                    />
                  </div>
                  <span className="font-display text-xs sm:text-base font-bold truncate">
                    {brand}
                  </span>
                </button>
              );
            })}
          </Reveal>

          {/* Active Brand Diagnostic Overview */}
          <Reveal delay={80} className="h-full">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#090d16] p-4.5 sm:p-6 md:p-8 text-white shadow-xl">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                  <div>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">Diagnosis Specs</span>
                    <h3 className="mt-0.5 sm:mt-1 font-display text-xl font-extrabold sm:text-2xl md:text-3xl">{current} Television</h3>
                  </div>
                  <span className="rounded-lg bg-emerald-500/20 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-emerald-300">
                    OEM Parts
                  </span>
                </div>

                <p className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-slate-300">
                  {brandInfo.desc}
                </p>

                <div className="mt-4 sm:mt-5 space-y-2">
                  <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400">Frequently Solved Faults:</p>
                  {brandInfo.commonIssues.map((issue, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 sm:mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 sm:p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-emerald-400">
                  <ShieldCheck size={16} />
                  <span>Doorstep Visit in 60-90 Mins</span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400">Genuine Spares</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
