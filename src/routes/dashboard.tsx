import { useState } from 'react'
import { FileText, Briefcase, AlertTriangle, Users } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingState } from '@/components/ui/state'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useDashboard, useAnalytics } from '@/features/dashboard/use-dashboard'

const PERIODS = [
	{ label: '7d', days: 7 },
	{ label: '30d', days: 30 },
	{ label: '90d', days: 90 },
] as const

const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#6366f1']

export function DashboardPage() {
	const { data, isLoading, isError } = useDashboard()
	const [days, setDays] = useState(30)
	const analytics = useAnalytics(days)

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

			{/* Period selector */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-kumo-subtle">Período:</span>
				{PERIODS.map((p) => (
					<Button key={p.days} size="sm" variant={days === p.days ? 'default' : 'outline'} onClick={() => setDays(p.days)}>
						{p.label}
					</Button>
				))}
			</div>

			{/* Charts */}
			{analytics.isLoading ? (
				<LoadingState />
			) : analytics.data ? (
				<div className="space-y-6 animate-in fade-in duration-300">
					{/* Content growth area chart */}
					<Card>
						<CardHeader>
							<CardTitle className="text-base">Crescimento de conteúdo</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer width="100%" height={260}>
								<AreaChart data={analytics.data.content_over_time} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
									<defs>
										<linearGradient id="gradArticles" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
										</linearGradient>
										<linearGradient id="gradOpportunities" x1="0" y1="0" x2="0" y2="1">
											<stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
											<stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
									<XAxis dataKey="date" tick={{ fontSize: 11 }} tickFormatter={(v: string) => v.slice(5)} />
									<YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
									<Tooltip labelFormatter={(v: string) => v} contentStyle={{ fontSize: 12 }} />
									<Area type="monotone" dataKey="articles" name="Artigos" stroke="#3b82f6" fill="url(#gradArticles)" strokeWidth={2} animationDuration={800} />
									<Area type="monotone" dataKey="opportunities" name="Oportunidades" stroke="#8b5cf6" fill="url(#gradOpportunities)" strokeWidth={2} animationDuration={800} />
								</AreaChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					<div className="grid gap-6 lg:grid-cols-2">
						{/* Opportunities by type - pie chart */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Oportunidades por tipo</CardTitle>
							</CardHeader>
							<CardContent>
								{analytics.data.opportunities_by_type.length === 0 ? (
									<p className="text-sm text-kumo-subtle py-8 text-center">Sem dados.</p>
								) : (
									<ResponsiveContainer width="100%" height={220}>
										<PieChart>
											<Pie
												data={analytics.data.opportunities_by_type}
												dataKey="count"
												nameKey="label"
												cx="50%"
												cy="50%"
												outerRadius={80}
												innerRadius={45}
												animationDuration={800}
												label={({ label, count }: { label: string; count: number }) => `${label} (${count})`}
												labelLine={false}
											>
												{analytics.data.opportunities_by_type.map((_, i) => (
													<Cell key={i} fill={COLORS[i % COLORS.length]} />
												))}
											</Pie>
											<Tooltip contentStyle={{ fontSize: 12 }} />
										</PieChart>
									</ResponsiveContainer>
								)}
							</CardContent>
						</Card>

						{/* Opportunities by status - bar chart */}
						<Card>
							<CardHeader>
								<CardTitle className="text-base">Oportunidades por estado</CardTitle>
							</CardHeader>
							<CardContent>
								{analytics.data.opportunities_by_status.length === 0 ? (
									<p className="text-sm text-kumo-subtle py-8 text-center">Sem dados.</p>
								) : (
									<ResponsiveContainer width="100%" height={220}>
										<BarChart data={analytics.data.opportunities_by_status} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
											<CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
											<XAxis dataKey="label" tick={{ fontSize: 11 }} />
											<YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
											<Tooltip contentStyle={{ fontSize: 12 }} />
											<Bar dataKey="count" name="Total" animationDuration={800} radius={[4, 4, 0, 0]}>
												{analytics.data.opportunities_by_status.map((_, i) => (
													<Cell key={i} fill={COLORS[i % COLORS.length]} />
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			) : null}

			{/* Recent items tables */}
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
