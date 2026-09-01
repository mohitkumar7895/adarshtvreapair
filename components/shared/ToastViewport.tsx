"use client";

import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useUiStore } from "@/store/ui";

export function ToastViewport() {
  const { toasts, dismissToast } = useUiStore();
  if (!toasts.length) return null;

  return (
    <div className="fixed inset-x-4 bottom-24 z-50 flex flex-col gap-2.5 lg:inset-x-auto lg:right-6 lg:bottom-6 lg:w-[min(380px,calc(100%-2rem))]">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 rounded-2xl p-4 text-left text-sm text-white shadow-2xl backdrop-blur-xl border transition-all ${
            toast.type === "error"
              ? "bg-rose-900/90 border-rose-500/50"
              : toast.type === "success"
                ? "bg-slate-900/95 border-emerald-500/50"
                : "bg-slate-900/95 border-emerald-500/"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
          ) : toast.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Info size={18} className="text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0 font-medium leading-relaxed">
            {toast.message}
          </div>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="text-white/60 hover:text-white shrink-0 p-0.5"
            aria-label="Dismiss toast"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
