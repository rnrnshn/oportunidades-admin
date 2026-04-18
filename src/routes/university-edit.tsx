import { useParams } from '@tanstack/react-router'

import { UniversityForm } from '@/features/universities/components/university-form'
import { useUniversity, useUpdateUniversity } from '@/features/universities/hooks/use-universities'

export function UniversityEditPage() {
	const { id } = useParams({ from: '/universities/$id' })
	const universityQuery = useUniversity(id)
	const updateUniversity = useUpdateUniversity(id)

	if (universityQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading university...</p>
	}

	if (!universityQuery.data) {
		return <p className="text-sm text-red-600">University not found.</p>
	}

	return <UniversityForm university={universityQuery.data} onSubmit={(values) => updateUniversity.mutateAsync(values).then(() => undefined)} />
}
