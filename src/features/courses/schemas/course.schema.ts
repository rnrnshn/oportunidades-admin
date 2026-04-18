import { z } from 'zod'

const IdSchema = z.string().min(1)

export const CourseSchema = z.object({
	id: IdSchema,
	slug: z.string(),
	university_id: IdSchema,
	name: z.string(),
	area: z.string(),
	level: z.string(),
	regime: z.string(),
})

export const CoursesResponseSchema = z.object({
	data: z.array(CourseSchema),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		per_page: z.number(),
		total_pages: z.number(),
	}),
})

export type Course = z.infer<typeof CourseSchema>
