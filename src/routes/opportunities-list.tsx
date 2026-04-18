import { useState } from 'react'

import { OpportunitiesTable } from '@/features/opportunities/components/opportunities-table'
import { useOpportunities } from '@/features/opportunities/hooks/use-opportunities'

export function OpportunitiesListPage() {
	const [filters, setFilters] = useState({ q: '', type: '', active: '' })
	const { data, isLoading } = useOpportunities(filters)

	if (isLoading) {
		return <p className="text-sm text-slate-500">Loading opportunities...</p>
	}

	return (
		<OpportunitiesTable
			opportunities={data?.data ?? []}
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
		/>
	)
}
