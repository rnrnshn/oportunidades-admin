import { z } from 'zod'

const IdSchema = z.string().min(1)

export const OpportunitySchema = z.object({
	id: IdSchema,
	slug: z.string(),
	title: z.string(),
	type: z.string(),
	entity_name: z.string(),
	description: z.string().optional(),
	requirements: z.string().optional(),
	deadline: z.string().optional(),
	apply_url: z.string().optional(),
	external_url_label: z.string().optional(),
	country: z.string().optional(),
	location: z.string().optional(),
	is_remote: z.boolean(),
	language: z.string().optional(),
	area: z.string().optional(),
	hero_image_url: z.string().optional(),
	provider_logo_url: z.string().optional(),
	amount_min: z.string().optional(),
	amount_max: z.string().optional(),
	amount_currency: z.string(),
	coverage: z.array(z.string()),
	eligibility: z.string().optional(),
	application_process: z.string().optional(),
	degree_level: z.string().optional(),
	program_area: z.string().optional(),
	verified: z.boolean(),
	is_active: z.boolean(),
	published_by: IdSchema,
})

export const OpportunitiesResponseSchema = z.object({
	data: z.array(OpportunitySchema),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		per_page: z.number(),
		total_pages: z.number(),
	}),
})

export type Opportunity = z.infer<typeof OpportunitySchema>
