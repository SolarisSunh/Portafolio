import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Camera, CheckCircle2, CircleDot, Fish, Gem, Shell } from 'lucide-react'

export type SampleType = 'sedimentos' | 'rocas' | 'corales' | 'biota'

export type SamplePoint = {
	id: string
	x: number // posición horizontal del mundo (0..1)
	depth: number // profundidad relativa (0..1)
	type: SampleType
	active: boolean
	collected: boolean
}

type DroneState = {
	x: number // 0..1 del ancho visible
	depth: number // 0..1 de la altura visible
	collecting: boolean
}

const COLORS: Record<SampleType, string> = {
	sedimentos: 'text-yellow-300',
	rocas: 'text-emerald-300',
	corales: 'text-rose-300',
	biota: 'text-cyan-300',
}

function iconForType(type: SampleType) {
	switch (type) {
		case 'sedimentos':
			return <Shell className="h-3.5 w-3.5" />
		case 'rocas':
			return <Gem className="h-3.5 w-3.5" />
		case 'corales':
			return <CircleDot className="h-3.5 w-3.5" />
		case 'biota':
			return <Fish className="h-3.5 w-3.5" />
	}
}

function generateInitialPoints(): SamplePoint[] {
	const types: SampleType[] = ['sedimentos', 'rocas', 'corales', 'biota']
	const points: SamplePoint[] = []
	for (let i = 0; i < 12; i++) {
		points.push({
			id: `p-${i}`,
			x: 0.06 + (i / 12) * 0.86,
			depth: 0.75 + (Math.sin(i * 0.8) * 0.07 + Math.random() * 0.05),
			type: types[i % types.length],
			active: false,
			collected: false,
		})
	}
	return points
}

export function SeafloorSimulation() {
	// Estado de puntos de muestra
	const [points, setPoints] = useState<SamplePoint[]>(() => generateInitialPoints())
	// Filtro por tipo
	const [filter, setFilter] = useState<SampleType | 'todos'>('todos')
	// Estado del dron
	const [drone, setDrone] = useState<DroneState>({ x: 0, depth: 0.65, collecting: false })
	// Control de misión
	const [running, setRunning] = useState(false)
	const [startTime, setStartTime] = useState<number | null>(null)
	const [elapsed, setElapsed] = useState(0)
	const rafRef = useRef<number | null>(null)
	const areaRef = useRef<HTMLDivElement | null>(null)
	// Objetivo actual (el dron va directo a este punto)
	const [currentTargetId, setCurrentTargetId] = useState<string | null>(null)

	const collectedCount = useMemo(() => points.filter((p) => p.collected).length, [points])
	const selectedCount = useMemo(() => points.filter((p) => p.active).length, [points])

	// Dibuja una línea de fondo marino usando una onda senoidal
	const seafloorPath = useMemo(() => {
		const width = 1000
		const height = 400
		const baseY = height * 0.8
		const amplitude = 18
		const frequency = 0.012
		let d = `M 0,${baseY}`
		for (let x = 0; x <= width; x += 10) {
			const y = baseY + Math.sin(x * frequency) * amplitude
			d += ` L ${x},${y.toFixed(2)}`
		}
		d += ` L ${width},${height} L 0,${height} Z`
		return d
	}, [])

	// Maneja clic en punto de muestra (activar/desactivar objetivo)
	const onTogglePoint = useCallback((id: string) => {
		setPoints((prev) =>
			prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
		)
	}, [])

	// Selecciona el siguiente objetivo más cercano al dron
	function pickNextTargetId(fromX: number, fromDepth: number, pts: SamplePoint[]): string | null {
		let best: { id: string; d2: number } | null = null
		for (const p of pts) {
			if (!p.active || p.collected) continue
			const dx = p.x - fromX
			const dy = p.depth - fromDepth
			const d2 = dx * dx + dy * dy
			if (!best || d2 < best.d2) best = { id: p.id, d2 }
		}
		return best?.id ?? null
	}

	// Lógica de animación y movimiento del dron (ir directo a objetivos activos)
	useEffect(() => {
		/*
			Explicación (ES):
			- El dron selecciona el objetivo activo más cercano y se mueve en línea recta hacia él.
			- Al llegar (distancia pequeña), marca el punto como recolectado y elige el siguiente objetivo.
			- Si no quedan objetivos activos, la misión finaliza.
		*/
		if (!running) return

		let last = performance.now()
		if (startTime === null) setStartTime(last)

		const tick = (now: number) => {
			const dt = Math.min(33, now - last) // ms
			last = now
			setElapsed((t0) => (startTime ? now - startTime : t0))

			// Determinar objetivo actual o elegir uno nuevo si falta
			let target = points.find((p) => p.id === currentTargetId && p.active && !p.collected)
			if (!target) {
				const nextId = pickNextTargetId(drone.x, drone.depth, points)
				if (nextId) {
					setCurrentTargetId(nextId)
					target = points.find((p) => p.id === nextId)
				} else {
					// No quedan objetivos -> finalizar
					setRunning(false)
				}
			}

			// Mover el dron hacia el objetivo
			if (target) {
				setDrone((d) => {
					const speed = 0.00028 // velocidad normalizada (más alta que antes para ir directo)
					const dx = target!.x - d.x
					const dy = target!.depth - d.depth
					const dist = Math.hypot(dx, dy)
					if (dist < speed * dt * 1.2) {
						// Llegó: fijar posición exacta y marcar recolectado
						setPoints((prev) =>
							prev.map((p) => (p.id === target!.id ? { ...p, collected: true } : p))
						)
						setCurrentTargetId(null)
						return { ...d, x: target!.x, depth: target!.depth }
					}
					const ux = dx / (dist || 1)
					const uy = dy / (dist || 1)
					return { ...d, x: d.x + ux * speed * dt, depth: d.depth + uy * speed * dt }
				})
			}

			rafRef.current = requestAnimationFrame(tick)
		}
		rafRef.current = requestAnimationFrame(tick)
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current)
		}
	}, [running, startTime, currentTargetId, points, drone.x, drone.depth])

	const startMission = () => {
		setDrone({ x: 0, depth: 0.65, collecting: false })
		setElapsed(0)
		setStartTime(null)
		setRunning(true)
		// Elegir primer objetivo
		const firstId = pickNextTargetId(0, 0.65, points)
		setCurrentTargetId(firstId)
	}

	const resetMission = () => {
		setRunning(false)
		setElapsed(0)
		setStartTime(null)
		setDrone({ x: 0, depth: 0.65, collecting: false })
		setPoints(generateInitialPoints())
		setCurrentTargetId(null)
	}

	// Proyección a pixeles del mundo (0..1) -> área visible
	const worldToPx = useCallback(
		(x: number, y: number) => {
			const rect = areaRef.current?.getBoundingClientRect()
			const w = rect?.width ?? 800
			const h = rect?.height ?? 380
			return { x: x * w, y: y * h }
		},
		[areaRef]
	)

	// Elemento visual del dron (mini silueta con luz frontal)
	const droneVisual = (() => {
		const { x, y } = worldToPx(drone.x, drone.depth)
		return (
			<g transform={`translate(${x}, ${y})`}>
				<rect x={-18} y={-8} width={36} height={16} rx={8} className="fill-cyan-500/70" />
				<circle cx={-10} cy={-10} r={4} className="fill-emerald-400/70">
					<title>Propulsor</title>
				</circle>
				<circle cx={10} cy={-10} r={4} className="fill-emerald-400/70">
					<title>Propulsor</title>
				</circle>
				{/* Cámara frontal */}
				<circle cx={22} cy={0} r={4} className="fill-yellow-200/80 drop-shadow" />
				{/* Cono de luz (haz) */}
				<path
					d="M24,-8 L120,-24 L120,24 L24,8 Z"
					className="fill-cyan-300/10"
				/>
			</g>
		)
	})()

	const filteredPoints = points.filter((p) => filter === 'todos' || p.type === filter)

	return (
		<Card className="relative overflow-hidden">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<span className="inline-flex h-2 w-2 rounded-full bg-cyan-400" />
					Simulación interactiva — Misión en el fondo del mar
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div
					ref={areaRef}
					className="relative aspect-[16/7] w-full overflow-hidden rounded-lg bg-gradient-to-b from-sky-900/40 to-sky-950/60"
				>
					{/* Burbujas sutiles */}
					<div className="pointer-events-none absolute -left-5 -top-10 h-[200%] w-10 animate-bubble-rise bg-gradient-to-b from-cyan-200/30 to-transparent blur-[2px]" />
					<svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 400">
						{/* Fondo marino */}
						<path d={seafloorPath} className="fill-emerald-900/40" />

						{/* Puntos de muestra */}
						{filteredPoints.map((p) => {
							const { x, y } = worldToPx(p.x, p.depth)
							const isActive = p.active
							const isCollected = p.collected
							return (
								<g
									key={p.id}
									transform={`translate(${x}, ${y})`}
									className="cursor-pointer"
									onClick={() => onTogglePoint(p.id)}
								>
									<circle
										r={10}
										className={cn(
											'transition-all',
											isCollected
												? 'fill-emerald-400/20'
												: isActive
												? 'fill-cyan-400/40'
												: 'fill-foreground/20'
										)}
									/>
									<g className={cn('pointer-events-none', COLORS[p.type])}>
										{iconForType(p.type)}
									</g>
									{isCollected ? (
										<CheckCircle2 className="absolute -translate-x-3 -translate-y-3 text-emerald-300" />
									) : null}
								</g>
							)
						})}

						{/* Dron */}
						{droneVisual}
					</svg>

					{/* HUD */}
					<div className="absolute left-3 top-3 flex items-center gap-2 rounded-md border border-border/50 bg-background/50 px-3 py-2 text-xs backdrop-blur">
						<Badge variant="secondary" className="gap-1">
							<Camera className="h-3.5 w-3.5" /> Profundidad: {(drone.depth * 100).toFixed(0)}%
						</Badge>
						<Badge variant="secondary">
							Recolectadas: {collectedCount} / {selectedCount || 0}
						</Badge>
						<Badge variant="secondary">Tiempo: {(elapsed / 1000).toFixed(1)}s</Badge>
					</div>
				</div>

				<div className="mt-5 flex flex-wrap items-center justify-between gap-4">
					<Tabs defaultValue="filtro" className="w-full md:w-auto">
						<TabsList>
							<TabsTrigger value="filtro">Filtrar</TabsTrigger>
							<TabsTrigger value="objetivos">Objetivos</TabsTrigger>
						</TabsList>
						<TabsContent value="filtro" className="mt-3">
							<div className="flex flex-wrap items-center gap-2">
								<ToggleGroup
									type="single"
									value={filter}
									onValueChange={(v) => setFilter((v as any) || 'todos')}
									className="flex flex-wrap gap-2"
								>
									<ToggleGroupItem value="todos" className="px-3 py-1.5">
										Todos
									</ToggleGroupItem>
									<ToggleGroupItem value="sedimentos" className="px-3 py-1.5">
										Sedimentos
									</ToggleGroupItem>
									<ToggleGroupItem value="rocas" className="px-3 py-1.5">
										Rocas
									</ToggleGroupItem>
									<ToggleGroupItem value="corales" className="px-3 py-1.5">
										Corales
									</ToggleGroupItem>
									<ToggleGroupItem value="biota" className="px-3 py-1.5">
										Biota
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
						</TabsContent>
						<TabsContent value="objetivos" className="mt-3">
							<div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
								{points.map((p) => (
									<Badge
										key={p.id}
										variant={p.active ? 'default' : 'secondary'}
										className="gap-1"
									>
										{iconForType(p.type)}
										<span>{p.type}</span>
									</Badge>
								))}
							</div>
						</TabsContent>
					</Tabs>
					<div className="flex items-center gap-3">
						<Button onClick={startMission} disabled={running || selectedCount === 0}>
							Iniciar misión
						</Button>
						<Button variant="outline" onClick={resetMission}>
							Reiniciar
						</Button>
					</div>
				</div>
			</CardContent>
			<CardFooter className="justify-between text-sm text-muted-foreground">
				<div>
					Consejo: selecciona puntos para marcarlos como objetivos y presiona “Iniciar misión”.
				</div>
				<div className="flex items-center gap-2">
					<div className="h-2 w-2 rounded-full bg-cyan-400" />
					<span>Puntos activos</span>
				</div>
			</CardFooter>
		</Card>
	)
}


