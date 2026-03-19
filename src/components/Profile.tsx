"use client"

import React, { useEffect, useState, memo } from "react"
import { motion } from "framer-motion"
import {
  GithubLogo,
  Briefcase,
  LinkedinLogo,
  GraduationCap,
  ArrowUpRight,
  Fingerprint,
  Shapes,
} from "@phosphor-icons/react"

// --- DATA (2 Jobs + 2 Unis) ---
const PROFILE_DATA = {
  name: "ALEXANDRU",
  surname: "PADURET",
  image: "/your-pic.jpg",
  meta: { id: "XP-042", status: "ACTIVE" },
  roles: ["Full-Stack", "Backend", "Mobile", "Game Dev"],
  work: [
    { title: "Full Stack Dev", org: "Phonia", date: "24-25", level: 90 },
    { title: "Cook / Ops", org: "Huuva Oy", date: "25-26", level: 75 },
  ],
  uni: [
    { title: "B.S. Comp Science", org: "UEF", date: "25-28", level: 100 },
    { title: "High School", org: "Local Acad", date: "21-24", level: 100 },
  ],
}

// --- COMPONENTS ---

const CompactExp = memo(
  ({ item, isUni = false }: { item: any; isUni?: boolean }) => (
    <div
      className={`relative flex items-center justify-between border-l-2 p-3 transition-all ${
        isUni
          ? "border-primary bg-primary/5 shadow-[inset_4px_0_12px_-6px_var(--primary)]"
          : "border-primary/20 bg-background/20 hover:border-primary/50 hover:bg-primary/5"
      }`}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex items-center gap-3">
          <span
            className={`text-[11px] font-black tracking-widest uppercase md:text-[12px] ${
              isUni ? "text-primary" : "text-foreground"
            }`}
          >
            {item.title}
          </span>
          <span className="font-mono text-[8px] font-bold text-primary/40">
            // {item.date}
          </span>
        </div>
        <span className="truncate text-[9px] font-bold tracking-tighter text-primary/50 uppercase">
          {item.org}
        </span>
      </div>

      <div className="ml-4 flex shrink-0 flex-col items-end gap-1">
        <span className="font-mono text-[9px] font-black text-primary/80">
          {item.level}%
        </span>
        <div className="h-[3px] w-14 bg-primary/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${item.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-primary shadow-[0_0_8px_var(--primary)]"
          />
        </div>
      </div>
    </div>
  )
)

const IdentityHeader = ({ activeRole }: { activeRole: string }) => (
  <div className="relative flex flex-col justify-between border border-primary/20 bg-background/40 p-5 backdrop-blur-md md:col-span-8 md:row-span-2">
    <div className="absolute top-2 right-4 text-[40px] font-black tracking-tighter text-primary/5 uppercase select-none">
      Root
    </div>

    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 border-l-2 border-primary/40 pl-4">
        <Fingerprint size={14} className="animate-pulse text-primary" />
        <span className="text-[8px] font-black tracking-[0.5em] text-primary/50 uppercase">
          User_Registry // {PROFILE_DATA.meta.id}
        </span>
      </div>
      <h1 className="text-4xl leading-none font-black tracking-tighter text-foreground uppercase md:text-6xl">
        {PROFILE_DATA.name}{" "}
        <span className="text-primary/80 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]">
          {PROFILE_DATA.surname}
        </span>
      </h1>
    </div>

    <div className="flex items-end justify-between border-t border-primary/10 pt-4">
      <div className="flex flex-col">
        <span className="text-[7px] font-bold tracking-[0.4em] text-primary/30 uppercase">
          Thread_Active
        </span>
        <span className="text-[12px] font-black tracking-wider text-primary uppercase">
          {activeRole}
        </span>
      </div>
      <div className="flex gap-4">
        <GithubLogo
          size={22}
          className="cursor-pointer text-primary/30 transition-all hover:scale-110 hover:text-primary"
        />
        <LinkedinLogo
          size={22}
          className="cursor-pointer text-primary/30 transition-all hover:scale-110 hover:text-primary"
        />
      </div>
    </div>
  </div>
)

const AvatarBox = () => (
  <div className="group relative overflow-hidden border border-primary/20 bg-background/60 md:col-span-4 md:row-span-2">
    <img
      src={PROFILE_DATA.image}
      alt=""
      className="h-full w-full object-cover brightness-75 contrast-125 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
    />
    <div className="absolute top-0 right-0 border-b border-l border-primary/20 bg-background/90 px-2 py-1 text-[8px] font-black tracking-widest text-primary uppercase">
      {PROFILE_DATA.meta.status}
    </div>
    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-primary/20" />
  </div>
)

export function Profile() {
  const [activeRole, setActiveRole] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(
      () => setActiveRole((p) => (p + 1) % PROFILE_DATA.roles.length),
      3000
    )
    return () => clearInterval(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex h-full w-full flex-col gap-3 p-4 font-mono text-foreground select-none md:grid md:grid-cols-12 md:grid-rows-6 md:overflow-hidden">
      <AvatarBox />
      <IdentityHeader activeRole={PROFILE_DATA.roles[activeRole]} />

      {/* LEFT SIDE: UNIFIED EXPERIENCE (2 Jobs + 2 Unis) */}
      <div className="flex flex-col gap-3 md:col-span-8 md:row-span-4">
        {/* WORK SECTION */}
        <div className="flex flex-1 flex-col gap-2 border border-primary/10 bg-background/20 p-3">
          <div className="mb-2 flex items-center justify-between border-b border-primary/10 pb-2">
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-primary" />
              <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
                Exp_History
              </span>
            </div>
            <span className="text-[7px] font-bold tracking-widest text-primary/20">
              LOG_V4.0
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {PROFILE_DATA.work.map((item, i) => (
              <CompactExp key={i} item={item} />
            ))}
          </div>
        </div>

        {/* ACADEMIC SECTION */}
        <div className="flex flex-col gap-2 border border-primary/40 bg-primary/5 p-3 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)]">
          <div className="mb-1 flex items-center gap-2 border-b border-primary/20 pb-2">
            <GraduationCap size={16} className="text-primary" />
            <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">
              Academic_Core
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {PROFILE_DATA.uni.map((item, i) => (
              <CompactExp key={i} item={item} isUni />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: LARGE PROJECT TERMINAL */}
      <button className="group relative flex flex-col items-center justify-center overflow-hidden border-2 border-primary bg-primary/10 transition-all hover:bg-primary/20 md:col-span-4 md:row-span-4">
        <motion.div
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 z-10 h-[1px] w-full bg-primary opacity-50 shadow-[0_0_10px_var(--primary)]"
        />

        <Shapes
          size={54}
          weight="thin"
          className="mb-6 text-primary transition-all duration-700 group-hover:scale-110 group-hover:rotate-180"
        />
        <span className="text-3xl font-black tracking-[0.4em] text-primary drop-shadow-[0_0_15px_var(--primary)]">
          PROJECTS
        </span>
        <span className="mt-3 text-[8px] font-bold tracking-[0.8em] text-primary/40 uppercase">
          Uplink.v4.Terminal
        </span>
      </button>

      {/* BOTTOM NAVIGATION BUTTONS */}
      <div className="grid grid-cols-2 gap-3 md:col-span-12 md:row-span-1">
        {["DATABASE", "BIOGRAPHY"].map((label) => (
          <button
            key={label}
            className="group relative flex items-center justify-between border border-primary/20 bg-background/40 px-6 py-3 transition-all hover:bg-primary/5"
          >
            <span className="text-[11px] font-black tracking-[0.5em] text-primary/60 uppercase transition-colors group-hover:text-primary">
              {label}
            </span>
            <ArrowUpRight
              size={18}
              className="text-primary/20 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary"
            />
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
          </button>
        ))}
      </div>
    </div>
  )
}
