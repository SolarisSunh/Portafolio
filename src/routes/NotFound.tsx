import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Página no encontrada</h1>
        <p className="text-white/70">La ruta solicitada no existe. Regresemos a la página principal.</p>
        <Link to="/"><Button>Volver al inicio</Button></Link>
      </div>
    </div>
  );
}



