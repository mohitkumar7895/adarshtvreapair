"use client";

import { useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { BookingForm } from "@/components/forms/BookingForm";
import { useUiStore } from "@/store/ui";

export function BookingModal() {
  const open = useUiStore((s) => s.bookingOpen);
  const source = useUiStore((s) => s.bookingSource);
  const closeBooking = useUiStore((s) => s.closeBooking);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeBooking();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, closeBooking]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      {/* Dark frosted backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        aria-label="Close booking modal"
        onClick={closeBooking}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative z-10 max-h-[min(94dvh,calc(100dvh-1rem))] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-slate-200/80 bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-7 md:p-8"
      >
        <div className="mb-4 sm:mb-6 flex items-start justify-between gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600">
              <Sparkles size={11} className="text-emerald-500" />
              <span>Same-Day Booking</span>
            </div>
            <h2 id="booking-modal-title" className="mt-1 font-display text-lg sm:text-2xl font-bold tracking-tight text-slate-900">
              Book a Doorstep Repair
            </h2>
            <p className="mt-0.5 text-xs leading-relaxed text-slate-500 sm:text-sm">
              Our engineer will confirm the visit window before departure.
            </p>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
            onClick={closeBooking}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <BookingForm variant="panel" source={source} onSuccess={closeBooking} />
      </div>
    </div>
  );
}
