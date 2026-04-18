import { apiRequest } from '@/lib/api-client'
import { setAccessToken } from '@/lib/auth-store'

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
