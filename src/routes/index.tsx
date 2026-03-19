"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { createFileRoute } from "@tanstack/react-router"
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion"
import {
  ShieldCheck,
  ArrowDown,
  Planet,
  Crosshair,
  Cpu,
  GithubLogo,
  TrendUp,
  ChartBar,
  Layout,
  Code,
  Database,
  TerminalWindow,
  CircuitryIcon,
} from "@phosphor-icons/react"

// Components
import { Profile } from "@/components/Profile"
import { SystemLoader } from "@/components/Loader"
import { ContactSection } from "@/components/ContactMe"

export const Route = createFileRoute("/")({ component: App })

const STATS_DATA = {
  tools: [
    { name: "React / Next.js", icon: <Layout size={18} />, level: 95 },
    { name: "TypeScript", icon: <Code size={18} />, level: 90 },
    { name: "Node.js / Go", icon: <TerminalWindow size={18} />, level: 85 },
    { name: "PostgreSQL", icon: <Database size={18} />, level: 88 },
  ],
  github: [
    {
      label: "Total Contributions",
      value: "2,400+",
      icon: <TrendUp size={16} />,
    },
    {
      label: "Active Repositories",
      value: "34",
      icon: <GithubLogo size={16} />,
    },
    { label: "System Uptime", value: "99.9%", icon: <ChartBar size={16} /> },
  ],
}

// --- SUB-COMPONENTS ---

const StatsSection = () => (
  <div className="grid h-full w-full max-w-6xl grid-cols-1 gap-8 p-6 md:grid-cols-12 md:p-12">
    <div className="flex flex-col gap-6 md:col-span-7">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <Cpu size={28} className="animate-pulse text-primary" />
        <h2 className="text-xl font-bold tracking-[0.2em] uppercase">
          Tech_Capabilities
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {STATS_DATA.tools.map((tool) => (
          <motion.div
            key={tool.name}
            whileHover={{
              scale: 1.02,
              backgroundColor: "rgba(var(--primary-rgb), 0.1)",
            }}
            className="group relative overflow-hidden border border-primary/10 bg-primary/5 p-5 transition-all"
          >
            <div className="mb-4 flex items-center gap-3 text-primary/60 group-hover:text-primary">
              {tool.icon}
              <span className="text-[11px] font-bold tracking-widest uppercase">
                {tool.name}
              </span>
            </div>
            <div className="h-1.5 w-full bg-primary/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${tool.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary shadow-[0_0_15px_var(--primary)]"
              />
            </div>
            <span className="mt-2 block text-right text-[8px] font-bold tracking-tighter text-primary/30 uppercase">
              Mastery_Index: {tool.level}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-6 md:col-span-5">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <GithubLogo size={28} className="text-primary" />
        <h2 className="text-xl font-bold tracking-[0.2em] uppercase">
          Uplink_Stats
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {STATS_DATA.github.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col border-l-2 border-primary/20 bg-primary/[0.02] p-5 transition-all hover:border-primary hover:bg-primary/5"
          >
            <div className="mb-1 flex items-center gap-2 text-primary/40">
              {stat.icon}
              <span className="text-[10px] font-bold tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
            <span className="text-4xl font-bold tracking-tighter text-foreground tabular-nums">
              {stat.value}
            </span>
          </div>
        ))}
        <div className="relative mt-auto hidden h-32 w-full overflow-hidden border border-primary/10 bg-primary/5 p-4 md:block">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <CircuitryIcon size={64} className="animate-pulse text-primary" />
          </div>
          <div className="animate-scanline absolute inset-0 bg-[linear-gradient(transparent_0%,theme(colors.primary.DEFAULT/0.05)_50%,transparent_100%)] bg-[size:100%_4px]" />
          <span className="absolute bottom-2 left-2 text-[8px] font-bold tracking-widest text-primary/40 uppercase">
            Live_Diagnostics_Pulse
          </span>
        </div>
      </div>
    </div>
  </div>
)

// --- MAIN APP COMPONENT ---

function App() {
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState("")
  const [activeSection, setActiveSection] = useState("INITIALIZING")
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    container: containerRef ? { current: containerRef } : undefined,
  })

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Section Observer Logic
  useEffect(() => {
    if (!containerRef) return
    const options = { threshold: 0.5 }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id.replace("-module", "").toUpperCase())
        }
      })
    }, options)

    const sections = containerRef.querySelectorAll("section")
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [containerRef, loading])

  const scrollToNext = () => {
    containerRef?.scrollBy({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-sans text-foreground selection:bg-primary/30">
      {/* ENHANCED SIDEBAR PROGRESS (NAV_POS) */}
      {!loading && (
        <div className="fixed top-1/2 right-4 z-[60] flex h-48 w-4 -translate-y-1/2 flex-col items-center gap-3 md:right-8 md:h-80 md:w-6">
          <span className="text-[8px] font-black tracking-[0.4em] text-primary uppercase [writing-mode:vertical-lr]">
            NAV_SYSTEM
          </span>
          <div className="relative w-[3px] flex-1 border-x border-primary/5 bg-primary/10 md:w-[6px]">
            <motion.div
              className="absolute top-0 w-full bg-primary shadow-[0_0_20px_var(--primary)]"
              style={{ scaleY, originY: 0, height: "100%" }}
            />
            {/* Tick Marks */}
            <div className="absolute inset-y-0 -left-1 flex flex-col justify-between py-2 text-[6px] text-primary/20">
              <span>01</span>
              <span>02</span>
              <span>03</span>
            </div>
          </div>
        </div>
      )}

      {/* LOADER */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            exit={{
              scaleY: 0,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed inset-0 z-[100] origin-top bg-background"
          >
            <SystemLoader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLOBAL HUD */}
      <div className="pointer-events-none fixed inset-0 z-50 flex flex-col justify-between p-4 antialiased md:p-10">
        <header className="mt-2 flex items-start justify-between">
          <div className="flex flex-col gap-1 border-l-2 border-primary/60 pl-4">
            <span className="text-[9px] font-bold tracking-[0.3em] text-primary uppercase">
              SCTR_COORDS: 62.8925° N, 27.6770° E
            </span>
            <span className="text-[8px] tracking-widest text-primary/40 uppercase">
              NODE_KUOPIO_STABLE
            </span>
          </div>

          {/* DYNAMIC SECTION DECODER (Replaces Radar) */}
          <div className="flex flex-col items-end border-r-2 border-primary/60 pr-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                ACTIVE_MODULE: {activeSection}
              </span>
            </div>
            <p className="text-[14px] font-bold text-foreground tabular-nums opacity-80">
              {time}
            </p>
          </div>
        </header>

        <footer className="flex items-end justify-between border-t border-primary/10 pt-6">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-black tracking-[0.5em] text-primary/80 uppercase">
              PIXLIZED_OS_v1.0.4
            </span>
            <div className="h-1 w-32 bg-primary/10">
              <motion.div
                className="h-full bg-primary/40"
                style={{ width: "40%" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 text-primary">
            <ShieldCheck
              size={24}
              weight="bold"
              className="drop-shadow-[0_0_5px_var(--primary)]"
            />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
              SECURE_UPLINK_ESTABLISHED
            </span>
          </div>
        </footer>
      </div>

      {!loading && (
        <div
          ref={setContainerRef}
          className="hide-scrollbar relative z-10 h-screen w-full snap-y snap-mandatory overflow-y-auto scroll-smooth"
        >
          {/* SECTION 1: PROFILE */}
          <section
            id="profile-module"
            className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-hidden bg-background px-4"
          >
            <SystemGridBackground />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="relative w-full max-w-6xl"
            >
              <Profile />
            </motion.div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <button
                onClick={scrollToNext}
                className="group flex flex-col items-center gap-2"
              >
                <span className="text-[8px] font-bold tracking-[0.3em] text-primary/40 uppercase">
                  Intelligence_Module
                </span>
                <ArrowDown size={20} className="animate-bounce text-primary" />
              </button>
            </div>
          </section>

          {/* SECTION 2: STATS */}
          <section
            id="stats-module"
            className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-hidden bg-background"
          >
            <SystemGridBackground />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative z-10 flex w-full justify-center"
            >
              <StatsSection />
            </motion.div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
              <button
                onClick={scrollToNext}
                className="group flex flex-col items-center gap-2"
              >
                <span className="text-[8px] font-bold tracking-[0.3em] text-primary/40 uppercase">
                  Contact_Protocol
                </span>
                <ArrowDown size={20} className="text-primary" />
              </button>
            </div>
          </section>

          {/* SECTION 3: CONTACT */}
          <section
            id="contact-module"
            className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-hidden bg-background"
          >
            <SidebarSystemBackground />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-20 w-full max-w-4xl"
            >
              <ContactSection />
            </motion.div>
          </section>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scanline { from { transform: translateY(-100%); } to { transform: translateY(100%); } }
        .animate-scanline { animation: scanline 3s linear infinite; }
        .animate-orbit-clock { animation: orbit-clock 25s linear infinite; }
      `}</style>
    </div>
  )
}

const SystemGridBackground = () => (
  <div className="pointer-events-none absolute inset-0 z-0 bg-background">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary.DEFAULT/0.03)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary.DEFAULT/0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,theme(colors.background.DEFAULT)_90%)]" />
  </div>
)

const SidebarSystemBackground = () => {
  const debris = useMemo(
    () =>
      [...Array(8)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 20 + Math.random() * 10,
      })),
    []
  )
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-1/2 -right-32 h-[500px] w-[500px] -translate-y-1/2 opacity-20 md:h-[800px] md:w-[800px]">
        <div className="relative h-full w-full">
          <div className="animate-orbit-clock absolute inset-0 rounded-full border-2 border-dashed border-primary/20" />
          <div className="absolute top-1/2 left-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-primary/30 bg-background">
            <Planet size={64} weight="fill" className="text-primary" />
          </div>
        </div>
      </div>
      {debris.map((d) => (
        <motion.div
          key={d.id}
          initial={{ left: `${d.x}%`, top: `${d.y}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: d.duration, repeat: Infinity }}
          className="absolute text-primary"
        >
          <Crosshair size={12} />
        </motion.div>
      ))}
    </div>
  )
}

export default App
