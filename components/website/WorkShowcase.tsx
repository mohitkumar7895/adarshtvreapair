import { Sparkles } from "lucide-react";
import { WORK_SHOTS } from "@/lib/site-images";
import { CmsImage } from "@/components/website/CmsImage";

export function WorkShowcase() {
  return (
    <section className="section-pad bg-[#090d16] text-white">
      <div className="container-wide">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Sparkles size={13} />
          <span>Real Diagnostic Experience</span>
        </div>
        <h2 className="mt-3 max-w-2xl font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          <span className="gradient-text">Precision Workbench & Field Repairs</span>
        </h2>
        <p className="mt-3 max-w-xl text-sm text-slate-400 sm:text-base">
          Doorstep visits, board-level repair and workshop backup — the same discipline and genuine tools across Delhi NCR.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {WORK_SHOTS.map((shot, i) => {
            const wide = i === 0 || i === 4;
            return (
              <figure
                key={shot.label}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl ${
                  wide ? "col-span-2 min-h-40 sm:min-h-60 lg:min-h-80" : "min-h-32 sm:min-h-48 lg:min-h-80"
                }`}
              >
                <CmsImage
                  src={shot.src}
                  alt={shot.label}
                  className="object-cover transition duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/30 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                  <p className="font-display text-sm font-bold sm:text-lg">{shot.label}</p>
                  <p className="mt-1 hidden text-xs leading-relaxed text-slate-300 sm:block sm:text-sm">{shot.caption}</p>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
