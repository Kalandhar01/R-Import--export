"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Users, Shield, ClipboardCheck } from "lucide-react";
import FlaticonIcon from "@/components/ui/FlaticonIcon";

const FlaticonRoute = ({ className }: { className?: string }) => <FlaticonIcon icon="fi-rr-route" className={className} />;
const FlaticonMapPin = ({ className }: { className?: string }) => <FlaticonIcon icon="fi-rr-marker" className={className} />;
const FlaticonTruck = ({ className }: { className?: string }) => <FlaticonIcon icon="fi-sr-truck-container" className={className} />;

const steps = [
  {
    number: 1,
    title: "Requirement Analysis",
    description:
      "We begin by understanding your specific trade goals, product types, volumes, and destination markets to define the optimal path forward.",
    icon: Search,
    accent: "#b8860b",
  },
  {
    number: 2,
    title: "Supplier Identification",
    description:
      "Leveraging our global network, we identify and vet qualified suppliers that match your quality standards and commercial requirements.",
    icon: Users,
    accent: "#b8860b",
  },
  {
    number: 3,
    title: "Compliance Verification",
    description:
      "Every partner and product undergoes rigorous compliance screening against international trade regulations and local import laws.",
    icon: Shield,
    accent: "#b8860b",
  },
  {
    number: 4,
    title: "Logistics Planning",
    description:
      "We design a multi-modal logistics plan balancing cost, speed, and reliability, including routing, carriers, and warehousing.",
    icon: FlaticonRoute,
    accent: "#b8860b",
  },
  {
    number: 5,
    title: "Customs Processing",
    description:
      "Our customs experts prepare and submit all documentation, calculate duties, and ensure smooth clearance at every border.",
    icon: ClipboardCheck,
    accent: "#b8860b",
  },
  {
    number: 6,
    title: "Shipment Tracking",
    description:
      "Real-time tracking and proactive notifications keep you informed of your shipment's location, status, and estimated arrival.",
    icon: FlaticonMapPin,
    accent: "#b8860b",
  },
  {
    number: 7,
    title: "Final Delivery",
    description:
      "We coordinate last-mile delivery to your specified destination and provide post-delivery support for a seamless experience.",
    icon: FlaticonTruck,
    accent: "#b8860b",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function StepCard({ step }: { step: (typeof steps)[0] }) {
  const Icon = step.icon;
  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
    >
      <div className="relative z-10 flex flex-col items-center rounded-2xl border border-slate-700/50 bg-gradient-to-b from-slate-800/80 to-slate-900/80 p-8 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/30 hover:shadow-[0_0_40px_-12px_rgba(184,134,11,0.3)]">
        {/* Glow on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(600px circle at 50% 50%, rgba(184,134,11,0.08), transparent 40%)",
          }}
        />

        {/* Number badge */}
        <div className="relative mb-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-amber-500/30 transition-all duration-500 group-hover:ring-amber-400/50 group-hover:shadow-[0_0_20px_-4px_rgba(184,134,11,0.3)]">
            <Icon className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
          </div>
          <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-xs font-bold text-slate-900 shadow-lg shadow-amber-500/20">
            {step.number}
          </span>
        </div>

        {/* Arrow connector */}
        <div className="absolute -bottom-12 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-600 transition-colors duration-300 group-hover:text-amber-500/50">
            <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h3 className="text-center text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-300">
          {step.title}
        </h3>
        <p className="mt-3 text-center text-sm leading-relaxed text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <>
      {/* Desktop horizontal scroll */}
      <section
        ref={sectionRef}
        className="relative hidden h-[300vh] md:block"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="ml-[5vw]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                Our Process
              </span>
              <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
                How We Work
              </h2>
              <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-amber-400 to-amber-600" />
            </motion.div>
          </div>

          <motion.div
            style={{ x }}
            className="flex items-center gap-0 pl-[5vw]"
          >
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex items-center"
            >
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex-shrink-0 px-5"
                  style={{ width: "28vw", maxWidth: 380 }}
                >
                  <StepCard step={step} />
                </div>
              ))}
            </motion.div>

            {/* trailing spacer */}
            <div className="w-[20vw] flex-shrink-0" />
          </motion.div>
        </div>
      </section>

      {/* Mobile vertical stack */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 py-24 md:hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute right-1/3 bottom-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-lg">
          <div className="mb-12 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
              Our Process
            </span>
            <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-white">
              How We Work
            </h2>
            <div className="mx-auto mt-4 h-0.5 w-16 bg-gradient-to-r from-amber-400 to-amber-600" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            {/* Vertical connecting line */}
            <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent" />

            <div className="space-y-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    variants={itemVariants}
                    className="relative flex gap-5"
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 ring-1 ring-amber-500/30">
                      <Icon className="h-6 w-6 text-amber-400" strokeWidth={1.5} />
                      <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-[10px] font-bold text-slate-900 shadow-lg shadow-amber-500/20">
                        {step.number}
                      </span>
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-lg font-bold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
