import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface SystemLoaderProps {
  onComplete?: () => void
  /** Array of strings to cycle through during load */
  statusMessages?: Array<string>
  /** Duration in milliseconds for each 1% of progress (default: 25) */
  speed?: number
  /** Title displayed above the status (default: SYS_LOAD_v3.0) */
  title?: string
}

export const SystemLoader = ({
  onComplete,
  statusMessages = [
    "INITIALIZING_KERNEL",
    "LOADING_VIRTUAL_DOM",
    "ESTABLISHING_UPLINK",
    "DECRYPTING_ASSETS",
    "SYSTEM_READY",
  ],
  speed = 25,
  title = "SYS_LOAD_v3.0",
}: SystemLoaderProps) => {
  const [progress, setProgress] = useState(0)
  const [statusIndex, setStatusIndex] = useState(0)

  useEffect(() => {
    // 1. Progress Logic
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          if (onComplete) {
            setTimeout(onComplete, 600)
          }
          return 100
        }
        return prev + 1
      })
    }, speed)

    // 2. Dynamic Status Logic
    // Aligns message changes with the total loading duration
    const totalDuration = speed * 100
    const statusInterval = totalDuration / statusMessages.length

    const statusTimer = setInterval(() => {
      setStatusIndex((prev) =>
        prev < statusMessages.length - 1 ? prev + 1 : prev
      )
    }, statusInterval)

    return () => {
      clearInterval(timer)
      clearInterval(statusTimer)
    }
  }, [onComplete, speed, statusMessages.length])

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background font-mono text-primary">
      <div className="relative w-72">
        {/* HUD Target Corners - Error-free flicker effect */}
        <div className="absolute -inset-8">
          <motion.div
            animate={{
              opacity: [0.2, 1, 0.4, 1, 0.2], // Manual "stepped" flickering
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "linear",
            }}
          >
            <div className="absolute top-0 left-0 size-6 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 size-6 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 size-6 border-b-2 border-l-2 border-primary" />
            <div className="absolute right-0 bottom-0 size-6 border-r-2 border-b-2 border-primary" />
          </motion.div>
        </div>

        {/* Header & Percentage */}
        <div className="mb-2 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-50">
              {title}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIndex}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-xs font-black tracking-tighter"
              >
                {statusMessages[statusIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-4xl font-black tracking-tighter tabular-nums">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="relative h-4 w-full border-2 border-primary/30 p-0.5">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />

          {/* Scanning Line Effect */}
          <motion.div
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute top-0 bottom-0 w-12 bg-white/10 blur-md"
          />
        </div>

        {/* Footer Metadata */}
        <div className="mt-4 flex justify-between text-[8px] font-bold uppercase opacity-40">
          <div className="flex flex-col gap-1">
            <span>MEM_BLOCK: 0x8F2A</span>
            <span>UPLINK: STABLE</span>
          </div>
          <div className="text-right">
            <span>LOC: EARTH_SOL</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            >
              _
            </motion.span>
          </div>
        </div>
      </div>

      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-10" />
    </div>
  )
}
