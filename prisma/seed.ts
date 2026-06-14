import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

const works = [
  {
    title: "West African Cocoa Supply",
    country: "Ghana",
    industry: "Agriculture",
    scope: "50,000 MT annually",
    result: "37% cost reduction",
    image: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&q=80",
    order: 1,
  },
  {
    title: "German Auto Parts Distribution",
    country: "Germany",
    industry: "Automotive",
    scope: "12 countries across EU",
    result: "99.8% on-time delivery",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    order: 2,
  },
  {
    title: "UAE Electronics Hub",
    country: "UAE",
    industry: "Technology",
    scope: "$240M annual turnover",
    result: "3x market expansion",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    order: 3,
  },
  {
    title: "Indian Textile Export Program",
    country: "India",
    industry: "Textiles",
    scope: "200+ supplier network",
    result: "42% faster lead times",
    image: "https://images.unsplash.com/photo-1612685180040-e120061d47e3?w=800&q=80",
    order: 4,
  },
  {
    title: "Singapore Pharma Logistics",
    country: "Singapore",
    industry: "Pharmaceuticals",
    scope: "Cold chain - 6 regions",
    result: "Zero temperature breaches",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800&q=80",
    order: 5,
  },
  {
    title: "Brazilian Rare Minerals",
    country: "Brazil",
    industry: "Mining",
    scope: "8,000 MT monthly",
    result: "20% freight savings",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    order: 6,
  },
];

async function seed() {
  console.log("Clearing existing works...");
  await prisma.work.deleteMany();

  console.log("Seeding works...");
  for (const work of works) {
    await prisma.work.create({ data: work });
  }

  console.log(`Seeded ${works.length} works`);
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
