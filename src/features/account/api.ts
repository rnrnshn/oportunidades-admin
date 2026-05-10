import { apiRequest } from '@/lib/api-client'

import { CurrentUserSchema, type CurrentUser } from '@/features/auth/schemas/auth.schema'

export async function updateProfile(input: { name: string; avatar_url?: string }) {
	const data = await apiRequest<CurrentUser>('/v1/account/me', {
		method: 'PATCH',
		body: JSON.stringify(input),
	})
	return CurrentUserSchema.parse(data)
}

export async function changePassword(currentPassword: string, newPassword: string) {
	return apiRequest<{ message: string }>('/v1/account/password', {
		method: 'POST',
		body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
	})
}

export async function logoutAllDevices() {
	return apiRequest<{ message: string }>('/v1/account/logout-all', { method: 'POST' })
}
