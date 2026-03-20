"use client"

import React from "react"
import { useForm } from "@formspree/react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  CaretDown,
  Cpu,
  EnvelopeSimple,
  Fingerprint,
  Radioactive,
  Broadcast,
  CornersOut,
} from "@phosphor-icons/react"

const UI_DATA = {
  protocols: [
    { value: "fullstack", label: "FULL_STACK" },
    { value: "backend", label: "BACKEND" },
    { value: "mobile", label: "MOBILE" },
    { value: "game", label: "ENGINE" },
  ],
  contact: {
    email: "alex@pixlized.net",
  },
}

export default function ContactUplink() {
  const [state, handleSubmit] = useForm("YOUR_FORMSPREE_ID")

  return (
    <motion.div
      whileHover={{ scale: 0.995 }}
      className="group relative w-full max-w-xl overflow-hidden border border-primary/40 bg-background/60 p-8 text-left transition-all hover:border-primary md:p-12"
    >
      {/* --- 1. BACKGROUND ANIMATIONS --- */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-[0.03] transition-opacity duration-700 group-hover:opacity-10">
        <motion.svg
          viewBox="0 0 100 100"
          className="h-full w-full text-foreground"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          {[...Array(6)].map((_, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="50"
              cy="50"
              rx="47"
              ry={8 + i * 8}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.15"
            />
          ))}
        </motion.svg>
      </div>
      <div className="relative z-20 mb-10 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl text-foreground uppercase">
              Contact Me
            </span>
            <span className="border border-border bg-muted px-1.5 py-0.5 text-[7px] text-muted-foreground">
              V4.0.5_SEC
            </span>
          </div>
          <div className="text-[9px] tracking-widest text-muted-foreground uppercase">
            V_2.0 // Net_Deployment: PIXL_01
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <CornersOut
            size={24}
            className="text-muted-foreground/40 transition-all group-hover:rotate-90 group-hover:text-primary"
          />
          <span className="text-[6px] tracking-[0.3em] text-foreground uppercase">
            Secure_Comm
          </span>
        </div>
      </div>
      {/* --- 3. TRANSMISSION FORM --- */}
      <form onSubmit={handleSubmit} className="relative z-20 space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-[12px] tracking-[0.3em] text-primary uppercase">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="IDENTITY@NODE"
              className="w-full border-b border-border bg-transparent py-2 font-mono text-base text-foreground transition-all outline-none placeholder:text-foreground/60 focus:border-primary focus:bg-primary/5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[12px] tracking-[0.3em] text-primary uppercase">
              Type
            </label>
            <div className="relative">
              <select
                name="protocol"
                className="w-full appearance-none border-b border-border bg-transparent py-2 font-mono text-base text-foreground outline-none focus:border-primary"
              >
                {UI_DATA.protocols.map((p) => (
                  <option
                    key={p.value}
                    value={p.value}
                    className="bg-background text-foreground"
                  >
                    /{p.label}_LINK
                  </option>
                ))}
              </select>
              <CaretDown
                size={14}
                className="absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[12px] tracking-[0.3em] text-primary uppercase">
            Data_Payload
          </label>
          <textarea
            name="message"
            required
            rows={3}
            placeholder="INITIALIZE_TRANSMISSION_SEQUENCE..."
            className="w-full resize-none border-b border-border bg-transparent py-2 font-mono text-base text-foreground transition-all outline-none placeholder:text-muted-foreground/30 focus:border-primary focus:bg-primary/5"
          />
        </div>

        <motion.button
          type="submit"
          disabled={state.submitting}
          className="group/btn relative flex w-full items-center justify-between border border-border bg-secondary/50 px-6 py-5 transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
        >
          <div className="flex items-center gap-4">
            <Cpu
              size={24}
              className="transition-transform duration-700 group-hover/btn:rotate-180"
            />
            <span className="text-xs tracking-[0.5em] uppercase">
              {state.submitting ? "Uploading" : "Execute_Transmit"}
            </span>
          </div>
          <ArrowRight
            size={20}
            className="transition-transform group-hover/btn:translate-x-2"
          />
        </motion.button>
      </form>
      {/* --- 4. DIRECT UPLINK SECTION --- */}
      <div className="relative z-20 mt-10 border-t border-border pt-8">
        <a
          href={`mailto:${UI_DATA.contact.email}`}
          className="group/email flex items-center justify-between border border-border bg-muted/30 p-4 transition-all hover:border-primary/40 hover:bg-muted"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground group-hover/email:text-primary">
              <Broadcast size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] tracking-[0.3em] text-muted-foreground uppercase">
                Direct_Vector
              </span>
              <span className="text-xs text-foreground">
                {UI_DATA.contact.email}
              </span>
            </div>
          </div>
          <EnvelopeSimple
            size={18}
            className="text-muted-foreground transition-all group-hover/email:translate-x-1 group-hover/email:text-primary"
          />
        </a>
      </div>
      {/* --- 5. FOOTER --- */}
      <div className="relative z-20 mt-8 flex items-center justify-between">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-[7px] text-muted-foreground uppercase">
              Signal
            </span>
            <span className="text-xs text-foreground">ENCRYPTED</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[7px] text-muted-foreground uppercase">
              Status
            </span>
            <span className="text-xs text-foreground">0x00_READY</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Fingerprint size={20} className="mb-1 text-muted-foreground/30" />
          <div className="h-1 w-20 overflow-hidden bg-muted">
            <motion.div
              className="h-full bg-primary/40"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
