import type { PropsWithChildren } from 'react'

import { useRouterState } from '@tanstack/react-router'

import { SidebarNav } from '@/components/layout/sidebar-nav'
import { Topbar } from '@/components/layout/topbar'

export function AppShell({ children }: PropsWithChildren) {
	const pathname = useRouterState({ select: (s) => s.location.pathname })

	return (
		<div className="flex h-screen overflow-hidden bg-kumo-elevated text-kumo-default">
			<SidebarNav />
			<div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
				<Topbar />
				<main key={pathname} className="min-h-0 flex-1 overflow-y-auto p-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
					{children}
				</main>
			</div>
		</div>
	)
}
