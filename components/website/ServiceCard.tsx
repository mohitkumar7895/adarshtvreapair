import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CmsImage } from "@/components/website/CmsImage";
import { servicePhoto } from "@/lib/site-images";

export function ServiceCard({
  name,
  slug,
  description,
  image,
}: {
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}) {
  return (
    <Link
      href={`/tv-repair/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 p-1.5 sm:p-2 sm:aspect-16/10">
        <CmsImage
          src={image || servicePhoto(slug)}
          alt={name}
          className="object-contain p-1 sm:p-2 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute top-1.5 left-1.5 sm:top-3 sm:left-3 rounded sm:rounded-md bg-slate-900/80 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
          Repairs
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-2.5 sm:p-5">
        <div>
          <h3 className="font-display text-xs sm:text-lg font-bold text-slate-900 transition group-hover:text-emerald-600 line-clamp-2 leading-snug sm:leading-normal">
            {name}
          </h3>
          {description ? (
            <p className="mt-1 sm:mt-2 line-clamp-2 text-[10px] sm:text-sm leading-tight sm:leading-relaxed text-slate-600">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mt-2 sm:mt-5 flex items-center justify-between border-t border-slate-100 pt-2 sm:pt-3">
          <span className="text-[10px] sm:text-xs font-bold text-emerald-600 group-hover:underline truncate">
            View Pricing
          </span>
          <span className="flex h-5 w-5 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:bg-emerald-600 group-hover:text-white">
            <ArrowUpRight size={10} className="sm:hidden" />
            <ArrowUpRight size={14} className="hidden sm:block" />
          </span>
        </div>
      </div>
    </Link>
  );
}
