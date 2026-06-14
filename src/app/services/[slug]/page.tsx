"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Check,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Ship,
  Shield,
  Network,
  Briefcase,
  Plane,
  Anchor,
  Truck,
  Warehouse,
  Globe,
  Sparkles,
  BarChart3,
  Clock,
  Award,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, featuredServices } from "@/data/services";
import type { Service } from "@/data/services";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Shield,
  Ship,
  Network,
  Briefcase,
  Plane,
  Anchor,
  Truck,
  Warehouse,
  Globe,
};

const statsConfig: Record<string, { label: string; value: string; icon: React.ElementType }> = {
  "import-services": {
    label: "Shipments/Year", value: "10,000+", icon: BarChart3,
  },
  "export-services": {
    label: "Markets Served", value: "50+", icon: Globe,
  },
  "global-product-sourcing": {
    label: "Verified Suppliers", value: "2,000+", icon: Award,
  },
  "customs-clearance": {
    label: "Clearance Rate", value: "99.9%", icon: Shield,
  },
  "freight-forwarding": {
    label: "Routes Covered", value: "200+", icon: Ship,
  },
  "supply-chain-management": {
    label: "Cost Reduction", value: "25%", icon: BarChart3,
  },
  "international-procurement": {
    label: "Countries", value: "40+", icon: Globe,
  },
  "air-freight": {
    label: "Destinations", value: "180+", icon: Plane,
  },
  "sea-freight": {
    label: "Ports Served", value: "300+", icon: Anchor,
  },
  "road-transportation": {
    label: "Fleet Size", value: "500+", icon: Truck,
  },
  "warehousing": {
    label: "Sq. Ft. Storage", value: "2M+", icon: Warehouse,
  },
  "supply-chain-solutions": {
    label: "Projects Delivered", value: "1,500+", icon: Network,
  },
};

const processSteps = [
  { step: 1, title: "Consultation", desc: "We discuss your needs and goals" },
  { step: 2, title: "Planning", desc: "Custom strategy designed for you" },
  { step: 3, title: "Execution", desc: "Seamless implementation with tracking" },
  { step: 4, title: "Support", desc: "Ongoing assistance and optimization" },
];

function FadeInUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug) as Service | undefined;
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!service) {
    notFound();
  }

  const Icon = iconMap[service.icon] ?? Globe;
  const stat = statsConfig[service.slug] ?? { label: "Success Rate", value: "99%", icon: Award };
  const StatIcon = stat.icon;
  const related = featuredServices.filter((s) => s.slug !== slug).slice(0, 3);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".detail-overline", { y: 30, opacity: 0, duration: 0.7 })
        .from(".detail-title", { y: 50, opacity: 0, duration: 0.9 }, "-=0.3")
        .from(".detail-desc", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
        .from(".detail-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.2");
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
      );
    }, el);
    return () => ctx.revert();
  }, []);

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
          className="flex p-3 text-[#111827] sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed top-[72px] left-0 right-0 z-40 space-y-5 bg-white/95 px-6 pb-6 pt-2 backdrop-blur-md sm:hidden">
          {["Home", "Services", "Contact"].map((label) => (
            <Link
              key={label}
              href={label === "Services" ? "/#services" : label === "Home" ? "/" : `/${label.toLowerCase()}`}
              className="block text-sm tracking-wider text-[#111827]/60 uppercase transition-colors hover:text-[#111827]"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <section
        ref={headerRef}
        className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0a0f1a]"
      >
        <div ref={imageRef} className="absolute inset-0">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/95 via-[#0a0f1a]/80 to-[#0a0f1a]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#b8860b]/10 blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/3 h-[300px] w-[300px] rounded-full bg-[#b8860b]/5 blur-[120px]" />
        </div>

          <div className="relative z-10 mx-auto w-full max-w-[92rem] px-6 pt-32 pb-20 sm:px-10 lg:px-16 lg:pt-40 lg:pb-28">
          <div className="max-w-4xl">
            <Link
              href="/services"
              className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40 transition-all duration-300 hover:text-white/80"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Services
            </Link>
            <div className="detail-overline mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8860b]/10 ring-1 ring-[#b8860b]/20">
                <Icon className="h-5 w-5 text-[#b8860b]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
                {service.shortTitle} Services
              </span>
            </div>

            <h1 className="detail-title text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl lg:leading-[1.1]">
              {service.title}
            </h1>

            <p className="detail-desc mt-6 max-w-2xl text-base leading-8 text-slate-300/80 lg:text-lg">
              {service.tagline}
            </p>

            <div className="detail-cta mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 bg-[#b8860b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#0a0f1a] transition-all duration-300 hover:bg-[#9a7209]"
              >
                Request Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                Explore All Services
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="relative z-10 -mt-16 px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[92rem]">
          <div className="rounded-2xl bg-white shadow-lg shadow-[#b8860b]/5 border border-gray-200/60">
            <div className="grid grid-cols-2 divide-x divide-gray-200/60 lg:grid-cols-4">
              <div className="flex flex-col items-center justify-center p-6 lg:p-8">
                <StatIcon className="h-6 w-6 text-[#b8860b]" strokeWidth={1.5} />
                <span className="mt-2 text-2xl font-bold text-[#111827]">{stat.value}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">{stat.label}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 lg:p-8">
                <Clock className="h-6 w-6 text-[#b8860b]" strokeWidth={1.5} />
                <span className="mt-2 text-2xl font-bold text-[#111827]">15+</span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">Years Experience</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 lg:p-8">
                <Award className="h-6 w-6 text-[#b8860b]" strokeWidth={1.5} />
                <span className="mt-2 text-2xl font-bold text-[#111827]">98%</span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">Client Retention</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 lg:p-8">
                <BarChart3 className="h-6 w-6 text-[#b8860b]" strokeWidth={1.5} />
                <span className="mt-2 text-2xl font-bold text-[#111827]">5,000+</span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#6b7280]">Projects Done</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[92rem]">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24 items-start">
            <div>
              <FadeInUp>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Service Overview
                </span>
                <h2 className="mt-4 font-serif text-3xl font-bold text-[#111827] md:text-4xl lg:text-5xl leading-tight">
                  {service.tagline}
                </h2>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <p className="mt-6 text-base leading-8 text-[#6b7280]/80">
                  {service.description}
                </p>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 rounded-lg bg-[#b8860b]/5 px-4 py-2.5">
                    <Check className="h-4 w-4 text-[#b8860b]" />
                    <span className="text-sm font-medium text-[#111827]">End-to-end solution</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[#b8860b]/5 px-4 py-2.5">
                    <Check className="h-4 w-4 text-[#b8860b]" />
                    <span className="text-sm font-medium text-[#111827]">Global expertise</span>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <Link
                  href="/#contact"
                  className="mt-10 group inline-flex items-center gap-3 bg-[#b8860b] px-8 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111827] transition-all duration-300 hover:bg-[#9a7209]"
                >
                  Request Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </FadeInUp>
            </div>

            <div>
              <FadeInUp delay={0.1}>
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Key Benefits
                </span>
              </FadeInUp>
              <div className="mt-6 space-y-4">
                {service.benefits.map((benefit, i) => (
                  <FadeInUp key={benefit} delay={0.1 * i + 0.15}>
                    <div className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white p-5 transition-all duration-300 hover:border-[#b8860b]/30 hover:shadow-lg hover:shadow-[#b8860b]/5">
                      <div className="pointer-events-none absolute inset-0 translate-x-[-100%] skew-x-12 bg-gradient-to-r from-transparent via-[#b8860b]/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                      <div className="relative z-10 flex items-start gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#b8860b]/10 transition-all duration-300 group-hover:bg-[#b8860b]/20 group-hover:ring-1 group-hover:ring-[#b8860b]/30">
                          <Check className="h-4 w-4 text-[#b8860b]" />
                        </div>
                        <div className="flex-1">
                          <span className="text-sm leading-relaxed text-[#6b7280] transition-colors duration-300 group-hover:text-[#111827]">
                            {benefit}
                          </span>
                        </div>
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#b8860b] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </FadeInUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0a0f1a] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#b8860b]/5 blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#b8860b]/5 blur-[100px]" />
        </div>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(184,134,11,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[92rem]">
          <FadeInUp className="text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
              <Sparkles className="h-3.5 w-3.5" />
              How It Works
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Our Process
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300/60">
              A streamlined approach to delivering exceptional results for your business.
            </p>
          </FadeInUp>

          <div className="relative mt-16">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#b8860b]/40 via-[#b8860b]/20 to-transparent hidden md:block" />
            <div className="grid gap-8 md:grid-cols-4 md:gap-0">
              {processSteps.map((step, i) => (
                <FadeInUp key={step.step} delay={i * 0.15}>
                  <div className="relative flex flex-col items-center text-center md:px-6">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#b8860b]/10 ring-1 ring-[#b8860b]/20">
                      <span className="text-2xl font-bold text-[#b8860b]">{step.step}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-[92rem]">
            <FadeInUp className="text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]">
                <Sparkles className="h-3.5 w-3.5" />
                Explore More
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-[#111827] md:text-4xl lg:text-5xl">
                Related Services
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-[#6b7280]/80">
                Discover our other comprehensive trade solutions designed to support your business.
              </p>
            </FadeInUp>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s, i) => {
                const RelIcon = iconMap[s.icon] ?? Globe;
                return (
                  <FadeInUp key={s.slug} delay={i * 0.1}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group relative block overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-8 transition-all duration-300 hover:border-[#b8860b]/30 hover:shadow-xl hover:shadow-[#b8860b]/5 hover:-translate-y-1"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b8860b]/10 transition-all duration-300 group-hover:bg-[#b8860b]/20">
                        <RelIcon className="h-5 w-5 text-[#b8860b]" strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-[#111827] transition-colors duration-300 group-hover:text-[#b8860b]">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                        {s.shortDescription}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#b8860b] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5">
                        Learn More
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </Link>
                  </FadeInUp>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden bg-[#0a0f1a] px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-[#b8860b]/10 blur-[180px]" />
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#b8860b]/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[92rem]">
          <div className="mx-auto max-w-2xl text-center">
            <FadeInUp>
              <h2 className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl leading-tight">
                Ready to Transform Your{" "}
                <span className="text-[#b8860b]">{service.shortTitle}</span> Operations?
              </h2>
              <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-slate-300/60">
                Our trade experts are ready to help you with {service.title.toLowerCase()}.
                Get in touch for a personalized consultation tailored to your business.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="group inline-flex items-center gap-3 bg-[#b8860b] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#0a0f1a] transition-all duration-300 hover:bg-[#9a7209] hover:shadow-lg hover:shadow-[#b8860b]/25"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-3 border border-white/20 px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white/80 transition-all duration-300 hover:border-white/40 hover:text-white"
                >
                  All Services
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </main>
  );
}
