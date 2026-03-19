"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Cpu,
  SpeakerHigh,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  CaretRight,
  Terminal,
  Clock,
  HardDrive,
  Radioactive,
  CassetteTape,
  Target,
  ChartBar,
  Crosshair,
  BoundingBox,
  ArrowsInLineVertical,
  Lightning,
} from "@phosphor-icons/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/music")({
  component: MusicPage,
})

const TRACKS = [
  {
    id: "01",
    title: "dance_on_graves.mp3",
    size: "8.4MB",
    bpm: 124,
    dur: "03:42",
    cover: "https://media.giphy.com/media/l41lTjJptO9D5sm8o/giphy.gif",
  },
  {
    id: "02",
    title: "LakeCityQuietPills.wav",
    size: "42.1MB",
    bpm: 90,
    dur: "04:15",
    cover:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZ3bmZ6NjR4bmZ6NjR4bmZ6NjR4bmZ6NjR4bmZ6NjR4bmZ6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/l41lTjJptO9D5sm8o/giphy.gif",
  },
  {
    id: "03",
    title: "mech_joint.flac",
    size: "64.0MB",
    bpm: 60,
    dur: "12:00",
    cover: "https://media.giphy.com/media/ko7twHhomhk8E/giphy.gif",
  },
  {
    id: "04",
    title: "perish_soon.mp3",
    size: "64.0MB",
    bpm: 60,
    dur: "12:00",
    cover: "https://media.giphy.com/media/ko7twHhomhk8E/giphy.gif",
  },
]

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState(TRACKS[0])
  const [volume, setVolume] = useState(75)

  // Memoized ASCII background noise for performance
  const asciiLines = useMemo(
    () =>
      [...Array(15)].map(() =>
        Math.random().toString(16).toUpperCase().slice(2, 14)
      ),
    []
  )

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-2 font-mono text-primary selection:bg-primary/30 sm:p-6">
      {/* --- HIGH VISIBILITY ASCII BACKGROUND --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden font-mono text-[10px] opacity-30 select-none">
        {/* Top Left: System Architecture */}
        <div className="absolute top-8 left-8 space-y-1">
          <p className="text-xs font-black">&gt; CORE_INFRASTRUCTURE_REPORT</p>
          <p className="opacity-70">┌──────────────────────────┐</p>
          <p className="opacity-70">│ KERNEL: ACTIVE_STABLE │</p>
          <p className="opacity-70">│ UPLINK: 42.8 GB/S │</p>
          <p className="opacity-70">│ SECURITY: ENCRYPTED │</p>
          <p className="opacity-70">└──────────────────────────┘</p>
        </div>

        {/* Top Right: Hex Dump Stream */}
        <div className="absolute top-8 right-8 hidden text-right lg:block">
          <p className="mb-2 flex items-center justify-end gap-2 font-black">
            <Lightning weight="fill" /> MEM_DUMP_0x44
          </p>
          {asciiLines.map((line, i) => (
            <p key={i} className="opacity-40">
              {line} 7F 45 4C 46 01
            </p>
          ))}
        </div>

        {/* Bottom Left: Navigation Status */}
        <div className="absolute bottom-12 left-10 hidden space-y-2 md:block">
          <div className="flex items-center gap-4 text-xs font-black italic">
            <Target size={24} className="animate-pulse" />
            <span>LOCATING_SIGNAL_SOURCE...</span>
          </div>
          <p className="opacity-50">
            STATION_ID: {Math.random().toString(36).slice(2, 8).toUpperCase()}
          </p>
        </div>

        {/* Decorative Grid Lines */}
        <div className="pointer-events-none absolute inset-0 border-[20px] border-primary/5" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/5" />
        <div className="absolute top-1/2 right-0 left-0 h-px bg-primary/5" />
      </div>

      {/* --- CENTRAL RADIOACTIVE OVERRIDE --- */}
      <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 sm:bottom-10">
        <motion.button
          whileHover={{ scale: 1.2, boxShadow: "0 0 50px var(--primary)" }}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-background shadow-2xl transition-all active:scale-90 sm:h-20 sm:w-20"
        >
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/20 group-hover:duration-300" />
          <Radioactive
            size={32}
            weight="fill"
            className="animate-[spin_4s_linear_infinite] sm:text-[44px]"
          />
          <span className="absolute -top-10 bg-primary px-2 py-1 text-[9px] font-black tracking-[0.2em] whitespace-nowrap text-background uppercase italic opacity-0 transition-opacity group-hover:opacity-100">
            System_Override
          </span>
        </motion.button>
      </div>

      {/* --- MAIN INTERFACE (Responsive Sizing) --- */}
      <main className="relative z-10 flex max-h-[85vh] w-[95%] max-w-6xl flex-col overflow-hidden border border-primary/40 bg-background shadow-[0_0_100px_rgba(0,0,0,0.8)] transition-all duration-700 sm:max-h-[80vh] sm:w-full md:flex-row">
        {/* SIDEBAR: FILE DIRECTORY */}
        <section className="flex w-full flex-col border-b border-primary/20 bg-primary/[0.02] md:w-[30%] md:border-r md:border-b-0">
          <div className="flex items-center justify-between border-b border-primary/20 bg-primary/10 p-3 text-[10px] font-black uppercase italic">
            <span className="flex items-center gap-2 tracking-widest">
              <Terminal weight="fill" /> DIR://INDEX
            </span>
            <CassetteTape
              className={
                isPlaying ? "animate-pulse text-primary" : "opacity-20"
              }
              size={14}
            />
          </div>
          <div className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-2">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTrack(t)}
                className={`flex w-full items-center gap-4 border border-transparent p-3 text-left transition-all ${activeTrack.id === t.id ? "border-primary bg-primary text-background" : "opacity-40 hover:border-primary/20 hover:opacity-100"}`}
              >
                <span className="text-[10px] font-bold">[{t.id}]</span>
                <p className="truncate text-[11px] leading-none font-black uppercase italic">
                  {t.title}
                </p>
                {activeTrack.id === t.id && (
                  <Crosshair
                    size={14}
                    weight="fill"
                    className="ml-auto animate-pulse"
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* MAIN: PLAYER WORKSTATION */}
        <section className="flex w-full flex-col space-y-6 overflow-y-auto p-4 sm:space-y-10 sm:overflow-hidden sm:p-10 md:w-[70%]">
          {/* Top Metadata Header */}
          <div className="flex items-end justify-between border-b border-primary/20 pb-4">
            <div className="max-w-[70%]">
              <span className="flex items-center gap-2 text-[9px] font-black tracking-[0.5em] uppercase italic opacity-40">
                <ArrowsInLineVertical /> Recode_Source_4.2
              </span>
              <h1 className="mt-2 truncate text-xl leading-none font-black tracking-tighter uppercase italic shadow-primary drop-shadow-[0_0_5px_rgba(var(--primary-rgb),0.3)] sm:text-4xl">
                {activeTrack.title}
              </h1>
            </div>
            <div className="flex flex-col items-end text-right">
              <p className="text-xl leading-none font-black italic sm:text-3xl">
                {activeTrack.dur}
              </p>
              <p className="mt-1 text-[9px] font-bold tracking-widest uppercase opacity-40">
                Active_Time
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            {/* Minimal Cover - Enhanced on Desktop */}
            <div className="group relative aspect-square border border-primary/20 bg-primary/[0.03] p-1 shadow-inner">
              <img
                src={activeTrack.cover}
                className="h-full w-full object-cover opacity-80 grayscale transition-opacity group-hover:opacity-100"
                alt="terminal art"
              />
              <div className="absolute right-0 bottom-0 bg-primary/20 p-1 text-[8px] font-black backdrop-blur-sm">
                IMG_SOURCE_ID: {activeTrack.id}
              </div>
            </div>

            {/* Visualizer & Controls */}
            <div className="flex flex-col gap-6 sm:gap-10">
              {/* Spectrum Display */}
              <div className="space-y-3">
                <div className="flex justify-between border-b border-primary/10 pb-1 text-[10px] font-black tracking-widest uppercase italic opacity-60">
                  <span className="flex items-center gap-2">
                    <ChartBar weight="bold" /> Spectrum_Data
                  </span>
                  <span>{activeTrack.bpm} BPM</span>
                </div>
                <div className="flex h-16 items-end gap-[3px]">
                  {[...Array(28)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying ? [4, Math.random() * 56 + 4, 4] : 4,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.2,
                        delay: i * 0.02,
                      }}
                      className="flex-1 bg-primary/50 shadow-[0_0_8px_rgba(var(--primary-rgb),0.2)]"
                    />
                  ))}
                </div>
              </div>

              {/* Hardware Controls */}
              <div className="grid grid-cols-3 gap-2">
                <button className="flex h-14 items-center justify-center border border-primary/20 transition-all hover:bg-primary/10 active:scale-90">
                  <SkipBack size={26} />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-14 items-center justify-center bg-primary font-black text-background shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)] transition-all active:scale-95"
                >
                  {isPlaying ? (
                    <Pause weight="fill" size={32} />
                  ) : (
                    <Play weight="fill" size={32} />
                  )}
                </button>
                <button className="flex h-14 items-center justify-center border border-primary/20 transition-all hover:bg-primary/10 active:scale-90">
                  <SkipForward size={26} />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-[9px] font-black tracking-[0.3em] uppercase opacity-50">
                  <span className="flex items-center gap-2">
                    <SpeakerHigh weight="fill" /> Signal_Gain
                  </span>
                  <span>{volume}dB</span>
                </div>
                <input
                  type="range"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="h-1 w-full cursor-crosshair appearance-none bg-primary/20 accent-primary"
                />
              </div>
            </div>
          </div>

          {/* System Footer Bar */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-primary/10 pt-6 text-[9px] font-black tracking-[0.2em] uppercase italic opacity-40">
            <span className="flex items-center gap-2 bg-primary/5 px-2 py-1">
              <HardDrive weight="bold" /> SECTOR:{" "}
              {Math.random().toString(16).slice(2, 6).toUpperCase()}
            </span>
            <span className="flex items-center gap-2">
              <Cpu weight="bold" /> KERNEL_ACTIVE
            </span>
            <span className="flex items-center gap-2">
              <Clock weight="bold" /> {new Date().toLocaleTimeString()}
            </span>
          </div>
        </section>
      </main>

      {/* Decorative Corner Label */}
      <footer className="pointer-events-none fixed top-6 right-6 hidden text-[10px] font-black tracking-[1em] uppercase opacity-10 lg:block">
        TERMINAL_CONNECTED_AUTH_LEVEL_04
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--primary);
        }
        :root {
          --primary-rgb: 0, 255, 65;
        } /* System Green */
      `}</style>
    </div>
  )
}
