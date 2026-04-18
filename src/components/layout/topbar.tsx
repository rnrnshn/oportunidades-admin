import { useQueryClient } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { clearAccessToken } from '@/lib/auth-store'

export function Topbar() {
	const queryClient = useQueryClient()

	function handleLogout() {
		clearAccessToken()
		queryClient.clear()
		window.location.href = '/login'
	}

	return (
		<header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
			<div>
				<p className="text-xs uppercase tracking-wide text-slate-500">CMS</p>
				<h2 className="text-lg font-semibold text-slate-900">Management</h2>
			</div>
			<Button variant="outline" onClick={handleLogout}>Logout</Button>
		</header>
	)
}
