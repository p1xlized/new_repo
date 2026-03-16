import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { AnimatePresence, motion } from "framer-motion"
import {
  Browser,
  FileText,
  GithubLogo,
  GlobeHemisphereWest,
  LinkedinLogo,
  TerminalWindow,
} from "@phosphor-icons/react"
import { Profile, SlotWrapper } from "@/components/Profile"
import { tools } from "@/data/profile_data"
import { SystemLoader } from "@/components/Loader"
import PinnedProject from "@/components/PinnedCard"
import { ContactForm } from "@/components/ContactMe"
import BoxButton from "@/components/BoxButton"
import ExperienceCard from "@/components/ExperienceCard"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/")({ component: App })
const links = [
  {
    name: "GitHub",
    icon: <GithubLogo size={20} />,
    href: "https://github.com/yourusername",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinLogo size={20} />,
    href: "https://linkedin.com/in/yourusername",
  },
  { name: "Upworks", icon: <Browser size={20} />, href: "/projects" },
  { name: "Resume", icon: <FileText size={20} />, href: "/resume.pdf" },
]
function App() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  return (
    <>
      {/* 1. Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{
              scaleY: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[100] origin-top"
          >
            <SystemLoader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background p-2 sm:p-4 md:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: loading ? 0 : 1, scale: loading ? 0.98 : 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={cn(
            "bg-card relative z-10 flex w-full max-w-7xl flex-col overflow-hidden border border-primary/20 shadow-2xl transition-colors duration-500 hover:border-primary/40",
            "mt-12 h-[92dvh] md:mt-0 md:h-[85vh]"
          )}
        >
          <div className="flex flex-1 flex-col overflow-hidden p-3 md:p-8">
            <Profile
              title="A. Paduret"
              avatarSrc="/assets/imgs/avatar.jpg"
              tools={tools}
            >
              <SlotWrapper className="bg-muted/5 dark:bg-card/40 flex flex-col overflow-hidden border-primary/10 lg:col-span-2">
                <div className="flex h-full flex-col p-4 2xl:p-8">
                  <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto pr-2 2xl:space-y-10">
                    {/* WORK HISTORY SECTION */}
                    <section>
                      <div className="mb-3 flex items-center gap-2 border-b border-primary/10 pb-2 text-[9px] font-black tracking-[0.2em] text-primary/50 uppercase 2xl:text-[11px]">
                        <span className="size-1 bg-primary 2xl:size-1.5" />{" "}
                        WORK_HISTORY
                      </div>
                      <div className="space-y-1 2xl:space-y-2">
                        <ExperienceCard
                          variant="freelance"
                          title="Remote"
                          subtitle="Freelance Engineer"
                          location="GLO"
                          date="25-PRS"
                        />
                        <ExperienceCard
                          variant="work"
                          title="Phonia"
                          subtitle="Full Stack Dev"
                          location="FI"
                          date="24-25"
                        />
                      </div>
                    </section>

                    {/* ACADEMIC LOG SECTION */}
                    <section>
                      <div className="mb-3 flex items-center gap-2 border-b border-primary/10 pb-2 text-[9px] font-black tracking-[0.2em] text-primary/50 uppercase 2xl:text-[11px]">
                        <span className="size-1 bg-primary 2xl:size-1.5" />{" "}
                        ACADEMIC_LOG
                      </div>
                      <div className="space-y-1 2xl:space-y-2">
                        <ExperienceCard
                          variant="study"
                          title="UEF"
                          subtitle="BSc Comp Sci"
                          location="FI"
                          date="25-PRS"
                        />
                        <ExperienceCard
                          variant="degree"
                          title="C. Maisonneuve"
                          subtitle="Software Dev"
                          location="CA"
                          date="21-24"
                        />
                      </div>
                    </section>
                  </div>

                  {/* SYSTEM FOOTER */}
                  <div className="text-muted-foreground/20 mt-auto hidden justify-between border-t border-primary/5 pt-4 text-[8px] font-bold uppercase md:flex 2xl:text-[10px]">
                    <span>SYS_NODE_v1.0 // ACTIVE</span>
                    <span>RENDER_MODE: OPTIMIZED_ULTRAWIDE</span>
                  </div>
                </div>
              </SlotWrapper>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-3 overflow-hidden">
                <SlotWrapper className="bg-muted/10 dark:bg-card/40 flex h-40 shrink-0 items-center justify-center overflow-hidden border-primary/10 md:h-auto md:flex-[2]">
                  <BoxButton
                    title="Contact_Operator"
                    label="ESTABLISH_UPLINK"
                    gifSrc="/assets/gifs/project-hero.gif"
                    onClick={() => {
                      const contactSection = document.getElementById("contact")
                      if (contactSection) {
                        contactSection.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                    }}
                  />
                </SlotWrapper>

                <SlotWrapper className="bg-muted/10 dark:bg-card/30 flex shrink-0 flex-col border-primary/20 p-3 md:p-4">
                  {/* DIRECTORY HEADER - Simplified for icon-only layout */}
                  <div className="mb-4 flex items-center gap-2 text-[9px] font-bold tracking-[0.3em] text-primary uppercase">
                    <div className="flex items-center justify-center gap-1.5 border border-primary/20 bg-primary/10 px-2 py-1">
                      <TerminalWindow size={12} weight="bold" />
                      <span>NODES</span>
                    </div>
                    <div className="h-[1px] flex-1 bg-primary/20" />
                  </div>

                  {/* Icon Grid Container - Centered on all screens */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                    {links.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name} // Keeps the name visible on hover tooltip
                        className="group relative flex transition-all duration-200"
                      >
                        {/* FOLDER/SLOT ICON CONTAINER
                            - Consistent sizing (h-10) for all platforms
                        */}
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-primary/20 bg-primary/[0.03] transition-all group-hover:border-primary/50 group-hover:bg-primary/10">
                          {/* Decorative folder tab */}
                          <div className="absolute -top-[1px] left-0 h-[2px] w-3 bg-primary/40 group-hover:bg-primary" />

                          <div className="relative z-10 text-primary/60 transition-colors group-hover:text-primary">
                            <div className="size-5">{link.icon}</div>
                          </div>

                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.15)_0%,transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />

                          {/* Subtle corner accent on hover */}
                          <div className="absolute right-0 bottom-0 h-1 w-1 bg-primary/0 transition-colors group-hover:bg-primary/40" />
                        </div>
                      </a>
                    ))}
                  </div>
                </SlotWrapper>
              </div>
            </Profile>
          </div>

          {/* BOTTOM STATUS BAR */}
          <div className="bg-muted/30 flex shrink-0 items-center justify-between border-t border-primary/10 px-4 py-2 text-[8px] font-bold tracking-tighter uppercase md:tracking-widest">
            <div className="flex gap-4 opacity-60">
              <span>KUOPIO, FI</span>
              <span className="hidden sm:inline">62.8924 N</span>
            </div>
            <div className="flex gap-4">
              <span className="animate-pulse text-primary">● STABLE_LINK</span>
              <span className="xs:inline hidden text-[7px] italic opacity-20">
                v1.0.4-LATEST
              </span>
            </div>
          </div>
        </motion.div>
      </main>
      <main
        id="contact"
        className="relative mt-12 flex min-h-screen items-center justify-center overflow-hidden bg-background p-4"
      >
        {/* --- MULTI-PLANET ORBITAL SYSTEM --- */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          {/* Increased base size for 2xl screens */}
          <div className="relative h-[600px] w-[600px] md:h-[900px] md:w-[900px] 2xl:h-[1200px] 2xl:w-[1200px]">
            {/* 1. CENTRAL SUN / SYSTEM CORE */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Inner Core */}
              <div className="h-32 w-32 rounded-full bg-primary/10 blur-2xl md:h-48 md:w-48" />
              {/* Outer Glow */}
              <div className="absolute h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.08)_0%,transparent_70%)] blur-3xl" />
            </div>

            {/* 2. INNER PLANET (Fast, Close) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[25%] rounded-full border border-primary/5"
            >
              <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-primary/40 shadow-[0_0_10px_rgba(var(--primary),0.4)]" />
            </motion.div>

            {/* 3. MID-ZONE PLANET (Medium Speed) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[15%] rounded-full border border-primary/10"
            >
              {/* The "Planet" */}
              <div className="absolute top-1/2 -left-3 h-5 w-5 rounded-full border border-primary/20 bg-background shadow-[inset_0_0_10px_rgba(var(--primary),0.2)]">
                {/* Internal Detail */}
                <div className="absolute inset-1 animate-pulse rounded-full bg-primary/10" />
              </div>
            </motion.div>

            {/* 5. ASTEROID RING (Static Decor) */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-full w-full"
                  style={{ transform: `rotate(${i * 60}deg)` }}
                >
                  <div className="absolute top-0 left-1/2 h-[1px] w-20 bg-gradient-to-r from-primary/50 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <SlotWrapper className="z-10 w-full max-w-5xl backdrop-blur-[2px]">
          <ContactForm />
        </SlotWrapper>
      </main>
    </>
  )
}
