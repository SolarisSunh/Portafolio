export type Project = {
  slug?: string; // usado para ruta de vista previa
  title: string;
  description: string;
  tech: string[];
  links?: { label: string; href: string }[];
};

// Reemplaza con tus enlaces reales (GitHub/Demos)
export const projects: Project[] = [
  {
    slug: "kronos-pc",
    title: "Kronos PC — Tienda Futurista (Proyecto Escolar)",
    description:
      "Proyecto escolar: sitio web para Kronos PC, una empresa inventada de venta de componentes, PCs armadas y servicio técnico. Catálogo filtrable, PCs por tipo de uso, multi-idioma (ES/EN/FR) y conversión de moneda en tiempo real.",
    tech: ["React", "TypeScript", "Vite", "Tailwind", "React Router", "i18n"],
    links: [
      { label: "Código", href: "https://github.com/SolarisSunh/Portafolio/tree/main/previews/kronos-pc" },
    ],
  },
  {
    slug: "monopoly-derivadas",
    title: "Monopoly de Derivadas (React + 3D)",
    description:
      "Juego educativo tipo Monopoly para practicar derivadas con tarjetas y tablero 3D. Animaciones, KaTeX y multijugador local.",
    tech: ["React", "Vite", "Tailwind", "React Three Fiber", "KaTeX"],
    links: [
      { label: "Código", href: "https://github.com/SolarisSunh/Portafolio/tree/main/previews/monopoly-derivadas" },
    ],
  },
  {
    title: "calculoapis (.NET)",
    description:
      "API minimalista en .NET para experimentos (endpoints y prueba de conceptos).",
    tech: [".NET", "C#", "Minimal APIs"],
    // Enlace pendiente hasta publicar el código del backend en GitHub
  },
  {
    slug: "drone-agricola",
    title: "Drone Agrícola (SPA)",
    description:
      "Interfaz con componentes UI modernos, visualizaciones y secciones interactivas para un concepto de dron agrícola.",
    tech: ["React", "Vite", "Tailwind"],
    links: [
      { label: "Código", href: "https://github.com/SolarisSunh/Portafolio/tree/main/previews/drone-agricola" },
    ],
  },
  {
    slug: "drone-submarino",
    title: "Drone Submarino (SPA)",
    description:
      "Portafolio temático de dron submarino con secciones técnicas y componentes UI personalizados.",
    tech: ["React", "Vite", "Tailwind"],
    links: [
      { label: "Código", href: "https://github.com/SolarisSunh/Portafolio/tree/main/previews/drone-submarino" },
    ],
  },
  // Eliminado: "CalculoProyecto - Copia"
];


