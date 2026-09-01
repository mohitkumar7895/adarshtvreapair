import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Zap } from "lucide-react";
import type { MenuItem } from "@/models";
import type { SettingsMap } from "@/types";
import { phoneHref, whatsappHref } from "@/lib/utils/cn";
import { Logo } from "@/components/website/Logo";
import { SiteLink } from "@/components/website/SiteLink";

export function Footer({
  settings,
  items,
  legal,
}: {
  settings: SettingsMap;
  items: MenuItem[];
  legal: MenuItem[];
}) {
  const phone = settings["business.phone"] || "";
  const whatsapp = settings["business.whatsapp"] || phone;
  const name = settings["business.name"] || "India LED TV Repair Center";

  return (
    <footer className="relative bg-[#070a12] pb-[calc(3.8rem+env(safe-area-inset-bottom))] text-slate-300 lg:pb-0">
      {/* Top glowing gradient border line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80" />

      <div className="container-wide grid grid-cols-2 gap-x-4 gap-y-6 py-6 sm:py-10 sm:gap-8 lg:grid-cols-4">
        {/* Company Info */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <Logo light name={name} src={settings["business.logo"]} />
          <p className="mt-2.5 text-xs leading-relaxed text-slate-400 max-w-sm">
            Doorstep TV repair for LED, LCD, OLED & 4K Smart TVs with genuine parts and warranty across Delhi NCR.
          </p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">Services & Links</p>
          <div className="mt-2.5 grid gap-1.5 text-xs sm:text-sm text-slate-400">
            {items.map((item) => (
              <SiteLink
                key={item.id}
                href={item.url}
                className="transition hover:text-white"
                source="footer"
              >
                {item.label}
              </SiteLink>
            ))}
          </div>
        </div>

        {/* Operating Hours & Address */}
        <div className="col-span-1">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">Hours & Location</p>
          <div className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-400">
            <div className="flex items-start gap-1.5">
              <Clock size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="leading-snug">{settings["business.working_hours"] || "8:00 AM - 9:00 PM (7 Days)"}</span>
            </div>
            <div className="flex items-start gap-1.5">
              <MapPin size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="leading-snug">{settings["business.address"] || "Delhi, Noida, Gurgaon, Ghaziabad & NCR"}</span>
            </div>
          </div>
        </div>

        {/* Direct Contact Support */}
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">Helpdesk & Booking</p>
          <div className="mt-2.5 grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs sm:text-sm">
            {phone ? (
              <a
                href={phoneHref(phone)}
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-emerald-500/50 hover:bg-white/10 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm">
                  <Phone size={13} />
                </span>
                <div className="min-w-0">
                  <span className="block text-[9px] min-[360px]:text-[10px] text-slate-400 leading-tight">Helpline</span>
                  <span className="block font-bold text-[11px] min-[360px]:text-xs sm:text-sm text-white truncate">{phone}</span>
                </div>
              </a>
            ) : null}

            {whatsapp ? (
              <a
                href={whatsappHref(whatsapp, "Hi, I need TV repair assistance.")}
                className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:border-emerald-500/50 hover:bg-white/10 hover:text-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white shadow-sm">
                  <MessageCircle size={13} />
                </span>
                <div className="min-w-0">
                  <span className="block text-[9px] min-[360px]:text-[10px] text-slate-400 leading-tight">WhatsApp Chat</span>
                  <span className="block font-bold text-[11px] min-[360px]:text-xs sm:text-sm text-emerald-400 truncate">Technician</span>
                </div>
              </a>
            ) : null}

            {settings["business.email"] ? (
              <a
                href={`mailto:${settings["business.email"]}`}
                className="col-span-2 lg:col-span-1 flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 transition hover:text-emerald-400 pt-0.5"
              >
                <Mail size={12} className="text-emerald-400 shrink-0" />
                <span className="truncate">{settings["business.email"]}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="border-t border-white/10 bg-[#05070e]">
        <div className="container-wide flex flex-col gap-2 py-3 text-[11px] sm:text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{settings["footer.copyright"] || `© ${new Date().getFullYear()} ${name}. All rights reserved.`}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {legal.map((item) => (
              <Link key={item.id} href={item.url} className="transition hover:text-emerald-400">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MobileCta({ settings }: { settings: SettingsMap }) {
  const phone = settings["business.phone"] || "";
  const whatsapp = settings["business.whatsapp"] || phone;

  return (
    <div className="mobile-cta">
      <a
        href={phoneHref(phone)}
        className="flex items-center justify-center gap-2 bg-[#090d16] py-3.5 text-white transition hover:bg-slate-900"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <Phone size={13} />
        </span>
        <span>Call Expert</span>
      </a>
      <a
        href={whatsappHref(whatsapp, "Hi, I need urgent TV repair service.")}
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 py-3.5 text-white shadow-lg transition"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
          <MessageCircle size={14} />
        </span>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
