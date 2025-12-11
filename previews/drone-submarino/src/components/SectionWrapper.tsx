import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
	id: string
	className?: string
	children: React.ReactNode
}

export function SectionWrapper({ id, className, children }: Props) {
	return (
		<section id={id} className={cn('py-24', className)}>
			<div className="mx-auto max-w-6xl px-4">{children}</div>
		</section>
	)
}


