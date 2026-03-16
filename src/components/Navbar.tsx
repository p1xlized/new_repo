"use client"

import * as React from "react"
import { useStore } from "@tanstack/react-store"
import { AnimatePresence, motion } from "framer-motion"
import { List, Moon, Sun, TerminalWindow, X } from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"
import { navbarStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "PROJECTS", path: "/projects", code: "01" },
  { name: "BLOG", path: "/blog", code: "02" },
  { name: "MUSIC", path: "/music", code: "03" },
]

export const Navbar = () => {
  const isVisible = useStore(navbarStore, (state) => state.isVisible)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [isMatrixActive, setIsMatrixActive] = React.useState(false)
  const navigate = useNavigate()

  // 1. Theme Initialization
  React.useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "light" | "dark") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")

    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    setIsMatrixActive(true) // Trigger "Matrix" Morph

    setTimeout(() => {
      const newTheme = theme === "light" ? "dark" : "light"
      setTheme(newTheme)
      document.documentElement.classList.toggle("dark", newTheme === "dark")
      localStorage.setItem("theme", newTheme)
    }, 300)

    setTimeout(() => setIsMatrixActive(false), 1000)
  }

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false)
    navigate({ to: path })
  }

  return (
    <>
      {/* MATRIX MORPH OVERLAY */}
      <AnimatePresence>
        {isMatrixActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          >
            <div className="flex flex-col gap-2 font-mono text-primary">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: [0, 1, 0], x: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="text-[10px] font-bold tracking-[1em]"
                >
                  {Math.random().toString(36).substring(2, 15).toUpperCase()}
                </motion.span>
              ))}
            </div>
            <div className="absolute inset-0 animate-pulse bg-primary/5" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="fixed top-0 left-0 z-[100] w-full border-b border-primary/20 bg-background/80 font-mono backdrop-blur-md"
          >
            <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
              {/* LOGO */}
              <button
                onClick={() => handleNavigation("/")}
                className="group flex items-center gap-3 text-[11px] tracking-[0.4em] uppercase"
              >
                <div className="relative flex items-center justify-center">
                  <TerminalWindow
                    size={22}
                    className="relative z-10 text-primary"
                  />
                  <motion.div
                    animate={
                      isMatrixActive
                        ? { scale: [1, 1.5, 1], rotate: [0, 90, 0] }
                        : {}
                    }
                    className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
                  />
                </div>
                <span className="hidden transition-colors group-hover:text-primary sm:inline">
                  {isMatrixActive ? "OVERRIDING_SYSTEM" : "SYSTEM_INTERFACE"}
                </span>
              </button>

              <div className="flex items-center gap-4">
                {/* STREAMLINED DESKTOP NAV */}
                <div className="hidden h-full items-center md:flex">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className="group relative px-6 text-[10px] tracking-[0.3em] transition-all"
                    >
                      <span
                        className={cn(
                          "relative z-10 transition-colors duration-500",
                          isMatrixActive
                            ? "animate-pulse text-primary"
                            : "text-primary/60 group-hover:text-primary"
                        )}
                      >
                        {item.name}
                      </span>
                      <div className="absolute -bottom-4 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full" />
                    </button>
                  ))}
                </div>

                {/* THEME TOGGLE WITH MORPH EFFECT */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="group relative flex size-10 items-center justify-center overflow-hidden border border-primary/10 transition-all hover:border-primary/40 active:scale-90"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={theme}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {theme === "dark" ? (
                          <Sun size={18} />
                        ) : (
                          <Moon size={18} />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </button>

                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex size-10 items-center justify-center text-primary md:hidden"
                  >
                    {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
                  </button>
                </div>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ opacity: 0, clipPath: "inset(0% 0% 100% 0%)" }}
            className="fixed inset-0 z-[90] flex flex-col bg-background/95 p-8 pt-24 font-mono backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className="group flex flex-col gap-1 border-l-2 border-primary/10 pl-6 transition-all hover:border-primary"
                >
                  <span className="text-[10px] text-primary/40">
                    {item.code}
                  </span>
                  <span className="text-3xl font-black tracking-tighter text-foreground uppercase transition-all group-hover:tracking-widest">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
export default Navbar
