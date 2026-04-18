import { SessionsTable } from '@/features/mentorship/components/sessions-table'
import { useSessions } from '@/features/mentorship/hooks/use-sessions'

export function MentorshipSessionsListPage() {
	const sessionsQuery = useSessions()

	if (sessionsQuery.isLoading) {
		return <p className="text-sm text-slate-500">Loading sessions...</p>
	}

	return <SessionsTable sessions={sessionsQuery.data?.data ?? []} />
}
