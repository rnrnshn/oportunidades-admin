import { z } from 'zod'

export const ArticleSchema = z.object({
	id: z.string().uuid(),
	slug: z.string(),
	title: z.string(),
	type: z.string(),
	status: z.string(),
	author_id: z.string().uuid(),
	published_at: z.string().optional(),
})

export const ArticlesResponseSchema = z.object({
	data: z.array(ArticleSchema),
	meta: z.object({
		total: z.number(),
		page: z.number(),
		per_page: z.number(),
		total_pages: z.number(),
	}),
})

export type Article = z.infer<typeof ArticleSchema>
export type ArticlesResponse = z.infer<typeof ArticlesResponseSchema>
