import type { PropsWithChildren } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface EditorShellProps extends PropsWithChildren {
	title: string
	description?: string
}

export function EditorShell({ title, description, children }: EditorShellProps) {
	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold text-kumo-default">{title}</h1>
				{description ? <p className="mt-2 text-sm text-kumo-subtle">{description}</p> : null}
			</div>
			<Card>
				<CardHeader className="border-b">
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="pt-4">{children}</CardContent>
			</Card>
		</div>
	)
}
