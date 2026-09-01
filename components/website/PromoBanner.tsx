import Link from "next/link";
import { CmsImage } from "@/components/website/CmsImage";

export function PromoBanner({ image }: { image?: string }) {
  return (
    <section className="section-pad pb-0 bg-slate-50">
      <div className="container-wide">
        <Link
          href="/book-service"
          className="group block relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-xl transition hover:shadow-2xl hover:border-emerald-500/"
        >
          <div className="relative aspect-[21/9] w-full sm:aspect-[3/1]">
            <CmsImage
              src={image || "/images/tv-banner.jpg"}
              alt="TV Repair Special Promotion"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-103"
              sizes="100vw"
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
