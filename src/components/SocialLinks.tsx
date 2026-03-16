import { socials } from "@/data/profile_data"

export const SocialLinks = () => {
  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {socials.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          title={link.alt}
          className="group/link relative flex aspect-square items-center justify-center border border-primary/10 bg-primary/5 transition-all hover:border-primary hover:bg-primary/20"
        >
          <img
            src={link.src}
            alt={link.alt}
            className="size-6 object-contain opacity-50 grayscale transition-all group-hover/link:opacity-100 group-hover/link:grayscale-0"
          />

          {/* HUD Corner Accents */}
          <div className="absolute inset-0 opacity-0 transition-opacity group-hover/link:opacity-100">
            <div className="absolute top-0 left-0 size-1 border-t border-l border-primary" />
            <div className="absolute right-0 bottom-0 size-1 border-r border-b border-primary" />
          </div>
        </a>
      ))}
    </div>
  )
}
