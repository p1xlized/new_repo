import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Medal } from "@phosphor-icons/react"

interface PinnedProjectProps {
  title: string
  image: string
  awards?: Array<{ label: string }> // Optional awards for later
}

const PinnedProject = ({ title, image, awards }: PinnedProjectProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-full w-full flex-col justify-between overflow-hidden bg-background p-4 font-mono transition-colors duration-300"
    >
      {/* 1. HOVER IMAGE OVERLAY */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover brightness-50 contrast-125 grayscale"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-30" />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CONTENT WRAPPER */}
      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h4 className="text-lg font-black tracking-tighter text-primary uppercase">
              {`> ${title}`}
            </h4>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              <span className="text-[9px] font-bold tracking-widest text-primary/60 uppercase group-hover:text-primary">
                {isHovered ? "VISUAL_DATA_STREAM" : "Remote_Sync_Active"}
              </span>
            </div>
          </div>
          <div className="text-[10px] font-bold opacity-20 group-hover:opacity-100">
            [SYS_UNIT_01]
          </div>
        </div>

        {/* --- AWARDS SECTION (Optional) --- */}
        {awards && awards.length > 0 && (
          <motion.div
            animate={{ opacity: isHovered ? 0.5 : 1 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {awards.map((award, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 border border-primary/30 bg-primary/5 px-2 py-1"
              >
                <Medal size={12} className="text-primary" weight="bold" />
                <span className="text-[8px] font-black tracking-tighter text-primary uppercase">
                  {award.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Footer: Progress/Load Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-[8px] font-bold uppercase opacity-40 group-hover:opacity-80">
            <span>{isHovered ? "RENDER_COMPLETE" : "Optimization_Load"}</span>
            <span>98%</span>
          </div>
          <div className="h-1 w-full overflow-hidden bg-primary/10">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PinnedProject
