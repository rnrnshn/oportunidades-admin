import { useNavigate } from '@tanstack/react-router'

import { OpportunityForm } from '@/features/opportunities/components/opportunity-form'
import { useCreateOpportunity } from '@/features/opportunities/hooks/use-opportunities'

export function OpportunityNewPage() {
	const navigate = useNavigate()
	const createOpportunity = useCreateOpportunity()

	return (
		<OpportunityForm
			onSubmit={async (values) => {
				const opportunity = await createOpportunity.mutateAsync(values)
				await navigate({ to: '/opportunities/$id', params: { id: opportunity.id } })
			}}
		/>
	)
}
