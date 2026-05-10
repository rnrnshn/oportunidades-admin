import { useQueryClient } from '@tanstack/react-query'
import { ExternalLink, LogOut, Settings, Shield } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { logout } from '@/features/auth/api/auth'
import { cn } from '@/lib/utils'

export function Topbar() {
	const queryClient = useQueryClient()
	const { data: user } = useCurrentUser()

	async function handleLogout() {
		try {
			await logout()
		} finally {
			queryClient.clear()
			window.location.href = '/login'
		}
	}

	return (
		<header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b bg-kumo-base px-4">
			<div className="text-kumo-subtle text-sm">Management</div>
			<div className="flex items-center gap-2">
				<a className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))} href="/" rel="noreferrer" target="_blank">
					<ExternalLink className="h-4 w-4 me-1" />
					View Site
				</a>
				<DropdownMenu>
					<DropdownMenuTrigger render={<Button className="gap-2 py-1 h-auto" size="sm" variant="ghost" />}>
							<div className="flex h-6 w-6 items-center justify-center rounded-full bg-kumo-brand/10 text-xs font-medium text-kumo-brand">
								{(user?.name?.[0] ?? user?.email?.[0] ?? 'U').toUpperCase()}
							</div>
							<span className="hidden max-w-[120px] truncate sm:inline">{user?.name ?? user?.email ?? 'User'}</span>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56 p-2">
						<div className="mb-1 border-b px-3 py-2">
							<div className="truncate font-medium">{user?.name ?? 'User'}</div>
							<div className="truncate text-xs text-kumo-subtle">{user?.email}</div>
						</div>
						<DropdownMenuItem>
							<Link className="flex w-full items-center gap-2" to="/account">
								<Shield className="h-4 w-4" />
								Account
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link className="flex w-full items-center gap-2" to="/account">
								<Settings className="h-4 w-4" />
								Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-kumo-danger" onClick={handleLogout}>
							<LogOut className="h-4 w-4" />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	)
}
