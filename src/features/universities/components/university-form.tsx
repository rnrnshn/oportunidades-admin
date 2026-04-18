import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { EditorShell } from '@/components/layout/editor-shell'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { MediaField } from '@/features/uploads/components/media-field'
import type { UniversityFormInput } from '@/features/universities/api/universities'
import type { University } from '@/features/universities/schemas/university.schema'

interface UniversityFormProps {
	onSubmit: (input: UniversityFormInput) => Promise<void>
	university?: University
}

export function UniversityForm({ onSubmit, university }: UniversityFormProps) {
	const [logoUrl, setLogoUrl] = useState(university?.logo_url ?? '')
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<UniversityFormInput>({
		defaultValues: {
			name: university?.name ?? '',
			type: university?.type ?? 'publica',
			province: university?.province ?? 'Maputo',
			description: university?.description ?? '',
			logo_url: university?.logo_url ?? '',
			website: university?.website ?? '',
			email: university?.email ?? '',
			phone: university?.phone ?? '',
		},
	})
	const typeValue = watch('type') || 'publica'

	return (
		<EditorShell
			title={university ? 'Edit university' : 'Create university'}
			sidebar={
				<>
					<Card size="sm">
						<CardHeader><CardTitle>Status</CardTitle></CardHeader>
						<CardContent className="space-y-3 text-sm text-kumo-subtle">
							<p className="font-medium text-kumo-default">{university?.verified ? 'Verified' : 'Pending verification'}</p>
							<Button disabled={isSubmitting} form="university-form" type="submit">{university ? 'Save changes' : 'Create university'}</Button>
						</CardContent>
					</Card>
					<MediaField folder="universities" label="Logo" value={logoUrl} onChange={setLogoUrl} />
				</>
			}
		>
			<form id="university-form" className="space-y-4" onSubmit={handleSubmit((values) => onSubmit({ ...values, logo_url: logoUrl || values.logo_url }))}>
				<div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" {...register('name')} /></div>
				<div className="space-y-2">
					<Label htmlFor="type">Type</Label>
					<Select value={typeValue} onValueChange={(value) => setValue('type', value ?? 'publica')}>
						<SelectTrigger id="type" className="w-full"><SelectValue placeholder="Select type" /></SelectTrigger>
						<SelectContent>
							<SelectItem value="publica">Publica</SelectItem>
							<SelectItem value="privada">Privada</SelectItem>
							<SelectItem value="instituto">Instituto</SelectItem>
							<SelectItem value="academia">Academia</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="space-y-2"><Label htmlFor="province">Province</Label><Input id="province" {...register('province')} /></div>
				<div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" {...register('description')} /></div>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" {...register('website')} /></div>
					<div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" {...register('email')} /></div>
				</div>
				<div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" {...register('phone')} /></div>
			</form>
		</EditorShell>
	)
}
