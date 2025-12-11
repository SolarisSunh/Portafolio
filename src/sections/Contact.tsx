import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Contacto</h2>
        <Card>
          <CardHeader>
            <CardTitle>Hablemos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Me encantará conversar sobre cómo puedo aportar valor a tu equipo o proyecto.
            </p>
            <div className="mt-3 space-y-1">
              <a className="block text-primary-300 hover:text-primary-200" href="mailto:tucorreo@ejemplo.com">
                tucorreo@ejemplo.com
              </a>
              <a className="block text-primary-300 hover:text-primary-200" href="#" target="_blank">
                GitHub
              </a>
              <a className="block text-primary-300 hover:text-primary-200" href="#" target="_blank">
                LinkedIn
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



