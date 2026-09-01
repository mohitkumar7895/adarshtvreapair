"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Phone, ShieldCheck, Sparkles, Star, Wrench, Zap } from "lucide-react";
import type { SettingsMap } from "@/types";
import { phoneHref, whatsappHref } from "@/lib/utils/cn";
import { useUiStore } from "@/store/ui";
import { apiPost } from "@/lib/api-client";

export function HomeHero({ settings }: { settings: SettingsMap }) {
  const phone = settings["business.phone"] || "9990113545";
  const whatsapp = settings["business.whatsapp"] || "919990113545";
  const city = settings["business.city"] || "Noida";
  const openBooking = useUiStore((s) => s.openBooking);
  const pushToast = useUiStore((s) => s.pushToast);

  const [brand, setBrand] = useState("Samsung");
  const [userPhone, setUserPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleQuickBook(e: React.FormEvent) {
    e.preventDefault();
    if (!userPhone.trim() || userPhone.length < 10) {
      pushToast("error", "Please enter a valid 10-digit mobile number");
      return;
    }
    setLoading(true);
    try {
      await apiPost("/leads", {
        customer_name: "Quick Callback Lead",
        phone: userPhone.trim(),
        tv_brand: brand,
        city: city,
        source: "hero-quick-card",
      });
      setSubmitted(true);
      pushToast("success", "Request received! Our technician will call you in 5-10 minutes.");
    } catch {
      pushToast("error", "Could not submit. Please call us directly at 9990113545.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#06140e] text-white py-8 sm:py-12 lg:py-16">
      {/* Lightweight GPU-friendly ambient glows */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 20% 30%, rgba(5,150,105,0.25) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(16,185,129,0.18) 0%, transparent 50%)",
        }}
      />

      <div className="container-wide relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-14 items-center">
          {/* ───────────────────────────────────────────────────────────── */}
          {/*  LEFT COLUMN: Clean, Uncluttered, High-Impact Content          */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="min-w-0">
            {/* Live Availability Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-3 py-1.5 shadow-md">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300 leading-snug">
                Doorstep TV Repair in Noida · Arriving in 60-90 Mins
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-3.5 sm:mt-4 font-display text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-extrabold tracking-tight leading-[1.15] text-white">
              Expert LED TV Repair at Your Doorstep in{" "}
              <span className="text-emerald-400">
                Noida & NCR
              </span>
            </h1>

            {/* Concise Clean Subtext */}
            <p className="mt-3.5 max-w-lg text-sm sm:text-base leading-relaxed text-slate-300">
              Certified doorstep repair for <strong className="text-white font-semibold">Samsung, Sony, LG, Mi, OnePlus, TCL</strong> and all Smart TVs. Genuine parts with up to <strong className="text-emerald-300 font-semibold">90 days written warranty</strong>.
            </p>

            {/* 3 Simple Value Pillars */}
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-slate-200">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Clock size={15} className="text-emerald-400 shrink-0" />
                60-90 Mins Doorstep
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                90-Day Warranty
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                Transparent Pricing
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col gap-3 min-[440px]:flex-row min-[440px]:items-center">
              <button
                type="button"
                onClick={() => openBooking("hero-book-btn")}
                className="btn-primary w-full min-[440px]:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 sm:py-3.5 text-sm sm:text-base font-bold shadow-lg shadow-emerald-600/30 transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Zap size={17} className="text-emerald-200" />
                <span>Book Doorstep Visit</span>
              </button>

              <a
                href={phoneHref(phone)}
                className="w-full min-[440px]:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-white transition hover:bg-white/10 hover:border-emerald-400/60"
              >
                <Phone size={17} className="text-emerald-400" />
                <span>Call {phone}</span>
              </a>
            </div>

            {/* Trust Rating Strip */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="leading-snug">
                <strong className="text-white font-bold">4.9 / 5.0</strong> · Trusted by 15,000+ happy customers in Noida & NCR
              </span>
            </div>
          </div>

          {/* ───────────────────────────────────────────────────────────── */}
          {/*  RIGHT COLUMN: Clean, Lightweight Instant Callback Card        */}
          {/* ───────────────────────────────────────────────────────────── */}
          <div className="relative w-full">
            <div className="rounded-2xl border border-emerald-500/30 bg-[#092017] p-4.5 sm:p-6 md:p-7 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Wrench size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Instant Callback</h3>
                    <p className="text-[11px] text-emerald-400">Technician responds in &lt; 10 mins</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-300">
                  Online
                </span>
              </div>

              {submitted ? (
                <div className="py-6 sm:py-8 text-center space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-base font-bold text-white">Request Received!</h4>
                  <p className="text-xs text-slate-300">
                    Our service coordinator in Noida is calling you shortly.
                  </p>
                  <a
                    href={phoneHref(phone)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline pt-2"
                  >
                    <Phone size={13} />
                    <span>Or Call {phone} directly</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleQuickBook} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      TV Brand:
                    </label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="Samsung" className="bg-slate-900">Samsung</option>
                      <option value="Sony Bravia" className="bg-slate-900">Sony Bravia</option>
                      <option value="LG" className="bg-slate-900">LG</option>
                      <option value="Mi / Xiaomi" className="bg-slate-900">Mi / Xiaomi</option>
                      <option value="OnePlus" className="bg-slate-900">OnePlus</option>
                      <option value="TCL" className="bg-slate-900">TCL</option>
                      <option value="Panasonic" className="bg-slate-900">Panasonic</option>
                      <option value="Realme" className="bg-slate-900">Realme</option>
                      <option value="Vu" className="bg-slate-900">Vu</option>
                      <option value="Other Brand" className="bg-slate-900">Other Brand</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Mobile Number:
                    </label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="e.g. 9990113545"
                      className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold shadow-md shadow-emerald-500/25 transition hover:brightness-110 active:scale-[0.99] cursor-pointer"
                  >
                    <Sparkles size={15} />
                    <span>{loading ? "Submitting..." : "Get Free Inspection Call in 10s"}</span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>✓ Pay After Repair</span>
                    <span>✓ Zero Hidden Fees</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
