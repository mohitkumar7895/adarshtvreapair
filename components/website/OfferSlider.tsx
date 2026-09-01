"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resolveWorkImage, SITE_IMAGES } from "@/lib/site-images";

export function OfferSlider({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  if (!images || images.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-[#070a12] py-4 sm:py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-wide">
        <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0c1322] shadow-2xl">
          <div className="relative flex min-h-[180px] w-full items-center justify-center sm:min-h-[300px] md:min-h-[420px]">
            {images.map((img, i) => (
              <div
                key={i}
                className={`w-full transition-all duration-700 ease-in-out ${
                  i === active
                    ? "relative z-10 block opacity-100 scale-100"
                    : "absolute inset-0 z-0 hidden opacity-0 scale-95"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveWorkImage(img) || SITE_IMAGES.hero}
                  alt={`Special Offer & Repair Banner ${i + 1}`}
                  className="mx-auto block h-auto max-h-[320px] w-full object-contain sm:max-h-[440px] md:max-h-[520px]"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              {/* Indicator Dots */}
              <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-8 bg-emerald-400 shadow-md shadow-emerald-400/50"
                        : "w-2 bg-white/30 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:scale-110 hover:bg-emerald-600 sm:left-5 sm:h-11 sm:w-11"
                onClick={() => setActive((i) => (i - 1 + images.length) % images.length)}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition hover:scale-110 hover:bg-emerald-600 sm:right-5 sm:h-11 sm:w-11"
                onClick={() => setActive((i) => (i + 1) % images.length)}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
