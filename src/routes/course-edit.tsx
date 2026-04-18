import { useParams } from '@tanstack/react-router'

import { CourseForm } from '@/features/courses/components/course-form'
import { useCourse, useUpdateCourse } from '@/features/courses/hooks/use-courses'
import { useUniversities } from '@/features/universities/hooks/use-universities'

export function CourseEditPage() {
	const { id } = useParams({ from: '/courses/$id' })
	const courseQuery = useCourse(id)
	const updateCourse = useUpdateCourse(id)
	const universitiesQuery = useUniversities({})

	if (courseQuery.isLoading || universitiesQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading course...</p>
	}

	if (!courseQuery.data) {
		return <p className="text-sm text-red-600">Course not found.</p>
	}

	return (
		<CourseForm
			course={courseQuery.data}
			universities={universitiesQuery.data?.data ?? []}
			onSubmit={(values) => updateCourse.mutateAsync(values).then(() => undefined)}
		/>
	)
}
