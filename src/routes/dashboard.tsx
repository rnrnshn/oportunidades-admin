import { FileText, Briefcase, AlertTriangle, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDashboard } from '@/features/dashboard/use-dashboard'

export function DashboardPage() {
	const { data, isLoading, isError } = useDashboard()

	if (isLoading) {
		return (
			<div className="space-y-6">
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, i) => (
						<Card key={i}><CardContent className="py-6"><div className="h-8 w-20 animate-pulse rounded bg-slate-200" /></CardContent></Card>
					))}
				</div>
			</div>
		)
	}

	if (isError || !data) {
		return (
			<div className="space-y-6">
				<h1 className="text-2xl font-semibold">Dashboard</h1>
				<Card><CardContent className="py-6 text-sm text-red-600">Não foi possível carregar os dados do dashboard.</CardContent></Card>
			</div>
		)
	}

	const stats = [
		{ label: 'Artigos', value: data.counts.articles, icon: FileText, href: '/articles' },
		{ label: 'Oportunidades', value: data.counts.opportunities, icon: Briefcase, href: '/opportunities' },
		{ label: 'Denúncias pendentes', value: data.counts.pending_reports, icon: AlertTriangle, href: '/reports' },
		{ label: 'Sessões pendentes', value: data.counts.pending_mentorship_sessions, icon: Users, href: '/mentorship/sessions' },
	]

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Dashboard</h1>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<Link key={stat.label} to={stat.href} className="block">
						<Card className="transition-shadow hover:shadow-md">
							<CardContent className="flex items-center gap-4 py-5">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-kumo-brand/10">
									<stat.icon className="h-5 w-5 text-kumo-brand" />
								</div>
								<div>
									<p className="text-2xl font-bold">{stat.value}</p>
									<p className="text-xs text-kumo-subtle">{stat.label}</p>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="text-base">Denúncias pendentes recentes</CardTitle>
					</CardHeader>
					<CardContent>
						{!data.recent_pending_reports?.length ? (
							<p className="text-sm text-kumo-subtle">Nenhuma denúncia pendente.</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Razão</TableHead>
										<TableHead>Tipo</TableHead>
										<TableHead>Estado</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.recent_pending_reports.map((report) => (
										<TableRow key={report.id}>
											<TableCell className="max-w-[200px] truncate">
												<Link to="/reports/$id" params={{ id: report.id }} className="hover:underline">
													{report.reason ?? '—'}
												</Link>
											</TableCell>
											<TableCell><Badge variant="outline">{report.type ?? '—'}</Badge></TableCell>
											<TableCell><Badge variant="secondary">{report.status ?? '—'}</Badge></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">Oportunidades por verificar</CardTitle>
					</CardHeader>
					<CardContent>
						{!data.recent_unverified_opportunities?.length ? (
							<p className="text-sm text-kumo-subtle">Nenhuma oportunidade por verificar.</p>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Título</TableHead>
										<TableHead>Tipo</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{data.recent_unverified_opportunities.map((opp) => (
										<TableRow key={opp.id}>
											<TableCell className="max-w-[240px] truncate">
												<Link to="/opportunities/$id" params={{ id: opp.id }} className="hover:underline">
													{opp.title ?? '—'}
												</Link>
											</TableCell>
											<TableCell><Badge variant="outline">{opp.type ?? '—'}</Badge></TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
