import { apiRequest } from '@/lib/api-client'

import { ReportSchema, ReportsResponseSchema, type Report } from '@/features/reports/schemas/report.schema'

export interface ReportFilters {
	q?: string
	status?: string
	entity_type?: string
	sort?: string
}

function buildQuery(filters: ReportFilters) {
	const searchParams = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value) searchParams.set(key, value)
	}
	const query = searchParams.toString()
	return query ? `?${query}` : ''
}

export async function fetchReports(filters: ReportFilters) {
	const data = await apiRequest<{ data: Report[]; meta: { total: number; page: number; per_page: number; total_pages: number } }>(`/v1/admin/reports${buildQuery(filters)}`)
	return ReportsResponseSchema.parse(data)
}

export async function updateReportStatus(id: string, status: string) {
	const data = await apiRequest<Report>(`/v1/admin/reports/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ status }),
	})
	return ReportSchema.parse(data)
}
