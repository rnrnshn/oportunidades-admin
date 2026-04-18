import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { confirmUpload, presignUpload, uploadFile } from '@/features/uploads/api/uploads'
import type { UniversityFormInput } from '@/features/universities/api/universities'
import type { University } from '@/features/universities/schemas/university.schema'

interface UniversityFormProps {
	onSubmit: (input: UniversityFormInput) => Promise<void>
	university?: University
}

export function UniversityForm({ onSubmit, university }: UniversityFormProps) {
	const [logoUrl, setLogoUrl] = useState('')
	const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<UniversityFormInput>({
		defaultValues: {
			name: university?.name ?? '',
			type: university?.type ?? 'publica',
			province: university?.province ?? 'Maputo',
		},
	})
	const typeValue = watch('type') || 'publica'

	async function handleFileChange(file: File | null) {
		if (!file) return
		const presigned = await presignUpload(file.name, 'universities')
		await uploadFile(presigned.upload_url, file)
		const confirmed = await confirmUpload(presigned.path)
		setLogoUrl(confirmed.public_url)
	}

	return (
		<Card>
			<CardHeader><CardTitle>{university ? 'Edit university' : 'Create university'}</CardTitle></CardHeader>
			<CardContent>
				<form className="space-y-4" onSubmit={handleSubmit((values) => onSubmit({ ...values, logo_url: logoUrl || values.logo_url }))}>
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
					<div className="space-y-2"><Label htmlFor="logo">Logo</Label><Input id="logo" type="file" accept="image/*" onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)} />{logoUrl ? <p className="text-xs text-slate-500">Uploaded: {logoUrl}</p> : null}</div>
					<div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" {...register('website')} /></div>
					<div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" {...register('email')} /></div>
					<div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" {...register('phone')} /></div>
					<Button disabled={isSubmitting} type="submit">{university ? 'Save changes' : 'Create university'}</Button>
				</form>
			</CardContent>
		</Card>
	)
}
