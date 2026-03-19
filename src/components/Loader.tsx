"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SystemLoaderProps {
  onComplete?: () => void
  duration?: number // Time in seconds
}

function SystemLoader({ onComplete, duration = 1.5 }: SystemLoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background font-mono"
    >
      {/* HUD GRID RADIANCE */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00ff9d12_1px,transparent_1px),linear-gradient(to_bottom,#00ff9d12_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />

      <div className="relative w-72 space-y-6">
        <div className="flex items-end justify-between text-[10px] tracking-[0.3em] text-primary uppercase">
          <div className="flex flex-col gap-1">
            <span className="text-[7px] font-bold tracking-widest italic opacity-30">
              System_Init
            </span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="font-black drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.9)]"
            >
              Uplink_Active...
            </motion.span>
          </div>
          <motion.span className="font-black text-primary/80">
            [100%]
          </motion.span>
        </div>

        {/* PROGRESS BAR - HEAVY GLOW NO BORDER */}
        <div className="relative h-[2px] w-full bg-primary/5">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: duration,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.1,
            }}
            onAnimationComplete={onComplete}
            className="h-full w-full origin-left bg-primary shadow-[0_0_25px_rgba(var(--primary-rgb),0.8),0_0_50px_rgba(var(--primary-rgb),0.3)]"
          />
        </div>

        {/* DATA TAGS */}
        <div className="flex flex-wrap gap-4">
          {["CORE", "NET", "ARCH", "SYNC"].map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: (duration / 4) * i }}
              className="flex items-center gap-2"
            >
              <div className="h-[1px] w-2 bg-primary/40" />
              <span className="text-[9px] font-black tracking-tighter">
                {s}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AMBIENT SCANLINE */}
      <motion.div
        animate={{ y: ["-100%", "1000%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[25vh] bg-gradient-to-b from-transparent via-primary/10 to-transparent opacity-40 blur-md"
      />
    </motion.div>
  )
}

function DataUplink({
  onComplete,
  mode,
}: {
  onComplete: () => void
  mode: "uplink" | "downlink"
}) {
  const hexCode = React.useMemo(
    () =>
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, "0"),
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-background/95 font-mono backdrop-blur-3xl"
    >
      <div className="relative w-96 space-y-12">
        {/* HEADER BLOCK */}
        <div className="flex items-end justify-between border-b border-primary/10 pb-4">
          <div className="space-y-1">
            <div className="text-[7px] font-black tracking-[0.5em] text-primary/20 uppercase">
              Kernel_Module // 0{hexCode}
            </div>
            <div className="text-[14px] font-black tracking-[0.4em] text-primary uppercase drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.6)]">
              {mode === "uplink" ? "Establish_Archive" : "Return_To_Root"}
            </div>
          </div>
          <div className="mr-4 h-6 w-[1px] bg-primary/20" />
        </div>

        {/* PROGRESS UNIT */}
        <div className="space-y-3">
          <div className="relative h-[3px] w-full bg-primary/5">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.8, 0, 0.2, 1] }}
              onAnimationComplete={onComplete}
              className={cn(
                "h-full w-full bg-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.9)]",
                mode === "downlink" ? "origin-right" : "origin-left"
              )}
            />
          </div>
          <div className="flex justify-between text-[6px] font-black tracking-[0.4em] text-primary/30">
            <span>STREAMS_ACTIVE</span>
            <span>TRANSFER_ID_{hexCode}</span>
          </div>
        </div>

        {/* LOG STRINGS */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[8px] text-primary uppercase">
          {[
            "SECURE_VIRTUAL_LAYER",
            "INDEXING_ASSET_CACHE",
            "NODAL_SYNCHRONIZATION",
            "MAPPING_FS_STRUCTURE",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3">
              <div className="h-[2px] w-[2px] animate-pulse bg-primary" />
              <span className="font-bold tracking-tight opacity-30">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export { DataUplink, SystemLoader }
