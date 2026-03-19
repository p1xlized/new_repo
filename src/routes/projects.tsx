"use client"

import { useEffect, useState, useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  Globe,
  GithubLogo,
  Receipt,
  ShieldCheck,
  Target,
  Cpu,
  GraphIcon,
} from "@phosphor-icons/react"
import { projects } from "@/data/project_data"
import { Button } from "@/components/ui/button"
import { hideNavbar, showNavbar } from "@/lib/store"

// Loaders
import { DataUplink, SystemLoader } from "@/components/Loader"

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
})

const TacticalBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT/0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 md:bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,theme(colors.background.DEFAULT)_100%)]" />
  </div>
)

function ProjectsPage() {
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
      filter === "ALL"
        ? projects
        : projects.filter((p) => p.role.toUpperCase().includes(filter)),
    [filter]
  )

  useEffect(() => {
    selectedId !== null ? hideNavbar() : showNavbar()
    return () => showNavbar()
  }, [selectedId])

  const handleProjectSelect = (id: number | null) => {
    setPendingId(id)
    setLoaderMode(id === null ? "downlink" : "uplink")
    setIsUplinking(true)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-mono text-foreground selection:bg-primary/30">
      <TacticalBackground />

      {/* --- GLOBAL HUD: HIDDEN ON MOBILE, INCREASED PADDING ON DESKTOP --- */}
      <div className="pointer-events-none fixed inset-0 z-50 hidden flex-col justify-between p-12 antialiased md:flex lg:p-16">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-1">
            {activeProject ? (
              <button
                onClick={() => handleProjectSelect(null)}
                className="group pointer-events-auto flex items-center transition-all"
              >
                <span className="text-[11px] font-black tracking-[0.2em] text-primary uppercase transition-all duration-300 group-hover:text-white">
                  <span className="mr-2 text-primary/30 group-hover:text-primary">
                    [
                  </span>
                  Back_to_Projects
                  <span className="ml-2 text-primary/30 group-hover:text-primary">
                    ]
                  </span>
                </span>
              </button>
            ) : (
              <span className="text-[10px] leading-none tracking-[0.4em] text-primary uppercase">
                SCTR_COORDS: 62.8925° N, 27.6770° E
              </span>
            )}
            <span className="text-muted-foreground text-[8px] uppercase opacity-40">
              {activeProject
                ? `MOUNTED_DRIVE // PRJ_0${activeProject.id}`
                : "INDEX_ROOT_VERIFIED"}
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="animate-pulse text-[10px] tracking-[0.4em] text-primary italic">
              {activeProject ? "FILE_ACTIVE" : "UPLINK_STABLE"}
            </span>
            <p className="text-[12px] text-foreground tabular-nums">{time}</p>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <span className="text-[10px] tracking-[0.5em] text-primary uppercase">
            PIXLIZED_OS_v1.0.4 // {activeProject ? "EXPLORER" : "ARCHIVE"}
          </span>
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck size={16} weight="bold" />
            <span className="text-[10px] uppercase opacity-60">
              Secure_Uplink
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isBooting && (
          <SystemLoader key="boot" onComplete={() => setIsBooting(false)} />
        )}
        {isUplinking && (
          <DataUplink
            key="uplink"
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

      {!isBooting && (
        <div
          ref={setContainerRef}
          className="hide-scrollbar relative z-10 h-screen w-full overflow-y-auto scroll-smooth"
        >
          {/* pt-20 for mobile ensures it stays below standard navbars, pt-44 for desktop HUD clearance */}
          <div className="mx-auto w-full max-w-6xl px-5 pt-20 pb-24 md:px-10 md:pt-44">
            <AnimatePresence mode="wait">
              {!activeProject ? (
                <motion.section
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <header className="flex flex-col gap-6 border-b border-primary/20 pb-6 md:flex-row md:items-center md:justify-between md:pb-4">
                    <div className="space-y-1">
                      <h1 className="text-5xl font-black tracking-tighter uppercase md:text-7xl">
                        INDEX<span className="opacity-10">.04</span>
                      </h1>
                      <p className="text-[8px] font-bold tracking-[0.4em] text-primary/40 md:hidden">
                        SCTR_COORDS: 62.8925° N
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {["ALL", "WEB", "GAME", "MOBILE"].map((label) => (
                        <button
                          key={label}
                          onClick={() => setFilter(label)}
                          className={`border px-4 py-1.5 text-[9px] font-black tracking-widest transition-all ${
                            filter === label
                              ? "border-primary bg-primary text-background shadow-[0_0_15px_rgba(var(--primary),0.4)]"
                              : "border-primary/20 bg-transparent text-primary/40 hover:border-primary/60 hover:text-primary"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </header>

                  <div className="grid grid-cols-1 gap-4 md:gap-6">
                    {filteredProjects.map((p, i) => (
                      <ProjectCard
                        key={p.id}
                        project={p}
                        index={i}
                        onSelect={handleProjectSelect}
                      />
                    ))}
                  </div>
                </motion.section>
              ) : (
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8 md:space-y-16"
                >
                  {/* MOBILE BACK BUTTON - Only visible when HUD is hidden */}
                  <div className="flex md:hidden">
                    <button
                      onClick={() => handleProjectSelect(null)}
                      className="group flex items-center gap-2 text-[10px] font-black tracking-tighter text-primary uppercase"
                    >
                      <span className="text-primary/40">[</span> BACK_TO_ARCHIVE{" "}
                      <span className="text-primary/40">]</span>
                    </button>
                  </div>
                  <ProjectDetailView
                    project={activeProject}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                  />
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

const ProjectCard = ({ project, index, onSelect }: any) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.03 }}
    onClick={() => onSelect(project.id)}
    className="group relative flex h-32 cursor-pointer flex-row overflow-hidden border border-primary/20 bg-primary/5 backdrop-blur-xl transition-all duration-500 hover:border-primary/80 hover:bg-primary/10 md:h-48"
  >
    {/* Decorative Elements */}
    <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/20 transition-colors group-hover:border-primary" />
    <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-primary/20 transition-colors group-hover:border-primary" />

    {/* Left Identity Strip */}
    <div className="flex w-12 flex-col items-center justify-between border-r border-primary/10 bg-primary/5 py-4 text-[8px] font-black md:w-24 md:text-[10px]">
      <Target
        size={14}
        weight="bold"
        className="group-hover:animate-spin-slow opacity-40 group-hover:opacity-100 md:size-5"
      />
      <span className="rotate-90 tracking-[0.3em] opacity-30">
        PX_0{index + 1}
      </span>
      <GraphIcon size={14} weight="bold" className="opacity-40 md:size-5" />
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col justify-center px-6 md:px-16">
      <div className="mb-2 flex items-center gap-2">
        <span className="bg-primary/20 px-2 py-0.5 text-[7px] font-black tracking-widest text-primary uppercase md:text-[8px]">
          {project.role}
        </span>
      </div>
      <h3 className="text-xl font-black tracking-tighter uppercase transition-all duration-500 group-hover:text-white md:text-6xl">
        {project.title}
      </h3>
      <div className="mt-3 hidden items-center gap-6 md:flex">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        <div className="flex items-center gap-3 text-[7px] font-bold tracking-widest text-primary/40 uppercase">
          <Cpu size={12} /> SECURE_DATA{" "}
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />{" "}
          SYSTEM_LOADED
        </div>
      </div>
    </div>

    {/* Image Panel */}
    <div className="relative w-28 overflow-hidden border-l border-primary/10 sm:w-40 md:w-[450px]">
      <img
        src={project.cover}
        className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent opacity-90 md:opacity-70" />
      <motion.div
        animate={{ y: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 top-0 z-10 h-[2px] bg-primary/40 shadow-[0_0_10px_var(--primary)]"
      />
    </div>
  </motion.div>
)

const ProjectDetailView = ({ project, currentIndex, setCurrentIndex }: any) => (
  <div className="space-y-8 md:space-y-16">
    <div className="border-b border-primary/30 pb-6 md:pb-10">
      <h2 className="text-4xl leading-[0.85] font-black tracking-tighter uppercase sm:text-6xl md:text-[10rem]">
        {project.title}
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        <div className="relative border border-primary/20 bg-primary/[0.05] p-1.5 md:p-2">
          <div className="relative aspect-video overflow-hidden bg-black/60">
            <img
              src={project.imgs[currentIndex]}
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {project.imgs.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-12 w-20 border-2 transition-all md:h-16 md:w-28 ${currentIndex === i ? "scale-105 border-primary" : "border-primary/10 opacity-40 hover:opacity-100"}`}
            >
              <img src={img} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-10 lg:col-span-4">
        <div className="space-y-6 border-l-4 border-primary/20 pl-6 md:pl-10">
          <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.4em] uppercase opacity-40">
            <Receipt size={18} /> PROJECT_MANIFEST
          </div>
          <p className="text-sm leading-relaxed tracking-tight text-primary/80 uppercase md:text-base">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {project.git && (
            <Button
              asChild
              variant="outline"
              className="h-14 rounded-none border-primary/30 text-[10px] font-black tracking-[0.3em] hover:bg-primary/10 md:h-16 md:text-[11px]"
            >
              <a href={project.git} target="_blank">
                <GithubLogo size={22} className="mr-3" /> SOURCE_CODE
              </a>
            </Button>
          )}
          <Button className="h-14 rounded-none bg-primary text-[10px] font-black tracking-[0.3em] text-background transition-all hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] md:h-16 md:text-[11px]">
            <Globe size={22} className="mr-3" /> EXECUTE_PROJECT
          </Button>
        </div>
      </div>
    </div>
  </div>
)

export default ProjectsPage
