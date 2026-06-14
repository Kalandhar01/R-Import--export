"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const num = String(index + 1).padStart(2, "0");

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      boxShadow: "0 20px 60px -12px rgba(184,134,11,0.3)",
      duration: 0.4,
      ease: "power2.out",
    });
    const img = cardRef.current.querySelector(".card-img");
    if (img) {
      gsap.to(img, {
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    const line = cardRef.current.querySelector(".card-line");
    if (line) {
      gsap.to(line, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
      duration: 0.4,
      ease: "power2.out",
    });
    const img = cardRef.current.querySelector(".card-img");
    if (img) {
      gsap.to(img, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    const line = cardRef.current.querySelector(".card-line");
    if (line) {
      gsap.to(line, {
        scaleX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <div ref={cardRef} className="opacity-0">
      <Link
        href={`/services/${service.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-sm transition-colors"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="card-img object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b] text-xs font-bold text-white">
            {num}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-[#111827] transition-colors group-hover:text-[#b8860b]">
            {service.title}
          </h3>

          <div className="card-line mt-3 h-0.5 w-10 origin-left scale-x-0 bg-[#b8860b]" />

          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            {service.shortDescription}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#b8860b] opacity-80 transition-all duration-300 group-hover:opacity-100">
            Explore Service
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function ServicesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white/95 px-6 py-4 backdrop-blur-md sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Ractysh Global Trade"
            width={140}
            height={40}
            className="h-9 w-auto object-contain"
            priority
          />
          <span className="hidden text-base font-bold tracking-tight text-[#111827] sm:inline">
            Ractysh <span className="text-[#b8860b]">Global Trade</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#111827]/70 sm:flex">
          <Link href="/" className="transition hover:text-[#111827]">Home</Link>
          <Link href="/services" className="text-[#111827]">Services</Link>
          <Link href="/#contact" className="transition hover:text-[#111827]">Contact</Link>
        </div>
        <button
          className="p-3 text-[#111827] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "fixed left-0 right-0 top-20 z-40 md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "mx-4 overflow-hidden rounded-lg border border-gray-200/60 bg-white/98 backdrop-blur-xl transition-all duration-300 ease-in-out",
            mobileOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2",
          )}
        >
          <div className="space-y-1 px-5 pb-5 pt-4">
            {[{ label: "Home", href: "/" }, { label: "Services", href: "/#services" }, { label: "Contact", href: "/#contact" }].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group block rounded-md px-4 py-3 text-sm tracking-wider text-[#6b7280] uppercase transition-all hover:bg-gray-100 hover:text-[#111827]"
                onClick={() => setMobileOpen(false)}
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  <span className="h-px w-0 bg-[#b8860b]/50 transition-all duration-300 group-hover:w-8" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-white px-6 pt-32 pb-20 text-[#111827] sm:px-10 lg:px-16 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(184,134,11,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(184,134,11,0.04),transparent_50%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[92rem]">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280] transition-all duration-300 hover:text-[#111827]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Services
          </Link>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
            Our Services
          </p>
          <h1 className="max-w-4xl text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Comprehensive Global{" "}
            <span className="font-semibold text-[#b8860b]">Trade Services</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#6b7280]/60">
            From import and export to freight forwarding and supply chain
            management, we deliver end-to-end solutions for businesses trading
            across international markets.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-10 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-[92rem]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6b7280] transition-all duration-300 hover:text-[#111827]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Services
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
