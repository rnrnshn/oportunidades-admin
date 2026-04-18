import { z } from 'zod'

const IdSchema = z.string().min(1)

export const SessionSchema = z.object({
	id: IdSchema,
	mentor_id: IdSchema,
	requester_id: IdSchema,
	message: z.string(),
	status: z.string(),
	scheduled_at: z.string().optional(),
})

export const SessionsResponseSchema = z.object({
	data: z.array(SessionSchema),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		per_page: z.number(),
		total_pages: z.number(),
	}),
})

export type Session = z.infer<typeof SessionSchema>
