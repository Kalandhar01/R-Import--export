"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Import Services",
    description:
      "End-to-end import solutions tailored to your supply chain needs. We handle everything from supplier identification to customs clearance and domestic delivery.",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    slug: "/services",
    count: "01",
  },
  {
    title: "Export Services",
    description:
      "Strategic export management that opens new markets for your products. Compliance-certified and globally connected with real-time tracking at every stage.",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    slug: "/services",
    count: "02",
  },
  {
    title: "Global Product Sourcing",
    description:
      "Identify and qualify the best suppliers worldwide. Rigorous vetting ensures quality, reliability, and competitive pricing across all major markets.",
    image:
      "https://images.unsplash.com/photo-1778441531349-b0c874287ebc?w=800&q=80",
    slug: "/services",
    count: "03",
  },
  {
    title: "Customs Clearance",
    description:
      "Navigate complex customs regulations with confidence. Our experts manage documentation, duties, and compliance seamlessly across every border.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    slug: "/services",
    count: "04",
  },
  {
    title: "Freight Forwarding",
    description:
      "Multi-modal freight solutions by air, sea, and land. Optimized routing for cost, speed, and reliability with full visibility from origin to destination.",
    image:
      "https://images.unsplash.com/photo-1759272840538-ae4b07214c71?w=800&q=80",
    slug: "/services",
    count: "05",
  },
  {
    title: "Supply Chain Management",
    description:
      "Holistic supply chain orchestration from raw materials to end consumer. Visibility, agility, precision and control at every stage of your operations.",
    image:
      "https://images.unsplash.com/photo-1773399881946-8371e1c538d9?w=800&q=80",
    slug: "/services",
    count: "06",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="opacity-0">
      <Link
        href={service.slug}
        className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-[#b8860b]/10 hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#b8860b] text-xs font-bold text-white">
            {service.count}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#111827] transition-colors duration-300 group-hover:text-[#b8860b]">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
            {service.description}
          </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#b8860b] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:gap-2.5">
            Learn More
            <span>&rarr;</span>
          </span>
        </div>
      </Link>
    </div>
  );
}

export default function FeaturedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-[#f8f7f4] px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b8860b]">
            What We Offer
          </span>
          <h2 className="mt-3 font-serif text-4xl font-bold text-[#111827] md:text-5xl">
            Featured Services
          </h2>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#b8860b]" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6b7280]/60">
            Comprehensive trade solutions designed to move your business forward
            with confidence and efficiency across every market.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-full border-2 border-[#b8860b] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-[#b8860b] transition-all duration-300 hover:bg-[#b8860b] hover:text-white"
          >
            Explore All Services
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
