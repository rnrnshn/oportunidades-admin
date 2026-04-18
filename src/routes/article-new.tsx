import { useNavigate } from '@tanstack/react-router'

import { ArticleForm } from '@/features/articles/components/article-form'
import { useCreateArticle } from '@/features/articles/hooks/use-articles'

export function ArticleNewPage() {
	const navigate = useNavigate()
	const createArticle = useCreateArticle()

	return (
		<ArticleForm
			onSubmit={async (values) => {
				const article = await createArticle.mutateAsync(values)
				await navigate({ to: '/articles/$id', params: { id: article.id } })
			}}
		/>
	)
}
