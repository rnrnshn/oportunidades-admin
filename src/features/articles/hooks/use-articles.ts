import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	archiveArticle,
	createArticle,
	fetchArticle,
	fetchArticles,
	publishArticle,
	type ArticleFilters,
	type ArticleFormInput,
	unpublishArticle,
	updateArticle,
} from '@/features/articles/api/articles'

export function useArticles(filters: ArticleFilters) {
	return useQuery({
		queryKey: ['cms-articles', filters],
		queryFn: () => fetchArticles(filters),
	})
}

export function useArticle(id: string) {
	return useQuery({
		queryKey: ['cms-article', id],
		queryFn: () => fetchArticle(id),
		enabled: Boolean(id),
	})
}

export function useCreateArticle() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: ArticleFormInput) => createArticle(input),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cms-articles'] }),
	})
}

export function useUpdateArticle(id: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (input: ArticleFormInput) => updateArticle(id, input),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cms-articles'] })
			queryClient.invalidateQueries({ queryKey: ['cms-article', id] })
		},
	})
}

export function useArticleLifecycle(id: string) {
	const queryClient = useQueryClient()
	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: ['cms-articles'] })
		queryClient.invalidateQueries({ queryKey: ['cms-article', id] })
	}

	return {
		publish: useMutation({ mutationFn: () => publishArticle(id), onSuccess: invalidate }),
		unpublish: useMutation({ mutationFn: () => unpublishArticle(id), onSuccess: invalidate }),
		archive: useMutation({ mutationFn: () => archiveArticle(id), onSuccess: invalidate }),
	}
}
