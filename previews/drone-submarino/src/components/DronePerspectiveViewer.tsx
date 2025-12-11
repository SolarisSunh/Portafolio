import React, { useCallback, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'

export function DronePerspectiveViewer() {
	const [rotationX, setRotationX] = useState<number>(20)
	const [rotationY, setRotationY] = useState<number>(-20)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const draggingRef = useRef(false)
	const lastPosRef = useRef<{ x: number; y: number } | null>(null)

	// Control por click-and-drag
	const onPointerDown = useCallback((e: React.PointerEvent) => {
		draggingRef.current = true
		lastPosRef.current = { x: e.clientX, y: e.clientY }
		;(e.target as Element).setPointerCapture(e.pointerId)
	}, [])
	const onPointerMove = useCallback((e: React.PointerEvent) => {
		if (!draggingRef.current || !lastPosRef.current) return
		const dx = e.clientX - lastPosRef.current.x
		const dy = e.clientY - lastPosRef.current.y
		lastPosRef.current = { x: e.clientX, y: e.clientY }
		setRotationY((v) => Math.max(-60, Math.min(60, v + dx * 0.2)))
		setRotationX((v) => Math.max(-10, Math.min(60, v - dy * 0.2)))
	}, [])
	const onPointerUp = useCallback(() => {
		draggingRef.current = false
		lastPosRef.current = null
	}, [])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Vista 3D — Representación estilizada</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid gap-6 md:grid-cols-[1fr_280px]">
					<div
						ref={containerRef}
						className="relative aspect-[16/9] w-full rounded-xl border border-border/50 bg-gradient-to-b from-sky-900/20 to-sky-950/40"
						style={{ perspective: '1000px' }}
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
					>
						{/* Drone pseudo-3D */}
						<div
							className="absolute left-1/2 top-1/2 h-40 w-64 -translate-x-1/2 -translate-y-1/2 transition-transform"
							style={{
								transformStyle: 'preserve-3d',
								transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(10px)`,
							}}
						>
							{/* Cuerpo central */}
							<div className="absolute inset-0 rounded-xl bg-cyan-500/30 ring-1 ring-cyan-400/30" />
							{/* Cara frontal (cúpula de cámara) */}
							<div className="absolute -left-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-gradient-to-br from-yellow-200/90 to-cyan-200/40 shadow-lg" style={{ transform: 'translateZ(40px)' }} />
							{/* Brazos laterales */}
							<div className="absolute left-1/2 top-1/2 h-3 w-[120%] -translate-x-1/2 -translate-y-1/2 rounded bg-emerald-400/40" style={{ transform: 'translateZ(8px)' }} />
							{/* Compartimiento de muestras (parte superior) */}
							<div className="absolute left-1/2 top-6 h-6 w-40 -translate-x-1/2 rounded-md bg-emerald-500/30 ring-1 ring-emerald-300/40" style={{ transform: 'translateZ(12px)' }} />
							{/* Etiquetas */}
							<div className="absolute -left-10 top-6" style={{ transform: 'translateZ(12px)' }}>
								<Badge>Cámara</Badge>
							</div>
							<div className="absolute right-0 top-10" style={{ transform: 'translateZ(12px)' }}>
								<Badge>Chasis de plástico</Badge>
							</div>
							<div className="absolute left-1/2 top-[70%] -translate-x-1/2" style={{ transform: 'translateZ(12px)' }}>
								<Badge>Brazo</Badge>
							</div>
							<div className="absolute left-1/2 top-2 -translate-x-1/2" style={{ transform: 'translateZ(12px)' }}>
								<Badge>Compartimiento para muestras</Badge>
							</div>
						</div>
					</div>
					<div className="space-y-4">
						<div>
							<label className="mb-2 block text-sm text-muted-foreground">
								Rotación vertical
							</label>
							<Slider
								min={-10}
								max={60}
								step={1}
								value={[rotationX]}
								onValueChange={(v) => setRotationX(v[0] ?? 0)}
							/>
						</div>
						<div>
							<label className="mb-2 block text-sm text-muted-foreground">
								Rotación horizontal
							</label>
							<Slider
								min={-60}
								max={60}
								step={1}
								value={[rotationY]}
								onValueChange={(v) => setRotationY(v[0] ?? 0)}
							/>
						</div>
						<p className="text-sm text-muted-foreground">
							Consejo: también puedes hacer click y arrastrar sobre el área para
							girar el dron en perspectiva.
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}


