"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const tickerItems = [
  "100+ Global Partners",
  "50+ Countries Served",
  "10,000+ Successful Shipments",
  "98% Client Satisfaction",
  "247 Dedicated Support",
  "Multi-Modal Logistics",
  "End-to-End Supply Chain",
  "Customs & Compliance Experts",
];

export default function MarqueeTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = track.querySelectorAll<HTMLSpanElement>(".ticker-item");
    if (items.length === 0) return;
    const itemWidth = items[0].offsetWidth + 48;
    const totalWidth = itemWidth * items.length;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }, track);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full overflow-hidden border-y border-gray-200/60 bg-[#f8f7f4] py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0A0F1A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0A0F1A] to-transparent" />
      <div
        ref={trackRef}
        className="flex w-max items-center gap-12"
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="ticker-item flex items-center gap-3 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-[#6b7280]/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b]" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
