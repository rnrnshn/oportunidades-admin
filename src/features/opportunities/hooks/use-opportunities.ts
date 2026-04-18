import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	createOpportunity,
	deactivateOpportunity,
	fetchOpportunities,
	fetchOpportunity,
	rejectOpportunity,
	type OpportunityFilters,
	type OpportunityFormInput,
	updateOpportunity,
	verifyOpportunity,
} from '@/features/opportunities/api/opportunities'

export function useOpportunities(filters: OpportunityFilters) {
	return useQuery({
		queryKey: ['cms-opportunities', filters],
		queryFn: () => fetchOpportunities(filters),
	})
}

export function useOpportunity(id: string) {
	return useQuery({
		queryKey: ['cms-opportunity', id],
		queryFn: () => fetchOpportunity(id),
		enabled: Boolean(id),
	})
}

export function useCreateOpportunity() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: OpportunityFormInput) => createOpportunity(input),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cms-opportunities'] }),
	})
}

export function useUpdateOpportunity(id: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: OpportunityFormInput) => updateOpportunity(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cms-opportunities'] })
			queryClient.invalidateQueries({ queryKey: ['cms-opportunity', id] })
		},
	})
}

export function useOpportunityLifecycle(id: string) {
	const queryClient = useQueryClient()
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ['cms-opportunities'] })
		queryClient.invalidateQueries({ queryKey: ['cms-opportunity', id] })
	}

	return {
		verify: useMutation({ mutationFn: () => verifyOpportunity(id), onSuccess: invalidate }),
		reject: useMutation({ mutationFn: () => rejectOpportunity(id), onSuccess: invalidate }),
		deactivate: useMutation({ mutationFn: () => deactivateOpportunity(id), onSuccess: invalidate }),
	}
}
