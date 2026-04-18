import { useState } from 'react'

import { ReportsTable } from '@/features/reports/components/reports-table'
import { useReports, useUpdateReportStatus } from '@/features/reports/hooks/use-reports'

export function ReportsListPage() {
	const [filters, setFilters] = useState({ q: '', status: '', entity_type: '' })
	const reportsQuery = useReports(filters)
	const updateStatus = useUpdateReportStatus()

	if (reportsQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading reports...</p>
	}

	return (
		<ReportsTable
			reports={reportsQuery.data?.data ?? []}
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
			onStatusChange={(id, status) => updateStatus.mutate({ id, status })}
		/>
	)
}
