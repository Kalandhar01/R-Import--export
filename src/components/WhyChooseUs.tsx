"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Handshake,
  Shield,
  Zap,
  Eye,
  Headphones,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Global Reach",
    description:
      "Extensive network spanning 50+ countries with deep local market knowledge and on-ground support across every major trade region.",
    icon: Globe,
    metric: "50+",
    metricLabel: "Countries",
    gradient: "from-[#1a2235] to-[#0f172a]",
    accent: "#b8860b",
    statBg: "bg-[#b8860b]/10",
    statText: "text-[#b8860b]",
  },
  {
    title: "Strategic Partnerships",
    description:
      "Long-standing relationships with trusted manufacturers, carriers, and customs brokers that translate into preferential terms.",
    icon: Handshake,
    metric: "100+",
    metricLabel: "Partners",
    gradient: "from-[#1a1f2e] to-[#0f172a]",
    accent: "#b8860b",
    statBg: "bg-[#b8860b]/10",
    statText: "text-[#b8860b]",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Dedicated compliance team ensures every shipment meets international trade laws, safety standards, and documentation requirements.",
    icon: Shield,
    metric: "99.9%",
    metricLabel: "Compliance Rate",
    gradient: "from-[#1a2235] to-[#0f172a]",
    accent: "#b8860b",
    statBg: "bg-[#b8860b]/10",
    statText: "text-[#b8860b]",
  },
  {
    title: "Fast Logistics",
    description:
      "Optimized routing and real-time tracking mean faster transit times, fewer delays, and complete visibility from origin to destination.",
    icon: Zap,
    metric: "40%",
    metricLabel: "Faster Transit",
    gradient: "from-[#1a1f2e] to-[#0f172a]",
    accent: "#b8860b",
    statBg: "bg-[#b8860b]/10",
    statText: "text-[#b8860b]",
  },
  {
    title: "Transparent Operations",
    description:
      "Real-time dashboards, detailed reporting, and open communication channels keep you informed at every stage of the journey.",
    icon: Eye,
    metric: "24/7",
    metricLabel: "Visibility",
    gradient: "from-[#1a2235] to-[#0f172a]",
    accent: "#b8860b",
    statBg: "bg-[#b8860b]/10",
    statText: "text-[#b8860b]",
  },
  {
    title: "Dedicated Support",
    description:
      "Personal account managers available around the clock. Your success is our priority, and we are always just a call away.",
    icon: Headphones,
    metric: "24/7",
    metricLabel: "Support",
    gradient: "from-[#1a1f2e] to-[#0f172a]",
    accent: "#b8860b",
    statBg: "bg-[#b8860b]/10",
    statText: "text-[#b8860b]",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(numeric)) {
      el.textContent = value;
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 90%",
        once: true,
        onEnter: () => {
          hasAnimated.current = true;
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: numeric,
              duration: 2,
              ease: "power3.out",
              snap: { textContent: 1 },
              onUpdate: () => {
                const formatted = numeric % 1 === 0
                  ? Math.round(Number(el.textContent)).toString()
                  : Number(el.textContent).toFixed(1);
                el.textContent = formatted + suffix;
              },
            },
          );
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, suffix]);

  return <span ref={ref}>{value}</span>;
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = feature.icon;
  const num = String(index + 1).padStart(2, "0");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mouse-x", `${x}%`);
    el.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -8,
      boxShadow: "0 30px 60px -12px rgba(184,134,11,0.3)",
      borderColor: "#b8860b",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
      borderColor: "rgba(255,255,255,0.06)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${feature.gradient} p-8 shadow-lg transition-colors`}
      >
        <span
          className="pointer-events-none absolute -top-4 -right-4 select-none text-[8rem] font-bold leading-none opacity-[0.04]"
          style={{ color: feature.accent }}
        >
          {num}
        </span>

        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(184,134,11,0.08), transparent 40%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 translate-x-[-100%] skew-x-12 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
        </div>

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#b8860b]/10 ring-1 ring-[#b8860b]/20 group-hover:bg-[#b8860b]/20 transition-all duration-300">
              <Icon className="h-5 w-5 text-[#b8860b]" strokeWidth={1.5} />
            </div>
            <span className="text-xs font-bold tracking-[0.15em] text-[#475569]">
              {num}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
            {feature.description}
          </p>

          <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
            <span
              className={`inline-flex items-center rounded-lg ${feature.statBg} px-3 py-1.5 text-lg font-bold ${feature.statText}`}
            >
              <AnimatedCounter value={feature.metric} />
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
              {feature.metricLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f7f4] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#b8860b]/5 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-[300px] w-[300px] rounded-full bg-[#b8860b]/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-[#b8860b]/5 blur-[80px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Why Ractysh
          </motion.span>
          <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight md:text-5xl">
            <span className="bg-gradient-to-r from-[#0f172a] via-[#b8860b] to-[#0f172a] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Why Choose Us
            </span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-4 h-0.5 w-16 bg-[#b8860b] origin-center"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#475569]"
          >
            What sets us apart is our unwavering commitment to excellence,
            integrity, and your success.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <FeatureCard feature={features[0]} index={0} />
          </div>
          <FeatureCard feature={features[1]} index={1} />
          <FeatureCard feature={features[2]} index={2} />
          <div className="lg:col-span-2">
            <FeatureCard feature={features[3]} index={3} />
          </div>
          <FeatureCard feature={features[4]} index={4} />
          <div className="lg:col-span-2">
            <FeatureCard feature={features[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
