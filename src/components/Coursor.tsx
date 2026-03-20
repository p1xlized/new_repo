"use client"

import React, { useEffect, useState } from "react"
import { motion, useMotionValue, AnimatePresence } from "framer-motion"

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      const target = e.target as HTMLElement
      const isClickable =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.closest("button, a, [role='button']")

      setIsPointer(!!isClickable)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [cursorX, cursorY])

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] grid place-items-center"
    >
      {/* 1. Outer Rhombus (Border Only) */}
      <motion.div
        animate={{
          rotate: isPointer ? 135 : 45,
          scale: isPointer ? 1.2 : 1,
          opacity: isPointer ? 0.8 : 0.2,
        }}
        className="absolute size-6 border border-primary bg-transparent"
      />

      {/* 2. Inner Ring (Border Only) */}
      <motion.div
        animate={{
          scale: isPointer ? 0.7 : 1,
          opacity: isPointer ? 1 : 0.4,
        }}
        className="absolute size-3 rounded-full border border-primary/20 shadow-[0_0_5px_var(--primary)]"
      />

      {/* 3. The Core Active Dot (Solid Point) */}
      <motion.div
        animate={{
          scale: isClicked ? 0.6 : 1,
          opacity: isClicked ? 0.5 : 1,
        }}
        className="relative z-10 size-1 bg-primary shadow-[0_0_8px_var(--primary)]"
      />

      {/* 4. Click Pulse (Hollow expansion) */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 1, opacity: 1, rotate: 45 }}
            animate={{ scale: 2.5, opacity: 0, rotate: 90 }}
            exit={{ opacity: 0 }}
            className="absolute size-8 border border-primary bg-transparent shadow-[0_0_15px_var(--primary)]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}
