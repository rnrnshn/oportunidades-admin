import { useNavigate } from '@tanstack/react-router'

import { CourseForm } from '@/features/courses/components/course-form'
import { useCreateCourse } from '@/features/courses/hooks/use-courses'
import { useUniversities } from '@/features/universities/hooks/use-universities'

export function CourseNewPage() {
	const navigate = useNavigate()
	const createCourse = useCreateCourse()
	const universitiesQuery = useUniversities({})

	if (universitiesQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading universities...</p>
	}

	return (
		<CourseForm
			universities={universitiesQuery.data?.data ?? []}
			onSubmit={async (values) => {
				const course = await createCourse.mutateAsync(values)
				await navigate({ to: '/courses/$id', params: { id: course.id } })
			}}
		/>
	)
}
