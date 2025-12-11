import type { ReactElement } from "react";

export default function Navbar(): ReactElement {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/40 border-b">
      <nav className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#inicio" className="font-semibold text-lg tracking-tight">
          AgroDrone
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#inicio" className="hover:text-primary transition-colors">
            Inicio
          </a>
          <a href="#simulacion" className="hover:text-primary transition-colors">
            Simulación
          </a>
          <a href="#vista3d" className="hover:text-primary transition-colors">
            Vista 3D
          </a>
        </div>
        <div className="flex items-center gap-3" />
      </nav>
    </header>
  );
}


