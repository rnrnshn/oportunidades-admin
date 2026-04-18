import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { fetchSession, fetchSessions, updateSessionStatus } from '@/features/mentorship/api/sessions'

export function useSessions() {
	return useQuery({
		queryKey: ['mentorship-sessions'],
		queryFn: fetchSessions,
	})
}

export function useSession(id: string) {
	return useQuery({
		queryKey: ['mentorship-session', id],
		queryFn: () => fetchSession(id),
		enabled: Boolean(id),
	})
}

export function useUpdateSessionStatus(id: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ status, scheduledAt }: { status: string; scheduledAt?: string }) => updateSessionStatus(id, status, scheduledAt),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['mentorship-sessions'] })
			queryClient.invalidateQueries({ queryKey: ['mentorship-session', id] })
		},
	})
}
