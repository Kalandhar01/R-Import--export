import type { Metadata } from "next"
import Link from "next/link"
import { getProjectsByDivision } from "@/lib/our-works"
import { motion } from "framer-motion"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Our Works | RACTYSH EXIM PVT LTD",
  description: "Explore our portfolio of import, export, and logistics projects.",
}

interface ProjectItem {
  id: string
  title: string
  slug: string
  location: string
  description: string
  division: string
  coverImage: string
  galleryImages: string[]
}

export default async function OurWorksPage() {
  const raw = await getProjectsByDivision("Import Export")
  const projects: ProjectItem[] = raw.map((p) => ({
    id: p._id, title: p.title, slug: p.slug, location: p.location,
    description: p.shortDescription || p.description, division: p.division,
    coverImage: p.coverImage, galleryImages: p.galleryImages,
  }))

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="px-5 pb-20 pt-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Our Works</h1>
            <p className="mb-12 max-w-2xl text-lg text-slate-500">
              Import, export, and logistics projects delivered across global markets.
            </p>
          </motion.div>
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-16 text-center"
            >
              <p className="text-sm font-medium text-slate-500">No projects are available yet.</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                >
                  <Link href={`/our-works/${project.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                      {project.coverImage && (
                        <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-950">{project.title}</h3>
                      {project.location && <p className="mt-1 text-sm text-slate-500">{project.location}</p>}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
