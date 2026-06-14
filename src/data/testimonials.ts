export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Mehta",
    role: "Director of Operations",
    company: "Bharat Manufacturing Group",
    content:
      "Their import services transformed our supply chain. We reduced lead times by 40% and costs by 25% within the first quarter. The level of transparency and professional communication is unmatched.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "VP Global Supply Chain",
    company: "Pacific Trade International",
    content:
      "The most reliable freight forwarding partner we've worked with across Asia-Pacific. Their customs clearance expertise saved us from costly delays multiple times. Truly a world-class operation.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Ahmed Al-Rashid",
    role: "CEO",
    company: "Gulf Star Trading",
    content:
      "From product sourcing to final delivery, their end-to-end service is exceptional. They helped us expand into three new markets within six months. Our trusted trade partner for life.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "Maria Santos",
    role: "Supply Chain Manager",
    company: "Luzon Export Corporation",
    content:
      "Their global sourcing network gave us access to suppliers we couldn't find on our own. Quality inspections and compliance management are handled professionally. Highly recommended.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
  },
  {
    id: 5,
    name: "James Okonkwo",
    role: "Founder & CEO",
    company: "AfriConnect Logistics",
    content:
      "Working with them has been instrumental in scaling our cross-border operations. Their knowledge of African trade corridors and customs procedures is remarkable. A partnership that delivers real value.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Head of International Trade",
    company: "Sapphire Exports India",
    content:
      "The compliance and documentation support they provide is invaluable. We've never had a shipment held up at customs since partnering with them. Their attention to detail sets them apart.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    rating: 5,
  },
];

export const stats = [
  { value: 100, suffix: "+", label: "Global Partners" },
  { value: 50, suffix: "+", label: "Countries Served" },
  { value: 10000, suffix: "+", label: "Successful Shipments" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export const whyChooseUs = [
  {
    title: "Global Reach",
    description:
      "Operating across 50+ countries with a network of trusted partners and agents ensuring seamless trade execution worldwide.",
    icon: "Globe",
  },
  {
    title: "Strategic Partnerships",
    description:
      "Long-term relationships with carriers, suppliers, and regulatory bodies that give our clients preferential terms and priority service.",
    icon: "Handshake",
  },
  {
    title: "Regulatory Compliance",
    description:
      "Deep expertise in international trade regulations, customs procedures, and documentation requirements across all major markets.",
    icon: "Shield",
  },
  {
    title: "Fast Logistics",
    description:
      "Optimized supply chain operations with real-time tracking, reducing transit times while maintaining the highest safety standards.",
    icon: "Zap",
  },
  {
    title: "Transparent Operations",
    description:
      "Complete visibility into every stage of your shipment with digital tracking, regular updates, and dedicated account management.",
    icon: "Eye",
  },
  {
    title: "Dedicated Support",
    description:
      "Personal trade advisors assigned to every client, providing end-to-end support from initial consultation to final delivery.",
    icon: "HeadphonesIcon",
  },
];

export const processSteps = [
  { step: "01", title: "Requirement Analysis", description: "We analyze your trade requirements, timelines, budget, and specific needs to create a tailored strategy." },
  { step: "02", title: "Supplier Identification", description: "Our global network helps identify and verify the most suitable suppliers, manufacturers, or buyers for your needs." },
  { step: "03", title: "Compliance Verification", description: "Thorough due diligence on regulatory requirements, trade restrictions, and documentation needed for smooth processing." },
  { step: "04", title: "Logistics Planning", description: "Comprehensive planning of the optimal route, mode of transport, and schedule for your shipment." },
  { step: "05", title: "Customs Processing", description: "Expert handling of all customs documentation, duties, taxes, and clearance procedures." },
  { step: "06", title: "Shipment Tracking", description: "Real-time monitoring and tracking of your shipment with proactive updates at every milestone." },
  { step: "07", title: "Final Delivery", description: "Last-mile delivery coordination and post-delivery support to ensure complete satisfaction." },
];

export const portfolioItems = [
  { title: "Automotive Parts Import", country: "Germany → India", industry: "Automotive", scope: "Supply Chain Management", result: "35% cost reduction", image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&q=80" },
  { title: "Textile Export Program", country: "India → USA", industry: "Textiles", scope: "Export & Logistics", result: "48% faster delivery", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" },
  { title: "Electronics Supply Chain", country: "China → Brazil", industry: "Electronics", scope: "Full Supply Chain", result: "99.7% on-time delivery", image: "https://images.unsplash.com/photo-1553413077-190ff3054c5c?w=600&q=80" },
  { title: "Agricultural Commodities", country: "Brazil → Europe", industry: "Agriculture", scope: "Bulk Shipping", result: "22% freight savings", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&q=80" },
  { title: "Pharmaceutical Logistics", country: "India → Africa", industry: "Pharma", scope: "Cold Chain Logistics", result: "100% temperature compliance", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { title: "Industrial Machinery", country: "Japan → UAE", industry: "Industrial", scope: "Project Cargo", result: "On-time, on-budget", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" },
];
