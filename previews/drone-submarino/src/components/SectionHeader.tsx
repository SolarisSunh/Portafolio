import { cn } from '@/lib/utils'

type Props = {
	title: string
	subtitle?: string
	className?: string
}

export function SectionHeader({ title, subtitle, className }: Props) {
	return (
		<div className={cn('mb-10 flex flex-col gap-2', className)}>
			<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
			{subtitle ? (
				<p className="max-w-2xl text-muted-foreground">{subtitle}</p>
			) : null}
		</div>
	)
}


