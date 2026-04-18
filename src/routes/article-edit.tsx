import { useParams } from '@tanstack/react-router'

import { ArticleForm } from '@/features/articles/components/article-form'
import { useArticle, useArticleLifecycle, useUpdateArticle } from '@/features/articles/hooks/use-articles'

export function ArticleEditPage() {
	const { id } = useParams({ from: '/articles/$id' })
	const articleQuery = useArticle(id)
	const updateArticle = useUpdateArticle(id)
	const lifecycle = useArticleLifecycle(id)

	if (articleQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading article...</p>
	}

	if (!articleQuery.data) {
		return <p className="text-sm text-red-600">Article not found.</p>
	}

	return (
		<ArticleForm
			article={articleQuery.data}
			onSubmit={(values) => updateArticle.mutateAsync(values).then(() => undefined)}
			onPublish={() => lifecycle.publish.mutateAsync().then(() => undefined)}
			onUnpublish={() => lifecycle.unpublish.mutateAsync().then(() => undefined)}
			onArchive={() => lifecycle.archive.mutateAsync().then(() => undefined)}
		/>
	)
}
