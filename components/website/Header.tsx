"use client";

import { useState } from "react";
import { ChevronDown, Menu, Phone, Sparkles, X } from "lucide-react";
import type { MenuItem } from "@/models";
import type { SettingsMap } from "@/types";
import { phoneHref } from "@/lib/utils/cn";
import { Logo } from "@/components/website/Logo";
import { SiteLink } from "@/components/website/SiteLink";
import { useUiStore } from "@/store/ui";

export function Header({
  settings,
  items,
}: {
  settings: SettingsMap;
  items: MenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const openBooking = useUiStore((s) => s.openBooking);
  const phone = settings["business.phone"] || "";
  const name = settings["business.name"] || "India LED TV Repair Center";
  const hours = settings["business.working_hours"] || "";
  const navItems = items.some((item) => item.url === "/gallery" || item.label?.toLowerCase() === "gallery")
    ? items
    : [...items, { id: -1, menu_id: 0, parent_id: null, label: "Gallery", url: "/gallery", target: "_self", sort_order: 999, is_enabled: 1, created_at: "", updated_at: "" }];

  return (
    <header className="sticky top-0 z-50 transition-all">
      {/* Top utility bar */}
      <div className="border-b border-white/10 bg-[#060911] text-xs text-slate-400">
        <div className="container-wide flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="min-w-0 truncate font-medium text-slate-300">
              {hours ? `Express Doorstep Repair · ${hours}` : "Fast Doorstep TV Repair in 60-90 mins"}
            </span>
          </div>
          {phone ? (
            <a
              href={phoneHref(phone)}
              className="group inline-flex shrink-0 items-center gap-1.5 font-semibold text-slate-200 transition hover:text-emerald-400"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 transition group-hover:bg-emerald-500 group-hover:text-white">
                <Phone size={10} />
              </span>
              <span className="tracking-wide">{phone}</span>
            </a>
          ) : null}
        </div>
      </div>

      {/* Main Solid Glass Header */}
      <div className="border-b border-white/10 bg-[#06120d] transition-colors">
        <div className="container-wide flex h-16 min-w-0 items-center justify-between gap-4 sm:h-20 lg:gap-8">
          <div className="min-w-0 shrink">
            <Logo light name={name} src={settings["business.logo"]} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-2 text-[0.92rem] whitespace-nowrap text-slate-300 lg:flex xl:gap-5">
            {navItems.map((item) => (
              <div key={item.id} className="group relative shrink-0">
                <SiteLink
                  href={item.url}
                  target={item.target}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium transition hover:bg-white/5 hover:text-white"
                  source="header-nav"
                >
                  {item.label}
                  {item.children?.length ? (
                    <ChevronDown size={14} className="opacity-60 transition group-hover:rotate-180 group-hover:opacity-100" />
                  ) : null}
                </SiteLink>

                {item.children?.length ? (
                  <div className="invisible absolute right-0 top-full z-20 mt-1 min-w-56 overflow-hidden rounded-xl border border-white/15 bg-slate-900/95 py-2 text-slate-200 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <SiteLink
                        key={child.id}
                        href={child.url}
                        className="block px-4 py-2.5 text-left text-sm whitespace-normal transition hover:bg-emerald-500/15 hover:text-emerald-300"
                        source="header-nav"
                      >
                        {child.label}
                      </SiteLink>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              className="btn-primary flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold shadow-lg shadow-emerald-500/25"
              onClick={() => openBooking("header")}
            >
              <Sparkles size={15} className="text-emerald-200" />
              Book Service
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            {phone ? (
              <a
                href={phoneHref(phone)}
                className="btn-primary flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold"
                aria-label="Call Now"
              >
                <Phone size={13} />
                <span>Call</span>
              </a>
            ) : null}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open ? (
          <div className="max-h-[min(75vh,calc(100dvh-5rem))] overflow-y-auto border-t border-white/10 bg-[#0a0f1d] px-5 py-4 lg:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.id}>
                  <SiteLink
                    href={item.url}
                    className="block rounded-lg px-3 py-2.5 text-left text-[0.95rem] font-medium text-slate-200 transition hover:bg-white/10"
                    source="header-nav"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </SiteLink>
                  {item.children?.length ? (
                    <div className="mb-2 ml-3 space-y-1 border-l-2 border-emerald-500/30 pl-3">
                      {item.children.map((child) => (
                        <SiteLink
                          key={child.id}
                          href={child.url}
                          className="block rounded-md px-2.5 py-2 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                          source="header-nav"
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </SiteLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10">
              <button
                type="button"
                className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
                onClick={() => {
                  setOpen(false);
                  openBooking("header-mobile");
                }}
              >
                <Sparkles size={16} />
                Book Doorstep Visit
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
