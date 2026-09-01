import { BadgeCheck, MapPin, Quote, Sparkles, Star } from "lucide-react";
import type { Testimonial } from "@/models";
import { Reveal } from "@/components/website/Reveal";

export function TestimonialsSection({
  heading,
  items,
}: {
  heading?: string;
  items: Testimonial[];
}) {
  const reviews = items.slice(0, 6);
  if (!reviews.length) return null;

  return (
    <section className="section-pad bg-slate-50">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <Sparkles size={13} className="text-emerald-500" />
                <span>Customer Experiences</span>
              </div>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                {heading || "What Customers Say"}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-right">
              Authentic reviews from homeowners and businesses who got their TVs repaired across Delhi NCR.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.id} delay={index * 80} className="h-full">
              <article className="group relative flex h-full flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 md:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 sm:gap-1 text-amber-400" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, star) => (
                        <Star key={star} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-emerald-600">
                      <BadgeCheck size={12} />
                      Verified Visit
                    </span>
                  </div>

                  <p className="mt-3.5 sm:mt-5 text-sm sm:text-base leading-relaxed text-slate-700">
                    “{review.review}”
                  </p>
                </div>

                <footer className="mt-4 sm:mt-6 flex items-center gap-3 border-t border-slate-100 pt-3 sm:pt-4">
                  <span className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-xs sm:text-sm font-bold text-white shadow-md shadow-emerald-500/20">
                    {review.customer_name.slice(0, 1).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate text-xs sm:text-sm font-bold text-slate-900">
                      {review.customer_name}
                    </span>
                    {review.location ? (
                      <span className="mt-0.5 flex items-center gap-1 text-[11px] sm:text-xs text-slate-500">
                        <MapPin size={11} className="text-emerald-500" />
                        {review.location}
                      </span>
                    ) : null}
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
