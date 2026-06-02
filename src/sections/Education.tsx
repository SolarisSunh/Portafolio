import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const Education: React.FC = () => {
  return (
    <section id="educacion" className="py-14">
      <div className="mx-auto max-w-6xl px  -4">
        <h2 className="text-2xl font-bold text-white mb-6">Educación</h2>
        <Card>
          <CardHeader>
            <CardTitle>Preparatoria Royal e IAI (International American Institute)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">
              Actualmente soy estudiante de la <strong>Preparatoria Royal</strong> y estudiante del <strong>IAI (International American Institute)</strong>.
              Mi objetivo es formar una carrera universitaria cursando una <strong>Ingeniería en Ciencias de Datos</strong>.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



