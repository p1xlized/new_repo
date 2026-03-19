import { motion } from "framer-motion"
import type { IconProps } from "@phosphor-icons/react"

// Define the interface to accept Phosphor Icon components
interface NavButtonProps {
  label: string
  sub: string
  icon: React.ElementType<IconProps>
  onClick?: () => void
}

export const NavButton = ({
  label,
  sub,
  icon: Icon,
  onClick,
}: NavButtonProps) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: 6 }}
    whileTap={{ scale: 0.97 }}
    className="group relative flex w-full items-center justify-between border border-primary/10 bg-primary/5 p-4 transition-all hover:bg-primary hover:text-black"
  >
    {/* Clean Active Indicator (Left Bar) */}
    <div className="absolute top-0 left-0 h-full w-0 bg-primary transition-all group-hover:w-1" />

    <div className="relative z-10 flex flex-col items-start text-left">
      <span className="text-[11px] leading-none font-black tracking-[0.2em] uppercase">
        {label}
      </span>
      <span className="mt-1 text-[8px] font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100">
        {sub}
      </span>
    </div>

    <div className="relative z-10 opacity-30 transition-all duration-300 group-hover:translate-x-[-4px] group-hover:opacity-100">
      <Icon size={22} weight="duotone" />
    </div>
  </motion.button>
)
export default NavButton
