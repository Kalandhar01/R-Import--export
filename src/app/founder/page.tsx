import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Ship,
  BarChart3,
  ShieldCheck,
  Warehouse,
  ClipboardCheck,
  ArrowRight,
  MapPin,
  ChevronRight,
} from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Founder & Director | RACTYSH EXIM PVT LTD",
  description:
    "B. Mohamed Jamaldheen — Founder & Director of RACTYSH EXIM Pvt Ltd. Leading international trade, export operations, trade finance, and global supply chain management.",
};

const competencies = [
  {
    icon: Globe,
    title: "International Trade",
    description:
      "Deep expertise in cross-border trade, including import/export documentation, letter of credit, and international contracts.",
  },
  {
    icon: Ship,
    title: "Export Operations",
    description:
      "End-to-end management of export logistics, from cargo consolidation to port clearance and international shipping.",
  },
  {
    icon: BarChart3,
    title: "Trade Finance",
    description:
      "Structuring trade finance solutions including LC advising, invoice financing, and export credit risk mitigation.",
  },
  {
    icon: ShieldCheck,
    title: "Customs Compliance",
    description:
      "Navigating complex customs regulations, tariff classifications, and duty optimisation for seamless cross-border movement.",
  },
  {
    icon: Warehouse,
    title: "Supply Chain Management",
    description:
      "Optimising global supply chains through strategic sourcing, vendor management, and multimodal logistics coordination.",
  },
  {
    icon: ClipboardCheck,
    title: "Global Sourcing",
    description:
      "Identifying and qualifying international suppliers, negotiating procurement terms, and ensuring quality assurance.",
  },
];

const globalStats = [
  { value: "25+", label: "Countries Served" },
  { value: "₹500Cr+", label: "Trade Volume" },
  { value: "150+", label: "Global Partners" },
  { value: "15+", label: "Years Experience" },
];

export default async function FounderPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-11 w-11 overflow-hidden sm:h-12 sm:w-12">
              <Image
                src="/logo.png"
                alt="RACTYSH EXIM PVT LTD"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight tracking-tight text-[#111827] sm:text-base">
                RACTYSH
              </span>
              <span className="text-[9px] font-medium tracking-[0.15em] text-[#6b7280] sm:text-[10px]">
                EXIM PVT LTD
              </span>
            </div>
          </Link>
          <Link
            href="/#contact"
            className="rounded-sm bg-[#111827] px-4 py-2 text-[11px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-300 hover:bg-[#1f2937] sm:px-5 sm:py-2.5 sm:text-xs"
          >
            Get a Quote
          </Link>
        </div>
      </header>

      {/* Founder Hero */}
      <section className="relative overflow-hidden bg-white px-6 pb-16 pt-20 md:px-12 lg:px-24 lg:pb-24 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(17,24,39,0.03),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(17,24,39,0.02),transparent_50%)]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8 h-40 w-40 overflow-hidden rounded-full border-4 border-[#e5e7eb] sm:h-48 sm:w-48">
              <Image
                src="/logo.png"
                alt="B. Mohamed Jamaldheen"
                fill
                sizes="192px"
                className="object-contain p-4"
              />
            </div>

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280]">
              Founder &amp; Director
            </span>

            <h1 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#111827] md:text-5xl lg:text-6xl">
              B. Mohamed Jamaldheen
            </h1>

            <p className="mt-2 text-base font-medium text-[#6b7280] sm:text-lg">
              B.Com., ADCAA
            </p>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#6b7280]">
              Director — RACTYSH Exim Private Limited
            </p>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6b7280]">
              International Trade &bull; Export Operations &bull; Trade Finance &bull;
              Supply Chain Management &bull; Global Sourcing &bull; Customs Compliance
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-2.5 bg-[#111827] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#1f2937]"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center gap-2.5 border border-[#e5e7eb] px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]/80 transition-all duration-300 hover:border-[#111827]/30 hover:text-[#111827]"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Trade Background */}
      <section className="border-t border-[#e5e7eb] bg-white px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280]">
                About
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
                A Leader in Global Trade &amp; Export Operations
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-[#6b7280]">
              <p>
                B. Mohamed Jamaldheen brings extensive expertise in international
                trade, export operations, and trade finance. As the Director of
                RACTYSH Exim Private Limited, he oversees the company&apos;s import
                and export division, driving growth in global markets through
                strategic partnerships and operational excellence.
              </p>
              <p>
                His deep understanding of cross-border commerce — from customs
                compliance and documentation to supply chain optimisation — has
                positioned RACTYSH EXIM as a trusted partner for businesses
                seeking reliable import-export solutions across Asia, Africa,
                Europe, and the Middle East.
              </p>
              <p>
                With a strong foundation in commerce and advanced accounting
                (B.Com., ADCAA), he brings both financial acumen and operational
                insight to every trade engagement, ensuring seamless execution
                from sourcing to delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="border-t border-[#e5e7eb] bg-white px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280]">
              Expertise
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
              Core Competencies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280]">
              Specialised knowledge across the full spectrum of international
              trade and export-import operations.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group border border-[#e5e7eb] px-6 py-8 transition-all duration-300 hover:border-[#111827]/20 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center border border-[#e5e7eb] bg-white text-[#111827]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-[#111827]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Global Reach Stats */}
      <section className="border-t border-[#e5e7eb] bg-[#f8f7f4] px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280]">
              Global Reach
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
              Impact by the Numbers
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280]">
              A track record of connecting businesses across borders with
              reliable trade solutions.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {globalStats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[#e5e7eb] bg-white px-4 py-8 text-center"
              >
                <div className="font-serif text-3xl font-bold text-[#111827] sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.15em] text-[#6b7280]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-[#6b7280]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>India</span>
            </div>
            <ChevronRight className="h-3 w-3 text-[#e5e7eb]" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Middle East</span>
            </div>
            <ChevronRight className="h-3 w-3 text-[#e5e7eb]" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Southeast Asia</span>
            </div>
            <ChevronRight className="h-3 w-3 text-[#e5e7eb]" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Africa</span>
            </div>
            <ChevronRight className="h-3 w-3 text-[#e5e7eb]" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Europe</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white px-6 py-20 md:px-12 lg:px-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6b7280]">
            Let&apos;s Work Together
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
            Ready to Expand Your Global Trade?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#6b7280]">
            Get in touch with our team for expert guidance on import-export
            operations, trade finance, and international sourcing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2.5 bg-[#111827] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#1f2937]"
            >
              Request Consultation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="tel:+919876543210"
              className="group inline-flex items-center gap-2.5 border border-[#e5e7eb] px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-[#111827]/80 transition-all duration-300 hover:border-[#111827]/30 hover:text-[#111827]"
            >
              Call +91 98765 43210
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
