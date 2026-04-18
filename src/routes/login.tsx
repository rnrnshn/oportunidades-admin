import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/features/auth/api/auth'

interface LoginFormValues {
	email: string
	password: string
}

export function LoginPage() {
	const navigate = useNavigate()
	const { register, handleSubmit } = useForm<LoginFormValues>()
	const mutation = useMutation({
		mutationFn: ({ email, password }: LoginFormValues) => login(email, password),
		onSuccess: () => navigate({ to: '/' }),
	})

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Oportunidades Admin</CardTitle>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" {...register('email')} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" {...register('password')} />
						</div>
						{mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
						<Button className="w-full" type="submit">Login</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
