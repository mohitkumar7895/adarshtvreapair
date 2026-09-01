"use client";

import { MessageCircle, Phone } from "lucide-react";
import { phoneHref, whatsappHref } from "@/lib/utils/cn";

export function FloatingContact({
  phone = "9990113545",
  whatsapp = "919990113545",
}: {
  phone?: string;
  whatsapp?: string;
}) {
  return (
    <aside aria-label="Quick Actions" className="fixed bottom-[4.8rem] md:bottom-6 right-3 sm:right-5 z-40 flex flex-col items-end gap-2 sm:gap-2.5">
      {/* WhatsApp Button */}
      <a
        href={whatsappHref(whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-full w-full rounded-full bg-emerald-400 border-2 border-white" />
        </span>
        <MessageCircle size={22} className="fill-white stroke-none sm:hidden" />
        <MessageCircle size={26} className="fill-white stroke-none hidden sm:block" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hidden sm:block">
          WhatsApp Us
        </span>
      </a>

      {/* Call Button */}
      <a
        href={phoneHref(phone)}
        aria-label="Call Adarsh LED TV Repair"
        className="group relative flex h-11 w-11 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-600/35 transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <Phone size={18} className="animate-pulse sm:hidden" />
        <Phone size={22} className="animate-pulse hidden sm:block" />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 hidden sm:block">
          Call {phone}
        </span>
      </a>
    </aside>
  );
}
