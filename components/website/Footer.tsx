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
    <footer className="relative bg-[#070a12] pb-[calc(4.5rem+env(safe-area-inset-bottom))] text-slate-300 lg:pb-0">
      {/* Top glowing gradient border line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-80" />

      <div className="container-wide grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
        {/* Company Info */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo light name={name} src={settings["business.logo"]} />
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Professional doorstep TV repair for LED, LCD, OLED, 4K QLED and Smart TVs. Fast diagnostics, genuine spare parts, and warranty on all services.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
            <ShieldCheck size={14} />
            <span>90-Day Service Warranty</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Services & Links</p>
          <div className="mt-4 grid gap-2.5 text-sm text-slate-400">
            {items.map((item) => (
              <SiteLink
                key={item.id}
                href={item.url}
                className="transition hover:translate-x-1 hover:text-white"
                source="footer"
              >
                {item.label}
              </SiteLink>
            ))}
          </div>
        </div>

        {/* Operating Hours & Address */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Service Hours</p>
          <div className="mt-4 space-y-3 text-sm text-slate-400">
            {settings["business.working_hours"] ? (
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>{settings["business.working_hours"]}</span>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>Open 7 Days · 8:00 AM - 9:00 PM</span>
              </div>
            )}
            {settings["business.address"] ? (
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                <span className="leading-relaxed">{settings["business.address"]}</span>
              </div>
            ) : (
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                <span>Doorstep Service across Delhi, Noida, Gurgaon, Ghaziabad & Faridabad</span>
              </div>
            )}
          </div>
        </div>

        {/* Direct Contact Support */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">Helpdesk & Booking</p>
          <div className="mt-4 space-y-3 text-sm">
            {phone ? (
              <a
                href={phoneHref(phone)}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:border-emerald-500/ hover:bg-emerald-500/ hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/">
                  <Phone size={16} />
                </span>
                <div className="min-w-0">
                  <span className="block text-[11px] font-medium text-slate-400">Call Toll-Free / Helpdesk</span>
                  <span className="block font-bold tracking-wide text-white">{phone}</span>
                </div>
              </a>
            ) : null}

            {whatsapp ? (
              <a
                href={whatsappHref(whatsapp, "Hi, I need TV repair assistance.")}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200 transition hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/30">
                  <MessageCircle size={16} />
                </span>
                <div className="min-w-0">
                  <span className="block text-[11px] font-medium text-slate-400">Instant WhatsApp Chat</span>
                  <span className="block font-bold tracking-wide text-emerald-400">Chat with Technician</span>
                </div>
              </a>
            ) : null}

            {settings["business.email"] ? (
              <a
                href={`mailto:${settings["business.email"]}`}
                className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-emerald-400"
              >
                <Mail size={13} className="text-emerald-400" />
                <span className="truncate">{settings["business.email"]}</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="border-t border-white/10 bg-[#05070e]">
        <div className="container-wide flex flex-col gap-3 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{settings["footer.copyright"] || `© ${new Date().getFullYear()} ${name}. All rights reserved.`}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
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
