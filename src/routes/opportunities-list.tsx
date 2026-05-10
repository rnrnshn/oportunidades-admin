import { useState } from 'react'

import { LoadingState } from '@/components/ui/state'
import { OpportunitiesTable } from '@/features/opportunities/components/opportunities-table'
import { useOpportunities } from '@/features/opportunities/hooks/use-opportunities'

export function OpportunitiesListPage() {
	const [filters, setFilters] = useState({ q: '', type: '', active: '' })
	const { data, isLoading } = useOpportunities(filters)

	if (isLoading) {
		return <LoadingState />
	}

	return (
		<OpportunitiesTable
			opportunities={data?.data ?? []}
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
		/>
	)
}
