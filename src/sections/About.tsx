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
              Soy un profesional orientado a resultados, con enfoque en diseño de
              interfaces y experiencia de usuario. Me entusiasma construir
              aplicaciones con un equilibrio entre estética, rendimiento y
              mantenibilidad. Disfruto colaborar, iterar rápido y dejar el código
              mejor de como lo encontré.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



