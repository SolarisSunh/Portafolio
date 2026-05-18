export type IaiProject = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  links: { label: string; href: string }[];
};

export const iaiProjects: IaiProject[] = [
  {
    slug: "iai-secondproject",
    title: "Personal Page — Interactive (IAI)",
    description:
      "Personal webpage with JavaScript: toggle text button, name validation form, and background color switcher.",
    tech: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        label: "Código",
        href: "https://github.com/SolarisSunh/Portafolio/tree/main/previews/iai-secondproject",
      },
    ],
  },
  {
    slug: "iai-thirdproject",
    title: "Kronos UX/UI Report (IAI)",
    description:
      "Short UX/UI and accessibility evaluation of the Kronos demo store (design, navigation, and improvement suggestions).",
    tech: ["HTML", "UX/UI", "Accessibility"],
    links: [
      {
        label: "Código",
        href: "https://github.com/SolarisSunh/Portafolio/tree/main/previews/iai-thirdproject",
      },
    ],
  },
];
