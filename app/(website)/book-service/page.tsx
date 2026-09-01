import type { Metadata } from "next";
import { getPublishedPageBySlug } from "@/server/repositories/pages.repository";
import { getSeo } from "@/server/repositories/seo.repository";
import { getSiteContext } from "@/server/services/site";
import { PageRenderer } from "@/components/website/PageRenderer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { BookingForm } from "@/components/forms/BookingForm";
import { PageHero } from "@/components/website/PageHero";
import { buildMetadata } from "@/lib/seo/metadata";
import { hasSection, pageBanner } from "@/lib/page-banner";

export async function generateMetadata(): Promise<Metadata> {
  const [page, site] = await Promise.all([getPublishedPageBySlug("book-service"), getSiteContext()]);
  const seo = page ? await getSeo("page", page.id) : null;
  return buildMetadata({
    seo,
    fallbackTitle: "Book Doorstep TV Repair",
    fallbackDescription: "Schedule a fast same-day doorstep TV repair visit across Delhi NCR.",
    path: "/book-service",
    settings: site.settings,
  });
}

export default async function BookServicePage() {
  const [page, site] = await Promise.all([getPublishedPageBySlug("book-service"), getSiteContext()]);
  const showHero = !hasSection(page?.sections, "hero");
  const showForm = !hasSection(page?.sections, "booking_form");

  return (
    <>
      <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Book Service", href: "/book-service" }]} />
      {showHero ? (
        <PageHero
          eyebrow="Express Same-Day Slots"
          title="Schedule a Doorstep TV Repair Visit"
          description="Provide your television brand, model details, and the fault symptoms. A dedicated coordinator will confirm the visit window before our engineer arrives."
          image={pageBanner(page)}
        />
      ) : null}

      {page ? (
        <PageRenderer
          sections={page.sections.filter((s) => (showHero ? s.type !== "text" : true))}
          extras={site}
        />
      ) : null}

      {showForm ? (
        <section className="section-pad bg-slate-50">
          <div className="container-narrow">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
              <div className="mb-6 border-b border-slate-100 pb-4">
                <h2 className="font-display text-2xl font-bold text-slate-900">
                  Appointment Details
                </h2>
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Complete the form below to request our certified technician.
                </p>
              </div>
              <BookingForm variant="full" source="book-service-page" />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
