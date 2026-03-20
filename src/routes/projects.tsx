"use client"

import { useEffect, useMemo, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  CircleHalfIcon,
  Cpu,
  GithubLogo,
  Globe,
  GraphIcon,
  Medal,
  Receipt,
  ShieldCheck,
  Target,
  Trophy,
} from "@phosphor-icons/react"
import { projects } from "@/data/projects"
import { Button } from "@/components/ui/button"
import { hideNavbar, showNavbar } from "@/lib/store"
import { cn } from "@/lib/utils"

// Loaders
import { DataUplink, SystemLoader } from "@/components/Loader"

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
})

const ProjectCard = ({ project, index, onSelect }: any) => {
  const sysStatus = project.id % 2 === 0 ? "STABLE" : "SYNC"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 100 }}
      onClick={() => onSelect(project.id)}
      // Fixed height for consistency across the grid
      className="group relative flex h-40 cursor-pointer flex-row overflow-hidden border border-primary/20 bg-background shadow-lg transition-all duration-300 hover:border-primary/80 hover:bg-primary/[0.03] hover:shadow-primary/10 md:h-56"
    >
      {/* 1. LEFT DATA STRIP */}
      <div className="relative z-20 flex w-10 flex-col items-center justify-between border-r border-primary/20 bg-primary/5 py-4 md:w-14">
        <div className="flex flex-col gap-1 opacity-40">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-1 w-1 bg-primary" />
          ))}
        </div>
        <span className="rotate-180 text-[9px] tracking-[0.5em] text-primary/30 uppercase [writing-mode:vertical-lr]">
          PRJ_{project.id.toString().padStart(2, "0")}
        </span>
        <div className="animate-pulse text-[7px] text-primary uppercase">
          {sysStatus}
        </div>
      </div>

      {/* 2. MAIN INFO BLOCK - Flex-1 to take available space */}
      <div className="relative z-10 flex flex-1 flex-col justify-center overflow-hidden px-4 md:px-8">
        <div className="absolute top-2 left-2 h-2 w-2 border-t border-l border-primary/40 transition-colors group-hover:border-primary" />

        <div className="mb-1 flex items-center gap-2">
          <Target
            size={12}
            className="text-primary/60 transition-all group-hover:rotate-90 group-hover:text-primary"
          />
          <span className="truncate text-[8px] tracking-[0.2em] text-primary/40 uppercase">
            {project.role}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl leading-tight tracking-tighter text-primary/90 uppercase transition-colors group-hover:text-foreground md:text-3xl">
          {project.title}
        </h3>

        {/* Tactical visual bit-bar */}
        <div className="mt-3 flex h-0.5 w-full overflow-hidden bg-primary/10">
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: "0%" }}
            className="h-full w-1/2 bg-primary/40"
          />
        </div>
      </div>

      {/* 3. IMAGE PREVIEW PANEL - Fixed width to keep grid symmetric */}
      <div className="relative w-32 shrink-0 overflow-hidden border-l border-primary/20 bg-black md:w-44 lg:w-56">
        {/* Overlay Layers */}
        <div className="absolute inset-0 z-10 bg-primary/5 transition-colors duration-500 group-hover:bg-transparent" />
        <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_30%,black_120%)]" />

        {/* The Scanline */}
        <motion.div
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 z-30 h-px bg-primary/40 shadow-[0_0_8px_var(--primary)]"
        />

        <img
          src={project.cover}
          alt={project.title}
          className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />

        {/* Corner Decal */}
        <div className="absolute right-1 bottom-1 z-30 text-[7px] text-primary/40">
          IMG_SRC.0{index + 1}
        </div>
      </div>
    </motion.div>
  )
}
// --- MAIN PAGE ---

export default function ProjectsPage() {
  const [isBooting, setIsBooting] = useState(true)
  const [isUplinking, setIsUplinking] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [pendingId, setPendingId] = useState<number | null>(null)
  const [loaderMode, setLoaderMode] = useState<"uplink" | "downlink">("uplink")
  const [filter, setFilter] = useState<string>("ALL")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [time, setTime] = useState("")
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const activeProject = projects.find((p) => p.id === selectedId)
  const filteredProjects = useMemo(
    () =>
      filter === "ALL" ? projects : projects.filter((p) => p.tag === filter),
    [filter]
  )

  const handleProjectSelect = (id: number | null) => {
    setPendingId(id)
    setLoaderMode(id === null ? "downlink" : "uplink")
    setIsUplinking(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-mono text-foreground selection:bg-primary/30">
      {/* GLOBAL HUD */}
      <div className="pointer-events-none fixed inset-0 z-50 hidden flex-col justify-between p-12 antialiased md:flex lg:p-16">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-1">
            {selectedId ? (
              <button
                onClick={() => handleProjectSelect(null)}
                className="group pointer-events-auto flex items-center gap-4 transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center border border-primary/20 bg-primary/5 transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-background">
                  <CaretLeft size={20} weight="bold" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] font-black tracking-[0.2em] text-primary uppercase group-hover:text-foreground">
                    Return_to_Archive
                  </span>
                  <span className="text-[7px] text-primary/40 uppercase">
                    SCTR_FILE_CLOSE // 0xFD
                  </span>
                </div>
              </button>
            ) : (
              <div className="flex flex-col">
                <span className="text-[10px] leading-none tracking-[0.4em] text-primary uppercase">
                  SCTR_COORDS: 62.8925° N, 27.6770° E
                </span>
                <span className="mt-1 text-[8px] text-muted-foreground uppercase opacity-40">
                  INDEX_ROOT_VERIFIED
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col items-end">
            <span className="animate-pulse text-[10px] tracking-[0.4em] text-primary italic">
              {selectedId ? "DATA_STREAM_ACTIVE" : "UPLINK_STABLE"}
            </span>
            <p className="text-[12px] text-foreground tabular-nums">{time}</p>
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-[10px] tracking-[0.5em] text-primary uppercase">
            PIXLIZED_OS_v1.0.4 // {selectedId ? "EXPLORER" : "ARCHIVE"}
          </span>
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck size={16} weight="bold" />
            <span className="text-[10px] uppercase opacity-60">
              Secure_Uplink
            </span>
          </div>
        </div>
      </div>

      {/* LOADERS */}
      <AnimatePresence mode="wait">
        {isBooting && (
          <SystemLoader key="boot" onComplete={() => setIsBooting(false)} />
        )}
        {isUplinking && (
          <DataUplink
            key="uplink-transition"
            mode={loaderMode}
            onComplete={() => {
              setSelectedId(pendingId)
              setIsUplinking(false)
              setCurrentIndex(0)
              if (containerRef) containerRef.scrollTo(0, 0)
            }}
          />
        )}
      </AnimatePresence>

      {/* CONTENT */}
      {!isBooting && !isUplinking && (
        <div
          ref={setContainerRef}
          className="hide-scrollbar relative z-10 h-screen w-full overflow-y-auto scroll-smooth"
        >
          <div className="mx-auto w-full max-w-6xl px-5 pt-20 pb-24 md:px-10 md:pt-44">
            <AnimatePresence mode="wait">
              {!selectedId ? (
                <motion.section
                  key="archive-grid"
                  initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 10, filter: "blur(4px)" }}
                  className="space-y-6"
                >
                  <header className="relative flex flex-col gap-8 border-b border-primary/20 pb-10 md:flex-row md:items-end md:justify-between">
                    <div className="relative space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse bg-primary" />
                        <span className="text-[10px] tracking-[0.5em] text-primary/60 uppercase">
                          Archive_System // v1.0.4
                        </span>
                      </div>
                      <h1 className="text-4xl tracking-tighter text-primary uppercase md:text-6xl">
                        PROJECTS REPOSITORY
                      </h1>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["ALL", "WEB", "GAME", "MOBILE"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setFilter(label)}
                          className={cn(
                            "group relative border px-6 py-2 transition-all duration-300",
                            filter === label
                              ? "border-primary bg-primary text-background shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                              : "border-primary/20 bg-primary/5 text-primary/40 hover:border-primary/60 hover:text-primary"
                          )}
                        >
                          <span className="relative z-10 text-[10px] tracking-[0.3em] uppercase">
                            {label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </header>

                  <motion.div
                    className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                    variants={{
                      show: { transition: { staggerChildren: 0.05 } },
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {filteredProjects.map((p, i) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        index={i}
                        onSelect={handleProjectSelect}
                      />
                    ))}
                  </motion.div>
                </motion.section>
              ) : (
                <motion.section
                  key={`detail-${selectedId}`}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  className="space-y-8 md:space-y-16"
                >
                  <div className="mb-4 flex md:hidden">
                    <button
                      onClick={() => handleProjectSelect(null)}
                      className="group flex items-center gap-3 text-primary uppercase"
                    >
                      <div className="flex h-8 w-8 items-center justify-center border border-primary/20 bg-primary/5 transition-all group-hover:bg-primary group-hover:text-background">
                        <CaretLeft size={16} weight="bold" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.2em]">
                        BACK_TO_ARCHIVE
                      </span>
                    </button>
                  </div>
                  {activeProject && (
                    <ProjectDetailView
                      project={activeProject}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                    />
                  )}
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}

const ProjectDetailView = ({ project, currentIndex, setCurrentIndex }: any) => {
  // --- NAVBAR CONTROL LOGIC ---
  useEffect(() => {
    // Hide navbar when this project detail is mounted
    hideNavbar()

    // Cleanup function: Show navbar when the user leaves the project detail
    return () => {
      showNavbar()
    }
  }, []) // Empty dependency array ensures this only runs on mount/unmount

  const nextImage = () =>
    setCurrentIndex((prev: number) => (prev + 1) % project.imgs.length)
  const prevImage = () =>
    setCurrentIndex(
      (prev: number) => (prev - 1 + project.imgs.length) % project.imgs.length
    )

  const getEmbedUrl = (url: string) => {
    if (!url) return ""
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&rel=0&modestbranding=1`
      : url
  }

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 selection:bg-primary/30">
      {/* HEADER: SECTOR IDENTIFICATION */}
      <header className="relative flex flex-col items-center justify-center space-y-6 pt-2 pb-0 text-center">
        <div className="absolute top-0 left-1/2 hidden -translate-x-1/2 gap-64 opacity-30 md:flex">
          <div className="h-6 w-6 border-t-2 border-l-2 border-primary" />
          <div className="h-6 w-6 border-t-2 border-r-2 border-primary" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 font-mono text-[10px] tracking-[0.6em] text-primary/60 uppercase"
        >
          <span className="text-primary/20">{"[::]"}</span>
          <span>
            RECORDS_ARCHIVE_0x{project.id.toString().padStart(2, "0")}
          </span>
          <span className="text-primary/20">{"[::]"}</span>
        </motion.div>

        <h2 className="max-w-5xl text-2xl tracking-tight text-foreground uppercase sm:text-4xl lg:text-6xl">
          {project.title}
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {project.tech.split(",").map((t: string, i: number) => (
            <span
              key={i}
              className="border border-primary/30 bg-primary/[0.03] px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-foreground uppercase transition-colors hover:bg-primary/10"
            >
              {t.trim()}
            </span>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* LEFT COLUMN: VISUAL ENGINE */}
        <div className="space-y-12 lg:col-span-7">
          <div className="group relative overflow-hidden border border-primary/20 bg-primary/[0.02] shadow-2xl">
            <div className="pointer-events-none absolute inset-0 z-20 border-[8px] border-transparent p-4">
              <div className="flex h-full w-full flex-col justify-between border border-primary/10 p-2">
                <div className="flex justify-between text-[8px] font-bold text-primary/40">
                  <span>REC_00:0{currentIndex}</span>
                  <span>720P_60FPS</span>
                </div>
                <div className="flex justify-between text-[8px] font-bold text-primary/40">
                  <span>SENSOR_ACTIVE</span>
                  <span>0x{project.id}FF</span>
                </div>
              </div>
            </div>

            {project.is_video && project.video_url ? (
              <div className="relative aspect-video w-full overflow-hidden">
                <iframe
                  src={getEmbedUrl(project.video_url)}
                  title={project.title}
                  className="absolute inset-0 h-full w-full opacity-95 brightness-[0.95] contrast-[1.1]"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative aspect-video overflow-hidden bg-black">
                <button
                  onClick={prevImage}
                  className="absolute inset-y-0 left-0 z-30 px-6 text-primary/20 transition-all hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  <CaretLeft size={32} weight="bold" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute inset-y-0 right-0 z-30 px-6 text-primary/20 transition-all hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  <CaretRight size={32} weight="bold" />
                </button>
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.9, scale: 1 }}
                  src={project.imgs[currentIndex]}
                  className="h-full w-full object-cover grayscale-[0.2]"
                  alt="Project Metadata"
                />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-black tracking-widest text-primary/60 uppercase">
                Core_Logic_Modules
              </span>
              <div className="h-[1px] flex-1 bg-primary/20" />
            </div>

            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.features.map((feature: string, idx: number) => (
                <li
                  key={idx}
                  className="group relative flex items-center gap-4 border border-primary/10 bg-foreground/[0.02] p-5 transition-all hover:border-primary/40 hover:bg-primary/[0.02]"
                >
                  <span className="font-mono text-xs font-bold text-primary">
                    {idx + 1}.
                  </span>
                  <span className="text-[13px] font-black tracking-wide text-foreground uppercase">
                    {feature}
                  </span>
                  <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-primary/20 transition-all group-hover:border-primary" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS & DEPLOYMENT */}
        <div className="space-y-12 lg:col-span-5">
          <section className="relative space-y-10 border-l-2 border-primary/30 py-4 pl-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Receipt size={18} className="text-primary/60" />
                <h3 className="font-mono text-xs font-black tracking-[0.5em] text-primary/60 uppercase">
                  Project_Manifesto
                </h3>
              </div>
              <p className="text-base leading-relaxed font-bold text-foreground/80 lg:text-lg">
                {project.description}
              </p>
            </div>

            <div className="space-y-6">
              {project.metrics.map((metric: any, idx: number) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between font-mono text-[10px] font-black text-foreground/50 uppercase">
                    <span>{metric.label}</span>
                    <span className="text-primary">[{metric.value}%]</span>
                  </div>
                  <div className="relative h-2 w-full bg-primary/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 2, ease: "circOut" }}
                      className="h-full bg-primary shadow-[0_0_10px_var(--primary)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <Button className="group relative h-16 rounded-none bg-primary px-8 text-xs font-black tracking-[0.8em] text-background hover:bg-primary/90">
              <span className="relative z-10">INITIALIZE_PREVIEW</span>
              <div className="absolute inset-0 h-full w-0 bg-white/10 transition-all group-hover:w-full" />
            </Button>

            {project.git && (
              <Button
                asChild
                variant="outline"
                className="h-16 rounded-none border-primary/20 bg-transparent text-xs font-black tracking-[0.5em] text-foreground hover:border-primary hover:bg-primary/5"
              >
                <a href={project.git} target="_blank" rel="noreferrer">
                  GIT_CORE_ACCESS
                </a>
              </Button>
            )}
          </div>

          {project.awards && (
            <div className="flex flex-col gap-4 border-t border-primary/10 pt-4">
              <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-primary/40 uppercase">
                Recognition_Log:
              </span>
              <div className="flex flex-wrap gap-4">
                {project.awards.map((award: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Trophy size={16} className="text-primary" />
                    <span className="border-b border-primary/30 font-mono text-[10px] font-extrabold text-foreground uppercase">
                      {award.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
