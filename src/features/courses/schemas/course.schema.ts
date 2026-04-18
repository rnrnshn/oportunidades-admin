import { z } from 'zod'

export const CourseSchema = z.object({
	id: z.string().uuid(),
	slug: z.string(),
	university_id: z.string().uuid(),
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
