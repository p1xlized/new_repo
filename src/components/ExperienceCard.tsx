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
  description?: string[] // Added for expanded info
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
  description = [],
}: ExperienceCardProps) {
  const Icon = variantConfigs[variant].icon

  return (
    <div className="group/card -mx-2 flex flex-col gap-1 px-3 py-2 transition-all hover:bg-primary/5 2xl:gap-2 2xl:py-3">
      <div className="flex items-center gap-3 2xl:gap-5">
        {/* Dynamic Icon Scaling */}
        <Icon
          weight="bold"
          className="size-3.5 shrink-0 text-primary/40 transition-colors group-hover/card:text-primary 2xl:size-5"
        />

        {/* Header Info */}
        <div className="flex flex-1 items-baseline justify-between gap-4 overflow-hidden">
          <div className="flex flex-col overflow-hidden md:flex-row md:items-baseline md:gap-2">
            <span className="shrink-0 truncate text-[11px] font-bold text-foreground uppercase 2xl:text-sm">
              {subtitle}
            </span>
            <span className="text-muted-foreground/60 truncate text-[9px] uppercase 2xl:text-[11px]">
              @ {title}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3 font-mono text-[8px] 2xl:text-[10px]">
            <span className="hidden text-primary/30 uppercase md:inline">
              {location}
            </span>
            <span className="border-l border-primary/10 pl-3 text-right text-primary/60">
              {date}
            </span>
          </div>
        </div>
      </div>

      {/* EXPANDED SECTION: Only visible on larger screens or when grid allows */}
      {description.length > 0 && (
        <div className="mt-1 hidden pl-6.5 md:block 2xl:mt-2">
          <ul className="space-y-1 border-l border-primary/10 pl-3">
            {description.map((item, i) => (
              <li
                key={i}
                className="text-muted-foreground/50 text-[8px] leading-tight tracking-tight uppercase 2xl:text-[10px]"
              >
                <span className="mr-1 text-primary/30">›</span> {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default ExperienceCard
