import { useParams } from '@tanstack/react-router'

import { LoadingState } from '@/components/ui/state'
import { OpportunityForm } from '@/features/opportunities/components/opportunity-form'
import { useOpportunity, useOpportunityLifecycle, useUpdateOpportunity } from '@/features/opportunities/hooks/use-opportunities'

export function OpportunityEditPage() {
	const { id } = useParams({ from: '/opportunities/$id' })
	const opportunityQuery = useOpportunity(id)
	const updateOpportunity = useUpdateOpportunity(id)
	const lifecycle = useOpportunityLifecycle(id)

	if (opportunityQuery.isLoading) {
		return <LoadingState />
	}

	if (!opportunityQuery.data) {
		return <p className="text-sm text-red-600">Opportunity not found.</p>
	}

	return (
		<OpportunityForm
			opportunity={opportunityQuery.data}
			onSubmit={(values) => updateOpportunity.mutateAsync(values).then(() => undefined)}
			onVerify={() => lifecycle.verify.mutateAsync().then(() => undefined)}
			onReject={() => lifecycle.reject.mutateAsync().then(() => undefined)}
			onDeactivate={() => lifecycle.deactivate.mutateAsync().then(() => undefined)}
		/>
	)
}
