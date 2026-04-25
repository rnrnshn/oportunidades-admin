import { z } from 'zod'

const IdSchema = z.string().min(1)

export const UniversityFeeSchema = z.object({
	id: IdSchema.optional(),
	label: z.string(),
	value: z.string(),
	sort_order: z.number(),
})

export const UniversityScholarshipSchema = z.object({
	id: IdSchema.optional(),
	name: z.string(),
	amount: z.string().optional(),
	status: z.string(),
	sort_order: z.number(),
})

export const UniversitySchema = z.object({
	id: IdSchema,
	slug: z.string(),
	name: z.string(),
	type: z.string(),
	province: z.string(),
	city: z.string().optional(),
	country: z.string(),
	description: z.string().optional(),
	logo_url: z.string().optional(),
	campus_image_url: z.string().optional(),
	website: z.string().optional(),
	email: z.string().optional(),
	phone: z.string().optional(),
	founded_year: z.number().optional(),
	address: z.string().optional(),
	map_url: z.string().optional(),
	academic_calendar: z.string().optional(),
	student_count: z.number().optional(),
	admissions_deadline: z.string().optional(),
	tags: z.array(z.string()),
	fees: z.array(UniversityFeeSchema).optional(),
	scholarships: z.array(UniversityScholarshipSchema).optional(),
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
