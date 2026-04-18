import { Link } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/layout/page-header'
import { SearchToolbar } from '@/components/layout/search-toolbar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Report } from '@/features/reports/schemas/report.schema'

interface ReportsTableProps {
	reports: Report[]
	filters: { q: string; status: string; entity_type: string }
	onFilterChange: (key: 'q' | 'status' | 'entity_type', value: string) => void
	onStatusChange: (id: string, status: string) => void
}

export function ReportsTable({ reports, filters, onFilterChange, onStatusChange }: ReportsTableProps) {
	return (
		<div className="space-y-4">
			<PageHeader title="Reports" />
			<SearchToolbar
				placeholder="Search reports..."
				value={filters.q}
				onChange={(value) => onFilterChange('q', value)}
				filters={
					<>
					<Select value={filters.status || 'all-statuses'} onValueChange={(value) => onFilterChange('status', value === 'all-statuses' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All statuses" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-statuses">All statuses</SelectItem>
							<SelectItem value="pending">Pending</SelectItem>
							<SelectItem value="reviewed">Reviewed</SelectItem>
							<SelectItem value="resolved">Resolved</SelectItem>
							<SelectItem value="dismissed">Dismissed</SelectItem>
						</SelectContent>
					</Select>
					<Select value={filters.entity_type || 'all-entities'} onValueChange={(value) => onFilterChange('entity_type', value === 'all-entities' ? '' : (value ?? ''))}>
						<SelectTrigger className="w-full"><SelectValue placeholder="All entity types" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="all-entities">All entity types</SelectItem>
							<SelectItem value="university">University</SelectItem>
							<SelectItem value="course">Course</SelectItem>
							<SelectItem value="opportunity">Opportunity</SelectItem>
						</SelectContent>
					</Select>
					</>
				}
			/>
				<div className="overflow-x-auto rounded-md border bg-kumo-base">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Reason</TableHead>
							<TableHead>Entity</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{reports.map((report) => (
							<TableRow key={report.id}>
								<TableCell className="font-medium">{report.reason}</TableCell>
								<TableCell>{report.entity_type}</TableCell>
								<TableCell>
									<Badge variant={report.status === 'resolved' ? 'default' : report.status === 'dismissed' ? 'destructive' : 'secondary'}>{report.status}</Badge>
								</TableCell>
								<TableCell className="space-x-2">
									<Link className="text-sm text-kumo-link underline-offset-2 hover:underline" to="/reports/$id" params={{ id: report.id }}>View</Link>
									<Button size="sm" variant="secondary" onClick={() => onStatusChange(report.id, 'reviewed')}>Review</Button>
									<Button size="sm" variant="outline" onClick={() => onStatusChange(report.id, 'resolved')}>Resolve</Button>
									<Button size="sm" variant="destructive" onClick={() => onStatusChange(report.id, 'dismissed')}>Dismiss</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				</div>
		</div>
	)
}
