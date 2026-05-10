import { useQuery } from '@tanstack/react-query'

import { fetchAnalytics, fetchDashboard } from '@/features/dashboard/api'

export function useDashboard() {
	return useQuery({
		queryKey: ['admin', 'dashboard'],
		queryFn: fetchDashboard,
	})
}

export function useAnalytics(days: number) {
	return useQuery({
		queryKey: ['admin', 'analytics', days],
		queryFn: () => fetchAnalytics(days),
	})
}
