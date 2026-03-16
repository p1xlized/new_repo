export interface Tool {
  src: string
  alt: string
}

const ICON_COLOR = "00d6b2"

export const tools: Array<Tool> = [
  {
    src: `https://cdn.simpleicons.org/react/${ICON_COLOR}`,
    alt: "React",
  },
  {
    src: `https://cdn.simpleicons.org/typescript/${ICON_COLOR}`,
    alt: "Typescript",
  },
  {
    src: `https://cdn.simpleicons.org/postgresql/${ICON_COLOR}`,
    alt: "PostgreSQL",
  },
  {
    src: `https://cdn.simpleicons.org/dotnet/${ICON_COLOR}`,
    alt: ".Net",
  },
  {
    src: `https://cdn.simpleicons.org/go/${ICON_COLOR}`,
    alt: "Golang",
  },
  {
    src: `https://cdn.simpleicons.org/python/${ICON_COLOR}`,
    alt: "Python",
  },
  {
    src: `https://cdn.simpleicons.org/flutter/${ICON_COLOR}`,
    alt: "Flutter",
  },
  {
    src: `https://cdn.simpleicons.org/godotengine/${ICON_COLOR}`,
    alt: "Godot",
  },
  {
    src: `https://cdn.simpleicons.org/linux/${ICON_COLOR}`,
    alt: "Linux",
  },
]

export const socials: Array<Tool & { href: string }> = [
  {
    src: `https://cdn.simpleicons.org/github/${ICON_COLOR}`,
    alt: "GitHub",
    href: "https://github.com/alexandrupaduret",
  },
  {
    src: `https://cdn.simpleicons.org/linkedin/${ICON_COLOR}`,
    alt: "LinkedIn",
    href: "https://linkedin.com/in/alexandrupaduret",
  },
  {
    src: `https://cdn.simpleicons.org/x/${ICON_COLOR}`,
    alt: "X",
    href: "https://x.com/your-handle",
  },
  {
    src: `https://cdn.simpleicons.org/gmail/${ICON_COLOR}`,
    alt: "Email",
    href: "mailto:alex@example.com",
  },
]
