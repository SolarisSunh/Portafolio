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
              Soy un estudiante de la Preparatoria Royal y aspirante a entrar a la Universidad Tecnologico de Monterrey (ITESM) en la carrera de Ingenieria en Ciencias de datos.
              Me gusta la tecnologia y la programacion, por ahora estoy orientado a resultados, con enfoque en diseño de interfaces y experiencia de un usuario.
              Por ahora mis proyectos han sido meramente escolares, pero con la integracion de paginas Web. Disfruto colaborar y mejorar mis habilidades.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



