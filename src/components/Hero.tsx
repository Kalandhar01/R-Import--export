"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import FlaticonIcon from "@/components/ui/FlaticonIcon";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

const HUB_POSITIONS = [
  { name: "Singapore", x: 395, y: 196 },
  { name: "Dubai", x: 335, y: 148 },
  { name: "Mumbai", x: 360, y: 172 },
  { name: "Rotterdam", x: 260, y: 90 },
  { name: "Hamburg", x: 268, y: 82 },
  { name: "Los Angeles", x: 65, y: 118 },
  { name: "Shanghai", x: 425, y: 128 },
  { name: "Sydney", x: 448, y: 268 },
];

const routes = [
  { from: 0, to: 2 },
  { from: 0, to: 6 },
  { from: 1, to: 3 },
  { from: 2, to: 1 },
  { from: 4, to: 3 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 1, to: 5 },
];

const stats: { value: number; suffix: string; label: string; static?: boolean }[] = [
  { value: 100, suffix: "+", label: "Global Partners" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Shipments" },
  { value: 2025, suffix: "", label: "Established", static: true },
];

function AnimatedGlobe() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const el = svgRef.current;
    const dots = el.querySelectorAll(".hub-dot");

    gsap.to(el, {
      rotation: 360,
      duration: 80,
      repeat: -1,
      ease: "none",
    });

    dots.forEach((d) => {
      gsap.to(d, {
        r: "+=2",
        opacity: 0.3,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      className="h-[280px] w-[280px] max-w-full sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]"
      fill="none"
    >
      <defs>
        <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#B8860B" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#B8860B" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
        </radialGradient>
        <filter id="hubGlow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="250" cy="250" r="210" fill="url(#glowG)" />

      {/* Latitude lines */}
      {[60, 100, 140, 180, 220, 250, 280, 320, 360, 400, 440].map((r) => (
        <circle key={r} cx="250" cy="250" r={r} stroke="#B8860B" strokeWidth="0.3" opacity={0.08 + (r > 200 ? 0.04 : 0)} />
      ))}
      {/* Longitude lines */}
      {[0, 30, 60, 90, 120, 150, 180].map((angle) => (
        <line
          key={angle}
          x1={250 + 210 * Math.cos((angle * Math.PI) / 180)}
          y1={250 + 210 * Math.sin((angle * Math.PI) / 180)}
          x2={250 + 210 * Math.cos(((angle + 180) * Math.PI) / 180)}
          y2={250 + 210 * Math.sin(((angle + 180) * Math.PI) / 180)}
          stroke="#B8860B"
          strokeWidth="0.25"
          opacity={0.06}
        />
      ))}

      {/* Equator */}
      <ellipse cx="250" cy="250" rx="210" ry="50" stroke="#B8860B" strokeWidth="0.4" opacity={0.15} />

      {/* Outer ring */}
      <circle cx="250" cy="250" r="210" stroke="#B8860B" strokeWidth="0.8" opacity={0.2} />

      {/* Route arcs */}
      {routes.map((r, i) => {
        const f = HUB_POSITIONS[r.from];
        const t = HUB_POSITIONS[r.to];
        const mx = (f.x + t.x) / 2;
        const my = (f.y + t.y) / 2 - 20;
        return (
          <path
            key={i}
            d={`M${f.x},${f.y} Q${mx},${my} ${t.x},${t.y}`}
            stroke="#B8860B"
            strokeWidth="0.6"
            strokeDasharray="3 4"
            opacity={0.2}
            fill="none"
          />
        );
      })}

      {/* Hub dots */}
      {HUB_POSITIONS.map((h, i) => (
        <g key={i}>
          <circle cx={h.x} cy={h.y} r={4} fill="#B8860B" opacity={0.5} filter="url(#hubGlow)" />
          <circle cx={h.x} cy={h.y} r={7} fill="none" stroke="#B8860B" strokeWidth="0.4" opacity={0.2} className="hub-dot" />
        </g>
      ))}
    </svg>
  );
}

function DetailedContainerShip({ className }: { className?: string }) {
  return <FlaticonIcon icon="fi-rr-ship-side" className={`text-amber-500/60 text-5xl ${className || ""}`} />;
}

function DetailedCargoPlane({ className }: { className?: string }) {
  return <FlaticonIcon icon="fi-rr-plane-prop" className={`text-amber-500/50 text-4xl ${className || ""}`} />;
}

function DetailedTruck({ className }: { className?: string }) {
  return <FlaticonIcon icon="fi-sr-truck-container" className={`text-amber-500/50 text-3xl ${className || ""}`} />;
}

function DetailedTrain({ className }: { className?: string }) {
  return <FlaticonIcon icon="fi-rr-train-side" className={`text-amber-500/50 text-4xl ${className || ""}`} />;
}

function LogisticsScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;
    const ctx = gsap.context(() => {
      // Ships moving right
      gsap.to(".vessel-1", { x: "+=1400", duration: 28, repeat: -1, ease: "none" });
      gsap.to(".vessel-2", { x: "+=1400", duration: 35, repeat: -1, ease: "none", delay: -12 });
      gsap.to(".vessel-3", { x: "+=1400", duration: 32, repeat: -1, ease: "none", delay: -22 });
      // Planes moving right
      gsap.to(".air-1", { x: "+=1400", duration: 18, repeat: -1, ease: "none", delay: -5 });
      gsap.to(".air-2", { x: "+=1400", duration: 22, repeat: -1, ease: "none", delay: -14 });
      // Trucks moving right (slower)
      gsap.to(".hauler-1", { x: "+=1000", duration: 16, repeat: -1, ease: "none" });
      gsap.to(".hauler-2", { x: "+=1000", duration: 14, repeat: -1, ease: "none", delay: -8 });
      // Train moving right
      gsap.to(".rail-1", { x: "+=1200", duration: 20, repeat: -1, ease: "none", delay: -3 });
      // Gentle bob for ships
      gsap.to(".vessel-1, .vessel-2, .vessel-3", {
        y: "+=3",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sceneRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sceneRef} className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 overflow-hidden">
      {/* Horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-y-[2px]" />

      {/* Sea lane */}
      <div className="absolute bottom-2 left-0 right-0 h-6 bg-gradient-to-r from-transparent via-amber-500/[0.02] to-transparent" />

      {/* Ships (bottom lane) */}
      <div className="absolute bottom-1 left-[-140px] vessel-1">
        <DetailedContainerShip className="h-auto w-[110px]" />
      </div>
      <div className="absolute bottom-3 left-[-140px] vessel-2">
        <DetailedContainerShip className="h-auto w-[90px] opacity-60" />
      </div>
      <div className="absolute bottom-0 left-[-140px] vessel-3">
        <DetailedContainerShip className="h-auto w-[100px] opacity-70" />
      </div>

      {/* Air lane */}
      {/* Planes (upper lane) */}
      <div className="absolute bottom-28 left-[-120px] air-1">
        <DetailedCargoPlane className="h-auto w-[90px]" />
      </div>
      <div className="absolute bottom-36 left-[-120px] air-2">
        <DetailedCargoPlane className="h-auto w-[75px] opacity-50" />
      </div>

      {/* Road lane */}
      <div className="absolute bottom-10 left-[-90px] hauler-1">
        <DetailedTruck className="h-auto w-[65px]" />
      </div>
      <div className="absolute bottom-12 left-[-90px] hauler-2">
        <DetailedTruck className="h-auto w-[55px] opacity-50" />
      </div>

      {/* Rail lane */}
      <div className="absolute bottom-20 left-[-120px] rail-1">
        <DetailedTrain className="h-auto w-[90px] opacity-60" />
      </div>

      {/* Lane markers */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-around">
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500/8 to-transparent" />
        <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-500/6 to-transparent" />
        <div className="h-px w-28 bg-gradient-to-r from-transparent via-amber-500/8 to-transparent" />
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-500/6 to-transparent" />
      </div>
    </div>
  );
}

function CountUp({ target, suffix, label, static: isStatic }: { target: number; suffix: string; label: string; static?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (isStatic) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          if (counted.current) return;
          counted.current = true;
          gsap.fromTo(
            { val: 0 },
            { val: 0 },
            {
              val: target,
              duration: 2.5,
              ease: "power2.out",
              onUpdate: function () {
                const v = Math.round(this.targets()[0].val);
                el!.textContent = `${v.toLocaleString()}${suffix}`;
              },
            },
          );
        },
      });
    }, el);
    return () => ctx.revert();
  }, [target, suffix, isStatic]);

  return (
    <div className="text-center">
      <div ref={ref} className="text-3xl font-bold text-white md:text-4xl font-[family-name:var(--font-playfair)]">
        {isStatic ? target : `0${suffix}`}
      </div>
      <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/35 sm:text-[11px]">{label}</div>
    </div>
  );
}

export default function Hero() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const mobileStatsRef = useRef<HTMLDivElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 60);
      setHidden(sy > 120 && sy > lastScrollY.current);
      lastScrollY.current = sy;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });
      tl.from(".hero-overline", { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" })
        .from(".hero-heading .word", {
          y: 80,
          opacity: 0,
          rotateX: -90,
          stagger: 0.06,
          duration: 1,
          ease: "power3.out",
        }, "-=0.3")
        .from(".hero-subhead", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .from(".hero-cta > *", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.3")
        .from(".hero-stats > *", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.2")
        .from(".hero-stats-mobile > *", { y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "-=0.2");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!mobileStatsRef.current || counted) return;
    const el = mobileStatsRef.current;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        onEnter: () => {
          setCounted(true);
          el.querySelectorAll(".stat-value").forEach((target) => {
            const t = target as HTMLElement;
            const val = parseInt(t.dataset.target || "0", 10);
            const suffix = t.dataset.suffix || "";
            gsap.fromTo(
              { val: 0 },
              { val: 0 },
              {
                val,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  t.textContent = `${Math.round(this.targets()[0].val).toLocaleString()}${suffix}`;
                },
              },
            );
          });
        },
      });
    }, el);
    return () => ctx.revert();
  }, [counted]);

  const heading = "Global Trade. Without Boundaries.";

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-[#0a0e17] md:h-screen"
    >
      {/* Background effects - reduced by 30% on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0a0e17]/98 to-[#070b12]" />
      <div className="pointer-events-none absolute inset-0 md:opacity-100 opacity-[0.7]"
        style={{
          background: "radial-gradient(ellipse at 50% 35%, rgba(184,134,11,0.07) 0%, transparent 55%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 md:opacity-[0.02] opacity-[0.014]"
        style={{
          backgroundImage: "linear-gradient(rgba(184,134,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,134,11,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="hidden md:block">
        <LogisticsScene />
      </div>

      {/* Nav */}
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          hidden ? "-translate-y-full" : "translate-y-0",
          scrolled
            ? "bg-[#0a0e17]/90 shadow-lg shadow-black/20 backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Ractysh Global Trade"
                width={140}
                height={40}
                className="h-9 w-auto object-contain"
                priority
              />
              <span className="hidden text-base font-bold tracking-tight text-white sm:inline">
                Ractysh <span className="text-[#b8860b]">Global Trade</span>
              </span>
            </Link>
            <div className="hidden items-center gap-10 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group relative text-xs tracking-[0.15em] text-white/60 uppercase transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="/#contact"
                className="rounded-sm bg-amber-500 px-5 py-2.5 text-xs font-bold tracking-[0.15em] text-slate-900 uppercase transition-all duration-300 hover:bg-amber-400 shadow-lg shadow-amber-500/20"
              >
                Get a Quote
              </Link>
            </div>
            <button
              className="p-3 text-white md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div
          className={cn(
            "fixed left-0 right-0 top-20 z-40 md:hidden",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          <div
            className={cn(
              "mx-4 overflow-hidden rounded-lg border border-white/10 bg-[#0a0e17]/98 backdrop-blur-xl transition-all duration-300 ease-in-out",
              mobileOpen ? "max-h-[400px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2",
            )}
          >
            <div className="space-y-1 px-5 pb-5 pt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="group block rounded-md px-4 py-3 text-sm tracking-wider text-white/60 uppercase transition-all hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex items-center justify-between">
                    {link.label}
                    <span className="h-px w-0 bg-amber-400/50 transition-all duration-300 group-hover:w-8" />
                  </span>
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/#contact"
                  className="block rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3.5 text-center text-xs font-bold tracking-[0.15em] text-slate-900 uppercase shadow-lg shadow-amber-500/10 transition-all hover:from-amber-400 hover:to-amber-500"
                  onClick={() => setMobileOpen(false)}
                >
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile content */}
      <div className="flex flex-col px-6 pb-10 pt-28 md:hidden">
        <div className="hero-overline mb-4">
          <span className="font-mono inline-flex items-center gap-2 text-[10px] tracking-[0.25em] text-amber-400/70 uppercase">
            <span className="h-px w-6 bg-amber-500/40" />
            Premier Global Trade Partner
          </span>
        </div>

        <h1 className="hero-heading font-[family-name:var(--font-playfair)] font-bold text-white"
          style={{ fontSize: "clamp(2.5rem, 10vw, 4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "90%" }}
        >
          {heading.split(" ").map((word, i) => (
            <span key={i} className="mr-[0.15em] inline-block overflow-hidden align-bottom">
              <span className="word inline-block will-change-transform">{word}</span>
            </span>
          ))}
        </h1>

        <p className="hero-subhead mt-4 text-base leading-[1.8] text-white/45" style={{ maxWidth: "95%" }}>
          Import, export, sourcing, logistics and supply chain solutions
          connecting businesses across international markets.
        </p>

        <div className="hero-cta mt-6 flex flex-col gap-3">
          <Link
            href="/#contact"
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 px-8 text-sm font-bold tracking-[0.15em] text-slate-900 uppercase transition-all duration-300 hover:from-amber-400 hover:to-amber-500"
          >
            Start Trading
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services"
            className="flex h-14 w-full items-center justify-center gap-2.5 rounded-sm border border-white/15 px-8 text-sm font-bold tracking-[0.15em] text-white/70 uppercase transition-all duration-300 hover:border-white/30 hover:text-white"
          >
            Explore Services
          </Link>
        </div>

        <div ref={mobileStatsRef} className="hero-stats-mobile mt-6 grid grid-cols-2 gap-2.5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-center backdrop-blur-sm">
              <div className="stat-value text-lg font-bold text-white font-[family-name:var(--font-playfair)]" data-target={stat.value} data-suffix={stat.suffix}>
                {stat.static ? stat.value : `0${stat.suffix}`}
              </div>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.15em] text-white/40 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <div className="relative">
            <AnimatedGlobe />
            <div className="pointer-events-none absolute -inset-10 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(184,134,11,0.15) 0%, transparent 60%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Desktop content */}
      <div className="absolute inset-0 z-10 hidden items-center md:flex">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="hero-overline mb-5">
                <span className="font-mono inline-flex items-center gap-3 text-xs tracking-[0.3em] text-amber-400/80 uppercase md:text-sm">
                  <span className="h-px w-10 bg-amber-500/50" />
                  Premier Global Trade Partner
                </span>
              </div>

              <h1 className="hero-heading font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[1.08] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {heading.split(" ").map((word, i) => (
                  <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
                    <span className="word inline-block will-change-transform">{word}</span>
                  </span>
                ))}
              </h1>

              <p className="hero-subhead mt-5 max-w-xl text-base leading-relaxed text-white/45 sm:text-lg md:mt-6 md:text-xl">
                Import, export, sourcing, logistics and supply chain solutions
                connecting businesses across international markets.
              </p>

              <div className="hero-cta mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5 md:mt-10">
                <Link
                  href="/#contact"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-sm bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold tracking-[0.15em] text-slate-900 uppercase transition-all duration-300 hover:from-amber-400 hover:to-amber-500 hover:shadow-xl hover:shadow-amber-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Start Trading
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link
                  href="/services"
                  className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-sm border border-white/15 px-8 py-4 text-sm font-bold tracking-[0.15em] text-white/70 uppercase transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  <span className="absolute inset-0 translate-y-full bg-white/5 transition-transform duration-300 group-hover:translate-y-0" />
                  <span className="relative z-10">Explore Services</span>
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative">
                <AnimatedGlobe />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-transparent to-transparent" />
                <div
                  className="absolute -inset-20 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(184,134,11,0.05) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block">
        <div className="border-t border-white/5 bg-gradient-to-b from-transparent to-[#070b12]/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-6 lg:px-12">
            <div className="hero-stats grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {stats.map((stat) => (
                <CountUp key={stat.label} target={stat.value} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
