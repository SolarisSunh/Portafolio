import React from "react";
import { Button } from "../components/ui/button";

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Miguel Chavez
          </h1>
          <p className="mt-2 text-primary-300 font-semibold">
            Desarrollador web en formación · IA y Ciencia de Datos
          </p>
          <p className="mt-4 text-white/80">
            Este portafolio reúne mis mejores proyectos.
          </p>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => {
              const base = (import.meta as any).env?.BASE_URL || '/';
              window.open(`${base}CV.pdf`, '_blank');
            }}>Visitar CV</Button>
            <Button variant="secondary" onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}>
              Contactar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};



