import { ArrowRight, CheckCircle2, Clock, Phone, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Reveal } from "@/components/website/Reveal";

const STEPS = [
  {
    step: "01",
    title: "Request a Visit",
    desc: "Call 9990113545 or book online. Share your TV brand (Samsung, Sony, LG, Mi, etc.) and the issue.",
    icon: Phone,
    badge: "1 Min Process",
  },
  {
    step: "02",
    title: "60-90 Min Doorstep Arrival",
    desc: "Certified technician arrives at your home in Noida, Bhangel or Salarpur fully equipped with diagnostic tools.",
    icon: Clock,
    badge: "Fast NCR Arrival",
  },
  {
    step: "03",
    title: "Clear Inspection & Quote",
    desc: "We perform electrical and panel testing and provide a 100% upfront quote before touching any part.",
    icon: Wrench,
    badge: "No Surprise Fees",
  },
  {
    step: "04",
    title: "On-Site Fix & Warranty",
    desc: "Most repairs finish in 45-60 minutes right in front of you. Handover with a 90-day written warranty.",
    icon: ShieldCheck,
    badge: "90-Day Warranty",
  },
];

export function RepairProcess() {
  return (
    <section className="section-pad relative overflow-hidden bg-slate-50">
      <div className="container-wide">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
              <Sparkles size={13} className="text-emerald-500" />
              Simple & Transparent
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
              How Doorstep TV Repair Works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Get your TV back to crystal-clear performance without carrying heavy screens to service centers.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.step} delay={index * 80} className="h-full">
                <div className="group relative flex h-full flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-2xl sm:text-3xl font-black text-slate-200 group-hover:text-emerald-500/30 transition">
                        {item.step}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-700">
                        {item.badge}
                      </span>
                    </div>

                    <div className="mt-3 sm:mt-4 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={18} className="sm:hidden" />
                      <Icon size={22} className="hidden sm:block" />
                    </div>

                    <h3 className="mt-3 sm:mt-5 font-display text-base sm:text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 sm:mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-6 flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 size={13} />
                    <span>Guaranteed Quality</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
