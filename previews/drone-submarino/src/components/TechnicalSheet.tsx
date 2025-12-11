import { SectionHeader } from '@/components/SectionHeader'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CameraIcon, Package, Box, Armchair } from 'lucide-react'

const componentsData = [
	{
		name: 'Chasis de plástico',
		description:
			'Estructura ligera y resistente a la corrosión marina, diseñada para soportar presión y golpes leves.',
		icon: Package,
		tags: ['Resistente a la corrosión', 'Peso optimizado'],
	},
	{
		name: 'Cámara',
		description:
			'Cámara HD con iluminación integrada para inspección visual en condiciones de baja visibilidad.',
		icon: CameraIcon,
		tags: ['Alta resolución', 'Baja iluminación'],
	},
	{
		name: 'Brazo',
		description:
			'Brazo articulado de alta precisión para manipulación de muestras delicadas.',
		icon: Armchair,
		tags: ['Alta precisión de manipulación', 'Control estable'],
	},
	{
		name: 'Compartimiento para muestras',
		description:
			'Módulo sellado con volumen configurable para almacenar rocas, sedimentos y biota.',
		icon: Box,
		tags: ['Volumen configurable', 'Sellado presurizado'],
	},
]

export function TechnicalSheet() {
	return (
		<div>
			<SectionHeader
				title="Ficha técnica — Componentes principales"
				subtitle="Resumen de los módulos clave que conforman OceanProbe."
			/>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{componentsData.map((c) => {
					const Icon = c.icon
					return (
						<Card key={c.name} className="bg-card/60">
							<CardHeader className="space-y-2">
								<div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary/60">
									<Icon className="h-5 w-5 text-primary" />
								</div>
								<CardTitle>{c.name}</CardTitle>
								<CardDescription>{c.description}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-wrap gap-2">
								{c.tags.map((t) => (
									<Badge key={t} variant="secondary">
										{t}
									</Badge>
								))}
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}


