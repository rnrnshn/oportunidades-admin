import type { PropsWithChildren } from 'react'

interface PageHeaderProps extends PropsWithChildren {
	title: string
	description?: string
	actions?: React.ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<h1 className="text-2xl font-bold text-kumo-default">{title}</h1>
				{description ? <p className="mt-2 text-sm text-kumo-subtle">{description}</p> : null}
			</div>
			{actions ? <div className="flex items-center gap-2">{actions}</div> : null}
		</div>
	)
}
