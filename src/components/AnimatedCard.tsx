import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  gifSrc: string
  children?: ReactNode
  title?: string
  subtitle?: string
  statusText?: string
  className?: string
}

export const AnimatedCard = ({
  gifSrc,
  children,
  title = "SVDXX_OS // PROJECT_SUBSYSTEM",
  subtitle = "SAT_LINK: STANDBY // BITRATE: 0.0 KB/s",
  statusText = ">> LINK_PENDING <<",
  className = "",
}: AnimatedCardProps) => {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden border border-primary/20 bg-background font-mono text-primary ${className}`}
    >
      <motion.img
        src={gifSrc}
        alt="System Data Stream"
        className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-40 group-hover:grayscale-0"
      />

      {/* 2. CRT & Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,4px_100%] opacity-20 group-hover:animate-pulse group-hover:opacity-40" />

      {/* 3. Top HUD Metadata */}
      <div className="absolute top-6 z-20 flex flex-col items-center gap-1 px-4 text-center text-[8px] font-bold tracking-[0.4em] text-primary uppercase opacity-40 transition-opacity group-hover:opacity-100">
        <div className="flex items-center gap-2">
          <div className="size-1 shrink-0 animate-pulse bg-primary" />
          <span className="truncate">{title}</span>
          <div className="size-1 shrink-0 animate-pulse bg-primary" />
        </div>
        <span className="truncate text-[6px] opacity-50">{subtitle}</span>
      </div>

      {/* 4. Center Content - No idle shadow */}
      <div className="relative z-20 px-4 transition-transform duration-500 group-hover:scale-105">
        {children}
      </div>

      {/* 5. Bottom System Status */}
      <div className="absolute bottom-6 z-20 flex flex-col items-center gap-2 px-4 text-center opacity-20 transition-opacity group-hover:opacity-100">
        <span className="animate-pulse truncate text-[9px] font-bold tracking-[0.5em]">
          {statusText}
        </span>
      </div>
    </div>
  )
}
