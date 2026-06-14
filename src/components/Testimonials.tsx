"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Amara Osei",
    role: "Supply Chain Director",
    company: "West Africa Logistics Group",
    content:
      "Ractysh transformed our supply chain operations across three continents. Their deep understanding of cross-border trade regulations saved us millions in tariffs.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "James Mitchell",
    role: "CEO",
    company: "Mitchell Global Exports",
    content:
      "The most reliable import partner we have ever worked with. Their end-to-end logistics solutions cut our delivery times by 40%.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Procurement Head",
    company: "Bharat Industrial Ltd.",
    content:
      "Exceptional sourcing capabilities. They connected us with premium suppliers across Southeast Asia that we never would have found on our own.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Carlos Mendez",
    role: "VP Operations",
    company: "LatAm Trade Corp",
    content:
      "Their customs clearance expertise is unmatched. Complex documentation handled flawlessly every single time. A true strategic partner.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Fatima Al-Rashid",
    role: "Founder & CEO",
    company: "Gulf Star Enterprises",
    content:
      "Ractysh's market intelligence gave us a competitive edge in the Middle East. Their network opened doors that were previously inaccessible.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
  {
    name: "Henrik Larsson",
    role: "International Trade Manager",
    company: "Nordic Import Group",
    content:
      "Five years and counting. Their consistency in quality control and on-time delivery is what keeps our partnership strong.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#f8f7f4] px-4 py-24 md:px-12 lg:px-20">
      <div className="relative z-10 mx-auto mb-12 max-w-4xl text-center">
        <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B]">Client Testimonials</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-serif text-4xl font-bold leading-tight text-[#111827] md:text-5xl">Trusted by Global<br />Trade Leaders</motion.h2>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-6 h-0.5 w-20 bg-[#B8860B]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="testimonial-card mx-auto max-w-2xl rounded-2xl border border-gray-200/60 bg-white p-8 shadow-xl shadow-black/5 md:p-10"
          >
            <div className="mb-5 flex items-center gap-1">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, r) => (
                <Star key={r} size={14} className="fill-[#B8860B] text-[#B8860B]" />
              ))}
            </div>
            <p className="text-base leading-relaxed text-[#6b7280] md:text-lg">&ldquo;{testimonials[activeIndex].content}&rdquo;</p>
            <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-6">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-[#b8860b]/10">
                <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].name} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111827]">{testimonials[activeIndex].name}</p>
                <p className="text-xs text-[#6b7280]">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={prev} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#6b7280] transition-all hover:border-[#B8860B] hover:text-[#B8860B]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} aria-label={`Testimonial ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-[#B8860B]" : "w-2 bg-gray-300"}`} />
            ))}
          </div>
          <button onClick={next} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-[#6b7280] transition-all hover:border-[#B8860B] hover:text-[#B8860B]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
