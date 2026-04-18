import { apiRequest } from '@/lib/api-client'

import {
	UniversitiesResponseSchema,
	UniversitySchema,
	type University,
} from '@/features/universities/schemas/university.schema'

export interface UniversityFilters {
	q?: string
	type?: string
	province?: string
	verified?: string
	sort?: string
}

export interface UniversityFormInput {
	name: string
	type: string
	province: string
	description?: string
	logo_url?: string
	website?: string
	email?: string
	phone?: string
}

function buildQuery(filters: UniversityFilters) {
	const searchParams = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value) {
			searchParams.set(key, value)
		}
	}
	const query = searchParams.toString()
	return query ? `?${query}` : ''
}

export async function fetchUniversities(filters: UniversityFilters) {
	const data = await apiRequest<{ data: University[]; meta: { total: number; page: number; per_page: number; total_pages: number } }>(
		`/v1/cms/universities${buildQuery(filters)}`,
	)
	return UniversitiesResponseSchema.parse(data)
}

export async function fetchUniversity(id: string) {
	const data = await apiRequest<University>(`/v1/cms/universities/${id}`)
	return UniversitySchema.parse(data)
}

export async function createUniversity(input: UniversityFormInput) {
	const data = await apiRequest<University>('/v1/cms/universities', {
		method: 'POST',
		body: JSON.stringify(input),
	})
	return UniversitySchema.parse(data)
}

export async function updateUniversity(id: string, input: UniversityFormInput) {
	const data = await apiRequest<University>(`/v1/cms/universities/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(input),
	})
	return UniversitySchema.parse(data)
}
