import { z } from 'zod'

export const LoginResponseSchema = z.object({
	access_token: z.string(),
	expires_in: z.number(),
	user: z.object({
		id: z.string().uuid(),
		email: z.string().email(),
		role: z.string(),
		name: z.string(),
		avatar_url: z.string().url().optional(),
	}),
})

export const CurrentUserSchema = z.object({
	id: z.string().uuid(),
	email: z.string().email(),
	role: z.string(),
	name: z.string(),
	avatar_url: z.string().url().optional(),
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type CurrentUser = z.infer<typeof CurrentUserSchema>
