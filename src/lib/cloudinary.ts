import crypto from "crypto"
import fs from "fs/promises"
import path from "path"

export async function uploadImageBuffer(buffer: Buffer, filename: string): Promise<string> {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (cloudName && apiKey && apiSecret) {
      const timestamp = Math.round(Date.now() / 1000)
      const signature = crypto
        .createHash("sha1")
        .update(`timestamp=${timestamp}${apiSecret}`)
        .digest("hex")

      const formData = new FormData()
      const blob = new Blob([new Uint8Array(buffer)], { type: "image/jpeg" })
      formData.append("file", blob, filename)
      formData.append("api_key", apiKey)
      formData.append("timestamp", String(timestamp))
      formData.append("signature", signature)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData, signal: AbortSignal.timeout(15000) }
      )

      if (response.ok) {
        const data = await response.json()
        return data.secure_url || data.url
      }

      console.warn("[cloudinary] Upload failed, falling back to local:", await response.text())
    }
  } catch (error) {
    console.warn("[cloudinary] Upload error, falling back to local:", error)
  }

  return saveLocal(buffer, filename)
}

export async function deleteImage(publicUrl: string): Promise<boolean> {
  if (!publicUrl) return false

  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (cloudName && apiKey && apiSecret) {
      const match = publicUrl.match(/\/v\d+\/(.+)\.\w+$/)
      if (!match) return false
      const publicId = match[1]

      const timestamp = Math.round(Date.now() / 1000)
      const signature = crypto
        .createHash("sha1")
        .update(`public_id=${publicId}&timestamp=${timestamp}${apiSecret}`)
        .digest("hex")

      const formData = new FormData()
      formData.append("public_id", publicId)
      formData.append("api_key", apiKey)
      formData.append("timestamp", String(timestamp))
      formData.append("signature", signature)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
        { method: "POST", body: formData, signal: AbortSignal.timeout(15000) }
      )

      if (response.ok) return true
    }

    if (publicUrl.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", publicUrl)
      await fs.unlink(filePath).catch(() => {})
      return true
    }
  } catch {
    // silent
  }

  return false
}

async function saveLocal(buffer: Buffer, filename: string): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "uploads")
  await fs.mkdir(uploadDir, { recursive: true })
  const ext = path.extname(filename) || ".jpg"
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
  const filePath = path.join(uploadDir, unique)
  await fs.writeFile(filePath, buffer)
  return `/uploads/${unique}`
}
