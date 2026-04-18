import { z } from 'zod'

export const ReportSchema = z.object({
	id: z.string().uuid(),
	reporter_id: z.string().uuid(),
	entity_type: z.string(),
	entity_id: z.string().uuid(),
	reason: z.string(),
	status: z.string(),
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
