import { z } from 'zod'

const IdSchema = z.string().min(1)

export const ArticleSchema = z.object({
	id: IdSchema,
	slug: z.string(),
	title: z.string(),
	excerpt: z.string().optional(),
	content: z.string(),
	content_json: z.unknown().optional(),
	cover_image_url: z.string().optional(),
	type: z.string(),
	status: z.string(),
	source_name: z.string().optional(),
	source_url: z.string().optional(),
	seo_title: z.string().optional(),
	seo_description: z.string().optional(),
	is_featured: z.boolean(),
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
