"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const clients = [
  "Bharat Manufacturing",
  "Pacific Trade Intl",
  "Gulf Star Trading",
  "AfriConnect Logistics",
  "Sapphire Exports",
  "Luzon Export Corp",
  "Global Trade Group",
  "Summit Logistics",
];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="bg-[#f8f7f4] px-6 py-16 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#94a3b8]"
        >
          Trusted by Industry Leaders Worldwide
        </motion.p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {clients.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="flex items-center justify-center rounded-xl border border-gray-200/60 bg-[#f8f7f4] px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-md"
            >
              <span className="text-sm font-bold tracking-tight text-[#6b7280]/60 transition-colors duration-300">
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
