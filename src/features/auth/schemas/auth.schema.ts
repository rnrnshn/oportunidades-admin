import { z } from 'zod'

const IdSchema = z.string().min(1)

export const LoginResponseSchema = z.object({
	access_token: z.string(),
	expires_in: z.number(),
	user: z.object({
		id: IdSchema,
		email: z.string().email(),
		role: z.string(),
		name: z.string(),
		avatar_url: z.string().url().optional(),
	}),
})

export const CurrentUserSchema = z.object({
	id: IdSchema,
	email: z.string().email(),
	role: z.string(),
	name: z.string(),
	avatar_url: z.string().url().optional(),
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
export type CurrentUser = z.infer<typeof CurrentUserSchema>
