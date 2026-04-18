import { z } from 'zod'

export const UniversitySchema = z.object({
	id: z.string().uuid(),
	slug: z.string(),
	name: z.string(),
	type: z.string(),
	province: z.string(),
	verified: z.boolean(),
	created_by: z.string().uuid(),
})

export const UniversitiesResponseSchema = z.object({
	data: z.array(UniversitySchema),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		per_page: z.number(),
		total_pages: z.number(),
	}),
})

export type University = z.infer<typeof UniversitySchema>
