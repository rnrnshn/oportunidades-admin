import { useQuery } from '@tanstack/react-query'

import { fetchCurrentUser } from '@/features/auth/api/auth'

export function useCurrentUser() {
	return useQuery({
		queryKey: ['current-user'],
		queryFn: fetchCurrentUser,
		retry: false,
	})
}
