import { z } from 'zod'

import { apiRequest } from '@/lib/api-client'

const DashboardRecentItemSchema = z.object({
	id: z.string(),
	title: z.string().optional(),
	type: z.string().optional(),
	reason: z.string().optional(),
	status: z.string().optional(),
})

const DashboardSchema = z.object({
	counts: z.object({
		articles: z.number(),
		opportunities: z.number(),
		pending_reports: z.number(),
		pending_mentorship_sessions: z.number(),
	}),
	recent_pending_reports: z.array(DashboardRecentItemSchema).nullable(),
	recent_unverified_opportunities: z.array(DashboardRecentItemSchema).nullable(),
})

export type DashboardData = z.infer<typeof DashboardSchema>

export async function fetchDashboard() {
	const data = await apiRequest<DashboardData>('/v1/admin/dashboard')
	return DashboardSchema.parse(data)
}
