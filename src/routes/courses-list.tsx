import { useState } from 'react'

import { CoursesTable } from '@/features/courses/components/courses-table'
import { useCourses } from '@/features/courses/hooks/use-courses'
import { useUniversities } from '@/features/universities/hooks/use-universities'

export function CoursesListPage() {
	const [filters, setFilters] = useState({ q: '', level: '', university_id: '' })
	const coursesQuery = useCourses(filters)
	const universitiesQuery = useUniversities({})

	if (coursesQuery.isLoading || universitiesQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading courses...</p>
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
