import { useState } from 'react'

import { LoadingState } from '@/components/ui/state'
import { UniversitiesTable } from '@/features/universities/components/universities-table'
import { useUniversities } from '@/features/universities/hooks/use-universities'

export function UniversitiesListPage() {
	const [filters, setFilters] = useState({ q: '', type: '', verified: '' })
	const { data, isLoading } = useUniversities(filters)

	if (isLoading) {
		return <LoadingState />
	}

	return (
		<UniversitiesTable
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
			universities={data?.data ?? []}
		/>
	)
}
