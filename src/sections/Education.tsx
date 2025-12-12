import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const Education: React.FC = () => {
  return (
    <section id="educacion" className="py-14">
      <div className="mx-auto max-w-6xl px  -4">
        <h2 className="text-2xl font-bold text-white mb-6">Educación</h2>
        <Card>
          <CardHeader>
            <CardTitle>Preparatoria Royal y Tecnológico de Monterrey (ITESM)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Por ahora soy Estudiante de la Preparatoria Royal pero mi objetivo es continuar mi formación en el <strong>Instituto Tecnológico y de Estudios Superiores de Monterrey (ITESM)</strong>,
              una de las universidades más reconocidas de América Latina por su enfoque en innovación, liderazgo y emprendimiento.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



