import { Briefcase, Building2, FileText, Flag, GraduationCap, Handshake, Home, User } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

import { cn } from '@/lib/utils'

const navItems = [
	{ to: '/', label: 'Dashboard', icon: Home },
	{ to: '/articles', label: 'Articles', icon: FileText },
	{ to: '/opportunities', label: 'Opportunities', icon: Briefcase },
	{ to: '/universities', label: 'Universities', icon: Building2 },
	{ to: '/courses', label: 'Courses', icon: GraduationCap },
	{ to: '/reports', label: 'Reports', icon: Flag },
	{ to: '/mentorship/sessions', label: 'Mentorship', icon: Handshake },
	{ to: '/account', label: 'Account', icon: User },
]

export function SidebarNav() {
	const pathname = useRouterState({ select: (state) => state.location.pathname })

	return (
		<aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/8 bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
			<div className="border-b border-white/8 px-6 py-5">
				<p className="text-xs font-semibold uppercase tracking-wide text-white/50">Oportunidades</p>
				<h1 className="mt-1 text-lg font-semibold text-white">Admin UI</h1>
			</div>
			<nav className="min-h-0 flex-1 space-y-1 overflow-y-auto p-4">
				{navItems.map((item) => {
					const Icon = item.icon
					const active = pathname === item.to || pathname.startsWith(`${item.to}/`)
					return (
						<Link
							key={item.to}
							to={item.to}
							className={cn(
								'flex min-h-[36px] w-full min-w-0 items-center gap-2.5 rounded-md px-3 py-1.5 text-[13px] no-underline transition-all duration-200 ease-out',
								active ? 'bg-kumo-brand text-white' : 'text-white/70 hover:bg-white/8 hover:text-white',
							)}
						>
							<Icon className={cn('size-[18px] shrink-0', active ? 'text-white' : 'text-white/60')} />
							{item.label}
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
