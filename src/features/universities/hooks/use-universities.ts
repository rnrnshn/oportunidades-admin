import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	createUniversity,
	fetchUniversities,
	fetchUniversity,
	type UniversityFilters,
	type UniversityFormInput,
	updateUniversity,
} from '@/features/universities/api/universities'

export function useUniversities(filters: UniversityFilters) {
	return useQuery({
		queryKey: ['cms-universities', filters],
		queryFn: () => fetchUniversities(filters),
	})
}

export function useUniversity(id: string) {
	return useQuery({
		queryKey: ['cms-university', id],
		queryFn: () => fetchUniversity(id),
		enabled: Boolean(id),
	})
}

export function useCreateUniversity() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: UniversityFormInput) => createUniversity(input),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cms-universities'] }),
	})
}

export function useUpdateUniversity(id: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: UniversityFormInput) => updateUniversity(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cms-universities'] })
			queryClient.invalidateQueries({ queryKey: ['cms-university', id] })
		},
	})
}
