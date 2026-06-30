import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"
import { checkAuth } from "@/lib/auth"

export const dynamic = "force-dynamic"

const DIVISION = "Import Export"

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const division = searchParams.get("division") || DIVISION
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const admin = searchParams.get("admin") === "true"
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")))

    const filter: Record<string, unknown> = { division }
    if (!admin) filter.published = true
    if (status && ["Completed", "Ongoing", "Upcoming"].includes(status)) filter.status = status
    if (featured === "true") filter.featured = true
    if (featured === "false") filter.featured = false
    if (search) filter.title = { $regex: search, $options: "i" }

    const [docs, total] = await Promise.all([
      OurWorkProject.find(filter)
        .sort({ featured: -1, displayOrder: 1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      OurWorkProject.countDocuments(filter),
    ])

    return NextResponse.json({
      projects: docs.map((d: Record<string, unknown>) => ({ ...d, id: String(d._id), _id: String(d._id) })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("[our-works] GET Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    const body = await request.json()
    const { title, slug, shortDescription, description, location, status, coverImage, galleryImages, featured, published, displayOrder } = body

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const finalSlug = slug || slugify(title)
    if (!finalSlug) {
      return NextResponse.json({ error: "Could not generate slug" }, { status: 400 })
    }

    const existing = await OurWorkProject.findOne({ slug: finalSlug })
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
    }

    const project = await OurWorkProject.create({
      title: title.trim(),
      slug: finalSlug,
      division: DIVISION,
      shortDescription: shortDescription || "",
      description: description || "",
      location: location || "",
      status: status || "Ongoing",
      coverImage: coverImage || "",
      galleryImages: galleryImages || [],
      featured: !!featured,
      published: published !== false,
      displayOrder: typeof displayOrder === "number" ? displayOrder : 0,
    })

    return NextResponse.json({ ...project.toObject(), id: String(project._id) }, { status: 201 })
  } catch (error) {
    console.error("[our-works] POST Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
