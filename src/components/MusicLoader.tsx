import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface MusicLoaderProps {
  onComplete?: () => void
  speed?: number
  title?: string
}

export const MusicLoader = ({
  onComplete,
  speed = 10,
  title = "WAVE_SYNTH_v4.0",
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

  // Simple function to generate a sine wave path
  // As progress increases, the wave gets "tighter" (frequency) and "taller" (amplitude)
  const generateWavePath = (offset: number) => {
    const points = []
    const amplitude = 5 + (progress / 100) * 15 // Grows from 5 to 20
    const frequency = 0.05 + (progress / 100) * 0.15 // Gets more complex

    for (let x = 0; x <= 120; x += 2) {
      const y = 40 + Math.sin(x * frequency + offset) * amplitude
      points.push(`${x},${y}`)
    }
    return `M ${points.join(" L ")}`
  }

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background font-mono text-primary"
    >
      <div className="relative flex flex-col items-center">
        {/* WAVE VIEWPORT */}
        <div className="relative mb-12 flex h-56 w-56 items-center justify-center">
          {/* External Square Brackets */}
          <div className="absolute inset-0 border border-primary/10">
            <div className="absolute -top-[2px] left-1/2 h-[1px] w-12 -translate-x-1/2 bg-primary" />
            <div className="absolute -bottom-[2px] left-1/2 h-[1px] w-12 -translate-x-1/2 bg-primary" />
            <div className="absolute top-1/2 -left-[2px] h-12 w-[1px] -translate-y-1/2 bg-primary" />
            <div className="absolute top-1/2 -right-[2px] h-12 w-[1px] -translate-y-1/2 bg-primary" />
          </div>

          {/* The Circular Planet/Oscilloscope */}
          <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-primary/40 bg-primary/[0.02]">
            {/* Grid Lines behind the wave */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:10px_10px] opacity-10" />

            {/* THE WAVELENGTH */}
            <svg viewBox="0 0 120 80" className="w-full">
              {/* Ghost Wave (Slower/Muted) */}
              <motion.path
                d={generateWavePath(0)}
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                className="opacity-20"
                animate={{
                  d: [generateWavePath(0), generateWavePath(Math.PI)],
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
              {/* Main Active Wave */}
              <motion.path
                d={generateWavePath(0)}
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                animate={{
                  d: [generateWavePath(0), generateWavePath(Math.PI * 2)],
                }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
              />
            </svg>

            {/* Circular Scanning HUD */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-t-primary border-r-transparent border-b-transparent border-l-transparent opacity-40"
            />
          </div>

          {/* Progress Perimeter Ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <motion.circle
              cx="112"
              cy="112"
              r="108"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              strokeDasharray="678"
              initial={{ strokeDashoffset: 678 }}
              animate={{ strokeDashoffset: 678 - (678 * progress) / 100 }}
              className="opacity-60"
            />
          </svg>
        </div>

        {/* FOOTER DATA */}
        <div className="w-64">
          <div className="mb-2 flex items-center justify-between text-[10px] font-bold tracking-[0.2em]">
            <span className="opacity-50">FREQ_LOCK</span>
            <span className="tabular-nums">
              {(440 + progress * 4.4).toFixed(1)}Hz
            </span>
          </div>

          <div className="h-[2px] w-full bg-primary/10">
            <motion.div
              className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-6 flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={Math.floor(progress / 25)}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[9px] font-black tracking-[0.6em] text-primary/70 uppercase"
              >
                {progress < 25 && "Oscillating"}
                {progress >= 25 && progress < 50 && "Capturing_Phase"}
                {progress >= 50 && progress < 75 && "Resolving_Core"}
                {progress >= 75 && "Signal_Stable"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MusicLoader
