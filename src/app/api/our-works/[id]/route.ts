import { NextResponse } from "next/server"
import mongoose from "mongoose"
import { connectDB } from "@/lib/db"
import OurWorkProject from "@/models/OurWorkProject"
import { checkAuth } from "@/lib/auth"
import { deleteImage } from "@/lib/cloudinary"

export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const doc = await OurWorkProject.findById(id).lean()
    if (!doc) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ ...doc, id: String((doc as Record<string, unknown>)._id) })
  } catch (error) {
    console.error("[our-works/id] GET Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const body = await request.json()
    const { title, slug, shortDescription, description, location, status, coverImage, galleryImages, featured, published, displayOrder } = body

    if (title !== undefined && !title.trim()) {
      return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 })
    }

    if (slug) {
      const existing = await OurWorkProject.findOne({ slug, _id: { $ne: id } })
      if (existing) {
        return NextResponse.json({ error: "A project with this slug already exists" }, { status: 409 })
      }
    }

    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title.trim()
    if (slug !== undefined) updateData.slug = slug
    if (shortDescription !== undefined) updateData.shortDescription = shortDescription
    if (description !== undefined) updateData.description = description
    if (location !== undefined) updateData.location = location
    if (status !== undefined) updateData.status = status
    if (coverImage !== undefined) updateData.coverImage = coverImage
    if (galleryImages !== undefined) updateData.galleryImages = galleryImages
    if (featured !== undefined) updateData.featured = !!featured
    if (published !== undefined) updateData.published = !!published
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder

    const doc = await OurWorkProject.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true }).lean()
    if (!doc) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ ...doc, id: String((doc as Record<string, unknown>)._id) })
  } catch (error) {
    console.error("[our-works/id] PUT Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const doc = await OurWorkProject.findById(id).lean()
    if (!doc) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const data = doc as Record<string, unknown>
    const coverImage = data.coverImage as string
    const galleryImages = (data.galleryImages as string[]) || []

    if (coverImage) {
      await deleteImage(coverImage)
    }

    for (const img of galleryImages) {
      if (img) await deleteImage(img)
    }

    await OurWorkProject.findByIdAndDelete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[our-works/id] DELETE Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
