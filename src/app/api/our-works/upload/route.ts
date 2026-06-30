import { NextResponse } from "next/server"
import { checkAuth } from "@/lib/auth"
import { uploadImageBuffer } from "@/lib/cloudinary"

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const url = await uploadImageBuffer(buffer, file.name)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("[our-works/upload] Error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
