import Link from "next/link";
import { Tv, Wrench } from "lucide-react";

export function Logo({
  light = false,
  name = "Adarsh LED TV Repair",
  src,
}: {
  light?: boolean;
  name?: string;
  src?: string | null;
}) {
  const photo = src?.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i, "") || "/images/logo.png";

  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2 transition duration-200"
      aria-label={name || "Home"}
    >
      {photo ? (
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt={name || "Adarsh LED TV Repair"}
            className="h-8 xs:h-9 sm:h-11 md:h-12 w-auto max-w-[135px] min-[360px]:max-w-[160px] sm:max-w-[240px] object-contain object-left drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <div className="relative flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-105">
            <Tv size={18} strokeWidth={2.2} className="relative z-10 sm:hidden" />
            <Tv size={22} strokeWidth={2.2} className="relative z-10 hidden sm:block" />
            <Wrench size={10} className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 p-0.5 text-emerald-400 sm:hidden" />
            <Wrench size={12} className="absolute -bottom-1 -right-1 rounded-full bg-slate-900 p-0.5 text-emerald-400 hidden sm:block" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className={`max-w-36 min-[360px]:max-w-44 sm:max-w-64 truncate text-[0.8rem] sm:text-[0.96rem] font-black uppercase leading-tight tracking-[0.04em] ${light ? "text-white" : "text-slate-900"}`}>
              {name}
            </span>
            <span className="text-[0.6rem] sm:text-[0.66rem] font-bold uppercase tracking-[0.12em] text-emerald-500">
              LED · OLED · SMART TV
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

