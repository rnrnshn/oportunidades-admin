import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

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
	const [campusImageUrl, setCampusImageUrl] = useState(university?.campus_image_url ?? '')
	const [tagsText, setTagsText] = useState((university?.tags ?? []).join(', '))
	const { control, register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<UniversityFormInput>({
		defaultValues: {
			name: university?.name ?? '',
			type: university?.type ?? 'publica',
			province: university?.province ?? 'Maputo',
			city: university?.city ?? '',
			country: university?.country ?? 'Mozambique',
			description: university?.description ?? '',
			logo_url: university?.logo_url ?? '',
			campus_image_url: university?.campus_image_url ?? '',
			website: university?.website ?? '',
			email: university?.email ?? '',
			phone: university?.phone ?? '',
			founded_year: university?.founded_year,
			address: university?.address ?? '',
			map_url: university?.map_url ?? '',
			academic_calendar: university?.academic_calendar ?? '',
			student_count: university?.student_count,
			admissions_deadline: university?.admissions_deadline ?? '',
			fees: university?.fees ?? [],
			scholarships: university?.scholarships ?? [],
		},
	})
	const { fields: feeFields, append: appendFee, remove: removeFee } = useFieldArray({ control, name: 'fees' })
	const { fields: scholarshipFields, append: appendScholarship, remove: removeScholarship } = useFieldArray({ control, name: 'scholarships' })
	const typeValue = watch('type') || 'publica'

	function submit(values: UniversityFormInput) {
		return onSubmit({
			...values,
			logo_url: logoUrl || values.logo_url,
			campus_image_url: campusImageUrl || values.campus_image_url,
			founded_year: finitePositive(values.founded_year),
			student_count: finitePositive(values.student_count),
			tags: tagsText.split(',').map((tag) => tag.trim()).filter(Boolean),
			fees: (values.fees ?? []).map((fee, index) => ({ ...fee, sort_order: index })).filter((fee) => fee.label && fee.value),
			scholarships: (values.scholarships ?? []).map((scholarship, index) => ({ ...scholarship, sort_order: index })).filter((scholarship) => scholarship.name && scholarship.status),
		})
	}

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
					<MediaField folder="universities" label="Campus image" value={campusImageUrl} onChange={setCampusImageUrl} />
				</>
			}
		>
			<form id="university-form" className="space-y-4" onSubmit={handleSubmit(submit)}>
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
				<div className="grid gap-4 md:grid-cols-3">
					<div className="space-y-2"><Label htmlFor="province">Province</Label><Input id="province" {...register('province')} /></div>
					<div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" {...register('city')} /></div>
					<div className="space-y-2"><Label htmlFor="country">Country</Label><Input id="country" {...register('country')} /></div>
				</div>
				<div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" {...register('description')} /></div>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2"><Label htmlFor="founded_year">Founded year</Label><Input id="founded_year" type="number" {...register('founded_year', { valueAsNumber: true })} /></div>
					<div className="space-y-2"><Label htmlFor="student_count">Student count</Label><Input id="student_count" type="number" {...register('student_count', { valueAsNumber: true })} /></div>
				</div>
				<div className="space-y-2"><Label htmlFor="address">Campus address</Label><Input id="address" {...register('address')} /></div>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2"><Label htmlFor="academic_calendar">Academic calendar</Label><Input id="academic_calendar" {...register('academic_calendar')} /></div>
					<div className="space-y-2"><Label htmlFor="admissions_deadline">Admissions deadline</Label><Input id="admissions_deadline" type="date" {...register('admissions_deadline')} /></div>
				</div>
				<div className="space-y-2"><Label htmlFor="map_url">Map URL</Label><Input id="map_url" {...register('map_url')} /></div>
				<div className="space-y-2"><Label htmlFor="tags">Tags</Label><Input id="tags" value={tagsText} onChange={(event) => setTagsText(event.target.value)} placeholder="Government, Academics, Tuition" /></div>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="space-y-2"><Label htmlFor="website">Website</Label><Input id="website" {...register('website')} /></div>
					<div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" {...register('email')} /></div>
				</div>
				<div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" {...register('phone')} /></div>
				<Card size="sm">
					<CardHeader><CardTitle>Fees</CardTitle></CardHeader>
					<CardContent className="space-y-3">
						{feeFields.map((field, index) => (
							<div key={field.id} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
								<Input placeholder="Label" {...register(`fees.${index}.label`)} />
								<Input placeholder="Value" {...register(`fees.${index}.value`)} />
								<Button type="button" variant="outline" onClick={() => removeFee(index)}>Remove</Button>
							</div>
						))}
						<Button type="button" variant="secondary" onClick={() => appendFee({ label: '', value: '', sort_order: feeFields.length })}>Add fee</Button>
					</CardContent>
				</Card>
				<Card size="sm">
					<CardHeader><CardTitle>Internal scholarships</CardTitle></CardHeader>
					<CardContent className="space-y-3">
						{scholarshipFields.map((field, index) => (
							<div key={field.id} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
								<Input placeholder="Name" {...register(`scholarships.${index}.name`)} />
								<Input placeholder="Amount" {...register(`scholarships.${index}.amount`)} />
								<Input placeholder="Status" {...register(`scholarships.${index}.status`)} />
								<Button type="button" variant="outline" onClick={() => removeScholarship(index)}>Remove</Button>
							</div>
						))}
						<Button type="button" variant="secondary" onClick={() => appendScholarship({ name: '', amount: '', status: '', sort_order: scholarshipFields.length })}>Add scholarship</Button>
					</CardContent>
				</Card>
			</form>
		</EditorShell>
	)
}

function finitePositive(value: number | undefined) {
	return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : undefined
}
