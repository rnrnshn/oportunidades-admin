import { Briefcase, Building2, FileText, Flag, GraduationCap, Home, LogOut, User } from 'lucide-react'
import { Link, useRouterState } from '@tanstack/react-router'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
	{ to: '/', label: 'Dashboard', icon: Home },
	{ to: '/articles', label: 'Articles', icon: FileText },
	{ to: '/opportunities', label: 'Opportunities', icon: Briefcase },
	{ to: '/universities', label: 'Universities', icon: Building2 },
	{ to: '/courses', label: 'Courses', icon: GraduationCap },
	{ to: '/reports', label: 'Reports', icon: Flag },
	{ to: '/account', label: 'Account', icon: User },
]

export function SidebarNav() {
	const pathname = useRouterState({ select: (state) => state.location.pathname })

	return (
		<aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
			<div className="border-b border-slate-200 px-6 py-5">
				<p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Oportunidades</p>
				<h1 className="mt-1 text-lg font-semibold text-slate-900">Admin UI</h1>
			</div>
			<nav className="flex-1 space-y-1 p-4">
				{navItems.map((item) => {
					const Icon = item.icon
					const active = pathname === item.to || pathname.startsWith(`${item.to}/`)
					return (
						<Link
							key={item.to}
							to={item.to}
							className={cn(
								buttonVariants({ variant: active ? 'default' : 'ghost', size: 'default' }),
								'w-full justify-start',
							)}
						>
							<Icon className="h-4 w-4" />
							{item.label}
						</Link>
					)
				})}
			</nav>
			<div className="border-t border-slate-200 p-4">
				<div className={cn(buttonVariants({ variant: 'ghost' }), 'w-full justify-start text-slate-500')}>
					<LogOut className="h-4 w-4" />
					Session handled by API
				</div>
			</div>
		</aside>
	)
}
