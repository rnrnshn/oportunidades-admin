import { useNavigate } from '@tanstack/react-router'

import { UniversityForm } from '@/features/universities/components/university-form'
import { useCreateUniversity } from '@/features/universities/hooks/use-universities'

export function UniversityNewPage() {
	const navigate = useNavigate()
	const createUniversity = useCreateUniversity()

	return (
		<UniversityForm
			onSubmit={async (values) => {
				const university = await createUniversity.mutateAsync(values)
				await navigate({ to: '/universities/$id', params: { id: university.id } })
			}}
		/>
	)
}
