import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Camera, Globe, Lock, LogOut, Bell } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCurrentUser } from '@/features/auth/hooks/use-current-user'
import { changePassword, logoutAllDevices, updateProfile } from '@/features/account/api'
import { MediaField } from '@/features/uploads/components/media-field'

export function AccountPage() {
	const { data: user } = useCurrentUser()

	if (!user) return null

	return (
		<div className="mx-auto max-w-2xl space-y-6">
			<h1 className="text-2xl font-semibold">Conta</h1>
			<ProfileSection name={user.name} email={user.email} role={user.role} avatarUrl={user.avatar_url} />
			<Separator />
			<ChangePasswordSection />
			<Separator />
			<LanguageSection />
			<Separator />
			<NotificationsSection />
			<Separator />
			<SecuritySection />
		</div>
	)
}

function ProfileSection({ name, email, role, avatarUrl }: { name: string; email: string; role: string; avatarUrl?: string }) {
	const queryClient = useQueryClient()
	const [avatar, setAvatar] = useState(avatarUrl ?? '')
	const { register, handleSubmit } = useForm({ defaultValues: { name } })
	const [success, setSuccess] = useState(false)

	const mutation = useMutation({
		mutationFn: (values: { name: string }) => updateProfile({ name: values.name, avatar_url: avatar || undefined }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['current-user'] })
			setSuccess(true)
			setTimeout(() => setSuccess(false), 3000)
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2"><Camera className="h-4 w-4" /> Perfil</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
					<MediaField folder="users" label="Avatar" value={avatar} onChange={setAvatar} />
					<div className="space-y-2">
						<Label htmlFor="name">Nome</Label>
						<Input id="name" {...register('name', { required: true })} />
					</div>
					<div className="space-y-2">
						<Label>Email</Label>
						<Input value={email} disabled />
					</div>
					<div className="space-y-2">
						<Label>Role</Label>
						<Input value={role} disabled />
					</div>
					{mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
					{success ? <p className="text-sm text-green-600">Perfil actualizado.</p> : null}
					<Button type="submit" disabled={mutation.isPending}>
						{mutation.isPending ? 'A guardar...' : 'Guardar alterações'}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

function ChangePasswordSection() {
	const { register, handleSubmit, reset } = useForm({ defaultValues: { current_password: '', new_password: '' } })
	const [success, setSuccess] = useState(false)

	const mutation = useMutation({
		mutationFn: (v: { current_password: string; new_password: string }) => changePassword(v.current_password, v.new_password),
		onSuccess: () => {
			reset()
			setSuccess(true)
			setTimeout(() => setSuccess(false), 3000)
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2"><Lock className="h-4 w-4" /> Alterar password</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit((v) => mutation.mutate(v))}>
					<div className="space-y-2">
						<Label htmlFor="current_password">Password actual</Label>
						<Input id="current_password" type="password" {...register('current_password', { required: true })} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="new_password">Nova password</Label>
						<Input id="new_password" type="password" {...register('new_password', { required: true, minLength: 8 })} />
						<p className="text-xs text-slate-500">Mínimo 8 caracteres.</p>
					</div>
					{mutation.error ? <p className="text-sm text-red-600">{mutation.error.message}</p> : null}
					{success ? <p className="text-sm text-green-600">Password alterada com sucesso.</p> : null}
					<Button type="submit" disabled={mutation.isPending}>
						{mutation.isPending ? 'A alterar...' : 'Alterar password'}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

function LanguageSection() {
	const [lang, setLang] = useState(() => localStorage.getItem('admin_language') ?? 'pt')

	function handleChange(value: string) {
		setLang(value)
		localStorage.setItem('admin_language', value)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2"><Globe className="h-4 w-4" /> Idioma</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-slate-600">Escolha o idioma da interface de administração.</p>
				<div className="flex gap-2">
					<Button variant={lang === 'pt' ? 'default' : 'outline'} size="sm" onClick={() => handleChange('pt')}>Português</Button>
					<Button variant={lang === 'en' ? 'default' : 'outline'} size="sm" onClick={() => handleChange('en')}>English</Button>
				</div>
				<p className="text-xs text-slate-500">As traduções serão aplicadas numa versão futura.</p>
			</CardContent>
		</Card>
	)
}

function NotificationsSection() {
	const [prefs, setPrefs] = useState(() => {
		const stored = localStorage.getItem('admin_notifications')
		return stored ? JSON.parse(stored) as NotificationPrefs : { new_reports: true, new_opportunities: true, mentorship_sessions: true }
	})

	function toggle(key: keyof NotificationPrefs) {
		const updated = { ...prefs, [key]: !prefs[key] }
		setPrefs(updated)
		localStorage.setItem('admin_notifications', JSON.stringify(updated))
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notificações</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<NotificationToggle label="Novas denúncias" description="Receber alerta quando há denúncias pendentes" checked={prefs.new_reports} onChange={() => toggle('new_reports')} />
				<NotificationToggle label="Novas oportunidades" description="Receber alerta quando oportunidades são submetidas" checked={prefs.new_opportunities} onChange={() => toggle('new_opportunities')} />
				<NotificationToggle label="Sessões de mentoria" description="Receber alerta sobre pedidos de sessão pendentes" checked={prefs.mentorship_sessions} onChange={() => toggle('mentorship_sessions')} />
				<p className="text-xs text-slate-500">As notificações por email serão activadas numa versão futura.</p>
			</CardContent>
		</Card>
	)
}

interface NotificationPrefs {
	new_reports: boolean
	new_opportunities: boolean
	mentorship_sessions: boolean
}

function NotificationToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: () => void }) {
	return (
		<label className="flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors hover:bg-slate-50">
			<div>
				<p className="text-sm font-medium">{label}</p>
				<p className="text-xs text-slate-500">{description}</p>
			</div>
			<input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded border-slate-300 text-kumo-brand focus:ring-kumo-brand" />
		</label>
	)
}

function SecuritySection() {
	const queryClient = useQueryClient()
	const [logoutSuccess, setLogoutSuccess] = useState(false)

	const logoutAllMutation = useMutation({
		mutationFn: logoutAllDevices,
		onSuccess: () => {
			setLogoutSuccess(true)
			setTimeout(() => {
				queryClient.clear()
				window.location.href = '/login'
			}, 1500)
		},
	})

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2"><LogOut className="h-4 w-4" /> Segurança</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-slate-600">Terminar sessão em todos os dispositivos. Será redirecionado para o login.</p>
				{logoutAllMutation.error ? <p className="text-sm text-red-600">{logoutAllMutation.error.message}</p> : null}
				{logoutSuccess ? <p className="text-sm text-green-600">Todas as sessões terminadas. A redirecionar...</p> : null}
				<Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" disabled={logoutAllMutation.isPending} onClick={() => logoutAllMutation.mutate()}>
					{logoutAllMutation.isPending ? 'A terminar...' : 'Terminar todas as sessões'}
				</Button>
			</CardContent>
		</Card>
	)
}
