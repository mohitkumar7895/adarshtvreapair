"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Clock, Phone, Sparkles, Tv, Wrench, Zap } from "lucide-react";
import { Reveal } from "@/components/website/Reveal";
import { phoneHref, whatsappHref } from "@/lib/utils/cn";
import { useUiStore } from "@/store/ui";

interface IssueDef {
  id: string;
  title: string;
  icon: string;
  cause: string;
  solution: string;
  time: string;
  parts: string;
  tag: string;
}

const ISSUES: IssueDef[] = [
  {
    id: "backlight",
    title: "Sound is coming, but screen is dark / black",
    icon: "📺",
    tag: "Very Common Fault",
    cause: "LED backlight strip burnout, LED inverter driver failure, or T-Con board power loss.",
    solution: "On-site LED strip replacement with original high-lumen strips or driver IC repair.",
    time: "45 - 60 mins at doorstep",
    parts: "100% Original LED Strips",
  },
  {
    id: "power",
    title: "TV is dead / Red standby light blinking",
    icon: "⚡",
    tag: "Power Supply Fault",
    cause: "SMPS power board surge, blown capacitors, fuse trip, or main processor power rail short.",
    solution: "Board-level micro-soldering, capacitor restoration, or power supply module repair.",
    time: "60 mins on-site",
    parts: "High-grade OEM components",
  },
  {
    id: "lines",
    title: "Vertical or horizontal lines on screen",
    icon: "🌈",
    tag: "Display Panel Issue",
    cause: "T-Con ribbon cable corrosion, loose COF bonding tab, or panel driver timing fault.",
    solution: "T-Con circuit cleaning, COF IC check, or ribbon replacement. Panel saved in 85% cases.",
    time: "60 - 90 mins",
    parts: "T-Con Board / COF bonding",
  },
  {
    id: "sound",
    title: "Picture is fine, but no sound or distorted audio",
    icon: "🔊",
    tag: "Audio Circuit Fault",
    cause: "Internal speaker cone torn, audio power amplifier IC overheat, or sound processor crash.",
    solution: "Speaker set replacement or audio output circuit repair.",
    time: "30 - 45 mins",
    parts: "Genuine stereo speakers",
  },
  {
    id: "software",
    title: "Stuck on Android / Smart TV brand logo (Boot loop)",
    icon: "🔄",
    tag: "Smart OS Fault",
    cause: "Corrupted eMMC flash memory, firmware crash during update, or Wi-Fi chip failure.",
    solution: "Official firmware flashing, software reprogramming, or eMMC chip repair.",
    time: "45 mins on-site",
    parts: "Original manufacturer firmware",
  },
  {
    id: "hdmi",
    title: "HDMI / Set-top box / Wi-Fi not connecting",
    icon: "📶",
    tag: "Port & Connectivity",
    cause: "Damaged HDMI port pins, ESD protection chip blown, or Wi-Fi/Bluetooth module failure.",
    solution: "HDMI port replacement, switching IC repair, or Wi-Fi module swap.",
    time: "45 mins",
    parts: "Original ports & modules",
  },
];

export function QuickDiagnosis({ phone = "9990113545" }: { phone?: string }) {
  const [selectedId, setSelectedId] = useState<string>(ISSUES[0].id);
  const openBooking = useUiStore((s) => s.openBooking);

  const current = ISSUES.find((i) => i.id === selectedId) || ISSUES[0];

  return (
    <section className="section-pad relative overflow-hidden bg-[#05140f] text-white">
      {/* Lightweight GPU-friendly ambient background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background: "radial-gradient(circle at 10% 20%, rgba(5,150,105,0.2) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(16,185,129,0.15) 0%, transparent 40%)",
        }}
      />

      <div className="container-wide relative z-10">
        <Reveal>
          <div className="text-center">
            <span className="eyebrow-dark">
              <Sparkles size={12} className="text-emerald-400" />
              Smart TV Diagnostic Finder
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              <span className="gradient-text">What Issue Are You Facing With Your TV?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Select your TV’s symptom below to see the instant diagnosis, required fix, and estimated doorstep repair time in Noida.
            </p>
          </div>
        </Reveal>

        {/* Interactive Grid */}
        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 items-start">
          {/* Issue Selector Chips */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Select Your Symptom:
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {ISSUES.map((issue) => {
                const active = issue.id === selectedId;
                return (
                  <button
                    key={issue.id}
                    type="button"
                    onClick={() => setSelectedId(issue.id)}
                    className={`group flex items-center justify-between rounded-xl border p-3 sm:p-3.5 text-left transition-all duration-300 ${
                      active
                        ? "border-emerald-500 bg-emerald-500/15 shadow-lg shadow-emerald-500/20 text-white"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-emerald-500/40 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
                      <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg sm:text-xl backdrop-blur-sm group-hover:scale-105 transition">
                        {issue.icon}
                      </span>
                      <div className="min-w-0">
                        <span className="block text-xs sm:text-sm font-semibold line-clamp-2 leading-snug">
                          {issue.title}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-medium text-emerald-400 mt-0.5 block">
                          {issue.tag}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all ${
                        active ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-white/20"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Diagnostic Result Card */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-[#09221a] via-[#05140f] to-[#09221a] p-4.5 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3 sm:pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                  <Wrench size={15} />
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Doorstep Diagnosis
                </span>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                90-Day Warranty
              </span>
            </div>

            <div className="mt-4 sm:mt-5 space-y-3.5 sm:space-y-4">
              <div>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  Fault Cause
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-slate-200">
                  {current.cause}
                </p>
              </div>

              <div>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                  How We Repair It
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-emerald-200">
                  {current.solution}
                </p>
              </div>

              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400">
                    <Clock size={13} className="text-emerald-400 shrink-0" />
                    Est. Duration
                  </span>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-white">{current.time}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3">
                  <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    Parts Grade
                  </span>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-white">{current.parts}</p>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openBooking(`diagnosis:${current.id}`)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25"
                >
                  <Zap size={16} />
                  Book Fix for This Issue
                </button>
                <a
                  href={whatsappHref(`91${phone}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500 hover:text-white"
                >
                  <Phone size={14} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
