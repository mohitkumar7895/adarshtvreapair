import type { Metadata } from "next";
import { Camera, Sparkles } from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getSiteContext } from "@/server/services/site";
import { query } from "@/lib/db/query";
import { buildMetadata } from "@/lib/seo/metadata";
import { PageHero } from "@/components/website/PageHero";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteContext();
  return buildMetadata({
    fallbackTitle: "Repair Work Gallery",
    fallbackDescription: "View our gallery of on-site TV repairs and diagnostic laboratory work.",
    path: `/gallery`,
    settings: site.settings,
  });
}

export default async function GalleryPage() {
  const images = await query<any>(`
    SELECT g.*, m.url as image_url, m.alt_text 
    FROM gallery_images g
    JOIN media m ON g.media_id = m.id
    WHERE g.is_visible = 1
    ORDER BY g.sort_order ASC, g.id DESC
  `);

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]} />
      <PageHero
        eyebrow="Portfolio & Gallery"
        title="Television Repair Work Showcase"
        description="A visual look into our component-level motherboard repairs, backlight replacements, panel bonding, and technician on-site visits."
      />

      <section className="section-pad bg-slate-50 text-slate-900">
        <div className="container-wide">
          {images.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/ hover:shadow-xl hover:shadow-emerald-500/"
                >
                  <div className="aspect-4/3 overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={img.image_url} 
                      alt={img.alt_text || img.caption || "TV repair work snapshot"} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108" 
                    />
                  </div>
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 pt-12">
                      <p className="text-sm font-semibold text-white">{img.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500">
              <Camera size={40} className="mx-auto mb-3 text-slate-400" />
              <p>No gallery images uploaded yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
