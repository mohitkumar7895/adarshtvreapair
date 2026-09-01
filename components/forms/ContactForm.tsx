"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { apiPost } from "@/lib/api-client";
import { useUiStore } from "@/store/ui";

export function ContactForm() {
  const toast = useUiStore((s) => s.pushToast);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ customer_name: "", phone: "", email: "", message: "", city: "" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiPost("/leads", { ...form, source: "contact-form" });
      toast("success", "Message sent successfully! We will get back to you shortly.");
      setForm({ customer_name: "", phone: "", email: "", message: "", city: "" });
    } catch (err) {
      toast("error", err instanceof Error ? err.message : "Could not submit message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-700">Full Name *</span>
          <input
            className="site-input"
            placeholder="e.g. Rahul Verma"
            required
            value={form.customer_name}
            onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-700">Phone Number *</span>
          <input
            className="site-input"
            placeholder="e.g. 98765 43210"
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-700">Email Address</span>
          <input
            className="site-input"
            placeholder="you@example.com"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label>
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-700">City / Area</span>
          <input
            className="site-input"
            placeholder="e.g. Noida Sector 62, Delhi"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
        </label>
      </div>

      <label>
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-700">Message / Query</span>
        <textarea
          className="site-input min-h-28"
          placeholder="How can our television repair engineers assist you today?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </label>

      <button
        type="submit"
        className="btn-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-lg shadow-emerald-500/"
        disabled={loading}
      >
        <Send size={15} />
        {loading ? "Sending Message…" : "Send Message to Coordinator"}
      </button>
    </form>
  );
}
