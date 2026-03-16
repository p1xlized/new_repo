"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const SlotWrapper = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) => (
  <motion.div
    whileHover={{ y: -2 }}
    className={cn(
      "group bg-card/20 relative flex flex-col overflow-hidden border border-primary/20 transition-all duration-300 hover:border-primary/50",
      // Use min-h-0 to allow flex items to shrink below content height
      "min-h-0 flex-1",
      className
    )}
    onClick={onClick}
  >
    <div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <div className="absolute top-0 left-0 size-3 border-t border-l border-primary" />
      <div className="absolute top-0 right-0 size-3 border-t border-r border-primary" />
      <div className="absolute bottom-0 left-0 size-3 border-b border-l border-primary" />
      <div className="absolute right-0 bottom-0 size-3 border-r border-b border-primary" />
    </div>
    <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:bg-primary/[0.03] group-hover:opacity-100" />
    <div className="selection:text-primary-foreground relative z-10 h-full w-full font-mono selection:bg-primary">
      {children}
    </div>
  </motion.div>
)

export const Profile = ({
  title,
  avatarSrc,
  tools,
  children,
}: {
  title: string
  avatarSrc: string
  tools: Array<{ src: string; alt: string }>
  children?: React.ReactNode
}) => {
  return (
    // h-full and overflow-hidden prevent the section from expanding the page
    <section className="flex h-full w-full flex-col overflow-hidden font-mono text-foreground">
      <div className="container mx-auto flex h-full max-w-6xl flex-col">
        {/* HEADER: Shrinks on small vertical screens */}
        <div className="mb-6 flex flex-row items-center gap-4 md:mb-8 md:gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="group relative shrink-0"
          >
            <div className="absolute inset-0 opacity-0 transition-all duration-300 group-hover:-inset-2 group-hover:opacity-100">
              <div className="absolute top-0 left-0 size-3 border-t-2 border-l-2 border-primary" />
              <div className="absolute right-0 bottom-0 size-3 border-r-2 border-b-2 border-primary" />
            </div>
            <img
              src={avatarSrc}
              alt={title}
              // Scaled down sizes to save vertical space
              className="size-16 border border-primary/40 object-cover grayscale transition-all group-hover:grayscale-0 md:size-24 lg:size-32"
            />
          </motion.div>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-2xl tracking-tighter uppercase md:text-4xl lg:text-6xl">
              {title}
            </h1>
            <div className="text-muted-foreground flex items-center gap-2 text-[8px] tracking-[0.2em] md:text-[10px]">
              <span className="inline-block size-1.5 animate-pulse bg-primary" />
              STATUS // ACTIVE_NODE
            </div>
          </div>
        </div>

        {/* GRID: Takes up remaining space */}
        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-3">
          {children}
        </div>

        {/* TOOLKIT: Very compact footer-style row */}
        <div className="mt-6 shrink-0">
          <div className="mb-3 flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-primary/20" />
            <h2 className="text-[8px] font-black tracking-[0.4em] text-primary/40 uppercase">
              TOOLKIT
            </h2>
            <div className="h-[1px] flex-1 bg-primary/20" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 pb-2">
            {tools.map((tool, idx) => (
              <motion.div
                key={`${tool.alt}-${idx}`}
                // Lift and glow on hover
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
                className="group bg-card/40 relative flex size-10 cursor-crosshair items-center justify-center border border-primary/10 p-2 transition-all hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.15)] md:size-12"
              >
                {/* Decorative Corner (Hover Only) */}
                <div className="absolute top-0 right-0 size-1 border-t border-r border-primary opacity-0 transition-opacity group-hover:opacity-100" />

                <img
                  src={tool.src}
                  alt={tool.alt}
                  className="max-h-full max-w-full opacity-40 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
