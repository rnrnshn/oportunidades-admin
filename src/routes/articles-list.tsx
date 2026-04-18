import { useState } from 'react'

import { ArticlesTable } from '@/features/articles/components/articles-table'
import { useArticles } from '@/features/articles/hooks/use-articles'

export function ArticlesListPage() {
	const [filters, setFilters] = useState({ q: '', type: '', status: '' })
	const { data, isLoading } = useArticles(filters)

	if (isLoading) {
		return <p className="text-sm text-slate-500">Loading articles...</p>
	}

	return (
		<ArticlesTable
			articles={data?.data ?? []}
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
		/>
	)
}
