import { useParams } from '@tanstack/react-router'

import { SessionDetail } from '@/features/mentorship/components/session-detail'
import { useSession, useUpdateSessionStatus } from '@/features/mentorship/hooks/use-sessions'

export function MentorshipSessionDetailPage() {
	const { id } = useParams({ from: '/mentorship/sessions/$id' })
	const sessionQuery = useSession(id)
	const updateStatus = useUpdateSessionStatus(id)

	if (sessionQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading session...</p>
	}

	if (!sessionQuery.data) {
		return <p className="text-sm text-red-600">Session not found.</p>
	}

	return <SessionDetail session={sessionQuery.data} onStatusChange={(status, scheduledAt) => updateStatus.mutateAsync({ status, scheduledAt }).then(() => undefined)} />
}
