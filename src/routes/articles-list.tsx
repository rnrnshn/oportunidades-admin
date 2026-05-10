import { useState } from 'react'

import { LoadingState } from '@/components/ui/state'
import { ArticlesTable } from '@/features/articles/components/articles-table'
import { useArticles } from '@/features/articles/hooks/use-articles'

export function ArticlesListPage() {
	const [filters, setFilters] = useState({ q: '', type: '', status: '' })
	const { data, isLoading } = useArticles(filters)

	if (isLoading) {
		return <LoadingState />
	}

	return (
		<ArticlesTable
			articles={data?.data ?? []}
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
		/>
	)
}
