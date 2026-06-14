"use client";

import { type FormEvent, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { services } from "@/lib/services-data";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title)
        ? prev.filter((s) => s !== title)
        : [...prev, title]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company: formData.get("company"),
          services: selectedServices,
          message: formData.get("message"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
      form.reset();
      setSelectedServices([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-[#f8f7f4] to-white px-6 py-24 md:px-12 lg:px-24 lg:py-28"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,134,11,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(184,134,11,0.04),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
            Get In Touch
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#111827] md:text-5xl">
            Let&apos;s Talk Trade
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#6b7280]/70">
            Ready to optimize your global supply chain? Reach out and our trade
            advisors will respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          {/* Left Column — Office Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="space-y-8">
              <div className="rounded-2xl border border-gray-200/60 bg-white/60 p-6 backdrop-blur-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#b8860b]">
                  <MapPin size={14} />
                  India Office — Tamil Nadu
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#6b7280]/80">
                  Coimbatore · Palani · Thidugul
                </p>
              </div>

            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-gray-200/60 bg-white/60 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b8860b]/10 text-[#b8860b]">
                  <Mail size={14} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                    Email
                  </p>
                  <a
                    href="mailto:trade@ractysh.com"
                    className="text-sm text-[#6b7280] transition hover:text-[#b8860b]"
                  >
                    trade@ractysh.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b8860b]/10 text-[#b8860b]">
                  <Phone size={14} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#b8860b]">
                    Phone
                  </p>
                  <span className="text-sm text-[#6b7280]">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-200/60 bg-white/80 p-8 shadow-lg shadow-gray-200/50 backdrop-blur-sm md:p-10"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#b8860b]/10">
                    <Check className="h-8 w-8 text-[#b8860b]" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#111827]">
                    Thank You
                  </h3>
                  <p className="mt-2 text-sm text-[#6b7280]">
                    Your message has been received. Our trade team will contact
                    you within 24 hours.
                  </p>
                </div>
              ) : (
              <>
              {/* Name + Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                    Full Name <span className="text-[#b8860b]">*</span>
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="h-12 w-full border border-gray-200/80 bg-white px-4 text-sm text-[#111827] placeholder-[#6b7280]/40 outline-none transition focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                    Email Address <span className="text-[#b8860b]">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@company.com"
                    className="h-12 w-full border border-gray-200/80 bg-white px-4 text-sm text-[#111827] placeholder-[#6b7280]/40 outline-none transition focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20"
                  />
                </label>
              </div>

              {/* Phone + Company */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                    Phone <span className="text-[#b8860b]">*</span>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    className="h-12 w-full border border-gray-200/80 bg-white px-4 text-sm text-[#111827] placeholder-[#6b7280]/40 outline-none transition focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                    Company
                  </span>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your company name"
                    className="h-12 w-full border border-gray-200/80 bg-white px-4 text-sm text-[#111827] placeholder-[#6b7280]/40 outline-none transition focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20"
                  />
                </label>
              </div>

              {/* Services of Interest */}
              <div className="mt-5">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                  Services Interested In
                </span>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {services.map((service) => {
                    const isSelected = selectedServices.includes(service.title);
                    return (
                      <button
                        key={service.title}
                        type="button"
                        onClick={() => toggleService(service.title)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? "border-[#b8860b] bg-[#b8860b]/10 text-[#b8860b]"
                            : "border-gray-200/80 bg-white text-[#6b7280] hover:border-[#b8860b]/40 hover:bg-[#b8860b]/5"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all ${
                            isSelected
                              ? "border-[#b8860b] bg-[#b8860b] text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </span>
                        {service.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget Range */}
              <div className="mt-5">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                  Estimated Monthly Volume
                </span>
                <select name="volume" className="h-12 w-full border border-gray-200/80 bg-white px-4 text-sm text-[#111827] outline-none transition focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20">
                  <option value="">Select volume range...</option>
                  <option>Under 100 CBM / 5 MT</option>
                  <option>100–500 CBM / 5–20 MT</option>
                  <option>500–2,000 CBM / 20–100 MT</option>
                  <option>2,000–10,000 CBM / 100–500 MT</option>
                  <option>10,000+ CBM / 500+ MT</option>
                  <option>Not sure yet</option>
                </select>
              </div>

              {/* Message */}
              <div className="mt-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6b7280]/70">
                    Message <span className="text-[#b8860b]">*</span>
                  </span>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your shipping requirements, timelines, and destination markets..."
                    className="min-h-[110px] w-full resize-none border border-gray-200/80 bg-white px-4 py-3 text-sm text-[#111827] placeholder-[#6b7280]/40 outline-none transition focus:border-[#b8860b] focus:ring-1 focus:ring-[#b8860b]/20"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 inline-flex h-13 w-full items-center justify-center gap-3 bg-gradient-to-r from-[#b8860b] to-[#9a7209] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#b8860b]/20 transition-all duration-300 hover:from-[#c9951e] hover:to-[#a87e0d] hover:shadow-[#b8860b]/30 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>

              {error && (
                <p className="mt-4 text-center text-sm text-red-500">{error}</p>
              )}

              <p className="mt-4 text-center text-xs text-[#6b7280]/50">
                We typically respond within 24 hours on business days.
              </p>
              </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
