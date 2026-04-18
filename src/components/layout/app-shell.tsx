import type { PropsWithChildren } from 'react'

import { SidebarNav } from '@/components/layout/sidebar-nav'
import { Topbar } from '@/components/layout/topbar'

export function AppShell({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen bg-slate-50">
			<SidebarNav />
			<div className="flex min-h-screen flex-1 flex-col">
				<Topbar />
				<main className="flex-1 p-6">
					{children}
				</main>
			</div>
		</div>
	)
}
