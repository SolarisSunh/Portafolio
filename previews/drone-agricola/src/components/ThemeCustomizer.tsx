import { useEffect, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Settings, Palette } from "lucide-react";

type ThemePreset = {
  id: string;
  name: string;
  mode: "dark" | "light";
  from: string;
  via: string;
  to: string;
  hint?: string;
};

const PRESETS: ThemePreset[] = [
  // Oscuro — recomendados
  {
    id: "dark-purple",
    name: "Morado con Negro (oscuro)",
    mode: "dark",
    from: "#0b0b14",
    via: "#1a1027",
    to: "#3b0764",
    hint: "Default",
  },
  {
    id: "dark-teal",
    name: "Verde azulado (oscuro)",
    mode: "dark",
    from: "#020617",
    via: "#0b3b3b",
    to: "#134e4a",
  },
  {
    id: "dark-navy",
    name: "Azul marino con índigo",
    mode: "dark",
    from: "#0b1020",
    via: "#111827",
    to: "#1e1b4b",
  },
  {
    id: "dark-copper",
    name: "Cobre y grafito",
    mode: "dark",
    from: "#0f0f0f",
    via: "#1f2937",
    to: "#7c2d12",
  },
  // Claro — recomendados
  {
    id: "light-green",
    name: "Verde suave (claro)",
    mode: "light",
    from: "#ffffff",
    via: "#f0fdf4",
    to: "#dcfce7",
  },
  {
    id: "light-sky",
    name: "Azul cielo (claro)",
    mode: "light",
    from: "#ffffff",
    via: "#f0f9ff",
    to: "#e0f2fe",
  },
  {
    id: "light-sand",
    name: "Arena y marfil",
    mode: "light",
    from: "#ffffff",
    via: "#fafaf9",
    to: "#f5f5f4",
  },
];

export default function ThemeCustomizer(): ReactElement {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("dark-purple");
  // Personalizado
  const [customMode, setCustomMode] = useState<"dark" | "light">("dark");
  const [from, setFrom] = useState("#0b0b14");
  const [via, setVia] = useState("#1a1027");
  const [to, setTo] = useState("#3b0764");
  const [angle, setAngle] = useState<number>(180);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("themeChoice");
      if (saved) {
        const choice = JSON.parse(saved) as {
          id?: string;
          mode: "dark" | "light";
          from: string;
          via: string;
          to: string;
          angle?: number;
        };
        const found = PRESETS.find((p) => p.id === (choice.id ?? ""));
        if (found) setActiveId(found.id);
        if (choice.angle !== undefined) setAngle(choice.angle);
      } else {
        setActiveId("dark-purple");
      }
    } catch {
      setActiveId("dark-purple");
    }
  }, []);

  function applyPreset(preset: ThemePreset) {
    if (preset.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.style.setProperty("--bg-from", preset.from);
    document.documentElement.style.setProperty("--bg-via", preset.via);
    document.documentElement.style.setProperty("--bg-to", preset.to);
    document.documentElement.style.setProperty("--bg-angle", `${angle}deg`);
    localStorage.setItem(
      "themeChoice",
      JSON.stringify({
        id: preset.id,
        mode: preset.mode,
        from: preset.from,
        via: preset.via,
        to: preset.to,
        angle,
      })
    );
    setActiveId(preset.id);
  }

  function applyCustom() {
    if (customMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    document.documentElement.style.setProperty("--bg-from", from);
    document.documentElement.style.setProperty("--bg-via", via);
    document.documentElement.style.setProperty("--bg-to", to);
    document.documentElement.style.setProperty("--bg-angle", `${angle}deg`);
    localStorage.setItem(
      "themeChoice",
      JSON.stringify({
        id: "custom",
        mode: customMode,
        from,
        via,
        to,
        angle,
      })
    );
    setActiveId("custom");
  }

  return (
    <>
      <button
        type="button"
        aria-label="Personalizar tema"
        className={cn(
          "fixed bottom-5 right-5 z-50 inline-flex items-center justify-center",
          "h-11 w-11 rounded-full border bg-white/90 dark:bg-black/60 backdrop-blur",
          "hover:bg-white dark:hover:bg-black shadow"
        )}
        onClick={() => setOpen((s) => !s)}
      >
        <Settings className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[360px] max-w-[92vw]">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Personalizar fondo</h3>
              <Badge className="bg-purple-600">Recomendado</Badge>
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Elige una combinación de fondo. “Morado con Negro (oscuro)” es el predeterminado.
            </p>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">Oscuro</div>
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.filter((p) => p.mode === "dark").map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className={cn(
                        "group relative rounded-lg border p-3 text-left transition-colors",
                        activeId === p.id ? "border-purple-600" : "hover:border-slate-400"
                      )}
                    >
                      <div
                        className="h-16 w-full rounded-md"
                        style={{
                          backgroundImage: `linear-gradient(${angle}deg, ${p.from}, ${p.via}, ${p.to})`,
                        }}
                      />
                      <div className="mt-2 text-sm font-medium">{p.name}</div>
                      {p.hint && <div className="text-xs text-purple-700">{p.hint}</div>}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-slate-500 mb-2">Claro</div>
                <div className="grid grid-cols-2 gap-3">
                  {PRESETS.filter((p) => p.mode === "light").map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => applyPreset(p)}
                      className={cn(
                        "group relative rounded-lg border p-3 text-left transition-colors",
                        activeId === p.id ? "border-purple-600" : "hover:border-slate-400"
                      )}
                    >
                      <div
                        className="h-16 w-full rounded-md"
                        style={{
                          backgroundImage: `linear-gradient(${angle}deg, ${p.from}, ${p.via}, ${p.to})`,
                        }}
                      />
                      <div className="mt-2 text-sm font-medium">{p.name}</div>
                    </button>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <div className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Palette className="h-4 w-4" />
                  Personalizado
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-600">Desde</div>
                    <input
                      aria-label="Color desde"
                      type="color"
                      className="h-9 w-full rounded border"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-600">Medio</div>
                    <input
                      aria-label="Color medio"
                      type="color"
                      className="h-9 w-full rounded border"
                      value={via}
                      onChange={(e) => setVia(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-slate-600">Hasta</div>
                    <input
                      aria-label="Color hasta"
                      type="color"
                      className="h-9 w-full rounded border"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span>Ángulo</span>
                    <span>{angle}°</span>
                  </div>
                  <Slider value={[angle]} min={0} max={360} step={5} onValueChange={(v) => setAngle(v[0] ?? 180)} />
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    className={cn(
                      "px-2 py-1 rounded border",
                      customMode === "dark" ? "bg-black text-white border-slate-700" : "bg-white border-slate-300"
                    )}
                    onClick={() => setCustomMode("dark")}
                  >
                    Oscuro
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "px-2 py-1 rounded border",
                      customMode === "light" ? "bg-white text-slate-900 border-slate-300" : "bg-white border-slate-300"
                    )}
                    onClick={() => setCustomMode("light")}
                  >
                    Claro
                  </button>
                  <div
                    className="ml-auto h-6 w-20 rounded"
                    style={{
                      backgroundImage: `linear-gradient(${angle}deg, ${from}, ${via}, ${to})`,
                    }}
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button onClick={applyCustom}>Aplicar personalizado</Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cerrar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}



