"use client"

import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  Archive,
  ArrowLeft,
  Broadcast,
  CaretLeft,
  CaretRight,
  ChartBar,
  Code,
  GithubLogo,
  Globe,
  GraphIcon,
  Tag,
  Trophy,
} from "@phosphor-icons/react"
import { projects } from "@/data/project_data"
import { Button } from "@/components/ui/button"
import { hideNavbar, showNavbar } from "@/lib/store"

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
})

// --- LOADER COMPONENT ---
function SystemLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background font-mono"
    >
      <div className="relative w-64 space-y-4">
        <div className="flex justify-between text-[10px] text-primary uppercase">
          <span className="animate-pulse">Initializing_Link...</span>
          <span>[74%]</span>
        </div>
        <div className="relative h-[2px] w-full bg-primary/20">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full w-full origin-left bg-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2 opacity-40">
          {["CORE", "MEM", "UPLINK", "GPU"].map((s) => (
            <span key={s} className="border border-primary px-1 text-[8px]">
              {s}
            </span>
          ))}
        </div>
      </div>
      {/* SCANLINE EFFECT */}
      <motion.div
        animate={{ y: ["0%", "1000%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary/20 blur-sm"
      />
    </motion.div>
  )
}

function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const activeProject = projects.find((p) => p.id === selectedId)

  useEffect(() => {
    if (selectedId !== null) hideNavbar()
    else showNavbar()
    return () => showNavbar()
  }, [selectedId])

  const handleProjectSelect = (id: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedId(id)
      setCurrentIndex(0)
      setIsLoading(false)
    }, 800) // Artificial delay for the loader aesthetic
  }

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!activeProject) return
    setCurrentIndex((prev) =>
      prev === activeProject.imgs.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!activeProject) return
    setCurrentIndex((prev) =>
      prev === 0 ? activeProject.imgs.length - 1 : prev - 1
    )
  }

  return (
    <main
      onMouseMove={(e) => setMousePos({ x: e.clientX / 50, y: e.clientY / 50 })}
      className="relative min-h-screen w-full overflow-x-hidden bg-background font-mono text-foreground"
    >
      <AnimatePresence>{isLoading && <SystemLoader />}</AnimatePresence>

      {/* DECORATIVE GRID */}
      <motion.div
        style={{ x: mousePos.x, y: mousePos.y }}
        className="pointer-events-none fixed inset-[-5%] z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] md:bg-[size:60px_60px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-24">
        <AnimatePresence mode="wait">
          {!activeProject ? (
            <motion.section
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <header className="mb-12 border-b border-primary/20 pb-8">
                <div className="mb-4 flex items-center gap-2 text-[11px] tracking-[0.4em] text-primary/80 uppercase">
                  <Archive size={14} /> // ROOT/SYSTEM/PROJECTS
                </div>
                <h1 className="text-5xl leading-[0.9] font-normal tracking-tighter text-primary uppercase sm:text-7xl md:text-9xl">
                  Project <span className="text-foreground/20">INDEX</span>
                </h1>
              </header>

              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
                  {projects.map((project) => (
                    <motion.div
                      key={project.id}
                      onClick={() => handleProjectSelect(project.id)}
                      whileHover={{ y: -5 }}
                      className="group relative cursor-pointer border border-primary/30 bg-primary/[0.04] p-4 transition-all hover:border-primary/80"
                    >
                      <div className="absolute top-0 left-0 size-3 border-t border-l border-primary group-hover:bg-primary/10" />
                      <div className="absolute right-0 bottom-0 size-3 border-r border-b border-primary group-hover:bg-primary/10" />

                      <div className="mb-4 aspect-video overflow-hidden bg-black">
                        <img
                          src={project.cover}
                          alt=""
                          className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      </div>

                      <div className="flex items-end justify-between">
                        <h3 className="text-2xl leading-none font-normal tracking-tight text-primary uppercase">
                          {project.title}
                        </h3>
                        <span className="text-[11px] font-medium text-primary/60">
                          0x{project.id}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* SIDEBAR RENDERED IN GRID VIEW */}
                <aside className="hidden w-72 flex-col gap-6 lg:flex">
                  <div className="border border-primary/30 bg-primary/[0.02] p-4">
                    <div className="mb-4 flex items-center gap-2 text-[10px] tracking-widest text-primary uppercase">
                      <GraphIcon size={14} /> Global_Metrics
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "NET_STABILITY", val: "99.2%" },
                        { label: "CORE_LOAD", val: "24.0%" },
                        { label: "LATENCY", val: "12ms" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex justify-between border-b border-primary/10 pb-1"
                        >
                          <span className="text-[9px] text-primary/80 uppercase">
                            {item.label}
                          </span>
                          <span className="text-[9px] text-primary">
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 lg:space-y-12"
            >
              {/* HEADER NAV */}
              <nav className="flex items-center justify-between border-b border-primary/30 pb-6">
                <button
                  onClick={() => handleProjectSelect(null as any)}
                  className="group flex items-center gap-3 text-[11px] font-normal text-primary transition-colors hover:text-primary/70"
                >
                  <ArrowLeft
                    size={18}
                    className="transition-transform group-hover:-translate-x-1"
                  />
                  _EXIT_STREAM
                </button>
                <div className="hidden text-[10px] font-normal tracking-widest text-primary uppercase sm:block">
                  NODE_ID::0x{activeProject.id}F4
                </div>
              </nav>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* LEFT: MEDIA */}
                <div className="space-y-6 lg:col-span-7">
                  <div className="group relative aspect-video overflow-hidden border border-primary/30 bg-black">
                    <div className="absolute inset-x-0 top-1/2 z-40 flex -translate-y-1/2 justify-between px-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        onClick={prevSlide}
                        className="border border-primary/20 bg-black/90 p-4 text-primary hover:bg-primary hover:text-black"
                      >
                        <CaretLeft size={20} />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="border border-primary/20 bg-black/90 p-4 text-primary hover:bg-primary hover:text-black"
                      >
                        <CaretRight size={20} />
                      </button>
                    </div>
                    <img
                      src={activeProject.imgs[currentIndex]}
                      className="h-full w-full object-contain md:object-cover"
                      alt=""
                    />
                    <div className="absolute bottom-3 left-3 border border-primary/40 bg-black/90 px-3 py-1.5 text-[10px] tracking-tighter text-primary uppercase">
                      BUFF_{currentIndex + 1} / {activeProject.imgs.length}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    {activeProject.git && (
                      <Button
                        asChild
                        variant="outline"
                        className="h-14 flex-1 rounded-none border-primary/40 bg-primary/10 text-[10px] font-normal tracking-[0.2em] uppercase hover:bg-primary hover:text-black"
                      >
                        <a href={activeProject.git} target="_blank">
                          <GithubLogo size={18} className="mr-2" /> SOURCE_CORE
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="h-14 flex-1 rounded-none border-primary/40 bg-primary/10 text-[10px] font-normal tracking-[0.2em] uppercase hover:bg-primary hover:text-black"
                    >
                      <Globe size={18} className="mr-2" /> LIVE_UPLINK
                    </Button>
                  </div>
                </div>

                {/* RIGHT: DATA */}
                <div className="flex flex-col gap-6 lg:col-span-5">
                  <header className="space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-normal text-primary uppercase">
                      <Tag size={12} weight="fill" /> {activeProject.date}{" "}
                      <span className="text-primary/40">//</span>{" "}
                      {activeProject.role}
                    </div>
                    <h2 className="text-4xl leading-[0.95] font-normal tracking-tighter text-primary uppercase sm:text-6xl lg:text-7xl">
                      {activeProject.title}
                    </h2>
                  </header>

                  {/* AWARDS SECTION */}
                  {activeProject.awards && activeProject.awards.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {activeProject.awards.map((award, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 border border-primary/30 bg-primary/20 p-3"
                        >
                          <Trophy
                            size={20}
                            className="text-primary"
                            weight="fill"
                          />
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-primary uppercase">
                              {award.title}
                            </span>
                            <span className="text-[9px] text-primary/60 uppercase">
                              {award.organization}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="border-l border-primary bg-primary/[0.05] p-5">
                    <p className="text-sm leading-relaxed text-primary uppercase">
                      {activeProject.description}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="border border-primary/30 bg-primary/[0.02] p-4">
                      <div className="mb-4 flex items-center gap-2 text-[10px] font-normal text-primary uppercase">
                        <ChartBar size={14} /> METRICS
                      </div>
                      <div className="space-y-4">
                        {activeProject.metrics.map((m) => (
                          <div key={m.label} className="space-y-1">
                            <div className="flex justify-between text-[10px] text-primary uppercase">
                              <span>{m.label}</span>
                              <span>{m.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-primary/20">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${m.value}%` }}
                                className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-primary/30 bg-primary/[0.02] p-4">
                      <div className="mb-3 flex items-center gap-2 text-[10px] text-primary uppercase">
                        <Code size={14} /> TECH_STACK
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.features.map((f) => (
                          <span
                            key={f}
                            className="border border-primary/40 bg-primary/10 px-3 py-1 text-[9px] font-medium text-primary"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default ProjectsPage
