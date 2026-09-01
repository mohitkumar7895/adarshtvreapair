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
                className="group relative flex aspect-[16/11] w-[300px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#070d17] p-2 shadow-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-500/20 sm:w-[360px] md:w-[400px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image_url}
                  alt={slide.alt_text || slide.caption || "TV repair work snapshot"}
                  className="max-h-full max-w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {slide.caption ? (
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="inline-block truncate max-w-full rounded-lg bg-black/75 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md border border-white/10">
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
