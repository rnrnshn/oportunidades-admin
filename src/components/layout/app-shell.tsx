import type { PropsWithChildren } from 'react'

import { SidebarNav } from '@/components/layout/sidebar-nav'
import { Topbar } from '@/components/layout/topbar'

export function AppShell({ children }: PropsWithChildren) {
	return (
		<div className="flex h-screen overflow-hidden bg-kumo-elevated text-kumo-default">
			<SidebarNav />
			<div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
				<Topbar />
				<main className="min-h-0 flex-1 overflow-y-auto p-6">
					{children}
				</main>
			</div>
		</div>
	)
}
