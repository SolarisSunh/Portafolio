import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type FormData = {
	nombre: string
	email: string
	organizacion: string
	tipo: 'Investigación' | 'Monitoreo ambiental' | 'Inspección industrial'
	mensaje: string
}

export function ContactSection() {
	const [ok, setOk] = useState(false)

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const payload: FormData = {
			nombre: String(formData.get('nombre') || ''),
			email: String(formData.get('email') || ''),
			organizacion: String(formData.get('organizacion') || ''),
			tipo: (String(formData.get('tipo') || 'Investigación') as any) || 'Investigación',
			mensaje: String(formData.get('mensaje') || ''),
		}
		console.log('Solicitud de demo:', payload)
		setOk(true)
		setTimeout(() => setOk(false), 2500)
		alert('Gracias. Hemos recibido tu solicitud. ¡Te contactaremos pronto!')
		e.currentTarget.reset()
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Contacto</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div>
						<Label htmlFor="nombre">Nombre</Label>
						<Input id="nombre" name="nombre" placeholder="Tu nombre" required />
					</div>
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="tucorreo@ejemplo.com"
							required
						/>
					</div>
					<div>
						<Label htmlFor="organizacion">Organización</Label>
						<Input id="organizacion" name="organizacion" placeholder="Institución / Empresa" />
					</div>
					<div>
						<Label htmlFor="tipo">Tipo de misión</Label>
						<select
							id="tipo"
							name="tipo"
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							defaultValue="Investigación"
						>
							<option>Investigación</option>
							<option>Monitoreo ambiental</option>
							<option>Inspección industrial</option>
						</select>
					</div>
					<div className="md:col-span-2">
						<Label htmlFor="mensaje">Mensaje</Label>
						<Textarea id="mensaje" name="mensaje" placeholder="Cuéntanos sobre tu misión..." />
					</div>
					<div className="md:col-span-2 flex items-center justify-between">
						<p className="text-sm text-muted-foreground">
							Orientado a centros de investigación, universidades e industria.
						</p>
						<Button type="submit">Enviar</Button>
					</div>
					{ok ? (
						<p className="md:col-span-2 text-sm text-emerald-300">
							Solicitud enviada correctamente.
						</p>
					) : null}
				</form>
			</CardContent>
		</Card>
	)
}


