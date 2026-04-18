import { useState } from 'react'

import { UniversitiesTable } from '@/features/universities/components/universities-table'
import { useUniversities } from '@/features/universities/hooks/use-universities'

export function UniversitiesListPage() {
	const [filters, setFilters] = useState({ q: '', type: '', verified: '' })
	const { data, isLoading } = useUniversities(filters)

	if (isLoading) {
		return <p className="text-sm text-slate-500">Loading universities...</p>
	}

	return (
		<UniversitiesTable
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
			universities={data?.data ?? []}
		/>
	)
}
