import { useState } from "react"
import { ValidationError, useForm } from "@formspree/react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle,
  PaperPlaneTilt,
  TerminalWindow,
} from "@phosphor-icons/react"

export const ContactForm = () => {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID") // Replace with your ID
  const [isHovered, setIsHovered] = useState(false)

  if (state.succeeded) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center space-y-4 border-2 border-primary bg-primary/5 font-mono text-primary">
        <CheckCircle size={48} weight="duotone" className="animate-bounce" />
        <h2 className="text-2xl font-black tracking-tighter uppercase">
          Message_Transmitted
        </h2>
        <p className="text-[10px] opacity-60">
          UPLINK STABLE // EXPECT RESPONSE WITHIN 24H
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 border border-primary px-4 py-2 text-[10px] font-bold transition-all hover:bg-primary hover:text-black"
        >
          SEND_NEW_SIGNAL
        </button>
      </div>
    )
  }

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mx-auto max-w-4xl overflow-hidden p-8 font-mono text-primary transition-colors duration-500"
    >
      {/* --- GIF BACKGROUND OVERLAY (Brighter Version) --- */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <img
              src="/assets/heros/project-hero.gif"
              alt="Background Decor"
              className="h-full w-full object-cover opacity-30 brightness-75 contrast-125 grayscale"
            />
            {/* Blending the brighter GIF with the TUI Scanline effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FORM CONTENT (Z-INDEX 10) --- */}
      <div className="relative z-10">
        <div className="mb-8 flex items-center gap-4 border-b-2 border-primary/20 pb-4">
          <TerminalWindow size={32} weight="bold" />
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase">
              Secure_Uplink_v3.0
            </h1>
            <p className="text-[10px] font-bold tracking-widest text-primary/40 uppercase">
              Encrypted Channel: Alexandru_Paduret //{" "}
              {isHovered ? "UPLINK_LIVE" : "Freelance_Inquiry"}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* User Identity Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] font-black uppercase opacity-60"
                htmlFor="email"
              >
                01_Origin_Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="border-2 border-primary/30 bg-background/70 p-3 text-sm backdrop-blur-sm transition-all focus:border-primary focus:outline-none"
                placeholder="operator@company.com"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-[9px] text-red-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] font-black uppercase opacity-60"
                htmlFor="subject"
              >
                02_Mission_Objective
              </label>
              <select
                id="subject"
                name="subject"
                className="border-2 border-primary/30 bg-background/70 p-3 text-sm uppercase backdrop-blur-sm transition-all focus:border-primary focus:outline-none"
              >
                <option value="full-stack">Full-Stack Development</option>
                <option value="mobile-app">Cross-Platform Mobile</option>
                <option value="consulting">System Architecture</option>
                <option value="legacy-support">Legacy System Refactor</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-[10px] font-black uppercase opacity-60"
                htmlFor="budget"
              >
                03_Estimated_Resources
              </label>
              <input
                id="budget"
                name="budget"
                className="border-2 border-primary/30 bg-background/70 p-3 text-sm backdrop-blur-sm focus:border-primary focus:outline-none"
                placeholder="e.g. $2k - $5k / Timeline: 1mo"
              />
            </div>
          </div>

          {/* Message Section */}
          <div className="flex flex-col gap-2">
            <label
              className="text-[10px] font-black uppercase opacity-60"
              htmlFor="message"
            >
              04_Detailed_Brief
            </label>
            <textarea
              id="message"
              name="message"
              rows={8}
              className="flex-1 border-2 border-primary/30 bg-background/70 p-3 text-sm backdrop-blur-sm transition-all focus:border-primary focus:outline-none"
              placeholder="Initialize detailed project parameters..."
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-[9px] text-red-500"
            />
          </div>

          <div className="md:col-span-2">
            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex w-full items-center justify-center gap-4 bg-primary p-4 font-black text-black uppercase transition-all hover:bg-white disabled:opacity-50"
            >
              <PaperPlaneTilt size={20} weight="bold" />
              <span>Transmit_Uplink.exe</span>

              <div className="absolute inset-0 opacity-0 transition-all group-hover:-inset-1 group-hover:opacity-100">
                <div className="absolute top-0 left-0 size-2 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-0 right-0 size-2 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-0 left-0 size-2 border-b-2 border-l-2 border-primary" />
                <div className="absolute right-0 bottom-0 size-2 border-r-2 border-b-2 border-primary" />
              </div>
            </motion.button>

            {/* --- NEW EMAIL CLAUSE SECTION --- */}
            <div className="mt-8 flex flex-col items-center space-y-4 border-t border-primary/10 pt-8 text-center">
              <div className="flex w-full items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                  OR_DIRECT_ACCESS
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              </div>

              <p className="text-xs tracking-tight opacity-70">
                Prefer standard protocol? Contact terminal directly via:
              </p>

              <a
                href="mailto:alexandru.paduret@proton.me"
                className="group relative text-sm font-black tracking-widest text-primary transition-all hover:tracking-[0.2em]"
              >
                <span className="relative z-10">
                  alexandru.paduret@proton.me
                </span>
                <div className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            </div>

            <div className="mt-8 flex justify-between text-[8px] font-bold opacity-30">
              <span>STK: FORMSPREE_API_v2</span>
              <span>ENCRYPTION: AES-256-TUI</span>
              <span>LOC: FIN_KUOPIO</span>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
