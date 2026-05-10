import { useState } from 'react'

import { LoadingState } from '@/components/ui/state'
import { CoursesTable } from '@/features/courses/components/courses-table'
import { useCourses } from '@/features/courses/hooks/use-courses'
import { useUniversities } from '@/features/universities/hooks/use-universities'

export function CoursesListPage() {
	const [filters, setFilters] = useState({ q: '', level: '', university_id: '' })
	const coursesQuery = useCourses(filters)
	const universitiesQuery = useUniversities({})

	if (coursesQuery.isLoading || universitiesQuery.isLoading) {
		return <LoadingState />
	}

	return (
		<CoursesTable
			courses={coursesQuery.data?.data ?? []}
			filters={filters}
			onFilterChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
			universities={universitiesQuery.data?.data ?? []}
		/>
	)
}
