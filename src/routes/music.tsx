import { useEffect, useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowLeft,
  MusicNotes,
  Pause,
  Play,
  SpeakerHigh,
  TerminalWindow,
} from "@phosphor-icons/react"
import MusicLoader from "@/components/MusicLoader"

// --- DATA ---
const TRACKS = [
  {
    id: "01",
    title: "NEURAL_INTERFACE_V1.mp3",
    size: "8.4MB",
    bpm: 124,
    dur: "03:42",
    cover: "/assets/cover_art/skeletons.gif",
  },
  {
    id: "02",
    title: "KUOPIO_NIGHTS.wav",
    size: "42.1MB",
    bpm: 90,
    dur: "04:15",
    cover: "https://media.giphy.com/media/l41lTjJptO9D5sm8o/giphy.gif",
  },
  {
    id: "03",
    title: "ARCH_LINUX_AMBIENT.flac",
    size: "64.0MB",
    bpm: 60,
    dur: "12:00",
    cover: "https://media.giphy.com/media/ko7twHhomhk8E/giphy.gif",
  },
]

// --- ROUTE DEFINITION ---
export const Route = createFileRoute("/music")({
  component: MusicPage,
})

// --- MAIN PAGE COMPONENT ---
function MusicPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState(TRACKS[0])
  const [volume, setVolume] = useState(80)
  const [view, setView] = useState<"list" | "details">("list")

  const handleTrackSelect = (track: (typeof TRACKS)[0]) => {
    setActiveTrack(track)
    if (window.innerWidth < 1024) {
      setView("details")
    }
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && <MusicLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className="relative flex min-h-screen w-full items-center justify-center bg-background p-4 font-mono text-primary md:p-8">
        {/* CRT Scanline Effect */}
        <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_2px] opacity-10" />

        <AnimatePresence>
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 flex h-full w-full max-w-6xl flex-col items-center justify-center pt-20 pb-10 md:pt-24 lg:pt-0"
            >
              <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-stretch lg:justify-center">
                {/* VIEW 1: DIRECTORY (LIST) */}
                {(view === "list" ||
                  (typeof window !== "undefined" &&
                    window.innerWidth >= 1024)) && (
                  <motion.section
                    key="list"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex flex-col border border-primary/20 bg-background/60 shadow-2xl backdrop-blur-md lg:flex-1 ${view === "details" ? "hidden lg:flex" : "flex"}`}
                  >
                    <div className="flex items-center justify-between border-b border-primary/20 bg-primary/5 px-6 py-4">
                      <div className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase">
                        <TerminalWindow size={18} /> Directory: /audio
                      </div>
                      <span className="text-[10px] uppercase opacity-40">
                        System_Active
                      </span>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto p-2 lg:max-h-none">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead>
                          <tr className="tracking-tighter uppercase opacity-30">
                            <th className="p-3 font-normal">Idx</th>
                            <th className="p-3 font-normal">File_Name</th>
                            <th className="p-3 text-right font-normal">Dur</th>
                          </tr>
                        </thead>
                        <tbody>
                          {TRACKS.map((track) => (
                            <tr
                              key={track.id}
                              onClick={() => handleTrackSelect(track)}
                              className={`group cursor-pointer border-b border-primary/5 transition-colors last:border-0 ${
                                activeTrack.id === track.id
                                  ? "bg-primary text-background"
                                  : "hover:bg-primary/10"
                              }`}
                            >
                              <td className="p-4">
                                {activeTrack.id === track.id ? ">>" : track.id}
                              </td>
                              <td className="p-4 font-bold tracking-tight">
                                {track.title}
                              </td>
                              <td className="p-4 text-right opacity-60">
                                {track.dur}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.section>
                )}

                {/* VIEW 2: DECODER (DETAILS) */}
                {(view === "details" ||
                  (typeof window !== "undefined" &&
                    window.innerWidth >= 1024)) && (
                  <motion.aside
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex flex-col gap-6 lg:w-[400px] ${view === "list" ? "hidden lg:flex" : "flex"}`}
                  >
                    <button
                      onClick={() => setView("list")}
                      className="flex w-fit items-center gap-3 border border-primary/40 bg-primary/5 px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-background lg:hidden"
                    >
                      <ArrowLeft size={14} weight="bold" /> [ RETURN_TO_LIST ]
                    </button>

                    <div className="border border-primary/30 bg-background p-6 shadow-2xl">
                      {/* COVER IMAGE */}
                      <div className="relative aspect-square w-full overflow-hidden border border-primary/20 brightness-90 grayscale transition-all duration-500 hover:grayscale-0">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeTrack.cover}
                            src={activeTrack.cover}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.7 }}
                            className="h-full w-full object-cover mix-blend-screen"
                          />
                        </AnimatePresence>
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-40" />
                      </div>

                      {/* SPECTRUM ANALYZER */}
                      <div className="mt-6 flex h-12 items-end gap-[2px]">
                        {[...Array(40)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: isPlaying ? [2, 45, 10, 35, 5] : 1,
                            }}
                            transition={{
                              duration: 0.4 + Math.random(),
                              repeat: Infinity,
                            }}
                            className="flex-1 bg-primary/40"
                          />
                        ))}
                      </div>
                    </div>

                    {/* CONTROLS */}
                    <div className="border border-primary/20 bg-primary/[0.03] p-8 backdrop-blur-sm">
                      <div className="mb-6">
                        <h2 className="mb-1 truncate text-2xl font-black tracking-tighter text-primary uppercase">
                          {activeTrack.title.split(".")[0]}
                        </h2>
                        <div className="flex items-center gap-3 text-[10px] tracking-widest opacity-40">
                          <MusicNotes size={12} /> {activeTrack.bpm} BPM //{" "}
                          {activeTrack.size}
                        </div>
                      </div>

                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`mb-8 flex w-full items-center justify-center gap-4 border py-5 transition-all ${
                          isPlaying
                            ? "border-primary bg-primary text-background"
                            : "border-primary/40 hover:border-primary hover:bg-primary/10"
                        }`}
                      >
                        {isPlaying ? (
                          <Pause size={24} weight="fill" />
                        ) : (
                          <Play size={24} weight="fill" />
                        )}
                        <span className="text-xs font-black tracking-[0.4em] uppercase">
                          {isPlaying ? "HALT" : "EXECUTE"}
                        </span>
                      </button>

                      <div className="space-y-4">
                        <div className="flex justify-between text-[10px] font-bold tracking-tighter text-primary/40 uppercase">
                          <span className="flex items-center gap-2">
                            <SpeakerHigh size={14} /> GAIN_CTL
                          </span>
                          <span>{volume}%</span>
                        </div>
                        <div className="relative h-2 w-full bg-primary/10">
                          <motion.div
                            className="h-full bg-primary"
                            animate={{ width: `${volume}%` }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="absolute inset-0 w-full cursor-pointer opacity-0"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.aside>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  )
}

export default MusicPage
