"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 100, suffix: "+", label: "Global Partners" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Successful Shipments" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function CountUp({
  target,
  suffix,
  shouldAnimate,
}: {
  target: number;
  suffix: string;
  shouldAnimate: boolean;
}) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => {
    const rounded = Math.round(v);
    return `${rounded.toLocaleString()}${suffix}`;
  });

  useEffect(() => {
    if (shouldAnimate) {
      const controls = animate(count, target, {
        duration: 2,
        ease: "easeOut",
      });
      return () => controls.stop();
    }
  }, [shouldAnimate, count, target]);

  return <motion.span className="tabular-nums">{display}</motion.span>;
}

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".who-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8f7f4] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="who-reveal relative opacity-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Global trade team"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="inline-flex items-center gap-3 rounded-full bg-[#b8860b]/90 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#111827] backdrop-blur-sm">
                  Established 2010
                </div>
              </div>
            </div>

            <div className="absolute -right-4 -bottom-4 hidden rounded-2xl bg-[#f8f7f4] border border-gray-200/60 p-6 shadow-xl shadow-black/30 lg:block">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]/60">
                Trade Volume
              </p>
              <p className="mt-1 text-2xl font-bold text-[#111827]">
                $2.4B+
              </p>
              <p className="text-xs text-[#6b7280]/60">Annual throughput</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="who-reveal opacity-0">
              <h2 className="font-serif text-5xl leading-tight text-[#111827] md:text-7xl lg:text-8xl">
                Who We Are
              </h2>
              <div className="mt-6 h-1 w-20 bg-accent" />
            </div>
            <p className="who-reveal text-lg leading-relaxed text-[#6b7280] opacity-0">
              With decades of collective experience across global markets, we
              stand as a trusted partner in international trade. Our expertise
              spans every facet of import and export operations, from sourcing
              to final delivery.
            </p>
            <p className="who-reveal text-lg leading-relaxed text-[#6b7280] opacity-0">
              We have cultivated enduring partnerships with manufacturers,
              suppliers, and logistics providers across more than 50 countries.
              This network enables us to navigate complex supply chains with
              precision and reliability.
            </p>
            <p className="who-reveal text-lg leading-relaxed text-[#6b7280] opacity-0">
              Compliance is the cornerstone of our operations. Our dedicated
              team stays ahead of evolving international regulations, ensuring
              every shipment meets the highest standards of legality, safety,
              and efficiency.
            </p>
            <p className="who-reveal text-lg leading-relaxed text-[#6b7280] opacity-0">
              Above all, we are client-first. Every strategy we craft, every
              route we plan, and every partnership we forge is driven by a
              single mission: delivering exceptional value and peace of mind to
              the businesses we serve.
            </p>
            <div className="who-reveal pt-2 opacity-0">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2.5 bg-accent px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#111827] transition-all duration-300 hover:bg-[#9a7209]"
              >
                Explore Our Services
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="who-reveal mt-20 grid grid-cols-2 gap-8 opacity-0 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-[#111827] md:text-5xl">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  shouldAnimate={isInView}
                />
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.15em] text-[#6b7280]/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
