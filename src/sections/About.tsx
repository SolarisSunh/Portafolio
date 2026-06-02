import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const About: React.FC = () => {
  return (
    <section id="sobremi" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Sobre mí</h2>
        <Card>
          <CardHeader>
            <CardTitle>Una mirada a mi perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Soy estudiante de la Preparatoria Royal y del IAI (International American Institute), próximo a egresar, con el objetivo de formar una carrera universitaria cursando una Ingeniería en Ciencias de Datos.
              Ya desarrollo páginas web con React, TypeScript y Tailwind, con enfoque en UI/UX y aprendizaje continuo.
              Mis proyectos son principalmente escolares y personales (incluyendo 3D con React Three Fiber y SPAs). Disfruto colaborar y mejorar mis habilidades. Nivel de inglés: B1.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



