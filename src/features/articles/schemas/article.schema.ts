import { z } from 'zod'

const IdSchema = z.string().min(1)

export const ArticleSchema = z.object({
	id: IdSchema,
	slug: z.string(),
	title: z.string(),
	type: z.string(),
	status: z.string(),
	author_id: IdSchema,
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
