import React from "react"
import {
  Briefcase,
  GraduationCap,
  Code,
  Certificate,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface ExperienceCardProps {
  title: string
  subtitle: string
  location: string
  date: string
  variant: "work" | "study" | "freelance" | "degree"
}

const variantConfigs = {
  work: { icon: Briefcase },
  study: { icon: GraduationCap },
  freelance: { icon: Code },
  degree: { icon: Certificate },
}

export function ExperienceCard({
  title,
  subtitle,
  location,
  date,
  variant,
}: ExperienceCardProps) {
  const Icon = variantConfigs[variant].icon

  return (
    <div className="group/card -mx-2 flex items-center gap-3 px-3 py-2 transition-all hover:bg-primary/5 2xl:gap-5 2xl:py-3">
      {/* Dynamic Icon Scaling */}
      <Icon
        weight="bold"
        className="size-3.5 shrink-0 text-primary/40 transition-colors group-hover/card:text-primary 2xl:size-5"
      />

      {/* Primary Info */}
      <div className="flex flex-1 items-baseline justify-between gap-4 overflow-hidden">
        <div className="flex flex-col overflow-hidden md:flex-row md:items-baseline md:gap-2">
          <span className="shrink-0 truncate text-[11px] text-foreground uppercase 2xl:text-sm">
            {subtitle}
          </span>
          <span className="text-muted-foreground/60 truncate text-[10px] uppercase 2xl:text-[11px]">
            @ {title}
          </span>
        </div>

        {/* Metadata Stacked Right */}
        <div className="flex shrink-0 items-center gap-3 font-mono text-[9px] 2xl:text-[11px]">
          <span className="hidden text-primary/30 uppercase md:inline">
            {location}
          </span>
          <span className="w-16 border-l border-primary/10 pl-3 text-right text-primary/60 2xl:w-24 2xl:pl-5">
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
