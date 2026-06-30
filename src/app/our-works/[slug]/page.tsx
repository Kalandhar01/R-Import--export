import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { getProjectBySlug, getProjectsByDivision } from "@/lib/our-works"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: "Project Not Found | RACTYSH EXIM PVT LTD" }
  return {
    title: `${project.title} | RACTYSH EXIM PVT LTD`,
    description: project.shortDescription || project.description,
    openGraph: {
      title: `${project.title} | RACTYSH EXIM PVT LTD`,
      description: project.shortDescription || project.description,
      images: project.coverImage ? [{ url: project.coverImage }] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const all = await getProjectsByDivision("Import Export")
  const related = all.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="px-5 pb-20 pt-24 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Link href="/our-works" className="group mb-12 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-slate-700">
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Works</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-16 aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-100"
          >
            {project.coverImage && (
              <img src={project.coverImage} alt={project.title} className="h-full w-full object-cover" />
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16 grid gap-10 lg:grid-cols-2 lg:items-start"
          >
            <div>
              <span className="mb-4 inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                {project.division}
              </span>
              <h1 className="mt-2 text-4xl font-bold tracking-tight">{project.title}</h1>
              {project.location && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin className="h-4 w-4" /> {project.location}
                </p>
              )}
            </div>
            <div>
              <p className="text-base leading-relaxed text-slate-600">
                {project.shortDescription || project.description}
              </p>
            </div>
          </motion.div>

          {project.galleryImages && project.galleryImages.length > 1 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="mb-6 text-2xl font-bold tracking-tight">Project Gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.galleryImages.slice(1).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
                  >
                    <img src={img} alt={`${project.title} ${i + 2}`} className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {related.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border-t border-slate-200 pt-16"
            >
              <h2 className="mb-2 text-3xl font-bold tracking-tight">Related Projects</h2>
              <p className="mb-10 text-slate-500">Explore more projects from our portfolio.</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.08 }}
                  >
                    <Link href={`/our-works/${item.slug}`} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                        {item.coverImage && (
                          <img src={item.coverImage} alt={item.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold leading-tight tracking-tight text-slate-950">{item.title}</h3>
                        {item.location && <p className="mt-1 text-sm text-slate-500">{item.location}</p>}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </section>
    </main>
  )
}
