"use client";

import { Camera, Sparkles } from "lucide-react";

interface GalleryImage {
  id: number;
  image_url: string;
  alt_text?: string;
  caption?: string;
}

export function GallerySlider({ images }: { images: GalleryImage[] }) {
  const baseSlides = images.slice(0, 10);
  const slides = [...baseSlides, ...baseSlides];

  if (!baseSlides.length) return null;

  return (
    <section className="section-pad overflow-hidden bg-slate-900 text-white">
      <div className="container-wide">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Camera size={13} />
              <span>Workshop & On-Site Gallery</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Live TV Repair Work
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-400 sm:text-right">
            Real snapshots from our workbench and on-site doorstep visits across Delhi NCR.
          </p>
        </div>

        {/* Continuous Horizontal Marquee */}
        <div className="overflow-hidden w-full -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0">
          <div className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused] will-change-transform">
            {slides.map((slide, i) => (
              <div
                key={`${slide.id}-${i}`}
                className="group relative aspect-4/3 w-[280px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/20 sm:w-[340px] md:w-[380px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image_url}
                  alt={slide.alt_text || slide.caption || "TV repair work snapshot"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                {slide.caption ? (
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-md">
                      {slide.caption}
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
