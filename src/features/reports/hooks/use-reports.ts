import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchReports, type ReportFilters, updateReportStatus } from '@/features/reports/api/reports'

export function useReports(filters: ReportFilters) {
	return useQuery({
		queryKey: ['admin-reports', filters],
		queryFn: () => fetchReports(filters),
	})
}

export function useUpdateReportStatus() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ id, status }: { id: string; status: string }) => updateReportStatus(id, status),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reports'] }),
	})
}
