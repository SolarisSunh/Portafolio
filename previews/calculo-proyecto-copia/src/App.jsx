export default function App() {
  return (
    <div className="wrap">
      <header className="header">
        <div className="brand">CalculoProyecto - Copia</div>
        <div className="pill">Demo funcional</div>
      </header>
      <main className="container">
        <section className="card" style={{ marginBottom: 16 }}>
          <h1 className="title">Resumen</h1>
          <p className="subtitle">
            Vista previa funcional empaquetada dentro del Portafolio. Útil para presentar una muestra del proyecto sin servidores externos.
          </p>
          <p className="muted">
            Puedes ampliar esta demo con más componentes, rutas o integración ligera según tus necesidades.
          </p>
        </section>

        <div className="grid">
          <div className="card">
            <h3 className="title" style={{ fontSize: 18 }}>Panel 1</h3>
            <p className="muted">Descripción general, objetivos y alcance.</p>
          </div>
          <div className="card">
            <h3 className="title" style={{ fontSize: 18 }}>Panel 2</h3>
            <p className="muted">Tecnologías, arquitectura y módulos principales.</p>
          </div>
          <div className="card">
            <h3 className="title" style={{ fontSize: 18 }}>Panel 3</h3>
            <p className="muted">Resultados, métricas y capturas de la UI.</p>
          </div>
          <div className="card">
            <h3 className="title" style={{ fontSize: 18 }}>Interacción</h3>
            <Interactive />
          </div>
        </div>
      </main>
    </div>
  )
}

function Interactive() {
  return (
    <div>
      <p className="muted">Pequeña interacción para probar estado local:</p>
      <Counter />
    </div>
  )
}

import { useState } from "react";
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <button
        onClick={() => setCount(c => c - 1)}
        style={{
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          padding: "8px 14px",
          cursor: "pointer"
        }}
      >
        -1
      </button>
      <div className="pill">Contador: {count}</div>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)",
          color: "white",
          padding: "8px 14px",
          cursor: "pointer"
        }}
      >
        +1
      </button>
    </div>
  )
}



