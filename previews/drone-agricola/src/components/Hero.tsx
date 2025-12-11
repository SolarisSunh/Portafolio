import { Button } from "@/components/ui/button";
import { useCallback, type ReactElement } from "react";
import AnimatedHeroDrone from "./AnimatedHeroDrone";

export default function Hero(): ReactElement {
  const handleDownload = useCallback(() => {
    // Ficha técnica reducida sólo con componentes solicitados
    const content =
      "Ficha técnica - AgroDrone\n\nComponentes:\n- Chasis de Plástico\n- Cámara\n- Compartimiento para Agua\n- Sensor Topográfico\n";
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ficha-tecnica-agrodrone.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-transparent pt-16"
    >
      <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Dron de Agricultura Inteligente
          </h1>
          <p className="mt-4 text-slate-600 text-lg">
            Optimiza el riego de tus cultivos con precisión milimétrica.
            Ahorra agua, mejora el rendimiento y monitoriza tu campo en tiempo
            real.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#simulacion">Ver Simulación</a>
            </Button>
            <Button variant="outline" size="lg" onClick={handleDownload}>
              Descargar ficha técnica
            </Button>
          </div>
          <ul className="mt-6 space-y-2 text-slate-700">
            <li>• Cobertura inteligente de parcelas</li>
            <li>• Sensores avanzados y análisis</li>
            <li>• Integración con reportes y mapas</li>
          </ul>
        </div>
        <div className="relative">
          <AnimatedHeroDrone />
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}


