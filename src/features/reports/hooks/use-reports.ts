import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchReport, fetchReports, type ReportFilters, updateReportStatus } from '@/features/reports/api/reports'

export function useReports(filters: ReportFilters) {
	return useQuery({
		queryKey: ['admin-reports', filters],
		queryFn: () => fetchReports(filters),
	})
}

export function useUpdateReportStatus() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, status, moderationNotes }: { id: string; status: string; moderationNotes?: string }) => updateReportStatus(id, status, moderationNotes),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ['admin-reports'] })
			queryClient.invalidateQueries({ queryKey: ['admin-report', variables.id] })
		},
	})
}

export function useReport(id: string) {
	return useQuery({
		queryKey: ['admin-report', id],
		queryFn: () => fetchReport(id),
		enabled: Boolean(id),
	})
}
