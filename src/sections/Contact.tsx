import React from "react";
import { Card, CardContent } from "../components/ui/card";

export const Contact: React.FC = () => {
  return (
    <section id="contacto" className="py-14">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-white mb-6">Contacto</h2>
        <Card>
          <CardContent>
            <div className="space-y-1">
              <a className="block text-primary-300 hover:text-primary-200" href="mailto:miguel_chavezj@outlook.com">
                miguel_chavezj@outlook.com
              </a>
              <a className="block text-primary-300 hover:text-primary-200" href="https://github.com/SolarisSunh" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};



