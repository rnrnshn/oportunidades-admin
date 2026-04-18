import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DashboardPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Dashboard</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-slate-600">Articles, opportunities, catalog, reports, and mentorship management are ready to connect here.</p>
			</CardContent>
		</Card>
	)
}
