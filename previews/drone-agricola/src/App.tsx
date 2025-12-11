import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FieldSimulation from "@/components/FieldSimulation";
import DronePerspectiveViewer from "@/components/DronePerspectiveViewer";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import type { ReactElement } from "react";

function App(): ReactElement {
  return (
    <div className="min-h-screen app-gradient">
      <Navbar />
      <ThemeCustomizer />
      <main>
        <Hero />
        <FieldSimulation />
        <DronePerspectiveViewer />
      </main>
      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AgroDrone. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App
