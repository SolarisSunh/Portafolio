import { useCallback, useMemo, useRef, useState, type ReactElement } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

export default function DronePerspectiveViewer(): ReactElement {
  // Estados que controlan la rotación 3D (pseudo-3D con CSS)
  const [rotationX, setRotationX] = useState<number>(20);
  const [rotationY, setRotationY] = useState<number>(-20);
  // Estado STL
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [stlScale, setStlScale] = useState<number>(1);
  const dragRef = useRef<{ dragging: boolean; x: number; y: number }>({
    dragging: false,
    x: 0,
    y: 0,
  });

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.dragging = true;
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    dragRef.current.x = e.clientX;
    dragRef.current.y = e.clientY;
    setRotationY((prev) => prev + dx * 0.4);
    setRotationX((prev) => prev - dy * 0.4);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current.dragging = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const loader = new STLLoader();
    const parsed = loader.parse(buffer as ArrayBuffer);
    // Normalizamos tamaño para que entre en el visor
    parsed.computeBoundingBox();
    parsed.computeVertexNormals();
    const bbox = parsed.boundingBox;
    if (bbox) {
      const size = new THREE.Vector3();
      bbox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const target = 2.0; // tamaño objetivo en unidades del mundo
      const s = maxDim > 0 ? target / maxDim : 1;
      setStlScale(s);
    } else {
      setStlScale(1);
    }
    setGeometry(parsed);
  }, []);

  const meshRotation = useMemo<[number, number, number]>(() => {
    // sliders en grados -> radianes
    return [THREE.MathUtils.degToRad(rotationX), THREE.MathUtils.degToRad(rotationY), 0];
  }, [rotationX, rotationY]);

  return (
    <section id="vista3d" className="py-20 bg-transparent">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight">Vista en Perspectiva (3D)</h2>
        <p className="text-slate-600 mt-2">
          Carga tu archivo STL del dron para visualizarlo en 3D. Puedes rotarlo con sliders,
          arrastrar con el ratón y hacer zoom.
        </p>

        <Card className="mt-6 p-6">
          <div className="grid lg:grid-cols-[1fr,320px] gap-6">
            <div className="relative h-80 lg:h-96 rounded-lg border overflow-hidden bg-slate-100">
              {/* Si no hay STL cargado, mostramos el pseudo-3D como placeholder */}
              {!geometry ? (
                <div
                  className="absolute inset-0 bg-gradient-to-b from-slate-100 to-slate-200"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ perspective: "1000px" }}
                  >
                    <div
                      className={cn(
                        "relative w-64 h-40 [transform-style:preserve-3d] transition-transform duration-75 ease-linear"
                      )}
                      style={{
                        transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                      }}
                    >
                      <div className="absolute left-1/2 top-1/2 w-40 h-24 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-300 shadow-xl border border-slate-400"></div>
                      <div className="absolute left-1/2 top-1/2 w-24 h-14 -translate-x-1/2 -translate-y-1/2 rounded-md bg-cyan-200 shadow border border-cyan-300 translate-z-6"></div>
                      <div className="absolute left-1/2 top-1/2 w-[22rem] h-2 -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-full"></div>
                      <div className="absolute left-1/2 top-1/2 w-2 h-[18rem] -translate-x-1/2 -translate-y-1/2 bg-slate-400 rounded-full"></div>
                      {[{ x: -160, y: -110 }, { x: 160, y: -110 }, { x: -160, y: 110 }, { x: 160, y: 110 }].map((p, i) => (
                        <div
                          key={i}
                          className="absolute w-14 h-14 rounded-full bg-slate-200 border border-slate-400 shadow"
                          style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0px)` }}
                        >
                          <div className="absolute inset-2 rounded-full border border-slate-300" />
                          <div className="absolute left-1/2 top-1/2 w-10 h-0.5 bg-slate-600 -translate-x-1/2 -translate-y-1/2" />
                          <div className="absolute left-1/2 top-1/2 w-10 h-0.5 bg-slate-600 -translate-x-1/2 -translate-y-1/2 rotate-90" />
                        </div>
                      ))}
                      <div className="absolute left-1/2 top-[65%] w-8 h-5 -translate-x-1/2 rounded bg-slate-700 shadow border border-slate-600 translate-z-[10px]" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full bg-primary/20 blur-xl" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge variant="secondary">Tanque de agua</Badge>
                    <Badge variant="secondary">Sensores</Badge>
                    <Badge variant="secondary">Cámara</Badge>
                  </div>
                </div>
              ) : (
                <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={0.8} />
                  <Environment preset="city" />
                  <Center>
                    <mesh rotation={meshRotation} scale={stlScale}>
                      <bufferGeometry attach="geometry" {...(geometry as any)} />
                      <meshStandardMaterial color="#94a3b8" metalness={0.1} roughness={0.6} />
                    </mesh>
                  </Center>
                  <OrbitControls enableDamping />
                </Canvas>
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-sm text-slate-600">Cargar STL del dron</div>
                <Input type="file" accept=".stl" onChange={handleFile} />
              </div>
              <div>
                <div className="mb-2 text-sm text-slate-600">Rotación horizontal</div>
                <Slider
                  value={[rotationY]}
                  min={-180}
                  max={180}
                  step={1}
                  onValueChange={(v) => setRotationY(v[0] ?? 0)}
                />
              </div>
              <div>
                <div className="mb-2 text-sm text-slate-600">Rotación vertical</div>
                <Slider
                  value={[rotationX]}
                  min={-80}
                  max={80}
                  step={1}
                  onValueChange={(v) => setRotationX(v[0] ?? 0)}
                />
              </div>
              {geometry && (
                <>
                  <div>
                    <div className="mb-2 text-sm text-slate-600">Escala del modelo</div>
                    <Slider
                      value={[stlScale]}
                      min={0.1}
                      max={5}
                      step={0.05}
                      onValueChange={(v) => setStlScale(v[0] ?? 1)}
                    />
                  </div>
                  <Button variant="outline" onClick={() => { setRotationX(0); setRotationY(0); }}>
                    Restablecer rotación
                  </Button>
                </>
              )}
              <p className="text-sm text-slate-600">
                Consejo: Arrastra con el ratón sobre el visor (o usa los sliders) para rotar.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}


