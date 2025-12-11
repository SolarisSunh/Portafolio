import { useCallback, useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Droplets, Timer, Shuffle } from "lucide-react";

// Tipado de cada parcela en la cuadrícula
export type Plot = {
  id: string;
  row: number;
  col: number;
  selected: boolean;
  irrigated: boolean;
  revealed: boolean;
};

const ROWS = 6;
const COLS = 8;
const DEFAULT_STEP_MS = 180; // velocidad de animación por defecto

function createGrid(rows: number, cols: number): Plot[] {
  const items: Plot[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      items.push({
        id: `${r}-${c}`,
        row: r,
        col: c,
        selected: false,
        irrigated: false,
        revealed: false,
      });
    }
  }
  return items;
}

export default function FieldSimulation(): ReactElement {
  const [grid, setGrid] = useState<Plot[]>(() => createGrid(ROWS, COLS));
  const [isRunning, setIsRunning] = useState(false);
  const [dronePosition, setDronePosition] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [speedMs, setSpeedMs] = useState<number>(DEFAULT_STEP_MS);
  const [serpentine, setSerpentine] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prevDronePos = useRef<{ row: number; col: number }>({ row: 0, col: 0 });
  const [headingDeg, setHeadingDeg] = useState<number>(0);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [stage, setStage] = useState<"hidden" | "scanning" | "ready" | "irrigating">("hidden");

  const totalSelected = useMemo(() => grid.filter((p) => p.selected).length, [grid]);
  const totalIrrigated = useMemo(() => grid.filter((p) => p.irrigated).length, [grid]);
  const totalRevealed = useMemo(() => grid.filter((p) => p.revealed).length, [grid]);

  // Determina si el dron está sobre una parcela seleccionada (efecto de "riego" activo)
  const isSpraying = useMemo(() => {
    return (
      (isRunning || isScanning) &&
      grid.some(
        (p) => p.row === dronePosition.row && p.col === dronePosition.col && p.selected === true
      )
    );
  }, [grid, dronePosition, isRunning, isScanning]);

  const handleToggle = useCallback(
    (plot: Plot) => {
      if (isRunning || isScanning || stage !== "ready") return; // bloqueo según etapa
      setGrid((prev) =>
        prev.map((p) => (p.id === plot.id ? { ...p, selected: !p.selected } : p))
      );
    },
    [isRunning, isScanning, stage]
  );

  const handleClearSelection = useCallback(() => {
    if (isRunning || isScanning) return;
    setGrid((prev) => prev.map((p) => ({ ...p, selected: false, irrigated: false })));
  }, [isRunning, isScanning]);

  // Escaneo topográfico: revela las parcelas
  const handleScan = useCallback(async () => {
    if (isScanning || stage !== "hidden") return;
    setIsScanning(true);
    setStage("scanning");
    // recorre todo el campo y revela celdas
    for (let r = 0; r < ROWS; r++) {
      const columns = [...Array(COLS).keys()];
      const order = serpentine ? (r % 2 === 0 ? columns : columns.slice().reverse()) : columns;
      for (const c of order) {
        setDronePosition({ row: r, col: c });
        setGrid((prev) =>
          prev.map((p) => {
            if (p.row === r && p.col === c) {
              return { ...p, revealed: true };
            }
            return p;
          })
        );
        await new Promise((res) => setTimeout(res, Math.max(40, speedMs * 0.6))); // escaneo un poco más rápido
      }
    }
    setIsScanning(false);
    setStage("ready");
  }, [isScanning, stage, serpentine, speedMs]);

  const handleSimulate = useCallback(async () => {
    if (isRunning || isScanning || stage !== "ready") return;
    setGrid((prev) => prev.map((p) => ({ ...p, irrigated: false })));
    setIsRunning(true);
    setStage("irrigating");

    // Recorremos de izquierda a derecha y luego a la siguiente fila (patrón serpenteo opcional)
    for (let r = 0; r < ROWS; r++) {
      const columns = [...Array(COLS).keys()];
      // Patrón opcional: filas pares L->R, impares R->L
      const order = serpentine ? (r % 2 === 0 ? columns : columns.slice().reverse()) : columns;
      for (const c of order) {
        setDronePosition({ row: r, col: c });
        setGrid((prev) =>
          prev.map((p) => {
            if (p.row === r && p.col === c) {
              // Si está seleccionada, se riega
              return { ...p, irrigated: p.selected ? true : p.irrigated };
            }
            return p;
          })
        );
        await new Promise((res) => setTimeout(res, speedMs));
      }
    }
    setIsRunning(false);
    setStage("ready");
  }, [isRunning, serpentine, speedMs, isScanning, stage]);

  // Reinicia el escaneo: oculta todas las parcelas y vuelve a etapa "hidden"
  const handleRescan = useCallback(() => {
    if (isRunning || isScanning) return;
    setGrid((prev) =>
      prev.map((p) => ({
        ...p,
        selected: false,
        irrigated: false,
        revealed: false,
      }))
    );
    setDronePosition({ row: 0, col: 0 });
    setStage("hidden");
  }, [isRunning, isScanning]);

  // Selección automática según patrón topográfico simulado
  const handleAutoSelect = useCallback(() => {
    if (isRunning || isScanning || stage !== "ready") return;
    setGrid((prev) =>
      prev.map((p) => {
        if (!p.revealed) return { ...p, selected: false };
        // Patrón determinístico: ~35-40% de celdas
        const score = (p.row * 7 + p.col * 11) % 10;
        const shouldSelect = score <= 3; // 0..3 -> 40%
        return { ...p, selected: shouldSelect };
      })
    );
  }, [isRunning, isScanning, stage]);

  // Cálculo de estilo para posicionar el dron en la cuadrícula
  const droneStyle = useMemo(() => {
    const pctX = (dronePosition.col / Math.max(1, COLS - 1)) * 100;
    const pctY = (dronePosition.row / Math.max(1, ROWS - 1)) * 100;
    return {
      left: `${pctX}%`,
      top: `${pctY}%`,
      transform: "translate(-50%, -50%)",
    } as const;
  }, [dronePosition]);

  useEffect(() => {
    // Aseguramos que el contenedor exista para transiciones limpias
    if (containerRef.current) {
      // noop
    }
  }, []);

  // Actualiza orientación y estado de movimiento del dron
  useEffect(() => {
    const prev = prevDronePos.current;
    const dx = dronePosition.col - prev.col;
    const dy = dronePosition.row - prev.row;
    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setHeadingDeg(angle);
      setIsMoving(true);
      const t = setTimeout(() => setIsMoving(false), speedMs * 1.2);
      prevDronePos.current = { ...dronePosition };
      return () => clearTimeout(t);
    }
    prevDronePos.current = { ...dronePosition };
  }, [dronePosition, speedMs]);

  useEffect(() => {
    prevDronePos.current = { ...dronePosition };
  }, []);

  return (
    <section id="simulacion" className="py-20 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight">Simulación de Riego</h2>
        <p className="text-slate-600 mt-2">
          Selecciona las parcelas que deseas regar. El dron volará sobre el campo y solo irrigará las seleccionadas.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Badge className="bg-blue-600">Escaneo topográfico</Badge>
          <Badge className="bg-teal-600">Seleccionado</Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-200">
            Irrigado
          </Badge>
          <Badge variant="secondary" className="bg-slate-200 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300">
            Sin seleccionar
          </Badge>
        </div>

        <Card className="mt-6 p-4 bg-white/50 dark:bg-black/30 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div
                ref={containerRef}
                className="relative w-full mx-auto"
                style={{ aspectRatio: `${COLS} / ${ROWS}` }}
              >
                {/* Fondo de campo con textura sutil */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/20 overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{
                    backgroundImage:
                      "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.45) 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }} />
                </div>

                {/* Dron (vista superior refinada) */}
                <div
                  className={cn(
                    "absolute z-20 transition-all duration-150 ease-linear",
                    "w-10 h-10"
                  )}
                  style={droneStyle}
                >
                  <div className="relative w-full h-full">
                    {/* sombra suave del dron (escala mayor si se mueve) */}
                    <div
                      className={cn(
                        "absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/25 blur-md transition-all",
                      )}
                      style={{ width: isMoving ? "2.8rem" : "2.4rem", height: isMoving ? "0.55rem" : "0.5rem" }}
                    />
                    {/* halo de posición */}
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/30 dark:ring-white/10" />
                    {/* Contenido con rotación y tilt */}
                    <div
                      className="absolute inset-0 origin-center [transform-style:preserve-3d]"
                      style={{
                        transform: `rotate(${headingDeg}deg) perspective(260px) rotateX(${isMoving ? 10 : 3}deg)`,
                      }}
                    >
                      {/* estela de dirección */}
                      {isMoving && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent blur-[2px]" />
                        </div>
                      )}
                      {/* brazos */}
                      <div className="absolute inset-0">
                        <div className="absolute left-1/2 top-1/2 w-18 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-slate-500/50" />
                        <div className="absolute left-1/2 top-1/2 w-0.5 h-18 -translate-x-1/2 -translate-y-1/2 bg-slate-500/50" />
                        <div className="absolute left-1/2 top-1/2 w-16 h-0.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-500/30" />
                        <div className="absolute left-1/2 top-1/2 w-16 h-0.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-slate-500/30" />
                      </div>
                      {/* cuerpo */}
                      <div className="absolute inset-0 rounded-full border border-slate-500 shadow"
                        style={{ background: "linear-gradient(180deg, #e5e7eb 0%, #cbd5e1 100%)" }}
                      />
                      <div className="absolute inset-[3px] rounded-full"
                        style={{ background: "linear-gradient(180deg, #cbd5e1 0%, #e2e8f0 100%)" }}
                      />
                      {/* LED frontal */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: isSpraying ? "#22d3ee" : isMoving ? "#fde047" : "#94a3b8",
                          boxShadow: isSpraying
                            ? "0 0 10px rgba(34,211,238,0.9)"
                            : isMoving
                            ? "0 0 10px rgba(250,204,21,0.8)"
                            : "0 0 6px rgba(148,163,184,0.6)",
                        }}
                      />
                      {/* pods/rotores */}
                      {[
                        { x: -14, y: -14 },
                        { x: 14, y: -14 },
                        { x: -14, y: 14 },
                        { x: 14, y: 14 },
                      ].map((p, i) => (
                        <div key={i} className="absolute" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                          <div className="relative w-4.5 h-4.5 rounded-full border border-slate-500 bg-slate-300 shadow-sm">
                            <div className="absolute inset-[-4px] rounded-full bg-[radial-gradient(closest-side,rgba(100,116,139,0.3),transparent_70%)]" />
                            <div
                              className="absolute left-1/2 top-1/2 w-8 h-0.5 -translate-x-1/2 -translate-y-1/2 bg-slate-700/70 blur-[0.5px] animate-rotor-spin"
                              style={{ animationDuration: (isMoving || isSpraying) ? "0.75s" : "1.1s" }}
                            />
                            <div
                              className="absolute left-1/2 top-1/2 w-8 h-0.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-slate-700/70 blur-[0.5px] animate-rotor-spin"
                              style={{ animationDuration: (isMoving || isSpraying) ? "0.75s" : "1.1s" }}
                            />
                          </div>
                        </div>
                      ))}
                      {/* cúpula/cámara inferior */}
                      <div className="absolute left-1/2 top-1/2 w-3 h-2 -translate-x-1/2 translate-y-3 rounded-md bg-slate-700 shadow" />
                      {/* spray orientado al rumbo */}
                      {isSpraying && (
                        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-4 w-10 h-10">
                          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-1 h-6 bg-cyan-300/70 rounded-full animate-spray-down" />
                          <div className="absolute left-[35%] top-0 w-1 h-5 bg-cyan-200/70 rounded-full animate-spray-down delay-100" />
                          <div className="absolute left-[65%] top-0 w-1 h-5 bg-cyan-200/70 rounded-full animate-spray-down delay-200" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Grid de parcelas */}
                <div
                  className="absolute inset-2 grid gap-1.5"
                  style={{
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                  }}
                >
                  {grid.map((plot) => {
                    const isIrrigated = plot.irrigated;
                    const isSelected = plot.selected;
                    const isRevealed = plot.revealed;
                    return (
                      <button
                        key={plot.id}
                        type="button"
                        disabled={isRunning || isScanning || !isRevealed || stage !== "ready"}
                        onClick={() => handleToggle(plot)}
                        className={cn(
                          "relative rounded-lg border transition-all duration-200 overflow-hidden",
                          "focus:outline-none focus:ring-2 focus:ring-teal-400/40",
                          !isRevealed
                            ? "opacity-0 scale-95"
                            : isIrrigated
                            ? "bg-emerald-500 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-500 shadow-inner"
                            : isSelected
                            ? "bg-teal-300/70 dark:bg-teal-700/60 border-teal-400 dark:border-teal-600 ring-1 ring-teal-400/40"
                            : "bg-emerald-200/70 dark:bg-emerald-800/40 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-200/90 dark:hover:bg-emerald-800/60"
                        )}
                        title={`Parcela (${plot.row + 1}, ${plot.col + 1}) · ${isIrrigated ? "Irrigado" : isSelected ? "Seleccionado" : "Sin seleccionar"}`}
                      >
                        {/* texturas y brillos sutiles */}
                        {!isIrrigated && (
                          <span
                            className="pointer-events-none absolute inset-0 opacity-[0.06]"
                            style={{
                              backgroundImage:
                                "radial-gradient(circle at 10% 10%, rgba(0,0,0,0.7) 1px, transparent 1px)",
                              backgroundSize: "18px 18px",
                            }}
                          />
                        )}
                        {/* Efecto de agua cuando irrigado */}
                        {isIrrigated && (
                          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-md">
                            {/* brillo/oleaje */}
                            <span className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.25)_0%,rgba(255,255,255,0.05)_40%,transparent_60%)] bg-[length:200%_100%] animate-water-shimmer" />
                            {/* ondas */}
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-cyan-200/50 animate-ripple" />
                            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cyan-100/40 animate-ripple delay-200" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full md:w-72 shrink-0 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-white/60 dark:bg-black/30 p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Droplets className="h-4 w-4 text-teal-600" />
                    Seleccionadas
                  </div>
                  <div className="mt-1 text-xl font-semibold">{totalSelected}</div>
                  <div className="text-[11px] text-slate-500">{ROWS * COLS} totales</div>
                </div>
                <div className="rounded-lg border bg-white/60 dark:bg-black/30 p-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Droplets className="h-4 w-4 text-emerald-600" />
                    Regadas
                  </div>
                  <div className="mt-1 text-xl font-semibold">{totalIrrigated}</div>
                  <div className="text-[11px] text-slate-500">
                    {totalSelected > 0 ? Math.round((totalIrrigated / totalSelected) * 100) : 0}% de seleccionadas
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span>{stage === "scanning" || stage === "hidden" ? "Escaneo del terreno" : "Avance de riego"}</span>
                  <span>
                    {stage === "scanning" || stage === "hidden"
                      ? Math.round((totalRevealed / (ROWS * COLS)) * 100)
                      : Math.round((totalIrrigated / (ROWS * COLS)) * 100)}
                    %
                  </span>
                </div>
                <Progress
                  value={
                    (stage === "scanning" || stage === "hidden"
                      ? totalRevealed
                      : totalIrrigated) /
                    (ROWS * COLS) *
                    100
                  }
                />
              </div>
              <Separator />
              <div className="space-y-3">
                {stage === "hidden" && (
                  <div className="space-y-2">
                    <Button className="w-full" onClick={handleScan} disabled={isScanning}>
                      Iniciar escaneo topográfico
                    </Button>
                    <p className="text-xs text-slate-600">
                      El dron escaneará el área y revelará las parcelas detectadas por el sensor topográfico.
                    </p>
                  </div>
                )}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4" />
                      Velocidad (ms)
                    </div>
                    <span>{speedMs}</span>
                  </div>
                  <Slider value={[speedMs]} min={60} max={400} step={10} onValueChange={(v) => setSpeedMs(v[0] ?? DEFAULT_STEP_MS)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Shuffle className="h-4 w-4" />
                    Serpenteo
                  </div>
                  <Switch checked={serpentine} onCheckedChange={setSerpentine} />
                </div>
                {/* Acciones del sensor/topografía */}
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full" onClick={handleRescan} disabled={isRunning || isScanning}>
                    Re-escanear
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleAutoSelect} disabled={isRunning || isScanning || stage !== "ready"}>
                    Auto-selección
                  </Button>
                </div>
                {stage !== "hidden" && (
                  <div className="flex gap-2 pt-1">
                    <Button variant="secondary" className="w-full" onClick={handleClearSelection} disabled={isRunning || isScanning}>
                      Limpiar selección
                    </Button>
                    <Button className="w-full" onClick={handleSimulate} disabled={isRunning || isScanning || totalSelected === 0 || stage !== "ready"}>
                      Simular riego
                    </Button>
                  </div>
                )}
                {(isRunning || isScanning) && (
                  <p className="text-xs text-slate-500">
                    {isScanning ? "Escaneando terreno…" : "Simulación de riego en curso…"}
                  </p>
                )}
                {!isRunning && totalIrrigated > 0 && (
                  <p className="text-xs text-slate-600">
                    Resumen: {totalIrrigated} parcelas regadas / {ROWS * COLS} totales.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes drop {
          0% { transform: translateY(-8px); opacity: 0.8; }
          100% { transform: translateY(28px); opacity: 0; }
        }
        .animate-drop {
          animation: drop 0.8s ease-in infinite;
        }
        @keyframes rotor-spin {
          to { transform: rotate(360deg); }
        }
        .animate-rotor-spin {
          animation: rotor-spin 0.9s linear infinite;
        }
        @keyframes spray-down {
          0% { transform: translateY(0); opacity: 0.85; }
          100% { transform: translateY(18px); opacity: 0; }
        }
        .animate-spray-down {
          animation: spray-down 0.5s ease-in infinite;
        }
        @keyframes water-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-water-shimmer {
          animation: water-shimmer 2.4s linear infinite;
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(1.25); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 1.6s ease-out infinite;
        }
      `}</style>
    </section>
  );
}


