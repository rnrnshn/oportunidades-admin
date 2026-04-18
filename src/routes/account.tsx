import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'

export function AccountPage() {
	const { data } = useCurrentUser()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Account</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm text-slate-600">
				<p>Name: {data?.name ?? 'Unknown'}</p>
				<p>Email: {data?.email ?? 'Unknown'}</p>
				<p>Role: {data?.role ?? 'Unknown'}</p>
			</CardContent>
		</Card>
	)
}
