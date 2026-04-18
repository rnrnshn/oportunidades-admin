import { z } from 'zod'

const IdSchema = z.string().min(1)

export const UniversitySchema = z.object({
	id: IdSchema,
	slug: z.string(),
	name: z.string(),
	type: z.string(),
	province: z.string(),
	verified: z.boolean(),
	created_by: IdSchema,
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
