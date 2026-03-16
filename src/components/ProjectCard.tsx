"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface Project {
  id: number
  title: number | string
  tech: string
  description: string
  cover: string
  imgs: Array<string>
  git?: string
}

interface ProjectCardProps {
  project: Project
  onClick: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer border border-primary/30 bg-primary/[0.02] p-4 transition-all duration-500 hover:border-primary/60 hover:bg-primary/[0.04]"
    >
      {/* 1. SCANLINE / IMAGE OVERLAY EFFECT */}
      <div className="relative z-10 mb-4 aspect-video overflow-hidden border border-primary/20 bg-black">
        <motion.img
          src={project.cover}
          alt={String(project.title)}
          animate={
            isHovered
              ? {
                  scale: 1.1,
                  filter: "grayscale(0%) brightness(0.8) contrast(1.1)",
                }
              : {
                  scale: 1,
                  filter: "grayscale(100%) brightness(0.5) contrast(1)",
                }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full object-cover"
        />

        {/* CRT/Scanline Overlay (Visible on Hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"
            />
          )}
        </AnimatePresence>

        {/* Index ID Tag inside Image */}
        <div className="absolute top-2 right-2 border border-primary/40 bg-black/80 px-2 py-0.5 text-[9px] font-bold text-primary uppercase">
          0x{project.id}
        </div>
      </div>

      {/* 2. HUD CORNERS - Snappy Lock-on Effect */}
      <div className="pointer-events-none absolute inset-0 z-30">
        <div
          className={`absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary transition-all duration-300 ${isHovered ? "opacity-100" : "-translate-x-2 -translate-y-2 opacity-0"}`}
        />
        <div
          className={`absolute top-0 right-0 size-4 border-t-2 border-r-2 border-primary transition-all duration-300 ${isHovered ? "opacity-100" : "translate-x-2 -translate-y-2 opacity-0"}`}
        />
        <div
          className={`absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary transition-all duration-300 ${isHovered ? "opacity-100" : "-translate-x-2 translate-y-2 opacity-0"}`}
        />
        <div
          className={`absolute right-0 bottom-0 size-4 border-r-2 border-b-2 border-primary transition-all duration-300 ${isHovered ? "opacity-100" : "translate-x-2 translate-y-2 opacity-0"}`}
        />
      </div>

      {/* 3. TEXT CONTENT */}
      <div className="relative z-10 space-y-3">
        <div>
          <h3 className="text-2xl leading-none font-normal tracking-tighter text-primary uppercase transition-colors group-hover:text-primary">
            {`> ${project.title}`}
          </h3>
          <div className="mt-2 flex items-center gap-2">
            <div
              className={`h-1.5 w-1.5 rounded-full bg-primary ${isHovered ? "animate-pulse" : "opacity-40"}`}
            />
            <span className="text-[10px] font-medium tracking-[0.2em] text-primary/80 uppercase">
              {isHovered ? "DATA_LINK_ESTABLISHED" : project.tech}
            </span>
          </div>
        </div>

        {/* 4. DYNAMIC PROGRESS BAR (Footer) */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-[8px] font-bold text-primary uppercase opacity-60">
            <span>{isHovered ? "UPLINK_SYNC" : "STABILITY_CHECK"}</span>
            <span>{isHovered ? "100%" : "98.2%"}</span>
          </div>
          <div className="h-1 w-full bg-primary/10">
            <motion.div
              initial={{ width: "10%" }}
              animate={{ width: isHovered ? "100%" : "40%" }}
              className="h-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
