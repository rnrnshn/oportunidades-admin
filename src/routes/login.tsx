import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import oportunidadesLogo from '@oportunidades-assets/Oportunidades Logo - Final - Black.png'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { forgotPassword, login, resetPassword } from '@/features/auth/api/auth'

type View = 'login' | 'forgot' | 'reset'

interface LoginFormValues {
	email: string
	password: string
}

interface ForgotFormValues {
	email: string
}

interface ResetFormValues {
	token: string
	new_password: string
}

export function LoginPage() {
	const navigate = useNavigate()
	const search = useSearch({ strict: false }) as { token?: string }
	const [view, setView] = useState<View>(search?.token ? 'reset' : 'login')

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
			<Card className="w-full max-w-md">
				<CardHeader className="items-center gap-3 text-center">
					<img className="h-12 w-auto" src={oportunidadesLogo} alt="Oportunidades" width="3109" height="551" />
				</CardHeader>
				<CardContent>
					{view === 'login' && <LoginForm onForgot={() => setView('forgot')} onSuccess={() => navigate({ to: '/' })} />}
					{view === 'forgot' && <ForgotForm onBack={() => setView('login')} />}
					{view === 'reset' && <ResetForm token={search?.token ?? ''} onBack={() => setView('login')} onSuccess={() => setView('login')} />}
				</CardContent>
			</Card>
		</div>
	)
}

function LoginForm({ onForgot, onSuccess }: { onForgot: () => void; onSuccess: () => void }) {
	const { register, handleSubmit } = useForm<LoginFormValues>()
	const mutation = useMutation({
		mutationFn: ({ email, password }: LoginFormValues) => login(email, password),
		onSuccess,
	})

	return (
		<form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input id="email" type="email" {...register('email', { required: true })} />
			</div>
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label htmlFor="password">Password</Label>
					<button type="button" className="text-xs text-kumo-brand hover:underline" onClick={onForgot}>
						Esqueceu a password?
					</button>
				</div>
				<Input id="password" type="password" {...register('password', { required: true })} />
			</div>
			{mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
			<Button className="w-full" type="submit" disabled={mutation.isPending}>
				{mutation.isPending ? 'A entrar...' : 'Login'}
			</Button>
		</form>
	)
}

function ForgotForm({ onBack }: { onBack: () => void }) {
	const { register, handleSubmit } = useForm<ForgotFormValues>()
	const [sent, setSent] = useState(false)
	const mutation = useMutation({
		mutationFn: ({ email }: ForgotFormValues) => forgotPassword(email),
		onSuccess: () => setSent(true),
	})

	if (sent) {
		return (
			<div className="space-y-4 text-center">
				<p className="text-sm text-slate-600">Se o email existir no sistema, receberá instruções para redefinir a password.</p>
				<Button variant="ghost" className="w-full" onClick={onBack}>Voltar ao login</Button>
			</div>
		)
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
			<p className="text-sm text-slate-600">Introduza o seu email para receber um link de redefinição de password.</p>
			<div className="space-y-2">
				<Label htmlFor="forgot-email">Email</Label>
				<Input id="forgot-email" type="email" {...register('email', { required: true })} />
			</div>
			{mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
			<Button className="w-full" type="submit" disabled={mutation.isPending}>
				{mutation.isPending ? 'A enviar...' : 'Enviar link'}
			</Button>
			<Button variant="ghost" className="w-full" type="button" onClick={onBack}>Voltar ao login</Button>
		</form>
	)
}

function ResetForm({ token, onBack, onSuccess }: { token: string; onBack: () => void; onSuccess: () => void }) {
	const { register, handleSubmit } = useForm<ResetFormValues>({ defaultValues: { token } })
	const [done, setDone] = useState(false)
	const mutation = useMutation({
		mutationFn: ({ token, new_password }: ResetFormValues) => resetPassword(token, new_password),
		onSuccess: () => setDone(true),
	})

	if (done) {
		return (
			<div className="space-y-4 text-center">
				<p className="text-sm text-slate-600">Password redefinida com sucesso. Pode agora fazer login.</p>
				<Button className="w-full" onClick={onSuccess}>Ir para login</Button>
			</div>
		)
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
			<p className="text-sm text-slate-600">Defina a sua nova password.</p>
			<input type="hidden" {...register('token', { required: true })} />
			<div className="space-y-2">
				<Label htmlFor="new-password">Nova password</Label>
				<Input id="new-password" type="password" {...register('new_password', { required: true, minLength: 8 })} />
				<p className="text-xs text-slate-500">Mínimo 8 caracteres.</p>
			</div>
			{mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
			<Button className="w-full" type="submit" disabled={mutation.isPending}>
				{mutation.isPending ? 'A redefinir...' : 'Redefinir password'}
			</Button>
			<Button variant="ghost" className="w-full" type="button" onClick={onBack}>Voltar ao login</Button>
		</form>
	)
}
