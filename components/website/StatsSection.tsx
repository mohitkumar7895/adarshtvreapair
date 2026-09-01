"use client";

import { useEffect, useRef, useState } from "react";
import { Award, CheckCircle, Clock, Star, Tv, Users } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: typeof Users;
}

const STATS: Stat[] = [
  { value: 9000, suffix: "+", label: "Happy Customers", sublabel: "Across Delhi NCR", icon: Users },
  { value: 15000, suffix: "+", label: "TVs Repaired", sublabel: "LED, OLED & 4K", icon: Tv },
  { value: 10, suffix: "+", label: "Years Experience", sublabel: "Certified Engineers", icon: Award },
  { value: 100, suffix: "%", label: "Genuine Parts", sublabel: "90-Day Warranty", icon: CheckCircle },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let startTimestamp: number | null = null;
    const duration = 1200;
    let rafId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value]);

  return (
    <span>
      {display >= 1000 ? display.toLocaleString("en-IN") : display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-[#090d16] via-[#0c1527] to-[#090d16] py-10 sm:py-16 lg:py-20"
    >
      {/* High-tech radial background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-40 w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_70%)]" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-4 gap-1.5 min-[360px]:gap-2 sm:gap-4 lg:gap-6">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 min-[360px]:p-2.5 sm:p-5 lg:p-6 text-center backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-emerald-500/10"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 120}ms, transform 0.6s ease ${i * 120}ms, border-color 0.3s, background-color 0.3s`,
                }}
              >
                {/* Glowing icon badge */}
                <div className="mb-1.5 sm:mb-4 flex h-6 w-6 min-[360px]:h-7 min-[360px]:w-7 sm:h-12 sm:w-12 items-center justify-center rounded-md sm:rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-300">
                  <Icon size={12} className="min-[360px]:hidden" />
                  <Icon size={15} className="hidden min-[360px]:block sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>

                <div className="font-display text-xs min-[360px]:text-sm min-[410px]:text-base sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white whitespace-nowrap">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
                </div>

                <span className="mt-1 text-[9px] min-[360px]:text-[11px] sm:text-sm md:text-base font-semibold tracking-tight sm:tracking-wide text-slate-200 text-center leading-tight">
                  {stat.label}
                </span>

                <span className="mt-0.5 text-[8px] min-[360px]:text-[9px] sm:text-xs text-slate-400 text-center leading-tight">
                  {stat.sublabel}
                </span>

                {/* Micro accent bar */}
                <span
                  className="mt-1.5 sm:mt-4 h-0.5 w-3 min-[360px]:w-5 sm:w-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                  style={{
                    transform: inView ? "scaleX(1)" : "scaleX(0)",
                    transition: `transform 0.6s ease ${i * 120 + 300}ms`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
