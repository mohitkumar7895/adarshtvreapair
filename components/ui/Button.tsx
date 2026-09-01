import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "navy" | "outline" | "ghost";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: "btn-primary",
    navy: "btn-navy",
    outline: "btn-outline border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white",
    ghost: "inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-slate-100 text-slate-700",
  };
  return <button className={cn(styles[variant], className)} {...props} />;
}
