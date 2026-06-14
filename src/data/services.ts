export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  shortDescription: string;
  featured: boolean;
  heroImage: string;
  icon: string;
  benefits: string[];
}

export const services: Service[] = [
  {
    slug: "import-services",
    title: "Import Services",
    shortTitle: "Import",
    tagline: "End-to-end import solutions for global procurement",
    description:
      "Comprehensive import services covering everything from supplier identification to customs clearance and last-mile delivery. We manage the complete import lifecycle so you can focus on growing your business.",
    shortDescription:
      "End-to-end import solutions covering supplier sourcing, documentation, customs clearance, and domestic delivery.",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    icon: "ArrowDownToLine",
    benefits: [
      "Supplier identification and verification",
      "End-to-end documentation management",
      "Customs clearance and compliance",
      "Cost optimization and freight negotiation",
      "Real-time shipment tracking",
    ],
  },
  {
    slug: "export-services",
    title: "Export Services",
    shortTitle: "Export",
    tagline: "Take your products to international markets",
    description:
      "Strategic export services designed to help businesses expand into new markets. From market research and regulatory compliance to logistics and after-sales support, we ensure your exports reach global destinations efficiently.",
    shortDescription:
      "Strategic export solutions including market research, trade compliance, documentation, and global logistics.",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    icon: "ArrowUpFromLine",
    benefits: [
      "International market research and entry strategy",
      "Export documentation and compliance",
      "Multi-modal freight solutions",
      "Destination customs handling",
      "Trade finance assistance",
    ],
  },
  {
    slug: "global-product-sourcing",
    title: "Global Product Sourcing",
    shortTitle: "Sourcing",
    tagline: "Strategic sourcing from verified global suppliers",
    description:
      "Professional sourcing services connecting you with verified manufacturers and suppliers worldwide. We conduct rigorous due diligence, negotiate competitive terms, and manage quality control across the supply chain.",
    shortDescription:
      "Connect with verified global suppliers through rigorous due diligence, competitive negotiation, and quality control.",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
    icon: "Search",
    benefits: [
      "Supplier discovery and verification",
      "Competitive price negotiation",
      "Quality inspection and assurance",
      "Sample management and approval",
      "Supplier relationship management",
    ],
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    shortTitle: "Customs",
    tagline: "Expert customs brokerage for smooth border crossings",
    description:
      "Professional customs clearance services ensuring your shipments comply with all regulatory requirements. Our experienced brokers handle documentation, duties, taxes, and inspections for seamless border crossings.",
    shortDescription:
      "Expert customs brokerage ensuring regulatory compliance, duty optimization, and seamless border clearance.",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
    icon: "Shield",
    benefits: [
      "Customs documentation and filing",
      "Duty and tax optimization",
      "Regulatory compliance management",
      "Inspection coordination",
      "Customs bond services",
    ],
  },
  {
    slug: "freight-forwarding",
    title: "Freight Forwarding",
    shortTitle: "Freight",
    tagline: "Multi-modal freight solutions across air, sea, and land",
    description:
      "Comprehensive freight forwarding services across all transport modes. Whether you need air freight for time-sensitive shipments, sea freight for bulk cargo, or road transport for regional distribution, we deliver reliable solutions.",
    shortDescription:
      "Multi-modal freight forwarding across air, sea, and land with real-time tracking and competitive rates.",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    icon: "Ship",
    benefits: [
      "Air, sea, and road freight solutions",
      "Consolidation and deconsolidation",
      "Real-time shipment tracking",
      "Competitive freight rates",
      "Flexible scheduling options",
    ],
  },
  {
    slug: "supply-chain-management",
    title: "Supply Chain Management",
    shortTitle: "Supply Chain",
    tagline: "Integrated supply chain solutions for operational excellence",
    description:
      "End-to-end supply chain management services designed to optimize your operations from procurement to delivery. We integrate planning, sourcing, logistics, and distribution into a seamless, cost-efficient process.",
    shortDescription:
      "Integrated supply chain solutions optimizing procurement, logistics, inventory, and distribution operations.",
    featured: true,
    heroImage: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80",
    icon: "Network",
    benefits: [
      "Supply chain strategy and design",
      "Procurement and vendor management",
      "Inventory optimization",
      "Distribution network planning",
      "Performance analytics and reporting",
    ],
  },
  {
    slug: "international-procurement",
    title: "International Procurement",
    shortTitle: "Procurement",
    tagline: "Strategic global procurement for competitive advantage",
    description:
      "Strategic international procurement services that help businesses source quality products at competitive prices from global markets. We manage the entire procurement cycle with transparency and efficiency.",
    shortDescription:
      "Strategic global procurement services delivering quality products at competitive prices from international markets.",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    icon: "Briefcase",
    benefits: [
      "Global supplier network access",
      "Competitive bidding management",
      "Contract negotiation",
      "Quality assurance programs",
      "Supply risk mitigation",
    ],
  },
  {
    slug: "air-freight",
    title: "Air Freight",
    shortTitle: "Air Freight",
    tagline: "Fast, reliable air cargo solutions worldwide",
    description:
      "Premium air freight services for time-critical shipments. We offer express, standard, and economy options with real-time tracking, ensuring your cargo reaches any global destination with speed and reliability.",
    shortDescription:
      "Fast and reliable air cargo solutions with express, standard, and economy options for global destinations.",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    icon: "Plane",
    benefits: [
      "Express and economy air freight options",
      "Global network of partner airlines",
      "Real-time flight tracking",
      "Dangerous goods handling",
      "Time-critical shipment solutions",
    ],
  },
  {
    slug: "sea-freight",
    title: "Sea Freight",
    shortTitle: "Sea Freight",
    tagline: "Cost-effective ocean freight for bulk and container cargo",
    description:
      "Comprehensive sea freight services including FCL, LCL, and breakbulk solutions. We partner with leading carriers to offer competitive rates and reliable schedules across major trade lanes worldwide.",
    shortDescription:
      "Cost-effective ocean freight solutions including FCL, LCL, and breakbulk across major global trade lanes.",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1774199102878-4de9413b7d5f?w=800&q=80",
    icon: "Anchor",
    benefits: [
      "FCL and LCL container solutions",
      "Breakbulk and project cargo",
      "Major trade lane coverage",
      "Competitive carrier contracts",
      "Port-to-port and door-to-door options",
    ],
  },
  {
    slug: "road-transportation",
    title: "Road Transportation",
    shortTitle: "Road Transport",
    tagline: "Reliable road freight across domestic and cross-border routes",
    description:
      "Comprehensive road transportation services for domestic and cross-border cargo movement. Our fleet and partner network ensure timely, secure delivery with real-time tracking and professional handling.",
    shortDescription:
      "Reliable road freight services for domestic and cross-border cargo with real-time tracking and secure handling.",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1778103617525-76877c583fa5?w=800&q=80",
    icon: "Truck",
    benefits: [
      "Full truckload and LTL options",
      "Cross-border transportation",
      "Real-time GPS tracking",
      "Temperature-controlled options",
      "Express and economy services",
    ],
  },
  {
    slug: "warehousing",
    title: "Warehousing & Distribution",
    shortTitle: "Warehousing",
    tagline: "Strategic warehousing for efficient inventory management",
    description:
      "Modern warehousing solutions with strategic locations near major ports and distribution hubs. We offer flexible storage, inventory management, pick-and-pack services, and value-added logistics support.",
    shortDescription:
      "Strategic warehousing solutions with inventory management, pick-and-pack, and value-added logistics services.",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1770910195585-825a1181a704?w=800&q=80",
    icon: "Warehouse",
    benefits: [
      "Strategic warehouse locations",
      "Real-time inventory tracking",
      "Pick, pack, and ship services",
      "Cross-docking capabilities",
      "Temperature-controlled storage",
    ],
  },
  {
    slug: "supply-chain-solutions",
    title: "Supply Chain Solutions",
    shortTitle: "Supply Chain",
    tagline: "End-to-end supply chain optimization and consulting",
    description:
      "Comprehensive supply chain consulting and implementation services. We analyze, design, and deploy optimized supply chain strategies that reduce costs, improve efficiency, and enhance resilience.",
    shortDescription:
      "Supply chain consulting and implementation services that reduce costs, improve efficiency, and enhance resilience.",
    featured: false,
    heroImage: "https://images.unsplash.com/photo-1759216373582-a24c4a65b031?w=800&q=80",
    icon: "Network",
    benefits: [
      "Supply chain audit and analysis",
      "Process optimization",
      "Technology integration",
      "Risk management",
      "Sustainability consulting",
    ],
  },
];

export const allServices = services;
export const featuredServices = services.filter((s) => s.featured);
export const additionalServices = services.filter((s) => !s.featured);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
