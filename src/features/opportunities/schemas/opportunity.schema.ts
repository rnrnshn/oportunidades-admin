import { z } from 'zod'

export const OpportunitySchema = z.object({
	id: z.string().uuid(),
	slug: z.string(),
	title: z.string(),
	type: z.string(),
	entity_name: z.string(),
	verified: z.boolean(),
	is_active: z.boolean(),
	published_by: z.string().uuid(),
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
