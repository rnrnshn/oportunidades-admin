import { apiRequest } from '@/lib/api-client'

import { SessionSchema, SessionsResponseSchema, type Session } from '@/features/mentorship/schemas/session.schema'

export async function fetchSessions() {
	const data = await apiRequest<{ data: Session[]; meta: { total: number; page: number; per_page: number; total_pages: number } }>('/v1/mentorship/sessions')
	return SessionsResponseSchema.parse(data)
}

export async function fetchSession(id: string) {
	const data = await apiRequest<Session>(`/v1/mentorship/sessions/${id}`)
	return SessionSchema.parse(data)
}

export async function updateSessionStatus(id: string, status: string, scheduledAt?: string) {
	const data = await apiRequest<Session>(`/v1/mentorship/sessions/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({ status, scheduled_at: scheduledAt }),
	})
	return SessionSchema.parse(data)
}
