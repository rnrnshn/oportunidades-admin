import { apiRequest } from '@/lib/api-client'

import { CoursesResponseSchema, CourseSchema, type Course } from '@/features/courses/schemas/course.schema'

export interface CourseFilters {
	q?: string
	area?: string
	level?: string
	regime?: string
	university_id?: string
	sort?: string
}

export interface CourseFormInput {
	university_id: string
	name: string
	area: string
	level: string
	regime: string
	duration_years?: number
	annual_fee?: string
	entry_requirements?: string
}

function buildQuery(filters: CourseFilters) {
	const searchParams = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value) searchParams.set(key, value)
	}
	const query = searchParams.toString()
	return query ? `?${query}` : ''
}

export async function fetchCourses(filters: CourseFilters) {
	const data = await apiRequest<{ data: Course[]; meta: { total: number; page: number; per_page: number; total_pages: number } }>(`/v1/cms/courses${buildQuery(filters)}`)
	return CoursesResponseSchema.parse(data)
}

export async function fetchCourse(id: string) {
	const data = await apiRequest<Course>(`/v1/cms/courses/${id}`)
	return CourseSchema.parse(data)
}

export async function createCourse(input: CourseFormInput) {
	const data = await apiRequest<Course>('/v1/cms/courses', {
		method: 'POST',
		body: JSON.stringify(input),
	})
	return CourseSchema.parse(data)
}

export async function updateCourse(id: string, input: CourseFormInput) {
	const data = await apiRequest<Course>(`/v1/cms/courses/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(input),
	})
	return CourseSchema.parse(data)
}
