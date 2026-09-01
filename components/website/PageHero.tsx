import { Sparkles } from "lucide-react";
import { resolveWorkImage } from "@/lib/site-images";
import { CmsImage } from "@/components/website/CmsImage";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string | null;
}) {
  const photo = resolveWorkImage(image);
  return (
    <section className="relative isolate overflow-hidden bg-[#090d16] text-white py-14 sm:py-20 lg:py-24">
      {photo ? (
        <CmsImage src={photo} alt="" className="-z-10 hidden object-contain opacity-25 lg:block" priority />
      ) : null}
      <div className="page-hero-mesh pointer-events-none absolute inset-0 opacity-80" />
      {photo ? <div className="hero-photo-shade pointer-events-none absolute inset-0 hidden lg:block" /> : null}

      <div className="container-wide relative z-10">
        {eyebrow ? (
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/ bg-emerald-500/ px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">
            <Sparkles size={12} />
            <span>{eyebrow}</span>
          </div>
        ) : null}
        <h1 className="max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          <span className="gradient-text">{title}</span>
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
