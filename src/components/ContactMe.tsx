"use client"

import { useForm } from "@formspree/react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PaperPlaneTilt,
  TerminalWindow,
  Target,
  CaretRight,
  Cpu,
  ShieldCheck,
  CheckCircle,
} from "@phosphor-icons/react"

export const ContactSection = () => {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID")

  const itemVariants = {
    hidden: { x: -5, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  }

  return (
    <section className="bg-card/40 relative mx-auto w-full border border-primary/10 p-4 font-mono text-primary shadow-2xl backdrop-blur-xl">
      {/* --- UNIFIED PROFILE-STYLE DECORATIONS --- */}
      {/* TOP-LEFT DATA STREAM */}
      <div className="absolute -top-[1px] left-4 flex items-center gap-2 md:left-8">
        <div className="h-[2px] w-8 bg-primary shadow-[0_0_10px_var(--primary)] md:w-12" />
        <span className="text-[6px] font-black tracking-[0.2em] text-primary/60 md:text-[7px] md:tracking-[0.3em]">
          UPLINK_ESTABLISHED
        </span>
      </div>

      {/* SIDE FRAME BRACES - Hidden on Mobile */}
      <div className="absolute inset-y-8 -left-[1px] hidden w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
      <div className="absolute inset-y-8 -right-[1px] hidden w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />

      {/* BOTTOM-RIGHT INDEX */}
      <div className="absolute right-4 -bottom-[1px] flex items-center gap-2 md:right-8">
        <span className="text-[6px] font-black tracking-[0.2em] text-primary/60 md:text-[7px] md:tracking-[0.3em]">
          TRNSMSN_V1.0.4
        </span>
        <div className="h-[2px] w-8 bg-primary shadow-[0_0_10px_var(--primary)] md:w-12" />
      </div>
      {/* --------------------------------------- */}

      <AnimatePresence mode="wait">
        {state.succeeded ? (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex h-[450px] flex-col items-center justify-center p-6 text-center"
          >
            <CheckCircle
              size={60}
              weight="duotone"
              className="mb-4 animate-pulse"
            />
            <h2 className="text-2xl font-black tracking-tighter uppercase italic">
              Uplink_Confirmed
            </h2>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 border border-primary px-6 py-2 text-[10px] font-black transition-all hover:bg-primary hover:text-black"
            >
              RESTART_TERMINAL
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            {/* LEFT: FORM SECTION */}
            <div className="flex-1 p-6 sm:p-8 md:p-12">
              <header className="mb-8 flex items-center justify-between border-b border-primary/10 pb-4">
                <div className="flex items-center gap-2">
                  <TerminalWindow size={20} weight="fill" />
                  <h1 className="text-lg font-black tracking-tighter uppercase italic">
                    Secure_Uplink
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold opacity-50">
                  <ShieldCheck size={14} /> <span>SSL_ACTIVE</span>
                </div>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <motion.div variants={itemVariants} className="space-y-2">
                    <label
                      className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary/70 uppercase"
                      htmlFor="email"
                    >
                      <CaretRight size={12} weight="bold" /> 01_Origin
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full border-b border-primary/20 bg-transparent py-1 text-sm font-bold text-white transition-all placeholder:opacity-10 focus:border-primary focus:outline-none"
                      placeholder="USER@DOMAIN.COM"
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-2">
                    <label
                      className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary/70 uppercase"
                      htmlFor="subject"
                    >
                      <CaretRight size={12} weight="bold" /> 02_Protocol
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full border-b border-primary/20 bg-transparent py-1 text-sm font-bold text-white focus:border-primary focus:outline-none"
                    >
                      <option value="dev" className="bg-black">
                        FULL_STACK
                      </option>
                      <option value="sys" className="bg-black">
                        ARCHITECTURE
                      </option>
                      <option value="mobile" className="bg-black">
                        MOBILE_SYS
                      </option>
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <label
                    className="flex items-center gap-2 text-[10px] font-black tracking-widest text-primary/70 uppercase"
                    htmlFor="message"
                  >
                    <CaretRight size={12} weight="bold" /> 03_Briefing
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full border border-primary/20 bg-primary/5 p-4 text-sm font-medium text-white transition-all focus:border-primary/60 focus:outline-none"
                    placeholder="ENTER MISSION PARAMETERS..."
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{
                    backgroundColor: "var(--primary)",
                    color: "#000",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex w-full items-center justify-between border border-primary p-5 text-[11px] font-black tracking-[0.4em] uppercase transition-colors"
                >
                  <span className="flex items-center gap-3 italic">
                    <Cpu size={22} />{" "}
                    {state.submitting ? "SENDING..." : "TRANSMIT"}
                  </span>
                  <PaperPlaneTilt size={22} weight="bold" />
                </motion.button>
              </form>
            </div>

            {/* RIGHT: STATUS PANEL */}
            <div className="relative flex flex-col items-center justify-center border-primary/10 bg-primary/[0.02] p-8 lg:w-[280px] lg:border-l">
              <div className="relative h-32 w-32">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-primary/20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-4 rounded-full border border-primary/10"
                >
                  <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_10px_#10b981]" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target size={34} className="text-primary/20" />
                </div>
              </div>

              <div className="mt-8 w-full space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[8px] font-black uppercase opacity-40">
                    <span>Uplink</span>
                    <span>99.2%</span>
                  </div>
                  <div className="h-[2px] w-full overflow-hidden bg-primary/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "99.2%" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </div>
                <div className="text-[7px] leading-relaxed font-bold text-primary/30 uppercase italic">
                  &gt; STATUS_OPTIMAL
                  <br />
                  &gt; NODE_KUOPIO_ACTIVE
                  <br />
                  &gt; AWAITING_ENCRYPT
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <footer className="flex items-center justify-between border-t border-primary/10 bg-primary/5 px-8 py-4">
        <span className="text-[9px] font-black tracking-widest opacity-70">
          ALEXANDRU.PADURET@PROTON.ME
        </span>
        <span className="hidden text-[8px] font-black italic opacity-20 sm:block">
          DIRECT_FREQ_01
        </span>
      </footer>
    </section>
  )
}
