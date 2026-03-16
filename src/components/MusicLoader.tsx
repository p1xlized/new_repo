"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface MusicLoaderProps {
  onComplete?: () => void
  speed?: number
  title?: string
}

export const MusicLoader = ({
  onComplete,
  speed = 30,
  title = "AUDIO_SYNTH_v1.0",
}: MusicLoaderProps) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          if (onComplete) setTimeout(onComplete, 800)
          return 100
        }
        return prev + 1
      })
    }, speed)
    return () => clearInterval(timer)
  }, [onComplete, speed])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background font-mono text-primary"
    >
      <div className="relative flex flex-col items-center">
        {/* WAVEFORM GENERATOR */}
        <div className="mb-8 flex h-20 items-end gap-1.5 px-4">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-primary/60"
              animate={{
                height:
                  progress < 100
                    ? [
                        `${10 + Math.random() * 20}%`,
                        `${30 + Math.random() * 70}%`,
                        `${10 + Math.random() * 20}%`,
                      ]
                    : "10%",
              }}
              transition={{
                repeat: Infinity,
                duration: 0.4 + Math.random() * 0.4,
                ease: "easeInOut",
              }}
              style={{ opacity: 0.2 + (progress / 100) * 0.8 }}
            />
          ))}
        </div>

        <div className="w-72 text-center">
          <div className="mb-2 flex justify-between text-[10px] font-black tracking-[0.3em] uppercase">
            <span>{title}</span>
            <span className="tabular-nums">{progress}%</span>
          </div>

          {/* WAVELENGTH STATUS BAR */}
          <div className="relative h-[2px] w-full bg-primary/10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={Math.floor(progress / 25)}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                className="text-[9px] font-bold tracking-[0.5em] uppercase opacity-50"
              >
                {progress < 25 && "SAMPLING_NEURAL_CORES"}
                {progress >= 25 && progress < 50 && "SYNTHESIZING_WAVELENGTHS"}
                {progress >= 50 && progress < 75 && "DECODING_BITSTREAM"}
                {progress >= 75 && "FINALIZING_OUTPUT"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CRT SCANLINE */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-20" />
    </motion.div>
  )
}
export default MusicLoader
