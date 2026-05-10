import { apiRequest } from '@/lib/api-client'
import { clearAccessToken, setAccessToken } from '@/lib/auth-store'

import { CurrentUserSchema, LoginResponseSchema, type CurrentUser } from '@/features/auth/schemas/auth.schema'

export async function login(email: string, password: string) {
	const data = await apiRequest('/v1/auth/login', {
		method: 'POST',
		body: JSON.stringify({ email, password }),
	})
	const parsed = LoginResponseSchema.parse(data)
	setAccessToken(parsed.access_token)
	return parsed
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
	const data = await apiRequest('/v1/account/me')
	return CurrentUserSchema.parse(data)
}

export async function logout() {
	try {
		await apiRequest('/v1/auth/logout', { method: 'POST' })
	} finally {
		clearAccessToken()
	}
}

export async function forgotPassword(email: string) {
	return apiRequest<{ message: string; debug_token?: string }>('/v1/auth/forgot-password', {
		method: 'POST',
		body: JSON.stringify({ email }),
	})
}

export async function resetPassword(token: string, newPassword: string) {
	return apiRequest<{ message: string }>('/v1/auth/reset-password', {
		method: 'POST',
		body: JSON.stringify({ token, new_password: newPassword }),
	})
}
