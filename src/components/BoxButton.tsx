import { GlobeHemisphereWest } from "@phosphor-icons/react" // Fixed the import name
import { cn } from "@/lib/utils"

interface BoxButtonProps {
  title: string
  label: string
  gifSrc?: string
  className?: string
  onClick?: () => void
}

export default function BoxButton({
  title,
  label,
  gifSrc,
  className,
  onClick,
}: BoxButtonProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group/btn relative flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden p-4 text-center transition-all duration-300 md:p-8",
        className
      )}
    >
      {/* 1. ADAPTIVE BACKGROUND GIF */}
      {gifSrc && (
        <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-700 group-hover/btn:opacity-100">
          <img
            src={gifSrc}
            alt="background-anim"
            className="h-full w-full object-cover opacity-10 brightness-110 grayscale dark:brightness-150 dark:invert"
          />
        </div>
      )}

      {/* 2. PLANET ICON (Responsive Scaling) */}
      <div className="relative z-20 mb-3 flex items-center justify-center md:mb-6">
        {/* Atmosphere Ping - Smaller on mobile */}
        <div className="absolute size-12 scale-150 animate-ping rounded-full border border-primary/5 transition-colors group-hover/btn:border-primary/20 md:size-24" />

        <div className="relative transition-transform duration-500 group-hover/btn:scale-110">
          <GlobeHemisphereWest
            weight="fill"
            // Mobile: 32px, Desktop: 64px
            className="h-8 w-8 animate-[spin_20s_linear_infinite] text-primary opacity-30 transition-opacity group-hover/btn:opacity-100 md:h-16 md:w-16"
          />
        </div>
      </div>

      {/* 3. TEXT INTERFACE - Tighter on mobile */}
      <div className="relative z-20 flex flex-col items-center space-y-2 md:space-y-4">
        <span className="block text-[8px] font-black tracking-[0.3em] text-primary/50 uppercase md:text-[10px] md:tracking-[0.5em]">
          {title}
        </span>

        <div className="text-primary-foreground relative inline-block overflow-hidden border border-primary bg-primary px-6 py-2 text-[9px] font-black transition-all group-hover/btn:shadow-[0_0_30px_rgba(var(--primary),0.3)] md:px-10 md:py-3 md:text-[11px]">
          <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 ease-in-out group-hover/btn:translate-x-full" />
          <span className="relative z-10 tracking-[0.1em] uppercase md:tracking-[0.2em]">
            {label}
          </span>
        </div>
      </div>

      {/* 4. HUD BRACKETS */}
      <div className="pointer-events-none absolute inset-2 border border-primary/0 transition-all duration-500 group-hover/btn:border-primary/10 md:inset-4">
        <div className="absolute top-0 left-0 size-2 border-t border-l border-primary/40" />
        <div className="absolute right-0 bottom-0 size-2 border-r border-b border-primary/40" />
      </div>
    </div>
  )
}
