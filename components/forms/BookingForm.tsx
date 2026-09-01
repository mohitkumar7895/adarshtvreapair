"use client";

import { FormEvent, useState } from "react";
import { Sparkles } from "lucide-react";
import { apiPost } from "@/lib/api-client";
import { Button } from "@/components/ui/Button";
import { useUiStore } from "@/store/ui";

const FULL_FIELDS = [
  ["customer_name", "Full name", "text", "e.g. Amit Sharma"],
  ["phone", "Phone Number", "tel", "e.g. 98765 43210"],
  ["email", "Email Address", "email", "you@example.com"],
  ["tv_brand", "TV Brand", "text", "Samsung, Sony, LG, Mi..."],
  ["tv_type", "TV Display Type", "text", "LED, OLED, 4K Smart TV"],
  ["tv_size", "Screen Size", "text", "e.g. 43 inch, 55 inch"],
  ["address", "Street Address / House No", "text", "House No, Tower, Society"],
  ["city", "City / Area", "text", "e.g. Noida, Delhi NCR"],
  ["pincode", "Pincode", "text", "e.g. 201301"],
  ["preferred_date", "Preferred Date", "date", ""],
  ["preferred_time", "Preferred Time Slot", "text", "Morning / Afternoon / Evening"],
] as const;

const PANEL_FIELDS = [
  ["customer_name", "Full Name", "text", "e.g. Amit Sharma"],
  ["phone", "Phone Number", "tel", "e.g. 98765 43210"],
  ["city", "City / Area", "text", "e.g. Noida, Delhi NCR"],
  ["tv_type", "TV Brand & Model", "text", "e.g. Sony 55\" 4K LED"],
] as const;

export function BookingForm({
  compact = false,
  variant,
  source = "booking-form",
  onSuccess,
}: {
  compact?: boolean;
  variant?: "full" | "panel";
  source?: string;
  onSuccess?: () => void;
}) {
  const toast = useUiStore((s) => s.pushToast);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const mode = variant || (compact ? "panel" : "full");
  const fields = mode === "panel" ? PANEL_FIELDS : FULL_FIELDS;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiPost("/leads", { ...form, source });
      toast("success", "Request received! Our technician desk will call you shortly.");
      setForm({});
      onSuccess?.();
    } catch (err) {
      toast("error", err instanceof Error ? err.message : "Could not submit booking");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5 sm:space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {fields.map(([name, label, type, placeholder]) => (
          <label key={name} className="block min-w-0">
            <span className="mb-1 block text-xs font-semibold tracking-wide text-slate-700">
              {label} {name === "customer_name" || name === "phone" ? <span className="text-red-500">*</span> : null}
            </span>
            <input
              required={name === "customer_name" || name === "phone"}
              type={type}
              placeholder={placeholder}
              className="site-input"
              value={form[name] || ""}
              onChange={(e) => setForm({ ...form, [name]: e.target.value })}
            />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="mb-1 block text-xs font-semibold tracking-wide text-slate-700">
          What is the problem with your TV?
        </span>
        <textarea
          className="site-input min-h-20"
          placeholder="e.g. No power, screen sound working but no display, lines on panel, Wi-Fi not connecting..."
          value={form.problem || ""}
          onChange={(e) => setForm({ ...form, problem: e.target.value })}
        />
      </label>

      <button
        type="submit"
        className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-lg shadow-emerald-500/"
        disabled={loading}
      >
        <Sparkles size={16} />
        {loading ? "Confirming Booking…" : "Request Doorstep Technician"}
      </button>
    </form>
  );
}
