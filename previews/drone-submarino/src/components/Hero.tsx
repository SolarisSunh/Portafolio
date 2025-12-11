import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function scrollTo(id: string) {
	const el = document.getElementById(id)
	if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Hero() {
	return (
		<section
			id="inicio"
			className="ocean-gradient ocean-particles relative min-h-[85vh] overflow-hidden"
		>
			<div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 md:min-h-screen md:grid-cols-2">
				<div className="relative z-10 space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-background/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
						<span className="h-2 w-2 rounded-full bg-cyan-400" />
						<small className="tracking-wide">Misión: recolección de muestras</small>
					</div>
					<h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
						Dron Submarino para Recolección de Muestras
					</h1>
					<p className="max-w-xl text-muted-foreground">
						Explora el fondo del mar y recolecta muestras de manera precisa y
						automatizada.
					</p>
					<ul className="grid grid-cols-1 gap-2 text-sm text-muted-foreground/90 sm:grid-cols-2">
						<li className="inline-flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
							Muestreo autónomo
						</li>
						<li className="inline-flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
							Sensores de alta precisión
						</li>
						<li className="inline-flex items-center gap-2">
							<span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
							Operación en ambientes extremos
						</li>
					</ul>
					<div className="flex flex-wrap items-center gap-3 pt-2">
						<Button onClick={() => scrollTo('simulacion')}>Ver simulación</Button>
						<Button
							onClick={() => scrollTo('ficha')}
							variant="secondary"
							className="border border-border/50"
						>
							Ver ficha técnica
						</Button>
					</div>
				</div>
				<div className="relative">
					<div className="light-beam" />
					<Card className="group relative mx-auto w-full max-w-xl overflow-hidden border-cyan-500/20 bg-gradient-to-b from-cyan-900/10 to-background/30 shadow-lg ring-1 ring-cyan-400/20">
						<CardContent className="relative p-0">
							{/* Capa de brillo sutil */}
							<div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-emerald-400/10" />
							{/* Imagen real del dron: el usuario debe colocar /public/drone-submarino.jpg */}
							<img
								src="/drone-submarino.jpg"
								alt="Dron Submarino"
								className="block h-[340px] w-full object-cover md:h-[420px]"
							/>
							{/* Efecto de flotación */}
							<div className="absolute inset-0 -z-10 animate-float-slow" />
							{/* Pequeños brillos */}
							<div className="absolute right-10 top-10 glow-dot" />
							<div className="absolute bottom-12 left-8 glow-dot" />
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	)
}


