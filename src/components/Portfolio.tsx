"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, BarChart3, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
  id: string;
  title: string;
  country: string;
  industry: string;
  scope: string;
  result: string;
  image: string;
}

export default function Portfolio() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    fetch("/api/works")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.filter((w: { published: boolean }) => w.published));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || items.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [loading, items.length]);

  const setItemRef = (el: HTMLAnchorElement | null, idx: number) => {
    if (el) itemsRef.current[idx] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="mx-auto mb-16 max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B]"
        >
          Our Works
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl font-bold leading-tight text-[#111827] md:text-5xl"
        >
          Delivering Results
          <br />
          Across Borders
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 h-0.5 w-20 bg-[#B8860B]"
        />
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-[#6b7280]">Loading works...</div>
      ) : items.length === 0 ? (
        <div className="py-20 text-center text-sm text-[#6b7280]">No works yet.</div>
      ) : (
        <div className="mx-auto columns-1 gap-6 md:columns-2 lg:max-w-6xl">
          {items.map((item, i) => (
            <a
              key={item.id}
              ref={(el) => setItemRef(el, i)}
              href="#"
              className={`group relative mb-6 block overflow-hidden rounded-2xl bg-[#f8f7f4] shadow-lg shadow-black/20 transition-all duration-500 hover:shadow-xl hover:shadow-black/30 ${
                i === 1 || i === 4 ? "md:mt-20" : ""
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#B8860B]">
                    <MapPin size={12} />
                    <span>{item.country}</span>
                    <span className="text-[#6b7280]/60">|</span>
                    <BarChart3 size={12} />
                    <span>{item.industry}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-[#B8860B]">
                    {item.title}
                  </h3>
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#B8860B] text-[#111827] shadow-lg transition-all duration-500 opacity-80 group-hover:opacity-100">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-6">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#B8860B]">
                    Scope
                  </p>
                  <p className="text-sm font-semibold text-[#111827]">
                    {item.scope}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#B8860B]">
                    Result
                  </p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-[#111827]">
                    <Globe size={12} className="text-[#B8860B]" />
                    {item.result}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
