import React from "react";
import { Button } from "./button";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="text-white font-bold tracking-wide">Mi Portafolio</div>
        <nav className="hidden sm:flex items-center gap-4 text-sm">
          {["Sobre mí", "Proyectos", "Habilidades", "Educación", "Contacto"].map((item) => {
            const href =
              item === "Sobre mí"
                ? "#inicio"
                : item === "Educación"
                ? "#educacion"
                : `#${item.replace(/\s+/g, "").toLowerCase()}`;
            return (
              <a key={item} href={href} className="text-white/80 hover:text-white transition">
                {item}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>
            Contactar
          </Button>
        </div>
      </div>
    </header>
  );
};


