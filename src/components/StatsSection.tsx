import {
  GithubLogo,
  Code,
  TerminalWindow,
  ChartBar,
  Layout,
  Database,
  TrendUp,
  Cpu,
} from "@phosphor-icons/react"
import { GraphIcon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "framer-motion"

const STATS_DATA = {
  tools: [
    { name: "React / Next.js", icon: <Layout />, level: 95 },
    { name: "TypeScript", icon: <Code />, level: 90 },
    { name: "Node.js / Go", icon: <TerminalWindow />, level: 85 },
    { name: "PostgreSQL", icon: <Database />, level: 88 },
  ],
  github: [
    { label: "Total Contributions", value: "2,400+", icon: <TrendUp /> },
    { label: "Active Repositories", value: "34", icon: <GithubLogo /> },
    { label: "System Uptime", value: "99.9%", icon: <ChartBar /> },
  ],
}

const StatsSection = () => (
  <div className="grid h-full w-full max-w-6xl grid-cols-1 gap-6 p-6 md:grid-cols-12 md:p-12">
    {/* LEFT: TECH STACK MASTERY */}
    <div className="flex flex-col gap-6 md:col-span-7">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <Cpu size={24} className="animate-pulse text-primary" />
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
            className="group relative overflow-hidden border border-primary/10 bg-primary/5 p-4 transition-all"
          >
            <div className="mb-3 flex items-center gap-3 text-primary/60 group-hover:text-primary">
              {tool.icon}
              <span className="text-[11px] font-bold tracking-widest uppercase">
                {tool.name}
              </span>
            </div>
            {/* Flashy Bar */}
            <div className="h-1 w-full bg-primary/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${tool.level}%` }}
                className="h-full bg-primary shadow-[0_0_10px_var(--primary)]"
              />
            </div>
            <span className="mt-2 block text-right text-[8px] font-bold text-primary/30 uppercase">
              Mastery: {tool.level}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* RIGHT: GITHUB & LIVE METRICS */}
    <div className="flex flex-col gap-6 md:col-span-5">
      <div className="flex items-center gap-3 border-b border-primary/20 pb-4">
        <GithubLogo size={24} className="text-primary" />
        <h2 className="text-xl font-bold tracking-[0.2em] uppercase">
          Uplink_Stats
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {STATS_DATA.github.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col border-l-2 border-primary/20 bg-primary/[0.02] p-4 transition-all hover:border-primary hover:bg-primary/5"
          >
            <div className="mb-1 flex items-center gap-2 text-primary/40">
              {stat.icon}
              <span className="text-[9px] font-bold tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
            <span className="text-3xl font-bold tracking-tighter text-foreground tabular-nums">
              {stat.value}
            </span>
          </div>
        ))}

        {/* Decorative Radar/Graph Mock */}
        <div className="relative mt-auto hidden h-32 w-full border border-primary/10 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT/0.1)_1px,transparent_1px)] bg-[size:10px_10px] p-4 md:block">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <GraphIcon size={48} className="animate-pulse text-primary" />
          </div>
          <span className="absolute bottom-2 left-2 text-[7px] font-bold text-primary/40 uppercase">
            Live_Diagnostics_Pulse
          </span>
        </div>
      </div>
    </div>
  </div>
)
