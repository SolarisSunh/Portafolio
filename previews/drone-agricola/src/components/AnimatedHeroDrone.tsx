import { useEffect, useRef, useState, type ReactElement } from "react";
import { cn } from "@/lib/utils";

// Dron SVG animado e interactivo (tilt según mouse y aspas giratorias)
export default function AnimatedHeroDrone(): ReactElement {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: Math.max(-1, Math.min(1, dy)), y: Math.max(-1, Math.min(1, dx)) });
    };
    const handleLeave = () => setTilt({ x: 0, y: 0 });
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const rot = {
    transform: `rotateX(${tilt.x * 8}deg) rotateY(${tilt.y * 8}deg)`,
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto aspect-[4/3] [perspective:900px]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-44 h-6 rounded-full bg-black/20 blur-2xl" />

      <div
        className={cn(
          "relative mx-auto h-full w-full [transform-style:preserve-3d] transition-transform duration-200 ease-linear"
        )}
        style={rot}
      >
        {/* Brazos */}
        <svg className="absolute inset-0" viewBox="0 0 600 450" aria-hidden="true">
          <defs>
            <linearGradient id="arm" x1="0" x2="1">
              <stop offset="0" stopColor="#94a3b8" />
              <stop offset="1" stopColor="#475569" />
            </linearGradient>
          </defs>
          <g opacity="0.75">
            <rect x="100" y="220" width="400" height="10" rx="5" fill="url(#arm)" />
            <rect x="295" y="110" width="10" height="240" rx="5" fill="url(#arm)" />
          </g>
        </svg>

        {/* Cuerpo */}
        <div className="absolute left-1/2 top-1/2 w-60 h-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-400 shadow-2xl"
          style={{
            background: "linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 100%)",
          }}
        />
        {/* Visor/cúpula */}
        <div className="absolute left-1/2 top-1/2 w-24 h-14 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-400 shadow"
          style={{
            background: "linear-gradient(180deg, #bae6fd 0%, #67e8f9 100%)",
            transform: "translateZ(10px)",
          }}
        />
        {/* Cámara inferior */}
        <div className="absolute left-1/2 top-[58%] w-8 h-6 -translate-x-1/2 rounded-md bg-slate-700 shadow translate-z-[16px]" />

        {/* Pods + rotores */}
        {[
          { x: -180, y: -120 },
          { x: 180, y: -120 },
          { x: -180, y: 120 },
          { x: 180, y: 120 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0px)` }}
          >
            <div className="relative w-16 h-16 rounded-full bg-slate-200 border border-slate-400 shadow">
              <div className="absolute inset-2 rounded-full bg-slate-300 border border-slate-400" />
              {/* Disco rotor con animación */}
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 w-16 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-slate-700/70 blur-[0.6px]",
                  hover ? "animate-[spin_0.7s_linear_infinite]" : "animate-[spin_1.2s_linear_infinite]"
                )}
              />
              <div
                className={cn(
                  "absolute left-1/2 top-1/2 w-16 h-0.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-slate-700/70 blur-[0.6px]",
                  hover ? "animate-[spin_0.7s_linear_infinite]" : "animate-[spin_1.2s_linear_infinite]"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




