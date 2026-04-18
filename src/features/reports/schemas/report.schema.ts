import { z } from 'zod'

const IdSchema = z.string().min(1)

export const ReportSchema = z.object({
	id: IdSchema,
	reporter_id: IdSchema,
	entity_type: z.string(),
	entity_id: IdSchema,
	reason: z.string(),
	status: z.string(),
	reviewed_by: IdSchema.optional(),
	moderation_notes: z.string().optional(),
	resolved_at: z.string().optional(),
})

export const ReportsResponseSchema = z.object({
	data: z.array(ReportSchema),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		per_page: z.number(),
		total_pages: z.number(),
	}),
})

export type Report = z.infer<typeof ReportSchema>
