import { apiRequest } from '@/lib/api-client'

import { ArticleSchema, ArticlesResponseSchema, type Article } from '@/features/articles/schemas/article.schema'

export interface ArticleFilters {
	q?: string
	type?: string
	status?: string
	featured?: string
	sort?: string
}

function buildQuery(filters: ArticleFilters) {
	const searchParams = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value) {
			searchParams.set(key, value)
		}
	}
	const query = searchParams.toString()
	return query ? `?${query}` : ''
}

export async function fetchArticles(filters: ArticleFilters) {
	const data = await apiRequest<{ data: Article[]; meta: { total: number; page: number; per_page: number; total_pages: number } }>(`/v1/cms/articles${buildQuery(filters)}`)
	return ArticlesResponseSchema.parse(data)
}

export async function fetchArticle(id: string) {
	const data = await apiRequest<Article>(`/v1/cms/articles/${id}`)
	return ArticleSchema.parse(data)
}

export interface ArticleFormInput {
	title: string
	type: string
	excerpt?: string
	content: string
	cover_image_url?: string
	is_featured?: boolean
	seo_title?: string
	seo_description?: string
	source_name?: string
	source_url?: string
}

export async function createArticle(input: ArticleFormInput) {
	const data = await apiRequest<Article>('/v1/cms/articles', {
		method: 'POST',
		body: JSON.stringify(input),
	})
	return ArticleSchema.parse(data)
}

export async function updateArticle(id: string, input: ArticleFormInput) {
	const data = await apiRequest<Article>(`/v1/cms/articles/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(input),
	})
	return ArticleSchema.parse(data)
}

export async function publishArticle(id: string) {
	return apiRequest<Article>(`/v1/admin/articles/${id}/publish`, { method: 'POST' })
}

export async function unpublishArticle(id: string) {
	return apiRequest<Article>(`/v1/admin/articles/${id}/unpublish`, { method: 'POST' })
}

export async function archiveArticle(id: string) {
	return apiRequest<Article>(`/v1/admin/articles/${id}/archive`, { method: 'POST' })
}
