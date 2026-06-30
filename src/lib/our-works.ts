import { connectDB } from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"

export interface OurWorkProjectType {
  _id: string
  title: string
  slug: string
  division: string
  shortDescription: string
  description: string
  location: string
  status: string
  coverImage: string
  galleryImages: string[]
  featured: boolean
  published: boolean
  displayOrder: number
  createdAt: string
  updatedAt: string
}

function serialize(doc: Record<string, unknown>): OurWorkProjectType {
  return {
    _id: String(doc._id),
    title: (doc.title as string) || "",
    slug: (doc.slug as string) || "",
    division: (doc.division as string) || "",
    shortDescription: (doc.shortDescription as string) || "",
    description: (doc.description as string) || "",
    location: (doc.location as string) || "",
    status: (doc.status as string) || "Completed",
    coverImage: (doc.coverImage as string) || "",
    galleryImages: (doc.galleryImages as string[]) || [],
    featured: !!doc.featured,
    published: doc.published !== false,
    displayOrder: (doc.displayOrder as number) || 0,
    createdAt: (doc.createdAt as string) || "",
    updatedAt: (doc.updatedAt as string) || "",
  }
}

export async function getProjectsByDivision(division: string): Promise<OurWorkProjectType[]> {
  try {
    await connectDB()
    const docs = await OurWorkProject.find({ division, published: true })
      .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
      .lean()
    return docs.map((d) => serialize(d as Record<string, unknown>))
  } catch (error) {
    console.warn("[our-works] getProjectsByDivision error:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<OurWorkProjectType | null> {
  try {
    await connectDB()
    const doc = await OurWorkProject.findOne({ slug, published: true }).lean()
    if (!doc) return null
    return serialize(doc as Record<string, unknown>)
  } catch (error) {
    console.warn("[our-works] getProjectBySlug error:", error)
    return null
  }
}
