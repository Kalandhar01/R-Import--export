"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f7f4] px-6 py-24 md:px-12 lg:px-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(184,134,11,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(184,134,11,0.05),transparent_50%)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-xs font-bold uppercase tracking-[0.25em] text-[#b8860b]"
        >
          Start Your Journey
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 font-serif text-4xl font-bold leading-tight text-[#111827] md:text-5xl lg:text-6xl"
        >
          Ready to Transform Your
          <br />
          <span className="text-[#b8860b]">Global Trade</span> Operations?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280]"
        >
          Partner with us and unlock seamless import, export, and logistics solutions
          tailored to your business. Our trade experts are ready to guide you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2.5 bg-[#b8860b] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111827] transition-all duration-300 hover:bg-[#9a7209] hover:shadow-xl hover:shadow-[#b8860b]/20"
          >
            Request Consultation
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 border border-gray-300/40 px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]/80 transition-all duration-300 hover:border-gray-400/50 hover:text-[#111827]"
          >
            View All Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
