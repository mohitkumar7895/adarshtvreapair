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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 p-2 sm:aspect-16/10">
        <CmsImage
          src={image || servicePhoto(slug)}
          alt={name}
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <span className="absolute top-3 left-3 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-sm">
          Repairs
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
          {name}
        </h3>
        {description ? (
          <p className="mt-2 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
            {description}
          </p>
        ) : null}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-bold text-emerald-600 group-hover:underline">
            View Service & Pricing
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 transition-transform group-hover:translate-x-1 group-hover:bg-emerald-600 group-hover:text-white">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
