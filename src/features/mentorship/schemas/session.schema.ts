import { z } from 'zod'

export const SessionSchema = z.object({
	id: z.string().uuid(),
	mentor_id: z.string().uuid(),
	requester_id: z.string().uuid(),
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
