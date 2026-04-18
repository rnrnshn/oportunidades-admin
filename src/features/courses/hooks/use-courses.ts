import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	createCourse,
	fetchCourse,
	fetchCourses,
	type CourseFilters,
	type CourseFormInput,
	updateCourse,
} from '@/features/courses/api/courses'

export function useCourses(filters: CourseFilters) {
	return useQuery({
		queryKey: ['cms-courses', filters],
		queryFn: () => fetchCourses(filters),
	})
}

export function useCourse(id: string) {
	return useQuery({
		queryKey: ['cms-course', id],
		queryFn: () => fetchCourse(id),
		enabled: Boolean(id),
	})
}

export function useCreateCourse() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: CourseFormInput) => createCourse(input),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cms-courses'] }),
	})
}

export function useUpdateCourse(id: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: CourseFormInput) => updateCourse(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cms-courses'] })
			queryClient.invalidateQueries({ queryKey: ['cms-course', id] })
		},
	})
}
