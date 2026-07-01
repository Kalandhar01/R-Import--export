"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Globe,
  ExternalLink,
  X,
  Mail,
  ArrowRight,
  MapPin,
  Phone,
  Copyright,
  ChevronUp,
  Check,
  Loader2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quickLinks = ["Home", "Services", "About", "Contact", "RACTYSH Group"];
const services = [
  "Import",
  "Export",
  "Sourcing",
  "Customs",
  "Freight",
  "Supply Chain",
];
const footerLinks = [
  { title: "Quick Links", items: quickLinks },
  { title: "Services", items: services },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: ExternalLink, href: "#", label: "LinkedIn" },
  { icon: X, href: "#", label: "X (Twitter)" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const revealRefs = useRef<HTMLDivElement[]>([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || status === "loading") return;

      setStatus("loading");
      setMessage("");

      try {
        const res = await fetch("/api/newsletter/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setStatus("success");
          setMessage(data.message || "Welcome! Check your inbox.");
          setEmail("");
        } else {
          setStatus("error");
          setMessage(data.message || "Subscription failed.");
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }

      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    },
    [email, status],
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setLinkRef = (el: HTMLAnchorElement | null, idx: number) => {
    if (el) linksRef.current[idx] = el;
  };

  const setRevealRef = (el: HTMLDivElement | null, idx: number) => {
    if (el) revealRefs.current[idx] = el;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px, 80px 80px",
          }}
        />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 md:px-12 lg:px-20 sm:pb-8 sm:pt-20">
        {/* Top Row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-12 md:gap-12">
          {/* Brand Column */}
          <div ref={(el) => setRevealRef(el, 0)} className="col-span-2 md:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden sm:h-14 sm:w-14">
                <Image
                  src="/logo.png"
                  alt="RACTYSH EXIM PVT LTD"
                  fill
                  sizes="56px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold leading-tight tracking-tight text-white sm:text-lg">
                  RACTYSH
                </span>
                <span className="text-[10px] font-medium tracking-[0.15em] text-white sm:text-[11px]">
                  EXIM PVT LTD
                </span>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 sm:mt-4">
              Premium import, export, and logistics solutions connecting
              businesses across continents with speed, reliability, and
              trust.
            </p>
            <div className="mt-4 flex gap-3 sm:mt-6">
              {socialLinks.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, colIdx) => (
            <div
              key={column.title}
              ref={(el) => setRevealRef(el, colIdx + 1)}
              className="lg:col-span-2"
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white sm:mb-5">
                {column.title}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {column.items.map((item, i) => (
                  <li key={item}>
                    <a
                      ref={(el) => setLinkRef(el, colIdx * 10 + i)}
                      href={item === "RACTYSH Group" ? "https://www.ractysh.com/" : "#"}
                      className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal Column */}
          <div
            ref={(el) => setRevealRef(el, 3)}
            className="lg:col-span-2"
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white sm:mb-5">
              Legal
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div
            ref={(el) => setRevealRef(el, 4)}
            className="col-span-2 md:col-span-2 lg:col-span-2"
          >
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white sm:mb-5">
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail size={14} className="mt-0.5 shrink-0 text-white" />
                <span className="transition-colors hover:text-white">ractyshexim@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Phone size={14} className="mt-0.5 shrink-0 text-white" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={14} className="mt-0.5 shrink-0 text-white" />
                <span>
                  Coimbatore · Palani · Dindigul,
                  <br />
                  Tamil Nadu, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div ref={(el) => setRevealRef(el, 5)} className="relative mt-12 overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 md:p-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />
          </div>
          <div className="relative flex flex-col items-center gap-4 md:flex-row md:justify-between sm:gap-6">
            <div className="text-center md:text-left">
              <h5 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                Stay Connected
              </h5>
              <p className="mt-1 text-sm text-slate-400 sm:mt-2">
                Get trade insights, market updates, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-md flex-col gap-2 sm:flex-row sm:gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={status === "loading" || status === "success"}
                  className="h-11 w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 pr-10 text-sm text-white placeholder-slate-500 outline-none transition-all duration-300 focus:border-white focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12"
                />
                {status === "success" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
                    <Check size={16} strokeWidth={3} />
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#050B1A] shadow-lg shadow-white/10 transition-all duration-300 hover:bg-[#e5e5e5] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:px-6"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
          {message && (
            <p
              className={`relative mt-3 text-center text-xs md:text-left sm:mt-4 ${
                status === "success" ? "text-emerald-400" : "text-white/70"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-6 sm:mt-16 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 md:justify-start">
              <div className="flex items-center gap-1">
                <Copyright size={12} />
                <span>&copy; 2025 <Link href="https://www.ractysh.com/" className="text-slate-400 transition-colors hover:text-white">RACTYSH GROUP</Link>. All Rights Reserved.</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Globe size={12} />
                <span className="hidden sm:inline">ISO 9001:2024 &bull; ISO 28000 &bull; AEO Certified</span>
                <span className="sm:hidden">ISO Certified</span>
              </div>
              <button
                onClick={scrollToTop}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
                aria-label="Scroll to top"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
