import { cn } from '@/lib/utils'

const links = [
	{ id: 'inicio', label: 'Inicio' },
	{ id: 'simulacion', label: 'Simulación' },
	{ id: 'ficha', label: 'Ficha técnica' },
	{ id: 'vista3d', label: 'Vista 3D' },
]

function scrollTo(id: string) {
	const el = document.getElementById(id)
	if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Navbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
			<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
				<div className="flex items-center gap-3">
					<div className="h-8 w-8 rounded-md bg-gradient-to-tr from-cyan-400/70 to-emerald-400/70 shadow ring-1 ring-cyan-300/40" />
					<span className="text-lg font-semibold tracking-wide">OceanProbe</span>
				</div>
				<nav className={cn('hidden items-center gap-6 md:flex')}>
					{links.map((l) => (
						<button
							key={l.id}
							onClick={() => scrollTo(l.id)}
							className="text-sm text-muted-foreground transition hover:text-foreground"
						>
							{l.label}
						</button>
					))}
				</nav>
				<div className="flex items-center gap-3" />
			</div>
		</header>
	)
}


