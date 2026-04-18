import { apiRequest } from '@/lib/api-client'

import {
	OpportunitySchema,
	OpportunitiesResponseSchema,
	type Opportunity,
} from '@/features/opportunities/schemas/opportunity.schema'

export interface OpportunityFilters {
	q?: string
	type?: string
	verified?: string
	active?: string
	sort?: string
}

export interface OpportunityFormInput {
	title: string
	type: string
	entity_name: string
	description: string
	requirements?: string
	deadline?: string
	apply_url?: string
	country: string
	language?: string
	area?: string
}

function buildQuery(filters: OpportunityFilters) {
	const searchParams = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value) {
			searchParams.set(key, value)
		}
	}
	const query = searchParams.toString()
	return query ? `?${query}` : ''
}

export async function fetchOpportunities(filters: OpportunityFilters) {
	const data = await apiRequest<{ data: Opportunity[]; meta: { total: number; page: number; per_page: number; total_pages: number } }>(
		`/v1/cms/opportunities${buildQuery(filters)}`,
	)
	return OpportunitiesResponseSchema.parse(data)
}

export async function fetchOpportunity(id: string) {
	const data = await apiRequest<Opportunity>(`/v1/cms/opportunities/${id}`)
	return OpportunitySchema.parse(data)
}

export async function createOpportunity(input: OpportunityFormInput) {
	const data = await apiRequest<Opportunity>('/v1/cms/opportunities', {
		method: 'POST',
		body: JSON.stringify(input),
	})
	return OpportunitySchema.parse(data)
}

export async function updateOpportunity(id: string, input: OpportunityFormInput) {
	const data = await apiRequest<Opportunity>(`/v1/cms/opportunities/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(input),
	})
	return OpportunitySchema.parse(data)
}

export async function verifyOpportunity(id: string) {
	return apiRequest<Opportunity>(`/v1/admin/opportunities/${id}/verify`, { method: 'POST' })
}

export async function rejectOpportunity(id: string) {
	return apiRequest<Opportunity>(`/v1/admin/opportunities/${id}/reject`, { method: 'POST' })
}

export async function deactivateOpportunity(id: string) {
	return apiRequest<Opportunity>(`/v1/admin/opportunities/${id}/deactivate`, { method: 'POST' })
}
