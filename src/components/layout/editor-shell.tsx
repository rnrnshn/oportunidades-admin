import type { PropsWithChildren } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EditorShellProps extends PropsWithChildren {
	title: string
	description?: string
	sidebar?: React.ReactNode
}

export function EditorShell({ title, description, children, sidebar }: EditorShellProps) {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold text-kumo-default">{title}</h1>
				{description ? <p className="mt-2 text-sm text-kumo-subtle">{description}</p> : null}
			</div>
			<div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
				<Card>
					<CardHeader className="border-b">
						<CardTitle>{title}</CardTitle>
					</CardHeader>
					<CardContent className="pt-4">{children}</CardContent>
				</Card>
				{sidebar ? <div className="space-y-4">{sidebar}</div> : null}
			</div>
		</div>
	)
}
