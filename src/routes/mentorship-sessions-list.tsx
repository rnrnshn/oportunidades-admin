import { LoadingState } from '@/components/ui/state'
import { SessionsTable } from '@/features/mentorship/components/sessions-table'
import { useSessions } from '@/features/mentorship/hooks/use-sessions'

export function MentorshipSessionsListPage() {
	const sessionsQuery = useSessions()

	if (sessionsQuery.isLoading) {
		return <LoadingState />
	}

	return <SessionsTable sessions={sessionsQuery.data?.data ?? []} />
}
