"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight, ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";
import WhatWeExport from "@/components/WhatWeExport";
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
      boxShadow: "0 20px 60px -12px rgba(0,0,0,0.15)",
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
  };

  return (
    <div ref={cardRef} className="opacity-0">
      <Link
        href={`/services/${service.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative block overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-md shadow-black/5 transition-colors"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="card-img object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg font-bold text-white">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-[#6b7280]">
            {service.shortDescription}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#111827] transition-all duration-300 group-hover:gap-3">
            Learn More
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
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
          <div className="relative h-10 w-10 overflow-hidden">
            <Image
              src="/logo.png"
              alt="RACTYSH EXIM PVT LTD"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight tracking-tight text-[#111827] sm:text-base">
              RACTYSH
            </span>
            <span className="text-[9px] font-medium tracking-[0.15em] text-[#6b7280] sm:text-[10px]">
              EXIM PVT LTD
            </span>
          </div>
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
            {[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: "Contact", href: "/#contact" }].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group block rounded-md px-4 py-3 text-sm tracking-wider text-[#6b7280] uppercase transition-all hover:bg-gray-100 hover:text-[#111827]"
                onClick={() => setMobileOpen(false)}
              >
                <span className="flex items-center justify-between">
                  {link.label}
                  <span className="h-px w-0 bg-[#111827]/50 transition-all duration-300 group-hover:w-8" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#050B1A] px-6 pt-32 pb-20 sm:px-10 lg:px-16 lg:pt-40 lg:pb-28">
        <Link
          href="/#services"
          className="absolute left-6 top-24 z-10 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/50 transition hover:text-white sm:left-10 sm:top-28 lg:left-16"
        >
          <ArrowLeft size={14} />
          Back to Services
        </Link>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-white/5 blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-white/5 blur-[120px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-[92rem]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            Our Services
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Comprehensive Global Trade Services
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/50">
            From import and export to freight forwarding and supply chain
            management, we deliver end-to-end solutions for businesses trading
            across international markets.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <WhatWeExport />
      <div className="border-t border-gray-100 px-6 py-6 sm:px-10 lg:px-16">
        <Link
          href="/#services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 transition hover:text-gray-900"
        >
          <ArrowLeft size={14} />
          Back to Services
        </Link>
      </div>
      <Footer />
    </main>
  );
}
