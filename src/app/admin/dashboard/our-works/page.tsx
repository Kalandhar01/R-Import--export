"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Search, X, Eye, Edit3, Trash2, Upload, Loader2,
  ChevronLeft, ChevronRight, ImageOff, ExternalLink
} from "lucide-react"

const DIVISION = "Import Export"

interface Project {
  _id: string
  id: string
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

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  location: "",
  status: "Ongoing" as string,
  coverImage: "",
  galleryImages: [] as string[],
  featured: false,
  published: true,
  displayOrder: 0,
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch("/api/our-works/upload", { method: "POST", body: fd })
  if (!res.ok) throw new Error("Upload failed")
  const data = await res.json()
  return data.url
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Completed: "bg-green-100 text-green-700",
    Ongoing: "bg-blue-100 text-blue-700",
    Upcoming: "bg-gray-100 text-gray-500",
  }
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${colors[status] || colors.Upcoming}`}>
      {status}
    </span>
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#e5e7eb]">
      {[1, 2, 3, 4, 5].map((i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-4 w-full animate-pulse rounded bg-[#e5e7eb]" style={{ width: i === 1 ? 56 : `${60 + i * 8}px` }} />
        </td>
      ))}
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <div className="h-7 w-14 animate-pulse rounded bg-[#e5e7eb]" />
          <div className="h-7 w-14 animate-pulse rounded bg-[#e5e7eb]" />
        </div>
      </td>
    </tr>
  )
}

function DropZone({ onUpload, uploading, multiple = false }: { onUpload: (url: string) => void; uploading: boolean; multiple?: boolean }) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"))
    for (const file of imageFiles) {
      try {
        const url = await uploadFile(file)
        onUpload(url)
      } catch {
        alert(`Failed to upload ${file.name}`)
      }
    }
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={async (e) => { e.preventDefault(); setDragging(false); await handleFiles(e.dataTransfer.files) }}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition ${
        dragging ? "border-[#111827] bg-[#111827]/5" : "border-[#e5e7eb] hover:border-[#111827]/40"
      }`}
    >
      {uploading ? (
        <Loader2 className="h-6 w-6 animate-spin text-[#6b7280]" />
      ) : (
        <>
          <Upload className="mb-2 h-6 w-6 text-[#9ca3af]" />
          <p className="text-xs text-[#6b7280]">Drop images here or click to upload</p>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        onChange={async (e) => {
          if (e.target.files?.length) await handleFiles(e.target.files)
          e.target.value = ""
        }}
      />
    </div>
  )
}

export default function OurWorksManager() {
  const router = useRouter()

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [featuredFilter, setFeaturedFilter] = useState("")
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 10, total: 0, totalPages: 1 })
  const [appliedSearch, setAppliedSearch] = useState("")
  const [appliedStatus, setAppliedStatus] = useState("")
  const [appliedFeatured, setAppliedFeatured] = useState("")

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string | null>(null)
  const [viewing, setViewing] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState<Project | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [slugAuto, setSlugAuto] = useState(true)
  const [coverUploading, setCoverUploading] = useState(false)
  const [galleryUploading, setGalleryUploading] = useState(false)

  const fetchProjects = useCallback(async () => {
    const params = new URLSearchParams({ division: DIVISION, admin: "true", page: String(page), limit: "10" })
    if (appliedSearch) params.set("search", appliedSearch)
    if (appliedStatus) params.set("status", appliedStatus)
    if (appliedFeatured) params.set("featured", appliedFeatured)

    const res = await fetch(`/api/our-works?${params}`)
    if (!res.ok) {
      if (res.status === 401) router.push("/admin")
      throw new Error("Failed to fetch")
    }
    return res.json() as Promise<{ projects: Project[]; pagination: Pagination }>
  }, [page, appliedSearch, appliedStatus, appliedFeatured, router])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const data = await fetchProjects()
        if (!cancelled) { setProjects(data.projects); setPagination(data.pagination) }
      } catch { /* silent */ }
      if (!cancelled) setLoading(false)
    })()
    return () => { cancelled = true }
  }, [fetchProjects])

  const handleView = (p: Project) => setViewing(p)

  const openCreate = () => {
    setForm(emptyForm)
    setEditing(null)
    setSlugAuto(true)
    setShowForm(true)
  }

  const openEdit = (p: Project) => {
    setForm({
      title: p.title || "",
      slug: p.slug || "",
      shortDescription: p.shortDescription || "",
      description: p.description || "",
      location: p.location || "",
      status: p.status || "Ongoing",
      coverImage: p.coverImage || "",
      galleryImages: p.galleryImages || [],
      featured: p.featured || false,
      published: p.published !== false,
      displayOrder: p.displayOrder || 0,
    })
    setEditing(p._id || p.id)
    setSlugAuto(false)
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.title.trim()) { alert("Title is required"); return }
    setSaving(true)
    try {
      const body = {
        ...form,
        title: form.title.trim(),
        slug: form.slug.trim() || slugify(form.title),
        displayOrder: Number(form.displayOrder) || 0,
      }
      const res = editing
        ? await fetch(`/api/our-works/${editing}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
        : await fetch("/api/our-works", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })

      if (!res.ok) {
        const err = await res.json()
        alert(err.error || "Failed to save")
        return
      }
      setShowForm(false)
      const data = await fetchProjects()
      setProjects(data.projects)
      setPagination(data.pagination)
    } catch { alert("Failed to save") } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!deleting) return
    setSaving(true)
    try {
      const res = await fetch(`/api/our-works/${deleting._id || deleting.id}`, { method: "DELETE" })
      if (!res.ok) { alert("Failed to delete"); return }
      setDeleting(null)
      const data = await fetchProjects()
      setProjects(data.projects)
      setPagination(data.pagination)
    } catch { alert("Failed to delete") } finally { setSaving(false) }
  }

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" })
    router.push("/admin")
  }

  const applyFilters = () => {
    setPage(1)
    setAppliedSearch(search)
    setAppliedStatus(statusFilter)
    setAppliedFeatured(featuredFilter)
  }

  const addGalleryImage = (url: string) => setForm((f) => ({ ...f, galleryImages: [...f.galleryImages, url] }))
  const removeGalleryImage = (index: number) => setForm((f) => ({ ...f, galleryImages: f.galleryImages.filter((_, i) => i !== index) }))

  return (
    <main className="min-h-screen bg-[#f8f7f4]">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e5e7eb] bg-white px-6 py-4"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/admin/dashboard"
            className="rounded border border-[#e5e7eb] px-3 py-1.5 text-[10px] font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
          >
            &larr; Back
          </Link>
          <div>
            <h1 className="text-lg font-bold text-[#0f172a]">Our Works</h1>
            <p className="text-xs text-[#6b7280]">Manage portfolio projects</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openCreate}
            className="flex items-center gap-1.5 rounded bg-[#b8860b] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#a0760a]"
          >
            <Plus className="h-3.5 w-3.5" /> Add Project
          </motion.button>
          <button onClick={handleLogout} className="rounded-lg border border-[#e5e7eb] px-4 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]">
            Logout
          </button>
        </div>
      </motion.header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
              placeholder="Search projects..."
              className="h-10 w-full border border-[#e5e7eb] bg-white pl-9 pr-4 text-sm text-[#0f172a] outline-none focus:border-[#111827]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 border border-[#e5e7eb] bg-white px-3 text-sm text-[#0f172a] outline-none focus:border-[#111827]"
          >
            <option value="">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
          </select>
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="h-10 border border-[#e5e7eb] bg-white px-3 text-sm text-[#0f172a] outline-none focus:border-[#111827]"
          >
            <option value="">All</option>
            <option value="true">Featured</option>
            <option value="false">Not Featured</option>
          </select>
          <button
            onClick={applyFilters}
            className="flex h-10 items-center gap-1.5 rounded bg-[#0f172a] px-4 text-xs font-bold text-white transition hover:bg-[#1e293b]"
          >
            <Search className="h-3.5 w-3.5" /> Apply
          </button>
        </motion.div>

        {loading ? (
          <div className="overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e5e7eb] bg-[#f8f7f4]">
                <tr>
                  {["Cover", "Title", "Description", "Location", "Status", "Actions"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold text-[#0f172a]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
              </tbody>
            </table>
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-xl border border-[#e5e7eb] bg-white px-6 py-20"
          >
            <ImageOff className="mb-4 h-12 w-12 text-[#d1d5db]" />
            <p className="text-sm font-medium text-[#6b7280]">No projects found</p>
            <p className="mt-1 text-xs text-[#9ca3af]">Click &quot;Add Project&quot; to create one.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto rounded-xl border border-[#e5e7eb] bg-white shadow-sm"
          >
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#e5e7eb] bg-[#f8f7f4]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Cover</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Title</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Description</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Location</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Status</th>
                  <th className="px-4 py-3 font-semibold text-[#0f172a]">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {projects.map((p, i) => (
                    <motion.tr
                      key={p._id || p.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-[#e5e7eb] last:border-0 transition-colors hover:bg-[#fafaf9]"
                    >
                      <td className="px-4 py-3">
                        {p.coverImage ? (
                          <img
                            src={p.coverImage}
                            alt=""
                            className="h-12 w-16 rounded object-cover border border-[#e5e7eb]"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded border border-[#e5e7eb] bg-[#f0f0f0]">
                            <ImageOff className="h-4 w-4 text-[#d1d5db]" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#0f172a]">{p.title}</div>
                        <div className="text-[10px] text-[#9ca3af]">/{p.slug}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="block max-w-[200px] truncate text-[#6b7280]">
                          {p.shortDescription || p.description || "\u2014"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#6b7280]">{p.location || "\u2014"}</td>
                      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleView(p)}
                            className="rounded border border-[#e5e7eb] p-1.5 text-[#6b7280] transition hover:bg-[#f8f7f4] hover:text-[#0f172a]"
                            title="View"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => openEdit(p)}
                            className="rounded bg-[#0f172a] p-1.5 text-white transition hover:bg-[#1e293b]"
                            title="Edit"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleting(p)}
                            className="rounded border border-red-200 p-1.5 text-red-500 transition hover:bg-red-50"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}

        {pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex items-center justify-center gap-2"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#e5e7eb] bg-white text-[#6b7280] transition hover:bg-[#f8f7f4] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-8 w-8 items-center justify-center rounded text-xs font-semibold transition ${
                  p === page ? "bg-[#0f172a] text-white" : "border border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-[#f8f7f4]"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              className="flex h-8 w-8 items-center justify-center rounded border border-[#e5e7eb] bg-white text-[#6b7280] transition hover:bg-[#f8f7f4] disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-12"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0f172a]">{editing ? "Edit Project" : "Add Project"}</h2>
                <button onClick={() => setShowForm(false)} className="rounded p-1 text-[#6b7280] transition hover:bg-[#f8f7f4]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Title *</label>
                    <input
                      value={form.title}
                      onChange={(e) => {
                        setForm({ ...form, title: e.target.value })
                        if (slugAuto) setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))
                      }}
                      className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Slug</label>
                    <input
                      value={form.slug}
                      onChange={(e) => { setForm({ ...form, slug: e.target.value }); setSlugAuto(false) }}
                      className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing</option>
                      <option value="Upcoming">Upcoming</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Location</label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Display Order</label>
                    <input
                      type="number"
                      value={form.displayOrder}
                      onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                      className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                    />
                  </div>
                  <div className="flex items-center gap-6 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="h-4 w-4 accent-[#111827]"
                      />
                      <span className="text-xs font-semibold text-[#6b7280]">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.published}
                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                        className="h-4 w-4 accent-[#111827]"
                      />
                      <span className="text-xs font-semibold text-[#6b7280]">Published</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Short Description</label>
                  <textarea
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    rows={2}
                    className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Full Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-[#111827]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Cover Image</label>
                  {form.coverImage ? (
                    <div className="relative mb-2 inline-block">
                      <img src={form.coverImage} alt="Cover" className="h-28 w-44 rounded border border-[#e5e7eb] object-cover" />
                      <button
                        onClick={() => setForm({ ...form, coverImage: "" })}
                        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white shadow"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <DropZone onUpload={(url) => setForm({ ...form, coverImage: url })} uploading={coverUploading} />
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Gallery Images</label>
                  {form.galleryImages.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {form.galleryImages.map((url, i) => (
                        <div key={i} className="relative">
                          <img src={url} alt="" className="h-16 w-20 rounded border border-[#e5e7eb] object-cover" />
                          <button
                            onClick={() => removeGalleryImage(i)}
                            className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white shadow"
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <DropZone onUpload={addGalleryImage} uploading={galleryUploading} multiple />
                </div>
              </div>

              <div className="mt-6 flex gap-3 border-t border-[#e5e7eb] pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded bg-[#0f172a] px-6 py-2 text-xs font-bold text-white transition hover:bg-[#1e293b] disabled:opacity-50"
                >
                  {saving ? "Saving..." : editing ? "Update Project" : "Create Project"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="rounded border border-[#e5e7eb] px-6 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setViewing(null) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-bold text-[#0f172a]">Project Details</h2>
                <button onClick={() => setViewing(null)} className="rounded p-1 text-[#6b7280] hover:bg-[#f8f7f4]">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                {viewing.coverImage && (
                  <img src={viewing.coverImage} alt="" className="mb-3 w-full rounded-lg border border-[#e5e7eb] object-cover max-h-48" />
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Title</span><p className="text-[#0f172a]">{viewing.title}</p></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Slug</span><p className="text-[#0f172a]">/{viewing.slug}</p></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Status</span><StatusBadge status={viewing.status} /></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Location</span><p className="text-[#0f172a]">{viewing.location || "\u2014"}</p></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Featured</span><p className="text-[#0f172a]">{viewing.featured ? "Yes" : "No"}</p></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Published</span><p className="text-[#0f172a]">{viewing.published ? "Yes" : "No"}</p></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Order</span><p className="text-[#0f172a]">{viewing.displayOrder}</p></div>
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Division</span><p className="text-[#0f172a]">{viewing.division}</p></div>
                </div>
                {viewing.shortDescription && (
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Short Description</span><p className="mt-0.5 text-[#6b7280]">{viewing.shortDescription}</p></div>
                )}
                {viewing.description && (
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Full Description</span><p className="mt-0.5 whitespace-pre-wrap text-[#6b7280]">{viewing.description}</p></div>
                )}
                {viewing.galleryImages && viewing.galleryImages.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Gallery ({viewing.galleryImages.length})</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {viewing.galleryImages.map((url, i) => (
                        <img key={i} src={url} alt="" className="h-16 w-20 rounded border border-[#e5e7eb] object-cover" />
                      ))}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#e5e7eb]">
                  <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Created</span><p className="text-[#0f172a]">{new Date(viewing.createdAt).toLocaleDateString()}</p></div>
                  {viewing.updatedAt && <div><span className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">Updated</span><p className="text-[#0f172a]">{new Date(viewing.updatedAt).toLocaleDateString()}</p></div>}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={() => setViewing(null)} className="rounded bg-[#0f172a] px-4 py-2 text-xs font-bold text-white">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setDeleting(null) }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-xl"
            >
              <h2 className="mb-2 text-base font-bold text-[#0f172a]">Delete Project</h2>
              <p className="mb-6 text-sm text-[#6b7280]">
                Are you sure you want to delete &quot;<strong>{deleting.title}</strong>&quot;? This will also remove all uploaded images.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleting(null)}
                  className="rounded border border-[#e5e7eb] px-4 py-2 text-xs font-semibold text-[#6b7280] transition hover:bg-[#f8f7f4]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  className="rounded bg-red-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {saving ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
