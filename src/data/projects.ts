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
    slug: "monopoly-derivadas",
    title: "Monopoly de Derivadas (React + 3D)",
    description:
      "Juego educativo tipo Monopoly para practicar derivadas con tarjetas y tablero 3D. Animaciones, KaTeX y multijugador local.",
    tech: ["React", "Vite", "Tailwind", "React Three Fiber", "KaTeX"],
    links: [
      { label: "Código", href: "https://github.com/TU_USUARIO/TU_REPO/tree/main/monopoly-derivadas" },
    ],
  },
  {
    title: "calculoapis (.NET)",
    description:
      "API minimalista en .NET para experimentos (endpoints y prueba de conceptos).",
    tech: [".NET", "C#", "Minimal APIs"],
    links: [
      { label: "Código", href: "https://github.com/TU_USUARIO/TU_REPO/tree/main/calculoapis" }
    ],
  },
  {
    slug: "drone-agricola",
    title: "Drone Agrícola (SPA)",
    description:
      "Interfaz con componentes UI modernos, visualizaciones y secciones interactivas para un concepto de dron agrícola.",
    tech: ["React", "Vite", "Tailwind"],
    links: [
      { label: "Código", href: "https://github.com/TU_USUARIO/TU_REPO/tree/main/drone-agricola" },
    ],
  },
  {
    slug: "drone-submarino",
    title: "Drone Submarino (SPA)",
    description:
      "Portafolio temático de dron submarino con secciones técnicas y componentes UI personalizados.",
    tech: ["React", "Vite", "Tailwind"],
    links: [
      { label: "Código", href: "https://github.com/TU_USUARIO/TU_REPO/tree/main/drone-submarino" },
    ],
  },
  {
    slug: "calculo-proyecto-copia",
    title: "CalculoProyecto - Copia (Demo UI)",
    description:
      "Muestra integrada del proyecto 'CalculoProyecto - Copia'. Vista previa servida desde la misma carpeta del Portafolio.",
    tech: ["HTML", "CSS", "JS"],
    links: [
      { label: "Código", href: "https://github.com/TU_USUARIO/TU_REPO/tree/main/CalculoProyecto%20-%20Copia" },
    ],
  },
];


