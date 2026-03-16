export interface Project {
  id: number
  title: string
  tech: string
  role: string
  date: string
  description: string
  cover: string
  imgs: Array<string>
  git?: string
  is_video?: boolean
  video_url?: string
  features: Array<string>
  metrics: Array<{
    label: string
    value: number
  }>
  awards?: Array<{
    title: string
    organization: string
  }>
}

export const projects: Array<Project> = [
  {
    id: 1,
    title: "GYMBUD_AI",
    tech: "FLUTTER / SUPABASE / OPENAI",
    role: "INTEGRATION_LEAD",
    date: "NOV_2024",
    description:
      "Developed an AI fitness MVP in a 24-hour hackathon with a team of 5. Led OpenAI integration for real-time adaptable workout generation and logic. Architected a gamified progression system and high-fidelity UI layout, securing two major category awards.",
    cover:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    ],
    git: "https://github.com/svdxx/gymbud",
    features: [
      "ADAPTABLE_WORKOUT_GEN",
      "GAMIFIED_PROGRESSION",
      "REAL_TIME_LOGIC",
    ],
    metrics: [
      { label: "HACKATHON_SPEED", value: 100 },
      { label: "UI_FIDELITY", value: 96 },
    ],
    awards: [
      { title: "3RD_PLACE_OVERALL", organization: "HACKATHON_2024" },
      { title: "BEST_DESIGN_AWARD", organization: "HACKATHON_2024" },
    ],
  },
  {
    id: 2,
    title: "HOMEBREWER_3D",
    tech: "REACT / THREE.JS / SUPABASE",
    role: "GRAPHICS_ENGINEER",
    date: "FEB_2025",
    description:
      "Built a 3D editor with a custom streaming pipeline for sub-1-second loads. Optimized rendering via GLTF instancing to maintain stable 60 FPS performance. Integrated Supabase for design sharing, versioning, and community collaboration for 40K miniatures.",
    cover:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=1000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?q=80&w=1000&auto=format&fit=crop",
    ],
    git: "https://github.com/svdxx/homebrewer",
    features: ["GLTF_INSTANCING", "STREAMING_PIPELINE", "VERSION_CONTROL"],
    metrics: [
      { label: "FPS_STABILITY", value: 60 },
      { label: "LOAD_TIME_MS", value: 95 },
    ],
  },
  {
    id: 3,
    title: "KIRA_EXPLORER",
    tech: "GODOT / GDSCRIPT",
    role: "GAME_ARCHITECT",
    date: "FEB_2025",
    description:
      "Developed a 2D exploration game from scratch with dynamic environment logic. Architected a modular system to manage 300+ concurrent objects without lag and reduced CPU overhead by 20% through optimized physics and navigation logic.",
    cover:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    ],
    git: "https://github.com/svdxx/kira",
    features: [
      "MODULAR_OBJECT_SYSTEM",
      "DYNAMIC_ENV_LOGIC",
      "PHYSICS_OPTIMIZATION",
    ],
    metrics: [
      { label: "CPU_EFFICIENCY", value: 80 },
      { label: "OBJECT_DENSITY", value: 98 },
    ],
  },
  {
    id: 4,
    title: "JUNCTION_STORYLINE",
    tech: "TYPESCRIPT / OPENAI / NODE.JS",
    role: "BACKEND_ARCHITECT",
    date: "NOV_2024",
    description:
      "Designed a context-aware AI narrative engine for the Junction 2024 hackathon. Implemented recursive memory management for LLM prompt injection, allowing for dynamic storyline branching that adapts to player decisions and emotional tone in real-time.",
    cover:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
    ],
    features: [
      "NARRATIVE_BRANCHING",
      "PROMPT_ENGINEERING",
      "STATE_PERSISTENCE",
    ],
    metrics: [
      { label: "NARRATIVE_DEPTH", value: 89 },
      { label: "LATENCY", value: 82 },
    ],
  },
  {
    id: 5,
    title: "FARMERS_DELIGHT",
    tech: "JAVA / LWJGL",
    role: "SOLO_DEVELOPER",
    date: "JAN_2025",
    description:
      "Developed a Java-based simulation engine utilizing LWJGL for custom rendering. Built an extensible entity-component system for crop growth cycles and resource management, focusing on high-performance grid-based tile logic and low memory footprint.",
    cover:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    imgs: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop",
    ],
    features: ["CUSTOM_TILE_ENGINE", "ECS_ARCHITECTURE", "RESOURCE_PIPELINE"],
    metrics: [
      { label: "MEMORY_USAGE", value: 94 },
      { label: "TICK_STABILITY", value: 98 },
    ],
  },
]
