"use client"

import * as React from "react"
import { useStore } from "@tanstack/react-store"
import { AnimatePresence, motion } from "framer-motion"
import {
  List,
  Moon,
  Sun,
  TerminalWindow,
  X,
  ShieldCheck,
} from "@phosphor-icons/react"
import { useNavigate, useLocation } from "@tanstack/react-router"
import { navbarStore } from "@/lib/store"

const navItems = [
  { name: "PROJECTS", path: "/projects", id: "01" },
  { name: "BLOG", path: "/blog", id: "02" },
  { name: "MUSIC", path: "/music", id: "03" },
]

export const Navbar = () => {
  const isVisible = useStore(navbarStore, (state) => state.isVisible)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const [theme, setTheme] = React.useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "dark"
    }
    return "dark"
  })

  const navigate = useNavigate()
  const location = useLocation()

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.classList.toggle("light", theme === "light")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light")

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-6 left-1/2 z-[100] -translate-x-1/2 font-mono"
          >
            {/* MINIMAL CORE: No Borders, Soft Blur */}
            <div className="relative flex h-10 items-center bg-background/40 px-6 backdrop-blur-xl md:h-11">
              {/* LOGO MODULE */}
              <button
                onClick={() => navigate({ to: "/" })}
                className="group relative mr-6 flex items-center gap-3 transition-all"
              >
                <div className="relative flex h-5 w-5 items-center justify-center bg-primary/5 transition-colors group-hover:bg-primary/10">
                  <TerminalWindow
                    size={14}
                    weight="bold"
                    className="text-primary/70 transition-colors group-hover:text-primary"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <span className="text-[9px] leading-none font-black tracking-[0.2em] text-primary/80 uppercase transition-colors group-hover:text-primary">
                    PIXL_HOME
                  </span>
                  <span className="text-[5px] font-bold tracking-[0.1em] text-primary/20 uppercase">
                    Root_Dir
                  </span>
                </div>
                {/* Minimal Vertical Divider */}
                <div className="ml-4 h-4 w-[1px] bg-primary/10" />
              </button>

              {/* NAV LINKS */}
              <nav className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <button
                      key={item.name}
                      onClick={() => navigate({ to: item.path })}
                      className="group relative px-4 py-2"
                    >
                      <span
                        className={`text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${
                          isActive
                            ? "scale-105 text-primary drop-shadow-[0_0_12px_rgba(var(--primary-rgb),0.8)]"
                            : "text-foreground/30 group-hover:text-primary/60"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* ULTRA-THIN GLOW INDICATOR */}
                      {isActive && (
                        <motion.div
                          layoutId="nav-glow-line"
                          className="absolute bottom-0 left-1/2 h-[1px] w-4 -translate-x-1/2 bg-primary shadow-[0_0_10px_var(--primary)]"
                        />
                      )}
                    </button>
                  )
                })}
              </nav>

              {/* UTILITIES */}
              <div className="ml-2 flex items-center gap-2">
                <div className="mx-2 h-4 w-[1px] bg-primary/10" />
                <button
                  onClick={toggleTheme}
                  className="group flex h-8 w-8 items-center justify-center text-primary/40 transition-colors hover:text-primary"
                >
                  {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex h-8 w-8 items-center justify-center text-primary/60 md:hidden"
                >
                  <List size={20} />
                </button>
              </div>

              {/* SUBTLE BOTTOM DECOR (Glowish) */}
              <div className="absolute -bottom-[1px] left-1/2 h-[1px] w-[60%] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* MOBILE HUD MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-background/90 font-mono backdrop-blur-3xl"
          >
            <div className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate({ to: item.path })
                    setIsMobileMenuOpen(false)
                  }}
                  className="group flex flex-col items-center gap-1"
                >
                  <span className="text-[8px] font-bold tracking-[0.5em] text-primary/20 uppercase">
                    0{item.id}_Sector
                  </span>
                  <span className="text-3xl font-black tracking-widest text-primary/40 transition-all group-hover:text-primary group-hover:drop-shadow-[0_0_15px_var(--primary)]">
                    {item.name}
                  </span>
                </button>
              ))}

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="group mt-12 flex flex-col items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-primary/5 transition-colors group-hover:bg-primary/10">
                  <X
                    size={18}
                    className="text-primary/60 group-hover:text-primary"
                  />
                </div>
                <span className="text-[7px] font-black tracking-[0.4em] text-primary/20 uppercase">
                  Close_Link
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
